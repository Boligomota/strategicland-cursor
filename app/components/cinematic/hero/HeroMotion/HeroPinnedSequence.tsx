"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR } from "@/app/lib/motion";
import { jitter } from "@/app/lib/irregularity";
import { useReducedMotion } from "@/app/providers/ReducedMotionProvider";
import { useTransitionDirector } from "@/app/providers/TransitionDirectorProvider";
import { useHero } from "../HeroState/HeroProvider";

/**
 * HeroPinnedSequence — owns the canonical Hero scroll choreography:
 *
 *  1. Hero title intro after loader (post-loader phase trigger)
 *     - lines (titular + sub-título) y:100→0, opacity:0→1, stagger
 *       jittered around 0.15
 *  2. Hero title parallax on scroll (y:150, scrub)
 *
 * Philosophy / meta / bottom-meta choreography was removed with the
 * non-canonical hero sections (sitemap compliance pass).
 *
 * One gsap.context() per mount; revert on unmount kills all timelines
 * and ScrollTriggers cleanly. ScrollTrigger.refresh() is dispatched
 * after font load to handle layout shift.
 *
 * Wraps children passthrough — does not introduce DOM.
 */

export function HeroPinnedSequence({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { root } = useHero();
  const { isIntakeComplete } = useTransitionDirector();

  useLayoutEffect(() => {
    if (reduced) return;
    // Gate hero intro choreography on TransitionDirector intake completion,
    // not on the chapter's own phase. Loader is now a system-level concern.
    if (!isIntakeComplete) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    // Wait for the chapter root to be registered so ScrollTrigger
    // calculations use the final laid-out tree.
    if (!root) return;

    const ctx = gsap.context(() => {
      const titleLines = wrap.querySelectorAll<HTMLElement>(
        "[data-hero-title-line]"
      );
      if (titleLines.length > 0) {
        gsap.from(titleLines, {
          y: 100,
          opacity: 0,
          duration: jitter(DUR.epic, 0.08),
          ease: EASE.gsap.drift,
          stagger: { each: jitter(0.15, 0.18), from: "start" },
          delay: 0.2,
          clearProps: "transform,opacity",
        });
      }

      const titleGroup = wrap.querySelector<HTMLElement>(
        "[data-hero-title-group]"
      );
      const heroSection = wrap.querySelector<HTMLElement>("[data-hero-section]");
      if (titleGroup && heroSection) {
        // Title parallax: vertical depth displacement only.
        // Atmospheric motion restraint pass removed `opacity: 0` — the
        // fade-out at scroll competed with the next section's reveal
        // and read as attention leakage. y:150 alone preserves spatial
        // continuity without dissolving the establishing block.
        gsap.to(titleGroup, {
          y: 150,
          ease: "none",
          force3D: true,
          roundProps: "y",
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

    }, wrap);

    // Refresh once fonts settle to avoid trigger position drift.
    let fontsRefreshed = false;
    const refreshAfterFonts = () => {
      if (fontsRefreshed) return;
      fontsRefreshed = true;
      ScrollTrigger.refresh();
    };
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(refreshAfterFonts);
    }
    const refreshTimer = window.setTimeout(refreshAfterFonts, 1200);

    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [reduced, isIntakeComplete, root]);

  return <div ref={wrapRef}>{children}</div>;
}
