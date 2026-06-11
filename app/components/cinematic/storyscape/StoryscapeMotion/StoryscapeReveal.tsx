"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, STAGGER } from "@/app/lib/motion";
import { jitter } from "@/app/lib/irregularity";
import { useReducedMotion } from "@/app/providers/ReducedMotionProvider";
import { useTransitionDirector } from "@/app/providers/TransitionDirectorProvider";
import { useStoryscape } from "../StoryscapeState/StoryscapeProvider";

/**
 * StoryscapeReveal — owns ACT A's scroll choreography.
 *
 * The act's motion thesis (architecture §7): each current enters
 * with motion of its OWN temperature — within the locked EASE/DUR
 * tokens, variance via jitter() — so the user distinguishes the
 * three families by how they move before reading what they say.
 * The forces are experienced as climate, not menu.
 *
 * Per-scene reveal map (per .rules/narrative-density-system.mdc
 * tier ceilings):
 *
 *  threshold (T01)
 *    chapter marker `005` drifts in opacity-only — mirrors the
 *    HC-02 / HC-03 / HC-04 prelude markers.
 *
 *  attention (T02) — KINETIC
 *    One burst per the stimulus cadence the current describes:
 *    eyebrow lands, then the three forces slide in directionally
 *    (x-axis, feed-like lateral entry) on the fast band
 *    (DUR.quick, EASE.cinematic, STAGGER.tight). The only current
 *    allowed to feel quick.
 *
 *  identity (T03) — WARM
 *    The cluster reveals as a GROUP — belonging rhythm: one
 *    timeline, grouped stagger (STAGGER.editorial), EASE.editorial,
 *    DUR.cinematic. Nothing enters alone.
 *
 *  future (T03) — SERENE
 *    Settle entries, individually triggered: each force lifts only
 *    when it enters the viewport on the slow band (DUR.epic,
 *    EASE.settle). Wide temporal spacing mirrors the wide vertical
 *    spacing.
 *
 *  seam (T01)
 *    No reveal. The silence stays untouched.
 *
 * Hairlines follow the canonical recipe everywhere (opacity
 * 0.12 → 0.32, scaleX 0.92 → 1) — same envelope as HC-02/03/04;
 * the temperature differentiates ease + duration, never the
 * vocabulary.
 *
 * Gating:
 *  - Reduced motion: skip entirely; chapter renders fully visible
 *    (CSS reduced-motion block resolves hairlines to final state).
 *  - Intake gate: reveals only arm once TransitionDirector reports
 *    intake complete. Prevents racing the Hero intro on first load.
 *
 * Lifecycle: one gsap.context() per mount. revert() kills triggers
 * + tweens on unmount.
 */
