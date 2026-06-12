"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR, STAGGER } from "@/app/lib/motion";
import { useReducedMotion } from "@/app/providers/ReducedMotionProvider";
import { useTransitionDirector } from "@/app/providers/TransitionDirectorProvider";
import { useKnowledge } from "../KnowledgeState/KnowledgeProvider";

/**
 * KnowledgeReveal — intake-gated editorial reveals (Fase 0).
 * Grammar inherited from MethodologyReveal / SignalReveal.
 */
export function KnowledgeReveal({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { root } = useKnowledge();
  const { isIntakeComplete } = useTransitionDirector();

  useLayoutEffect(() => {
    if (reduced) return;
    if (!isIntakeComplete) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    let ctx: gsap.Context | undefined;
    let refreshTimer: number | undefined;
    let cancelled = false;

    const rafId = requestAnimationFrame(() => {
      if (cancelled) return;

      ctx = gsap.context(() => {
        const openingSection = wrap.querySelector<HTMLElement>(
          '[data-knowledge-scene="opening"]'
        );
        const openingLines = openingSection
          ? Array.from(
              openingSection.querySelectorAll<HTMLElement>(
                ".knowledge-opening-line"
              )
            )
          : [];

        if (openingSection && openingLines.length > 0) {
          gsap.set(openingLines, { opacity: 0, y: 24 });
          const openingTl = gsap.timeline({
            scrollTrigger: {
              trigger: openingSection,
              start: "top 72%",
              once: true,
            },
          });
          openingTl.to(openingLines, {
            opacity: 1,
            y: 0,
            duration: DUR.cinematic,
            ease: EASE.gsap.cinematic,
            stagger: STAGGER.scene,
            force3D: true,
            roundProps: "y",
          });
        }

        const blocksSection = wrap.querySelector<HTMLElement>(
          '[data-knowledge-scene="blocks"]'
        );
        const blockItems = blocksSection
          ? Array.from(
              blocksSection.querySelectorAll<HTMLElement>(
                "[data-knowledge-block]"
              )
            )
          : [];

        blockItems.forEach((block) => {
          const title = block.querySelector<HTMLElement>(
            "[data-knowledge-block-title]"
          );
          const body = block.querySelector<HTMLElement>(
            "[data-knowledge-block-body]"
          );
          const targets = [title, body].filter(
            (el): el is HTMLElement => el != null
          );
          if (targets.length === 0) return;

          gsap.set(targets, { opacity: 0, y: 14 });
          const blockTl = gsap.timeline({
            scrollTrigger: { trigger: block, start: "top 82%", once: true },
          });
          blockTl.to(targets, {
            opacity: 1,
            y: 0,
            duration: DUR.cinematic,
            ease: EASE.gsap.cinematic,
            stagger: 0.04,
            force3D: true,
            roundProps: "y",
          });
        });

        const marker = wrap.querySelector<HTMLElement>(
          "[data-knowledge-chapter-marker]"
        );
        const preludeSection = wrap.querySelector<HTMLElement>(
          '[data-knowledge-scene="prelude"]'
        );
        if (marker && preludeSection) {
          gsap.set(marker, { opacity: 0 });
          gsap.to(marker, {
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

        const thresholdCue = wrap.querySelector<HTMLElement>(
          "[data-knowledge-threshold-cue]"
        );
        const thresholdSection = wrap.querySelector<HTMLElement>(
          '[data-knowledge-scene="threshold"]'
        );
        if (thresholdCue && thresholdSection) {
          gsap.set(thresholdCue, { opacity: 0 });
          gsap.to(thresholdCue, {
            opacity: 1,
            duration: DUR.cinematic,
            ease: EASE.gsap.drift,
            scrollTrigger: {
              trigger: thresholdSection,
              start: "top 80%",
              once: true,
            },
          });
        }
      }, wrap);

      let fontsRefreshed = false;
      const refreshAfterFonts = () => {
        if (fontsRefreshed || cancelled) return;
        fontsRefreshed = true;
        ScrollTrigger.refresh();
      };
      if (typeof document !== "undefined" && document.fonts?.ready) {
        document.fonts.ready.then(refreshAfterFonts);
      }
      refreshTimer = window.setTimeout(refreshAfterFonts, 1200);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      if (refreshTimer !== undefined) {
        window.clearTimeout(refreshTimer);
      }
      ctx?.revert();
    };
  }, [reduced, isIntakeComplete, root]);

  return <div ref={wrapRef}>{children}</div>;
}
