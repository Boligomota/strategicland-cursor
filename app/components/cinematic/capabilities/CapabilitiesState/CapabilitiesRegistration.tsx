"use client";

import { useEffect } from "react";
import { useTransitionDirector } from "@/app/providers/TransitionDirectorProvider";

/**
 * CapabilitiesRegistration — publishes HC-04's chapter contract to the
 * TransitionDirector.
 *
 * Per .rules/chapter-architecture.mdc §2 new chapters MUST extend a
 * canonical type. Available IDs after HC-01..HC-03 are `case`, `human`,
 * `closing`. HC-04 extends the `human` type — the brief explicitly
 * frames the chapter around "human-directed strategic execution",
 * "human consequence", "human outcomes", "spatial human presence". The
 * `human` ChapterId carries that semantic correctly. `case` would
 * misread as project deep-dive (forbidden by the brief — "this is NOT
 * an agency capabilities grid"); `closing` is reserved for the future
 * page closure chapter.
 *
 * The chapter stretches the canonical `human` definition ("stillness /
 * intimate scale / founder note") to accommodate "operational reality",
 * driven by the brief, but stays within the type's sparse / restrained
 * disposition (no spectacle, no SaaS energy). Per
 * narrative-density-system.mdc the `human` type allows tiers T01 / T02
 * / T03 — HC-04 uses the full editorial range, peaking at T03 EDITORIAL
 * for Applied Tension. Chapter-level dominant tier is T03_EDITORIAL.
 *
 * Per chapter-architecture.mdc §4.2 sequencing rules `human` chapters
 * sit between dense `case` chapters as breathing rests. The current
 * page sequence is `hero → editorial → cultural → human` — no
 * adjacent type repetition; rule satisfied.
 *
 * Lifecycle: the director's `registerChapter` is a no-op against the
 * lifecycle when state !== T0_IDLE, so this registration silently
 * lands metadata in the registry without stealing focus from upstream
 * chapters. Atmospheric layers + scene density still read from this
 * registration via `registrationFor("human")`.
 *
 * No DOM. State-only.
 */
export function CapabilitiesRegistration() {
  const { registerChapter } = useTransitionDirector();

  useEffect(() => {
    return registerChapter({
      id: "human",
      density: "T03_EDITORIAL",
      entryBehavior: "atmospheric_fade",
      exitBehavior: "scroll_release",
      transitionProfile: "default",
    });
  }, [registerChapter]);

  return null;
}
