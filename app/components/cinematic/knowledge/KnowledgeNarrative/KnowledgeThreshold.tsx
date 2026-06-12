"use client";

import { EditorialLink } from "@/app/components/interaction/EditorialLink";
import {
  getKnowledgePageProgression,
  progressionTargetHref,
} from "@/content/knowledge/graph";
import { useKnowledge } from "../KnowledgeState/KnowledgeProvider";

/**
 * KnowledgeThreshold — canonical editorial progression layer (Agent 13).
 *
 * Flow authority: KNOWLEDGE_PAGE_PROGRESSION in content/knowledge/graph.ts.
 * Routes resolved via KNOWLEDGE_ROUTES / progressionTargetHref — no hardcoded URLs.
 */
export function KnowledgeThreshold() {
  const { pageData } = useKnowledge();
  const progression = getKnowledgePageProgression(pageData.slug);

  if (!progression) return null;

  const href = progressionTargetHref(progression.to);
  const suffix = progression.suffix ?? ".";

  return (
    <section
      data-knowledge-scene="threshold"
      data-density-tier="T01"
      className="container-pad relative flex w-full justify-end"
      style={{ paddingBottom: "8vw" }}
    >
      <p
        data-knowledge-threshold-cue
        className="text-mono system-meta methodology-threshold-link"
        style={{ textAlign: "right", maxWidth: "42rem" }}
      >
        {progression.prefix}
        <EditorialLink
          href={href}
          className="methodology-threshold-link"
        >
          {progression.linkLabel}
        </EditorialLink>
        {suffix}
      </p>
    </section>
  );
}
