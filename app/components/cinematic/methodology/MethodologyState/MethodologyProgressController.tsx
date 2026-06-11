"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNarrativeTimeline } from "@/app/providers/NarrativeTimelineProvider";
import { useMethodology } from "./MethodologyProvider";

/**
 * MethodologyProgressController — derives a normalized 0..1 progress
 * signal across the Methodology chapter root and pushes it into both
 * MethodologyProvider (local) and NarrativeTimelineProvider (global
 * scene-level density orchestration).
 *
 * Owns one ScrollTrigger. Cleans up via gsap.context().
 *
 * Mirrors HeroProgressController. The chapter does NOT request
 * release / handoff on exit — HC-02 sits between HC-01 (already
 * released) and a future closing chapter. Treating the editorial
 * chapter as a passive scroll publisher keeps the director's state
 * machine untouched and avoids veil transitions where we want only
 * atmospheric continuity.
 */
export function MethodologyProgressController() {
  const { root, setProgress, setChapterPhase } = useMethodology();
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
          updateChapterProgress("editorial", self.progress);
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
