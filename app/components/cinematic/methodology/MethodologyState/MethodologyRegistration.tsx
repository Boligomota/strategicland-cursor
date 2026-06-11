"use client";

import { useEffect } from "react";
import { useTransitionDirector } from "@/app/providers/TransitionDirectorProvider";

/**
 * MethodologyRegistration — publishes HC-02's chapter contract to the
 * TransitionDirector.
 *
 * Per .rules/chapter-architecture.mdc §2 new chapters MUST extend a
 * canonical type — not invent new categories. This chapter extends the
 * `editorial` type (long-form text + manifesto + philosophy, allowed
 * tiers T01/T02/T03 per narrative-density-system.mdc §3).
 *
 * Chapter-level dominant tier T03_EDITORIAL — the scene cascade
 * (T01 → T02 → T03 → T02 → T01) is owned by MethodologySceneRegistration.
 *
 * Lifecycle: at boot the Hero has already entered T1_PRE_ENTRY (or
 * T4_IMMERSION if intake was restored from sessionStorage). The director's
 * `registerChapter` is a no-op against the lifecycle when state !== T0_IDLE,
 * so this registration silently lands metadata in the registry without
 * stealing focus from the Hero. Atmospheric layers + scene density still
 * read from this registration via `registrationFor("editorial")`.
 *
 * No DOM. State-only.
 */
export function MethodologyRegistration() {
  const { registerChapter } = useTransitionDirector();

  useEffect(() => {
    return registerChapter({
      id: "editorial",
      density: "T03_EDITORIAL",
      entryBehavior: "atmospheric_fade",
      exitBehavior: "scroll_release",
      transitionProfile: "default",
    });
  }, [registerChapter]);

  return null;
}
