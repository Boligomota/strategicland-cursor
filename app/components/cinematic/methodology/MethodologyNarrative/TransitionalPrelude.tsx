"use client";

/**
 * TransitionalPrelude — HC-02 entry silence (Scene 1, T01).
 *
 * Compact seam from the Hero's closing boundary. A single chapter
 * index marker in the monospace metadata register of the HTML
 * reference (.system-meta / .text-mono).
 *
 * Density linting attaches via data-density-tier="T01".
 */
export function TransitionalPrelude() {
  return (
    <section
      data-methodology-scene="prelude"
      data-density-tier="T01"
      aria-hidden
      className="container-pad relative w-full"
      style={{ paddingTop: "8vw" }}
    >
      <span
        data-methodology-chapter-marker
        className="text-mono system-meta"
      >
        002 · El Manifiesto
      </span>
    </section>
  );
}
