"use client";

import { useEffect } from "react";
import { useTransitionDirector } from "@/app/providers/TransitionDirectorProvider";

/**
 * ClosingRegistration — publishes HC-05's chapter contract to the
 * TransitionDirector.
 *
 * ChapterId="closing" — the canonical type reserved for page closure
 * per .rules/chapter-architecture.mdc §6. This is the ONLY closing
 * chapter on the page and the natural final use of the type slot.
 *
 * Per the HC-05 blueprint, the chapter peaks at T02_CONTEMPLATIVE
 * (a single editorial surface — AfterimageFragment) but operates
 * predominantly in sustained T01 silence (Emergence + Persistent
 * frame the single peak). The chapter does NOT exceed T02 at any
 * point — the page-level emotional contour must continue descending
 * after HC-04's T03 EDITORIAL peak.
 *
 * Per chapter-architecture.mdc §4.2 sequencing rules `closing`
 * chapters occupy the final position. The page sequence is now
 * `hero → editorial → cultural → human → closing` — no adjacent
 * type repetition; rule satisfied.
 *
 * Atmospheric continuity:
 *  - entryBehavior: atmospheric_fade — the chapter inherits the
 *    same warm-black field; no veil between HC-04 and HC-05.
 *  - exitBehavior: scroll_release — there is no chapter beyond.
 *    The release simply lets the scroll position settle into the
 *    persistent atmospheric tail without producing a handoff.
 *  - transitionProfile: silent — explicit T01 ↔ T01 bridge from
 *    HC-04's OperationalThreshold into HC-05's EmergenceFromMemory.
 *
 * No DOM. State-only.
 */
export function ClosingRegistration() {
  const { registerChapter } = useTransitionDirector();

  useEffect(() => {
    return registerChapter({
      id: "closing",
      density: "T02_CONTEMPLATIVE",
      entryBehavior: "atmospheric_fade",
      exitBehavior: "scroll_release",
      transitionProfile: "silent",
    });
  }, [registerChapter]);

  return null;
}
