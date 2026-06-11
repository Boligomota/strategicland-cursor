"use client";

import { EditorialImage } from "@/app/components/media";

/**
 * CapabilityFragments — HC-04 THE ENGINE data-audit sources (Scene 2, T02).
 *
 * Content migrated per the HC-04 Content Migration Director matrix
 * (source of truth: Mapa de Sitio Estratégico §06 — "Fuentes de
 * Auditoría de Data (Business Intelligence)"). All copy is literal
 * from the sitemap. No invention.
 *
 * Composition strategy — operational editorial, not services grid:
 *  - 5 audit-source statements (Entornos Sociales · Cultura Popular ·
 *    Alta Teoría · Redes Sociales · Nuevas Tecnologías). The 5th
 *    fragment was approved by the Human Director; the resulting
 *    2×2+1 orphan row is DELIBERATE asymmetry, not a layout bug.
 *    No redesign, no horizontal system, no pin.
 *  - Each statement carries: editorial headline + body sentence.
 *    The per-fragment eyebrow slot was retired — the sitemap source
 *    provides no eyebrow copy and inventing it is forbidden. The
 *    reveal cascade (headline → body) degrades gracefully.
 *  - No bullet markers, no numbered counters (numbers were
 *    Methodology framework's signature; sources must read as
 *    continuous audit lenses, not enumerated services).
 *  - Each statement is preceded by an animating hairline (`.capability-
 *    fragment-line`) — subtle structural cue without becoming a card
 *    border.
 *  - Layout: 2-col md grid for readability cadence; single col mobile.
 *
 * Visual layer: a contained 2:1 EditorialImage panel sits in the
 * bottom-left, partially extending toward the section edge with an
 * aggressive radial mask — documentary tactical fragment caught in
 * the corner of the operational narrative. md+ only (mobile would
 * over-saturate). Drop a real AVIF at
 * `public/images/capabilities/fragments-tactical.avif` to upgrade
 * the placeholder.
 *
 * Per .rules/image-treatment-system.mdc §4.2 HeroImage allowance is
 * "at most twice per page" — already exhausted by HC-02 statement +
 * HC-03 constellation. HC-04 uses EditorialImage exclusively (mask
 * reveal canon §4.1). No hero blur reveals here.
 *
 * Reveal targets:
 *  - `[data-capability-fragment]` (per item, line + cascade)
 *  - `[data-capability-fragment-line]`
 *  - `[data-capability-fragment-headline]`
 *  - `[data-capability-fragment-body]`
 *
 * Density linting attaches via data-density-tier="T02".
 */

const CAPABILITY_FRAGMENTS = [
  {
    headline: "Entornos Sociales",
    body: "Auditoría de las dinámicas comunitarias, micro-comunidades y cambios demográficos que modifican los espacios de convivencia y consumo tanto físicos como virtuales.",
  },
  {
    headline: "Cultura Popular",
    body: "Mapeo de fenómenos masivos, memes, narrativas emergentes, música y flujos de atención en la cultura de creadores que dictan la conversación diaria.",
  },
  {
    headline: "Alta Teoría",
    body: "Consulta de marcos conceptuales, sociológicos y filosóficos para entender las causas estructurales y los “por qué” detrás del comportamiento humano contemporáneo.",
  },
  {
    headline: "Redes Sociales",
    body: "Análisis profundo de feeds, algoritmos de recomendación y comportamientos en plataformas conversacionales donde se gesta la confianza.",
  },
  {
    headline: "Nuevas Tecnologías",
    body: "Monitoreo constante de innovaciones (IA Agéntica, Web3, Interfaces espaciales) que transforman la forma en que los usuarios consumen y se relacionan.",
  },
] as const;

export function CapabilityFragments() {
  return (
    <section
      data-capabilities-scene="fragments"
      data-density-tier="T02"
      className="relative w-full py-[8vh] md:py-[10vh]"
      style={{
        paddingInline: "clamp(32px, 6vw, 96px)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute hidden md:block"
        style={{
          left: "clamp(-32px, -2vw, 0px)",
          bottom: "clamp(-24px, -2vw, 0px)",
          width: "clamp(320px, 32vw, 480px)",
          opacity: 0.16,
          mixBlendMode: "screen",
          maskImage:
            "radial-gradient(ellipse 80% 75% at 25% 70%, black 0%, black 30%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 75% at 25% 70%, black 0%, black 30%, transparent 90%)",
          zIndex: 0,
        }}
      >
        <EditorialImage
          ratio="2:1"
          reveal="mask"
          direction="left-to-right"
          placeholderVariant="documentary"
          alt=""
          grade={false}
          vignette={false}
        />
      </div>

      <div
        className="relative mx-auto w-full max-w-[1280px]"
        style={{ zIndex: 1 }}
      >
        <span
          data-capabilities-section-eyebrow
          className="mb-10 block text-[11px] uppercase text-[color:var(--text-fog)] md:mb-12"
          style={{ letterSpacing: "0.12em" }}
        >
          The Engine · Fuentes de Auditoría de Data
        </span>

        <ul
          data-capability-fragment-list
          className="m-0 grid list-none grid-cols-1 gap-x-[clamp(32px,4vw,72px)] gap-y-[clamp(40px,4.4vw,64px)] p-0 md:grid-cols-2"
        >
          {CAPABILITY_FRAGMENTS.map((fragment) => (
            <li
              key={fragment.headline}
              data-capability-fragment
              className="capability-fragment relative pt-[clamp(20px,2vw,28px)]"
              style={{ willChange: "opacity, transform" }}
            >
              <span
                aria-hidden
                data-capability-fragment-line
                className="capability-fragment-line"
              />
              <h3
                data-capability-fragment-headline
                className="mb-3 text-[color:var(--text-cream)] md:mb-4"
                style={{
                  fontSize: "clamp(22px, 2.4vw, 30px)",
                  fontWeight: 300,
                  lineHeight: 1.18,
                  letterSpacing: "-0.02em",
                  textWrap: "balance",
                  maxWidth: "22ch",
                  willChange: "opacity, transform",
                }}
              >
                {fragment.headline}
              </h3>
              <p
                data-capability-fragment-body
                className="text-[color:var(--text-dim)]"
                style={{
                  fontSize: "clamp(15px, 1.05vw, 17px)",
                  fontWeight: 300,
                  lineHeight: 1.6,
                  letterSpacing: "-0.005em",
                  textWrap: "balance",
                  maxWidth: "44ch",
                  willChange: "opacity, transform",
                }}
              >
                {fragment.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
