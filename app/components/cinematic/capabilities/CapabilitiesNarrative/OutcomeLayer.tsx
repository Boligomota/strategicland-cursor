"use client";

import { EditorialImage } from "@/app/components/media";

/**
 * OutcomeLayer — HC-04 THE ENGINE outcome (Scene 4, T02).
 *
 * Content migrated per the HC-04 Content Migration Director matrix
 * (source of truth: Mapa de Sitio Estratégico §06 — "Planeación +
 * Pensamiento Crítico": "discernir lo relevante de lo ruidoso,
 * ponerlo en un lugar adecuado y hacer de lo complejo algo claro y
 * explícito").
 *
 * Composition strategy — outcome as quality, not deliverable:
 *  - Centered editorial anchor reframes the Engine's output against
 *    the chapter's operational arc.
 *  - Sub-line names the operational act (discern the relevant from
 *    the noisy, place it adequately).
 *  - SITEMAP COMPLIANCE PASS: the prior token row (Discernir ·
 *    Ordenar · Clarificar) was removed — "Ordenar" and "Clarificar"
 *    do not exist in the Mapa de Sitio Estratégico.
 *
 * Type budget: page-level `type.display` allowance is exhausted
 * (HC-02 statement + HC-03 constellation = 2/2). This scene uses
 * type.headline (clamp 24-32px) for the anchor — one tier below
 * display — preserving the page's typographic hierarchy contract.
 *
 * Visual layer: a 2.39:1 anamorphic EditorialImage panel anchored at
 * the top-right corner of the section, partially extending beyond the
 * right edge with an aggressive radial mask — operational documentary
 * residue. Mirrors the corner-anchored placement of CapabilityFragments
 * (which uses bottom-left), creating an opposing diagonal across the
 * chapter's image composition. md+ only. Drop a real AVIF at
 * `public/images/capabilities/outcome-system.avif` to upgrade.
 *
 * Per .rules/narrative-density-system.mdc T02 CONTEMPLATIVE: ≤ 30
 * words on the anchor side, ≤ 1 reveal cluster.
 *
 * Reveal targets:
 *  - `[data-capabilities-outcome-anchor]`     (anchor headline)
 *  - `[data-capabilities-outcome-anchor-sub]` (sub-line)
 *
 * Density linting attaches via data-density-tier="T02".
 */

export function OutcomeLayer() {
  return (
    <section
      data-capabilities-scene="outcome"
      data-density-tier="T02"
      className="relative w-full py-[10vh] md:py-[12vh]"
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
          top: "clamp(-24px, -2vw, 0px)",
          width: "clamp(360px, 36vw, 520px)",
          opacity: 0.14,
          mixBlendMode: "screen",
          maskImage:
            "radial-gradient(ellipse 80% 75% at 70% 30%, black 0%, black 28%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 75% at 70% 30%, black 0%, black 28%, transparent 90%)",
          zIndex: 0,
        }}
      >
        <EditorialImage
          ratio="2.39:1"
          reveal="mask"
          direction="right-to-left"
          placeholderVariant="documentary"
          alt=""
          grade={false}
          vignette={false}
        />
      </div>

      <div
        className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center text-center"
        style={{ zIndex: 1 }}
      >
        <span
          data-capabilities-section-eyebrow
          className="mb-10 block text-[11px] uppercase text-[color:var(--text-fog)] md:mb-12"
          style={{ letterSpacing: "0.12em" }}
        >
          The Engine · Procesador de Inteligencia
        </span>

        <h2
          data-capabilities-outcome-anchor
          style={{
            marginInline: "auto",
            textAlign: "center",
            textWrap: "balance",
            fontSize: "clamp(28px, 3.4vw, 38px)",
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--text-cream)",
            maxWidth: "22ch",
            willChange: "opacity, transform",
          }}
        >
          Hacer de lo complejo algo claro y explícito.
        </h2>

        <p
          data-capabilities-outcome-anchor-sub
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
          Discernir lo relevante de lo ruidoso y ponerlo en un lugar adecuado.
        </p>

      </div>
    </section>
  );
}
