"use client";

import { EditorialImage } from "@/app/components/media";

/**
 * AppliedTension — HC-04 THE ENGINE tension peak (Scene 3, T03).
 *
 * Content migrated per the HC-04 Content Migration Director matrix
 * (source of truth: Mapa de Sitio Estratégico §06 — "Planeación +
 * Pensamiento Crítico"). The Engine's duality maps isomorphically
 * onto the existing dual-axis tension system — no redesign, no new
 * motion ownership:
 *  - Axis A: Business Intelligence (the black box — data dies to
 *    become strategic pillars).
 *  - Axis B: Pensamiento Crítico (the irreducible human filter).
 *  - Resolve: rejection of blind faith in automated metrics,
 *    strategies anchored in business reality (condensed literal).
 *
 * Composition mirrors HC-03 HumanInterpretation's dual-axis grammar
 * but reframes it operationally:
 *  - HC-03 was epistemic (machine detects / human directs).
 *  - HC-04 is operational (BI produces strategic pillars / critical
 *    thinking filters them).
 *
 * Visual layer: a 3:4 EditorialImage portrait sits as a right-anchored
 * backplate at the section's vertical centre — "spatial human presence"
 * per the brief. Mirrors the HumanAITension HC-02 anchor pattern, with
 * an aggressive radial mask dissolving the left edge into the warm-
 * black field. md+ only (mobile would compete with the dual-statement
 * grid). Drop a real AVIF at
 * `public/images/capabilities/tension-presence.avif` to upgrade.
 *
 * Per .rules/narrative-density-system.mdc T03 EDITORIAL: editorial
 * weight, type-led, ≤ 2 reveal clusters. Sub-line below carries the
 * resolution.
 *
 * Reveal targets:
 *  - `[data-capabilities-tension-capacity]`
 *  - `[data-capabilities-tension-consequence]`
 *  - `[data-capabilities-tension-resolve]`
 *
 * Density linting attaches via data-density-tier="T03".
 */
export function AppliedTension() {
  return (
    <section
      data-capabilities-scene="tension"
      data-density-tier="T03"
      className="relative w-full py-[8vh] md:py-[10vh]"
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
          opacity: 0.18,
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
          Planeación + Pensamiento Crítico
        </span>

        <div className="grid w-full grid-cols-1 gap-y-[clamp(28px,3vw,48px)] md:grid-cols-2 md:gap-x-[clamp(32px,4vw,72px)]">
          <div className="md:pr-[clamp(8px,1vw,16px)]">
            <span
              className="mb-4 block text-[11px] uppercase text-[color:var(--text-fog)]"
              style={{ letterSpacing: "0.12em" }}
            >
              Business Intelligence
            </span>
            <p
              data-capabilities-tension-capacity
              className="capabilities-tension-statement"
              style={{
                fontSize: "clamp(24px, 2.8vw, 34px)",
                fontWeight: 300,
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: "var(--text-cream)",
                textWrap: "balance",
                maxWidth: "26ch",
                willChange: "opacity, transform",
              }}
            >
              Aquí los datos mueren para convertirse en pilares estratégicos
              de alto rendimiento.
            </p>
          </div>

          <div className="md:border-l md:border-[color:var(--line-cool)] md:pl-[clamp(24px,3vw,48px)]">
            <span
              className="mb-4 block text-[11px] uppercase text-[color:var(--text-fog)]"
              style={{ letterSpacing: "0.12em" }}
            >
              Pensamiento Crítico
            </span>
            <p
              data-capabilities-tension-consequence
              className="capabilities-tension-statement"
              style={{
                fontSize: "clamp(24px, 2.8vw, 34px)",
                fontWeight: 300,
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: "var(--text-cream)",
                textWrap: "balance",
                maxWidth: "26ch",
                willChange: "opacity, transform",
              }}
            >
              El filtro humano irreducible.
            </p>
          </div>
        </div>

        <p
          data-capabilities-tension-resolve
          className="mt-[clamp(32px,3.6vw,56px)] text-[color:var(--text-dim)]"
          style={{
            fontSize: "clamp(15px, 1.05vw, 17px)",
            lineHeight: 1.55,
            letterSpacing: "-0.005em",
            maxWidth: "60ch",
            willChange: "opacity, transform",
          }}
        >
          Rechazamos la creencia ciega en la información de nuevas Apps o
          métricas automatizadas para entregar estrategias ancladas en la
          realidad de los negocios.
        </p>
      </div>
    </section>
  );
}
