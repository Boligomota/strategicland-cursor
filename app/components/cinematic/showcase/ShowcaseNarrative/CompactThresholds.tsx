"use client";

import { AtmosphericPlaceholder } from "@/app/components/media";
import {
  SHOWCASE_REFERENCES,
  type ShowcaseReference,
} from "../showcaseContent";

/**
 * CompactThresholds — ACT B Scene 3 (T03): the second and third
 * evidence references (Chocolate Fountain · Retail para marcas
 * globales).
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §08 —
 * references literal.
 *
 * PRESENTATION SOURCE: approved HTML reference .dossier-item rows —
 * meta column 1/3 (mono), serif title 3/8 with teal hover lift,
 * grayscale plate 9/13 (hidden below 1024px), hairline separators.
 */

function DossierRow({ reference }: { reference: ShowcaseReference }) {
  return (
    <article className="dossier-item" data-showcase-case={reference.key}>
      <div className="dossier-meta system-meta text-mono">
        <span>Evidencia · {reference.index}</span>
      </div>
      <div className="dossier-title" data-showcase-strategic-line>
        <h2 style={{ fontSize: "inherit" }}>{reference.title}</h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.95rem",
            lineHeight: 1.6,
            marginTop: "0.75rem",
            color: "var(--accent-grey)",
          }}
        >
          {reference.reference}
        </p>
      </div>
      <div className="dossier-image-wrap" data-showcase-plate>
        <AtmosphericPlaceholder variant={reference.image.placeholderVariant} />
      </div>
    </article>
  );
}

export function CompactThresholds() {
  const references = SHOWCASE_REFERENCES.slice(1, 3);

  return (
    <section
      data-showcase-scene="compacts"
      data-density-tier="T03"
      className="relative w-full"
    >
      <div className="grid-12 container-pad">
        <div className="dossier-list">
          {references.map((reference) => (
            <DossierRow key={reference.key} reference={reference} />
          ))}
        </div>
      </div>
    </section>
  );
}
