"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, STAGGER } from "@/app/lib/motion";
import { jitter } from "@/app/lib/irregularity";
import { useReducedMotion } from "@/app/providers/ReducedMotionProvider";
import { useTransitionDirector } from "@/app/providers/TransitionDirectorProvider";
import { useCase } from "../CaseState/CaseProvider";

/**
 * CaseReveal — owns the Case chapter's VERTICAL scroll choreography
 * (intro / frame / release / caption scenes). The pinned horizontal
 * scene is owned exclusively by CaseHorizontalTransport — the boundary
 * is the [data-case-horizontal-track] subtree, which this component
 * never targets.
 *
 * Reveal grammar inherits the canonical vocabulary established by
 * HC-02..HC-04 — same EASE / DUR / STAGGER tokens, same once-on-enter
 * triggers (no scrub on reveals; immune to reverse-scroll jitter), same
 * `clearProps` pattern releasing inline styles for downstream CSS
 * layers. No new motion language.
 *
 * Per-scene reveal map (per .rules/narrative-density-system.mdc tier
 * ceilings):
 *
 *  intro (T03)
 *    chapter marker drifts in opacity-only, then the intro statement
 *    cluster cascades (number → title → body shape, stagger
 *    STAGGER.tight with ±10% kinetic variance per
 *    .rules/human-irregularity-system.mdc §3.3).
 *
 *  frame (T04)
 *    signal line activates first (opacity 0.12 → 0.32, scaleX 0.92 → 1,
 *    EASE.drift over DUR.epic — the Methodology framework grammar),
 *    then the frame statement + caption cluster lifts.
 *
 *  release (T04)
 *    statement + caption dual cluster, single trigger, STAGGER.scene.
 *
 *  caption (T02)
 *    cooldown cue opacity drift only — the chapter must end quiet.
 *
 * Gating:
 *  - Reduced motion: skip entirely; the chapter renders fully visible.
 *  - Intake gate: reveals only arm once TransitionDirector reports
 *    intake complete. Prevents racing the Hero intro on first load.
 *
 * Lifecycle: one gsap.context() per mount. revert() kills triggers +
 * tweens on unmount.
 */
export function CaseReveal({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { root } = useCase();
  const { isIntakeComplete } = useTransitionDirector();

  useLayoutEffect(() => {
    if (reduced) return;
    if (!isIntakeComplete) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (!root) return;

    const ctx = gsap.context(() => {
      // ── Intro (T03) — chapter marker quiet drift ─────────────────
      const chapterMarker = wrap.querySelector<HTMLElement>(
        "[data-case-chapter-marker]"
      );
      const introSection = wrap.querySelector<HTMLElement>(
        '[data-case-scene="intro"]'
      );
      if (chapterMarker && introSection) {
        gsap.set(chapterMarker, { opacity: 0 });
        gsap.to(chapterMarker, {
          opacity: 1,
          duration: DUR.cinematic,
          ease: EASE.gsap.drift,
          scrollTrigger: {
            trigger: introSection,
            start: "top 85%",
            once: true,
          },
        });
      }

      // ── Intro (T03) — statement cascade ──────────────────────────
      // Kinetic sequences carry ±10% stagger variance (tighter than the
      // documentary ±25%, never zero) per human-irregularity-system §3.3.
      const introCascade = wrap.querySelectorAll<HTMLElement>(
        "[data-case-intro-eyebrow],[data-case-intro-title],[data-case-intro-body]"
      );
      if (introSection && introCascade.length > 0) {
        gsap.set(introCascade, { opacity: 0, y: 14 });
        gsap.to(introCascade, {
          opacity: 1,
          y: 0,
          duration: DUR.cinematic,
          ease: EASE.gsap.cinematic,
          stagger: jitter(STAGGER.tight, 0.1),
          force3D: true,
          roundProps: "y",
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: introSection,
            start: "top 72%",
            once: true,
          },
        });
      }

      // ── Frame (T04) — signal line, then statement cluster ────────
      const frameSection = wrap.querySelector<HTMLElement>(
        '[data-case-scene="frame"]'
      );
      const frameLine = wrap.querySelector<HTMLElement>(
        "[data-case-frame-line]"
      );
      const frameCluster = wrap.querySelectorAll<HTMLElement>(
        "[data-case-frame-statement],[data-case-frame-caption]"
      );
      if (frameSection && frameCluster.length > 0) {
        gsap.set(frameCluster, { opacity: 0, y: 18 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: frameSection,
            start: "top 75%",
            once: true,
          },
        });

        if (frameLine) {
          tl.to(
            frameLine,
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
          frameCluster,
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
          0.1
        );
      }

      // ── Release (T04) — decompression dual cluster ───────────────
      const releaseSection = wrap.querySelector<HTMLElement>(
        '[data-case-scene="release"]'
      );
      const releaseStatement = wrap.querySelector<HTMLElement>(
        "[data-case-release-statement]"
      );
      const releaseCaption = wrap.querySelector<HTMLElement>(
        "[data-case-release-caption]"
      );
      if (releaseSection && releaseStatement && releaseCaption) {
        gsap.set([releaseStatement, releaseCaption], { opacity: 0, y: 24 });
        gsap.to([releaseStatement, releaseCaption], {
          opacity: 1,
          y: 0,
          duration: DUR.cinematic,
          ease: EASE.gsap.cinematic,
          stagger: STAGGER.scene,
          force3D: true,
          roundProps: "y",
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: releaseSection,
            start: "top 72%",
            once: true,
          },
        });
      }

      // ── Caption (T02) — cooldown cue opacity drift only ──────────
      const captionSection = wrap.querySelector<HTMLElement>(
        '[data-case-scene="caption"]'
      );
      const captionCue = wrap.querySelector<HTMLElement>(
        "[data-case-caption-cue]"
      );
      if (captionSection && captionCue) {
        gsap.set(captionCue, { opacity: 0 });
        gsap.to(captionCue, {
          opacity: 1,
          duration: DUR.cinematic,
          ease: EASE.gsap.drift,
          scrollTrigger: {
            trigger: captionSection,
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
