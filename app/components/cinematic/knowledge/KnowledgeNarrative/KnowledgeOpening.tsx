"use client";

import { useKnowledge } from "../KnowledgeState/KnowledgeProvider";
import { KnowledgeRichInline } from "./KnowledgeRichBody";

/**
 * KnowledgeOpening — statement + positioning frame.
 * Copy via KnowledgePageData.opening (rich content contract).
 */
export function KnowledgeOpening() {
  const { pageData } = useKnowledge();
  const { opening } = pageData;
  const hasStatement = opening.statement.length > 0;
  const hasPositioning = opening.positioning.length > 0;

  return (
    <section
      data-knowledge-scene="opening"
      data-density-tier="T02"
      className="relative w-full"
      style={{ padding: "12vw 0" }}
    >
      <div className="grid-12 container-pad items-center">
        {hasStatement ? (
          <h2
            data-knowledge-opening-statement
            className="manifesto-quote"
          >
            <span className="knowledge-opening-line block">
              <KnowledgeRichInline
                content={opening.statement}
                pageSlug={pageData.slug}
                pageRoute={pageData.route}
              />
            </span>
          </h2>
        ) : (
          <div
            data-knowledge-opening-shell
            className="manifesto-quote"
            aria-hidden
            style={{ minHeight: "1.1em", opacity: 0.12 }}
          />
        )}

        {hasPositioning ? (
          <div className="manifesto-text">
            <p
              data-knowledge-opening-positioning
              className="knowledge-opening-line manifesto-text"
            >
              <KnowledgeRichInline
                content={opening.positioning}
                pageSlug={pageData.slug}
                pageRoute={pageData.route}
              />
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
