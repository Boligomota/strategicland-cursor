"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNarrativeTimeline } from "@/app/providers/NarrativeTimelineProvider";
import { useStoryscape } from "./StoryscapeProvider";

/**
 * StoryscapeProgressController — derives a normalized 0..1 progress
 * signal across the Storyscape chapter root and pushes it into both
 * StoryscapeProvider (local) and NarrativeTimelineProvider (global
 * scene-level density orchestration).
 *
 * Owns one ScrollTrigger. Cleans up via gsap.context().
 *
 * Mirrors MethodologyProgressController / ClosingProgressController.
 * ACT A is a passive scroll publisher — no requestRelease, no
 * requestHandoff; the chapter does not pin (architecture §14: pins
 * 2/2 consumed by HC-01 + HC-04).
 */
export function StoryscapeProgressController() {
  const { root, setProgress, setChapterPhase } = useStoryscape();
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
          // Instance-keyed channel — must match StoryscapeRegistration's
          // instanceId, NOT the shared `editorial` chapter type.
          updateChapterProgress("storyscape", self.progress);
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
