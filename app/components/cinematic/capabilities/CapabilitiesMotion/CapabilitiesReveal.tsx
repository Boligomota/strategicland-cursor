"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, STAGGER } from "@/app/lib/motion";
import { useReducedMotion } from "@/app/providers/ReducedMotionProvider";
import { useTransitionDirector } from "@/app/providers/TransitionDirectorProvider";
import { useCapabilities } from "../CapabilitiesState/CapabilitiesProvider";

/**
 * CapabilitiesReveal — owns HC-04's scroll choreography.
 *
 * Reveal grammar inherits the canonical micro-cognitive vocabulary
 * established by HC-02 / HC-03 — same EASE / DUR / STAGGER, same
 * once-on-enter triggers, same `clearProps` pattern that releases
 * inline styles for downstream CSS layers. No new motion systems.
 *
 * Per-scene reveal map (per .rules/narrative-density-system.mdc T-tier
 * ceilings):
 *
 *  prelude (T01)
 *    chapter marker drifts in opacity-only.
 *
 *  fragments (T02)
 *    Each capability runs its own micro-cognitive cascade, mirroring
 *    Methodology framework-step behaviour:
 *      1. capability line (opacity 0.12 → 0.32, scaleX 0.92 → 1, EASE.drift)
 *      2. eyebrow → headline → body cascade (stagger 0.04, EASE.cinematic)
 *    Capabilities themselves stage in slow operational cadence via
 *    per-element scrollTriggers — each lifts when it individually
 *    enters the viewport, never as a single burst.
 *
 *  tension (T03)
 *    capacity + consequence dual cluster, then resolve sub-line.
 *
 *  outcome (T02)
 *    anchor → sub → outcome tokens cascade.
 *
 *  threshold (T01)
 *    cue opacity drift only.
 *
 * Gating:
 *  - Reduced motion: skip entirely; chapter renders fully visible.
 *  - Intake gate: reveals only arm once TransitionDirector reports
 *    intake complete. Prevents racing the Hero intro on first load.
 *
 * Lifecycle: one gsap.context() per mount. revert() kills triggers +
 * tweens on unmount.
 */
