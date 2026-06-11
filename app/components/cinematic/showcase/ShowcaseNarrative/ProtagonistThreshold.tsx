"use client";

import { EditorialImage } from "@/app/components/media";
import {
  SHOWCASE_EVIDENCE_INTRO,
  SHOWCASE_REFERENCES,
} from "../showcaseContent";

/**
 * ProtagonistThreshold — ACT B Scene 1 (T03): the protagonist
 * evidence reference (Mi Punto S).
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §08
 * SHOWCASE & PROMESA CORPORATIVA. The scene presents:
 *  - the literal Evidencia framing line ("Grid de resultados basado
 *    en la experiencia adquirida en proyectos reales de alto nivel."),
 *  - the first canonical reference: "El reposicionamiento de Sico
 *    con “Mi Punto S”."
 *
 * SITEMAP COMPLIANCE PASS: the prior speculative case copy (tension /
 * decision / footprint / activator tags / depth link into fictional
 * /work cases) was removed — none of it exists in the sitemap. The
 * sitemap provides project references, not narratives; the scene
 * presents exactly that, nothing more.
 *
 * The cinematic plate (2.39:1 anamorphic, reveal "mask") survives as
 * the first subject-image of the page — structure, not copy.
 */
export function ProtagonistThreshold() {
  const reference = SHOWCASE_REFERENCES[0];

  return (
    <section
      data-showcase-scene="protagonist"
      data-showcase-case="protagonist"
      data-density-tier="T03"
      className="relative w-full"
      style={{
        minHeight: "100vh",
        paddingInline: "clamp(32px, 6vw, 96px)",
        paddingBlock: "12vh",
      }}
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="mb-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 md:mb-12">
          <span
            className="text-[11px] uppercase text-[color:var(--text-fog)]"
            style={{ letterSpacing: "0.12em" }}
          >
            Evidencia · {reference.index}
          </span>
        </div>

        <div data-showcase-plate className="w-full">
          <EditorialImage
            ratio={reference.image.ratio}
            reveal="mask"
            direction={reference.image.direction}
            placeholderVariant={reference.image.placeholderVariant}
            alt=""
          />
        </div>

        <div className="mt-[clamp(40px,5vw,72px)] md:max-w-[72%]">
          <div data-showcase-strategic-line className="w-full">
            <p
              style={{
                maxWidth: "26ch",
                fontSize: "clamp(28px, 3.4vw, 38px)",
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--text-cream)",
                textWrap: "balance",
                willChange: "opacity, transform",
              }}
            >
              {reference.title}
            </p>
            <p
              className="mt-6 md:mt-8"
              style={{
                maxWidth: "560px",
                fontSize: "clamp(17px, 1.6vw, 20px)",
                fontWeight: 300,
                lineHeight: 1.5,
                letterSpacing: "-0.005em",
                color: "var(--text-dim)",
                textWrap: "balance",
                willChange: "opacity, transform",
              }}
            >
              {reference.reference}
            </p>
          </div>

          <div
            data-showcase-footprint
            className="mt-[clamp(32px,3.6vw,56px)] w-full"
            style={{ willChange: "opacity, transform" }}
          >
            <p
              style={{
                maxWidth: "48ch",
                fontSize: "clamp(15px, 1.05vw, 17px)",
                fontWeight: 300,
                lineHeight: 1.55,
                letterSpacing: "-0.005em",
                color: "var(--text-dim)",
              }}
            >
              {SHOWCASE_EVIDENCE_INTRO}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
