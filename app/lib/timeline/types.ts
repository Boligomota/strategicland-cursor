/**
 * Narrative timeline types — per docs/SYSTEM_ARCHITECTURE.md §6.5
 * (extension: scene-level density orchestration).
 *
 * NarrativeTimeline introduces the SCENE granularity above the chapter
 * granularity owned by TransitionDirector. A chapter has many scenes;
 * each scene declares its density tier + emotional state + temporal
 * window inside chapter progress.
 *
 * Layering (top = finest):
 *
 *   route   (App Router)
 *    └─ chapter        ← TransitionDirector
 *        └─ scene      ← NarrativeTimeline
 *            └─ moment ← motion controllers
 *
 * Scenes are owned by chapters: each chapter publishes its full scene
 * timeline on mount. Timeline derives the active scene per chapter from
 * the progress value pushed by the chapter's progress controller, then
 * publishes the resulting density/emotion downstream via the director's
 * override channel.
 */

import type {
  ChapterId,
  ChapterInstanceId,
  DensityTier,
  EmotionalState,
} from "@/app/lib/transitions/types";

/**
 * Chapter-scoped scene contract. Each scene declares:
 *
 *   id              — unique within chapter (canonical "<chapter>:<slug>")
 *   chapter         — owning chapter TYPE (locked ChapterId vocabulary)
 *   instanceId      — owning chapter INSTANCE; defaults to `chapter` for
 *                     single-instance chapters. Must match the instance
 *                     key the owning chapter registered with the director
 *                     (registration.instanceId ?? registration.id), since
 *                     scene grouping + progress channels are keyed by it.
 *   density         — DensityTier for this scene
 *   emotionalState  — orchestration label downstream consumers read
 *   start, end      — normalized window inside chapter progress 0..1
 *   hold            — optional plateau (in 0..1 chapter units) AFTER end
 *                     during which density/emotion are sustained without
 *                     advancing to the next scene (held silence / release)
 */
export type SceneRegistration = {
  id: string;
  chapter: ChapterId;
  instanceId?: ChapterInstanceId;
  density: DensityTier;
  emotionalState: EmotionalState;
  start: number;
  end: number;
  hold?: number;
};

/**
 * Resolves the instance key a scene belongs to. Mirrors
 * chapterInstanceKey() on the director side.
 */
export function sceneInstanceKey(scene: {
  chapter: ChapterId;
  instanceId?: ChapterInstanceId;
}): ChapterInstanceId {
  return scene.instanceId ?? scene.chapter;
}

/**
 * Selector output for a single chapter's current timeline frame.
 */
export type TimelineOutput = {
  /** The scene whose window contains the current chapter progress. */
  currentScene: SceneRegistration | null;
  /** Density of the current scene (or null if no scene matches). */
  currentDensity: DensityTier | null;
  /** Emotional state of the current scene. */
  currentEmotion: EmotionalState | null;
  /** Local 0..1 progress within the current scene's [start, end]. */
  progress: number;
  /** Next scene by start time (or null if currentScene is last). */
  nextScene: SceneRegistration | null;
};
