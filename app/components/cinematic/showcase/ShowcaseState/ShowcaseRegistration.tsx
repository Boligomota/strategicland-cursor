"use client";

import { useEffect } from "react";
import { useTransitionDirector } from "@/app/providers/TransitionDirectorProvider";

/**
 * ShowcaseRegistration — publishes ACT B's chapter contract to the
 * TransitionDirector.
 *
 * Per the approved HC-05 production architecture (D1), the Showcase
 * act extends the canonical `case` type — the second and FINAL case
 * slot of the page (the approved HC-04 architecture consumes the
 * first). "No two case chapters in a row" is satisfied because
 * ACT A (editorial · storyscape) interposes.
 *
 * Chapter-level dominant tier T03_EDITORIAL — the evidence does not
 * shout (architecture §8): no pin, no T04/T05 on the homepage; the
 * immersive evidence peak (full M-04 with its T05 horizontal pin)
 * lives in /work/[slug] with its own virgin budget. The scene
 * cascade (T03 → T02 → T03 → T02) is owned by
 * ShowcaseSceneRegistration. The `case` chapter MUST end at T02 —
 * canonical rule, honored.
 *
 * INSTANCE KEYING — the director registry is keyed by
 * ChapterInstanceId (Sprint 02 migration). This act registers the
 * `case` chapter TYPE under the explicit instance "showcase", so it
 * coexists with any other `case` registration (M-04 on /work, the
 * approved HC-04 ROUTE A re-type) without collision. Mount-safe;
 * remaining mount blockers are governance-level (HC-04 re-type +
 * Human Director authorizations).
 *
 * No DOM. State-only.
 */
export function ShowcaseRegistration() {
  const { registerChapter } = useTransitionDirector();

  useEffect(() => {
    return registerChapter({
      id: "case",
      instanceId: "showcase",
      density: "T03_EDITORIAL",
      entryBehavior: "atmospheric_fade",
      exitBehavior: "scroll_release",
      transitionProfile: "default",
    });
  }, [registerChapter]);

  return null;
}
