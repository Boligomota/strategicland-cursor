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
 * HeroImage — full-bleed atmospheric primitive per
 * .rules/image-treatment-system.mdc §11 (HeroImage).
 *
 * Used for atmospheric peaks (Pattern Constellation, MethodStatement
 * backplate). Reveal canon §4.2 — blur+scale+opacity in unison. Per
 * canon: "Used at most twice per page — expensive on GPU." This page
 * uses HeroImage twice exactly (HC-02 statement + HC-03 constellation).
 *
 * Behaviour vs EditorialImage:
 *  - No aspect ratio enforcement (consumer constrains via className).
 *  - Default reveal is `blur` (heavier atmospheric weight).
 *  - No caption — heroic plates are atmospheric, not credited inline.
 *  - Atmosphere overlays still apply (grain · vignette · grade).
 *
 * Placeholder mode renders an AtmosphericPlaceholder peak variant when
 * `src` is omitted, holding the slot until a real documentary image
 * lands in `public/images/<chapter>/<scene>-<descriptor>.avif`.
 */

type HeroImageProps = {
  src?: string;
  alt?: string;
  reveal?: "blur" | "none";
  priority?: boolean;
  grain?: boolean;
  vignette?: boolean;
  grade?: boolean;
  placeholderVariant?: AtmosphericPlaceholderVariant;
  /** Optional className for layout positioning. */
  className?: string;
  /** Inline style override for absolute placement contexts. */
  style?: React.CSSProperties;
};

export function HeroImage({
  src,
  alt = "",
  reveal = "blur",
  priority = false,
  grain = true,
  vignette = true,
  grade = true,
  placeholderVariant = "peak",
  className,
  style,
}: HeroImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { isIntakeComplete } = useTransitionDirector();

  useLayoutEffect(() => {
    if (reveal === "none") return;
    if (reduced) return;
    if (!isIntakeComplete) return;
    const frame = frameRef.current;
    if (!frame) return;

    const media = frame.querySelector<HTMLElement>("[data-hero-image-media]");
    if (!media) return;

    const ctx = gsap.context(() => {
      gsap.set(media, {
        opacity: 0,
        scale: 1.06,
        filter: "blur(20px)",
        transformOrigin: "center",
        force3D: true,
        willChange: "opacity, transform, filter",
      });
      gsap.to(media, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: DUR.epic,
        ease: EASE.gsap.cinematic,
        scrollTrigger: { trigger: frame, start: "top 90%", once: true },
        clearProps: "transform,filter,willChange",
      });
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
  }, [reveal, reduced, isIntakeComplete]);

  return (
    <div
      ref={frameRef}
      className={
        "hero-image-frame relative overflow-hidden" +
        (className ? ` ${className}` : "")
      }
      style={style}
    >
      <div
        data-hero-image-media
        className="absolute inset-0 h-full w-full"
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="100vw"
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
  );
}
