"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { KnowledgePageData } from "@/content/knowledge/types";
import { TemporalPause } from "@/app/components/cinematic/hero/HeroNarrative/TemporalPause";
import { KnowledgeCodaRegistration } from "./KnowledgeState/KnowledgeCodaRegistration";
import { knowledgeCodaInstanceId } from "./KnowledgeState/KnowledgeCodaRegistration";

export function KnowledgeCoda({ pageData }: { pageData: KnowledgePageData }) {
  const cueClass =
    "text-[11px] uppercase text-[color:var(--text-fog)] transition-colors duration-[400ms] hover:text-[color:var(--text-cream)]";
  const cueStyle: CSSProperties = { letterSpacing: "0.12em" };

  return (
    <>
      <KnowledgeCodaRegistration pageData={pageData} />

      <section
        data-chapter="closing"
        data-chapter-name={knowledgeCodaInstanceId(pageData)}
        data-density-tier-default="T01"
        className="relative w-full"
      >
        <TemporalPause height="24vh" mdHeight="16vh" label="silence (coda)" />

        <div
          data-knowledge-coda-threshold
          data-density-tier="T01"
          className="relative w-full pb-[14vh] md:pb-[16vh]"
          style={{ paddingInline: "clamp(32px, 6vw, 96px)" }}
        >
          <div className="mx-auto w-full max-w-[1280px]">
            <span
              aria-hidden
              className="mb-10 block h-px w-full md:mb-12"
              style={{ background: "var(--text-cream)", opacity: 0.12 }}
            />

            <Link
              href="/"
              data-hover-target
              className={cueClass}
              style={cueStyle}
            >
              ← Volver al organismo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
