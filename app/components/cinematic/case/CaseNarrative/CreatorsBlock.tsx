"use client";

import type { CaseData } from "@/content/work/types";

/**
 * CreatorsBlock — Case chapter authorship credits (Scene 4, release · T04).
 *
 * The decompression beat after the pinned climax: who made this.
 * Editorial rows with hairlines — the FrameworkSequence row grammar
 * without numeration. No grid of avatars, no social links, no team
 * marketing (forbidden vocabularies).
 *
 * Density per CaseSceneRegistration: T04 IMMERSIVE with emotional
 * state `release` — the exhale after T05 compression. The scene
 * renders only when the case declares creators (speculative cases
 * credit the studio per the content contract; a case with no credits
 * skips the scene and the timeline window simply holds atmosphere).
 *
 * ALL copy comes from CaseData. "Autoría" is template chrome.
 *
 * Reveal targets (owned by CaseReveal — dual cluster, single trigger,
 * STAGGER.scene):
 *  - [data-case-release-statement]  the section heading
 *  - [data-case-release-caption]    the credit rows block
 */
export function CreatorsBlock({ caseData }: { caseData: CaseData }) {
  const creators = caseData.creators;
  if (!creators || creators.length === 0) return null;

  return (
    <section
      data-case-scene="release"
      data-density-tier="T04"
      className="relative w-full py-[8vh] md:py-[10vh]"
      style={{
        minHeight: "50vh",
        paddingInline: "clamp(32px, 6vw, 96px)",
      }}
    >
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-9 md:grid-cols-12 md:gap-x-[clamp(32px,4vw,72px)]">
        <div className="md:col-span-3">
          <span
            data-case-release-statement
            className="block text-[11px] uppercase text-[color:var(--text-fog)]"
            style={{ letterSpacing: "0.12em", willChange: "opacity, transform" }}
          >
            Autoría
          </span>
        </div>

        <ul
          data-case-release-caption
          className="m-0 flex list-none flex-col p-0 md:col-span-9 md:max-w-[680px]"
          style={{ willChange: "opacity, transform" }}
        >
          {creators.map((creator) => (
            <li
              key={`${creator.name}-${creator.role}`}
              className="border-t border-[color:var(--line-cool,rgba(237,230,216,0.08))] py-6 first:border-t-0 first:pt-0 md:py-8"
            >
              <p
                style={{
                  fontSize: "clamp(17px, 1.4vw, 20px)",
                  fontWeight: 300,
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                  color: "var(--text-cream)",
                }}
              >
                {creator.name}
              </p>
              <p
                className="mt-1 text-[color:var(--text-dim)]"
                style={{
                  fontSize: "clamp(14px, 1vw, 16px)",
                  fontWeight: 300,
                  lineHeight: 1.5,
                  letterSpacing: "-0.005em",
                  maxWidth: "52ch",
                }}
              >
                {creator.role}
                {creator.note ? ` — ${creator.note}` : ""}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
