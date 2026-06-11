"use client";

/**
 * ActivationThreshold — ACT A entry silence (Scene 1, T01).
 *
 * Chapter index marker in the monospace metadata register of the
 * HTML reference (.system-meta / .text-mono).
 */
export function ActivationThreshold() {
  return (
    <section
      data-storyscape-scene="threshold"
      data-density-tier="T01"
      aria-hidden
      className="container-pad relative w-full"
      style={{ paddingTop: "8vw" }}
    >
      <span
        data-storyscape-chapter-marker
        className="text-mono system-meta"
      >
        005 · Storyscape
      </span>
    </section>
  );
}
