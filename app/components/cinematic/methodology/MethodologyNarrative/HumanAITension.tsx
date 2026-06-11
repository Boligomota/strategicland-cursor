"use client";

import { EditorialImage } from "@/app/components/media";

/**
 * HumanAITension — HC-02 human + machine tension (Scene 4, T02).
 *
 * The release beat after the framework climax. The chapter holds a
 * single contemplative statement that re-frames the framework: the
 * machine amplifies, the human directs.
 *
 * Two-column md layout with a deliberate offset — the statement sits
 * left-axial (column 1-7) and a smaller closing caption sits right-
 * axial (column 8-12) at the same baseline. Mobile collapses to a
 * single centered axial column for continuity with the rest of the
 * chapter.
 *
 * Per narrative-density-system.mdc T02 CONTEMPLATIVE: ≤ 30 words on
 * the statement side, ≤ 1 reveal cluster, lede + body only.
 *
 * Visual layer: a 3:4 `<EditorialImage>` portrait sits as a
 * right-anchored backplate (md+ only — mobile collapses to single
 * column where any backplate would compete with text). The plate is
 * a "human silhouette inside structured space" per the brief, with
 * an aggressive radial mask that dissolves the right edge into the
 * warm-black field. Drop a real AVIF at
 * `public/images/methodology/tension-silhouette.avif` to upgrade.
 *
 * Reveal targets:
 *  - `.methodology-tension-statement`
 *  - `.methodology-tension-caption`
 */
export function HumanAITension() {
  return (
    <section
      data-methodology-scene="tension"
      data-density-tier="T02"
      className="relative flex w-full items-center justify-center py-[8vh] md:py-[10vh]"
      style={{
        minHeight: "60vh",
        paddingInline: "clamp(32px, 6vw, 96px)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute hidden md:block"
        style={{
          right: "clamp(-32px, -2vw, 0px)",
          top: "50%",
          transform: "translateY(-50%)",
          width: "clamp(280px, 30vw, 440px)",
          opacity: 0.2,
          mixBlendMode: "screen",
          maskImage:
            "radial-gradient(ellipse 75% 90% at 70% 50%, black 0%, black 32%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 90% at 70% 50%, black 0%, black 32%, transparent 90%)",
          zIndex: 0,
        }}
      >
        <EditorialImage
          ratio="3:4"
          reveal="mask"
          direction="right-to-left"
          placeholderVariant="architectural"
          alt=""
          grade={false}
          vignette={false}
        />
      </div>

      <div
        className="relative mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-9 md:grid-cols-12 md:gap-x-[clamp(32px,4vw,72px)] md:gap-y-6"
        style={{ zIndex: 1 }}
      >
        <div className="md:col-span-7 md:pl-[clamp(8px,1vw,16px)]">
          <span
            className="mb-6 block text-[11px] uppercase text-[color:var(--text-fog)] md:mb-8"
            style={{ letterSpacing: "0.12em" }}
          >
            ¿Quiénes Somos? · Identidad Híbrida y Autoridad
          </span>

          <p
            data-methodology-tension-statement
            className="methodology-tension-statement"
            style={{
              fontSize: "clamp(28px, 3.4vw, 40px)",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--text-cream)",
              textWrap: "balance",
              maxWidth: "20ch",
              willChange: "opacity, transform",
            }}
          >
            El futuro de la economía no es humano o máquina, sino lo humano
            potenciado vía máquina.
          </p>
        </div>

        <div className="md:col-span-5 md:pl-4 md:pt-[clamp(8px,1vw,16px)]">
          <p
            data-methodology-tension-caption
            className="methodology-tension-caption text-[color:var(--text-dim)]"
            style={{
              fontSize: "clamp(15px, 1.05vw, 17px)",
              lineHeight: 1.6,
              letterSpacing: "-0.005em",
              maxWidth: "44ch",
              willChange: "opacity, transform",
            }}
          >
            Líderes Híbridos capaces de orquestar una “Agents Workforce” sin
            comprometer el juicio crítico ni la ética humana.
            <br className="hidden md:inline" /> Nuestra ventaja competitiva
            radica en la Capa Semántica Unificada: una estructura de trabajo
            donde la precisión de los datos masivos y la intuición humana
            irreducible operan bajo una misma base de verdad auditable.
          </p>
        </div>
      </div>
    </section>
  );
}
