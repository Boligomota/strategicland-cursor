"use client";

/**
 * ActivationThreshold — ACT A entry silence (Scene 1, T01).
 *
 * The chapter declares itself again: marker `005` returns. The
 * no-marker deviation was dissolution doctrine (HC-05 · Future
 * Memory) and dies with it per the approved architecture §7 — the
 * reversal is recorded in the session changelog.
 *
 * Mirrors the HC-02 / HC-03 / HC-04 prelude markers — visual
 * continuity across chapter openings. Top-left of the shared
 * editorial axis.
 *
 * Per .rules/narrative-density-system.mdc T01 SILENCE: no reveals on
 * entry, no copy, no hover affordances. The scene IS the silence.
 */
export function ActivationThreshold() {
  return (
    <section
      data-storyscape-scene="threshold"
      data-density-tier="T01"
      aria-hidden
      className="relative w-full"
      style={{
        minHeight: "24vh",
        paddingTop: "15vh",
        paddingInline: "clamp(32px, 6vw, 96px)",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1280px] items-start justify-start">
        <span
          data-storyscape-chapter-marker
          className="text-[11px] uppercase text-[color:var(--text-fog)]"
          style={{ letterSpacing: "0.12em" }}
        >
          005 · Storyscape
        </span>
      </div>
    </section>
  );
}
