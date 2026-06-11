"use client";

import { TemporalPause } from "@/app/components/cinematic/hero/HeroNarrative/TemporalPause";
import { OperationalPrelude } from "./CapabilitiesNarrative/OperationalPrelude";
import { CapabilityFragments } from "./CapabilitiesNarrative/CapabilityFragments";
import { AppliedTension } from "./CapabilitiesNarrative/AppliedTension";
import { OutcomeLayer } from "./CapabilitiesNarrative/OutcomeLayer";
import { OperationalThreshold } from "./CapabilitiesNarrative/OperationalThreshold";

/**
 * CapabilitiesComposition — canonical narrative ordering of HC-04
 * (ChapterId="human", chapter name "capabilities").
 *
 *  1. Operational prelude     tier T01 silence       (seam from HC-03)
 *  2. Capability fragments    tier T02 contemplative (5 audit sources)
 *  3. Temporal pause          tier T01 silence       (T02 → T03 bridge)
 *  4. Applied tension         tier T03 editorial     (peak tension)
 *  5. Temporal pause          tier T01 silence       (T03 → T02 bridge)
 *  6. Outcome layer           tier T02 contemplative (operational outcome)
 *  7. Operational threshold   tier T01 silence       (closing forward cue)
 *
 * Pacing per narrative-density-system.mdc §5.2 satisfied: no two
 * consecutive scenes share a tier outside sustained T01 silence.
 *
 * Page-level emotional contour: HC-03 peaked at T04 IMMERSIVE; HC-04
 * peaks at T03 EDITORIAL — descending arc into operational territory
 * before page closure (per chapter-architecture.mdc §4.3).
 *
 * TemporalPause is REUSED from the Hero canon (HeroNarrative). HC-04
 * does not invent its own silence primitive. Reusing the same component
 * guarantees identical rhythm tokens across all chapters.
 *
 * Pure structural ownership. No motion, no atmosphere — both live in
 * sibling subtrees and bind to the data-* selectors declared here.
 */
export function CapabilitiesComposition() {
  return (
    <>
      <OperationalPrelude />

      <CapabilityFragments />

      <TemporalPause height="8vh" mdHeight="4vh" label="silence" />

      <AppliedTension />

      <TemporalPause height="8vh" mdHeight="4vh" label="silence" />

      <OutcomeLayer />

      <OperationalThreshold />
    </>
  );
}
