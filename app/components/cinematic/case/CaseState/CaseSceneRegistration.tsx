"use client";

import { useEffect } from "react";
import { useNarrativeTimeline } from "@/app/providers/NarrativeTimelineProvider";
import type { SceneRegistration } from "@/app/lib/timeline/types";

/**
 * CaseSceneRegistration — publishes the Case chapter's narrative scene
 * timeline to NarrativeTimelineProvider.
 *
 * Canonical sequence per .rules/narrative-density-system.mdc §3 (case
 * row): T03 (intro) → T04 (frame) → T05 (pinned) → T04 (release) →
 * T02 (caption hold). Velocity profile: accelerating — energy compounds
 * into the pinned climax, then decompresses into the caption cooldown
 * (§5.5).
 *
 *   intro    (0.00 - 0.12)  T03 EDITORIAL      curiosity
 *   frame    (0.12 - 0.30)  T04 IMMERSIVE      immersion
 *   pinned   (0.30 - 0.70)  T05 KINETIC        compression
 *   release  (0.70 - 0.88)  T04 IMMERSIVE      release
 *   caption  (0.88 - 1.00)  T02 CONTEMPLATIVE  reflection
 *
 * The pinned window is the widest (0.40 of chapter progress) because
 * the horizontal transport's pin distance consumes the majority of the
 * chapter's scroll length — the timeline windows must match the felt
 * scroll geometry, not an abstract even split.
 *
 * The chapter ends on T02 per the hard constraint in
 * narrative-density-system.mdc: `case` chapters MUST end on T02
 * (cooldown), never on T05 (compression with no release). No trailing
 * hold — the chapter releases cleanly at the bottom boundary so the
 * next chapter takes the page.
 *
 * No DOM. State-only.
 */

const CASE_SCENES: SceneRegistration[] = [
  {
    id: "case:intro",
    chapter: "case",
    density: "T03_EDITORIAL",
    emotionalState: "curiosity",
    start: 0.0,
    end: 0.12,
  },
  {
    id: "case:frame",
    chapter: "case",
    density: "T04_IMMERSIVE",
    emotionalState: "immersion",
    start: 0.12,
    end: 0.3,
  },
  {
    id: "case:pinned",
    chapter: "case",
    density: "T05_KINETIC",
    emotionalState: "compression",
    start: 0.3,
    end: 0.7,
  },
  {
    id: "case:release",
    chapter: "case",
    density: "T04_IMMERSIVE",
    emotionalState: "release",
    start: 0.7,
    end: 0.88,
  },
  {
    id: "case:caption",
    chapter: "case",
    density: "T02_CONTEMPLATIVE",
    emotionalState: "reflection",
    start: 0.88,
    end: 1.0,
  },
];

export function CaseSceneRegistration() {
  const { registerScene } = useNarrativeTimeline();

  useEffect(() => {
    const unregisters = CASE_SCENES.map((scene) => registerScene(scene));
    return () => {
      for (const fn of unregisters) fn();
    };
  }, [registerScene]);

  return null;
}
