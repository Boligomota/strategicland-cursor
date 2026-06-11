"use client";

/**
 * SignalPrelude — HC-03 entry silence (Scene 1, T01).
 *
 * Compact observational seam from HC-02's ClosingThreshold. The chapter
 * does not declare itself; it begins by listening. The marker sits at
 * the top-left of the shared editorial axis (mirrors the methodology
 * chapter marker — visual continuity across chapter openings).
 *
 * Per .rules/narrative-density-system.mdc T01 SILENCE: no reveals on
 * entry, no copy, no hover affordances. The scene IS the silence.
 *
 * Density linting attaches via data-density-tier="T01".
 */
export function SignalPrelude() {
  return (
    <section
      data-signal-scene="prelude"
      data-density-tier="T01"
      aria-hidden
      className="relative w-full pt-[12vh] md:pt-[14vh]"
      style={{
        minHeight: "24vh",
        paddingInline: "clamp(32px, 6vw, 96px)",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1280px] items-start justify-start">
        <span
          data-signal-chapter-marker
          className="text-[11px] uppercase text-[color:var(--text-fog)]"
          style={{ letterSpacing: "0.12em" }}
        >
          003 · Input Core
        </span>
      </div>
    </section>
  );
}
