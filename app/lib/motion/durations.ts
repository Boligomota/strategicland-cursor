/**
 * DUR — locked duration dictionary per .rules/motion-system.mdc §4.
 * Values in seconds (GSAP-native).
 *
 * Snap to dictionary; never invent intermediate values.
 */

export const DUR = {
  micro: 0.18,
  quick: 0.38,
  standard: 0.72,
  cinematic: 1.2,
  epic: 1.8,
  glacial: 2.6,
} as const;

export type DurToken = keyof typeof DUR;
