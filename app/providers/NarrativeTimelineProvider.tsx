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
  DensityTier,
  EmotionalState,
} from "@/app/lib/transitions/types";
import type {
  SceneRegistration,
  TimelineOutput,
} from "@/app/lib/timeline/types";
import { sceneInstanceKey } from "@/app/lib/timeline/types";
import { useTransitionDirector } from "./TransitionDirectorProvider";

/**
 * NarrativeTimelineProvider — scene-level orchestration.
 *
 * Authority:
 *  - Owns the scene registry (Map<sceneId, SceneRegistration>).
 *  - Owns per-instance progress (chapter instance → 0..1).
 *  - Derives current scene per chapter instance from scene window +
 *    progress. Scenes group by instance key (scene.instanceId ??
 *    scene.chapter) — N instances of the same chapter type keep
 *    independent timelines and progress channels.
 *  - Pushes the resulting (density, emotion) to TransitionDirector via
 *    setActiveDensity/clearActiveDensity. This is the ONLY upstream side
 *    effect; downstream consumers read everything from the director.
 *
 * Layering (top = finest):
 *   route → chapter (Director) → scene (Timeline) → moment (motion ctrls)
 *
 * Chapters publish their full scene timeline once on mount. Timeline does
 * NOT own chapter lifecycle (T0–T5) — that stays with the director. The
 * timeline only adds finer temporal granularity inside T4_IMMERSION.
 */

type SceneId = string;

type TimelineContextValue = {
  /** Register a scene with the timeline. Returns unregister fn. */
  registerScene: (reg: SceneRegistration) => () => void;
  /** Push instance progress 0..1. Called by chapter progress controllers. */
  updateChapterProgress: (
    chapter: ChapterInstanceId,
    progress: number
  ) => void;
  /** All scenes registered for a chapter instance, sorted by start ascending. */
  scenesFor: (chapter: ChapterInstanceId) => SceneRegistration[];
  /** Internal selector — used by useTimeline() hook. */
  selectTimeline: (chapter: ChapterInstanceId) => TimelineOutput;
};

const TimelineContext = createContext<TimelineContextValue | null>(null);

function findCurrentScene(
  scenes: SceneRegistration[],
  progress: number
): SceneRegistration | null {
  if (scenes.length === 0) return null;
  // Scenes are pre-sorted by start.
  for (let i = 0; i < scenes.length; i++) {
    const s = scenes[i];
    const tail = (s.hold ?? 0) + s.end;
    if (progress >= s.start && progress <= tail) return s;
  }
  // If progress is past the last scene's tail, return the last scene
  // (chapter is in its release phase). If before the first, return null.
  const last = scenes[scenes.length - 1];
  if (progress > last.end + (last.hold ?? 0)) return last;
  return null;
}

function findNextScene(
  scenes: SceneRegistration[],
  current: SceneRegistration | null
): SceneRegistration | null {
  if (!current) return scenes[0] ?? null;
  const idx = scenes.findIndex((s) => s.id === current.id);
  if (idx === -1 || idx >= scenes.length - 1) return null;
  return scenes[idx + 1];
}

function sceneLocalProgress(
  scene: SceneRegistration | null,
  chapterProgress: number
): number {
  if (!scene) return 0;
  const span = Math.max(0.0001, scene.end - scene.start);
  return Math.min(1, Math.max(0, (chapterProgress - scene.start) / span));
}

