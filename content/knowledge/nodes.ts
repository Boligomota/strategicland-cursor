/**
 * Intelligence Node registry — canonical connectors (Fase 09 + Structural Review).
 * Authority: Arquitectura_Web_wmnnd.md. No additional nodes without Human Director auth.
 */

import type { KnowledgePageSlug, KnowledgeRoute } from "./types";
import { KNOWLEDGE_ROUTES } from "./routes";

export type NodeCategory =
  | "prospectiva"
  | "confianza"
  | "identidad"
  | "oferta"
  | "metodologia"
  | "autenticidad"
  | "narrativa"
  | "cultura";

export type NodeSurface =
  | "home"
  | KnowledgePageSlug
  | "showcase"
  | "storyscape-activator";

export type NodeAppearance = {
  surface: NodeSurface;
  section: string;
  blockId?: string;
  linkable: boolean;
  anchorOnly?: boolean;
};

export type IntelligenceNodeId =
  | "comercio-agentico"
  | "proveniencia-digital"
  | "capa-semantica-unificada"
  | "pensamiento-critico"
  | "storyscape"
  | "back-to-human"
  | "lideres-hibridos"
  | "utilidad-invisible"
  | "hipermediatizacion"
  | "experiencias-inmersivas"
  | "splinternet"
  | "crowdculture";

export type NodeStatus = "canonical" | "reserved";

export type IntelligenceNode = {
  id: IntelligenceNodeId;
  label: string;
  category: NodeCategory;
  primarySurface: NodeSurface;
  appearances: readonly NodeAppearance[];
  connectionFunction: string;
  defaultTarget: KnowledgeRoute | "/" | null;
  status: NodeStatus;
};

export const INTELLIGENCE_NODES: Record<
  IntelligenceNodeId,
  IntelligenceNode
