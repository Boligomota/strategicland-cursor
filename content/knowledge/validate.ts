/**
 * Knowledge content validators — dev-time integrity gates.
 */

import type { KnowledgeContent } from "./rich-content";
import { flattenTextContent } from "./rich-content";
import { KNOWLEDGE_GRAPH_EDGES, PAGE_OWNERSHIP } from "./graph";
import type { IntelligenceNodeId } from "./nodes";
import { INTELLIGENCE_NODES } from "./nodes";
import { KNOWLEDGE_ROUTES } from "./routes";
import { HOMEPAGE_KNOWLEDGE_TRIGGERS } from "./triggers";
import type { KnowledgeBlock, KnowledgePageData, KnowledgePageSlug } from "./types";

const KNOWLEDGE_PAGE_SLUGS = Object.keys(
  KNOWLEDGE_ROUTES
) as KnowledgePageSlug[];

const KNOWLEDGE_ROUTE_SET = new Set(Object.values(KNOWLEDGE_ROUTES));

function isKnowledgePageSlug(value: string): value is KnowledgePageSlug {
  return value in KNOWLEDGE_ROUTES;
}

function slugForRoute(route: string): KnowledgePageSlug | undefined {
  return KNOWLEDGE_PAGE_SLUGS.find((slug) => KNOWLEDGE_ROUTES[slug] === route);
}

function isGraphEndpoint(value: string): boolean {
  return (
    value === "home" ||
    value === "showcase" ||
    value in INTELLIGENCE_NODES ||
    isKnowledgePageSlug(value)
  );
}

function collectNodeRefs(content: KnowledgeContent): IntelligenceNodeId[] {
  const refs: IntelligenceNodeId[] = [];
  for (const segment of content) {
    if (segment.kind === "node") {
      refs.push(segment.nodeId);
    } else if (segment.kind === "link" && segment.nodeId) {
      refs.push(segment.nodeId);
    } else if (segment.kind === "emphasis") {
      refs.push(...collectNodeRefs(segment.children));
    }
  }
  return refs;
}

function collectContentNodeRefs(
  pages: readonly KnowledgePageData[]
): Set<IntelligenceNodeId> {
  const refs = new Set<IntelligenceNodeId>();
  for (const page of pages) {
    for (const nodeId of collectNodeRefs(page.opening.statement)) {
      refs.add(nodeId);
    }
    for (const nodeId of collectNodeRefs(page.opening.positioning)) {
      refs.add(nodeId);
    }
    for (const block of page.blocks) {
      for (const nodeId of collectNodeRefs(block.body)) {
        refs.add(nodeId);
      }
    }
  }
  return refs;
}

function reachablePageSlugsFromHome(): Set<KnowledgePageSlug> {
  const visited = new Set<string>(["home"]);
  const queue = ["home"];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) break;

    for (const edge of KNOWLEDGE_GRAPH_EDGES) {
      if (edge.from !== current) continue;
      if (!visited.has(edge.to)) {
        visited.add(edge.to);
        queue.push(edge.to);
      }
    }
  }

  const pages = new Set<KnowledgePageSlug>();
  for (const id of visited) {
    if (isKnowledgePageSlug(id)) {
      pages.add(id);
    }
  }
  return pages;
}

export function validateNodeRefs(content: KnowledgeContent): string[] {
  const problems: string[] = [];
  for (const nodeId of collectNodeRefs(content)) {
    if (!INTELLIGENCE_NODES[nodeId]) {
      problems.push(`Unknown intelligence node "${nodeId}"`);
    }
  }
  return problems;
}

export function validateBlock(block: KnowledgeBlock): string[] {
  const problems: string[] = [];
  if (block.body.length === 0 && block.title.trim() !== "") {
    problems.push(`Block "${block.id}" has title but empty body`);
  }
  problems.push(...validateNodeRefs(block.body));
  if (block.archive && block.archive.signalId !== block.id) {
    problems.push(
      `Block "${block.id}" archive.signalId mismatch (${block.archive.signalId})`
    );
  }
  return problems;
}

