"use client";

import { useCallback, type ReactNode } from "react";
import { useHero } from "./HeroState/HeroProvider";

/**
 * HeroScene — the semantic root of the Hero chapter.
 *
 * Responsibilities:
 *  - Provides the chapter root <main> element.
 *  - Registers its DOM node into HeroProvider via a callback ref so
 *    motion controllers re-run their effects when the root mounts.
 *  - Declares chapter density tier metadata for narrative-density-system
 *    linting.
 *
 * Pure structural; no motion, no atmosphere.
 */
export function HeroScene({ children }: { children: ReactNode }) {
  const { registerRoot } = useHero();

  const setRef = useCallback(
    (el: HTMLElement | null) => {
      registerRoot(el);
    },
    [registerRoot]
  );

  return (
    <main
      ref={setRef}
      data-chapter="hero"
      data-density-tier-default="T03"
      className="relative w-full"
    >
      {children}
    </main>
  );
}
