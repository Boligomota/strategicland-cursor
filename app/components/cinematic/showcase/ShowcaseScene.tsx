"use client";

import { useCallback, type ReactNode } from "react";
import { useShowcase } from "./ShowcaseState/ShowcaseProvider";

/**
 * ShowcaseScene — semantic root of HC-05 · ACT B (case · showcase).
 *
 * Owns the chapter root <section> element + callback-ref
 * registration into ShowcaseProvider so motion controllers re-run
 * their effects after the DOM commits. Density tier metadata
 * declared via data attributes for the density linter.
 *
 * Pure structural — no motion, no atmosphere.
 */
export function ShowcaseScene({ children }: { children: ReactNode }) {
  const { registerRoot } = useShowcase();

  const setRef = useCallback(
    (el: HTMLElement | null) => {
      registerRoot(el);
    },
    [registerRoot]
  );

  return (
    <section
      ref={setRef}
      data-chapter="case"
      data-chapter-name="showcase"
      data-density-tier-default="T03"
      className="relative w-full"
    >
      {children}
    </section>
  );
}