export function validateKnowledgePage(page: KnowledgePageData): string[] {
  const problems: string[] = [];

  problems.push(...validateNodeRefs(page.opening.statement));
  problems.push(...validateNodeRefs(page.opening.positioning));

  for (const block of page.blocks) {
    problems.push(...validateBlock(block));
  }

  if (page.blocksLayout?.mode === "signal-grid") {
    const published = page.blocks.filter(
      (b) => b.archive?.status !== "reserved"
    ).length;
    const reserved = page.blocksLayout.reservedSlots ?? 0;
    if (published === 0 && page.blocks.length > 0) {
      problems.push("signal-grid requires at least one published signal");
    }
    if (page.blocks.length < published) {
      problems.push("blocks length must include all published signals");
    }
    void reserved;
  }

  if (page.archive && page.slug !== "strategic-brain") {
    problems.push("PageArchiveMeta is only valid on strategic-brain");
  }

  return problems;
}

/** Routes catalog — keys, paths, and uniqueness. */
export function validateRoutesCatalog(): string[] {
  const problems: string[] = [];
  const routes = Object.values(KNOWLEDGE_ROUTES);

  if (KNOWLEDGE_PAGE_SLUGS.length !== routes.length) {
    problems.push("KNOWLEDGE_ROUTES slug/route pair count mismatch");
  }

  for (const slug of KNOWLEDGE_PAGE_SLUGS) {
    const route = KNOWLEDGE_ROUTES[slug];
    if (route !== `/${slug}`) {
      problems.push(
        `KNOWLEDGE_ROUTES["${slug}"] must be "/${slug}", got "${route}"`
      );
    }
  }

  const uniqueRoutes = new Set(routes);
  if (uniqueRoutes.size !== routes.length) {
    problems.push("KNOWLEDGE_ROUTES contains duplicate route paths");
  }

  return problems;
}

/** Intelligence node registry — ids and route targets. */
export function validateIntelligenceNodeRegistry(): string[] {
  const problems: string[] = [];

  for (const [registryKey, node] of Object.entries(INTELLIGENCE_NODES)) {
    if (registryKey !== node.id) {
      problems.push(
        `Intelligence node registry key "${registryKey}" does not match node.id "${node.id}"`
      );
    }

    if (
      node.defaultTarget !== null &&
      node.defaultTarget !== "/" &&
      !KNOWLEDGE_ROUTE_SET.has(node.defaultTarget)
    ) {
      problems.push(
        `Node "${node.id}" defaultTarget "${node.defaultTarget}" is not a canonical knowledge route`
      );
    }
  }

  return problems;
}

/** Node registry drift — primarySurface must appear in appearances. */
export function validateNodePrimarySurfaceDrift(): string[] {
  const problems: string[] = [];

  for (const node of Object.values(INTELLIGENCE_NODES)) {
    const hasPrimaryAppearance = node.appearances.some(
      (appearance) => appearance.surface === node.primarySurface
    );
    if (!hasPrimaryAppearance) {
      problems.push(
        `Node "${node.id}" primarySurface "${node.primarySurface}" missing from appearances`
      );
    }
  }

  return problems;
}

/** Graph edges — endpoint existence and page slug validity. */
export function validateKnowledgeGraph(): string[] {
  const problems: string[] = [];
  const seenEdges = new Set<string>();

  for (const edge of KNOWLEDGE_GRAPH_EDGES) {
    const key = `${edge.from}→${edge.to}:${edge.theme}:${edge.kind}`;
    if (seenEdges.has(key)) {
      problems.push(`Duplicate graph edge "${edge.from}" → "${edge.to}" (${edge.theme})`);
    }
    seenEdges.add(key);

    if (!isGraphEndpoint(edge.from)) {
      problems.push(
        `Graph edge dead link: unknown endpoint "${edge.from}" (from)`
      );
    }
    if (!isGraphEndpoint(edge.to)) {
      problems.push(
        `Graph edge dead link: unknown endpoint "${edge.to}" (to)`
      );
    }
  }

  return problems;
}

