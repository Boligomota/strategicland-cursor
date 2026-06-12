"use client";

import { TemporalPause } from "@/app/components/cinematic/hero/HeroNarrative/TemporalPause";
import { KnowledgePrelude } from "./KnowledgeNarrative/KnowledgePrelude";
import { KnowledgeOpening } from "./KnowledgeNarrative/KnowledgeOpening";
import { KnowledgeBlocks } from "./KnowledgeNarrative/KnowledgeBlocks";
import { KnowledgeThreshold } from "./KnowledgeNarrative/KnowledgeThreshold";

/**
 * KnowledgeComposition — canonical narrative ordering for knowledge routes.
 * Editorial grammar inherited from MethodologyChapter (HC-02).
 */
export function KnowledgeComposition() {
  return (
    <>
      <KnowledgePrelude />
      <KnowledgeOpening />
      <TemporalPause height="8vh" mdHeight="4vh" label="silence" />
      <KnowledgeBlocks />
      <KnowledgeThreshold />
    </>
  );
}
