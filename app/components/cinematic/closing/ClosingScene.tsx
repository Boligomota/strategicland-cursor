"use client";

import { useCallback, type ReactNode } from "react";
import { useClosing } from "./ClosingState/ClosingProvider";

/**
 * ClosingScene — semantic root of HC-05 (closing · future memory).
 *
 * Owns the chapter root <section> element + callback-ref
 * registration into ClosingProvider so motion controllers re-run
 * their effects after the DOM commits. Density tier metadata
 * declared via data attributes for the density linter.
 *
 * Pure structural — no motion, no atmosphere.
 */
export function ClosingScene({ children }: { children: ReactNode }) {
  const { registerRoot } = useClosing();

  const setRef = useCallback(
    (el: HTMLElement | null) => {
      registerRoot(el);
    },
    [registerRoot]
  );

  return (
    <section
      ref={setRef}
      data-chapter="closing"
      data-chapter-name="future-memory"
      data-density-tier-default="T01"
      className="relative w-full"
    >
      {children}
    </section>
  );
}
