import type { KnowledgePageSlug } from "./types";
import { KNOWLEDGE_ROUTES } from "./routes";

/**
 * Homepage strategic trigger map — Fase 0 documentation artefact.
 * Homepage trigger registry — routes canonical; wiring tracked per entry.
 *
 * Source: Arquitectura_Web_wmnnd.md · Fase 03 Capa transversal + §03–§06.
 */

export type HomepageTriggerKind =
  | "strategic-link"
  | "deep-dive-cta"
  | "control-pill";

export type HomepageTriggerRef = {
  /** Bracket label as rendered on homepage (typographic cue). */
  label: string;
  targetSlug: KnowledgePageSlug;
  route: (typeof KNOWLEDGE_ROUTES)[KnowledgePageSlug];
  /** Source component path (implementation surface). */
  sourceComponent: string;
  kind: HomepageTriggerKind;
  /** Implementation note — wiring status tracked in sourceComponent. */
  wireStrategy: string;
};

export const HOMEPAGE_KNOWLEDGE_TRIGGERS: readonly HomepageTriggerRef[] = [
  {
    label: "[INTERDISCIPLINARY LAB: Human x Machine]",
    targetSlug: "interdisciplinary-lab",
    route: KNOWLEDGE_ROUTES["interdisciplinary-lab"],
    sourceComponent:
      "app/components/cinematic/methodology/MethodologyNarrative/ClosingThreshold.tsx",
    kind: "strategic-link",
    wireStrategy:
      "Replace typographic bracket text with EditorialLink; preserve methodology-threshold-link class.",
  },
  {
    label: "[THE ENGINE DEEP-DIVE]",
    targetSlug: "engine-deep-dive",
    route: KNOWLEDGE_ROUTES["engine-deep-dive"],
    sourceComponent:
      "app/components/cinematic/methodology/MethodologyNarrative/FrameworkSequence.tsx",
    kind: "strategic-link",
    wireStrategy:
      "Split framework-link paragraph; wrap bracket segment in EditorialLink.",
  },
  {
    label: "[VERTICALES DE IMPACTO]",
    targetSlug: "verticales-impacto",
    route: KNOWLEDGE_ROUTES["verticales-impacto"],
    sourceComponent:
      "app/components/cinematic/methodology/MethodologyNarrative/FrameworkSequence.tsx",
    kind: "strategic-link",
    wireStrategy:
      "Same as Engine Deep-Dive — second bracket in framework-link copy.",
  },
  {
    label: "[THE STRATEGIC BRAIN 2026]",
    targetSlug: "strategic-brain",
    route: KNOWLEDGE_ROUTES["strategic-brain"],
    sourceComponent:
      "app/components/cinematic/capabilities/CapabilitiesNarrative/OperationalThreshold.tsx",
    kind: "strategic-link",
    wireStrategy:
      "Wrap bracket cue in EditorialLink; preserve capabilities threshold register.",
  },
  {
    label: "[¿Cómo desmantelamos la complejidad? Ver Proceso Interno]",
    targetSlug: "engine-deep-dive",
    route: KNOWLEDGE_ROUTES["engine-deep-dive"],
    sourceComponent:
      "app/components/cinematic/capabilities/CapabilitiesNarrative/OperationalThreshold.tsx",
    kind: "deep-dive-cta",
    wireStrategy:
      "Deep-dive CTA via EditorialLink; preserve methodology-threshold-link register.",
  },
  {
    label: "Nodo de Control — Metodología técnica",
    targetSlug: "engine-deep-dive",
    route: KNOWLEDGE_ROUTES["engine-deep-dive"],
    sourceComponent:
      "app/components/cinematic/methodology/MethodologyNarrative/FrameworkSequence.tsx",
    kind: "control-pill",
    wireStrategy:
      "Profile pill (Director de Innovación → Metodología técnica) via EditorialLink.",
  },
  {
    label: "Nodo de Control — Soluciones por Industria",
    targetSlug: "verticales-impacto",
    route: KNOWLEDGE_ROUTES["verticales-impacto"],
    sourceComponent:
      "app/components/cinematic/methodology/MethodologyNarrative/FrameworkSequence.tsx",
    kind: "control-pill",
    wireStrategy:
      "Profile pill (CEO → Soluciones por Industria) via EditorialLink.",
  },
] as const;
