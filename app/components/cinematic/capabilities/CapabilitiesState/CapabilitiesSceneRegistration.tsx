"use client";

import { useEffect } from "react";
import { useNarrativeTimeline } from "@/app/providers/NarrativeTimelineProvider";
import type { SceneRegistration } from "@/app/lib/timeline/types";

/**
 * CapabilitiesSceneRegistration — publishes HC-04's narrative scene
 * timeline to NarrativeTimelineProvider.
 *
 * Sequence per .rules/narrative-density-system.mdc §3 (human row,
 * tiers T01 / T02 / T03 — no T04+ since the brief explicitly forbids
 * spectacle: "DO NOT create dashboards / animated widgets / flashy
 * interaction"):
 *
 *   prelude   (0.00 - 0.08)  T01 SILENCE       silence
 *   fragments (0.08 - 0.42)  T02 CONTEMPLATIVE reflection   (operational)
 *   tension   (0.42 - 0.66)  T03 EDITORIAL     immersion    (peak)
 *   outcome   (0.66 - 0.90)  T02 CONTEMPLATIVE reflection
 *   threshold (0.90 - 1.00)  T01 SILENCE       silence      (close)
 *
 * Verifications:
 *  - §5.2 alternation OK (T01→T02→T03→T02→T01, no consecutive same
 *    outside terminal T01 windows).
 *  - §7.1 TIER 04+ followed by TIER ≤ 02: not applicable (chapter
 *    peaks at T03).
 *  - §7.4 pinned sections per page ≤ 2: HC-04 declares NO pinned
 *    section (Hero already holds the page's single pin).
 *  - Page-level descending arc: HC-03 peaked at T04 IMMERSIVE; HC-04
 *    peaks at T03 EDITORIAL — emotional contour drops correctly into
 *    operational territory before page closure.
 *
 * No DOM. State-only.
 */

const CAPABILITIES_SCENES: SceneRegistration[] = [
  {
    id: "human:prelude",
    chapter: "human",
    density: "T01_SILENCE",
    emotionalState: "silence",
    start: 0.0,
    end: 0.08,
  },
  {
    id: "human:fragments",
    chapter: "human",
    density: "T02_CONTEMPLATIVE",
    emotionalState: "reflection",
    start: 0.08,
    end: 0.42,
  },
  {
    id: "human:tension",
    chapter: "human",
    density: "T03_EDITORIAL",
    emotionalState: "immersion",
    start: 0.42,
    end: 0.66,
  },
  {
    id: "human:outcome",
    chapter: "human",
    density: "T02_CONTEMPLATIVE",
    emotionalState: "reflection",
    start: 0.66,
    end: 0.9,
  },
  {
    id: "human:threshold",
    chapter: "human",
    density: "T01_SILENCE",
    emotionalState: "silence",
    start: 0.9,
    end: 1.0,
  },
];

export function CapabilitiesSceneRegistration() {
  const { registerScene } = useNarrativeTimeline();

  useEffect(() => {
    const unregisters = CAPABILITIES_SCENES.map((scene) => registerScene(scene));
    return () => {
      for (const fn of unregisters) fn();
    };
  }, [registerScene]);

  return null;
}
