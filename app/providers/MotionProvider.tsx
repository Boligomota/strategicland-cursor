"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * MotionProvider — registers GSAP plugins exactly once and exposes
 * lifecycle hooks for scene-level GSAP contexts via gsap.context().
 *
 * Owns no state itself; coexists with LenisProvider (which owns the
 * Lenis ↔ GSAP bridge). Mount order: ReducedMotion → Irregularity →
 * Lenis → Motion → (chapter providers) → app.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const registered = useRef(false);

  useLayoutEffect(() => {
    if (registered.current) return;
    gsap.registerPlugin(ScrollTrigger);
    registered.current = true;

    return () => {
      // Kill any orphan triggers on real unmount (production).
      if (process.env.NODE_ENV === "production") {
        ScrollTrigger.killAll();
      }
    };
  }, []);

  return <>{children}</>;
}
