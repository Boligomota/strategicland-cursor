"use client";

import { HeroImage } from "@/app/components/media";

/**
 * MethodStatement — HC-02 method manifest (Scene 2, T02).
 *
 * Single centered cinematic statement block. The chapter's only display-
 * scale moment lives here — per narrative-density-system.mdc §7.3,
 * `type.display` may appear at most once per chapter. Statement is that
 * one moment.
 *
 * Composition mirrors NarrativeFragments (Hero) — centered axial
 * manifest, balanced multiline, no offset stagger. Wraps where the
 * measure decides; no manual breaks. Sentence-level <span>s are kept
 * so MethodologyReveal can target `.methodology-statement-line` for
 * the reveal cascade.
 *
 * Visual layer: a `<HeroImage>` backplate sits behind the statement —
 * architectural blurred surface that integrates into the warm-black
 * field. Per the brief, imagery must "appear partially / emerge from
 * darkness / integrate into atmosphere / coexist with typography".
 * The plate uses an edge-dissolving radial mask + blend-screen so the
 * statement remains the optical centre. Drop a real AVIF at
 * `public/images/methodology/statement-architecture.avif` and pass it
 * via `src` to upgrade the placeholder.
 *
 * Typography per typography-system.mdc:
 *  - Eyebrow: type.micro 11px, track.caps 0.12em.
 *  - Statement: type.display clamp(40px, 6vw, 72px), lead.tight 0.96,
 *    track.display -0.03em.
 *  - Subline: type.lede clamp(18px, 1.8vw, 22px), lead.body 1.5.
 */

const STATEMENT_LINES = [
  "wmn/nd no es una agencia de publicidad;",
  "es una Oficina Multidisciplinar Estratégica.",
] as const;

export function MethodStatement() {
  return (
    <section
      data-methodology-scene="statement"
      data-density-tier="T02"
      className="relative flex w-full items-center justify-center py-[10vh] md:py-[12vh]"
      style={{
        minHeight: "78vh",
        paddingInline: "clamp(32px, 6vw, 96px)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.22,
          mixBlendMode: "screen",
          maskImage:
            "radial-gradient(ellipse 70% 80% at 50% 50%, black 0%, black 35%, transparent 92%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 80% at 50% 50%, black 0%, black 35%, transparent 92%)",
          zIndex: 0,
        }}
      >
        <HeroImage
          placeholderVariant="architectural"
          alt=""
          className="absolute inset-0 h-full w-full"
        />
      </div>

      <div
        className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center text-center"
        style={{ zIndex: 1 }}
      >
        <span
          data-methodology-eyebrow
          className="mb-8 text-[11px] uppercase text-[color:var(--text-fog)] md:mb-10"
          style={{ letterSpacing: "0.12em" }}
        >
          El Manifiesto · La Destrucción del Humo
        </span>

        <h2
          data-methodology-statement
          style={{
            marginInline: "auto",
            textAlign: "center",
            textWrap: "balance",
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 300,
            lineHeight: 0.96,
            letterSpacing: "-0.03em",
            color: "var(--text-cream)",
          }}
        >
          {STATEMENT_LINES.map((line, i) => (
            <span
              key={i}
              className="methodology-statement-line block"
              style={{ willChange: "opacity, transform" }}
            >
              {line}
            </span>
          ))}
        </h2>

        <p
          data-methodology-statement-subline
          className="methodology-statement-line mt-9 md:mt-10"
          style={{
            maxWidth: "640px",
            marginInline: "auto",
            textAlign: "center",
            textWrap: "balance",
            fontSize: "clamp(17px, 1.6vw, 20px)",
            fontWeight: 300,
            lineHeight: 1.5,
            letterSpacing: "-0.005em",
            color: "var(--text-dim)",
            willChange: "opacity, transform",
          }}
        >
          Nuestra metodología desmantela la complejidad del ecosistema digital
          para devolverle al marketing su única función legítima: la generación
          de capital de mercado tangible.
        </p>
      </div>
    </section>
  );
}

