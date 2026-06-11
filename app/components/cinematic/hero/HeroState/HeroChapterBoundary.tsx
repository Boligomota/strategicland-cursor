/**
 * HeroChapterBoundary — terminal "End of Sequence" caption from HC-01.
 * Functions as a chapter handoff marker: the hero scene ends here; the
 * next chapter (Editorial / Case) begins after this boundary.
 *
 * Pure render; no behavior. Sized to give breathing room before transition.
 *
 * Typography pinned to typography-system.mdc §3/§4:
 *  - type.micro 11px + track.caps 0.12em (canon's only sanctioned
 *    all-caps tracking). Previous text-[10px] tracking-[0.2em] was
 *    outside the locked scale.
 */

export function HeroChapterBoundary() {
  return (
    <footer
      aria-label="Fin de la secuencia del hero"
      className="flex h-[20vh] items-center justify-center border-t border-[color:var(--line-cool)] text-[11px] uppercase text-[color:var(--text-fog)]"
      style={{ letterSpacing: "0.12em" }}
    >
      Fin de Secuencia
    </footer>
  );
}
