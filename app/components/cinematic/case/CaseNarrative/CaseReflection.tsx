"use client";

import { EditorialImage } from "@/app/components/media";
import type { CaseData } from "@/content/work/types";

/**
 * CaseReflection — Case chapter cooldown (Scene 5, caption · T02).
 *
 * The mandatory closing tier per canon: `case` chapters MUST end on
 * T02 (cooldown), never on compression. A single contemplative
 * statement sits centered on the axis — the StrategicCompression
 * (HC-03) grammar — followed by the case caption in micro type.
 *
 * Density per CaseSceneRegistration: T02 CONTEMPLATIVE (reflection),
 * the "caption hold" window. Per the T02 reveal budget the scene
 * carries ONE reveal cluster, and CaseReveal assigns it to the
 * caption cue ([data-case-caption-cue], opacity drift only). The
 * statement renders statically — quiet, inevitable, already there
 * when the eye arrives.
 *
 * Optional residue plate: when the case declares `reflection.image`
 * an EditorialImage sits low in the section at the residue opacity
 * baseline (0.12), dissolving upward into the warm-black field —
 * reveal="none" so the T02 reveal budget stays intact.
 *
 * ALL copy comes from CaseData.
 */
export function CaseReflection({ caseData }: { caseData: CaseData }) {
  const { reflection } = caseData;

  return (
    <section
      data-case-scene="caption"
      data-density-tier="T02"
      className="relative flex w-full flex-col items-center justify-center pb-[12vh] pt-[6vh] md:pb-[14vh]"
      style={{
        minHeight: "56vh",
        paddingInline: "clamp(32px, 6vw, 96px)",
      }}
    >
      {reflection.image ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{
            height: "58%",
            opacity: 0.12,
            mixBlendMode: "screen",
            maskImage:
              "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
            zIndex: 0,
          }}
        >
          <EditorialImage
            ratio={reflection.image.ratio}
            reveal="none"
            placeholderVariant={
              reflection.image.placeholderVariant ?? "documentary"
            }
            alt=""
            grade={false}
            vignette={false}
            className="absolute inset-0 h-full w-full"
          />
        </div>
      ) : null}

      <div
        className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center text-center"
        style={{ zIndex: 1 }}
      >
        <p
          style={{
            maxWidth: "780px",
            marginInline: "auto",
            textAlign: "center",
            textWrap: "balance",
            fontSize: "clamp(20px, 2vw, 26px)",
            fontWeight: 300,
            lineHeight: 1.3,
            letterSpacing: "-0.015em",
            color: "var(--text-cream)",
          }}
        >
          {reflection.statement}
        </p>

        {reflection.caption ? (
          <span
            data-case-caption-cue
            className="mt-[clamp(40px,4vw,64px)] text-[11px] uppercase text-[color:var(--text-fog)]"
            style={{ letterSpacing: "0.12em", willChange: "opacity" }}
          >
            {reflection.caption}
          </span>
        ) : null}
      </div>
    </section>
  );
}
