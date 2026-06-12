"use client";

import { useCallback, type ReactNode } from "react";
import { useKnowledge } from "./KnowledgeState/KnowledgeProvider";

export function KnowledgeScene({ children }: { children: ReactNode }) {
  const { pageData, registerRoot } = useKnowledge();

  const setRef = useCallback(
    (el: HTMLElement | null) => {
      registerRoot(el);
    },
    [registerRoot]
  );

  return (
    <section
      ref={setRef}
      data-chapter="editorial"
      data-chapter-name={pageData.instanceId}
      data-knowledge-slug={pageData.slug}
      data-density-tier-default="T03"
      className="relative w-full"
    >
      {children}
    </section>
  );
}
