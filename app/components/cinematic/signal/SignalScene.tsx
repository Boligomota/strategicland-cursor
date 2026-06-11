"use client";

import { useCallback, type ReactNode } from "react";
import { useSignal } from "./SignalState/SignalProvider";

/**
 * SignalScene — semantic root of HC-03 (cultural · signal).
 *
 * Owns the chapter root <section> element + callback-ref registration
 * into SignalProvider so motion controllers re-run their effects after
 * the DOM commits. Density tier metadata declared via data attributes
 * for the density linter.
 *
 * Pure structural — no motion, no atmosphere.
 */
export function SignalScene({ children }: { children: ReactNode }) {
  const { registerRoot } = useSignal();

  const setRef = useCallback(
    (el: HTMLElement | null) => {
      registerRoot(el);
    },
    [registerRoot]
  );

  return (
    <section
      ref={setRef}
      data-chapter="cultural"
      data-chapter-name="signal"
      data-density-tier-default="T04"
      className="relative w-full"
    >
      {children}
    </section>
  );
}
