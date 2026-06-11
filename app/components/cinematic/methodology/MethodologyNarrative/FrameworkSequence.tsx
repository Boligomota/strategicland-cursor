"use client";

/**
 * FrameworkSequence — HC-02 framework progression (Scene 3, T03).
 *
 * Strategic progression as narrative architecture, NOT cards.
 *
 * Content: the Strategic Services Portfolio (sitemap §04 ¿QUÉ HACEMOS?).
 * Five numbered service blocks read as a single vertical editorial
 * sequence — separated by structural rule lines and amplified breathing
 * space. No card chrome, no border boxes, no shadow elevation. The
 * weight comes from typographic hierarchy and the silence between
 * blocks.
 *
 * Composition:
 *  - Single column on mobile (always; the progression is linear).
 *  - 12-column grid on md+ with each block spanning columns 3-10 —
 *    keeps the eye on a stable axial measure, never sprawled corner
 *    to corner.
 *  - Top hairline rule rendered as an absolute <span> (not border-t)
 *    so MethodologyReveal can animate `opacity` + `scaleX` for the
 *    micro-cognitive "signal enters awareness" cue.
 *  - Each block: numeric eyebrow + title (type.headline) + body
 *    (type.body, lead.body 1.55).
 *
 * Reveal targets per step (cascade):
 *   1. `[data-methodology-framework-number]`  (eyebrow / numerator)
 *   2. `[data-methodology-framework-title]`   (headline)
 *   3. `[data-methodology-framework-body]`    (body)
 * MethodologyReveal stages each cascade with a 40 ms beat offset.
 *
 * Cross-step focus whisper is CSS-only (see globals.css
 * `[data-methodology-framework-list]:hover ...`). No JS hover state.
 */

const FRAMEWORK_STEPS = [
  {
    index: "01",
    title: "Marketing Strategy & Business Intelligence",
    body: "Auditoría predictiva de mercados. No planeamos sobre supuestos ni tendencias de moda. Decodificamos el mercado mediante una auditoría de Entornos Sociales, Alta Teoría y Comportamiento Algorítmico. Transformamos el caos de datos en hojas de ruta de ventaja competitiva, diversificación de ingresos y capitalización de marca, asegurando que cada movimiento sea estratégico y quirúrgico.",
  },
  {
    index: "02",
    title: "Branding & Identidad de Sistemas Vivos",
    body: "Bajo nuestra filosofía “Back to Human”, diseñamos arquitecturas de marca que abandonan los manuales estáticos y aburridos. Creamos identidades que abrazan la imperfección, la contradicción y la autenticidad como diferencial crítico en una era de contenido sintético masivo, generando vínculos de lealtad que trascienden la transacción digital.",
  },
  {
    index: "03",
    title: "Brand Content & Hipermediatización",
    body: "Desarrollamos formatos propios de comunicación que combaten activamente el agotamiento digital del usuario. Nuestra producción de contenido no interrumpe la vida de la audiencia; la educa, la entretiene y la inspira mediante narrativas expandidas que ocupan un lugar legítimo y deseado en la cultura popular contemporánea.",
  },
  {
    index: "04",
    title: "Experiential Marketing & Event Production",
    body: "Diseñamos rituales de marca y atmósferas inmersivas. Basados en proyectos de alto impacto (desde simposios creativos y workshops hasta conciertos y activaciones retail inmersivas), creamos puntos de contacto físicos y digitales que ofrecen profundidad emocional y compromiso sensorial, imposibles de replicar por el marketing puramente algorítmico.",
  },
  {
    index: "05",
    title: "Digital & Agentic Commerce",
    body: "Transicionamos del simple “e-commerce” reactivo al Comercio Agéntico. Implementamos sistemas de “Utilidad Invisible” que gestionan el journey del cliente desde la inspiración hasta la compra automatizada, eliminando fricciones y optimizando la conversión en plataformas de descubrimiento de última generación como TikTok Shop.",
  },
] as const;

export function FrameworkSequence() {
  return (
    <section
      data-methodology-scene="framework"
      data-density-tier="T03"
      className="relative w-full"
      style={{ paddingInline: "clamp(32px, 6vw, 96px)" }}
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <span
          data-methodology-section-eyebrow
          className="mb-10 block text-[11px] uppercase text-[color:var(--text-fog)] md:mb-12"
          style={{ letterSpacing: "0.12em" }}
        >
          ¿Qué Hacemos? · Ecosistemas de Crecimiento Tangible
        </span>

        <ol
          data-methodology-framework-list
          className="m-0 flex list-none flex-col gap-[clamp(36px,4vw,64px)] p-0"
        >
          {FRAMEWORK_STEPS.map((step) => (
            <li
              key={step.index}
              className="methodology-framework-step relative grid w-full grid-cols-1 gap-5 pt-[clamp(20px,2.2vw,32px)] md:grid-cols-12 md:gap-x-[clamp(32px,4vw,72px)] md:gap-y-6"
            >
              <span
                aria-hidden
                data-methodology-framework-line
                className="methodology-framework-line"
              />

              <div className="md:col-span-3 md:pl-[clamp(8px,1vw,16px)]">
                <span
                  data-methodology-framework-number
                  className="block text-[11px] uppercase text-[color:var(--text-fog)]"
                  style={{
                    letterSpacing: "0.12em",
                    willChange: "opacity, transform",
                  }}
                >
                  {step.index}
                </span>
              </div>

              <div className="md:col-span-9 md:max-w-[680px]">
                <h3
                  data-methodology-framework-title
                  style={{
                    fontSize: "clamp(26px, 3vw, 36px)",
                    fontWeight: 300,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: "var(--text-cream)",
                    marginBottom: "clamp(14px, 1.1vw, 20px)",
                    textWrap: "balance",
                    willChange: "opacity, transform",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  data-methodology-framework-body
                  className="text-[color:var(--text-dim)]"
                  style={{
                    fontSize: "clamp(15px, 1.05vw, 17px)",
                    lineHeight: 1.55,
                    letterSpacing: "-0.005em",
                    maxWidth: "62ch",
                    willChange: "opacity, transform",
                  }}
                >
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
