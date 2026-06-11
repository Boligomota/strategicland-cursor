"use client";

import { useCallback, type ReactNode } from "react";
import { useMethodology } from "./MethodologyState/MethodologyProvider";

/**
 * MethodologyScene — the semantic root of the Methodology chapter (HC-02).
 *
 * Mirrors HeroScene exactly. Owns:
 *  - The chapter root <section> element.
 *  - Callback-ref registration into MethodologyProvider so motion
 *    controllers re-run their effects after the DOM commits.
 *  - Density tier metadata declared on data attributes for the
 *    density linter.
 *
 * Pure structural — no motion, no atmosphere.
 */
export function MethodologyScene({ children }: { children: ReactNode }) {
  const { registerRoot } = useMethodology();

  const setRef = useCallback(
    (el: HTMLElement | null) => {
      registerRoot(el);
    },
    [registerRoot]
  );

  return (
    <section
      ref={setRef}
      data-chapter="editorial"
      data-chapter-name="methodology"
      data-density-tier-default="T03"
      className="relative w-full"
    >
      {children}
    </section>
  );
}