/** Page ownership — registry alignment, shared ownership, primary-surface authority. */
export function validatePageOwnership(): string[] {
  const problems: string[] = [];
  const ownershipByNode = new Map<IntelligenceNodeId, KnowledgePageSlug[]>();

  for (const entry of PAGE_OWNERSHIP) {
    if (!isKnowledgePageSlug(entry.slug)) {
      problems.push(
        `PAGE_OWNERSHIP slug "${entry.slug}" is not in KNOWLEDGE_ROUTES`
      );
      continue;
    }

    for (const nodeId of entry.ownedNodeIds) {
      if (!INTELLIGENCE_NODES[nodeId]) {
        problems.push(
          `PAGE_OWNERSHIP["${entry.slug}"] references unknown node "${nodeId}"`
        );
        continue;
      }

      const owners = ownershipByNode.get(nodeId) ?? [];
      owners.push(entry.slug);
      ownershipByNode.set(nodeId, owners);
    }
  }

  for (const node of Object.values(INTELLIGENCE_NODES)) {
    if (node.status !== "canonical") continue;
    if (!isKnowledgePageSlug(node.primarySurface)) continue;

    const owners = ownershipByNode.get(node.id) ?? [];
    if (owners.length === 0) {
      problems.push(
        `Ownership conflict: node "${node.id}" primarySurface "${node.primarySurface}" is not listed in PAGE_OWNERSHIP`
      );
    } else if (!owners.includes(node.primarySurface)) {
      problems.push(
        `Ownership conflict: node "${node.id}" primarySurface "${node.primarySurface}" not among owners [${owners.join(", ")}]`
      );
    }
  }

  return problems;
}

/** Homepage triggers — slug/route parity with KNOWLEDGE_ROUTES. */
export function validateHomepageTriggers(): string[] {
  const problems: string[] = [];
  const triggerTargets = new Set<KnowledgePageSlug>();

  for (const trigger of HOMEPAGE_KNOWLEDGE_TRIGGERS) {
    if (!isKnowledgePageSlug(trigger.targetSlug)) {
      problems.push(
        `Homepage trigger "${trigger.label}" targetSlug "${trigger.targetSlug}" is not in KNOWLEDGE_ROUTES`
      );
      continue;
    }

    const canonicalRoute = KNOWLEDGE_ROUTES[trigger.targetSlug];
    if (trigger.route !== canonicalRoute) {
      problems.push(
        `Homepage trigger "${trigger.label}" route "${trigger.route}" must match KNOWLEDGE_ROUTES["${trigger.targetSlug}"] ("${canonicalRoute}")`
      );
    }

    triggerTargets.add(trigger.targetSlug);
  }

  for (const slug of KNOWLEDGE_PAGE_SLUGS) {
    if (!triggerTargets.has(slug)) {
      problems.push(
        `Unreachable page: "${slug}" has no HOMEPAGE_KNOWLEDGE_TRIGGERS entry`
      );
    }
  }

  return problems;
}

/** Graph drift — defaultTarget alignment and page-primary node coverage. */
export function validateGraphNodeAlignment(): string[] {
  const problems: string[] = [];

  for (const node of Object.values(INTELLIGENCE_NODES)) {
    if (node.status !== "canonical") continue;

    if (
      node.defaultTarget !== null &&
      node.defaultTarget !== "/" &&
      KNOWLEDGE_ROUTE_SET.has(node.defaultTarget)
    ) {
      const targetSlug = slugForRoute(node.defaultTarget);
      if (
        targetSlug &&
        !KNOWLEDGE_GRAPH_EDGES.some(
          (edge) => edge.from === node.id && edge.to === targetSlug
        )
      ) {
        problems.push(
          `Graph drift: node "${node.id}" defaultTarget "${node.defaultTarget}" lacks graph edge to "${targetSlug}"`
        );
      }
    }

    if (isKnowledgePageSlug(node.primarySurface)) {
      const inGraph = KNOWLEDGE_GRAPH_EDGES.some(
        (edge) => edge.from === node.id || edge.to === node.id
      );
      if (!inGraph) {
        problems.push(
          `Graph drift: canonical node "${node.id}" (primarySurface "${node.primarySurface}") has no KNOWLEDGE_GRAPH_EDGES entry`
        );
      }
    }
  }

  return problems;
}

