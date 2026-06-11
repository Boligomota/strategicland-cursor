"use client";

import { EditorialStatement } from "./HeroNarrative/EditorialStatement";
import { HeroChapterBoundary } from "./HeroState/HeroChapterBoundary";

/**
 * HeroComposition — declares the canonical narrative ordering of the
 * Hero chapter per HC-01.
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §01 HERO.
 * The hero carries exactly two canonical text surfaces — the titular
 * "WE MAKE NOISE / NOT DIGITAL" and the sub-título "Consultoría
 * Interdisciplinaria de Negocios y Marketing" — both owned by
 * EditorialStatement.
 *
 * PRESENTATION SOURCE: approved HTML reference hero — full-viewport
 * umber field, content vertically centered, 12-column grid, boundary
 * caption pinned to the bottom edge like the hero-meta-bottom strip.
 *
 *  1. Hero (titular + sub-título)   full viewport, section-dark
 *  2. Chapter boundary              bottom meta strip
 *
 * Pure structural ownership. No motion, no atmosphere — those live in
 * sibling subtrees and bind to the data-* selectors declared here.
 */
export function HeroComposition() {
  return (
    <section
      data-hero-section
      className="section-dark container-pad relative flex h-screen w-full flex-col justify-center"
    >
      <EditorialStatement />

      <HeroChapterBoundary />
    </section>
  );
}
