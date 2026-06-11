"use client";

import { forwardRef } from "react";

/**
 * EditorialStatement — the Hero's establishing title from HC-01.
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §01 HERO.
 *  - Titular: "WE MAKE NOISE / NOT DIGITAL."
 *  - Sub-título: "Consultoría Interdisciplinaria de Negocios y Marketing."
 *
 * PRESENTATION SOURCE: approved HTML reference hero —
 *  - h1: serif (Cormorant Garamond), clamp(4rem, 10vw, 9rem),
 *    letter-spacing -0.02em, line-height 1.1, grid column 2/12.
 *  - sub: grid column 6/11, 1.2rem, line-height 1.5, light 80%.
 *
 * forwardRef so HeroPinnedSequence can target the title group for
 * parallax + intro choreography without prop drilling refs.
 */

const HERO_TITLE_LINES = ["We Make Noise /", "Not Digital"] as const;

const HERO_SUBTITLE = "Consultoría Interdisciplinaria de Negocios y Marketing";

export const EditorialStatement = forwardRef<HTMLDivElement>(function EditorialStatement(_, ref) {
  return (
    <div ref={ref} data-hero-title-group className="grid-12 relative z-10 w-full">
      <h1 className="hero-title">
        {HERO_TITLE_LINES.map((line, i) => (
          <span key={line} data-hero-title-line={i} className="block">
            {line}
          </span>
        ))}
      </h1>

      <p
        data-hero-title-line={HERO_TITLE_LINES.length}
        data-hero-subtitle
        className="hero-sub"
      >
        {HERO_SUBTITLE}
      </p>
    </div>
  );
});
