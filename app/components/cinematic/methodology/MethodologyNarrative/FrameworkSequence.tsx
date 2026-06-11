"use client";

/**
 * FrameworkSequence — HC-02 framework progression (Scene 3, T03).
 *
 * CONTENT SOURCE (immutable law): Strategic Services Portfolio
 * (sitemap §04 ¿QUÉ HACEMOS?). Five numbered service blocks, copy
 * literal.
 *
 * PRESENTATION SOURCE: approved HTML reference .engine section —
 * monospace section header over a hairline, then a shared-border
 * node grid (3 columns desktop / 2 tablet / 1 mobile). Each node:
 * teal monospace id, serif headline, light sans body.
 *
 * Reveal targets per step (cascade) preserved:
 *   [data-methodology-framework-line] / -number / -title / -body
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
      style={{ padding: "8vw 0" }}
    >
      <div className="grid-12 container-pad">
        <div className="section-header text-mono">
          <span data-methodology-section-eyebrow>¿Qué Hacemos?</span>
          <span>Ecosistemas de Crecimiento Tangible</span>
        </div>

        <ol
          data-methodology-framework-list
          className="engine-grid m-0 list-none p-0"
        >
          {FRAMEWORK_STEPS.map((step) => (
            <li
              key={step.index}
              className="methodology-framework-step engine-node relative"
            >
              <span
                aria-hidden
                data-methodology-framework-line
                className="methodology-framework-line"
              />

              <span
                data-methodology-framework-number
                className="text-mono node-id"
              >
                {step.index}
              </span>

              <h3 data-methodology-framework-title>{step.title}</h3>

              <p data-methodology-framework-body>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
