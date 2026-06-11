"use client";

/**
 * IdentityCurrent — second current of the Storyscape climate
 * (Scene 3, T03): activators 4–6 of the sitemap grid.
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §07,
 * items 4–6: Identidad y Patrones · Crowdculture · Aspiraciones /
 * Expectativas. Names and definitions are literal sitemap wording.
 *
 * Experiential temperature (architecture §7): WARM — the italic
 * accent the film reserves for desire (HC-01 "Magia" precedent),
 * belonging rhythm, composition that GROUPS. Compositionally the
 * three forces cluster in a narrower centered column — proximity
 * as belonging — instead of spreading across the editorial width.
 * Motion temperature (grouped staggers, editorial ease) is owned
 * by StoryscapeReveal via [data-storyscape-current="identity"].
 *
 * Editorial peak of the act (with FutureCurrent). No imagery by
 * architectural law — Act A without image is law, not preference
 * (failure mode §15.4: "muro de inspiración").
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
            construcción del yo") has no source in the sitemap. */}
        <ul
          data-storyscape-force-list
          className="flex w-full max-w-[640px] list-none flex-col gap-[clamp(40px,5vh,64px)]"
          style={{ marginInline: "auto" }}
        >
          {IDENTITY_FORCES.map((force) => (
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
                  fontStyle: "italic",
                  lineHeight: 1.4,
                  letterSpacing: "-0.015em",
                  textWrap: "balance",
                  maxWidth: "44ch",
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
