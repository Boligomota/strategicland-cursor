"use client";

import { TemporalPause } from "@/app/components/cinematic/hero/HeroNarrative/TemporalPause";
import { EmergenceFromMemory } from "./ClosingNarrative/EmergenceFromMemory";
import { AfterimageFragment } from "./ClosingNarrative/AfterimageFragment";
import { PersistentAtmosphere } from "./ClosingNarrative/PersistentAtmosphere";

/**
 * ClosingComposition — canonical narrative ordering of HC-05
 * (ChapterId="closing", chapter name "future-memory").
 *
 *  1. Emergence from memory   tier T01 silence       (seam from HC-04)
 *  2. Temporal pause          tier T01 silence       (T01 → T02 bridge, dilated)
 *  3. Afterimage fragment     tier T02 contemplative (single editorial surface)
 *  4. Temporal pause          tier T01 silence       (T02 → T01 bridge, dilated)
 *  5. Persistent atmosphere   tier T01 silence       (sustained T01 + atmospheric tail)
 *
 * Pacing per narrative-density-system.mdc §5.2: sustained T01
 * between dissolution scenes is canonical — HC-05 is the canonical
 * case. T01 → T02 → T01 respects the alternation rule.
 *
 * Page-level emotional contour: HC-04 peaked at T03 EDITORIAL;
 * HC-05 peaks at T02 CONTEMPLATIVE — descending arc preserved.
 *
 * TemporalPause dimensions intentionally exceed canon (28vh/18vh vs
 * canon 22vh/14vh). HC-05 silence is substance, not pacing — the
 * pauses are heavier than scene-boundary pauses to mark dissolution.
 *
 * Architectural deliberate omissions:
 *  - NO chapter marker (EmergenceFromMemory carries no "005 ·" mark)
 *  - NO forward cue (PersistentAtmosphere does not say "X continúa →")
 *  - NO footer / copyright / contact / CTA after the chapter
 *
 * The persistent ambient state IS the close.
 *
 * Pure structural ownership. No motion, no atmosphere — both live
 * in sibling subtrees and bind to the data-* selectors declared
 * inside the narrative scenes.
 */
export function ClosingComposition() {
  return (
    <>
      <EmergenceFromMemory />

      <TemporalPause height="28vh" mdHeight="18vh" label="silence (dilated)" />

      <AfterimageFragment />

      <TemporalPause height="28vh" mdHeight="18vh" label="silence (dilated)" />

      <PersistentAtmosphere />
    </>
  );
}
