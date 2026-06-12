/**
 * Knowledge page content model — Platform Expansion.
 *
 * Architectural reference: content/work/types.ts (CaseData).
 * Content authority: Arquitectura_Web_wmnnd.md (copy lands in
 * content/knowledge/<slug>/page.ts — never in components).
 */

import type { PageArchiveMeta, SignalArchiveMeta } from "./archive";
import type { KnowledgeContent } from "./rich-content";

/** Locked knowledge route slugs — expanding requires Human Director auth. */
export type KnowledgePageSlug =
  | "strategic-brain"
  | "interdisciplinary-lab"
  | "engine-deep-dive"
  | "verticales-impacto";

/** Canonical App Router paths for knowledge pages. */
export type KnowledgeRoute =
  | "/strategic-brain"
  | "/interdisciplinary-lab"
  | "/engine-deep-dive"
  | "/verticales-impacto";

export type BlockLayoutMode = "editorial-list" | "signal-grid";

export type BlockLayoutHint = {
  mode: BlockLayoutMode;
  columns?: 2 | 3;
  minSlots?: number;
  reservedSlots?: number;
};

/**
 * One editorial block (signal, lab thesis, engine phase, or vertical).
 */
export type KnowledgeBlock = {
  /** Stable block key within the page (e.g. "era-agentica"). */
  id: string;
  /** Block headline — literal from architecture document when populated. */
  title: string;
  /** Rich body — literal segments from architecture document. */
  body: KnowledgeContent;
  /** Research archive metadata (Strategic Brain signals). */
  archive?: SignalArchiveMeta;
};

export type KnowledgeSeo = {
  title: string;
  description: string;
  ogImage?: string;
};

export type KnowledgeOpening = {
  statement: KnowledgeContent;
  positioning: KnowledgeContent;
};

/**
 * KnowledgePageData — parametric contract for KnowledgeChapter.
 */
export type KnowledgePageData = {
  slug: KnowledgePageSlug;
  route: KnowledgeRoute;
  instanceId: string;
  title: string;
  opening: KnowledgeOpening;
  blocks: KnowledgeBlock[];
  blocksLayout?: BlockLayoutHint;
  archive?: PageArchiveMeta;
  seo: KnowledgeSeo;
};
