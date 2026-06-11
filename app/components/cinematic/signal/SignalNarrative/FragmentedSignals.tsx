"use client";

/**
 * FragmentedSignals — HC-03 INPUT CORE dual dimensions (T03).
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §05
 * INPUT CORE — Columna A: DIMENSIÓN MARCA (Concepto · Conexión) and
 * Columna B: DIMENSIÓN PRODUCTO (Concepto · Conexión), literal.
 *
 * PRESENTATION SOURCE: approved HTML reference .engine section —
 * monospace section header over a hairline, then a shared-border
 * node grid (2 columns: the two dimensions side by side). Each
 * node: teal monospace id, light sans body. The legacy documentary
 * backplate and the italic desire register were retired with the
 * cinematic system.
 *
 * Reveal targets preserved:
 *  - [data-signal-fragment] / -fragment-line / -fragment-label / -fragment-body
 */

const SIGNAL_FRAGMENTS = [
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
      style={{ padding: "8vw 0" }}
    >
      <div className="grid-12 container-pad">
        <div className="section-header text-mono">
          <span data-signal-section-eyebrow>Input Core</span>
          <span>La Dualidad Estratégica</span>
        </div>

        <ul
          data-signal-fragment-list
          className="engine-grid engine-grid-2 m-0 list-none p-0"
        >
          {SIGNAL_FRAGMENTS.map((fragment) => (
            <li
              key={fragment.label}
              data-signal-fragment
              data-signal-fragment-register={fragment.register}
              className="signal-fragment engine-node relative"
            >
              <span
                aria-hidden
                data-signal-fragment-line
                className="signal-fragment-line"
              />
              <span
                data-signal-fragment-label
                className="text-mono node-id"
              >
                {fragment.label}
              </span>
              <p data-signal-fragment-body>{fragment.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
