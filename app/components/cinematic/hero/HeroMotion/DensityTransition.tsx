"use client";

/**
 * DensityTransition — formerly scrubbed `--hero-depth-collapse: 0 → 1`
 * across the entry into the systems track.
 *
 * NEUTRALIZED during the atmospheric motion restraint pass: the CSS
 * variable was never consumed by any element (verified via repo-wide
 * search — only declared at :root in globals.css with value 0). A
 * perpetual scroll-bound tween that writes to a phantom variable is
 * motion leakage by definition.
 *
 * Component kept (provider tree / motion controller slot intact) but
 * the effect is a no-op. Reactivation requires a real consumer of the
 * variable in atmosphere-system.mdc-compliant code first.
 */
export function DensityTransition() {
  return null;
}
