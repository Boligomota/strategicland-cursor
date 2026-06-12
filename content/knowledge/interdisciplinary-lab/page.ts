import type { KnowledgePageData } from "../types";
import { KNOWLEDGE_ROUTES } from "../routes";
import { emphasis, node, text } from "../rich-content";

/**
 * INTERDISCIPLINARY LAB — content module.
 * Copy authority: Arquitectura_Web_wmnnd.md · Fase 04 · Página 2 (literal).
 */
export const interdisciplinaryLabPage: KnowledgePageData = {
  slug: "interdisciplinary-lab",
  route: KNOWLEDGE_ROUTES["interdisciplinary-lab"],
  instanceId: "interdisciplinary-lab",
  title: "Interdisciplinary Lab",
  opening: {
    statement: [
      text(
        "Transformamos la inteligencia colectiva en rentabilidad de alto impacto mediante el equilibrio híbrido."
      ),
    ],
    positioning: [
      text(
        "Nuestro laboratorio es la estructura operativa viva donde gestionamos la frontera entre la escala artificial exponencial y la intuición humana irreducible."
      ),
    ],
  },
  blocks: [
    {
      id: "agent-workforce",
      title: "Gestión de la Agent Workforce",
      body: [
        text(
          "Hemos aprendido a tratar a los agentes de IA no como herramientas, sino como una fuerza laboral operativa capaz de escalar la productividad 10x. Diseñamos "
        ),
        emphasis([text('"Líneas de Ensamblaje Digital"')]),
        text(
          " donde delegamos la ejecución repetitiva a la IA para liberar la potencia del juicio crítico, la estrategia y la creatividad de nuestros líderes humanos."
        ),
      ],
    },
    {
      id: "back-to-human",
      title: "Framework Back to Human (Lo Real como Diferencial de Lujo)",
      body: [
        text(
          "A través de nuestra ejecución creativa en proyectos de alto nivel, hemos comprobado que, a medida que la IA uniformiza el diseño digital, lo "
        ),
        emphasis([text('"Raw"')]),
        text(" y lo "),
        node("back-to-human", "auténtico"),
        text(
          ' se vuelven el nuevo lujo. Nuestra filosofía prioriza el "toque distintivamente humano", reivindicando lo imperfecto y lo deliberado como el ancla de confianza frente al caos del algoritmo.'
        ),
      ],
    },
    {
      id: "hybrid-leadership-agile-pods",
      title: "Liderazgo Híbrido y Células Ágiles (Agile Pods)",
      body: [
        text("Hemos resuelto la "),
        emphasis([text('"Paradoja del Aprendiz"')]),
        text(
          " mediante estructuras de mentoría humana y células de trabajo interdisciplinarias. En nuestros "
        ),
        node("lideres-hibridos", "pods"),
        text(
          ", los miembros técnicos y estratégicos co-crean orgánicamente, asegurando que la intuición, la ética y el sentido común permanezcan como los activos principales e irreemplazables de la oficina."
        ),
      ],
    },
  ],
  seo: {
    title: "Interdisciplinary Lab",
    description:
      "Estructura operativa viva donde gestionamos la frontera entre la escala artificial exponencial y la intuición humana irreducible.",
  },
};
