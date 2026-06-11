/**
 * Transition state machine — per docs/SYSTEM_ARCHITECTURE.md §6
 * and .rules/narrative-density-system.mdc.
 *
 * TransitionDirector orchestrates the full chapter lifecycle as a single
 * state machine. Chapters never run transition logic inline — they publish
 * metadata via registerChapter() and request lifecycle moves via the
 * director API.
 *
 * Lifecycle (per chapter):
 *
 *   T0_IDLE       — between chapters; no chapter holds focus
 *   T1_PRE_ENTRY  — chapter mounted, intake/atmosphere prep underway
 *   T2_HANDOFF    — current chapter relinquishing focus to the next
 *   T3_TRANSITION — TransitionLayer veil playing, atmosphere bridge active
 *   T4_IMMERSION  — chapter fully active, motion + density at full intensity
 *   T5_RELEASE    — chapter releasing focus, atmosphere decompressing
 *
 * A site session is a sequence of:
 *   T1 → T4 → T5 → (T2 → T3 → T1 → T4 → T5)*  → T0
 *
 * HC-01 only exercises T1 → T4 → T5 → T0. T2/T3 transitions are
 * infrastructure for HC-02+.
 */

export type ChapterId =
  | "hero"
  | "editorial"
  | "case"
  | "human"
  | "cultural"
  | "closing";

/**
 * Chapter INSTANCE key. The locked ChapterId vocabulary above names the
 * chapter TYPE (1 of 6, canon-locked). A page may mount N instances of
 * the same type (e.g. two `editorial` chapters); each mounted instance
 * must register under a unique instance key.
 *
 * Resolution contract (registry-wide):
 *   instance key = registration.instanceId ?? registration.id
 *
 * Single-instance chapters (HC-01..HC-05, M-04) omit instanceId and keep
 * registering under their ChapterId — fully backward compatible. Multi-
 * instance chapters (HC-05 production acts) declare an explicit
 * instanceId ("storyscape", "showcase", "conversation").
 *
 * Every ChapterId string is a valid ChapterInstanceId, which is what
 * keeps existing call sites (isImmersed("hero"), etc.) intact.
 */
export type ChapterInstanceId = string;

/**
 * Density tiers per .rules/narrative-density-system.mdc §3.
 * Locked vocabulary. Adding tiers is forbidden by canon.
 */
export type DensityTier =
  | "T01_SILENCE"
  | "T02_CONTEMPLATIVE"
  | "T03_EDITORIAL"
  | "T04_IMMERSIVE"
  | "T05_KINETIC";

/**
 * Emotional orchestration states. Cross-cutting label that scenes publish
 * alongside their density tier. Atmospheric layers + motion controllers
 * react to this independently of the numeric tier so two scenes at the
 * same tier can read differently (e.g. T04 immersion vs T04 compression).
 *
 *   curiosity    — anticipation, intake, opening attention
 *   immersion    — full engagement, atmosphere at peak
 *   compression  — pinned tension, density-heavy, restricted breath
 *   reflection   — slow read, type-only, lede hold
 *   silence      — explicit pause, suspended motion, ≥ 60vh stillness
 *   release      — exhale after compression; opens back into next chapter
 *
 * Not UI state. No CSS coupling. Pure orchestration signal.
 */
export type EmotionalState =
  | "curiosity"
  | "immersion"
  | "compression"
  | "reflection"
  | "silence"
  | "release";

/**
 * Intro phases for T1_PRE_ENTRY. Mirrors the cinematic intake choreography:
 *   veil       — initial dark veil holds; no content rendered
 *   atmosphere — atmospheric layers fade in; structure prepared
 *   type       — display typography enters
 *   complete   — intake fully resolved; ready to advance to T4_IMMERSION
 */
export type IntroPhase = "veil" | "atmosphere" | "type" | "complete";

/**
 * Behavior the chapter requests for its entry. The director maps these
 * into concrete T1 → T4 paths.
 *
 *   loader_gated       — wait for SystemLoader intake completion
 *   atmospheric_fade   — atmospheric layers fade in then content
 *   veil               — TransitionLayer veil resolves to chapter
 *   instant            — no choreography; jump straight to T4
 */
export type EntryBehavior =
  | "loader_gated"
  | "atmospheric_fade"
  | "veil"
  | "instant";

/**
 * Behavior the chapter requests on exit. Maps to T5_RELEASE shape.
 *
 *   scroll_release        — ScrollTrigger boundary pushes through; soft handoff
 *   atmospheric_dissolve  — atmosphere fades; pauses ≥ DUR.cinematic before next
 *   fade                  — opacity fade only
 *   instant               — release the moment scroll passes boundary
 */
export type ExitBehavior =
  | "scroll_release"
  | "atmospheric_dissolve"
  | "fade"
  | "instant";

/**
 * Cross-chapter transition profile. Picked by the OUTGOING chapter; the
 * INCOMING chapter's entryBehavior is honored on the other side.
 *
 *   default     — standard atmospheric cross
 *   silent      — held silence between chapters (T01 ↔ T01 bridges)
 *   compressed  — short, dense bridge (kinetic ↔ kinetic)
 *   expansive   — long, breathing bridge (release after T05)
 */
export type TransitionProfile = "default" | "silent" | "compressed" | "expansive";

/**
 * Chapter contract: what each chapter publishes to the director on mount.
 * The director never inspects chapter internals — only this metadata.
 *
 * `id` names the chapter TYPE (locked vocabulary). `instanceId` names the
 * mounted INSTANCE; when omitted it defaults to `id` (single-instance
 * chapters). Two registrations may share `id` but never an instance key.
 */
export type ChapterRegistration = {
  id: ChapterId;
  instanceId?: ChapterInstanceId;
  density: DensityTier;
  entryBehavior: EntryBehavior;
  exitBehavior: ExitBehavior;
  transitionProfile: TransitionProfile;
};

/**
 * Resolves the registry key for a chapter registration. Single source of
 * truth for the instance-key contract — director and timeline both use it.
 */
export function chapterInstanceKey(reg: {
  id: ChapterId;
  instanceId?: ChapterInstanceId;
}): ChapterInstanceId {
  return reg.instanceId ?? reg.id;
}

/**
 * Director state. Carries which chapter INSTANCE is in focus (when
 * applicable). Atmospheric layers + cursor + grain subscribe and react
 * accordingly. Instance-keyed since the registry migration; for
 * single-instance chapters the value is still the ChapterId string.
 */
export type TransitionState =
  | { kind: "T0_IDLE" }
  | { kind: "T1_PRE_ENTRY"; chapter: ChapterInstanceId; phase: IntroPhase }
  | { kind: "T2_HANDOFF"; from: ChapterInstanceId; to: ChapterInstanceId }
  | {
      kind: "T3_TRANSITION";
      from: ChapterInstanceId;
      to: ChapterInstanceId;
      progress: number;
    }
  | { kind: "T4_IMMERSION"; chapter: ChapterInstanceId }
  | { kind: "T5_RELEASE"; chapter: ChapterInstanceId };

export type TransitionStateKind = TransitionState["kind"];
