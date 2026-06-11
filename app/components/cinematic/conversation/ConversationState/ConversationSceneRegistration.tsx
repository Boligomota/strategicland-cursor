"use client";

import { useEffect } from "react";
import { useNarrativeTimeline } from "@/app/providers/NarrativeTimelineProvider";
import type { SceneRegistration } from "@/app/lib/timeline/types";

/**
 * ConversationSceneRegistration — publishes ACT C's narrative scene
 * timeline to NarrativeTimelineProvider.
 *
 * Sequence per the approved HC-05 production architecture §9 / §13:
 *
 *   invitation (0.00 - 0.35)  T02 CONTEMPLATIVE release  (the single door)
 *   coda       (0.35 - 0.62)  T01 SILENCE       silence  (afterimage sentence)
 *   persistent (0.62 - 1.00)  T01 SILENCE       silence  (compressed tail + signature)
 *
 * Verifications:
 *  - Two consecutive T01 scenes: the exclusive privilege of the
 *    `closing` type — canonical (§5.2 exception), honored here only.
 *  - T02 → T01 → T01: the site converts at contemplative tier and
 *    still ends, as it always did, in silence — now a silence with a
 *    door ajar behind it.
 *  - §7.4 pinned sections: ACT C declares NO pin.
 *  - Page-level contour (architecture §13): ... → T03 → T02 — the
 *    descent into conversation and silence closes the film.
 *
 * INSTANCE KEYING — scenes carry instanceId "conversation" (Sprint 02
 * migration), so NarrativeTimeline groups them under the act's own
 * instance channel; they never interleave with the incumbent
 * "closing" instance timeline. "One terminal chapter at a time"
 * remains a narrative (canon) constraint, not a registry one.
 *
 * No DOM. State-only.
 */

const CONVERSATION_SCENES: SceneRegistration[] = [
  {
    id: "conversation:invitation",
    chapter: "closing",
    instanceId: "conversation",
    density: "T02_CONTEMPLATIVE",
    emotionalState: "release",
    start: 0.0,
    end: 0.35,
  },
  {
    id: "conversation:coda",
    chapter: "closing",
    instanceId: "conversation",
    density: "T01_SILENCE",
    emotionalState: "silence",
    start: 0.35,
    end: 0.62,
  },
  {
    id: "conversation:persistent",
    chapter: "closing",
    instanceId: "conversation",
    density: "T01_SILENCE",
    emotionalState: "silence",
    start: 0.62,
    end: 1.0,
  },
];

export function ConversationSceneRegistration() {
  const { registerScene } = useNarrativeTimeline();

  useEffect(() => {
    const unregisters = CONVERSATION_SCENES.map((scene) =>
      registerScene(scene)
    );
    return () => {
      for (const fn of unregisters) fn();
    };
  }, [registerScene]);

  return null;
}
