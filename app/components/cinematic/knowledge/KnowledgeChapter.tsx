"use client";

import type { KnowledgePageData } from "@/content/knowledge/types";
import { KnowledgeProvider } from "./KnowledgeState/KnowledgeProvider";
import { KnowledgeRegistration } from "./KnowledgeState/KnowledgeRegistration";
import { KnowledgeSceneRegistration } from "./KnowledgeState/KnowledgeSceneRegistration";
import { KnowledgeProgressController } from "./KnowledgeState/KnowledgeProgressController";
import { KnowledgeReveal } from "./KnowledgeMotion/KnowledgeReveal";
import { KnowledgeScene } from "./KnowledgeScene";
import { KnowledgeComposition } from "./KnowledgeComposition";

/**
 * KnowledgeChapter — parametric editorial chapter for internal
 * knowledge routes (Platform Expansion · Fase 0).
 *
 * ChapterId="editorial" · instance-keyed per KnowledgePageData.
 * Atmosphere + system shell inherited from app/layout.tsx.
 */
export function KnowledgeChapter({
  pageData,
}: {
  pageData: KnowledgePageData;
}) {
  return (
    <KnowledgeProvider pageData={pageData}>
      <KnowledgeRegistration />
      <KnowledgeSceneRegistration />
      <KnowledgeProgressController />

      <KnowledgeReveal>
        <KnowledgeScene>
          <KnowledgeComposition />
        </KnowledgeScene>
      </KnowledgeReveal>
    </KnowledgeProvider>
  );
}
