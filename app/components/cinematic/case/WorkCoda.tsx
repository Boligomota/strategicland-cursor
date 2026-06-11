"use client";

import Link from "next/link";
import { ClosingProvider } from "@/app/components/cinematic/closing/ClosingState/ClosingProvider";
import { ClosingRegistration } from "@/app/components/cinematic/closing/ClosingState/ClosingRegistration";
import { TemporalPause } from "@/app/components/cinematic/hero/HeroNarrative/TemporalPause";
import { getNextCase } from "@/content/work/registry";
import type { CaseData } from "@/content/work/types";

/**
 * WorkCoda — minimal route closure for /work/[slug].
 *
 * Every page must end with a `closing` chapter (per
 * .rules/chapter-architecture.mdc §4.2). The coda REUSES the closing
 * chapter's state infrastructure (ClosingProvider + ClosingRegistration
 * publish the canonical `closing` contract to the TransitionDirector)
 * but composes a compressed body: a held T01 silence, a hairline, and
 * two micro-typographic threshold cues. The home's full dissolution
 * sequence (Emergence / Afterimage / Persistent) belongs to HC-05 and
 * is NOT duplicated here.
 *
 * Navigation cues (threshold grammar — drift links, NOT CTAs):
 *  - "← Volver al organismo"  returns home.
 *  - "Siguiente caso →"       circular registry order, rendered only
 *    when another case exists (getNextCase returns undefined for a
 *    single-case archive).
 *
 * Forbidden vocabularies honored: no footer, no copyright, no social
 * proof, no "more projects" grid, no marketing CTA block.
 *
 * Per T01/T02 ceilings the coda carries no reveals — consistent with
 * the home closing chapter, whose motion pass is deferred. Stillness
 * IS the entry.
 */
export function WorkCoda({ caseData }: { caseData: CaseData }) {
  const nextCase = getNextCase(caseData.slug);

  const cueClass =
    "text-[11px] uppercase text-[color:var(--text-fog)] transition-colors duration-[400ms] hover:text-[color:var(--text-cream)]";
  const cueStyle: React.CSSProperties = { letterSpacing: "0.12em" };

  return (
    <ClosingProvider>
      <ClosingRegistration />

      <section
        data-chapter="closing"
        data-chapter-name="work-coda"
        data-density-tier-default="T01"
        className="relative w-full"
      >
        <TemporalPause height="24vh" mdHeight="16vh" label="silence (coda)" />

        <div
          data-work-coda-threshold
          data-density-tier="T01"
          className="relative w-full pb-[14vh] md:pb-[16vh]"
          style={{ paddingInline: "clamp(32px, 6vw, 96px)" }}
        >
          <div className="mx-auto w-full max-w-[1280px]">
            <span
              aria-hidden
              className="mb-10 block h-px w-full md:mb-12"
              style={{ background: "var(--text-cream)", opacity: 0.12 }}
            />

            <div className="flex flex-col gap-6 md:flex-row md:items-baseline md:justify-between md:gap-0">
              <Link
                href="/"
                data-hover-target
                className={cueClass}
                style={cueStyle}
              >
                ← Volver al organismo
              </Link>

              {nextCase ? (
                <Link
                  href={`/work/${nextCase.slug}`}
                  data-hover-target
                  className={cueClass}
                  style={cueStyle}
                >
                  Siguiente caso · {nextCase.title} →
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </ClosingProvider>
  );
}