export function StoryscapeReveal({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { root } = useStoryscape();
  const { isIntakeComplete } = useTransitionDirector();

  useLayoutEffect(() => {
    if (reduced) return;
    if (!isIntakeComplete) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (!root) return;

    const ctx = gsap.context(() => {
      // ── Threshold — chapter marker quiet drift ──────────────────
      const chapterMarker = wrap.querySelector<HTMLElement>(
        "[data-storyscape-chapter-marker]"
      );
      const thresholdSection = wrap.querySelector<HTMLElement>(
        '[data-storyscape-scene="threshold"]'
      );
      if (chapterMarker && thresholdSection) {
        gsap.set(chapterMarker, { opacity: 0 });
        gsap.to(chapterMarker, {
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

      const eyebrowFor = (section: HTMLElement) =>
        section.querySelector<HTMLElement>("[data-storyscape-current-eyebrow]");
      const linesFor = (section: HTMLElement) =>
        section.querySelectorAll<HTMLElement>("[data-storyscape-force-line]");
      const forcesFor = (section: HTMLElement) =>
        section.querySelectorAll<HTMLElement>("[data-storyscape-force]");
      const cascadeFor = (force: HTMLElement) =>
        force.querySelectorAll<HTMLElement>(
          "[data-storyscape-force-name],[data-storyscape-force-body]"
        );

      // ── Attention — KINETIC · directional burst, stimulus cadence ──
      const attentionSection = wrap.querySelector<HTMLElement>(
        '[data-storyscape-current="attention"]'
      );
      if (attentionSection) {
        const eyebrow = eyebrowFor(attentionSection);
        const lines = linesFor(attentionSection);
        const forces = attentionSection.querySelectorAll<HTMLElement>(
          "[data-storyscape-force-name],[data-storyscape-force-body]"
        );

        if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: 8 });
        gsap.set(forces, { opacity: 0, x: 24 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: attentionSection,
            start: "top 78%",
            once: true,
          },
        });

        if (eyebrow) {
          tl.to(eyebrow, {
            opacity: 1,
            y: 0,
            duration: DUR.standard,
            ease: EASE.gsap.cinematic,
            force3D: true,
            roundProps: "y",
            clearProps: "transform",
          });
        }

        if (lines.length > 0) {
          tl.to(
            lines,
            {
              opacity: 0.32,
              scaleX: 1,
              duration: jitter(DUR.standard, 0.08),
              ease: EASE.gsap.cinematic,
              stagger: STAGGER.tight,
              force3D: true,
            },
            0.06
          );
        }

        tl.to(
          forces,
          {
            opacity: 1,
            x: 0,
            duration: jitter(DUR.quick, 0.08),
            ease: EASE.gsap.cinematic,
            stagger: jitter(STAGGER.tight, 0.1),
            force3D: true,
            roundProps: "x",
            clearProps: "opacity,transform",
          },
          0.12
        );
      }

      // ── Identity — WARM · the cluster enters as a group ────────
      const identitySection = wrap.querySelector<HTMLElement>(
        '[data-storyscape-current="identity"]'
      );
      if (identitySection) {
        const eyebrow = eyebrowFor(identitySection);
        const lines = linesFor(identitySection);
        const forces = forcesFor(identitySection);

        if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: 10 });
        forces.forEach((force) => {
          gsap.set(cascadeFor(force), { opacity: 0, y: 16 });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: identitySection,
            start: "top 75%",
            once: true,
          },
        });

        if (eyebrow) {
          tl.to(eyebrow, {
            opacity: 1,
            y: 0,
            duration: DUR.cinematic,
            ease: EASE.gsap.editorial,
            force3D: true,
            roundProps: "y",
            clearProps: "transform",
          });
        }

        if (lines.length > 0) {
          tl.to(
            lines,
            {
              opacity: 0.32,
              scaleX: 1,
              duration: jitter(DUR.cinematic, 0.08),
              ease: EASE.gsap.editorial,
              stagger: STAGGER.editorial,
              force3D: true,
            },
            0.1
          );
        }

        forces.forEach((force, i) => {
          tl.to(
            cascadeFor(force),
            {
              opacity: 1,
              y: 0,
              duration: jitter(DUR.cinematic, 0.08),
              ease: EASE.gsap.editorial,
              stagger: 0.06,
              force3D: true,
              roundProps: "y",
              clearProps: "opacity,transform",
            },
            0.18 + i * STAGGER.editorial
          );
        });
      }

      // ── Future — SERENE · settle entries, one trigger per force ──
      const futureSection = wrap.querySelector<HTMLElement>(
        '[data-storyscape-current="future"]'
      );
      if (futureSection) {
        const eyebrow = eyebrowFor(futureSection);
        if (eyebrow) {
          gsap.set(eyebrow, { opacity: 0 });
          gsap.to(eyebrow, {
            opacity: 1,
            duration: DUR.epic,
            ease: EASE.gsap.settle,
            scrollTrigger: {
              trigger: futureSection,
              start: "top 80%",
              once: true,
            },
          });
        }

        forcesFor(futureSection).forEach((force) => {
          const line = force.querySelector<HTMLElement>(
            "[data-storyscape-force-line]"
          );
          const cascade = cascadeFor(force);
          if (cascade.length === 0) return;

          gsap.set(cascade, { opacity: 0, y: 12 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: force,
              start: "top 86%",
              once: true,
            },
          });

          if (line) {
            tl.to(
              line,
              {
                opacity: 0.32,
                scaleX: 1,
                duration: jitter(DUR.epic, 0.08),
                ease: EASE.gsap.settle,
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
              duration: jitter(DUR.epic, 0.08),
              ease: EASE.gsap.settle,
              stagger: STAGGER.editorial,
              force3D: true,
              roundProps: "y",
              clearProps: "opacity,transform",
            },
            0.12
          );
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
