"use client";

import { AtmosphericPlaceholder } from "@/app/components/media";
import {
  SHOWCASE_EVIDENCE_INTRO,
  SHOWCASE_REFERENCES,
} from "../showcaseContent";

/**
 * ProtagonistThreshold — ACT B Scene 1 (T03): the first evidence
 * reference (Mi Punto S).
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §08
 * SHOWCASE & PROMESA CORPORATIVA — intro line + first reference,
 * literal.
 *
 * PRESENTATION SOURCE: approved HTML reference .dossier-section —
 * the scene opens the dossier list: monospace section header over a
 * hairline (intro line as the editorial framing), then the first
 * dossier item (meta column 1/3 · serif title 3/8 · grayscale plate
 * 9/13 with hover lift).
 */
export function ProtagonistThreshold() {
  const reference = SHOWCASE_REFERENCES[0];

  return (
    <section
      data-showcase-scene="protagonist"
      data-showcase-case="protagonist"
      data-density-tier="T03"
      className="relative w-full"
      style={{ paddingTop: "10vw" }}
    >
      <div className="grid-12 container-pad">
        <div data-showcase-footprint className="section-header text-mono">
          <span style={{ maxWidth: "60ch" }}>{SHOWCASE_EVIDENCE_INTRO}</span>
        </div>

        <div className="dossier-list">
          <article className="dossier-item" data-showcase-plate>
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
            <div className="dossier-image-wrap">
              <AtmosphericPlaceholder
                variant={reference.image.placeholderVariant}
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
