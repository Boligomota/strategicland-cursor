"use client";

import { HeroImage } from "@/app/components/media";

/**
 * StrategicCompression — HC-03 closing realization (T01).
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §05
 * INPUT CORE — the misalignment consequence sentence ("Si existe un
 * desfase… el resultado es ruido irrelevante."), literal. Forward cue
 * names THE ENGINE (§06), the next canonical chapter.
 *
 * The chapter does not exit — it compresses. A single quiet realization
 * sits centered on the axis, followed by a forward marker that mirrors
 * the chapter-closing micro-cue used by HC-02 (visual continuity across
 * chapter closures, distinct phrasing per chapter).
 *
 * Per the brief: ending should feel quiet, inevitable, clear — not
 * motivational, not inspirational. The statement is the chapter's
 * compression of everything before it: a single sentence the system
 * could have said from the beginning, but only earns the right to say
 * here.
 *
 * Visual layer: a 2.39:1 anamorphic backplate sits low in the section,
 * dissolving upward into darkness — "social isolation inside density"
 * per the brief. Lowest opacity baseline of the chapter (0.12) — the
 * image is residue, not statement. Anchored bottom so the typography
 * still owns the optical centre. Drop a real AVIF at
 * `public/images/signal/compression-isolation.avif` to upgrade.
 *
 * Per .rules/narrative-density-system.mdc T01 SILENCE: ≤ 8 words,
 * type.body / type.lede scale, no reveals beyond gentle opacity drift.
 *
 * Reveal targets:
 *  - `[data-signal-compression-statement]`
 *  - `[data-signal-compression-cue]`
 */
export function StrategicCompression() {
  return (
    <section
      data-signal-scene="compression"
      data-density-tier="T01"
      className="relative flex w-full flex-col items-center justify-center pb-[10vh] md:pb-[12vh]"
      style={{
        minHeight: "36vh",
        paddingInline: "clamp(32px, 6vw, 96px)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          height: "62%",
          opacity: 0.12,
          mixBlendMode: "screen",
          maskImage:
            "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
          zIndex: 0,
        }}
      >
        <HeroImage
          placeholderVariant="documentary"
          alt=""
          grade={false}
          vignette={false}
          className="absolute inset-0 h-full w-full"
        />
      </div>

      <div
        className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center text-center"
        style={{ zIndex: 1 }}
      >
        <p
          data-signal-compression-statement
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
            willChange: "opacity, transform",
          }}
        >
          Si existe un desfase entre lo que la marca dice representar y lo que
          el producto resuelve en la realidad, el resultado es ruido
          irrelevante.
        </p>

        <span
          data-signal-compression-cue
          className="mt-[clamp(40px,4vw,64px)] text-[11px] uppercase text-[color:var(--text-fog)]"
          style={{
            letterSpacing: "0.12em",
            willChange: "opacity",
          }}
        >
          The Engine →
        </span>
      </div>
    </section>
  );
}