> = {
  "comercio-agentico": {
    id: "comercio-agentico",
    label: "Comercio Agéntico",
    category: "prospectiva",
    primarySurface: "strategic-brain",
    connectionFunction: "Une servicio ↔ prospectiva ↔ sector",
    defaultTarget: KNOWLEDGE_ROUTES["verticales-impacto"],
    status: "canonical",
    appearances: [
      {
        surface: "home",
        section: "Home/04/Digital & Agentic Commerce",
        linkable: false,
      },
      {
        surface: "strategic-brain",
        section: "Strategic Brain/Era Agéntica",
        blockId: "era-agentica",
        linkable: true,
      },
      {
        surface: "verticales-impacto",
        section: "Verticales/Retail",
        blockId: "retail-comercio-descubrimiento",
        linkable: true,
        anchorOnly: true,
      },
    ],
  },
  "proveniencia-digital": {
    id: "proveniencia-digital",
    label: "Proveniencia Digital",
    category: "confianza",
    primarySurface: "strategic-brain",
    connectionFunction: "Une prospectiva ↔ método",
    defaultTarget: KNOWLEDGE_ROUTES["engine-deep-dive"],
    status: "canonical",
    appearances: [
      {
        surface: "strategic-brain",
        section: "Strategic Brain/Trust Signals",
        blockId: "trust-signals",
        linkable: true,
      },
      {
        surface: "engine-deep-dive",
        section: "Engine Deep-Dive/Fase 1",
        linkable: true,
      },
    ],
  },
  "capa-semantica-unificada": {
    id: "capa-semantica-unificada",
    label: "Capa Semántica Unificada",
    category: "identidad",
    primarySurface: "strategic-brain",
    connectionFunction: "Une identidad ↔ prospectiva",
    defaultTarget: KNOWLEDGE_ROUTES["interdisciplinary-lab"],
    status: "canonical",
    appearances: [
      {
        surface: "home",
        section: "Home/03",
        linkable: false,
      },
      {
        surface: "strategic-brain",
        section: "Strategic Brain/Trust Signals",
        blockId: "trust-signals",
        linkable: true,
      },
    ],
  },
  "pensamiento-critico": {
    id: "pensamiento-critico",
    label: "Pensamiento Crítico",
    category: "metodologia",
    primarySurface: "engine-deep-dive",
    connectionFunction: "Une procesador ↔ método ↔ equipo",
    defaultTarget: KNOWLEDGE_ROUTES["engine-deep-dive"],
    status: "canonical",
    appearances: [
      {
        surface: "home",
        section: "Home/06/Planeación",
        linkable: false,
      },
      {
        surface: "engine-deep-dive",
        section: "Engine Deep-Dive/Filtro",
        linkable: true,
      },
      {
        surface: "interdisciplinary-lab",
        section: "Lab (juicio crítico)",
        linkable: true,
      },
    ],
  },
  storyscape: {
    id: "storyscape",
    label: "Storyscape",
    category: "narrativa",
    primarySurface: "engine-deep-dive",
    connectionFunction: "Une oferta ↔ activación ↔ método",
    defaultTarget: KNOWLEDGE_ROUTES["engine-deep-dive"],
    status: "canonical",
    appearances: [
      { surface: "home", section: "Home/04", linkable: false },
      { surface: "home", section: "Home/07", linkable: false },
      {
        surface: "engine-deep-dive",
        section: "Engine Deep-Dive/Orquestación",
        linkable: true,
      },
    ],
  },
  "back-to-human": {
    id: "back-to-human",
    label: "Back to Human",
    category: "autenticidad",
    primarySurface: "interdisciplinary-lab",
    connectionFunction: "Une servicio ↔ equipo ↔ sector",
    defaultTarget: KNOWLEDGE_ROUTES["interdisciplinary-lab"],
    status: "canonical",
    appearances: [
      {
        surface: "home",
        section: "Home/04/Branding",
        linkable: false,
      },
      {
        surface: "interdisciplinary-lab",
        section: "Lab/Framework Back to Human",
        linkable: true,
      },
      {
        surface: "verticales-impacto",
        section: "Verticales/Lujo Humano",
        blockId: "lifestyle-wellness-lujo-humano",
        linkable: true,
      },
    ],
  },
  "lideres-hibridos": {
    id: "lideres-hibridos",
    label: "Líderes Híbridos",
    category: "identidad",
    primarySurface: "interdisciplinary-lab",
    connectionFunction: "Une identidad ↔ operación ↔ navegación",
    defaultTarget: KNOWLEDGE_ROUTES["interdisciplinary-lab"],
    status: "canonical",
    appearances: [
      {
        surface: "home",
        section: "Home/03",
        linkable: true,
      },
      {
        surface: "interdisciplinary-lab",
        section: "Lab/Liderazgo Híbrido",
        linkable: true,
      },
    ],
  },
  "utilidad-invisible": {
    id: "utilidad-invisible",
    label: "Utilidad Invisible",
    category: "oferta",
    primarySurface: "home",
    connectionFunction: "Une oferta ↔ navegación ↔ prospectiva",
    defaultTarget: "/",
    status: "canonical",
    appearances: [
      {
        surface: "home",
        section: "Home/04",
        linkable: true,
      },
      {
        surface: "strategic-brain",
        section: "Strategic Brain/Era Agéntica",
        blockId: "era-agentica",
        linkable: false,
        anchorOnly: true,
      },
    ],
  },
  hipermediatizacion: {
    id: "hipermediatizacion",
    label: "Hipermediatización",
    category: "oferta",
    primarySurface: "home",
    connectionFunction: "Une servicio ↔ arsenal",
    defaultTarget: "/",
    status: "canonical",
    appearances: [
      {
        surface: "home",
        section: "Home/04/Brand Content",
        linkable: false,
      },
      {
        surface: "storyscape-activator",
        section: "Activador 2",
        linkable: false,
        anchorOnly: true,
      },
    ],
  },
  "experiencias-inmersivas": {
    id: "experiencias-inmersivas",
    label: "Experiencias Inmersivas",
    category: "narrativa",
    primarySurface: "showcase",
    connectionFunction: "Une servicio ↔ arsenal ↔ evidencia",
    defaultTarget: "/",
    status: "canonical",
    appearances: [
      {
        surface: "home",
        section: "Home/04/Experiential Marketing",
        linkable: false,
      },
      {
        surface: "storyscape-activator",
        section: "Activador 3",
        linkable: false,
        anchorOnly: true,
      },
      {
        surface: "showcase",
        section: 'Showcase/"Chocolate Fountain"',
        linkable: false,
      },
    ],
  },
  splinternet: {
    id: "splinternet",
    label: "Splinternet",
    category: "cultura",
    primarySurface: "strategic-brain",
    connectionFunction: "Neo-Tribalismo y Splinternet → Crowdculture (activador 5)",
    defaultTarget: null,
    status: "canonical",
    appearances: [
      {
        surface: "strategic-brain",
        section: "Strategic Brain/Neo-Tribalismo",
        blockId: "neo-tribalismo-splinternet",
        linkable: false,
        anchorOnly: true,
      },
      {
        surface: "storyscape-activator",
        section: "Activador 5 Crowdculture",
        linkable: false,
        anchorOnly: true,
      },
    ],
  },
  crowdculture: {
    id: "crowdculture",
    label: "Crowdculture",
    category: "cultura",
    primarySurface: "storyscape-activator",
    connectionFunction: "Neo-Tribalismo y Splinternet → Crowdculture (activador 5)",
    defaultTarget: null,
    status: "canonical",
    appearances: [
      {
        surface: "storyscape-activator",
        section: "Activador 5",
        linkable: false,
        anchorOnly: true,
      },
    ],
  },
} as const;

export function getIntelligenceNode(
  id: IntelligenceNodeId
): IntelligenceNode {
  return INTELLIGENCE_NODES[id];
}

export function resolveNodeHref(
  nodeId: IntelligenceNodeId
): KnowledgeRoute | "/" | null {
  const entry = INTELLIGENCE_NODES[nodeId];
  return entry.defaultTarget;
}
