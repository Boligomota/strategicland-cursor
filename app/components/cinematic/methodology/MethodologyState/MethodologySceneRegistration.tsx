"use client";

import { useEffect } from "react";
import { useNarrativeTimeline } from "@/app/providers/NarrativeTimelineProvider";
import type { SceneRegistration } from "@/app/lib/timeline/types";

/**
 * MethodologySceneRegistration — publishes HC-02's narrative scene
 * timeline to NarrativeTimelineProvider.
 *
 * Sequence per .rules/narrative-density-system.mdc §3 (editorial row) +
 * §5.2 (no two consecutive scenes at the same tier outside sustained
 * silence). Velocity profile: decelerating pulse — calm entry, climb at
 * the framework climax, release into the threshold.
 *
 *   prelude    (0.00 - 0.10)  T01 SILENCE        silence
 *   statement  (0.10 - 0.30)  T02 CONTEMPLATIVE  reflection
 *   framework  (0.30 - 0.65)  T03 EDITORIAL      immersion
 *   tension    (0.65 - 0.88)  T02 CONTEMPLATIVE  reflection
 *   threshold  (0.88 - 1.00)  T01 SILENCE        silence
 *
 * The threshold scene closes the chapter without the prior +0.04 hold:
 * HC-02 density calibration removed it as "excessive hold behavior".
 * The chapter releases its T01 the instant scroll passes the bottom
 * boundary so whatever follows takes the page cleanly.
 *
 * No DOM. State-only.
 */

const METHODOLOGY_SCENES: SceneRegistration[] = [
  {
    id: "editorial:prelude",
    chapter: "editorial",
    density: "T01_SILENCE",
    emotionalState: "silence",
    start: 0.0,
    end: 0.1,
  },
  {
    id: "editorial:statement",
    chapter: "editorial",
    density: "T02_CONTEMPLATIVE",
    emotionalState: "reflection",
    start: 0.1,
    end: 0.3,
  },
  {
    id: "editorial:framework",
    chapter: "editorial",
    density: "T03_EDITORIAL",
    emotionalState: "immersion",
    start: 0.3,
    end: 0.65,
  },
  {
    id: "editorial:tension",
    chapter: "editorial",
    density: "T02_CONTEMPLATIVE",
    emotionalState: "reflection",
    start: 0.65,
    end: 0.88,
  },
  {
    id: "editorial:threshold",
    chapter: "editorial",
    density: "T01_SILENCE",
    emotionalState: "silence",
    start: 0.88,
    end: 1.0,
  },
];

export function MethodologySceneRegistration() {
  const { registerScene } = useNarrativeTimeline();

  useEffect(() => {
    const unregisters = METHODOLOGY_SCENES.map((scene) => registerScene(scene));
    return () => {
      for (const fn of unregisters) fn();
    };
  }, [registerScene]);

  return null;
}
