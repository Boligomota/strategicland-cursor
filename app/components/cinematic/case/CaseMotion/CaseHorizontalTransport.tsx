"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { EASE, DUR } from "@/app/lib/motion";
import { useReducedMotion } from "@/app/providers/ReducedMotionProvider";
import { useCase } from "../CaseState/CaseProvider";

/**
 * CaseHorizontalTransport — pinned horizontal scroll for the Case
 * chapter's T05 KINETIC scene. Inherits the transport grammar from
 * HeroHorizontalTransport verbatim — same pin geometry, same scrub,
 * same canon distance multiplier. No new motion language.
 *
 * Page-level allowance: pinned sections are capped at 2/page
 * (AGENTS.md §6.2). HC-01's pinned sequence consumes 1/2; this
 * transport consumes 2/2. Any further pin requires Cinematic Architect
 * reallocation.
 *
 * Desktop cut (md+, pointer:fine) per responsive-system.mdc §5/§6:
 *  - Section pins from top top.
 *  - Slides translate xPercent: -100 * (slides - 1).
 *  - end: rail.offsetWidth * 1.5 (canon distance multiplier).
 *  - scrub: 1 (slight smoothing, weighted feel).
 *  - Sets data-horizontal-active="true" so the track can opt
 *    cursor:grab affordance in only when the pin choreography is live.
 *
 * Slide entry — Edge-Drift Reveal per image-treatment-system.mdc §4.3:
 *  - [data-case-slide-image] translates yPercent: 8 → 0, opacity 0 → 1.
 *  - [data-case-slide-image-inner] translates inverse yPercent: -4 → 0
 *    (parallax-on-entry depth).
 *  - [data-case-slide-title] lifts against the imagery (type scales up
 *    against the image in pinned T05 per narrative-density-system §6.4).
 *  Each reveal fires ONCE as its slide enters the transport viewport,
 *  via containerAnimation triggers bound to the transport tween.
 *
 * Mobile / tablet portrait cut (<md or coarse pointer):
 *  - NO pin. NO horizontal scroll. responsive-system.mdc §6 explicitly
 *    forbids horizontal scrolling on touch — the track structurally
 *    collapses to a vertical stacked rail at <md so the chapter still
 *    plays without horizontal hostility. Slides keep natural visibility
 *    (no gsap.set runs outside the desktop matchMedia context).
 *
 * Reduced motion: skipped entirely. Vertical stacked rail (mobile cut
 * layout) reads as the static fallback.
 *
 * Owns its own gsap.matchMedia(). matchMedia cleans up ScrollTriggers
 * on revert + breakpoint crossings.
 */
export function CaseHorizontalTransport() {
  const reduced = useReducedMotion();
  const { root } = useCase();

  useLayoutEffect(() => {
    if (reduced) return;
    if (!root) return;

    const section = root.querySelector<HTMLElement>(
      "[data-case-horizontal-track]"
    );
    const rail = root.querySelector<HTMLElement>("[data-case-horizontal-rail]");
    if (!section || !rail) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (pointer: fine)", () => {
      const slides = rail.querySelectorAll<HTMLElement>("[data-case-slide]");
      if (slides.length < 2) return;

      rail.setAttribute("data-horizontal-active", "true");

      const transport = gsap.to(slides, {
        xPercent: -100 * (slides.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + rail.offsetWidth * 1.5,
          invalidateOnRefresh: true,
        },
      });

      slides.forEach((slide) => {
        const image = slide.querySelector<HTMLElement>(
          "[data-case-slide-image]"
        );
        const inner = slide.querySelector<HTMLElement>(
          "[data-case-slide-image-inner]"
        );
        const title = slide.querySelector<HTMLElement>(
          "[data-case-slide-title]"
        );
        if (!image && !title) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: slide,
            containerAnimation: transport,
            start: "left 80%",
            once: true,
          },
        });

        if (image) {
          gsap.set(image, { yPercent: 8, opacity: 0 });
          tl.to(
            image,
            {
              yPercent: 0,
              opacity: 1,
              duration: DUR.cinematic,
              ease: EASE.gsap.cinematic,
              force3D: true,
            },
            0
          );
        }

        if (inner) {
          gsap.set(inner, { yPercent: -4 });
          tl.to(
            inner,
            {
              yPercent: 0,
              duration: DUR.cinematic,
              ease: EASE.gsap.cinematic,
              force3D: true,
            },
            0
          );
        }

        if (title) {
          gsap.set(title, { opacity: 0, y: 18 });
          tl.to(
            title,
            {
              opacity: 1,
              y: 0,
              duration: DUR.cinematic,
              ease: EASE.gsap.cinematic,
              force3D: true,
              roundProps: "y",
              clearProps: "opacity,transform",
            },
            0.12
          );
        }
      });

      return () => {
        rail.removeAttribute("data-horizontal-active");
      };
    });

    return () => mm.revert();
  }, [reduced, root]);

  return null;
}
