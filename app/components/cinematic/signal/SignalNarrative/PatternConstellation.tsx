"use client";

import { HeroImage } from "@/app/components/media";

/**
 * PatternConstellation — HC-03 atmospheric peak (T04).
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §05
 * INPUT CORE — "Introducción Metodológica Profunda". Anchor, sub-line
 * and the two Meta correlations (Dimensión Marca → Meta: Deseo ·
 * Dimensión Producto → Meta: Necesidad) are literal sitemap wording.
 *
 * Per the brief: "Avoid explicit diagrams. Connections should emerge
 * through composition, sequencing, proximity, timing, cinematic pacing.
 * The interface should imply cognition, not display it literally."
 *
 * Composition strategy — implied constellation, not drawn:
 *  - Centered display statement reads as the cognition anchor (the
 *    realization).
 *  - Three correlation pairs sit below as a single typographic row
 *    (not cards, not boxes). Their adjacency IS the diagram.
 *  - The arrow glyph (→) is the only structural connector — pure
 *    typography, no SVG, no chrome.
 *  - Reveal cascade orders the constellation into existence: anchor
 *    first, then each correlation lifts in sequence. Timing creates
 *    the relational layer the visuals refuse to spell out.
 *
 * Visual layer: a `<HeroImage>` atmospheric peak sits behind the
 * statement — dispersed phone lights at distance per the brief, the
 * "constellation" the typography implies but never literalizes. This
 * is one of the page's two allowed `blur` reveals (canon §4.2; the
 * other is HC-02 MethodStatement). Higher opacity baseline (0.28) is
 * justified by T04 IMMERSIVE — atmospheric peak earns visual weight.
 * Drop a real AVIF at `public/images/signal/constellation-glow.avif`
 * to upgrade the placeholder.
 *
 * Density linting attaches via data-density-tier="T04". This is the
 * chapter's atmospheric peak — `type.display` once per chapter rule
 * (narrative-density-system.mdc §7.3) is exercised here. Hero owns
 * the page's only `type.epic`; Methodology owns one `type.display`;
 * this scene exercises the second `type.display` allowance per page.
 *
 * Reveal targets:
 *  - `[data-signal-pattern-anchor]`        (display statement)
 *  - `[data-signal-pattern-anchor-sub]`    (sub-line)
 *  - `[data-signal-pattern-correlation]`   (per correlation, cascade)
 */

const CORRELATIONS = [
  { from: "Dimensión Marca", to: "Meta: Deseo" },
  { from: "Dimensión Producto", to: "Meta: Necesidad" },
] as const;

export function PatternConstellation() {
  return (
    <section
      data-signal-scene="constellation"
      data-density-tier="T04"
      className="relative flex w-full items-center justify-center py-[10vh] md:py-[12vh]"
      style={{
        minHeight: "70vh",
        paddingInline: "clamp(32px, 6vw, 96px)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.28,
          mixBlendMode: "screen",
          maskImage:
            "radial-gradient(ellipse 75% 70% at 50% 50%, black 0%, black 38%, transparent 92%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 70% at 50% 50%, black 0%, black 38%, transparent 92%)",
          zIndex: 0,
        }}
      >
        <HeroImage
          placeholderVariant="peak"
          alt=""
          className="absolute inset-0 h-full w-full"
        />
      </div>

      <div
        className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center text-center"
        style={{ zIndex: 1 }}
      >
        <span
          data-signal-pattern-eyebrow
          className="mb-10 text-[11px] uppercase text-[color:var(--text-fog)] md:mb-12"
          style={{ letterSpacing: "0.12em" }}
        >
          Introducción Metodológica
        </span>

        <h2
          data-signal-pattern-anchor
          style={{
            marginInline: "auto",
            textAlign: "center",
            textWrap: "balance",
            fontSize: "clamp(30px, 3.8vw, 48px)",
            fontWeight: 300,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: "var(--text-cream)",
            willChange: "opacity, transform",
          }}
        >
          Para que una marca logre una posición de dominio en su categoría,
          primero debemos ejecutar una inmersión quirúrgica en sus dos
          dimensiones fundamentales.
        </h2>

        <p
          data-signal-pattern-anchor-sub
          style={{
            maxWidth: "640px",
            marginInline: "auto",
            marginTop: "clamp(20px, 1.8vw, 32px)",
            textAlign: "center",
            textWrap: "balance",
            fontSize: "clamp(17px, 1.6vw, 20px)",
            fontWeight: 300,
            lineHeight: 1.5,
            letterSpacing: "-0.005em",
            color: "var(--text-dim)",
            willChange: "opacity, transform",
          }}
        >
          El INPUT CORE no es una simple etapa de “briefing” o toma de
          requerimientos; es una fase de deconstrucción y diagnóstico profundo
          del negocio.
        </p>

        <ul
          data-signal-correlations
          className="m-0 mt-[clamp(36px,4vw,64px)] flex list-none flex-col items-center gap-[clamp(14px,1.4vw,20px)] p-0 md:flex-row md:items-baseline md:justify-center md:gap-[clamp(32px,4vw,72px)]"
        >
          {CORRELATIONS.map((c) => (
            <li
              key={`${c.from}-${c.to}`}
              data-signal-pattern-correlation
              className="signal-pattern-correlation flex items-baseline gap-3 text-[11px] uppercase text-[color:var(--text-fog)]"
              style={{
                letterSpacing: "0.12em",
                willChange: "opacity, transform",
              }}
            >
              <span className="text-[color:var(--text-cream)]">{c.from}</span>
              <span aria-hidden className="text-[color:var(--text-fog)]">
                →
              </span>
              <span className="text-[color:var(--text-cream)]">{c.to}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
