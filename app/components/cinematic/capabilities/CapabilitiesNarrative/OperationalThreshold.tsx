"use client";

/**
 * OperationalThreshold — HC-04 closing silence (Scene 5, T01).
 *
 * The chapter does not exit with a manifesto — it forwards. A single
 * forward cue sits at the bottom-right of the shared editorial axis,
 * mirroring the diagonal closure pattern of HC-02 (ClosingThreshold).
 * Phrasing is operational rather than philosophical, distinguishing
 * HC-04's outro from prior chapters while preserving structural
 * continuity (cue typography + position identical across chapters).
 *
 * Cue points to THE STRATEGIC BRAIN 2026 per Mapa de Sitio
 * Estratégico §06 strategic linking. The internal route does not
 * exist yet — the cue stays typographic (no href) until the page is
 * authorized as a separate film expansion.
 *
 * Per .rules/narrative-density-system.mdc T01 SILENCE: ≤ 8 words on
 * the cue, no body copy, no reveals beyond gentle opacity drift.
 *
 * Reveal target:
 *  - `[data-capabilities-threshold-cue]`
 *
 * Density linting attaches via data-density-tier="T01".
 */
export function OperationalThreshold() {
  return (
    <section
      data-capabilities-scene="threshold"
      data-density-tier="T01"
      aria-hidden
      className="relative flex w-full flex-col pb-[10vh] md:pb-[12vh]"
      style={{
        minHeight: "26vh",
        paddingInline: "clamp(32px, 6vw, 96px)",
      }}
    >
      <div className="mx-auto mt-auto flex w-full max-w-[1280px] items-end justify-end">
        <span
          data-capabilities-threshold-cue
          className="text-[11px] uppercase text-[color:var(--text-fog)]"
          style={{ letterSpacing: "0.12em" }}
        >
          The Strategic Brain 2026 →
        </span>
      </div>
    </section>
  );
}
