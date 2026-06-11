"use client";

import { TemporalPause } from "@/app/components/cinematic/hero/HeroNarrative/TemporalPause";
import type { CaseData } from "@/content/work/types";
import { CaseHero } from "./CaseNarrative/CaseHero";
import { StrategicIntro } from "./CaseNarrative/StrategicIntro";
import { HorizontalSequence } from "./CaseNarrative/HorizontalSequence";
import { CreatorsBlock } from "./CaseNarrative/CreatorsBlock";
import { CaseReflection } from "./CaseNarrative/CaseReflection";

/**
 * CaseComposition — canonical narrative ordering of the Case chapter
 * (ChapterId="case", canon HC-06 · M-04 system).
 *
 *  1. Case hero             tier T03 editorial      (establishing, marker)
 *  2. Temporal pause        tier T01 silence        (intra-chapter)
 *  3. Strategic intro       tier T04 immersive      (frame: statement + meta-grid)
 *  4. Horizontal sequence   tier T05 kinetic        (pinned climax)
 *  5. Temporal pause        tier T01 silence        (decompression breath)
 *  6. Creators block        tier T04 immersive      (release: authorship)
 *  7. Case reflection       tier T02 contemplative  (mandatory cooldown)
 *
 * The chapter ends on T02 per the hard constraint in
 * narrative-density-system.mdc — never compression without release.
 * Scene windows in CaseSceneRegistration fold the TemporalPause
 * spacers into the preceding scene's window per canonical convention.
 *
 * TemporalPause is REUSED from the Hero canon (HeroNarrative) — this
 * chapter does not invent its own silence primitive (rule established
 * in HC-02 and held by every chapter since).
 *
 * Parametric: `caseData` flows down by explicit props — the narrative
 * scenes are pure templates; ALL copy lives in content/work/<slug>/.
 *
 * Pure structural ownership. No motion, no atmosphere — both live in
 * sibling subtrees (CaseMotion/*) and bind to the data-* selectors
 * declared inside the narrative scenes.
 */
export function CaseComposition({ caseData }: { caseData: CaseData }) {
  return (
    <>
      <CaseHero caseData={caseData} />

      <TemporalPause height="26vh" mdHeight="12vh" label="silence" />

      <StrategicIntro caseData={caseData} />

      <HorizontalSequence caseData={caseData} />

      <TemporalPause height="28vh" mdHeight="14vh" label="silence (release)" />

      <CreatorsBlock caseData={caseData} />

      <CaseReflection caseData={caseData} />
    </>
  );
}
