"use client";

import { useEffect } from "react";
import { useTransitionDirector } from "@/app/providers/TransitionDirectorProvider";
import type { KnowledgePageData } from "@/content/knowledge/types";

export function knowledgeCodaInstanceId(pageData: KnowledgePageData): string {
  return `knowledge-coda-${pageData.slug}`;
}

export function KnowledgeCodaRegistration({
  pageData,
}: {
  pageData: KnowledgePageData;
}) {
  const { registerChapter } = useTransitionDirector();

  useEffect(() => {
    return registerChapter({
      id: "closing",
      instanceId: knowledgeCodaInstanceId(pageData),
      density: "T01_SILENCE",
      entryBehavior: "atmospheric_fade",
      exitBehavior: "scroll_release",
      transitionProfile: "silent",
    });
  }, [registerChapter, pageData]);

  return null;
}
