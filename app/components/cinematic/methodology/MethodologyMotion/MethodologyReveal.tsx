"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, STAGGER } from "@/app/lib/motion";
import { useReducedMotion } from "@/app/providers/ReducedMotionProvider";
import { useTransitionDirector } from "@/app/providers/TransitionDirectorProvider";
import { useMethodology } from "../MethodologyState/MethodologyProvider";

/**
 * MethodologyReveal — owns the chapter's scroll choreography.
 *
 * The reveal grammar is INHERITED from HeroPinnedSequence, not reinvented:
 * same easings (EASE.gsap.cinematic / drift), same durations (DUR.standard
 * / cinematic), same stagger gaps (STAGGER.scene). Reveals fire ONCE on
 * scroll enter — no scrub — to preserve restraint and immunity to reverse
 * scroll jitter (per atmospheric motion restraint pass).
 *
 * Per density tier ceilings (.rules/narrative-density-system.mdc):
 *  - Statement (T02): 1 reveal cluster (statement lines + subline).
 *  - Framework (T03): per-step reveal, max 4 staggered beats.
 *  - Tension (T02): 1 reveal cluster (statement + caption).
 *  - Prelude / Threshold (T01): no reveals on entry — silence is the entry.
 *
 * Gating:
 *  - Reduced motion: skip entirely; the chapter renders fully visible.
 *  - Intake gate: do not arm triggers until TransitionDirector reports
 *    intake complete. This prevents Methodology reveals from racing the
 *    Hero intro on first load.
 *
 * Lifecycle: one gsap.context() per mount. revert() kills triggers + tweens.
 */
