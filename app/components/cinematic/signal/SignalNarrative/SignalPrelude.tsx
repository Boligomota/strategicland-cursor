"use client";

/**
 * SignalPrelude — HC-03 entry silence (Scene 1, T01).
 *
 * Chapter index marker in the monospace metadata register of the
 * HTML reference (.system-meta / .text-mono). Mirrors the HC-02
 * prelude for continuity across chapter openings.
 */
export function SignalPrelude() {
  return (
    <section
      data-signal-scene="prelude"
      data-density-tier="T01"
      aria-hidden
      className="container-pad relative w-full"
      style={{ paddingTop: "8vw" }}
    >
      <span data-signal-chapter-marker className="text-mono system-meta">
        003 · Input Core
      </span>
    </section>
  );
}
