"use client";

/**
 * EvidenceReframe — ACT B Scene 4 (T02): the act close.
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §08 —
 * "Promesa Corporativa", both sentences literal.
 *
 * PRESENTATION SOURCE: approved HTML reference .manifesto grammar —
 * monospace index column, italic serif quote, supporting text
 * offset below.
 */
export function EvidenceReframe() {
  return (
    <section
      data-showcase-scene="reframe"
      data-density-tier="T02"
      className="relative w-full"
      style={{ padding: "10vw 0" }}
    >
      <div className="grid-12 container-pad items-center">
        <div className="manifesto-index text-mono system-meta">
          <span>Promesa Corporativa</span>
        </div>

        <div
          data-showcase-reframe-line
          className="manifesto-quote"
          style={{ gridColumn: "4 / 11" }}
        >
          <h2 style={{ fontSize: "inherit", fontStyle: "inherit" }}>
            Transformamos el gasto publicitario tradicional en capital de
            mercado tangible y auditable.
          </h2>
        </div>

        <div className="manifesto-text">
          <p>
            Asegurar una posición de ventaja competitiva, diversificación de
            mercados o generación de nuevos modelos de negocio.
          </p>
        </div>
      </div>
    </section>
  );
}
