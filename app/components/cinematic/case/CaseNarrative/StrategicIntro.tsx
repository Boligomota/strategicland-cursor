"use client";

import type { CaseData } from "@/content/work/types";

/**
 * StrategicIntro — Case chapter strategic framing (Scene 2, frame · T04).
 *
 * The intelligence frame: one large strategic statement + the
 * Problema / Estrategia / Resultado meta-grid. Structure reuses the
 * statement + columns grammar of the canonical meta-grid (HC-02
 * FrameworkSequence axial measure, no card chrome, hairline as
 * structural cue).
 *
 * Density per CaseSceneRegistration: T04 IMMERSIVE (immersion) —
 * the chapter compounds from the T03 establishing shot into full
 * engagement before the pinned climax.
 *
 * The signal hairline reuses the framework-line recipe verbatim
 * (initial state in CSS — `.case-frame-line` in globals.css — so
 * first paint matches the GSAP-from state, no FOUC). CaseReveal
 * animates opacity 0.12 → 0.32 and scaleX 0.92 → 1.
 *
 * ALL copy comes from CaseData. The three column labels are template
 * chrome (meta-grid taxonomy), not case copy.
 *
 * Reveal targets (owned by CaseReveal):
 *  - [data-case-frame-line]       signal hairline (drift)
 *  - [data-case-frame-statement]  strategic statement
 *  - [data-case-frame-caption]    one per column (editorial cascade)
 */
export function StrategicIntro({ caseData }: { caseData: CaseData }) {
  const { intro } = caseData;

  const columns = [
    ["Problema", intro.columns.problem],
    ["Estrategia", intro.columns.strategy],
    ["Resultado", intro.columns.result],
  ] as const;

  return (
    <section
      data-case-scene="frame"
      data-density-tier="T04"
      className="relative w-full py-[10vh] md:py-[12vh]"
      style={{
        minHeight: "70vh",
        paddingInline: "clamp(32px, 6vw, 96px)",
      }}
    >
      <div className="relative mx-auto w-full max-w-[1280px] pt-[clamp(20px,2.2vw,32px)]">
        <span aria-hidden data-case-frame-line className="case-frame-line" />

        <span
          className="mb-10 block text-[11px] uppercase text-[color:var(--text-fog)] md:mb-12"
          style={{ letterSpacing: "0.12em" }}
        >
          Lectura estratégica
        </span>

        <p
          data-case-frame-statement
          style={{
            maxWidth: "26ch",
            fontSize: "clamp(28px, 3.4vw, 40px)",
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--text-cream)",
            textWrap: "balance",
            willChange: "opacity, transform",
          }}
        >
          {intro.statement}
        </p>

        <div className="mt-14 grid grid-cols-1 gap-9 md:mt-20 md:grid-cols-3 md:gap-x-[clamp(32px,4vw,72px)]">
          {columns.map(([label, body]) => (
            <div
              key={label}
              data-case-frame-caption
              style={{ willChange: "opacity, transform" }}
            >
              <span
                className="mb-4 block text-[11px] uppercase text-[color:var(--text-fog)]"
                style={{ letterSpacing: "0.12em" }}
              >
                {label}
              </span>
              <p
                className="text-[color:var(--text-dim)]"
                style={{
                  fontSize: "clamp(15px, 1.05vw, 17px)",
                  fontWeight: 300,
                  lineHeight: 1.55,
                  letterSpacing: "-0.005em",
                  maxWidth: "44ch",
                }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