export function CapabilitiesReveal({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { root } = useCapabilities();
  const { isIntakeComplete } = useTransitionDirector();

  useLayoutEffect(() => {
    if (reduced) return;
    if (!isIntakeComplete) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (!root) return;

    const ctx = gsap.context(() => {
      // ── Prelude — chapter marker quiet drift ────────────────────
      const chapterMarker = wrap.querySelector<HTMLElement>(
        "[data-capabilities-chapter-marker]"
      );
      const preludeSection = wrap.querySelector<HTMLElement>(
        '[data-capabilities-scene="prelude"]'
      );
      if (chapterMarker && preludeSection) {
        gsap.set(chapterMarker, { opacity: 0 });
        gsap.to(chapterMarker, {
          opacity: 1,
          duration: DUR.cinematic,
          ease: EASE.gsap.drift,
          scrollTrigger: {
            trigger: preludeSection,
            start: "top 85%",
            once: true,
          },
        });
      }

      // ── Fragments — per-capability cascade, one trigger per item ──
      const fragments = wrap.querySelectorAll<HTMLElement>(
        "[data-capability-fragment]"
      );
      fragments.forEach((fragment) => {
        const line = fragment.querySelector<HTMLElement>(
          "[data-capability-fragment-line]"
        );
        const cascade = fragment.querySelectorAll<HTMLElement>(
          "[data-capability-fragment-eyebrow],[data-capability-fragment-headline],[data-capability-fragment-body]"
        );
        if (cascade.length === 0) return;

        gsap.set(cascade, { opacity: 0, y: 12 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: fragment,
            start: "top 88%",
            once: true,
          },
        });

        if (line) {
          tl.to(
            line,
            {
              opacity: 0.32,
              scaleX: 1,
              duration: DUR.epic,
              ease: EASE.gsap.drift,
              force3D: true,
            },
            0
          );
        }

        tl.to(
          cascade,
          {
            opacity: 1,
            y: 0,
            duration: DUR.cinematic,
            ease: EASE.gsap.cinematic,
            stagger: 0.04,
            force3D: true,
            roundProps: "y",
            clearProps: "opacity,transform",
          },
          0.08
        );
      });

      // ── Tension — capacity + consequence, then resolve ─────────
      const tensionSection = wrap.querySelector<HTMLElement>(
        '[data-capabilities-scene="tension"]'
      );
      const capacityEl = wrap.querySelector<HTMLElement>(
        "[data-capabilities-tension-capacity]"
      );
      const consequenceEl = wrap.querySelector<HTMLElement>(
        "[data-capabilities-tension-consequence]"
      );
      const resolveEl = wrap.querySelector<HTMLElement>(
        "[data-capabilities-tension-resolve]"
      );
      if (tensionSection && capacityEl && consequenceEl) {
        gsap.set([capacityEl, consequenceEl], { opacity: 0, y: 18 });
        if (resolveEl) gsap.set(resolveEl, { opacity: 0, y: 12 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: tensionSection,
            start: "top 75%",
            once: true,
          },
        });

        tl.to([capacityEl, consequenceEl], {
          opacity: 1,
          y: 0,
          duration: DUR.cinematic,
          ease: EASE.gsap.cinematic,
          stagger: STAGGER.editorial,
          force3D: true,
          roundProps: "y",
          clearProps: "transform",
        });

        if (resolveEl) {
          tl.to(
            resolveEl,
            {
              opacity: 1,
              y: 0,
              duration: DUR.cinematic,
              ease: EASE.gsap.cinematic,
              force3D: true,
              roundProps: "y",
              clearProps: "transform",
            },
            "-=0.4"
          );
        }
      }

      // ── Outcome — anchor → sub → tokens cascade ────────────────
      const outcomeSection = wrap.querySelector<HTMLElement>(
        '[data-capabilities-scene="outcome"]'
      );
      const outcomeAnchor = wrap.querySelector<HTMLElement>(
        "[data-capabilities-outcome-anchor]"
      );
      const outcomeAnchorSub = wrap.querySelector<HTMLElement>(
        "[data-capabilities-outcome-anchor-sub]"
      );
      const outcomeTokens = wrap.querySelectorAll<HTMLElement>(
        "[data-capabilities-outcome-token]"
      );
      if (outcomeSection && outcomeAnchor) {
        gsap.set(outcomeAnchor, { opacity: 0, y: 18 });
        if (outcomeAnchorSub) gsap.set(outcomeAnchorSub, { opacity: 0, y: 12 });
        if (outcomeTokens.length > 0) {
          gsap.set(outcomeTokens, { opacity: 0, y: 10 });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outcomeSection,
            start: "top 75%",
            once: true,
          },
        });

        tl.to(outcomeAnchor, {
          opacity: 1,
          y: 0,
          duration: DUR.cinematic,
          ease: EASE.gsap.cinematic,
          force3D: true,
          roundProps: "y",
          clearProps: "transform",
        });

        if (outcomeAnchorSub) {
          tl.to(
            outcomeAnchorSub,
            {
              opacity: 1,
              y: 0,
              duration: DUR.cinematic,
              ease: EASE.gsap.cinematic,
              force3D: true,
              roundProps: "y",
              clearProps: "transform",
            },
            "-=0.5"
          );
        }

        if (outcomeTokens.length > 0) {
          tl.to(
            outcomeTokens,
            {
              opacity: 1,
              y: 0,
              duration: DUR.cinematic,
              ease: EASE.gsap.cinematic,
              stagger: STAGGER.editorial,
              force3D: true,
              roundProps: "y",
              clearProps: "opacity,transform",
            },
            "-=0.4"
          );
        }
      }

      // ── Threshold — cue opacity drift only ────────────────────
      const thresholdSection = wrap.querySelector<HTMLElement>(
        '[data-capabilities-scene="threshold"]'
      );
      const thresholdCue = wrap.querySelector<HTMLElement>(
        "[data-capabilities-threshold-cue]"
      );
      if (thresholdSection && thresholdCue) {
        gsap.set(thresholdCue, { opacity: 0 });
        gsap.to(thresholdCue, {
          opacity: 1,
          duration: DUR.cinematic,
          ease: EASE.gsap.drift,
          scrollTrigger: {
            trigger: thresholdSection,
            start: "top 85%",
            once: true,
          },
        });
      }
    }, wrap);

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
