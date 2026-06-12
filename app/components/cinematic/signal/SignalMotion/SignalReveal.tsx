"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, STAGGER } from "@/app/lib/motion";
import { useReducedMotion } from "@/app/providers/ReducedMotionProvider";
import { useTransitionDirector } from "@/app/providers/TransitionDirectorProvider";
import { useSignal } from "../SignalState/SignalProvider";

/**
 * SignalReveal — owns HC-03's scroll choreography.
 *
 * Reveal grammar inherits the canonical micro-cognitive vocabulary
 * established by HC-02 — same EASE / DUR / STAGGER, same once-on-enter
 * triggers, same `clearProps` pattern that releases inline styles for
 * downstream CSS hover layers. No new motion systems, no new libraries.
 *
 * Per-scene reveal map (per .rules/narrative-density-system.mdc T-tier
 * ceilings):
 *
 *  prelude (T01)
 *    chapter marker drifts in opacity-only.
 *
 *  constellation (T04)
 *    anchor → sub-line (definition, sincronía, desfase, alineación)
 *    → correlations cascade (stagger 0.04 between correlations,
 *    longer DUR.cinematic for the anchor).
 *
 *  fragments (T03)
 *    Each fragment runs its own micro-cognitive cascade:
 *      1. signal line (opacity 0.12 → 0.32, scaleX 0.92 → 1, EASE.drift)
 *      2. label → body cascade (stagger 0.04, EASE.cinematic)
 *    Fragments themselves stage in a slow `signal-detection` cadence
 *    via per-element scrollTriggers — each fragment lifts when it
 *    individually enters the viewport, never as a single burst.
 *
 *  interpretation (T03)
 *    machine → human dual statement cluster, then resolve sub-line.
 *
 *  compression (T01)
 *    forward cue opacity drift only (§05 → §06 threshold).
 *
 * Gating:
 *  - Reduced motion: skip entirely; chapter renders fully visible.
 *  - Intake gate: reveals only arm once TransitionDirector reports
 *    intake complete. Prevents racing the Hero intro on first load.
 *
 * Lifecycle: one gsap.context() per mount. revert() kills triggers +
 * tweens on unmount.
 */
export function SignalReveal({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { root } = useSignal();
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
        "[data-signal-chapter-marker]"
      );
      const preludeSection = wrap.querySelector<HTMLElement>(
        '[data-signal-scene="prelude"]'
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

      // ── Fragments — per-fragment cascade, one trigger per item ──
      const fragments = wrap.querySelectorAll<HTMLElement>(
        "[data-signal-fragment]"
      );
      fragments.forEach((fragment) => {
        const line = fragment.querySelector<HTMLElement>(
          "[data-signal-fragment-line]"
        );
        const cascade = fragment.querySelectorAll<HTMLElement>(
          "[data-signal-fragment-label],[data-signal-fragment-body]"
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

      // ── Constellation — anchor → sub → correlations ─────────────
      const constellationSection = wrap.querySelector<HTMLElement>(
        '[data-signal-scene="constellation"]'
      );
      const anchor = wrap.querySelector<HTMLElement>(
        "[data-signal-pattern-anchor]"
      );
      const anchorSub = wrap.querySelector<HTMLElement>(
        "[data-signal-pattern-anchor-sub]"
      );
      const correlations = wrap.querySelectorAll<HTMLElement>(
        "[data-signal-pattern-correlation]"
      );
      if (constellationSection && anchor) {
        gsap.set(anchor, { opacity: 0, y: 20 });
        if (anchorSub) gsap.set(anchorSub, { opacity: 0, y: 14 });
        if (correlations.length > 0) {
          gsap.set(correlations, { opacity: 0, y: 12 });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: constellationSection,
            start: "top 70%",
            once: true,
          },
        });

        tl.to(anchor, {
          opacity: 1,
          y: 0,
          duration: DUR.cinematic,
          ease: EASE.gsap.cinematic,
          force3D: true,
          roundProps: "y",
          clearProps: "transform",
        });

        if (anchorSub) {
          tl.to(
            anchorSub,
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

        if (correlations.length > 0) {
          tl.to(
            correlations,
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

      // ── Interpretation — dual cluster + resolve ────────────────
      const interpretationSection = wrap.querySelector<HTMLElement>(
        '[data-signal-scene="interpretation"]'
      );
      const machineEl = wrap.querySelector<HTMLElement>(
        "[data-signal-interpretation-machine]"
      );
      const humanEl = wrap.querySelector<HTMLElement>(
        "[data-signal-interpretation-human]"
      );
      const resolveEl = wrap.querySelector<HTMLElement>(
        "[data-signal-interpretation-resolve]"
      );
      if (interpretationSection && machineEl && humanEl) {
        gsap.set([machineEl, humanEl], { opacity: 0, y: 18 });
        if (resolveEl) gsap.set(resolveEl, { opacity: 0, y: 12 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: interpretationSection,
            start: "top 75%",
            once: true,
          },
        });

        tl.to([machineEl, humanEl], {
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

      // ── Compression — forward cue only (§05 → §06 threshold) ───
      const compressionSection = wrap.querySelector<HTMLElement>(
        '[data-signal-scene="compression"]'
      );
      const compressionCue = wrap.querySelector<HTMLElement>(
        "[data-signal-compression-cue]"
      );
      if (compressionSection && compressionCue) {
        gsap.set(compressionCue, { opacity: 0 });

        gsap.to(compressionCue, {
          opacity: 1,
          duration: DUR.cinematic,
          ease: EASE.gsap.drift,
          scrollTrigger: {
            trigger: compressionSection,
            start: "top 80%",
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
