/**
 * Density tier helpers — per .rules/narrative-density-system.mdc §3 + §5.
 *
 * The director publishes the *current density intensity* derived from the
 * active chapter's registered tier. Atmospheric layers, WebGL uniforms,
 * and motion duration multipliers read this value to modulate intensity
 * without coupling to chapter internals.
 *
 * Canon-locked mappings. Do not extend tiers or invent new bands.
 */

import type { DensityTier } from "./types";

/**
 * uIntensity scalar consumed by WebGL atmosphere uniforms + CSS density
 * modulators. Values per canon (narrative-density-system.mdc §6.4).
 */
export const DENSITY_INTENSITY: Record<DensityTier, number> = {
  T01_SILENCE: 0.2,
  T02_CONTEMPLATIVE: 0.4,
  T03_EDITORIAL: 0.6,
  T04_IMMERSIVE: 0.8,
  T05_KINETIC: 1.0,
};

/**
 * Reveal timeline duration multiplier per canon §6.5.
 * Slower at low density, faster at high.
 */
export const DENSITY_DURATION_MULT: Record<DensityTier, number> = {
  T01_SILENCE: 1.4,
  T02_CONTEMPLATIVE: 1.2,
  T03_EDITORIAL: 1.0,
  T04_IMMERSIVE: 0.85,
  T05_KINETIC: 0.7,
};

/**
 * Linguistic energy label for editor / debug overlays. Not used in motion
 * math — strictly informational.
 */
export const DENSITY_ENERGY_LABEL: Record<DensityTier, string> = {
  T01_SILENCE: "suspended",
  T02_CONTEMPLATIVE: "contemplative",
  T03_EDITORIAL: "tension",
  T04_IMMERSIVE: "immersive",
  T05_KINETIC: "climactic",
};

export function densityIntensity(tier: DensityTier): number {
  return DENSITY_INTENSITY[tier];
}

export function densityDurationMultiplier(tier: DensityTier): number {
  return DENSITY_DURATION_MULT[tier];
}

/**
 * Distance between two density tiers, useful for picking transition profile
 * (compressed when |Δ| ≤ 1, expansive when |Δ| ≥ 3).
 */
export function densityDelta(from: DensityTier, to: DensityTier): number {
  return Math.abs(DENSITY_INTENSITY[to] - DENSITY_INTENSITY[from]);
}
