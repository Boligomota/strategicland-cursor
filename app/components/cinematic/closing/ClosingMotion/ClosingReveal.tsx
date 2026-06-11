"use client";

import { type ReactNode } from "react";

/**
 * ClosingReveal — HC-05 scroll choreography (foundational pass).
 *
 * Per the HC-05 blueprint §11, the chapter's allowed reveal budget
 * is ≤ 2 reveals total:
 *   1. mask reveal on the single EditorialImage plate (handled
 *      natively by EditorialImage with reveal="mask")
 *   2. opacity drift on the single afterimage sentence (pending)
 *
 * This file is currently a STRUCTURAL PLACEHOLDER. Motion is
 * intentionally postponed per the foundational pass directive. The
 * chapter renders fully visible at load; no GSAP timelines bind to
 * the chapter root yet.
 *
 * Planned binding when motion is authorized:
 *  - useReducedMotion() → skip entirely if true
 *  - useTransitionDirector() → arm only after isIntakeComplete
 *  - useClosing() → bind ScrollTrigger to root
 *  - [data-closing-afterimage-sentence] → opacity 0 → 1,
 *    DUR.epic, EASE.gsap.drift, once at "top 75%"
 *
 * Until then this wrapper exists for architectural parity with
 * CapabilitiesReveal / SignalReveal / MethodologyReveal — future
 * motion addition will not require composition refactor.
 */
export function ClosingReveal({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
