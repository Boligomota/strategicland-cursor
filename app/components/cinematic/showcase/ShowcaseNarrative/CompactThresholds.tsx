"use client";

import { EditorialImage } from "@/app/components/media";
import {
  SHOWCASE_REFERENCES,
  type ShowcaseReference,
} from "../showcaseContent";

/**
 * CompactThresholds — ACT B Scene 3 (T03): the two compact evidence
 * references (Chocolate Fountain · Retail para marcas globales).
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §08
 * SHOWCASE & PROMESA CORPORATIVA — the second and third canonical
 * references:
 *  - "La producción inmersiva de “Chocolate Fountain”."
 *  - "Estrategias de retail para marcas globales."
 *
 * SITEMAP COMPLIANCE PASS: the prior speculative case copy (tension /
 * decision / footprint / activator tags / depth links into fictional
 * /work cases) was removed — none of it exists in the sitemap.
 *
 * Composition survives intact: contained plate + reference line each,
 * in alternated composition — NEVER a symmetric card grid (failure
 * mode §15.2). Plates use the locked ratio set 2:1 / 3:4 (the
 * protagonist consumed 2.39:1).
 */

function CompactThreshold({
  reference,
  reverse,
}: {
  reference: ShowcaseReference;
  reverse: boolean;
}) {
  return (
    <div
      data-showcase-case={reference.key}
      className={
        "flex w-full flex-col gap-[clamp(28px,3.5vw,56px)] py-[8vh] md:items-end " +
        (reverse ? "md:flex-row-reverse" : "md:flex-row")
      }
    >
      <div
        data-showcase-plate
        className={
          reference.image.ratio === "3:4"
            ? "w-full md:w-[38%]"
            : "w-full md:w-[56%]"
        }
      >
        <EditorialImage
          ratio={reference.image.ratio}
          reveal="mask"
          direction={reference.image.direction}
          placeholderVariant={reference.image.placeholderVariant}
          alt=""
        />
      </div>

      <div className="w-full md:flex-1 md:pb-[2vh]">
        <div className="mb-8 flex flex-wrap items-baseline gap-x-6 gap-y-2 md:mb-10">
          <span
            className="text-[11px] uppercase text-[color:var(--text-fog)]"
            style={{ letterSpacing: "0.12em" }}
          >
            Evidencia · {reference.index}
          </span>
        </div>

        <div data-showcase-strategic-line className="w-full">
          <p
            style={{
              maxWidth: "28ch",
              fontSize: "clamp(22px, 2.4vw, 30px)",
              fontWeight: 300,
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              color: "var(--text-cream)",
              textWrap: "balance",
              willChange: "opacity, transform",
            }}
          >
            {reference.title}
          </p>
          <p
            className="mt-5 md:mt-6"
            style={{
              maxWidth: "480px",
              fontSize: "clamp(15px, 1.2vw, 18px)",
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
      </div>
    </div>
  );
}

export function CompactThresholds() {
  const references = SHOWCASE_REFERENCES.slice(1, 3);

  return (
    <section
      data-showcase-scene="compacts"
      data-density-tier="T03"
      className="relative w-full"
      style={{
        minHeight: "120vh",
        paddingInline: "clamp(32px, 6vw, 96px)",
        paddingBlock: "10vh",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-[clamp(48px,8vh,96px)]">
        {references.map((reference, i) => (
          <CompactThreshold
            key={reference.key}
            reference={reference}
            reverse={i === 1}
          />
        ))}
      </div>
    </section>
  );
}
