/**
 * Knowledge graph — documented relationships only (Fase 09).
 * Authority: Arquitectura_Web_wmnnd.md · Structural Review.
 */

import type { IntelligenceNodeId } from "./nodes";
import { KNOWLEDGE_ROUTES } from "./routes";
import type { KnowledgePageSlug } from "./types";

export type KnowledgeTheme =
  | "hibridez-humano-maquina"
  | "metodologia-sistema-operativo"
  | "narrativa-persistente"
  | "confianza-auditable"
  | "prospectiva-2026"
  | "autenticidad-lujo"
  | "especializacion-sectorial";

export type DependencyLevel = "hard" | "medium" | "soft";

export type GraphEdgeKind =
  | "bidirectional"
  | "hub-and-spoke"
  | "method-prospectiva"
  | "identity-prospectiva"
  | "sector-bridge"
  | "thematic";

export type KnowledgeGraphEdge = {
  from: IntelligenceNodeId | KnowledgePageSlug | "home";
  to: IntelligenceNodeId | KnowledgePageSlug | "home" | "showcase";
  theme: KnowledgeTheme;
  kind: GraphEdgeKind;
  dependency: DependencyLevel;
  /** Documented section reference for traceability. */
  source: string;
};

export const KNOWLEDGE_GRAPH_EDGES: readonly KnowledgeGraphEdge[] = [
  {
    from: "capa-semantica-unificada",
    to: "interdisciplinary-lab",
    theme: "hibridez-humano-maquina",
    kind: "identity-prospectiva",
    dependency: "medium",
    source: "Fase 04 Página 1 · salida Capa Semántica → Lab",
  },
  {
    from: "comercio-agentico",
    to: "verticales-impacto",
    theme: "prospectiva-2026",
    kind: "hub-and-spoke",
    dependency: "medium",
    source: "Fase 04 Página 1 · salida Comercio Agéntico → Verticales",
  },
  {
    from: "proveniencia-digital",
    to: "engine-deep-dive",
    theme: "confianza-auditable",
    kind: "method-prospectiva",
    dependency: "medium",
    source: "Fase 09 nodos · Proveniencia Digital",
  },
  {
    from: "proveniencia-digital",
    to: "strategic-brain",
    theme: "confianza-auditable",
    kind: "bidirectional",
    dependency: "medium",
    source: "Fase 09 nodos · Proveniencia Digital",
  },
  {
    from: "strategic-brain",
    to: "interdisciplinary-lab",
    theme: "hibridez-humano-maquina",
    kind: "thematic",
    dependency: "medium",
    source: "Fase 04 Página 1 · navegación recomendada",
  },
  {
    from: "interdisciplinary-lab",
    to: "engine-deep-dive",
    theme: "metodologia-sistema-operativo",
    kind: "thematic",
    dependency: "medium",
    source: "Fase 04 · navegación editorial canónica",
  },
  {
    from: "engine-deep-dive",
    to: "verticales-impacto",
    theme: "especializacion-sectorial",
    kind: "thematic",
    dependency: "medium",
    source: "Fase 04 · navegación editorial canónica",
  },
  {
    from: "verticales-impacto",
    to: "home",
    theme: "metodologia-sistema-operativo",
    kind: "hub-and-spoke",
    dependency: "hard",
    source: "Fase 04 · navegación editorial canónica",
  },
  {
    from: "strategic-brain",
    to: "verticales-impacto",
    theme: "prospectiva-2026",
    kind: "thematic",
    dependency: "medium",
    source: "Fase 04 Página 1 · navegación recomendada",
  },
  {
    from: "home",
    to: "strategic-brain",
    theme: "metodologia-sistema-operativo",
    kind: "hub-and-spoke",
    dependency: "hard",
    source: "Fase 05 #14 · Home/06 enlazamiento estratégico",
  },
  {
    from: "comercio-agentico",
    to: "strategic-brain",
    theme: "prospectiva-2026",
    kind: "bidirectional",
    dependency: "soft",
    source: "Fase 09 TEMA PROSPECTIVA 2026",
  },
  {
    from: "splinternet",
    to: "crowdculture",
    theme: "prospectiva-2026",
    kind: "thematic",
    dependency: "soft",
    source: "Fase 09 · Neo-Tribalismo → Crowdculture activador 5",
  },
  {
    from: "back-to-human",
    to: "interdisciplinary-lab",
    theme: "autenticidad-lujo",
    kind: "bidirectional",
    dependency: "soft",
    source: "Fase 09 TEMA BACK TO HUMAN",
  },
  {
    from: "storyscape",
    to: "engine-deep-dive",
    theme: "narrativa-persistente",
    kind: "hub-and-spoke",
    dependency: "medium",
    source: "Fase 09 nodos · Storyscape",
  },
  {
    from: "pensamiento-critico",
    to: "engine-deep-dive",
    theme: "metodologia-sistema-operativo",
    kind: "method-prospectiva",
    dependency: "medium",
    source: "Fase 09 nodos · Pensamiento Crítico",
  },
  {
    from: "strategic-brain",
    to: "engine-deep-dive",
    theme: "metodologia-sistema-operativo",
    kind: "thematic",
    dependency: "medium",
    source: "Fase 04 Página 1 · navegación recomendada",
  },
  {
    from: "utilidad-invisible",
    to: "strategic-brain",
    theme: "prospectiva-2026",
    kind: "thematic",
    dependency: "soft",
    source: "Fase 09 nodos · Utilidad Invisible",
  },
  {
    from: "storyscape",
    to: "hipermediatizacion",
    theme: "narrativa-persistente",
    kind: "thematic",
    dependency: "soft",
    source: "Fase 09 nodos · Hipermediatización",
  },
  {
    from: "experiencias-inmersivas",
    to: "showcase",
    theme: "narrativa-persistente",
    kind: "thematic",
    dependency: "soft",
    source: "Fase 09 nodos · Experiencias Inmersivas",
  },
  {
    from: "lideres-hibridos",
    to: "interdisciplinary-lab",
    theme: "hibridez-humano-maquina",
    kind: "identity-prospectiva",
    dependency: "medium",
    source: "Fase 03 Trigger 1 · Líderes Híbridos",
  },
] as const;

