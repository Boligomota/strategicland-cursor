"use client";

/**
 * OperationalPrelude — HC-04 entry silence (Scene 1, T01).
 *
 * Chapter index marker in the monospace metadata register of the
 * HTML reference (.system-meta / .text-mono).
 */
export function OperationalPrelude() {
  return (
    <section
      data-capabilities-scene="prelude"
      data-density-tier="T01"
      aria-hidden
      className="container-pad relative w-full"
      style={{ paddingTop: "8vw" }}
    >
      <span
        data-capabilities-chapter-marker
        className="text-mono system-meta"
      >
        004 · The Engine
      </span>
    </section>
  );
}
