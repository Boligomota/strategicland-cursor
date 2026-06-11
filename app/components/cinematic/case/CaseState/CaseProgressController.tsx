"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNarrativeTimeline } from "@/app/providers/NarrativeTimelineProvider";
import { useCase } from "./CaseProvider";

/**
 * CaseProgressController — derives a normalized 0..1 progress signal
 * across the Case chapter root and pushes it into both CaseProvider
 * (local) and NarrativeTimelineProvider (global scene-level density
 * orchestration).
 *
 * Owns one ScrollTrigger. Cleans up via gsap.context().
 *
 * Mirrors MethodologyProgressController: the chapter is a passive
 * scroll publisher. It does NOT request release / handoff on exit —
 * mid-page chapters keep the director's state machine untouched and
 * rely on atmospheric continuity rather than veil transitions.
 *
 * Note: the pinned horizontal transport extends the chapter's effective
 * scroll length via ScrollTrigger pinning. Because the pin spacer lives
 * INSIDE the chapter root, "bottom top" already accounts for the pin
 * distance — progress stays continuous through the pinned scene with
 * no special-casing here.
 *
 * Re-runs when `root` materializes (CaseScene callback ref).
 */
export function CaseProgressController() {
  const { root, setProgress, setChapterPhase } = useCase();
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
          // NarrativeTimelineProvider throttles internally (≈1% delta),
          // so we can call freely.
          updateChapterProgress("case", self.progress);
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
