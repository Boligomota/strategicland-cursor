"use client";

import { useEffect } from "react";
import { useNarrativeTimeline } from "@/app/providers/NarrativeTimelineProvider";
import type { SceneRegistration } from "@/app/lib/timeline/types";

/**
 * StoryscapeSceneRegistration — publishes ACT A's narrative scene
 * timeline to NarrativeTimelineProvider.
 *
 * Sequence per the approved HC-05 production architecture §7:
 *
 *   threshold (0.00 - 0.15)  T01 SILENCE       silence    (marker 005)
 *   attention (0.15 - 0.40)  T02 CONTEMPLATIVE curiosity  (first current)
 *   identity  (0.40 - 0.65)  T03 EDITORIAL     immersion  (second current)
 *   future    (0.65 - 0.85)  T03 EDITORIAL     immersion  (third current)
 *   seam      (0.85 - 1.00)  T01 SILENCE       silence    (seam → ACT B)
 *
 * Verifications:
 *  - narrative-density-system.mdc §5.2 alternation: T01 → T02 → T03
 *    → T03 → T01. Two consecutive T03 scenes are the act's editorial
 *    peak (currents two and three of the climate) — same-tier
 *    adjacency below T04 is canonical (HC-02 / HC-04 precedent).
 *  - §7.1 not applicable (no T04+ peak — architecture §13: zero T04
 *    in HC-05; the immersive evidence peak lives in /work).
 *  - §7.4 pinned sections: ACT A declares NO pin.
 *
 * INSTANCE KEYING — scenes carry instanceId "storyscape" (Sprint 02
 * migration), so NarrativeTimeline groups them under the act's own
 * instance channel. They no longer interleave with HC-02 Methodology's
 * "editorial" scenes even when both chapters are mounted.
 *
 * No DOM. State-only.
 */

const STORYSCAPE_SCENES: SceneRegistration[] = [
  {
    id: "storyscape:threshold",
    chapter: "editorial",
    instanceId: "storyscape",
    density: "T01_SILENCE",
    emotionalState: "silence",
    start: 0.0,
    end: 0.15,
  },
  {
    id: "storyscape:attention",
    chapter: "editorial",
    instanceId: "storyscape",
    density: "T02_CONTEMPLATIVE",
    emotionalState: "curiosity",
    start: 0.15,
    end: 0.4,
  },
  {
    id: "storyscape:identity",
    chapter: "editorial",
    instanceId: "storyscape",
    density: "T03_EDITORIAL",
    emotionalState: "immersion",
    start: 0.4,
    end: 0.65,
  },
  {
    id: "storyscape:future",
    chapter: "editorial",
    instanceId: "storyscape",
    density: "T03_EDITORIAL",
    emotionalState: "immersion",
    start: 0.65,
    end: 0.85,
  },
  {
    id: "storyscape:seam",
    chapter: "editorial",
    instanceId: "storyscape",
    density: "T01_SILENCE",
    emotionalState: "silence",
    start: 0.85,
    end: 1.0,
  },
];

export function StoryscapeSceneRegistration() {
  const { registerScene } = useNarrativeTimeline();

  useEffect(() => {
    const unregisters = STORYSCAPE_SCENES.map((scene) => registerScene(scene));
    return () => {
      for (const fn of unregisters) fn();
    };
  }, [registerScene]);

  return null;
}
