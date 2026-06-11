"use client";

/**
 * OperationalThreshold — HC-04 closing silence (Scene 5, T01).
 *
 * Forward cue in the monospace metadata register of the HTML
 * reference, right-aligned. Typographic only (no href) until the
 * route is authorized.
 */
export function OperationalThreshold() {
  return (
    <section
      data-capabilities-scene="threshold"
      data-density-tier="T01"
      aria-hidden
      className="container-pad relative flex w-full justify-end"
      style={{ paddingBottom: "8vw" }}
    >
      <span
        data-capabilities-threshold-cue
        className="text-mono system-meta"
        style={{ textAlign: "right" }}
      >
        The Strategic Brain 2026 →
      </span>
    </section>
  );
}
