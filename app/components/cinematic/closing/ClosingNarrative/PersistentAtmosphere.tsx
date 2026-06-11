"use client";

/**
 * PersistentAtmosphere — HC-05 sustained T01 + atmospheric tail
 * (Scene 3, T01).
 *
 * The substance of the chapter. Per the HC-05 blueprint §6, this
 * scene contains NO typographic surface (optional metadata token
 * deferred — pending Human Director decision). The scene delegates
 * its content to the document's global atmospheric stack (grain,
 * vignette, light field) which continues operating without
 * interruption.
 *
 * Per blueprint §14 ("persistent ambient state"): after the last
 * visible typographic surface in the chapter (AfterimageFragment),
 * the document holds for the duration of this section's minHeight
 * (80vh / 60vh) before reaching the document bottom. This is what
 * "persistent" means implementationally — the atmosphere continues
 * without object.
 *
 * Forbidden by blueprint §15:
 *  - footer
 *  - copyright
 *  - social links
 *  - timestamps
 *  - any forward cue
 *  - any "X continúa →" pattern
 *  - any CTA
 *
 * Any future addition of any of the above must be vetoed by the
 * Cinematic Architect. The persistent ambient state IS the close.
 *
 * Density linting attaches via data-density-tier="T01".
 */
export function PersistentAtmosphere() {
  return (
    <section
      data-closing-scene="persistent"
      data-density-tier="T01"
      aria-hidden
      className="relative w-full"
      style={{
        minHeight: "80vh",
        paddingInline: "clamp(32px, 6vw, 96px)",
      }}
    />
  );
}
