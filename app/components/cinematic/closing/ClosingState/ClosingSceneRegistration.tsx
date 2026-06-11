"use client";

import { useEffect } from "react";
import { useNarrativeTimeline } from "@/app/providers/NarrativeTimelineProvider";
import type { SceneRegistration } from "@/app/lib/timeline/types";

/**
 * ClosingSceneRegistration — publishes HC-05's narrative scene
 * timeline to NarrativeTimelineProvider.
 *
 * Sequence per the HC-05 blueprint:
 *
 *   emergence  (0.00 - 0.22)  T01 SILENCE       silence
 *   afterimage (0.22 - 0.50)  T02 CONTEMPLATIVE reflection  (chapter peak)
 *   persistent (0.50 - 1.00)  T01 SILENCE       silence     (sustained)
 *
 * Verifications:
 *  - narrative-density-system.mdc §5.2 alternation: sustained T01
 *    between dissolution scenes is canonical (the §5.2 exception
 *    is HC-05's exact case). T01 → T02 → T01 respects the rule
 *    (no two consecutive T02+).
 *  - §7.1 not applicable (no T04+ peak).
 *  - §7.4 pinned sections per page ≤ 2: HC-05 declares NO pin.
 *  - Page-level descending contour: HC-04 peaked at T03 EDITORIAL;
 *    HC-05 peaks at T02 CONTEMPLATIVE — descending arc preserved.
 *
 * Scene windows fold the inter-scene TemporalPause spacers into the
 * preceding scene's window per canonical convention. The
 * PersistentAtmosphere window also absorbs the 30–40vh atmospheric
 * tail that ends the document.
 *
 * No DOM. State-only.
 */

const CLOSING_SCENES: SceneRegistration[] = [
  {
    id: "closing:emergence",
    chapter: "closing",
    density: "T01_SILENCE",
    emotionalState: "silence",
    start: 0.0,
    end: 0.22,
  },
  {
    id: "closing:afterimage",
    chapter: "closing",
    density: "T02_CONTEMPLATIVE",
    emotionalState: "reflection",
    start: 0.22,
    end: 0.5,
  },
  {
    id: "closing:persistent",
    chapter: "closing",
    density: "T01_SILENCE",
    emotionalState: "silence",
    start: 0.5,
    end: 1.0,
  },
];

export function ClosingSceneRegistration() {
  const { registerScene } = useNarrativeTimeline();

  useEffect(() => {
    const unregisters = CLOSING_SCENES.map((scene) => registerScene(scene));
    return () => {
      for (const fn of unregisters) fn();
    };
  }, [registerScene]);

  return null;
}
