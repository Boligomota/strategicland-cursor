/**
 * HeroChapterBoundary — terminal "End of Sequence" caption from HC-01.
 * Functions as a chapter handoff marker: the hero scene ends here; the
 * next chapter (Editorial / Case) begins after this boundary.
 *
 * PRESENTATION SOURCE: approved HTML reference hero-meta-bottom strip —
 * monospace micro metadata pinned to the hero's bottom edge.
 *
 * Pure render; no behavior.
 */

export function HeroChapterBoundary() {
  return (
    <footer
      aria-label="Fin de la secuencia del hero"
      className="system-meta text-mono absolute"
      style={{
        bottom: "2rem",
        left: "var(--section-pad)",
        right: "var(--section-pad)",
      }}
    >
      <span>Fin de Secuencia</span>
    </footer>
  );
}
