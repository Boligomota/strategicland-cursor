"use client";

/**
 * PatternConstellation — HC-03 methodological introduction (T04).
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §05
 * INPUT CORE — "Introducción Metodológica Profunda": canonical diagnostic
 * arc in document order — Premisa → Sincronía → Desfase → Alineación —
 * then Meta correlations (Dimensión Marca → Meta: Deseo · Dimensión
 * Producto → Meta: Necesidad), literal sitemap wording.
 *
 * PRESENTATION SOURCE: approved HTML reference .manifesto grammar —
 * monospace index column, italic serif quote, supporting text
 * below; correlations render in the monospace metadata register.
 * The legacy atmospheric backplate was retired.
 *
 * Reveal targets preserved:
 *  - [data-signal-pattern-anchor] / -anchor-sub / -desfase / -alignment / -correlation
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
      className="relative w-full"
      style={{ padding: "12vw 0" }}
    >
      <div className="grid-12 container-pad items-center">
        <div
          data-signal-pattern-eyebrow
          className="manifesto-index text-mono system-meta"
        >
          <span>Introducción Metodológica Profunda</span>
        </div>

        <h2 data-signal-pattern-anchor className="manifesto-quote">
          Para que una marca logre una posición de dominio en su categoría,
          primero debemos ejecutar una inmersión quirúrgica en sus dos
          dimensiones fundamentales.
        </h2>

        <div className="manifesto-text">
          <div data-signal-pattern-anchor-sub>
            <p>
              El INPUT CORE no es una simple etapa de “briefing” o toma de
              requerimientos; es una fase de deconstrucción y diagnóstico
              profundo del negocio.
            </p>
            <p>
              Entendemos que una marca solo trasciende cuando su alma
              intangible (Propósito) y su cuerpo funcional (Beneficio) operan
              en perfecta sincronía.
            </p>
            <p data-signal-pattern-desfase>
              Si existe un desfase entre lo que la marca dice representar y lo
              que el producto resuelve en la realidad, el resultado es ruido
              irrelevante.
            </p>
            <p data-signal-pattern-alignment>
              Nuestra metodología alinea estas dos fuerzas para crear una
              propuesta de valor inexpugnable.
            </p>
          </div>

          <ul
            data-signal-correlations
            className="m-0 flex list-none flex-col gap-3 p-0"
            style={{ marginTop: "2.5rem" }}
          >
            {CORRELATIONS.map((c) => (
              <li
                key={`${c.from}-${c.to}`}
                data-signal-pattern-correlation
                className="signal-pattern-correlation text-mono flex items-baseline gap-3"
                style={{ color: "var(--text-dark)" }}
              >
                <span>{c.from}</span>
                <span aria-hidden style={{ color: "var(--accent-grey)" }}>
                  →
                </span>
                <span style={{ color: "var(--accent-teal)" }}>{c.to}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
