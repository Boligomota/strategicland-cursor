/**
 * HeroVignette — radial darkening per HC-01 .vignette.
 *
 * Atmospheric contrast calibration pass (current):
 *  - Edge alpha relaxed 0.62 → 0.48 to avoid tunnel-vision feeling
 *    while preserving cinematic focus toward the title core.
 *  - Clear center expanded 42% → 50% so the establishing display sits
 *    on undisturbed warm-black; the falloff now begins outside the
 *    optical reading band.
 *
 * Prior pass corrections (preserved):
 *  - Canon's inset box-shadow + pure #000 stacking removed
 *    (MASTER_STATE §6.1).
 *  - Single radial gradient over warm-black token rgba(10,9,7,*),
 *    no double darkening.
 *
 * Static; pulses (T3 transitions) are owned by TransitionLayer.
 */

export function HeroVignette() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[-1]"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, transparent 50%, rgba(10,9,7,0.48) 100%)",
      }}
    />
  );
}
