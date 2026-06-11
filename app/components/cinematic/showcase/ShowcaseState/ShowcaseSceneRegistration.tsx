"use client";

import { useEffect } from "react";
import { useNarrativeTimeline } from "@/app/providers/NarrativeTimelineProvider";
import type { SceneRegistration } from "@/app/lib/timeline/types";

/**
 * ShowcaseSceneRegistration — publishes ACT B's narrative scene
 * timeline to NarrativeTimelineProvider.
 *
 * Sequence per the approved HC-05 production architecture §8:
 *
 *   protagonist (0.00 - 0.38)  T03 EDITORIAL     immersion  (expanded M-04 threshold)
 *   breath      (0.38 - 0.52)  T02 CONTEMPLATIVE reflection (proof exhale)
 *   compacts    (0.52 - 0.86)  T03 EDITORIAL     immersion  (two compact thresholds)
 *   reframe     (0.86 - 1.00)  T02 CONTEMPLATIVE release    (act close — case ends T02 ✓)
 *
 * Verifications:
 *  - narrative-density-system.mdc §5.2 alternation: T03 → T02 → T03
 *    → T02 — strict alternation; no consecutive same-tier scenes.
 *  - `case` chapter terminal scene at T02 — canonical rule honored.
 *  - §7.4 pinned sections: ACT B declares NO pin (pins 2/2 consumed;
 *    and the proof must not shout — sobriety IS the safety message).
 *  - Zero T04 / T05 (architecture §13): the immersive case peak
 *    lives in /work/[slug].
 *
 * Pacing: evidence strictly sequential — one piece per scroll
 * movement, never a simultaneous grid (failure mode §15.2:
 * "galería"). Protagonist first: the film hands over its best proof
 * without holding back.
 *
 * No DOM. State-only.
 */

const SHOWCASE_SCENES: SceneRegistration[] = [
  {
    id: "showcase:protagonist",
    chapter: "case",
    instanceId: "showcase",
    density: "T03_EDITORIAL",
    emotionalState: "immersion",
    start: 0.0,
    end: 0.38,
  },
  {
    id: "showcase:breath",
    chapter: "case",
    instanceId: "showcase",
    density: "T02_CONTEMPLATIVE",
    emotionalState: "reflection",
    start: 0.38,
    end: 0.52,
  },
  {
    id: "showcase:compacts",
    chapter: "case",
    instanceId: "showcase",
    density: "T03_EDITORIAL",
    emotionalState: "immersion",
    start: 0.52,
    end: 0.86,
  },
  {
    id: "showcase:reframe",
    chapter: "case",
    instanceId: "showcase",
    density: "T02_CONTEMPLATIVE",
    emotionalState: "release",
    start: 0.86,
    end: 1.0,
  },
];

export function ShowcaseSceneRegistration() {
  const { registerScene } = useNarrativeTimeline();

  useEffect(() => {
    const unregisters = SHOWCASE_SCENES.map((scene) => registerScene(scene));
    return () => {
      for (const fn of unregisters) fn();
    };
  }, [registerScene]);

  return null;
}
