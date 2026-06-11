"use client";

/**
 * IdentityCurrent — second current of the Storyscape grid
 * (Scene 3, T03): activators 4–6 of the sitemap grid.
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §07 —
 * items 4–6, literal sitemap wording.
 *
 * PRESENTATION SOURCE: approved HTML reference .engine grid —
 * continuation row of the shared-border 3-column activator grid
 * started by AttentionCurrent (engine-grid-cont avoids doubling the
 * shared hairline).
 *
 * Reveal targets: same selector grammar as AttentionCurrent.
 */

const IDENTITY_FORCES = [
  {
    id: "identity",
    name: "Identidad y Patrones",
    line: "Uso estético y analítico de la data para que el usuario mida, entienda y presuma sus propios comportamientos y hábitos vinculados a la marca.",
  },
  {
    id: "crowd-culture",
    name: "Crowdculture",
    line: "Infiltración y cocreación orgánica dentro de las subculturas de internet y nichos culturales específicos, impulsando comunidades unidas por intereses reales.",
  },
  {
    id: "aspirational-systems",
    name: "Aspiraciones / Expectativas",
    line: "Mapeo y activación de los deseos de estatus, autorrealización y estilos de vida ideales que las nuevas generaciones demandan.",
  },
] as const;

export function IdentityCurrent() {
  return (
    <section
      data-storyscape-scene="identity"
      data-storyscape-current="identity"
      data-density-tier="T03"
      className="relative w-full"
    >
      <div className="grid-12 container-pad">
        <ul
          data-storyscape-force-list
          className="engine-grid engine-grid-cont m-0 list-none p-0"
        >
          {IDENTITY_FORCES.map((force) => (
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
