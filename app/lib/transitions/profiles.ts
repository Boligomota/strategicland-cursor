/**
 * Transition profiles — concrete timing for T3_TRANSITION veils per
 * .rules/transition-system.mdc + locked motion dictionary.
 *
 * Profiles are picked by the OUTGOING chapter's registration. The director
 * looks up the profile here when entering T3_TRANSITION and uses the
 * timings to drive TransitionLayer.
 *
 * The veil itself is invisible at rest. No spectacle, no motion
 * choreography — only opacity and atmospheric color shifts.
 */

import { DUR } from "@/app/lib/motion";
import type { TransitionProfile } from "./types";

export type TransitionTiming = {
  /** Veil fade-in duration (seconds). */
  fadeIn: number;
  /** Held veil duration (seconds). Zero for breathless cuts. */
  hold: number;
  /** Veil fade-out duration (seconds). */
  fadeOut: number;
  /** Veil peak opacity. Never 1.0 — always a hint of atmospheric persistence. */
  peakOpacity: number;
};

export const TRANSITION_TIMINGS: Record<TransitionProfile, TransitionTiming> = {
  default: {
    fadeIn: DUR.cinematic,
    hold: DUR.standard,
    fadeOut: DUR.cinematic,
    peakOpacity: 0.92,
  },
  silent: {
    fadeIn: DUR.epic,
    hold: DUR.glacial,
    fadeOut: DUR.epic,
    peakOpacity: 0.96,
  },
  compressed: {
    fadeIn: DUR.standard,
    hold: 0,
    fadeOut: DUR.standard,
    peakOpacity: 0.85,
  },
  expansive: {
    fadeIn: DUR.epic,
    hold: DUR.cinematic,
    fadeOut: DUR.epic,
    peakOpacity: 0.9,
  },
};

export function profileTiming(profile: TransitionProfile): TransitionTiming {
  return TRANSITION_TIMINGS[profile];
}