/** Canonical editorial progression between knowledge pages (Agent 13). */
export type KnowledgeProgressionTarget = KnowledgePageSlug | "home";

export type KnowledgePageProgression = {
  from: KnowledgePageSlug;
  to: KnowledgeProgressionTarget;
  /** Bracket register — aligned with HOMEPAGE_KNOWLEDGE_TRIGGERS labels. */
  linkLabel: string;
  /** Institutional forward cue — prefix before EditorialLink. */
  prefix: string;
  /** Optional suffix after EditorialLink (defaults to "."). */
  suffix?: string;
};

export const KNOWLEDGE_PAGE_PROGRESSION: readonly KnowledgePageProgression[] = [
  {
    from: "strategic-brain",
    to: "interdisciplinary-lab",
    linkLabel: "[INTERDISCIPLINARY LAB: Human x Machine]",
    prefix:
      "La frontera entre talento humano y automatización inteligente se documenta en el ",
  },
  {
    from: "interdisciplinary-lab",
    to: "engine-deep-dive",
    linkLabel: "[THE ENGINE DEEP-DIVE]",
    prefix: "El desmantelamiento operativo de la complejidad se registra en ",
  },
  {
    from: "engine-deep-dive",
    to: "verticales-impacto",
    linkLabel: "[VERTICALES DE IMPACTO]",
    prefix:
      "La aplicación sectorial del marco metodológico continúa en ",
  },
  {
    from: "verticales-impacto",
    to: "home",
    linkLabel: "organismo principal",
    prefix: "Cierre del recorrido documental — retorno al ",
  },
] as const;

export function getKnowledgePageProgression(
  slug: KnowledgePageSlug
): KnowledgePageProgression | undefined {
  return KNOWLEDGE_PAGE_PROGRESSION.find((entry) => entry.from === slug);
}

export function progressionTargetHref(
  target: KnowledgeProgressionTarget
): string {
  if (target === "home") return "/";
  return KNOWLEDGE_ROUTES[target];
}

export type PageOwnership = {
  slug: KnowledgePageSlug;
  role: "hub" | "operativo" | "metodologico" | "sectorial";
  ownedNodeIds: readonly IntelligenceNodeId[];
};

export const PAGE_OWNERSHIP: readonly PageOwnership[] = [
  {
    slug: "strategic-brain",
    role: "hub",
    ownedNodeIds: [
      "comercio-agentico",
      "proveniencia-digital",
      "capa-semantica-unificada",
      "splinternet",
    ],
  },
  {
    slug: "interdisciplinary-lab",
    role: "operativo",
    ownedNodeIds: ["back-to-human", "lideres-hibridos"],
  },
  {
    slug: "engine-deep-dive",
    role: "metodologico",
    ownedNodeIds: ["pensamiento-critico", "storyscape"],
  },
  {
    slug: "verticales-impacto",
    role: "sectorial",
    ownedNodeIds: [],
  },
] as const;
