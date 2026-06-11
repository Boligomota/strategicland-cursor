"use client";

import { useEffect } from "react";
import { useTransitionDirector } from "@/app/providers/TransitionDirectorProvider";

/**
 * SignalRegistration — publishes HC-03's chapter contract to the
 * TransitionDirector.
 *
 * Per .rules/chapter-architecture.mdc §2 new chapters MUST extend a
 * canonical type — not invent new categories. HC-03 extends the
 * `cultural` type ("atmospheric immersion, cultural framing,
 * manifestos") which exactly matches the brief: an observational
 * intelligence layer sensing patterns beneath contemporary behavior.
 *
 * Per narrative-density-system.mdc §3 the cultural type allows tiers
 * T01 / T03 / T04 / T05. HC-03 uses T01 → T03 → T04 → T03 → T01 (no
 * pinned T05 — the brief explicitly forbids spectacle / dashboard
 * affordances). Chapter-level dominant tier is T04_IMMERSIVE since
 * Pattern Constellation is the chapter's atmospheric peak.
 *
 * Per chapter-architecture.mdc §4.2 cultural chapters are placed as
 * climactic moments (≤ 1 per page). HC-03 is the page's only cultural
 * chapter; this registration is canon-compliant.
 *
 * Lifecycle: the director's `registerChapter` is a no-op against the
 * lifecycle when state !== T0_IDLE, so this registration silently
 * lands metadata in the registry without stealing focus from the
 * upstream chapters. Atmospheric layers + scene density still read
 * from this registration via `registrationFor("cultural")`.
 *
 * No DOM. State-only.
 */
export function SignalRegistration() {
  const { registerChapter } = useTransitionDirector();

  useEffect(() => {
    return registerChapter({
      id: "cultural",
      density: "T04_IMMERSIVE",
      entryBehavior: "atmospheric_fade",
      exitBehavior: "scroll_release",
      transitionProfile: "default",
    });
  }, [registerChapter]);

  return null;
}
