"use client";

import { useEffect } from "react";
import { useTransitionDirector } from "@/app/providers/TransitionDirectorProvider";

/**
 * CaseRegistration — publishes the Case chapter's contract to the
 * TransitionDirector.
 *
 * ChapterId="case" — the canonical type for project deep-dives per
 * .rules/chapter-architecture.mdc §2. This is the last unconsumed slot
 * in the locked ChapterId vocabulary (hero / editorial / cultural /
 * human / closing are already registered by HC-01..HC-05).
 *
 * Per .rules/narrative-density-system.mdc §3 the `case` type allows
 * tiers T03 / T04 / T05 with the canonical sequence
 * T03 → T04 → T05 (pinned) → T04 → T02, and MUST end on T02 (cooldown,
 * never compression without release). The scene cascade is owned by
 * CaseSceneRegistration. Chapter-level dominant tier is T04_IMMERSIVE —
 * the pinned T05 is the climax, not the chapter's resting disposition.
 *
 * Atmospheric continuity:
 *  - entryBehavior: atmospheric_fade — same intake grammar as
 *    HC-02..HC-05; no veil on entry.
 *  - exitBehavior: scroll_release — passive boundary handoff.
 *  - transitionProfile: expansive — the canonical "long, breathing
 *    bridge (release after T05)" per app/lib/transitions/types.ts.
 *    The chapter exits from its T02 cooldown after a T05 peak; the
 *    outgoing bridge must breathe, not cut.
 *
 * Lifecycle: the director's `registerChapter` is a no-op against the
 * lifecycle when state !== T0_IDLE, so this registration silently lands
 * metadata in the registry without stealing focus from upstream
 * chapters. Atmospheric layers + scene density still read from this
 * registration via `registrationFor("case")`.
 *
 * No DOM. State-only.
 */
export function CaseRegistration() {
  const { registerChapter } = useTransitionDirector();

  useEffect(() => {
    return registerChapter({
      id: "case",
      density: "T04_IMMERSIVE",
      entryBehavior: "atmospheric_fade",
      exitBehavior: "scroll_release",
      transitionProfile: "expansive",
    });
  }, [registerChapter]);

  return null;
}
