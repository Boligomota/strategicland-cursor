"use client";

/**
 * ClosingThreshold — HC-02 narrative seam to the next chapter
 * (Scene 5, T01).
 *
 * Forward cue in the monospace metadata register of the HTML
 * reference, right-aligned. Not a CTA, not a button.
 */
export function ClosingThreshold() {
  return (
    <section
      data-methodology-scene="threshold"
      data-density-tier="T01"
      className="container-pad relative flex w-full justify-end"
      style={{ paddingBottom: "8vw" }}
    >
      <span
        data-methodology-threshold-cue
        className="text-mono system-meta"
        style={{ textAlign: "right" }}
      >
        Interdisciplinary Lab: Human x Machine →
      </span>
    </section>
  );
}
