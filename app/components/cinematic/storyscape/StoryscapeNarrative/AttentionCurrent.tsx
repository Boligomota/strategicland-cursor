"use client";

/**
 * AttentionCurrent — first current of the Storyscape grid
 * (Scene 2, T02): activators 1–3 of the sitemap grid.
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §07 —
 * items 1–3, literal sitemap wording.
 *
 * PRESENTATION SOURCE: approved HTML reference .engine section —
 * monospace section header over a hairline, then the first row of
 * the shared-border 3-column activator grid (serif headline + light
 * sans body per node). The two sibling currents continue the same
 * grid below (engine-grid-cont), so the nine activators read as one
 * reticle while the three scenes stay architecturally distinct.
 *
 * Reveal targets preserved:
 *  - [data-storyscape-current-eyebrow] / [data-storyscape-force] /
 *    -force-line / -force-name / -force-body
 */

const ATTENTION_FORCES = [
  {
    id: "entertainment",
    name: "Atmósferas de entretenimiento",
    line: "Espacios u contenidos diseñados para cautivar la atención mediante la diversión, el juego y la narrativa interactiva que genera engagement real.",
  },
  {
    id: "hyper-mediatization",
    name: "Hipermediatización",
    line: "Estrategias integradas de comunicación masiva coordinadas a través de múltiples capas y canales físicos y digitales de forma simultánea.",
  },
  {
    id: "immersion",
    name: "Experiencias Inmersivas",
    line: "Activaciones de o en instalaciones físicas multisensoriales que sumergen por completo al usuario en el universo de la marca.",
  },
] as const;

export function AttentionCurrent() {
  return (
    <section
      data-storyscape-scene="attention"
      data-storyscape-current="attention"
      data-density-tier="T02"
      className="relative w-full"
      style={{ paddingTop: "6vw" }}
    >
      <div className="grid-12 container-pad">
        <div className="section-header text-mono">
          <span data-storyscape-current-eyebrow>
            Retícula interactiva de 9 activadores
          </span>
          <span>Herramientas de Transformación</span>
        </div>

        <ul
          data-storyscape-force-list
          className="engine-grid m-0 list-none p-0"
        >
          {ATTENTION_FORCES.map((force) => (
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
