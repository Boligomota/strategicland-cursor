"use client";

import { type ReactNode } from "react";

/**
 * ShowcaseReveal — ACT B scroll choreography (foundation pass).
 *
 * STRUCTURAL PLACEHOLDER. Motion is intentionally postponed per the
 * foundation directive. The chapter renders fully visible at load;
 * no GSAP timelines bind to the chapter root yet.
 *
 * Planned binding when motion is authorized (architecture §10):
 *  - plates reveal via EditorialImage native reveal="mask" (locked
 *    set; the only reveal pattern of the act) — directional, ONCE
 *  - protagonist plate additionally carries the canonical
 *    `revealImage.drift` subtle drift
 *  - copy lines: opacity cascades only (no pins — trivially
 *    degradable under prefers-reduced-motion)
 *
 * Gating: useReducedMotion() → skip entirely; useTransitionDirector()
 * → arm only after isIntakeComplete; useShowcase() → bind
 * ScrollTrigger to root.
 *
 * Exists for architectural parity with MethodologyReveal /
 * SignalReveal / CapabilitiesReveal / ClosingReveal — future motion
 * addition will not require composition refactor.
 */
export function ShowcaseReveal({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
