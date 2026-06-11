"use client";

import { forwardRef } from "react";

/**
 * EditorialStatement — the Hero's establishing title from HC-01.
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §01 HERO.
 *  - Titular: "WE MAKE NOISE / NOT DIGITAL."
 *  - Sub-título: "Consultoría Interdisciplinaria de Negocios y Marketing."
 *  - Declaración visual: "Tipografía masiva, cruda y de alta frecuencia"
 *    — carried by the existing type.epic clamp + warm-black contrast.
 *
 * All prior non-canonical content (Humano / Magia / Sistemas) was
 * removed in the sitemap compliance pass. No copy in this component
 * may exist outside the sitemap.
 *
 * Canon constraints preserved:
 *  - Type pinned to canon type.epic clamp(72px, 14vw, 240px) per
 *    typography-system.mdc §3 with lead.tight 0.92 and track.epic -0.04em.
 *    Mobile portrait caps at 56px per responsive-system.mdc §4.
 *  - Accent color is var(--accent-parchment) per HTML_CANON.md §2.5.
 *
 * forwardRef so HeroPinnedSequence can target the title group for
 * parallax + intro choreography without prop drilling refs.
 */

const HERO_TITLE_LINES = [
  {
    word: "We Make Noise /",
    italic: false,
    accent: false,
    lineClass: "",
  },
  {
    word: "Not Digital",
    italic: false,
    accent: true,
    lineClass: "ml-[8vw] md:ml-[6vw]",
  },
] as const;

const HERO_SUBTITLE = "Consultoría Interdisciplinaria de Negocios y Marketing";

export const EditorialStatement = forwardRef<HTMLDivElement>(function EditorialStatement(_, ref) {
  return (
    <div
      ref={ref}
      data-hero-title-group
      className="relative z-10 flex flex-col items-center"
      style={{ transform: "translateY(5vh)" }}
    >
      {HERO_TITLE_LINES.map((line, i) => (
        <h1
          key={line.word}
          data-hero-title-line={i}
          className={`relative my-0 block uppercase ${line.lineClass}`}
          style={{
            fontSize: "clamp(40px, 9vw, 160px)",
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            fontWeight: 300,
            fontStyle: line.italic ? "italic" : "normal",
            color: line.accent
              ? "var(--accent-parchment)"
              : "var(--text-cream)",
            opacity: line.accent ? 0.95 : 1,
            whiteSpace: "nowrap",
          }}
        >
          {line.word}
        </h1>
      ))}

      <p
        data-hero-title-line={HERO_TITLE_LINES.length}
        data-hero-subtitle
        className="text-[color:var(--text-dim)]"
        style={{
          marginTop: "clamp(24px, 3vw, 48px)",
          textAlign: "center",
          textWrap: "balance",
          fontSize: "clamp(15px, 1.4vw, 20px)",
          fontWeight: 300,
          lineHeight: 1.5,
          letterSpacing: "0.04em",
        }}
      >
        {HERO_SUBTITLE}
      </p>
    </div>
  );
});
