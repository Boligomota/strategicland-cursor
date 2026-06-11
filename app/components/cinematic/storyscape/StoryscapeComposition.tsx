"use client";

import { ActivationThreshold } from "./StoryscapeNarrative/ActivationThreshold";
import { AttentionCurrent } from "./StoryscapeNarrative/AttentionCurrent";
import { IdentityCurrent } from "./StoryscapeNarrative/IdentityCurrent";
import { FutureCurrent } from "./StoryscapeNarrative/FutureCurrent";
import { EvidenceSeam } from "./StoryscapeNarrative/EvidenceSeam";

/**
 * StoryscapeComposition — canonical narrative ordering of HC-05 ·
 * ACT A (ChapterId="editorial", chapter name "storyscape").
 *
 *  1. Activation threshold   tier T01 silence       (marker 005)
 *  2. Attention current      tier T02 contemplative (kinetic wave)
 *  3. Identity current       tier T03 editorial     (warm wave — peak)
 *  4. Future current         tier T03 editorial     (serene wave — peak)
 *  5. Evidence seam          tier T01 silence       (seam → ACT B)
 *
 * The nine strategic activators are experienced as three currents of
 * three — climate, not menu (architecture §7). The absolute rule:
 * NOT a list of 9 (services grid = forbidden vocabulary). No
 * imagery anywhere in the act (§10) — typography over the global
 * atmospheric field is the visual decision.
 *
 * Pure structural ownership. No motion, no atmosphere — motion
 * lives in StoryscapeReveal (one temperature per current) and binds
 * to the data-* selectors declared inside the narrative scenes.
 */
export function StoryscapeComposition() {
  return (
    <>
      <ActivationThreshold />
      <AttentionCurrent />
      <IdentityCurrent />
      <FutureCurrent />
      <EvidenceSeam />
    </>
  );
}
