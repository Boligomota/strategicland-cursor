"use client";

import { EditorialStatement } from "./HeroNarrative/EditorialStatement";
import { TemporalPause } from "./HeroNarrative/TemporalPause";
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
 * Removed in the sitemap compliance pass (content with no source in
 * the sitemap):
 *  - Philosophy section (NarrativeFragments) + its meta grid
 *    (Método / Límite / Consecuencia).
 *  - "Sistemas Arquitectados" horizontal track (SYS_01–SYS_04).
 *  - Bottom meta paragraph ("arquitectura algorítmica") and the
 *    "Explorar filosofía" cue.
 *
 *  1. Hero (titular + sub-título)   tier T03 editorial
 *  2. Temporal pause                tier T01 silence
 *  3. Chapter boundary              tier T01 closure
 *
 * Pure structural ownership. No motion, no atmosphere — those live in
 * sibling subtrees and bind to the data-* selectors declared here.
 */
export function HeroComposition() {
  return (
    <>
      <section
        data-hero-section
        className="relative flex h-screen w-full flex-col items-center justify-center px-7 md:px-[4vw]"
      >
        <EditorialStatement />
      </section>

      <TemporalPause height="40vh" mdHeight="20vh" label="silence" />

      <HeroChapterBoundary />
    </>
  );
}
