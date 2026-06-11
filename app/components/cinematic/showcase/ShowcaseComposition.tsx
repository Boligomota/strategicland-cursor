"use client";

import { ProtagonistThreshold } from "./ShowcaseNarrative/ProtagonistThreshold";
import { ReflectionBreath } from "./ShowcaseNarrative/ReflectionBreath";
import { CompactThresholds } from "./ShowcaseNarrative/CompactThresholds";
import { EvidenceReframe } from "./ShowcaseNarrative/EvidenceReframe";

/**
 * ShowcaseComposition — canonical narrative ordering of HC-05 ·
 * ACT B (ChapterId="case", chapter name "showcase").
 *
 *  1. Protagonist threshold   tier T03 editorial     (expanded M-04 threshold)
 *  2. Reflection breath       tier T02 contemplative (proof exhale)
 *  3. Compact thresholds      tier T03 editorial     (two confirmations)
 *  4. Evidence reframe        tier T02 contemplative (act close — case ends T02)
 *
 * M-04 operates on two planes (architecture §8, decision D2):
 *  - Homepage plane (this act): each case as an M-04 THRESHOLD —
 *    the system's opening grammar, recognizable and intact,
 *    compressed and unpinned, linking to the full system.
 *  - Internal plane (/work/[slug]): the full M-04 — five canonical
 *    scenes with its T05 horizontal pin, its own display, its
 *    mandatory Reflection. M-04 was not reduced — it was placed.
 *    The homepage never duplicates it.
 *
 * Exactly four data points per case (§8): which forces it mobilized
 * (A→B tags) · which market tension it faced · which strategic
 * decision resolved it · what remained installed. Everything else
 * lives one click away (failure mode §15.3: "vertedero de casos").
 *
 * Pure structural ownership. No motion, no atmosphere — both live
 * in sibling subtrees and bind to the data-* selectors declared
 * inside the narrative scenes.
 */
export function ShowcaseComposition() {
  return (
    <>
      <ProtagonistThreshold />
      <ReflectionBreath />
      <CompactThresholds />
      <EvidenceReframe />
    </>
  );
}
