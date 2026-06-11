"use client";

import { TemporalPause } from "@/app/components/cinematic/hero/HeroNarrative/TemporalPause";
import { TransitionalPrelude } from "./MethodologyNarrative/TransitionalPrelude";
import { MethodStatement } from "./MethodologyNarrative/MethodStatement";
import { FrameworkSequence } from "./MethodologyNarrative/FrameworkSequence";
import { HumanAITension } from "./MethodologyNarrative/HumanAITension";
import { ClosingThreshold } from "./MethodologyNarrative/ClosingThreshold";

/**
 * MethodologyComposition — canonical narrative ordering of HC-02
 * (ChapterId="editorial", chapter name "methodology").
 *
 *  1. Transitional prelude         tier T01 silence       (seam from Hero)
 *  2. Method statement             tier T02 contemplative (manifest)
 *  3. Temporal pause               tier T01 silence       (intra-chapter)
 *  4. Framework sequence           tier T03 editorial     (4-beat climb)
 *  5. Temporal pause               tier T01 silence       (intra-chapter)
 *  6. Human + AI tension           tier T02 contemplative (release)
 *  7. Closing threshold            tier T01 silence       (seam to next)
 *
 * Pacing alternation per narrative-density-system.mdc §5.2 is satisfied:
 * no two consecutive scenes share a tier outside sustained T01 silence.
 *
 * TemporalPause is REUSED from the Hero canon (HeroNarrative) — this
 * chapter does not invent its own silence primitive. Reusing the same
 * component guarantees identical rhythm tokens (40vh mobile baseline,
 * canon-aligned debug label).
 *
 * Pure structural ownership. No motion, no atmosphere — both live in
 * sibling subtrees and bind to the data-* selectors declared here.
 */
export function MethodologyComposition() {
  return (
    <>
      <TransitionalPrelude />

      <MethodStatement />

      <TemporalPause height="28vh" mdHeight="14vh" label="silence" />

      <FrameworkSequence />

      <TemporalPause height="26vh" mdHeight="12vh" label="silence" />

      <HumanAITension />

      <ClosingThreshold />
    </>
  );
}
