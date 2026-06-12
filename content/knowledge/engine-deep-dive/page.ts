import type { KnowledgePageData } from "../types";
import { KNOWLEDGE_ROUTES } from "../routes";
import { emphasis, text } from "../rich-content";

/**
 * THE ENGINE DEEP-DIVE — content module.
 * Copy authority: Arquitectura_Web_wmnnd.md · Fase 04 · Página 3 (literal).
 */
export const engineDeepDivePage: KnowledgePageData = {
  slug: "engine-deep-dive",
  route: KNOWLEDGE_ROUTES["engine-deep-dive"],
  instanceId: "engine-deep-dive",
  title: "The Engine Deep-Dive",
  opening: {
    statement: [
      text(
        "Desmantelamos la complejidad del mercado para entregar claridad accionable y estrategias de blindaje."
      ),
    ],
    positioning: [
      text(
        "El Engine es el mapa de ruta técnico que hemos perfeccionado tras cientos de iteraciones operativas en mercados saturados y cambiantes."
      ),
    ],
  },
  blocks: [
    {
      id: "fase-1-auditoria-contexto-procedencia",
      title: "Fase de Auditoría de Contexto y Procedencia Digital",
      body: [
        text(
          "No operamos con datos alucinados ni proyecciones de caja negra. El primer paso en cada proyecto es una limpieza radical de las fuentes de información. Validamos la procedencia de la data para construir estrategias ancladas en la realidad cruda del mercado, evitando los sesgos de las plataformas genéricas."
        ),
      ],
    },
    {
      id: "filtro-pensamiento-critico",
      title: "El Filtro de Pensamiento Crítico",
      body: [
        text(
          "Nuestro proceso separa el ruido pasajero de los motores de cambio estructural. Aplicamos lo que llamamos "
        ),
        emphasis([text('"Copywriting Notarial"')]),
        text(": una técnica de persuasión basada en la "),
        emphasis([text('"Prueba sobre la Promesa"')]),
        text(
          ". No comunicamos lo que la marca quiere ser, sino lo que la marca es capaz de probar, generando mensajes con una autoridad y credibilidad imposibles de ignorar."
        ),
      ],
    },
    {
      id: "orquestacion-storyscape",
      title: "Orquestación del Storyscape",
      body: [
        text(
          "Diseñamos universos narrativos que perduran en el tiempo. Nuestra experiencia dicta que las campañas mueren, pero los escenarios permanecen. Creamos ecosistemas donde cada interacción —desde una respuesta automatizada hasta una experiencia física multisensorial— refuerza el propósito de la marca de forma coherente, escalable y expansible."
        ),
      ],
    },
  ],
  seo: {
    title: "The Engine Deep-Dive",
    description:
      "El mapa de ruta técnico perfeccionado tras cientos de iteraciones operativas en mercados saturados y cambiantes.",
  },
};
