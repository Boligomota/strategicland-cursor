"use client";

/**
 * FutureCurrent — third current of the Storyscape climate
 * (Scene 4, T03): activators 7–9 of the sitemap grid.
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §07,
 * items 7–9: Eco / Sustentable · Innovación Tech · Coleccionables /
 * Hiperpersonalización. Names and definitions are literal sitemap
 * wording.
 *
 * Experiential temperature (architecture §7): SERENE — settle
 * entries, WIDE spacing, precision. Compositionally a single
 * column on the editorial left axis with generous vertical
 * distance between forces — each statement gets its own air.
 * Motion temperature (settle ease, slow band) is owned by
 * StoryscapeReveal via [data-storyscape-current="future"].
 *
 * Closes the conceptual register of the film: the user leaves the
 * act knowing the name of the wind. The next surface (ACT B) is
 * the first subject-image of the page.
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
      style={{
        minHeight: "70vh",
        paddingInline: "clamp(32px, 6vw, 96px)",
        paddingBlock: "12vh",
      }}
    >
      <div className="mx-auto w-full max-w-[1280px]">
        {/* Spacing inline per repo canon — the unlayered global reset
            outranks Tailwind's layered margin/padding utilities. */}
        {/* Current eyebrow removed — the prior grouping label ("La
            fabricación del futuro") has no source in the sitemap. */}
        <ul
          data-storyscape-force-list
          className="flex w-full max-w-[720px] list-none flex-col gap-[clamp(56px,8vh,96px)]"
        >
          {FUTURE_FORCES.map((force) => (
            <li
              key={force.id}
              data-storyscape-force={force.id}
              className="storyscape-force relative"
              style={{
                paddingTop: "clamp(16px, 1.6vw, 24px)",
                willChange: "opacity, transform",
              }}
            >
              <span
                aria-hidden
                data-storyscape-force-line
                className="storyscape-force-line"
              />
              <span
                data-storyscape-force-name
                className="block text-[11px] uppercase text-[color:var(--text-fog)]"
                style={{
                  letterSpacing: "0.12em",
                  marginBottom: "clamp(12px, 1.2vw, 16px)",
                  willChange: "opacity, transform",
                }}
              >
                {force.name}
              </span>
              <p
                data-storyscape-force-body
                className="text-[color:var(--text-cream)]"
                style={{
                  fontSize: "clamp(17px, 1.5vw, 21px)",
                  fontWeight: 300,
                  lineHeight: 1.45,
                  letterSpacing: "-0.01em",
                  textWrap: "balance",
                  maxWidth: "52ch",
                  willChange: "opacity, transform",
                }}
              >
                {force.line}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
