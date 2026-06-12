"use client";

import { useEffect, useMemo } from "react";
import { useNarrativeTimeline } from "@/app/providers/NarrativeTimelineProvider";
import type { SceneRegistration } from "@/app/lib/timeline/types";
import { useKnowledge } from "./KnowledgeProvider";

/**
 * KnowledgeSceneRegistration — editorial scene windows for knowledge routes.
 * Mirrors MethodologySceneRegistration pacing; instance-keyed per page.
 */
export function KnowledgeSceneRegistration() {
  const { registerScene } = useNarrativeTimeline();
  const { pageData } = useKnowledge();

  const scenes = useMemo<SceneRegistration[]>(
    () => [
      {
        id: `${pageData.instanceId}:prelude`,
        chapter: "editorial",
        instanceId: pageData.instanceId,
        density: "T01_SILENCE",
        emotionalState: "silence",
        start: 0.0,
        end: 0.1,
      },
      {
        id: `${pageData.instanceId}:opening`,
        chapter: "editorial",
        instanceId: pageData.instanceId,
        density: "T02_CONTEMPLATIVE",
        emotionalState: "reflection",
        start: 0.1,
        end: 0.3,
      },
      {
        id: `${pageData.instanceId}:blocks`,
        chapter: "editorial",
        instanceId: pageData.instanceId,
        density: "T03_EDITORIAL",
        emotionalState: "immersion",
        start: 0.3,
        end: 0.88,
      },
      {
        id: `${pageData.instanceId}:threshold`,
        chapter: "editorial",
        instanceId: pageData.instanceId,
        density: "T01_SILENCE",
        emotionalState: "silence",
        start: 0.88,
        end: 1.0,
      },
    ],
    [pageData.instanceId]
  );

  useEffect(() => {
    const unregisters = scenes.map((scene) => registerScene(scene));
    return () => {
      for (const fn of unregisters) fn();
    };
  }, [registerScene, scenes]);

  return null;
}
