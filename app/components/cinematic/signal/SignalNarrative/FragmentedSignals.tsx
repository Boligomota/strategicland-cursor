"use client";

import { HeroImage } from "@/app/components/media";

/**
 * FragmentedSignals — HC-03 INPUT CORE dual dimensions (T03).
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §05
 * INPUT CORE — Columna A: DIMENSIÓN MARCA (Concepto · Conexión) and
 * Columna B: DIMENSIÓN PRODUCTO (Concepto · Conexión). All copy is
 * literal sitemap wording; the desire/need registers map to the two
 * sitemap columns (Marca = italic accent, Producto = regular sans).
 *
 * Composition:
 *  - Mobile: single column, label + body stacked, ample vertical
 *    breathing between fragments.
 *  - md+: 2-column editorial grid — the two dimensions read side by
 *    side as the strategic duality.
 *
 * Visual layer: a 2:1 documentary backplate sits behind the fragment
 * grid — blurred urban density per the brief ("blurred crowds /
 * surveillance-like urban moments / behavioral micro-moments"). The
 * plate uses the chapter's lowest opacity baseline (0.14) so the
 * fragments read as detections AGAINST the urban substrate, not as
 * captions OF it. Drop a real AVIF at
 * `public/images/signal/fragments-urban.avif` to upgrade.
 *
 * Reveal grammar: each fragment lifts in slow drift (signal-detection
 * cadence, no theatrical stagger). Coordinated by SignalReveal —
 * targets `[data-signal-fragment]` per item.
 *
 * Density linting attaches via data-density-tier="T03".
 */

const SIGNAL_FRAGMENTS = [
  // Columna A — Dimensión Marca (El Eje del Propósito): italic accent.
  {
    label: "Dimensión Marca · Concepto",
    body: "Decodificamos la razón de ser profunda de la organización. No nos centramos en lo que comercializa, sino en lo que representa simbólicamente en la cultura y en la psique del usuario.",
    register: "desire",
  },
  {
    label: "Dimensión Marca · Conexión",
    body: "Establecemos vínculos por medio de Valores y Deseos. Buscamos la resonancia emocional que permite que la marca se convierta en una extensión de la identidad del consumidor.",
    register: "desire",
  },
  // Columna B — Dimensión Producto (El Eje de los Beneficios): regular sans.
  {
    label: "Dimensión Producto · Concepto",
    body: "Analizamos el valor funcional, técnico y práctico del producto o servicio. Identificamos el problema real y cotidiano que se resuelve con eficiencia absoluta.",
    register: "need",
  },
  {
    label: "Dimensión Producto · Conexión",
    body: "Establecemos vínculos por medio de Experiencias y el Efecto WOW. La funcionalidad debe ser tan impecable que genere asombro por su utilidad.",
    register: "need",
  },
] as const;

export function FragmentedSignals() {
  return (
    <section
      data-signal-scene="fragments"
      data-density-tier="T03"
      className="relative w-full"
      style={{ paddingInline: "clamp(32px, 6vw, 96px)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.14,
          mixBlendMode: "screen",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 80%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 80%, transparent 100%)",
          zIndex: 0,
        }}
      >
        <HeroImage
          placeholderVariant="documentary"
          alt=""
          grade={false}
          vignette={false}
          className="absolute inset-0 h-full w-full"
        />
      </div>

      <div
        className="relative mx-auto w-full max-w-[1280px]"
        style={{ zIndex: 1 }}
      >
        <span
          data-signal-section-eyebrow
          className="mb-10 block text-[11px] uppercase text-[color:var(--text-fog)] md:mb-12"
          style={{ letterSpacing: "0.12em" }}
        >
          Input Core · La Dualidad Estratégica
        </span>

        <ul
          data-signal-fragment-list
          className="m-0 grid list-none grid-cols-1 gap-x-[clamp(24px,3vw,56px)] gap-y-[clamp(28px,3.2vw,48px)] p-0 md:grid-cols-2"
        >
          {SIGNAL_FRAGMENTS.map((fragment) => (
            <li
              key={fragment.label}
              data-signal-fragment
              data-signal-fragment-register={fragment.register}
              className="signal-fragment relative pt-[clamp(16px,1.6vw,24px)]"
              style={{ willChange: "opacity, transform" }}
            >
              <span
                aria-hidden
                data-signal-fragment-line
                className="signal-fragment-line"
              />
              <span
                data-signal-fragment-label
                className="mb-3 block text-[11px] uppercase text-[color:var(--text-fog)] md:mb-4"
                style={{
                  letterSpacing: "0.12em",
                  willChange: "opacity, transform",
                }}
              >
                {fragment.label}
              </span>
              <p
                data-signal-fragment-body
                className="text-[color:var(--text-cream)]"
                style={{
                  fontSize: "clamp(15px, 1.05vw, 17px)",
                  fontWeight: 300,
                  fontStyle:
                    fragment.register === "desire" ? "italic" : "normal",
                  lineHeight: 1.45,
                  letterSpacing: "-0.005em",
                  textWrap: "balance",
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
