/**
 * EASE — locked easing dictionary per .rules/motion-system.mdc §3.
 * All cubic-bezier values centralized; never inline beziers in JSX.
 *
 * GSAP-named equivalents under EASE.gsap for `gsap.to({ ease })` calls.
 * CSS values under EASE.<token> for transitions.
 */

export const EASE = {
  cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
  editorial: "cubic-bezier(0.65, 0, 0.35, 1)",
  drift: "cubic-bezier(0.22, 1, 0.36, 1)",
  settle: "cubic-bezier(0.4, 0, 0.2, 1)",
  breath: "cubic-bezier(0.45, 0.05, 0.55, 0.95)",

  gsap: {
    cinematic: "expo.out",
    editorial: "power2.inOut",
    drift: "power3.out",
    settle: "power1.out",
    breath: "sine.inOut",
  },
} as const;

export type EaseToken = keyof Omit<typeof EASE, "gsap">;
