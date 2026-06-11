"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR } from "@/app/lib/motion";
import { useReducedMotion } from "@/app/providers/ReducedMotionProvider";
import { useTransitionDirector } from "@/app/providers/TransitionDirectorProvider";
import {
  AtmosphericPlaceholder,
  type AtmosphericPlaceholderVariant,
} from "./AtmosphericPlaceholder";

/**
 * EditorialImage — primary image primitive per
 * .rules/image-treatment-system.mdc §11.
 *
 * Owns the canon's three behaviours:
 *  1. Aspect ratio enforcement (locked dictionary).
 *  2. Reveal direction (mask / blur / drift / none).
 *  3. Triple atmosphere overlay (grain · vignette · grade).
 *
 * Placeholder mode (`src` omitted): renders an AtmosphericPlaceholder
 * so the slot reads as atmospheric absence rather than missing media.
 * Real documentary images land in `public/images/<chapter>/<scene>-
 * <descriptor>.avif` and the parent flips `src` to that path. Cero
 * refactor cuando llegan los assets.
 *
 * Reveals are scroll-triggered (once on enter from below) and gated
 * on (a) reduced motion preference, (b) TransitionDirector intake
 * completion. Same gating contract as HeroPinnedSequence /
 * MethodologyReveal / SignalReveal — image motion is autonomous
 * but obeys the same two switches.
 */

type ImageRatio = "2.39:1" | "2:1" | "3:2" | "4:3" | "1:1" | "3:4";
type ImageReveal = "mask" | "blur" | "drift" | "none";
type ImageRevealDirection = "left-to-right" | "right-to-left";

type EditorialImageProps = {
  src?: string;
  alt?: string;
  ratio: ImageRatio;
  reveal?: ImageReveal;
  direction?: ImageRevealDirection;
  caption?: { author: string; year?: string; place?: string };
  priority?: boolean;
  grain?: boolean;
  vignette?: boolean;
  grade?: boolean;
  placeholderVariant?: AtmosphericPlaceholderVariant;
  /** Optional className passed to the outer frame for layout positioning. */
  className?: string;
};

const RATIO_PADDING: Record<ImageRatio, string> = {
  "2.39:1": "41.84%",
  "2:1": "50%",
  "3:2": "66.67%",
  "4:3": "75%",
  "1:1": "100%",
  "3:4": "133.33%",
};

export function EditorialImage({
  src,
  alt = "",
  ratio,
  reveal = "mask",
  direction = "left-to-right",
  caption,
  priority = false,
  grain = true,
  vignette = true,
  grade = true,
  placeholderVariant = "documentary",
  className,
}: EditorialImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { isIntakeComplete } = useTransitionDirector();

  useLayoutEffect(() => {
    if (reveal === "none") return;
    if (reduced) return;
    if (!isIntakeComplete) return;
    const frame = frameRef.current;
    if (!frame) return;

    const mask = frame.querySelector<HTMLElement>(
      "[data-editorial-image-mask]"
    );
    const media = frame.querySelector<HTMLElement>(
      "[data-editorial-image-media]"
    );
    const captionEl = frame.querySelector<HTMLElement>(
      "[data-editorial-image-caption]"
    );

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: frame,
          start: "top 88%",
          once: true,
        },
      });

      if (reveal === "mask" && mask && media) {
        // Mask reveal — left/right curtain rise per canon §4.1.
        const fromInset =
          direction === "left-to-right"
            ? "inset(0% 100% 0% 0%)"
            : "inset(0% 0% 0% 100%)";
        const toInset = "inset(0% 0% 0% 0%)";
        gsap.set(mask, { clipPath: fromInset, willChange: "clip-path" });
        gsap.set(media, { scale: 1.04, transformOrigin: "center", force3D: true });
        tl.to(mask, {
          clipPath: toInset,
          duration: DUR.cinematic,
          ease: EASE.gsap.cinematic,
        });
        tl.to(
          media,
          {
            scale: 1,
            duration: DUR.cinematic,
            ease: EASE.gsap.cinematic,
            clearProps: "transform,willChange",
          },
          0
        );
      } else if (reveal === "drift" && media) {
        // Edge-drift reveal per canon §4.3 — outer + inverse inner parallax.
        gsap.set(frame, { yPercent: 8, opacity: 0 });
        gsap.set(media, { yPercent: -4, force3D: true });
        tl.to(frame, {
          yPercent: 0,
          opacity: 1,
          duration: DUR.cinematic,
          ease: EASE.gsap.cinematic,
          clearProps: "transform,opacity",
        });
        tl.to(
          media,
          {
            yPercent: 0,
            duration: DUR.cinematic,
            ease: EASE.gsap.cinematic,
            clearProps: "transform",
          },
          0
        );
      }

      if (captionEl) {
        gsap.set(captionEl, { opacity: 0, y: 8 });
        tl.to(
          captionEl,
          {
            opacity: 1,
            y: 0,
            duration: DUR.standard,
            ease: EASE.gsap.cinematic,
            clearProps: "transform",
          },
          DUR.standard * 0.4
        );
      }
    }, frame);

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
  }, [reveal, direction, reduced, isIntakeComplete]);

  return (
    <figure
      ref={frameRef}
      className={
        "editorial-image-frame relative overflow-hidden" +
        (className ? ` ${className}` : "")
      }
      style={{ width: "100%" }}
    >
      <div
        className="editorial-image-ratio relative w-full"
        style={{ paddingTop: RATIO_PADDING[ratio] }}
      >
        <div
          data-editorial-image-mask
          className="absolute inset-0 overflow-hidden"
          style={
            reveal === "none"
              ? undefined
              : { willChange: "clip-path" }
          }
        >
          <div
            data-editorial-image-media
            className="absolute inset-0 h-full w-full"
          >
            {src ? (
              <Image
                src={src}
                alt={alt}
                fill
                priority={priority}
                sizes="(min-width: 1280px) 800px, (min-width: 768px) 60vw, 100vw"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <AtmosphericPlaceholder variant={placeholderVariant} />
            )}
          </div>

          {grade ? <span aria-hidden className="editorial-image-grade" /> : null}
          {vignette ? (
            <span aria-hidden className="editorial-image-vignette" />
          ) : null}
          {grain ? <span aria-hidden className="editorial-image-grain" /> : null}
        </div>
      </div>

      {caption ? (
        <figcaption
          data-editorial-image-caption
          className="mt-4 text-[11px] uppercase text-[color:var(--text-fog)]"
          style={{ letterSpacing: "0.12em" }}
        >
          {caption.author}
          {caption.year ? ` · ${caption.year}` : ""}
          {caption.place ? ` · ${caption.place}` : ""}
        </figcaption>
      ) : null}
    </figure>
  );
}
