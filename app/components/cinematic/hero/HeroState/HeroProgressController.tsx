"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTransitionDirector } from "@/app/providers/TransitionDirectorProvider";
import { useNarrativeTimeline } from "@/app/providers/NarrativeTimelineProvider";
import { useHero } from "./HeroProvider";

/**
 * HeroProgressController — derives a normalized 0..1 progress signal across
 * the Hero scene root and writes it into HeroProvider.
 *
 * Owns one ScrollTrigger. Cleans up via gsap.context().
 *
 * Lifecycle wiring:
 *  - onLeave (chapter bottom passes viewport top): chapter exits its
 *    immersion phase. Sets HeroProvider.chapterPhase = "exiting" and
 *    requests TransitionDirector to move to T5_RELEASE("hero").
 *  - onEnterBack: scroll re-enters chapter from below. Director already
 *    settled to T0_IDLE; we don't force a re-entry here (would loop).
 *    Hero remains visually intact because no T3 ran.
 *
 * Re-runs when `root` materializes (HeroScene callback ref).
 */
export function HeroProgressController() {
  const { root, setProgress, setChapterPhase } = useHero();
  const { requestRelease, isImmersed } = useTransitionDirector();
  const { updateChapterProgress } = useNarrativeTimeline();
  const stRef = useRef<ScrollTrigger | null>(null);

  useLayoutEffect(() => {
    if (!root) return;

    const ctx = gsap.context(() => {
      stRef.current = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          setProgress(self.progress);
          // Push to narrative timeline. NarrativeTimelineProvider
          // throttles internally (≈1% delta), so we can call freely.
          updateChapterProgress("hero", self.progress);
        },
        onLeave: () => {
          setChapterPhase("exiting");
          if (isImmersed("hero")) requestRelease("hero");
        },
        onEnterBack: () => setChapterPhase("settled"),
      });
    }, root);

    return () => {
      stRef.current?.kill();
      stRef.current = null;
      ctx.revert();
    };
  }, [
    root,
    setProgress,
    setChapterPhase,
    requestRelease,
    isImmersed,
    updateChapterProgress,
  ]);

  return null;
}