export function NarrativeTimelineProvider({ children }: { children: ReactNode }) {
  const director = useTransitionDirector();
  const directorRef = useRef(director);
  directorRef.current = director;

  // Scene registry: source of truth. Re-creates Map on mutation so memos
  // recompute reliably (React-strict friendly).
  const [scenes, setScenes] = useState<Map<SceneId, SceneRegistration>>(
    () => new Map()
  );
  // Per-instance progress. Same re-creation pattern.
  const [chapterProgress, setChapterProgress] = useState<
    Map<ChapterInstanceId, number>
  >(() => new Map());

  const registerScene = useCallback((reg: SceneRegistration) => {
    setScenes((prev) => {
      const next = new Map(prev);
      next.set(reg.id, reg);
      return next;
    });
    return () => {
      setScenes((prev) => {
        if (!prev.has(reg.id)) return prev;
        const next = new Map(prev);
        next.delete(reg.id);
        return next;
      });
    };
  }, []);

  const updateChapterProgress = useCallback(
    (chapter: ChapterInstanceId, progress: number) => {
      const clamped = Math.min(1, Math.max(0, progress));
      setChapterProgress((prev) => {
        const current = prev.get(chapter);
        // 1% granularity is enough to drive scene transitions without
        // flooding React with sub-pixel scroll updates.
        if (current !== undefined && Math.abs(current - clamped) < 0.005) {
          return prev;
        }
        const next = new Map(prev);
        next.set(chapter, clamped);
        return next;
      });
    },
    []
  );

  // Index scenes by instance key, sorted by start, recomputed only when
  // registry changes. Keeps useTimeline reads O(scene count per instance).
  const scenesByChapter = useMemo(() => {
    const byChapter = new Map<ChapterInstanceId, SceneRegistration[]>();
    for (const scene of scenes.values()) {
      const key = sceneInstanceKey(scene);
      const arr = byChapter.get(key) ?? [];
      arr.push(scene);
      byChapter.set(key, arr);
    }
    for (const arr of byChapter.values()) {
      arr.sort((a, b) => a.start - b.start);
    }
    return byChapter;
  }, [scenes]);

  const scenesFor = useCallback(
    (chapter: ChapterInstanceId): SceneRegistration[] => {
      return scenesByChapter.get(chapter) ?? [];
    },
    [scenesByChapter]
  );

  const selectTimeline = useCallback(
    (chapter: ChapterInstanceId): TimelineOutput => {
      const chapterScenes = scenesByChapter.get(chapter) ?? [];
      const progress = chapterProgress.get(chapter) ?? 0;
      const currentScene = findCurrentScene(chapterScenes, progress);
      const nextScene = findNextScene(chapterScenes, currentScene);
      return {
        currentScene,
        currentDensity: currentScene?.density ?? null,
        currentEmotion: currentScene?.emotionalState ?? null,
        progress: sceneLocalProgress(currentScene, progress),
        nextScene,
      };
    },
    [scenesByChapter, chapterProgress]
  );

  // Active chapter instance from the director state machine. The timeline
  // only pushes overrides for the instance currently in focus; other
  // instances remain at their registration defaults.
  const activeChapter: ChapterInstanceId | null = useMemo(() => {
    const s = director.state;
    if (
      s.kind === "T1_PRE_ENTRY" ||
      s.kind === "T4_IMMERSION" ||
      s.kind === "T5_RELEASE"
    ) {
      return s.chapter;
    }
    if (s.kind === "T3_TRANSITION") return s.to;
    if (s.kind === "T2_HANDOFF") return s.from;
    return null;
  }, [director.state]);

  // Derive scene/density/emotion for the active chapter and push to director.
  const activeFrame = useMemo(() => {
    if (!activeChapter) return null;
    const chapterScenes = scenesByChapter.get(activeChapter) ?? [];
    if (chapterScenes.length === 0) return null;
    const progress = chapterProgress.get(activeChapter) ?? 0;
    const scene = findCurrentScene(chapterScenes, progress);
    if (!scene) return null;
    return { chapter: activeChapter, density: scene.density, emotion: scene.emotionalState };
  }, [activeChapter, scenesByChapter, chapterProgress]);

  const lastPushedRef = useRef<{
    chapter: ChapterInstanceId;
    tier: DensityTier;
    emotion: EmotionalState;
  } | null>(null);

  useEffect(() => {
    const d = directorRef.current;
    if (!activeFrame) {
      if (lastPushedRef.current) {
        d.clearActiveDensity(lastPushedRef.current.chapter);
        lastPushedRef.current = null;
      }
      return;
    }
    const { chapter, density, emotion } = activeFrame;
    const last = lastPushedRef.current;
    if (
      last &&
      last.chapter === chapter &&
      last.tier === density &&
      last.emotion === emotion
    ) {
      return;
    }
    d.setActiveDensity(chapter, density, emotion);
    lastPushedRef.current = { chapter, tier: density, emotion };
  }, [activeFrame]);

  // Drop progress + last push when an instance unregisters. Detect via diff
  // between current registrations and the instances we have progress for.
  useEffect(() => {
    const knownChapters = new Set<ChapterInstanceId>();
    for (const scene of scenes.values()) {
      knownChapters.add(sceneInstanceKey(scene));
    }
    setChapterProgress((prev) => {
      let changed = false;
      const next = new Map(prev);
      for (const key of prev.keys()) {
        if (!knownChapters.has(key)) {
          next.delete(key);
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [scenes]);

  const value = useMemo<TimelineContextValue>(
    () => ({
      registerScene,
      updateChapterProgress,
      selectTimeline,
      scenesFor,
    }),
    [registerScene, updateChapterProgress, selectTimeline, scenesFor]
  );

  return (
    <TimelineContext.Provider value={value}>{children}</TimelineContext.Provider>
  );
}

export function useNarrativeTimeline(): TimelineContextValue {
  const ctx = useContext(TimelineContext);
  if (!ctx) {
    throw new Error(
      "useNarrativeTimeline() must be used inside <NarrativeTimelineProvider>"
    );
  }
  return ctx;
}

/**
 * useTimeline(chapter) — stable hook for consumers reading the current
 * timeline frame for a specific chapter instance.
 *
 * Returns a memoized TimelineOutput. The object identity changes only
 * when one of the published fields actually changes, so downstream
 * effects using fields as deps will not over-fire.
 */
export function useTimeline(chapter: ChapterInstanceId): TimelineOutput {
  const { selectTimeline } = useNarrativeTimeline();
  const out = selectTimeline(chapter);
  return useMemo(
    () => out,
    [
      out.currentScene?.id,
      out.currentDensity,
      out.currentEmotion,
      out.progress,
      out.nextScene?.id,
    ]
  );
}
