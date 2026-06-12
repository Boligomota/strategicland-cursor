import type { KnowledgePageData, KnowledgePageSlug } from "./types";
import { KNOWLEDGE_ROUTES } from "./routes";
import { validateKnowledgeEcosystem, validateKnowledgePage } from "./validate";
import { strategicBrainPage } from "./strategic-brain/page";
import { interdisciplinaryLabPage } from "./interdisciplinary-lab/page";
import { engineDeepDivePage } from "./engine-deep-dive/page";
import { verticalesImpactoPage } from "./verticales-impacto/page";

/**
 * Knowledge registry — single source of truth for all internal
 * knowledge routes (Platform Expansion).
 */

const PAGES: readonly KnowledgePageData[] = [
  strategicBrainPage,
  interdisciplinaryLabPage,
  engineDeepDivePage,
  verticalesImpactoPage,
];

function validatePage(page: KnowledgePageData): void {
  const problems: string[] = [];

  if (page.instanceId.trim() === "") {
    problems.push("instanceId must not be empty");
  }
  if (page.route !== KNOWLEDGE_ROUTES[page.slug]) {
    problems.push(
      `route must match KNOWLEDGE_ROUTES["${page.slug}"], got "${page.route}"`
    );
  }
  if (page.blocks.length > 12) {
    problems.push(
      `blocks exceeds archive allowance (12), got ${page.blocks.length}`
    );
  }

  problems.push(...validateKnowledgePage(page));

  if (problems.length > 0) {
    throw new Error(
      `[content/knowledge] Invalid page "${page.slug}":\n - ${problems.join("\n - ")}`
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  const ecosystemProblems = validateKnowledgeEcosystem(PAGES);
  if (ecosystemProblems.length > 0) {
    throw new Error(
      `[content/knowledge] Ecosystem validation failed:\n - ${ecosystemProblems.join("\n - ")}`
    );
  }

  const seenSlug = new Set<string>();
  const seenInstance = new Set<string>();
  const seenRoute = new Set<string>();

  for (const page of PAGES) {
    if (seenSlug.has(page.slug)) {
      throw new Error(`[content/knowledge] Duplicate slug "${page.slug}"`);
    }
    if (seenInstance.has(page.instanceId)) {
      throw new Error(
        `[content/knowledge] Duplicate instanceId "${page.instanceId}"`
      );
    }
    if (seenRoute.has(page.route)) {
      throw new Error(`[content/knowledge] Duplicate route "${page.route}"`);
    }
    seenSlug.add(page.slug);
    seenInstance.add(page.instanceId);
    seenRoute.add(page.route);
    validatePage(page);
  }
}

export function getAllKnowledgePages(): readonly KnowledgePageData[] {
  return PAGES;
}

export function getKnowledgePage(
  slug: KnowledgePageSlug
): KnowledgePageData | undefined {
  return PAGES.find((p) => p.slug === slug);
}

export function getKnowledgePageByRoute(
  route: string
): KnowledgePageData | undefined {
  return PAGES.find((p) => p.route === route);
}
