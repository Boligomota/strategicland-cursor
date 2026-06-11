"use client";

/**
 * OperationalPrelude — HC-04 entry silence (Scene 1, T01).
 *
 * Compact operational seam from HC-03's StrategicCompression. The
 * chapter does not declare itself with a manifesto; it begins by
 * grounding. The marker sits at the top-left of the shared editorial
 * axis (mirrors HC-02 / HC-03 prelude markers — visual continuity
 * across chapter openings).
 *
 * Per .rules/narrative-density-system.mdc T01 SILENCE: no reveals on
 * entry, no copy, no hover affordances. The scene IS the silence.
 *
 * Density linting attaches via data-density-tier="T01".
 */
export function OperationalPrelude() {
  return (
    <section
      data-capabilities-scene="prelude"
      data-density-tier="T01"
      aria-hidden
      className="relative w-full pt-[14vh] md:pt-[16vh]"
      style={{
        minHeight: "24vh",
        paddingInline: "clamp(32px, 6vw, 96px)",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1280px] items-start justify-start">
        <span
          data-capabilities-chapter-marker
          className="text-[11px] uppercase text-[color:var(--text-fog)]"
          style={{ letterSpacing: "0.12em" }}
        >
          004 · The Engine
        </span>
      </div>
    </section>
  );
}
