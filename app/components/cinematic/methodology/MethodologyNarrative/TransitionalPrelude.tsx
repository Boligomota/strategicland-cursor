"use client";

/**
 * TransitionalPrelude — HC-02 entry silence (Scene 1, T01).
 *
 * Compact seam from the Hero's closing boundary. The scene is a brief
 * silence — long enough for the eye to register the chapter marker,
 * short enough to keep narrative momentum. Hero-scale silence remains
 * exclusive to the Hero (per HC-02 density calibration).
 *
 * Per .rules/narrative-density-system.mdc T01 SILENCE: no reveals on
 * entry, no copy, no hover affordances. The scene IS the silence.
 *
 * A single hairline cue (chapter index marker) lives at the top edge in
 * monospace micro-type. It is the only mark the eye finds — and it
 * fades in passively with the section, not as a reveal beat.
 *
 * Density linting attaches via data-density-tier="T01".
 */
export function TransitionalPrelude() {
  return (
    <section
      data-methodology-scene="prelude"
      data-density-tier="T01"
      aria-hidden
      className="relative w-full pt-[12vh] md:pt-[14vh]"
      style={{
        minHeight: "28vh",
        paddingInline: "clamp(32px, 6vw, 96px)",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1280px] items-start justify-start">
        <span
          data-methodology-chapter-marker
          className="text-[11px] uppercase text-[color:var(--text-fog)]"
          style={{ letterSpacing: "0.12em" }}
        >
          002 · El Manifiesto
        </span>
      </div>
    </section>
  );
}
