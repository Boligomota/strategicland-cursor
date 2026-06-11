"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type {
  ChapterInstanceId,
  ChapterRegistration,
  DensityTier,
  EmotionalState,
  IntroPhase,
  TransitionState,
} from "@/app/lib/transitions/types";
import { chapterInstanceKey } from "@/app/lib/transitions/types";
import {
  densityDurationMultiplier,
  densityIntensity,
} from "@/app/lib/transitions/density";
import { profileTiming, type TransitionTiming } from "@/app/lib/transitions/profiles";

/**
 * TransitionDirectorProvider — single source of truth for chapter
 * orchestration. See docs/SYSTEM_ARCHITECTURE.md §6.
 *
 * Authority:
 *  - Owns the global TransitionState machine (T0–T5).
 *  - Owns the chapter registry (Map<ChapterInstanceId, ChapterRegistration>).
 *    Keyed by INSTANCE, not by ChapterId — multiple instances of the same
 *    chapter type coexist (1 ChapterType = N instances). Single-instance
 *    chapters register under their ChapterId via the instanceId default.
 *  - Publishes derived signals: current chapter, density, intensity,
 *    duration multiplier, intake completeness, transition liveness.
 *  - Exposes the imperative API: registerChapter, completeIntake,
 *    requestRelease, requestHandoff, advanceIntroPhase. All chapter-
 *    parameterized APIs take a ChapterInstanceId.
 *
 * Non-authority:
 *  - Does NOT animate. TransitionLayer + atmospheric layers consume the
 *    state and run their own choreography.
 *  - Does NOT route. App Router transitions are orthogonal; the director
 *    only knows about narrative chapter lifecycle.
 *
 * Persistence:
 *  - sessionStorage flag (sl_intake_complete) gates one-shot intake.
 *    On reload within a session, the first registered chapter jumps
 *    straight to T4_IMMERSION (skipping T1_PRE_ENTRY).
 */

const SESSION_INTAKE_FLAG = "sl_intake_complete";

function readIntakeFlag(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_INTAKE_FLAG) === "1";
}

function writeIntakeFlag() {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_INTAKE_FLAG, "1");
}

type DensityOverride = {
  chapter: ChapterInstanceId;
  tier: DensityTier;
  emotion: EmotionalState;
};

