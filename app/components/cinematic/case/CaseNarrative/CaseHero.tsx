"use client";

import { HeroImage } from "@/app/components/media";
import { ACTIVATOR_LABEL, NATURE_LABEL } from "@/content/work/labels";
import type { CaseData } from "@/content/work/types";

/**
 * CaseHero — Case chapter establishing scene (Scene 1, intro · T03).
 *
 * The case's establishing shot: chapter marker (honesty register +
 * year), activator micro-taxonomy, display title, lede. Composition
 * mirrors the statement-over-backplate pattern of MethodStatement
 * (HC-02) at establishing scale.
 *
 * Density per CaseSceneRegistration: the chapter OPENS at T03
 * EDITORIAL (curiosity) — the canonical case cascade
 * T03 → T04 → T05 → T04 → T02 per narrative-density-system.mdc §3
 * (case row). The establishing shot reads editorial, not immersive;
 * immersion compounds at the frame scene.
 *
 * Route-level budgets (/work is a fresh page — caps are per page):
 *  - type.display: this title consumes 1/2 (clamp 40-72px).
 *  - HeroImage: the backplate consumes 1/2, reveal `blur` (canon §4.2).
 *
 * Honesty register: `nature` renders FIRST in the micro-taxonomy —
 * speculative work is never disguised as client work (HC-05 §8).
 *
 * ALL copy comes from CaseData — this component is a pure template.
 * The nature/activator dictionaries (content/work/labels.ts) are
 * template chrome (taxonomy labels) shared with the homepage-plane
 * ACT B thresholds, not case copy.
 *
 * Reveal targets (owned by CaseReveal):
 *  - [data-case-chapter-marker]   marker quiet drift
 *  - [data-case-intro-eyebrow]    cascade beat 1
 *  - [data-case-intro-title]      cascade beats 2..n (one per line)
 *  - [data-case-intro-body]       cascade final beat
 *
 * Image upgrade path: drop the AVIF at
 * `public/images/work/<slug>/<hero.image.descriptor>.avif` and pass
 * it via `src` (placeholder mechanic per canon — same contract as
 * MethodStatement / PatternConstellation).
 */

export function CaseHero({ caseData }: { caseData: CaseData }) {
  const { nature, year, activators, hero } = caseData;

  return (
    <section
      data-case-scene="intro"
      data-density-tier="T03"
      className="relative flex w-full flex-col justify-center pt-[16vh] md:pt-[18vh]"
      style={{
        minHeight: "86vh",
        paddingInline: "clamp(32px, 6vw, 96px)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.2,
          mixBlendMode: "screen",
          maskImage:
            "radial-gradient(ellipse 75% 80% at 50% 45%, black 0%, black 35%, transparent 92%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 80% at 50% 45%, black 0%, black 35%, transparent 92%)",
          zIndex: 0,
        }}
      >
        <HeroImage
          placeholderVariant={hero.image.placeholderVariant ?? "peak"}
          alt=""
          className="absolute inset-0 h-full w-full"
        />
      </div>

      <div
        className="relative mx-auto w-full max-w-[1280px]"
        style={{ zIndex: 1 }}
      >
        <div className="mb-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 md:mb-12">
          <span
            data-case-chapter-marker
            className="text-[11px] uppercase text-[color:var(--text-fog)]"
            style={{ letterSpacing: "0.12em" }}
          >
            {NATURE_LABEL[nature]}
            {year ? ` · ${year}` : ""}
          </span>

          <span
            data-case-intro-eyebrow
            className="text-[11px] uppercase text-[color:var(--text-fog)]"
            style={{ letterSpacing: "0.12em", willChange: "opacity, transform" }}
          >
            {activators.map((a) => ACTIVATOR_LABEL[a]).join(" · ")}
          </span>
        </div>

        <h1
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 300,
            lineHeight: 0.96,
            letterSpacing: "-0.03em",
            color: "var(--text-cream)",
            textWrap: "balance",
          }}
        >
          {hero.titleLines.map((line) => (
            <span
              key={line}
              data-case-intro-title
              className="block"
              style={{ willChange: "opacity, transform" }}
            >
              {line}
            </span>
          ))}
        </h1>

        <p
          data-case-intro-body
          className="mt-8 md:mt-10"
          style={{
            maxWidth: "640px",
            fontSize: "clamp(17px, 1.6vw, 20px)",
            fontWeight: 300,
            lineHeight: 1.5,
            letterSpacing: "-0.005em",
            color: "var(--text-dim)",
            textWrap: "balance",
            willChange: "opacity, transform",
          }}
        >
          {hero.lede}
        </p>
      </div>
    </section>
  );
}
