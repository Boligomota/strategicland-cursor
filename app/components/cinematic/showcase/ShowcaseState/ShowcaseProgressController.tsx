"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNarrativeTimeline } from "@/app/providers/NarrativeTimelineProvider";
import { useShowcase } from "./ShowcaseProvider";

/**
 * ShowcaseProgressController — derives a normalized 0..1 progress
 * signal across the Showcase chapter root and pushes it into both
 * ShowcaseProvider (local) and NarrativeTimelineProvider (global
 * scene-level density orchestration).
 *
 * Owns one ScrollTrigger. Cleans up via gsap.context().
 *
 * Mirrors MethodologyProgressController / ClosingProgressController.
 * ACT B is a passive scroll publisher — no pin, no requestRelease,
 * no requestHandoff. Transitions out via simple scroll_release
 * (architecture §8): the act does not pin, does not hijack, does not
 * accelerate — the evidence is presented with the calm of those who
 * have more.
 */
export function ShowcaseProgressController() {
  const { root, setProgress, setChapterPhase } = useShowcase();
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
          // Instance-keyed channel — must match ShowcaseRegistration's
          // instanceId, NOT the shared `case` chapter type.
          updateChapterProgress("showcase", self.progress);
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
