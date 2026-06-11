"use client";

import { EditorialImage } from "@/app/components/media";
import type { CaseData } from "@/content/work/types";

/**
 * HorizontalSequence — Case chapter pinned climax (Scene 3, pinned · T05).
 *
 * Track + rail + slides — the DOM grammar of HeroHorizontalTrack with
 * `data-case-*` selectors, driven by CaseHorizontalTransport (pin +
 * scrub + per-slide edge-drift reveals via containerAnimation). The
 * Hero's component is NOT touched (HC-01 locked); this is the sibling
 * instance of the same canonical mechanic.
 *
 * Structure (mobile-first per responsive-system.mdc §1):
 *  - <md: vertical stacked rail; each slide is a full editorial block.
 *    No pin, no horizontal scroll (touch hostility forbidden, §6).
 *  - md+: horizontal rail pinned by CaseHorizontalTransport
 *    (gsap.matchMedia gated). cursor:grab affordance is conditional
 *    on the rail's `data-horizontal-active` flag.
 *
 * Page-level pin budget: this is the route's ONLY pinned section (1/2).
 *
 * Slide imagery: EditorialImage with reveal="none" — entry motion is
 * owned EXCLUSIVELY by CaseHorizontalTransport (edge-drift on
 * [data-case-slide-image] / [data-case-slide-image-inner]). A second
 * autonomous ScrollTrigger inside a pinned horizontal container would
 * fire against vertical geometry and double-animate the plate.
 * Atmosphere overlays (grain · vignette · grade) still apply.
 *
 * Per-slide verbal budget: title + ≤ 280-char body (enforced by the
 * content registry, not here).
 *
 * Transport targets declared here:
 *  - [data-case-horizontal-track]       section root (pin target md+)
 *  - [data-case-horizontal-rail]        moving rail
 *  - [data-case-slide]                  individual slide
 *  - [data-case-slide-image]            edge-drift outer
 *  - [data-case-slide-image-inner]      inverse-parallax inner
 *  - [data-case-slide-title]            title lift
 *
 * Image upgrade path: drop AVIFs at
 * `public/images/work/<slug>/<slide.image.descriptor>.avif` and pass
 * them via `src` (placeholder mechanic per canon).
 */
export function HorizontalSequence({ caseData }: { caseData: CaseData }) {
  const { sequence } = caseData;
  const first = sequence[0]?.index ?? "01";
  const last = sequence[sequence.length - 1]?.index ?? "01";

  return (
    <section
      data-case-horizontal-track
      data-case-scene="pinned"
      data-density-tier="T05"
      className="relative py-[14vh] md:flex md:h-screen md:flex-col md:justify-center md:overflow-hidden md:py-0 md:pt-[8vh]"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(22,19,16,0.55) 0%, transparent 65%)",
      }}
    >
      <header className="mb-[8vh] flex flex-col items-start gap-6 px-7 md:mb-[4vh] md:flex-row md:items-end md:justify-between md:gap-0 md:px-[4vw]">
        <h2
          className="m-0 font-normal text-[color:var(--text-cream)]"
          style={{
            fontSize: "clamp(24px, 2.4vw, 32px)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
          }}
        >
          Secuencia
        </h2>
        <span
          className="text-[11px] uppercase text-[color:var(--text-dim)]"
          style={{
            letterSpacing: "0.12em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {first} — {last}
        </span>
      </header>

      <div
        data-case-horizontal-rail
        className="relative flex w-full flex-col gap-16 px-7 md:h-[62vh] md:flex-row md:gap-[3vw] md:px-[4vw]"
      >
        {sequence.map((slide) => (
          <article
            key={slide.index}
            data-case-slide
            className="relative flex w-full flex-col md:h-full md:w-auto md:flex-shrink-0 md:basis-[44vw]"
          >
            <header
              className="mb-5 flex justify-between text-[11px] uppercase text-[color:var(--text-dim)] md:mb-6"
              style={{ letterSpacing: "0.12em" }}
            >
              <span>{slide.index}</span>
              <span>{slide.eyebrow}</span>
            </header>

            <div data-case-slide-image className="relative w-full">
              <div data-case-slide-image-inner className="relative w-full">
                <EditorialImage
                  ratio={slide.image.ratio}
                  reveal="none"
                  placeholderVariant={
                    slide.image.placeholderVariant ?? "documentary"
                  }
                  caption={slide.image.caption}
                  alt={slide.title}
                />
              </div>
            </div>

            <h3
              data-case-slide-title
              className="mt-6 md:mt-8"
              style={{
                fontSize: "clamp(24px, 2.4vw, 32px)",
                fontWeight: 300,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: "var(--text-cream)",
                textWrap: "balance",
                willChange: "opacity, transform",
              }}
            >
              {slide.title}
            </h3>

            <p
              className="mt-4 text-[13px] text-[color:var(--text-dim)]"
              style={{ lineHeight: 1.4, maxWidth: "52ch" }}
            >
              {slide.body}
            </p>
          </article>
        ))}
      </div>

      <style>{`
        section[data-case-horizontal-track] [data-case-horizontal-rail][data-horizontal-active="true"] {
          cursor: grab;
        }
      `}</style>
    </section>
  );
}
