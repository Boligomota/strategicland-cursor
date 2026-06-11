/**
 * jitter() / pick() / asymmetricJitter() — bounded variance per
 * .rules/human-irregularity-system.mdc §2 (variance budget).
 *
 * Each call advances the seeded PRNG. Singleton PRNG is held by
 * IrregularityProvider; standalone use accepts an optional rng injector.
 */

import { mulberry32 } from "./prng";

let _rng: () => number = mulberry32(0);

/**
 * Bind the variance source. Called once by IrregularityProvider on mount
 * with the session-derived seed. After binding, all jitter() calls share
 * the same advancing PRNG so variance stays consistent within a session.
 */
export function bindVarianceSource(rng: () => number): void {
  _rng = rng;
}

/**
 * Symmetric jitter: returns base ± (base * percent) using the bound PRNG.
 * Default percent = 0.08 (matches DUR variance ceiling).
 */
export function jitter(base: number, percent = 0.08): number {
  const delta = base * percent;
  return base + (_rng() * 2 - 1) * delta;
}

/**
 * Pick one element uniformly from a list using the bound PRNG.
 */
export function pick<T>(values: readonly T[]): T {
  return values[Math.floor(_rng() * values.length)];
}

/**
 * Asymmetric jitter: variance bias toward one direction.
 * lowPct subtracted at one end; highPct added at the other.
 */
export function asymmetricJitter(
  base: number,
  lowPct: number,
  highPct: number
): number {
  return base * (1 - lowPct + _rng() * (lowPct + highPct));
}