type TransitionContextValue = {
  /** Current machine state. */
  state: TransitionState;

  /**
   * Density tier currently active. Resolution order:
   *   1. NarrativeTimeline scene override (setActiveDensity), if present
   *      and matches the chapter in focus.
   *   2. Chapter registration default (registerChapter.density).
   *   3. null when no chapter is in focus.
   */
  currentDensity: DensityTier | null;
  /** Emotional state from the active scene override, if any. null otherwise. */
  currentEmotion: EmotionalState | null;
  /** Density intensity scalar 0.2–1.0 of the active density. */
  currentIntensity: number;
  /** Reveal duration multiplier from the active density tier. 1.0 when idle. */
  currentDurationMultiplier: number;

  /** True when a T3_TRANSITION veil is playing. */
  isTransitioning: boolean;
  /** True once site intake is complete (i.e. state has left T1_PRE_ENTRY). */
  isIntakeComplete: boolean;
  /** True when state.kind === "T4_IMMERSION" for the given chapter instance. */
  isImmersed: (chapter: ChapterInstanceId) => boolean;
  /** Registration metadata for chapter instance (or null if not registered). */
  registrationFor: (chapter: ChapterInstanceId) => ChapterRegistration | null;
  /** Timing config for the active outgoing chapter's profile (T3 only). */
  activeTransitionTiming: TransitionTiming | null;

  /** Chapter contract — register on mount, returns unregister fn. */
  registerChapter: (reg: ChapterRegistration) => () => void;
  /** Finalize site intake; advances T1_PRE_ENTRY → T4_IMMERSION. */
  completeIntake: () => void;
  /** Advance T1_PRE_ENTRY phase. No-op if not in T1. */
  advanceIntroPhase: (phase: IntroPhase) => void;
  /** Move T4_IMMERSION(chapter) → T5_RELEASE(chapter) → eventually T0_IDLE. */
  requestRelease: (chapter: ChapterInstanceId) => void;
  /** Initiate cross-chapter handoff (T2 → T3 → T4 of `to`). */
  requestHandoff: (from: ChapterInstanceId, to: ChapterInstanceId) => void;
  /** Update T3_TRANSITION progress scalar (TransitionLayer driver). */
  setTransitionProgress: (progress: number) => void;
  /**
   * Push the timeline's active scene density + emotion to the director.
   * Called by NarrativeTimelineProvider whenever the active scene changes.
   * No-op if no chapter is in focus.
   */
  setActiveDensity: (
    chapter: ChapterInstanceId,
    tier: DensityTier,
    emotion: EmotionalState
  ) => void;
  /** Clear the scene override; the chapter falls back to its registered default. */
  clearActiveDensity: (chapter: ChapterInstanceId) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function TransitionDirectorProvider({ children }: { children: ReactNode }) {
  // intakeComplete tracks the one-shot site intake independently from the
  // chapter lifecycle state. Initial value MUST match server (false) to
  // avoid SSR/CSR hydration mismatch — sessionStorage is read post-mount
  // in the effect below.
  const [intakeComplete, setIntakeComplete] = useState<boolean>(false);
  const [state, setState] = useState<TransitionState>({ kind: "T0_IDLE" });

  // Hydrate intake flag from sessionStorage after first client commit. If
  // the flag is set, also pull the lifecycle straight to T4 for whichever
  // chapter is already in focus (chapters that registered during the
  // initial render with the false flag started in T1_PRE_ENTRY).
  useEffect(() => {
    if (!readIntakeFlag()) return;
    setIntakeComplete(true);
    setState((prev) => {
      if (prev.kind === "T1_PRE_ENTRY") {
        return { kind: "T4_IMMERSION", chapter: prev.chapter };
      }
      return prev;
    });
  }, []);
  const [densityOverride, setDensityOverride] = useState<DensityOverride | null>(
    null
  );
  const registryRef = useRef<Map<ChapterInstanceId, ChapterRegistration>>(
    new Map()
  );
  // Re-render trigger when registry mutates so derived selectors recompute.
  const [registryVersion, setRegistryVersion] = useState(0);
  const releaseTimerRef = useRef<number | null>(null);

  const bumpRegistry = useCallback(() => {
    setRegistryVersion((v) => v + 1);
  }, []);

  const registerChapter = useCallback(
    (reg: ChapterRegistration) => {
      const key = chapterInstanceKey(reg);
      registryRef.current.set(key, reg);
      bumpRegistry();

      // First chapter to register at boot determines the lifecycle entry.
      // If intake has already completed (this session or restored from
      // storage), jump straight to T4_IMMERSION. Otherwise begin T1.
      setState((prev) => {
        if (prev.kind !== "T0_IDLE") return prev;
        return intakeComplete
          ? { kind: "T4_IMMERSION", chapter: key }
          : { kind: "T1_PRE_ENTRY", chapter: key, phase: "veil" };
      });

      return () => {
        registryRef.current.delete(key);
        bumpRegistry();
        // If the unregistered instance was the one in focus, fall back to idle.
        setState((prev) => {
          if (
            "chapter" in prev &&
            (prev as { chapter: ChapterInstanceId }).chapter === key
          ) {
            return { kind: "T0_IDLE" };
          }
          return prev;
        });
      };
    },
    [bumpRegistry, intakeComplete]
  );

  const completeIntake = useCallback(() => {
    writeIntakeFlag();
    setIntakeComplete(true);
    setState((prev) => {
      if (prev.kind === "T1_PRE_ENTRY") {
        return { kind: "T4_IMMERSION", chapter: prev.chapter };
      }
      // No-op if not currently in pre-entry. Idempotent.
      return prev;
    });
  }, []);

  const advanceIntroPhase = useCallback((phase: IntroPhase) => {
    setState((prev) => {
      if (prev.kind !== "T1_PRE_ENTRY") return prev;
      if (prev.phase === phase) return prev;
      return { ...prev, phase };
    });
  }, []);

  const requestRelease = useCallback((chapter: ChapterInstanceId) => {
    setState((prev) => {
      if (prev.kind !== "T4_IMMERSION" || prev.chapter !== chapter) return prev;
      return { kind: "T5_RELEASE", chapter };
    });

    if (releaseTimerRef.current !== null) {
      window.clearTimeout(releaseTimerRef.current);
    }
    // After release window, decompress to idle. Window matches the chapter's
    // exitBehavior timing — conservative default keeps Hero scroll-release
    // feel intact.
    releaseTimerRef.current = window.setTimeout(() => {
      setState((prev) => {
        if (prev.kind === "T5_RELEASE" && prev.chapter === chapter) {
          return { kind: "T0_IDLE" };
        }
        return prev;
      });
      releaseTimerRef.current = null;
    }, 1200);
  }, []);

  const requestHandoff = useCallback(
    (from: ChapterInstanceId, to: ChapterInstanceId) => {
      const outgoing = registryRef.current.get(from);
      const incoming = registryRef.current.get(to);
      if (!outgoing || !incoming) return;
      // T2_HANDOFF is a brief acknowledgement state. The actual veil plays
      // in T3_TRANSITION, driven by TransitionLayer reading
      // activeTransitionTiming below.
      setState({ kind: "T2_HANDOFF", from, to });
      // Schedule advance into T3 on the next microtask so consumers can
      // react to T2 first (e.g. exit choreography).
      Promise.resolve().then(() => {
        setState({ kind: "T3_TRANSITION", from, to, progress: 0 });
      });
    },
    []
  );

  const setActiveDensity = useCallback(
    (chapter: ChapterInstanceId, tier: DensityTier, emotion: EmotionalState) => {
      setDensityOverride((prev) => {
        if (
          prev &&
          prev.chapter === chapter &&
          prev.tier === tier &&
          prev.emotion === emotion
        ) {
          return prev;
        }
        return { chapter, tier, emotion };
      });
    },
    []
  );

  const clearActiveDensity = useCallback((chapter: ChapterInstanceId) => {
    setDensityOverride((prev) => (prev && prev.chapter === chapter ? null : prev));
  }, []);

  const setTransitionProgress = useCallback((progress: number) => {
    setState((prev) => {
      if (prev.kind !== "T3_TRANSITION") return prev;
      const clamped = Math.min(1, Math.max(0, progress));
      if (clamped === prev.progress) return prev;
      // When progress reaches 1, advance into T4_IMMERSION(to). Atmospheric
      // layers will pick up density change from registry of incoming.
      if (clamped >= 1) {
        return { kind: "T4_IMMERSION", chapter: prev.to };
      }
      return { ...prev, progress: clamped };
    });
  }, []);

  useEffect(() => {
    return () => {
      if (releaseTimerRef.current !== null) {
        window.clearTimeout(releaseTimerRef.current);
      }
    };
  }, []);

  const derived = useMemo(() => {
    // Identify chapter instance in focus from state.
    let focusId: ChapterInstanceId | null = null;
    if (
      state.kind === "T1_PRE_ENTRY" ||
      state.kind === "T4_IMMERSION" ||
      state.kind === "T5_RELEASE"
    ) {
      focusId = state.chapter;
    } else if (state.kind === "T3_TRANSITION") {
      // During transition, the incoming chapter's density already takes hold.
      focusId = state.to;
    } else if (state.kind === "T2_HANDOFF") {
      focusId = state.from;
    }

    const focusReg = focusId ? registryRef.current.get(focusId) ?? null : null;

    // Density resolution: scene-level override (if it matches the focused
    // chapter) wins over chapter-registered default.
    const overrideMatches =
      densityOverride !== null && densityOverride.chapter === focusId;
    const currentDensity: DensityTier | null = overrideMatches
      ? densityOverride!.tier
      : focusReg?.density ?? null;
    const currentEmotion: EmotionalState | null = overrideMatches
      ? densityOverride!.emotion
      : null;
    const currentIntensity = currentDensity ? densityIntensity(currentDensity) : 0;
    const currentDurationMultiplier = currentDensity
      ? densityDurationMultiplier(currentDensity)
      : 1;

    let activeTransitionTiming: TransitionTiming | null = null;
    if (state.kind === "T3_TRANSITION") {
      const outgoing = registryRef.current.get(state.from);
      if (outgoing) activeTransitionTiming = profileTiming(outgoing.transitionProfile);
    }

    return {
      currentDensity,
      currentEmotion,
      currentIntensity,
      currentDurationMultiplier,
      activeTransitionTiming,
    };
    // registryVersion is intentional to recompute when registry mutates.
  }, [state, registryVersion, densityOverride]);

  const isImmersed = useCallback(
    (chapter: ChapterInstanceId): boolean => {
      return state.kind === "T4_IMMERSION" && state.chapter === chapter;
    },
    [state]
  );

  const registrationFor = useCallback(
    (chapter: ChapterInstanceId): ChapterRegistration | null => {
      return registryRef.current.get(chapter) ?? null;
      // registryVersion captured by closure via the outer useMemo isn't needed
      // here — consumers re-render on state change which is the only time
      // they query this in practice.
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [registryVersion]
  );

  const value = useMemo<TransitionContextValue>(
    () => ({
      state,
      currentDensity: derived.currentDensity,
      currentEmotion: derived.currentEmotion,
      currentIntensity: derived.currentIntensity,
      currentDurationMultiplier: derived.currentDurationMultiplier,
      isTransitioning: state.kind === "T3_TRANSITION",
      isIntakeComplete: intakeComplete,
      isImmersed,
      registrationFor,
      activeTransitionTiming: derived.activeTransitionTiming,
      registerChapter,
      completeIntake,
      advanceIntroPhase,
      requestRelease,
      requestHandoff,
      setTransitionProgress,
      setActiveDensity,
      clearActiveDensity,
    }),
    [
      state,
      intakeComplete,
      derived,
      isImmersed,
      registrationFor,
      registerChapter,
      completeIntake,
      advanceIntroPhase,
      requestRelease,
      requestHandoff,
      setTransitionProgress,
      setActiveDensity,
      clearActiveDensity,
    ]
  );

  return (
    <TransitionContext.Provider value={value}>{children}</TransitionContext.Provider>
  );
}

export function useTransitionDirector(): TransitionContextValue {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error(
      "useTransitionDirector() must be used inside <TransitionDirectorProvider>"
    );
  }
  return ctx;
}
