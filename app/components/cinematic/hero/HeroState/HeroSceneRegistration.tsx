"use client";

import { useEffect } from "react";
import { useNarrativeTimeline } from "@/app/providers/NarrativeTimelineProvider";
import type { SceneRegistration } from "@/app/lib/timeline/types";

/**
 * HeroSceneRegistration — publishes HC-01's narrative scene timeline to
 * NarrativeTimelineProvider.
 *
 * Canonical sequence per .rules/narrative-density-system.mdc §4 (hero row)
 * with one re-immersion beat for the pinned horizontal slider:
 *
 *   establishing   (0.00 - 0.18)  T04 IMMERSIVE     immersion
 *   philosophy     (0.18 - 0.55)  T02 CONTEMPLATIVE reflection
 *   systems_pin    (0.55 - 0.85)  T04 IMMERSIVE     compression
 *   scroll_cue     (0.85 - 1.00)  T01 SILENCE       silence
 *
 * The scroll_cue + 0.05 hold preserves the "End of Sequence" boundary
 * silence after the chapter window technically ends — so the density
 * stays at T01 even as the scroll passes through the footer.
 *
 * No DOM. State-only.
 */

const HERO_SCENES: SceneRegistration[] = [
  {
    id: "hero:establishing",
    chapter: "hero",
    density: "T04_IMMERSIVE",
    emotionalState: "immersion",
    start: 0.0,
    end: 0.18,
  },
  {
    id: "hero:philosophy",
    chapter: "hero",
    density: "T02_CONTEMPLATIVE",
    emotionalState: "reflection",
    start: 0.18,
    end: 0.55,
  },
  {
    id: "hero:systems_pin",
    chapter: "hero",
    density: "T04_IMMERSIVE",
    emotionalState: "compression",
    start: 0.55,
    end: 0.85,
  },
  {
    id: "hero:scroll_cue",
    chapter: "hero",
    density: "T01_SILENCE",
    emotionalState: "silence",
    start: 0.85,
    end: 1.0,
    hold: 0.05,
  },
];

export function HeroSceneRegistration() {
  const { registerScene } = useNarrativeTimeline();

  useEffect(() => {
    const unregisters = HERO_SCENES.map((scene) => registerScene(scene));
    return () => {
      for (const fn of unregisters) fn();
    };
  }, [registerScene]);

  return null;
}
