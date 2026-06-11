"use client";

import { useEffect } from "react";
import { useTransitionDirector } from "@/app/providers/TransitionDirectorProvider";

/**
 * ConversationRegistration — publishes ACT C's chapter contract to
 * the TransitionDirector.
 *
 * ChapterId="closing" per the approved HC-05 production architecture
 * (D1) — the canonical type reserved for page closure. Explicit
 * canonical precedent: the closing type admits embedded conversation
 * (CHAPTER_SYSTEM §4.4 "ClosingChapter with embedded contact form in
 * Scene01") and is the only chapter allowed two consecutive T01
 * scenes — the atmospheric coda survives inside it.
 *
 * The chapter peaks at T02_CONTEMPLATIVE (the invitation — the
 * site's conversion happens at contemplative tier, not at a peak;
 * that is the posture, architecture §13) and resolves into two
 * sustained T01 scenes.
 *
 * Same contract as the current ClosingRegistration: this act
 * REPLACES HC-05 · Future Memory as the page's terminal chapter when
 * the migration completes.
 *
 * INSTANCE KEYING — registers the `closing` chapter TYPE under the
 * explicit instance "conversation" (Sprint 02 migration), so it no
 * longer overwrites the incumbent ClosingRegistration (instance
 * "closing") at the registry level. Narratively the page still mounts
 * ONE terminal chapter at a time — that constraint is canon
 * (chapter-architecture §4.2), not a registry limitation.
 *
 * No DOM. State-only.
 */
export function ConversationRegistration() {
  const { registerChapter } = useTransitionDirector();

  useEffect(() => {
    return registerChapter({
      id: "closing",
      instanceId: "conversation",
      density: "T02_CONTEMPLATIVE",
      entryBehavior: "atmospheric_fade",
      exitBehavior: "scroll_release",
      transitionProfile: "silent",
    });
  }, [registerChapter]);

  return null;
}
