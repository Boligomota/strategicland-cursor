"use client";

import { useCallback, type ReactNode } from "react";
import { useCase } from "./CaseState/CaseProvider";

/**
 * CaseScene — the semantic root of the Case chapter.
 *
 * Mirrors HeroScene / MethodologyScene exactly. Owns:
 *  - The chapter root <section> element.
 *  - Callback-ref registration into CaseProvider so motion
 *    controllers (CaseProgressController, CaseHorizontalTransport,
 *    CaseReveal) re-run their effects after the DOM commits.
 *  - Density tier metadata declared on data attributes for the
 *    density linter. Chapter-level dominant tier is T04 per
 *    CaseRegistration; the scene cascade refines it.
 *
 * `data-chapter-name` carries the case slug — the chapter template
 * is parametric, the instance identity comes from content.
 *
 * Pure structural — no motion, no atmosphere.
 */
export function CaseScene({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const { registerRoot } = useCase();

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
      data-chapter-name={slug}
      data-density-tier-default="T04"
      className="relative w-full"
    >
      {children}
    </section>
  );
}
