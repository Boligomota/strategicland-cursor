"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { EASE } from "@/app/lib/motion";
import { useTransitionDirector } from "@/app/providers/TransitionDirectorProvider";

/**
 * TransitionLayer — subtle cinematic veil for T3_TRANSITION.
 *
 * Responsibilities:
 *  - Fade a warm-black overlay in when T3_TRANSITION begins.
 *  - Hold at peakOpacity for the active timing's hold window.
 *  - Fade out as the director advances toward T4_IMMERSION(to).
 *  - Drive setTransitionProgress() so the director can complete the
 *    handoff. The director resolves T3 → T4 at progress ≥ 1.
 *
 * Constraints (canon-locked):
 *  - Invisible at rest. opacity:0 default.
 *  - No spectacle. Only opacity + color shift. No motion patterns.
 *  - No startup animation. Mounts inert.
 *  - z-index 9998 (above frame z100, below SystemLoader z9999).
 *
 * Reduced motion: still renders but skips the hold window; opacity
 * crossfade with EASE.gsap.cinematic remains acceptable contrast cue.
 */
export function TransitionLayer() {
  const ref = useRef<HTMLDivElement>(null);
  const { state, activeTransitionTiming, setTransitionProgress } =
    useTransitionDirector();

  // Track the last state.kind so we know when we transition INTO T3.
  const lastKindRef = useRef(state.kind);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const previous = lastKindRef.current;
    lastKindRef.current = state.kind;

    if (state.kind !== "T3_TRANSITION") {
      // Ensure veil is hidden whenever we are not in a transition.
      if (previous === "T3_TRANSITION") {
        gsap.to(el, {
          opacity: 0,
          duration: 0.6,
          ease: EASE.gsap.cinematic,
          overwrite: true,
        });
      }
      return;
    }

    if (!activeTransitionTiming) return;
    if (previous === "T3_TRANSITION") return; // already animating

    const { fadeIn, hold, fadeOut, peakOpacity } = activeTransitionTiming;

    const tl = gsap.timeline({
      defaults: { ease: EASE.gsap.cinematic, overwrite: true },
      onUpdate: () => {
        setTransitionProgress(tl.progress());
      },
      onComplete: () => {
        // Final tick. Director resolves to T4_IMMERSION at progress >= 1.
        setTransitionProgress(1);
      },
    });

    tl.to(el, { opacity: peakOpacity, duration: fadeIn });
    if (hold > 0) tl.to(el, { opacity: peakOpacity, duration: hold });
    tl.to(el, { opacity: 0, duration: fadeOut });

    return () => {
      tl.kill();
    };
  }, [state.kind, activeTransitionTiming, setTransitionProgress]);

  return (
    <div
      ref={ref}
      aria-hidden
      data-transition-layer
      className="pointer-events-none fixed inset-0 z-[9998]"
      style={{
        opacity: 0,
        background: "var(--bg-deep-warm)",
        willChange: "opacity",
      }}
    />
  );
}