export function MethodologyReveal({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { root } = useMethodology();
  const { isIntakeComplete } = useTransitionDirector();

  useLayoutEffect(() => {
    if (reduced) return;
    if (!isIntakeComplete) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (!root) return;
    if (!wrap.isConnected) return;

    const ctx = gsap.context(() => {
      const statementLines = Array.from(
        wrap.querySelectorAll<HTMLElement>(".methodology-statement-line")
      );
      const statementSection = wrap.querySelector<HTMLElement>(
        '[data-methodology-scene="statement"]'
      );
      if (statementSection && statementLines.length > 0) {
        gsap.set(statementLines, { opacity: 0, y: 24 });
        const statementTl = gsap.timeline({
          scrollTrigger: {
            trigger: statementSection,
            start: "top 72%",
            once: true,
          },
        });
        statementTl.to(statementLines, {
          opacity: 1,
          y: 0,
          duration: DUR.cinematic,
          ease: EASE.gsap.cinematic,
          stagger: STAGGER.scene,
          force3D: true,
          roundProps: "y",
        });
      }

      // Framework cascade per .rules/narrative-density-system.mdc T03 +
      // HC-02 micro-cognitive interaction pass:
      //
      //   1. Signal line activates first — opacity 0.12 → 0.32, scaleX
      //      0.92 → 1, slow EASE.drift over DUR.epic. Reads as "the
      //      signal enters awareness", not as a UI affordance.
      //   2. Number → headline → body cascade with stagger 0.04 (40 ms
      //      between beats, 80 ms total tail). Cognitive sequencing,
      //      no theatrical staircase.
      //
      // clearProps releases inline styles after the cascade so the CSS
      // hover whisper (`[data-methodology-framework-list]:hover ...`)
      // can take over opacity control without GSAP inline overrides
      // winning specificity. The line keeps its inline state because it
      // is not part of the hover whisper surface.
      const frameworkSteps = wrap.querySelectorAll<HTMLElement>(
        ".methodology-framework-step"
      );
      frameworkSteps.forEach((step) => {
        const line = step.querySelector<HTMLElement>(
          "[data-methodology-framework-line]"
        );
        const cascade = step.querySelectorAll<HTMLElement>(
          "[data-methodology-framework-number]," +
            "[data-methodology-framework-title]," +
            "[data-methodology-framework-body]"
        );
        if (cascade.length === 0) return;

        gsap.set(cascade, { opacity: 0, y: 14 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: step, start: "top 82%", once: true },
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
          line ? 0.1 : 0
        );
      });

      const tensionSection = wrap.querySelector<HTMLElement>(
        '[data-methodology-scene="tension"]'
      );
      if (tensionSection) {
        const tensionTargets = [
          tensionSection.querySelector<HTMLElement>(
            "[data-methodology-tension-lead]"
          ),
          tensionSection.querySelector<HTMLElement>(
            "[data-methodology-tension-statement] .methodology-tension-line"
          ),
          tensionSection.querySelector<HTMLElement>(
            "[data-methodology-tension-definition]"
          ),
          tensionSection.querySelector<HTMLElement>(
            "[data-methodology-tension-caption]"
          ),
        ].filter((el): el is HTMLElement => el != null);

        if (tensionTargets.length > 0) {
          gsap.set(tensionTargets, { opacity: 0, y: 24 });
          const tensionTl = gsap.timeline({
            scrollTrigger: {
              trigger: tensionSection,
              start: "top 72%",
              once: true,
            },
          });
          tensionTl.to(tensionTargets, {
            opacity: 1,
            y: 0,
            duration: DUR.cinematic,
            ease: EASE.gsap.cinematic,
            stagger: STAGGER.scene,
            force3D: true,
            roundProps: "y",
          });
        }
      }

      const frameworkSection = wrap.querySelector<HTMLElement>(
        '[data-methodology-scene="framework"]'
      );
      const frameworkDeep = wrap.querySelector<HTMLElement>(
        "[data-methodology-framework-deep]"
      );
      const frameworkControl = wrap.querySelector<HTMLElement>(
        "[data-methodology-framework-control]"
      );
      const frameworkLink = wrap.querySelector<HTMLElement>(
        "[data-methodology-framework-link]"
      );
      if (
        frameworkSection &&
        (frameworkDeep || frameworkControl || frameworkLink)
      ) {
        const frameworkProse = [
          frameworkDeep,
          frameworkControl,
          frameworkLink,
        ].filter((el): el is HTMLElement => el != null);
        gsap.set(frameworkProse, { opacity: 0, y: 14 });
        const frameworkProseTl = gsap.timeline({
          scrollTrigger: {
            trigger: frameworkSection,
            start: "top 78%",
            once: true,
          },
        });
        frameworkProseTl.to(frameworkProse, {
          opacity: 1,
          y: 0,
          duration: DUR.cinematic,
          ease: EASE.gsap.cinematic,
          stagger: STAGGER.scene,
          force3D: true,
          roundProps: "y",
        });
      }

      const thresholdCue = wrap.querySelector<HTMLElement>(
        "[data-methodology-threshold-cue]"
      );
      const thresholdSection = wrap.querySelector<HTMLElement>(
        '[data-methodology-scene="threshold"]'
      );
      if (thresholdCue && thresholdSection) {
        gsap.set(thresholdCue, { opacity: 0 });
        const thresholdTl = gsap.timeline({
          scrollTrigger: {
            trigger: thresholdSection,
            start: "top 80%",
            once: true,
          },
        });
        thresholdTl.to(thresholdCue, {
          opacity: 1,
          duration: DUR.cinematic,
          ease: EASE.gsap.drift,
        });
      }

      const chapterMarker = wrap.querySelector<HTMLElement>(
        "[data-methodology-chapter-marker]"
      );
      const preludeSection = wrap.querySelector<HTMLElement>(
        '[data-methodology-scene="prelude"]'
      );
      if (chapterMarker && preludeSection) {
        gsap.set(chapterMarker, { opacity: 0 });
        const preludeTl = gsap.timeline({
          scrollTrigger: {
            trigger: preludeSection,
            start: "top 85%",
            once: true,
          },
        });
        preludeTl.to(chapterMarker, {
          opacity: 1,
          duration: DUR.cinematic,
          ease: EASE.gsap.drift,
        });
      }
    }, wrap);

    let disposed = false;
    let fontsRefreshed = false;
    const refreshAfterFonts = () => {
      if (fontsRefreshed || disposed) return;
      fontsRefreshed = true;
      ScrollTrigger.refresh();
    };
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(refreshAfterFonts);
    }
    const refreshTimer = window.setTimeout(refreshAfterFonts, 1200);

    return () => {
      disposed = true;
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [reduced, isIntakeComplete, root]);

  return <div ref={wrapRef}>{children}</div>;
}
