"use client";

import { TemporalPause } from "@/app/components/cinematic/hero/HeroNarrative/TemporalPause";
import { PersistentAtmosphere } from "@/app/components/cinematic/closing/ClosingNarrative/PersistentAtmosphere";
import { ConversationInvitation } from "./ConversationNarrative/ConversationInvitation";
import { MinimalSignature } from "./ConversationNarrative/MinimalSignature";

/**
 * ConversationComposition — canonical narrative ordering of HC-05 ·
 * ACT C (ChapterId="closing", chapter name "conversation").
 *
 *  1. Conversation invitation  tier T02 contemplative (trazabilidad operativa)
 *  2. Temporal pause           tier T01 silence       (dilated — survivor)
 *  3. Persistent atmosphere    tier T01 silence       (compressed tail)
 *  4. Minimal signature        tier T01 silence       (canonical footer restored)
 *
 * SITEMAP COMPLIANCE PASS: AfterimageFragment was UNMOUNTED from this
 * act — its sentence ("Alguien apoyó la mano en esta esquina…") has
 * no source in the Mapa de Sitio Estratégico. The component stays
 * intact in the legacy closing chapter (unmounted) pending Human
 * Director judgment.
 *
 * Migration plan compliance (architecture §11):
 *  - PersistentAtmosphere SURVIVES as the final scene. Its
 *    compression (minHeight 80vh → ~50vh) and the rewrite of its §15
 *    doctrine comment are deferred to the migration pass — they
 *    modify the incumbent chapter, which this foundation pass must
 *    not touch (Human Director authorization §14.b pending).
 *  - ONE dilated TemporalPause survives (28vh/18vh) — between the
 *    invitation and the coda. The second one is dropped (the
 *    compressed coda does not need it).
 *  - MinimalSignature restores the canonical closing footer the
 *    dissolution had omitted.
 *
 * The film still ends in atmosphere — now it ends in atmosphere
 * AFTER having opened a door. The two consecutive T01 scenes are the
 * exclusive privilege of the closing type.
 *
 * Pure structural ownership. No motion, no atmosphere — both live
 * in sibling subtrees and bind to the data-* selectors declared
 * inside the narrative scenes.
 */
export function ConversationComposition() {
  return (
    <>
      <ConversationInvitation />

      <TemporalPause height="6vh" mdHeight="4vh" label="silence (dilated)" />

      <PersistentAtmosphere />

      <MinimalSignature />
    </>
  );
}
