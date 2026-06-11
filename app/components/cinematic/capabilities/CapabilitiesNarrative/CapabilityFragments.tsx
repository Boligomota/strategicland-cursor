"use client";

/**
 * CapabilityFragments — HC-04 THE ENGINE data-audit sources (Scene 2, T02).
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §06 —
 * "Fuentes de Auditoría de Data (Business Intelligence)". All copy is
 * literal from the sitemap. No invention.
 *
 * PRESENTATION SOURCE: approved HTML reference .engine section —
 * monospace section header over a hairline, then a shared-border
 * node grid (3 columns desktop / 2 tablet / 1 mobile). Each node:
 * serif headline + light sans body. The 5-node grid leaves the last
 * cell open — deliberate asymmetry, no invented sixth source.
 * The legacy documentary backplate was retired.
 *
 * Reveal targets preserved:
 *  - [data-capability-fragment] / -fragment-line / -fragment-headline / -fragment-body
 */

const CAPABILITY_FRAGMENTS = [
  {
    headline: "Entornos Sociales",
    body: "Auditoría de las dinámicas comunitarias, micro-comunidades y cambios demográficos que modifican los espacios de convivencia y consumo tanto físicos como virtuales.",
  },
  {
    headline: "Cultura Popular",
    body: "Mapeo de fenómenos masivos, memes, narrativas emergentes, música y flujos de atención en la cultura de creadores que dictan la conversación diaria.",
  },
  {
    headline: "Alta Teoría",
    body: "Consulta de marcos conceptuales, sociológicos y filosóficos para entender las causas estructurales y los “por qué” detrás del comportamiento humano contemporáneo.",
  },
  {
    headline: "Redes Sociales",
    body: "Análisis profundo de feeds, algoritmos de recomendación y comportamientos en plataformas conversacionales donde se gesta la confianza.",
  },
  {
    headline: "Nuevas Tecnologías",
    body: "Monitoreo constante de innovaciones (IA Agéntica, Web3, Interfaces espaciales) que transforman la forma en que los usuarios consumen y se relacionan.",
  },
] as const;

export function CapabilityFragments() {
  return (
    <section
      data-capabilities-scene="fragments"
      data-density-tier="T02"
      className="relative w-full"
      style={{ padding: "8vw 0" }}
    >
      <div className="grid-12 container-pad">
        <div className="section-header text-mono">
          <span data-capabilities-section-eyebrow>The Engine</span>
          <span>Fuentes de Auditoría de Data</span>
        </div>

        <ul
          data-capability-fragment-list
          className="engine-grid m-0 list-none p-0"
        >
          {CAPABILITY_FRAGMENTS.map((fragment) => (
            <li
              key={fragment.headline}
              data-capability-fragment
              className="capability-fragment engine-node relative"
            >
              <span
                aria-hidden
                data-capability-fragment-line
                className="capability-fragment-line"
              />
              <h3 data-capability-fragment-headline>{fragment.headline}</h3>
              <p data-capability-fragment-body>{fragment.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
