"use client";

import { useKnowledge } from "../KnowledgeState/KnowledgeProvider";

export function KnowledgePrelude() {
  const { pageData } = useKnowledge();

  return (
    <section
      data-knowledge-scene="prelude"
      data-density-tier="T01"
      aria-hidden
      className="container-pad relative w-full"
      style={{ paddingTop: "8vw" }}
    >
      <span data-knowledge-chapter-marker className="text-mono system-meta">
        {pageData.title}
      </span>
    </section>
  );
}
