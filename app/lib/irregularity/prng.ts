/**
 * Mulberry32 PRNG — deterministic, fast, 32-bit seeded random.
 * Used as the single variance source for human-irregularity-system.mdc.
 *
 * Direct Math.random() in motion / atmosphere / interaction is forbidden.
 * Always go through this PRNG so variance is seeded, replayable, bounded.
 */

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Default session seed. Stable per page load on the client; server renders
 * with seed=0 to avoid hydration mismatch (variance is applied client-side
 * after mount via providers).
 */
export function getSessionSeed(): number {
  if (typeof window === "undefined") return 0;
  const w = window as Window & { __SL_SEED?: number };
  if (w.__SL_SEED !== undefined) return w.__SL_SEED;
  const seed = (Date.now() ^ Math.floor(performance.now() * 1000)) >>> 0;
  w.__SL_SEED = seed;
  return seed;
}
