"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNarrativeTimeline } from "@/app/providers/NarrativeTimelineProvider";
import { useCapabilities } from "./CapabilitiesProvider";

/**
 * CapabilitiesProgressController — derives a normalized 0..1 progress
 * signal across the Capabilities chapter root and pushes it into both
 * CapabilitiesProvider (local) and NarrativeTimelineProvider (global
 * scene-level density orchestration).
 *
 * Owns one ScrollTrigger. Cleans up via gsap.context().
 *
 * Mirrors HeroProgressController / MethodologyProgressController /
 * SignalProgressController. The chapter does NOT request release /
 * handoff — HC-04 is a passive scroll publisher inside the director's
 * T0_IDLE between-chapter state, keeping the state machine untouched
 * and avoiding T3 veil overlays where atmospheric continuity is the
 * design intent.
 */
export function CapabilitiesProgressController() {
  const { root, setProgress, setChapterPhase } = useCapabilities();
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
          updateChapterProgress("human", self.progress);
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
