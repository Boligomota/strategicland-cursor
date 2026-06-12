import type { KnowledgePageData } from "../types";
import { KNOWLEDGE_ROUTES } from "../routes";
import { emphasis, node, text } from "../rich-content";

/**
 * VERTICALES DE IMPACTO — content module.
 * Copy authority: Arquitectura_Web_wmnnd.md · Fase 04 · Página 4 (literal).
 */
export const verticalesImpactoPage: KnowledgePageData = {
  slug: "verticales-impacto",
  route: KNOWLEDGE_ROUTES["verticales-impacto"],
  instanceId: "verticales-impacto",
  title: "Verticales de Impacto",
  opening: {
    statement: [
      text(
        "Especialización nacida de la resolución de fricciones industriales específicas y de nicho."
      ),
    ],
    positioning: [
      text('No creemos en soluciones genéricas de "talla única". Aplicamos nuestro Sistema Operativo de forma quirúrgica según la fricción particular de cada industria.'),
    ],
  },
  blocks: [
    {
      id: "retail-comercio-descubrimiento",
      title: "Retail & E-commerce (Comercio de Descubrimiento)",
      body: [
        text(
          "Hemos movido la aguja del negocio en el sector retail mediante la transición del storytelling estático al impacto directo. Nuestra experiencia en "
        ),
        node("comercio-agentico", "plataformas de descubrimiento"),
        text(
          " nos permite cerrar la brecha entre la inspiración y la compra, eliminando cada punto de fricción en el recorrido del cliente."
        ),
      ],
    },
    {
      id: "tech-b2b-confianza-ia",
      title: "Tech & B2B (Arquitecturas de Confianza e Integración IA)",
      body: [
        text(
          'En el sector tecnológico, reconstruimos procesos desde el núcleo. Ayudamos a las organizaciones a dejar de usar la IA como un simple "parche" cosmético para integrarla como su arquitectura base, optimizando la toma de decisiones estratégicas y la productividad operativa en tiempo real sin sacrificar la seguridad de la data.'
        ),
      ],
    },
    {
      id: "lifestyle-wellness-lujo-humano",
      title: "Lifestyle, Wellness & Lujo Humano",
      body: [
        text("Entendemos el agotamiento digital y la "),
        emphasis([text('"Purga de Suscripciones"')]),
        text(
          '. Implementamos estrategias de "Lentitud Intencional", creando experiencias que ofrecen calma y autenticidad sensorial. Hemos aprendido que, en la era de la gratificación instantánea, el control sobre lo físico, lo tangible y lo '
        ),
        node("back-to-human", "humano"),
        text(" es la verdadera y nueva exclusividad."),
      ],
    },
  ],
  seo: {
    title: "Verticales de Impacto",
    description:
      'Aplicamos nuestro Sistema Operativo de forma quirúrgica según la fricción particular de cada industria — sin soluciones genéricas de "talla única".',
  },
};
