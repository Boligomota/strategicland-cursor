"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNarrativeTimeline } from "@/app/providers/NarrativeTimelineProvider";
import { useConversation } from "./ConversationProvider";

/**
 * ConversationProgressController — derives a normalized 0..1
 * progress signal across the Conversation chapter root and pushes it
 * into both ConversationProvider (local) and
 * NarrativeTimelineProvider (global scene-level density
 * orchestration).
 *
 * Owns one ScrollTrigger. Cleans up via gsap.context().
 *
 * Mirrors ClosingProgressController. ACT C is a passive scroll
 * publisher — no requestRelease, no requestHandoff. The chapter is
 * the final scroll surface of the document; the state machine simply
 * settles into T0_IDLE as the scroll passes the chapter bottom
 * (which is also the document bottom).
 */
export function ConversationProgressController() {
  const { root, setProgress, setChapterPhase } = useConversation();
  const { updateChapterProgress } = useNarrativeTimeline();
  const stRef = useRef<ScrollTrigger | null>(null);

  useLayoutEffect(() => {
    if (!root) return;

    const ctx = gsap.context(() => {
      stRef.current = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom top",
        onEnter: () => setChapterPhase("settled"),
        onUpdate: (self) => {
          setProgress(self.progress);
          // Instance-keyed channel — must match ConversationRegistration's
          // instanceId, NOT the shared `closing` chapter type.
          updateChapterProgress("conversation", self.progress);
        },
        onLeave: () => setChapterPhase("exiting"),
        onEnterBack: () => setChapterPhase("settled"),
      });
    }, root);

    return () => {
      stRef.current?.kill();
      stRef.current = null;
      ctx.revert();
    };
  }, [root, setProgress, setChapterPhase, updateChapterProgress]);

  return null;
}
