"use client";

import { useEffect } from "react";
import { useTransitionDirector } from "@/app/providers/TransitionDirectorProvider";

/**
 * StoryscapeRegistration — publishes ACT A's chapter contract to the
 * TransitionDirector.
 *
 * Per the approved HC-05 production architecture (D1), the Storyscape
 * act extends the canonical `editorial` type (long-form conceptual
 * sequence, allowed tiers T01/T02/T03 per
 * narrative-density-system.mdc §3). The nine strategic activators are
 * experienced as three currents of three — climate, not menu — which
 * is editorial disposition, not case or cultural.
 *
 * Chapter-level dominant tier T03_EDITORIAL — the scene cascade
 * (T01 → T02 → T03 → T03 → T01) is owned by
 * StoryscapeSceneRegistration.
 *
 * INSTANCE KEYING — the director registry is keyed by
 * ChapterInstanceId (Sprint 02 migration). This act registers the
 * `editorial` chapter TYPE under the explicit instance "storyscape",
 * so it coexists with HC-02 Methodology (instance "editorial" via the
 * instanceId default) without overwriting its registration or merging
 * progress channels in NarrativeTimeline. Mount-safe; remaining mount
 * blockers are governance-level (Human Director authorizations).
 *
 * No DOM. State-only.
 */
export function StoryscapeRegistration() {
  const { registerChapter } = useTransitionDirector();

  useEffect(() => {
    return registerChapter({
      id: "editorial",
      instanceId: "storyscape",
      density: "T03_EDITORIAL",
      entryBehavior: "atmospheric_fade",
      exitBehavior: "scroll_release",
      transitionProfile: "default",
    });
  }, [registerChapter]);

  return null;
}