/** Orphan nodes — page-primary canonical nodes disconnected from graph, ownership, and content. */
export function validateGraphOrphans(
  pages: readonly KnowledgePageData[]
): string[] {
  const problems: string[] = [];
  const contentNodeRefs = collectContentNodeRefs(pages);
  const ownedNodes = new Set<IntelligenceNodeId>();

  for (const entry of PAGE_OWNERSHIP) {
    for (const nodeId of entry.ownedNodeIds) {
      ownedNodes.add(nodeId);
    }
  }

  for (const node of Object.values(INTELLIGENCE_NODES)) {
    if (node.status !== "canonical") continue;
    if (!isKnowledgePageSlug(node.primarySurface)) continue;

    const inGraph = KNOWLEDGE_GRAPH_EDGES.some(
      (edge) => edge.from === node.id || edge.to === node.id
    );
    const inOwnership = ownedNodes.has(node.id);
    const inContent = contentNodeRefs.has(node.id);

    if (inGraph || inOwnership || inContent) continue;

    problems.push(
      `Graph orphan: node "${node.id}" (primarySurface "${node.primarySurface}") absent from graph, ownership, and page content`
    );
  }

  return problems;
}

/** Surface-only nodes — home/showcase/activator nodes outside the page graph. */
export function validateSurfaceOnlyNodes(): string[] {
  const findings: string[] = [];

  for (const node of Object.values(INTELLIGENCE_NODES)) {
    if (node.status !== "canonical") continue;
    if (isKnowledgePageSlug(node.primarySurface)) continue;

    const inGraph = KNOWLEDGE_GRAPH_EDGES.some(
      (edge) => edge.from === node.id || edge.to === node.id
    );
    if (inGraph) continue;

    findings.push(
      `Surface-only node: "${node.id}" (primarySurface "${node.primarySurface}") lives outside KNOWLEDGE_GRAPH_EDGES by design`
    );
  }

  return findings;
}

/** Shared ownership map — informational, not an error when primarySurface matches. */
export function collectSharedOwnership(): string[] {
  const ownershipByNode = new Map<IntelligenceNodeId, KnowledgePageSlug[]>();

  for (const entry of PAGE_OWNERSHIP) {
    for (const nodeId of entry.ownedNodeIds) {
      const owners = ownershipByNode.get(nodeId) ?? [];
      owners.push(entry.slug);
      ownershipByNode.set(nodeId, owners);
    }
  }

  const findings: string[] = [];
  for (const [nodeId, owners] of ownershipByNode) {
    if (owners.length > 1) {
      findings.push(
        `Shared ownership: node "${nodeId}" owned by [${owners.join(", ")}]`
      );
    }
  }
  return findings;
}

/** Node appearances — blockId anchors must exist on declared surfaces. */
export function validateNodeAppearances(
  pages: readonly KnowledgePageData[]
): string[] {
  const problems: string[] = [];
  const pagesBySlug = new Map(pages.map((page) => [page.slug, page]));

  for (const node of Object.values(INTELLIGENCE_NODES)) {
    for (const appearance of node.appearances) {
      if (!isKnowledgePageSlug(appearance.surface)) continue;

      const page = pagesBySlug.get(appearance.surface);
      if (!page) {
        problems.push(
          `Node "${node.id}" appearance surface "${appearance.surface}" has no registry page`
        );
        continue;
      }

      if (appearance.blockId) {
        const blockExists = page.blocks.some(
          (block) => block.id === appearance.blockId
        );
        if (!blockExists) {
          problems.push(
            `Node "${node.id}" appearance blockId "${appearance.blockId}" missing on page "${appearance.surface}"`
          );
        }
      }
    }
  }

  return problems;
}

