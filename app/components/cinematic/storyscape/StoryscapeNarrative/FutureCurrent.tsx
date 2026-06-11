"use client";

/**
 * FutureCurrent — third current of the Storyscape grid
 * (Scene 4, T03): activators 7–9 of the sitemap grid.
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §07 —
 * items 7–9, literal sitemap wording.
 *
 * PRESENTATION SOURCE: approved HTML reference .engine grid —
 * terminal continuation row of the shared-border 3-column activator
 * grid (engine-grid-cont).
 *
 * Reveal targets: same selector grammar as AttentionCurrent.
 */

const FUTURE_FORCES = [
  {
    id: "sustainability",
    name: "Eco / Sustentable",
    line: "Integración de prácticas e iniciativas ambientales con un impacto transparente, verificable y honesto, conectando con el consumidor consciente.",
  },
  {
    id: "innovation",
    name: "Innovación Tech",
    line: "Implementación de herramientas tecnológicas avanzadas (IA, automatización inteligente) para optimizar la experiencia y eliminar fricciones en el servicio.",
  },
  {
    id: "hyper-personalization",
    name: "Coleccionables / Hiperpersonalización",
    line: "Creación de activos únicos, ediciones limitadas o productos hechos a la medida que detonan el deseo de posesión y lealtad avanzada.",
  },
] as const;

export function FutureCurrent() {
  return (
    <section
      data-storyscape-scene="future"
      data-storyscape-current="future"
      data-density-tier="T03"
      className="relative w-full"
      style={{ paddingBottom: "6vw" }}
    >
      <div className="grid-12 container-pad">
        <ul
          data-storyscape-force-list
          className="engine-grid engine-grid-cont m-0 list-none p-0"
        >
          {FUTURE_FORCES.map((force) => (
            <li
              key={force.id}
              data-storyscape-force={force.id}
              className="storyscape-force engine-node relative"
            >
              <span
                aria-hidden
                data-storyscape-force-line
                className="storyscape-force-line"
              />
              <h3 data-storyscape-force-name>{force.name}</h3>
              <p data-storyscape-force-body>{force.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
