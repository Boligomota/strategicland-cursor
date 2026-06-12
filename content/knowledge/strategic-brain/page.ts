import type { KnowledgePageData } from "../types";
import { KNOWLEDGE_ROUTES } from "../routes";
import { emphasis, node, text } from "../rich-content";

/**
 * THE STRATEGIC BRAIN 2026 — content module.
 * Copy authority: Arquitectura_Web_wmnnd.md · Fase 04 · Página 1 (literal).
 */
export const strategicBrainPage: KnowledgePageData = {
  slug: "strategic-brain",
  route: KNOWLEDGE_ROUTES["strategic-brain"],
  instanceId: "strategic-brain",
  title: "The Strategic Brain 2026",
  opening: {
    statement: [
      text(
        "Nuestra mirada predictiva nace de la ejecución constante, no de la simple lectura."
      ),
    ],
    positioning: [
      text(
        "Esta sección no es un reporte de tendencias externo; es el destilado de nuestra experiencia en campo anticipando los giros del mercado para nuestros socios comerciales."
      ),
    ],
  },
  blocksLayout: {
    mode: "signal-grid",
    columns: 3,
    minSlots: 3,
    reservedSlots: 2,
  },
  archive: {
    scope: "strategic-brain",
    editionYear: 2026,
    editionLabel: "The Strategic Brain 2026",
    consultable: true,
    accumulable: true,
  },
  blocks: [
    {
      id: "era-agentica",
      title: "La Era Agéntica y el Colapso de la Interfaz",
      archive: {
        signalId: "era-agentica",
        documentedAt: "2026-06-11",
        archiveYear: 2026,
        status: "published",
      },
      body: [
        text(
          "En nuestra práctica reciente orquestando "
        ),
        emphasis([text("Agentes IA-Nativos")]),
        text(
          ", hemos aprendido que el usuario del futuro inmediato ya no quiere navegar menús complicados; quiere resultados basados en su intención pura. Hemos implementado sistemas de "
        ),
        text('"'),
        node("comercio-agentico"),
        text(
          '" que gestionan ciclos completos —desde la inspiración hasta el soporte post-venta— eliminando la carga cognitiva y devolviendo el tiempo de calidad al humano.'
        ),
      ],
    },
    {
      id: "trust-signals",
      title: "Trust Signals y la Guerra de Verificación",
      archive: {
        signalId: "trust-signals",
        documentedAt: "2026-06-11",
        archiveYear: 2026,
        status: "published",
      },
      body: [
        text(
          'Tras auditar ecosistemas saturados de contenido sintético y "slop" algorítmico, hemos desarrollado protocolos de '
        ),
        node("proveniencia-digital"),
        text(
          ". Hemos comprobado que las marcas que sobreviven son las que pueden validar el origen de su valor. En nuestra práctica, la confianza no se declara, se audita mediante una "
        ),
        text('"'),
        node("capa-semantica-unificada"),
        text(
          '" donde humanos y máquinas operan sobre la misma verdad compartida.'
        ),
      ],
    },
    {
      id: "neo-tribalismo-splinternet",
      title: "Neo-Tribalismo y el Splinternet",
      archive: {
        signalId: "neo-tribalismo-splinternet",
        documentedAt: "2026-06-11",
        archiveYear: 2026,
        status: "published",
      },
      body: [
        text(
          "Nuestras incursiones en comunidades de nicho confirman que la masa uniforme ha muerto. Ayudamos a las marcas a infiltrarse en \"burbujas de eco\" y comunidades cerradas ("
        ),
        node("splinternet"),
        text(
          ") donde la relevancia se gana con utilidad real, no con alcance algorítmico vacío. Hemos dominado la comunicación en espacios privados y plataformas conversacionales donde el algoritmo tradicional no tiene acceso."
        ),
      ],
    },
  ],
  seo: {
    title: "The Strategic Brain 2026",
    description:
      "Repositorio de señales de mercado y visión prospectiva — destilado de nuestra experiencia en campo.",
  },
};
