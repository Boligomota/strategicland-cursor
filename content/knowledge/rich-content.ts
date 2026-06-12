/**
 * Rich content contract — serializable, SSR-safe segment model.
 * Authority: Knowledge Structural Review · Arquitectura_Web Fase 04.
 */

import type { IntelligenceNodeId } from "./nodes";
import type { KnowledgeRoute } from "./types";

/** Root content unit for block bodies and opening frames. */
export type KnowledgeContent = readonly KnowledgeSegment[];

export type KnowledgeSegment =
  | TextSegment
  | NodeRefSegment
  | LinkSegment
  | EmphasisSegment;

export type TextSegment = {
  kind: "text";
  value: string;
};

export type NodeRefSegment = {
  kind: "node";
  nodeId: IntelligenceNodeId;
  /** When the block uses an exact alternate spelling from the source document. */
  labelOverride?: string;
};

export type LinkSegment = {
  kind: "link";
  href: KnowledgeRoute | "/" | `/work/${string}`;
  label: string;
  nodeId?: IntelligenceNodeId;
};

export type EmphasisSegment = {
  kind: "emphasis";
  children: KnowledgeContent;
};

export function text(value: string): TextSegment {
  return { kind: "text", value };
}

export function node(
  nodeId: IntelligenceNodeId,
  labelOverride?: string
): NodeRefSegment {
  return labelOverride
    ? { kind: "node", nodeId, labelOverride }
    : { kind: "node", nodeId };
}

export function emphasis(children: KnowledgeContent): EmphasisSegment {
  return { kind: "emphasis", children };
}

/** Concatenate text segments for dev-time literal integrity checks. */
export function flattenTextContent(content: KnowledgeContent): string {
  let out = "";
  for (const segment of content) {
    switch (segment.kind) {
      case "text":
        out += segment.value;
        break;
      case "node":
        out += segment.labelOverride ?? `[node:${segment.nodeId}]`;
        break;
      case "link":
        out += segment.label;
        break;
      case "emphasis":
        out += flattenTextContent(segment.children);
        break;
      default:
        break;
    }
  }
  return out;
}
