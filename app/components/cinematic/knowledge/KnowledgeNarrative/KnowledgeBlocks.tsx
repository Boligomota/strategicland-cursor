"use client";

import type { KnowledgeContent } from "@/content/knowledge/rich-content";
import { useKnowledge } from "../KnowledgeState/KnowledgeProvider";
import { KnowledgeRichBody } from "./KnowledgeRichBody";
import { KnowledgeSignalGrid } from "./KnowledgeSignalGrid";

const BLOCK_SLOT_COUNT = 3;

/**
 * KnowledgeBlocks — modular editorial blocks or signal grid per blocksLayout.
 */
export function KnowledgeBlocks() {
  const { pageData } = useKnowledge();

  if (pageData.blocksLayout?.mode === "signal-grid") {
    return <KnowledgeSignalGrid />;
  }

  const slots =
    pageData.blocks.length > 0
      ? pageData.blocks
      : Array.from({ length: BLOCK_SLOT_COUNT }, (_, index) => ({
          id: `slot-${index}`,
          title: "",
          body: [] as KnowledgeContent,
        }));

  return (
    <section
      data-knowledge-scene="blocks"
      data-density-tier="T03"
      className="relative w-full"
      style={{ padding: "8vw 0" }}
    >
      <div className="grid-12 container-pad">
        <ol
          data-knowledge-block-list
          className="m-0 list-none p-0"
          style={{ gridColumn: "1 / -1" }}
        >
          {slots.map((block, index) => (
            <li
              key={block.id}
              data-knowledge-block={block.id}
              data-knowledge-block-index={index}
              className="knowledge-block relative"
              style={{
                padding: "3rem 0",
                borderTop:
                  "1px solid color-mix(in srgb, var(--text-cream) 12%, transparent)",
              }}
            >
              {block.title ? (
                <h3 data-knowledge-block-title>{block.title}</h3>
              ) : (
                <div
                  data-knowledge-block-title-shell
                  aria-hidden
                  style={{ minHeight: "1.5rem", opacity: 0.08 }}
                />
              )}
              {block.body.length > 0 ? (
                <KnowledgeRichBody
                  content={block.body}
                  asBlockBody
                  pageSlug={pageData.slug}
                  pageRoute={pageData.route}
                />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
