"use client";

import { useEffect } from "react";
import { useNarrativeTimeline } from "@/app/providers/NarrativeTimelineProvider";
import type { SceneRegistration } from "@/app/lib/timeline/types";

/**
 * SignalSceneRegistration — publishes HC-03's narrative scene timeline
 * to NarrativeTimelineProvider.
 *
 * Sequence per .rules/narrative-density-system.mdc §3 (cultural row,
 * abridged — no T05 since the brief forbids spectacle):
 *
 *   prelude       (0.00 - 0.10)  T01 SILENCE       silence
 *   fragments     (0.10 - 0.45)  T03 EDITORIAL     immersion
 *   constellation (0.45 - 0.68)  T04 IMMERSIVE     immersion   (peak)
 *   interpretation(0.68 - 0.86)  T03 EDITORIAL     reflection
 *   compression   (0.86 - 1.00)  T01 SILENCE       silence     (close)
 *
 * Verifications:
 *  - §5.2 alternation OK (T01→T03→T04→T03→T01, no consecutive same
 *    outside T01).
 *  - §7.1 TIER 04+ followed by TIER ≤ 02 within ≤ 2 scenes:
 *    constellation (T04) → interpretation (T03) → compression (T01).
 *    The T01 cooldown lands at scene+2 ✓.
 *  - §7.4 pinned sections per page ≤ 2: HC-03 declares NO pinned
 *    section (Hero already holds the page's single pin).
 *
 * No DOM. State-only.
 */

const SIGNAL_SCENES: SceneRegistration[] = [
  {
    id: "cultural:prelude",
    chapter: "cultural",
    density: "T01_SILENCE",
    emotionalState: "silence",
    start: 0.0,
    end: 0.1,
  },
  {
    id: "cultural:fragments",
    chapter: "cultural",
    density: "T03_EDITORIAL",
    emotionalState: "immersion",
    start: 0.1,
    end: 0.45,
  },
  {
    id: "cultural:constellation",
    chapter: "cultural",
    density: "T04_IMMERSIVE",
    emotionalState: "immersion",
    start: 0.45,
    end: 0.68,
  },
  {
    id: "cultural:interpretation",
    chapter: "cultural",
    density: "T03_EDITORIAL",
    emotionalState: "reflection",
    start: 0.68,
    end: 0.86,
  },
  {
    id: "cultural:compression",
    chapter: "cultural",
    density: "T01_SILENCE",
    emotionalState: "silence",
    start: 0.86,
    end: 1.0,
  },
];

export function SignalSceneRegistration() {
  const { registerScene } = useNarrativeTimeline();

  useEffect(() => {
    const unregisters = SIGNAL_SCENES.map((scene) => registerScene(scene));
    return () => {
      for (const fn of unregisters) fn();
    };
  }, [registerScene]);

  return null;
}
