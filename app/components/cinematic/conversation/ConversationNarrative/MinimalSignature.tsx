"use client";

/**
 * MinimalSignature — ACT C terminal surface (inside the persistent
 * T01): the minimal canonical footer restored.
 *
 * One-line attribution — the Scene03_Footer the `closing` type
 * always had in the canon (Residue → Hairline → Footer) and that the
 * dissolution doctrine had omitted (architecture §9). Its
 * restoration is part of the §15 doctrine derogation ordered by the
 * Human Director (Layer 0) — pending formal authorization in the
 * closing protocol (§14 precondition b).
 *
 * NOT a marketing footer: no social links, no sitemap, no copyright
 * block, no timestamps. One hairline, one line. The last pixel of
 * STRATEGICLAND remains grain over warm-black (failure mode §15.7).
 *
 * SITEMAP COMPLIANCE PASS: the wordmark is the literal sitemap
 * titular "WE MAKE NOISE / NOT DIGITAL" (§01 HERO) — the prior
 * "STRATEGICLAND" mark has no source in the Mapa de Sitio
 * Estratégico. type.micro caps, fog tone, the same register as every
 * chapter eyebrow. No reveal binds here (T01 silence — the signature
 * is found, not presented).
 *
 * Density linting attaches via data-density-tier="T01".
 */
export function MinimalSignature() {
  return (
    <footer
      data-conversation-scene="signature"
      data-density-tier="T01"
      className="relative w-full"
      style={{
        paddingInline: "clamp(32px, 6vw, 96px)",
        paddingBlock: "6vh",
      }}
    >
      <div className="mx-auto w-full max-w-[1280px] border-t border-[color:var(--line-cool)] pt-[3vh]">
        <span
          data-conversation-signature-line
          className="text-[11px] uppercase text-[color:var(--text-fog)]"
          style={{ letterSpacing: "0.12em" }}
        >
          WE MAKE NOISE / NOT DIGITAL
        </span>
      </div>
    </footer>
  );
}
