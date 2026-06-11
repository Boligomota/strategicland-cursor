"use client";

import { EditorialImage } from "@/app/components/media";

/**
 * AfterimageFragment — HC-05 single editorial surface (Scene 2, T02 bajo).
 *
 * The chapter contains a single typographic surface. This is it. Per
 * the HC-05 blueprint §6 + Afterimage Sentence System, one sentence —
 * pattern R-D, observational + residual + documentary + architectural
 * + implicit human — sits centered axially in the warm-black field,
 * accompanied by a single EditorialImage plate at the lowest opacity
 * baseline of the entire organism (≤ 0.10).
 *
 * Working canonical copy (foundational pass):
 *   "Alguien apoyó la mano en esta esquina. El polvo no la cubre."
 *
 * Treated as WORKING copy. The Afterimage Sentence System blueprint
 * defined the perimeter; the Human Director's final reduction may
 * relocate the surviving candidate inside that perimeter without
 * touching this component's structure.
 *
 * Typography per blueprint §10:
 *  - type.lede scale (clamp 17-22px)
 *  - font-weight 300
 *  - line-height 1.5
 *  - max-width 38ch — forces 2-line wrap on desktop, 3-line on mobile
 *  - text-wrap balance
 *  - color text-cream
 *
 * Image plate per blueprint §10 + second recalibration pass:
 *  - EditorialImage 2.39:1 anamorphic (HeroImage allowance exhausted)
 *  - container opacity 0.32 — calibrated upward from the previous
 *    0.10 → 0.24 step after Human Director feedback that the plate
 *    still read as black-screen collapse. Now perceptually present
 *    as residual surface; still below HC-03 declarative thresholds.
 *  - mask: ellipse 85% 75%, solid 40%, transparent 90% — broader
 *    surface area; the chapter relies on this plate as its primary
 *    materiality anchor.
 *  - width: clamp(600px, 58vw, 860px) — enlarged so the plate
 *    inhabits the lower-right quadrant rather than floating as a
 *    small element.
 *  - mix-blend-mode screen
 *  - anchored center-low, off-axis +5% horizontal
 *  - md+ only — mobile reads atmosphere + grain alone
 *
 * Atmospheric layers (recalibration pass · responsive across all
 * breakpoints, including mobile):
 *
 *  1. Environmental halo
 *     Radial warm-cream over warm-black, screen blend, peak ~9%
 *     opacity at center, dissolving through 50% to transparent at
 *     90%. Gives the sentence a sense of air behind it without
 *     reading as a gradient.
 *
 *  2. Material grain surface
 *     SVG fractal-noise texture overlaid at ~7% opacity, overlay
 *     blend, sized 220px tile. Provides physical surface — the
 *     section now reads as "a room with walls" rather than "a
 *     black slab". Mirrors the global grain mechanism but
 *     localized + slightly denser to compensate for HC-05's
 *     sparse compositional density.
 *
 * Together: surface (grain) + air (halo) + residue (plate) =
 * physically inhabited atmospheric space. Sentence found inside
 * a space, not floating on a webpage.
 *
 * Density linting attaches via data-density-tier="T02".
 */
export function AfterimageFragment() {
  return (
    <section
      data-closing-scene="afterimage"
      data-density-tier="T02"
      className="relative w-full py-[12vh] md:py-[14vh]"
      style={{
        minHeight: "60vh",
        paddingInline: "clamp(32px, 6vw, 96px)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(245, 235, 220, 0.09) 0%, rgba(245, 235, 220, 0.03) 50%, transparent 90%)",
          mixBlendMode: "screen",
          zIndex: 0,
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='9'/><feColorMatrix values='0 0 0 0 0.55 0 0 0 0 0.45 0 0 0 0.4 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "220px 220px",
          mixBlendMode: "overlay",
          opacity: 0.07,
          zIndex: 0,
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute hidden md:block"
        style={{
          left: "55%",
          top: "60%",
          transform: "translate(-50%, -50%)",
          width: "clamp(600px, 58vw, 860px)",
          opacity: 0.32,
          mixBlendMode: "screen",
          maskImage:
            "radial-gradient(ellipse 85% 75% at 50% 50%, black 0%, black 40%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 75% at 50% 50%, black 0%, black 40%, transparent 90%)",
          zIndex: 0,
        }}
      >
        <EditorialImage
          ratio="2.39:1"
          reveal="mask"
          direction="left-to-right"
          placeholderVariant="documentary"
          alt=""
          grade={false}
          vignette={false}
        />
      </div>

      <div
        className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center text-center"
        style={{ zIndex: 1 }}
      >
        <p
          data-closing-afterimage-sentence
          style={{
            maxWidth: "38ch",
            marginInline: "auto",
            textAlign: "center",
            textWrap: "balance",
            fontSize: "clamp(17px, 1.6vw, 22px)",
            fontWeight: 300,
            lineHeight: 1.5,
            letterSpacing: "-0.005em",
            color: "var(--text-cream)",
          }}
        >
          Alguien apoyó la mano en esta esquina. El polvo no la cubre.
        </p>
      </div>
    </section>
  );
}
