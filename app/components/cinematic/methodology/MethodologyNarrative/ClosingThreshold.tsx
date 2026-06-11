"use client";

/**
 * ClosingThreshold — HC-02 narrative seam to the next chapter
 * (Scene 5, T01).
 *
 * Per the brief: "section should open the next chapter, not terminate
 * energy". A held silence with a single hairline cue suggesting
 * forward motion — not a CTA, not a button.
 *
 * Compact closure (HC-02 density calibration): the chapter doesn't
 * trail off into a Hero-scale silence. It marks the threshold and
 * relinquishes the page to whatever follows.
 *
 * The cue uses the same monospace micro-type as the chapter marker so
 * the chapter visually closes the way it opened (mirror symmetry,
 * canon-aligned).
 *
 * Per narrative-density-system.mdc T01 SILENCE: no reveals on entry,
 * no hover affordances, ≤ 8 words on screen, type.body or type.caption
 * scale only.
 */
export function ClosingThreshold() {
  return (
    <section
      data-methodology-scene="threshold"
      data-density-tier="T01"
      className="relative flex w-full flex-col pb-[10vh] md:pb-[12vh]"
      style={{
        minHeight: "26vh",
        paddingInline: "clamp(32px, 6vw, 96px)",
      }}
    >
      <div className="mx-auto mt-auto flex w-full max-w-[1280px] justify-end">
        <span
          data-methodology-threshold-cue
          className="text-[11px] uppercase text-[color:var(--text-fog)]"
          style={{ letterSpacing: "0.12em" }}
        >
          Interdisciplinary Lab: Human x Machine →
        </span>
      </div>
    </section>
  );
}