/** Registry coverage — bijection between KNOWLEDGE_ROUTES and registered pages. */
export function validateRegistryCoverage(
  pages: readonly KnowledgePageData[]
): string[] {
  const problems: string[] = [];
  const registeredSlugs = new Set<KnowledgePageSlug>();

  for (const page of pages) {
    if (!isKnowledgePageSlug(page.slug)) {
      problems.push(`Registry page slug "${page.slug}" is not in KNOWLEDGE_ROUTES`);
      continue;
    }
    if (registeredSlugs.has(page.slug)) {
      problems.push(`Registry duplicate slug "${page.slug}"`);
    }
    registeredSlugs.add(page.slug);

    if (page.route !== KNOWLEDGE_ROUTES[page.slug]) {
      problems.push(
        `Registry page "${page.slug}" route "${page.route}" must match KNOWLEDGE_ROUTES`
      );
    }
  }

  for (const slug of KNOWLEDGE_PAGE_SLUGS) {
    if (!registeredSlugs.has(slug)) {
      problems.push(`Registry missing page for KNOWLEDGE_ROUTES slug "${slug}"`);
    }
  }

  const graphReachable = reachablePageSlugsFromHome();
  const triggerTargets = new Set(
    HOMEPAGE_KNOWLEDGE_TRIGGERS.map((trigger) => trigger.targetSlug)
  );

  for (const slug of KNOWLEDGE_PAGE_SLUGS) {
    if (!graphReachable.has(slug) && !triggerTargets.has(slug)) {
      problems.push(
        `Unreachable page: "${slug}" is neither graph-reachable from "home" nor wired in HOMEPAGE_KNOWLEDGE_TRIGGERS`
      );
    }
  }

  return problems;
}

/** Graph reachability gaps — pages reachable only via triggers, not directed graph. */
export function validateGraphReachabilityGaps(): string[] {
  const findings: string[] = [];
  const graphReachable = reachablePageSlugsFromHome();
  const triggerTargets = new Set(
    HOMEPAGE_KNOWLEDGE_TRIGGERS.map((trigger) => trigger.targetSlug)
  );

  for (const slug of KNOWLEDGE_PAGE_SLUGS) {
    if (graphReachable.has(slug)) continue;
    if (triggerTargets.has(slug)) {
      findings.push(
        `Graph reachability gap: page "${slug}" reachable via HOMEPAGE_KNOWLEDGE_TRIGGERS but not from "home" in KNOWLEDGE_GRAPH_EDGES`
      );
    }
  }

  return findings;
}

export type KnowledgeEcosystemReport = {
  errors: string[];
  drift: string[];
  orphans: string[];
  sharedOwnership: string[];
  surfaceOnlyNodes: string[];
  reachabilityGaps: string[];
};

/** Full ecosystem validation — split into blocking errors and audit findings. */
export function auditKnowledgeEcosystem(
  pages: readonly KnowledgePageData[]
): KnowledgeEcosystemReport {
  return {
    errors: [
      ...validateRoutesCatalog(),
      ...validateIntelligenceNodeRegistry(),
      ...validateKnowledgeGraph(),
      ...validatePageOwnership(),
      ...validateHomepageTriggers(),
      ...validateNodeAppearances(pages),
      ...validateRegistryCoverage(pages),
    ],
    drift: [
      ...validateGraphNodeAlignment(),
      ...validateNodePrimarySurfaceDrift(),
    ],
    orphans: validateGraphOrphans(pages),
    sharedOwnership: collectSharedOwnership(),
    surfaceOnlyNodes: validateSurfaceOnlyNodes(),
    reachabilityGaps: validateGraphReachabilityGaps(),
  };
}

/** Blocking ecosystem gate — throws on hard integrity errors only. */
export function validateKnowledgeEcosystem(
  pages: readonly KnowledgePageData[]
): string[] {
  return auditKnowledgeEcosystem(pages).errors;
}

/** Dev helper — verify concatenated text matches expected literal substring. */
export function assertLiteralContains(
  content: KnowledgeContent,
  expectedSubstring: string,
  label: string
): string[] {
  const flat = flattenTextContent(content);
  if (!flat.includes(expectedSubstring)) {
    return [
      `${label}: expected substring missing from flattened content`,
    ];
  }
  return [];
}
