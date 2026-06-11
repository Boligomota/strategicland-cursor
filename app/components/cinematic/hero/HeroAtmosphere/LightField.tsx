"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { useReducedMotion } from "@/app/providers/ReducedMotionProvider";
import { jitter } from "@/app/lib/irregularity";
import { sceneTunnel } from "@/app/lib/webgl/tunnel";

/**
 * LightField — R3F particle field per HC-01 #canvas-bg.
 *
 * Migrated from standalone 2D canvas to a Points scene tunneled into the
 * single root <WebGLRoot/> Canvas (docs/SYSTEM_ARCHITECTURE.md §4).
 *
 * Atmospheric motion restraint pass tuned the field to preserve depth
 * while reducing perceptual noise:
 *  - 28 particles on mobile (<768px), 60 on desktop (was 50 / 150)
 *  - color rgba(237, 230, 216, a)  (cream / --text-cream)
 *  - per-particle radius 0.1–1.1px on screen (unchanged)
 *  - per-particle velocity ±0.08 px/frame on each axis (was ±0.2)
 *  - per-particle alpha 0..0.32 (was 0..0.5)
 *  - wrap on viewport edges (unchanged)
 *
 * Implementation notes:
 *  - Position attribute carries CSS-pixel coordinates with origin at the
 *    viewport center. The custom shader projects directly to clip-space
 *    using a uniform viewport size (uVp), so we DO NOT touch the root
 *    Canvas camera. Future scenes can coexist without conflict.
 *  - jitter() (seeded PRNG) replaces Math.random() per
 *    .rules/human-irregularity-system.mdc §2.4.
 *  - Frameloop "demand": invalidation is driven by gsap.ticker at half rate
 *    (~30 FPS). Motion math is time-locked through useFrame's delta and
 *    normalized to 60 FPS units, so the velocity feel is identical to the
 *    previous always-on canvas.
 *  - Reduced motion: render nothing (no scene contributed to tunnel).
 */

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
};

function LightFieldScene() {
  const { size, gl, invalidate } = useThree();
  const dpr = gl.getPixelRatio();

  // Drive invalidation at ~30 FPS via gsap.ticker per webgl-system.mdc §3.
  useEffect(() => {
    let toggle = false;
    const tick = () => {
      toggle = !toggle;
      if (toggle) invalidate();
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [invalidate]);

  const state = useMemo(() => {
    const width = size.width || 1;
    const height = size.height || 1;
    const count = width < 768 ? 28 : 60;
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: jitter(width / 2, 1),
      y: jitter(height / 2, 1),
      r: Math.abs(jitter(0.75, 1)) * 1.0 + 0.1,
      vx: jitter(0, 1) * 0.08,
      vy: jitter(0, 1) * 0.08,
      a: Math.abs(jitter(0.25, 1)) * 0.32,
    }));
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);
    return { particles, positions, sizes, alphas };
  }, [size.width, size.height]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(state.positions, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(state.sizes, 1));
    g.setAttribute("aAlpha", new THREE.BufferAttribute(state.alphas, 1));
    // Render order matters less than overdraw frustum culling — disable.
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), Infinity);
    return g;
  }, [state]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.NormalBlending,
      uniforms: {
        uColor: { value: new THREE.Color(0.929, 0.902, 0.847) }, // #EDE6D8
        uVp: { value: new THREE.Vector2(size.width || 1, size.height || 1) },
        uDpr: { value: dpr },
      },
      vertexShader: /* glsl */ `
        attribute float aSize;
        attribute float aAlpha;
        varying float vAlpha;
        uniform vec2 uVp;
        uniform float uDpr;
        void main() {
          vAlpha = aAlpha;
          // position.xy in CSS px, origin at viewport center.
          vec2 clip = vec2(
            (position.x / (uVp.x * 0.5)),
            (position.y / (uVp.y * 0.5))
          );
          gl_Position = vec4(clip, 0.0, 1.0);
          // gl_PointSize is in fragment-space pixels; multiply by dpr so
          // visual size matches 2D canvas diameter (radius * 2).
          gl_PointSize = aSize * 2.0 * uDpr;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if (d > 0.5) discard;
          float edge = smoothstep(0.5, 0.42, d);
          gl_FragColor = vec4(uColor, edge * vAlpha);
        }
      `,
    });
  }, [size.width, size.height, dpr]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    const width = size.width;
    const height = size.height;
    if (!width || !height) return;
    // Normalize step to 60 FPS units so motion rhythm is identical
    // regardless of invalidate cadence (clamped to avoid huge jumps on
    // tab refocus / ticker hiccups).
    const dt = Math.min(delta * 60, 3);
    const { particles } = state;
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const sizeAttr = geometry.getAttribute("aSize") as THREE.BufferAttribute;
    const alphaAttr = geometry.getAttribute("aAlpha") as THREE.BufferAttribute;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
      // Convert px → centered px (origin at center, +y up).
      posAttr.setXYZ(i, p.x - width / 2, height / 2 - p.y, 0);
      sizeAttr.array[i] = p.r;
      alphaAttr.array[i] = p.a;
    }
    posAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;
    alphaAttr.needsUpdate = true;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />;
}

export function LightField() {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <sceneTunnel.In>
      <LightFieldScene />
    </sceneTunnel.In>
  );
}
