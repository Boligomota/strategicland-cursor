"use client";

import { useCallback, type ReactNode } from "react";
import { useStoryscape } from "./StoryscapeState/StoryscapeProvider";

/**
 * StoryscapeScene — semantic root of HC-05 · ACT A (editorial ·
 * storyscape).
 *
 * Owns the chapter root <section> element + callback-ref
 * registration into StoryscapeProvider so motion controllers re-run
 * their effects after the DOM commits. Density tier metadata
 * declared via data attributes for the density linter.
 *
 * Pure structural — no motion, no atmosphere.
 */
export function StoryscapeScene({ children }: { children: ReactNode }) {
  const { registerRoot } = useStoryscape();

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
      data-chapter-name="storyscape"
      data-density-tier-default="T03"
      className="relative w-full"
    >
      {children}
    </section>
  );
}
