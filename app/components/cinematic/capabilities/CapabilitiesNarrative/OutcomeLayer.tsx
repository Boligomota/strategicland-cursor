"use client";

/**
 * OutcomeLayer — HC-04 THE ENGINE outcome (Scene 4, T02).
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §06 —
 * "Procesador de Inteligencia y Pensamiento Crítico" section title,
 * literal sitemap wording.
 *
 * PRESENTATION SOURCE: approved HTML reference .manifesto grammar —
 * monospace index column, italic serif quote, supporting text
 * offset below. The legacy anamorphic backplate was retired.
 *
 * Reveal targets preserved:
 *  - [data-capabilities-outcome-anchor] / -anchor-sub
 */

export function OutcomeLayer() {
  return (
    <section
      data-capabilities-scene="outcome"
      data-density-tier="T02"
      className="relative w-full"
      style={{ padding: "10vw 0" }}
    >
      <div className="grid-12 container-pad items-center">
        <div className="manifesto-index text-mono system-meta">
          <span>The Engine</span>
          <span>Procesador de Inteligencia y Pensamiento Crítico</span>
        </div>

        <h2 data-capabilities-outcome-anchor className="manifesto-quote">
          Procesador de Inteligencia y Pensamiento Crítico
        </h2>
      </div>
    </section>
  );
}
