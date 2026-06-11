"use client";

import { useCallback, type ReactNode } from "react";
import { useConversation } from "./ConversationState/ConversationProvider";

/**
 * ConversationScene — semantic root of HC-05 · ACT C (closing ·
 * conversation).
 *
 * Owns the chapter root <section> element + callback-ref
 * registration into ConversationProvider so motion controllers
 * re-run their effects after the DOM commits. Density tier metadata
 * declared via data attributes for the density linter.
 *
 * Pure structural — no motion, no atmosphere.
 */
export function ConversationScene({ children }: { children: ReactNode }) {
  const { registerRoot } = useConversation();

  const setRef = useCallback(
    (el: HTMLElement | null) => {
      registerRoot(el);
    },
    [registerRoot]
  );

  return (
    <section
      ref={setRef}
      data-chapter="closing"
      data-chapter-name="conversation"
      data-density-tier-default="T01"
      className="section-dark relative w-full"
    >
      {children}
    </section>
  );
}
