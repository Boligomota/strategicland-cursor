"use client";

import { useEffect } from "react";
import { useTransitionDirector } from "@/app/providers/TransitionDirectorProvider";
import { useKnowledge } from "./KnowledgeProvider";

/**
 * KnowledgeRegistration — publishes the knowledge page chapter contract.
 * ChapterId="editorial" with explicit instanceId per route.
 */
export function KnowledgeRegistration() {
  const { registerChapter } = useTransitionDirector();
  const { pageData } = useKnowledge();

  useEffect(() => {
    return registerChapter({
      id: "editorial",
      instanceId: pageData.instanceId,
      density: "T03_EDITORIAL",
      entryBehavior: "atmospheric_fade",
      exitBehavior: "scroll_release",
      transitionProfile: "default",
    });
  }, [registerChapter, pageData.instanceId]);

  return null;
}
