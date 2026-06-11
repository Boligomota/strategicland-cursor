/**
 * STAGGER — locked stagger gap dictionary per .rules/motion-system.mdc §5.
 * Values in seconds (GSAP-native).
 */

export const STAGGER = {
  tight: 0.04,
  editorial: 0.08,
  scene: 0.16,
  chapter: 0.32,
} as const;

export type StaggerToken = keyof typeof STAGGER;
