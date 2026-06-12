import type { KnowledgePageSlug, KnowledgeRoute } from "./types";

/**
 * Canonical knowledge routes — single source for EditorialLink,
 * homepage trigger wiring, and registry validation.
 */
export const KNOWLEDGE_ROUTES: Record<KnowledgePageSlug, KnowledgeRoute> = {
  "strategic-brain": "/strategic-brain",
  "interdisciplinary-lab": "/interdisciplinary-lab",
  "engine-deep-dive": "/engine-deep-dive",
  "verticales-impacto": "/verticales-impacto",
} as const;

export function knowledgeRouteFor(slug: KnowledgePageSlug): KnowledgeRoute {
  return KNOWLEDGE_ROUTES[slug];
}
