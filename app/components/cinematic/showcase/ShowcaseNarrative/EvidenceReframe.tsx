"use client";

/**
 * EvidenceReframe — ACT B Scene 4 (T02): the act close.
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §08 —
 * "Resultados Duros (ROI Creativo)". Anchor and sub-line are the two
 * literal sentences of the Promesa Corporativa. The "ROI Creativo"
 * heading itself stays off-canvas (KPI vocabulary conflicts with the
 * canon register); the eyebrow uses the §08 section title "Promesa
 * Corporativa" instead.
 *
 * Composition mirrors the centered editorial-anchor grammar of
 * OutcomeLayer / CaseReflection: eyebrow + anchor (type.headline —
 * display/epic exhausted page-level) + sub-line. No affordances, no
 * exits — the act's 3 exits live in the thresholds (architecture
 * §8: the only justified exits of the evidence are its own depth).
 *
 * Terminal scene of the `case` chapter at T02 — canonical rule
 * honored. Per the T02 reveal budget the scene carries no reveals
 * until the ShowcaseReveal motion pass; copy renders static — quiet,
 * already there when the eye arrives.
 *
 */
export function EvidenceReframe() {
  return (
    <section
      data-showcase-scene="reframe"
      data-density-tier="T02"
      className="relative w-full"
      style={{
        minHeight: "50vh",
        paddingInline: "clamp(32px, 6vw, 96px)",
        paddingBlock: "10vh",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center text-center">
        <span
          className="mb-10 block text-[11px] uppercase text-[color:var(--text-fog)] md:mb-12"
          style={{ letterSpacing: "0.12em" }}
        >
          Promesa Corporativa
        </span>

        <div data-showcase-reframe-line className="w-full">
          <p
            style={{
              maxWidth: "24ch",
              marginInline: "auto",
              textAlign: "center",
              textWrap: "balance",
              fontSize: "clamp(28px, 3.4vw, 38px)",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--text-cream)",
              willChange: "opacity, transform",
            }}
          >
            Transformamos el gasto publicitario tradicional en capital de
            mercado tangible y auditable.
          </p>
          <p
            className="mt-6 md:mt-8"
            style={{
              maxWidth: "560px",
              marginInline: "auto",
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
            Asegurar una posición de ventaja competitiva, diversificación de
            mercados o generación de nuevos modelos de negocio.
          </p>
        </div>
      </div>
    </section>
  );
}
