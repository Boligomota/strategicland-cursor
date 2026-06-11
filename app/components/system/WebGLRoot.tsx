"use client";

import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "@/app/providers/ReducedMotionProvider";
import { sceneTunnel } from "@/app/lib/webgl/tunnel";

/**
 * WebGLRoot — single root R3F Canvas for the entire site per
 * docs/SYSTEM_ARCHITECTURE.md §4 & .rules/webgl-system.mdc.
 *
 * Forbidden: any other <Canvas/> instantiation anywhere in the tree.
 * Chapter scenes contribute via sceneTunnel.In (see lib/webgl/tunnel.ts).
 *
 * Configuration:
 *  - dpr clamped to [1, 1.5] (atmospheric quality without GPU waste)
 *  - antialias off (grain + vignette absorb shimmer; perf > AA here)
 *  - fixed full-viewport, z-index -2 (sits in atmosphere layer)
 *  - pointer-events: none (cursor + scroll never blocked by canvas)
 *  - frameloop="demand": scenes invalidate explicitly via useThree().invalidate
 *    Per .rules/webgl-system.mdc §3, atmospheric scenes drive invalidation
 *    at half-rate (≈30 FPS) through gsap.ticker. Motion is time-locked via
 *    useFrame's delta so visual rhythm is independent of render cadence.
 *
 * Reduced-motion: render nothing. Scenes already self-skip but no
 * GPU context is allocated.
 */
export function WebGLRoot() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[-2]"
      data-webgl-root
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 5], fov: 50 }}
        frameloop="demand"
      >
        <sceneTunnel.Out />
      </Canvas>
    </div>
  );
}
