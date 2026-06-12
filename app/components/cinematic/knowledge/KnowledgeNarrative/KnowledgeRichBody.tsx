"use client";

import type { ReactNode } from "react";
import type {
  KnowledgeContent,
  KnowledgeSegment,
} from "@/content/knowledge/rich-content";
import type { IntelligenceNodeId } from "@/content/knowledge/nodes";
import {
  INTELLIGENCE_NODES,
  resolveNodeHref,
} from "@/content/knowledge/nodes";
import type { KnowledgePageSlug, KnowledgeRoute } from "@/content/knowledge/types";
import { EditorialLink } from "@/app/components/interaction/EditorialLink";

type KnowledgeRichBodyProps = {
  content: KnowledgeContent;
  className?: string;
  asBlockBody?: boolean;
  /** Current page — resolves surface-specific node linkability. */
  pageSlug?: KnowledgePageSlug;
  pageRoute?: KnowledgeRoute;
};

function isNodeLinkable(
  nodeId: IntelligenceNodeId,
  pageSlug?: KnowledgePageSlug
): boolean {
  const entry = INTELLIGENCE_NODES[nodeId];
  if (pageSlug) {
    const onSurface = entry.appearances.find(
      (appearance) => appearance.surface === pageSlug
    );
    if (onSurface) {
      return onSurface.linkable && !onSurface.anchorOnly;
    }
  }
  return entry.appearances.some((a) => a.linkable && !a.anchorOnly);
}

function renderSegment(
  segment: KnowledgeSegment,
  key: number,
  pageSlug?: KnowledgePageSlug,
  pageRoute?: KnowledgeRoute
): ReactNode {
  switch (segment.kind) {
    case "text":
      return <span key={key}>{segment.value}</span>;

    case "node": {
      const node = INTELLIGENCE_NODES[segment.nodeId];
      const label = segment.labelOverride ?? node.label;
      const href = resolveNodeHref(segment.nodeId);
      const shouldLink =
        href != null &&
        href !== pageRoute &&
        isNodeLinkable(segment.nodeId, pageSlug);

      if (shouldLink && href) {
        return (
          <EditorialLink key={key} href={href} className="editorial-link">
            {label}
          </EditorialLink>
        );
      }
      return <strong key={key}>{label}</strong>;
    }

    case "link":
      return (
        <EditorialLink key={key} href={segment.href} className="editorial-link">
          {segment.label}
        </EditorialLink>
      );

    case "emphasis":
      return (
        <strong key={key}>
          {segment.children.map((child, index) =>
            renderSegment(child, index, pageSlug, pageRoute)
          )}
        </strong>
      );

    default:
      return null;
  }
}

/**
 * KnowledgeRichBody — renders KnowledgeContent segments with node resolution.
 * Preserves manifesto-text typography; no new styling.
 */
export function KnowledgeRichBody({
  content,
  className,
  asBlockBody = false,
  pageSlug,
  pageRoute,
}: KnowledgeRichBodyProps) {
  if (content.length === 0) {
    return null;
  }

  return (
    <p
      className={className ?? "manifesto-text"}
      {...(asBlockBody ? { "data-knowledge-block-body": true } : {})}
    >
      {content.map((segment, index) =>
        renderSegment(segment, index, pageSlug, pageRoute)
      )}
    </p>
  );
}

/** Opening statement lines may use manifesto-quote register. */
export function KnowledgeRichInline({
  content,
  className,
  pageSlug,
  pageRoute,
}: {
  content: KnowledgeContent;
  className?: string;
  pageSlug?: KnowledgePageSlug;
  pageRoute?: KnowledgeRoute;
}) {
  if (content.length === 0) {
    return null;
  }

  return (
    <span className={className}>
      {content.map((segment, index) =>
        renderSegment(segment, index, pageSlug, pageRoute)
      )}
    </span>
  );
}
