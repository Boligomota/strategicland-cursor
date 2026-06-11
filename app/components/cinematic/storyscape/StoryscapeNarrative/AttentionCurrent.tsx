"use client";

/**
 * AttentionCurrent — first current of the Storyscape climate
 * (Scene 2, T02): activators 1–3 of the sitemap grid.
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §07 —
 * "Retícula interactiva de 9 activadores (Herramientas de
 * Transformación)", items 1–3: Atmósferas de entretenimiento ·
 * Hipermediatización · Experiencias Inmersivas. Names and
 * definitions are literal sitemap wording — no invention.
 *
 * Experiential temperature (architecture §7): KINETIC — md+ renders
 * the three forces side by side in a 3-col cadence, mobile stacks.
 * Motion temperature is owned by StoryscapeReveal via
 * [data-storyscape-current="attention"].
 *
 * Grammar inherits the canonical fragment field (FragmentedSignals):
 * hairlines, no cards, breathing between items. Per architecture
 * §10 ACT A carries NO imagery — the invisibility of the forces is
 * the concept. Typography over the global atmospheric field.
 *
 * Reveal targets:
 *  - [data-storyscape-current-eyebrow]
 *  - [data-storyscape-force] (per item)
 *  - [data-storyscape-force-line]
 *  - [data-storyscape-force-name]
 *  - [data-storyscape-force-body]
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
      style={{
        minHeight: "70vh",
        paddingInline: "clamp(32px, 6vw, 96px)",
        paddingBlock: "10vh",
      }}
    >
      <div className="mx-auto w-full max-w-[1280px]">
        {/* Spacing inline per repo canon — the unlayered global reset
            (* { margin:0; padding:0 }) outranks Tailwind's layered
            margin/padding utilities. */}
        <span
          data-storyscape-current-eyebrow
          className="block text-[11px] uppercase text-[color:var(--text-fog)]"
          style={{
            letterSpacing: "0.12em",
            marginBottom: "clamp(40px, 5vh, 56px)",
            willChange: "opacity, transform",
          }}
        >
          Retícula interactiva de 9 activadores · Herramientas de
          Transformación
        </span>

        <ul
          data-storyscape-force-list
          className="grid list-none grid-cols-1 gap-x-[clamp(28px,3.4vw,64px)] gap-y-[clamp(36px,4vw,56px)] md:grid-cols-3"
        >
          {ATTENTION_FORCES.map((force) => (
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
                  fontSize: "clamp(16px, 1.2vw, 19px)",
                  fontWeight: 300,
                  lineHeight: 1.4,
                  letterSpacing: "-0.01em",
                  textWrap: "balance",
                  maxWidth: "26ch",
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
