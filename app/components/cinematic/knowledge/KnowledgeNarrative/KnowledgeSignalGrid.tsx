"use client";

import { useKnowledge } from "../KnowledgeState/KnowledgeProvider";
import { KnowledgeRichBody } from "./KnowledgeRichBody";

/**
 * KnowledgeSignalGrid — Signal Grid System for Strategic Brain 2026.
 * Reuses canonical .engine-grid / .engine-node (no new CSS paradigms).
 */
export function KnowledgeSignalGrid() {
  const { pageData } = useKnowledge();
  const reservedCount = pageData.blocksLayout?.reservedSlots ?? 0;
  const populatedBlocks = pageData.blocks;

  const reservedSlots = Array.from({ length: reservedCount }, (_, index) => ({
    id: `reserved-${index}`,
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
          data-knowledge-signal-grid
          className="engine-grid m-0 list-none p-0"
          style={{ gridColumn: "1 / -1" }}
        >
          {populatedBlocks.map((block, index) => (
            <li
              key={block.id}
              data-knowledge-block={block.id}
              data-knowledge-block-index={index}
              data-knowledge-grid-cell="populated"
              className="knowledge-block engine-node relative"
            >
              <h3 data-knowledge-block-title>{block.title}</h3>
              <KnowledgeRichBody
                content={block.body}
                asBlockBody
                pageSlug={pageData.slug}
                pageRoute={pageData.route}
              />
            </li>
          ))}

          {reservedSlots.map((slot, index) => (
            <li
              key={slot.id}
              data-knowledge-block={slot.id}
              data-knowledge-block-index={populatedBlocks.length + index}
              data-knowledge-grid-cell="reserved"
              className="knowledge-block engine-node relative"
              aria-hidden
            >
              <div
                data-knowledge-block-title-shell
                style={{ minHeight: "1.5rem", opacity: 0.04 }}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
