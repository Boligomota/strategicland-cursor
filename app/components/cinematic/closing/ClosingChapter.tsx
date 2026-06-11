"use client";

import { ClosingProvider } from "./ClosingState/ClosingProvider";
import { ClosingRegistration } from "./ClosingState/ClosingRegistration";
import { ClosingSceneRegistration } from "./ClosingState/ClosingSceneRegistration";
import { ClosingProgressController } from "./ClosingState/ClosingProgressController";
import { ClosingReveal } from "./ClosingMotion/ClosingReveal";
import { ClosingScene } from "./ClosingScene";
import { ClosingComposition } from "./ClosingComposition";

/**
 * ClosingChapter — chapter-scoped composition of HC-05 · Future
 * Memory. ChapterId="closing" per the canon-locked chapter type
 * vocabulary (.rules/chapter-architecture.mdc §2). This is the
 * ONLY closing chapter on the page.
 *
 * Publishes:
 *  - Chapter contract to TransitionDirector via
 *    <ClosingRegistration/> (density T02_CONTEMPLATIVE — chapter
 *    peak; entry atmospheric_fade; exit scroll_release; transition
 *    profile silent for the T01↔T01 bridge from HC-04).
 *  - Scene timeline to NarrativeTimeline via
 *    <ClosingSceneRegistration/> (emergence T01 → afterimage T02
 *    → persistent T01 sustained).
 *
 * Atmosphere is INHERITED from the system layer. HC-05 does NOT
 * declare a new atmospheric subtree — it sits inside the same
 * warm-black field the Hero established. Per the blueprint §8:
 * any local atmospheric calibration is deferred to a later pass.
 *
 * Image budget compliance:
 *  - HC-05 uses EditorialImage exclusively. The HeroImage allowance
 *    (canon §4.2 "at most twice per page") is exhausted by HC-02 +
 *    HC-03. No blur reveals.
 *  - One plate only — AfterimageFragment carries the single
 *    EditorialImage allowed in the chapter, at opacity ≤ 0.10.
 *
 * Type budget compliance:
 *  - HC-05 stays below type.headline. The single afterimage
 *    sentence operates at type.lede scale (clamp 17-22px). Page
 *    allowances for type.epic (1/1, HC-01) and type.display (2/2,
 *    HC-02 + HC-03) remain undisturbed.
 *
 * Architectural deliberate omissions:
 *  - NO chapter marker (deviation from HC-01..HC-04 prelude
 *    markers). The chapter does not declare itself.
 *  - NO forward cue (break in the "X continúa →" cue chain
 *    established by HC-01..HC-04). The chapter does not announce
 *    continuation.
 *  - NO footer / copyright / contact / CTA. The persistent ambient
 *    state IS the close.
 *
 * Motion: intentionally deferred in this foundational pass.
 * ClosingReveal exists as a structural placeholder.
 *
 * Subtree:
 *  - ClosingRegistration       (director chapter contract publisher)
 *  - ClosingSceneRegistration  (narrative scene timeline publisher)
 *  - ClosingProvider           (chapter state — phase / progress / root)
 *  - ClosingProgressController (scroll progress + timeline push)
 *  - ClosingReveal             (motion placeholder; reveals deferred)
 *  - ClosingScene → ClosingComposition (canonical 3-scene sequence)
 */
export function ClosingChapter() {
  return (
    <ClosingProvider>
      <ClosingRegistration />
      <ClosingSceneRegistration />

      <ClosingProgressController />

      <ClosingReveal>
        <ClosingScene>
          <ClosingComposition />
        </ClosingScene>
      </ClosingReveal>
    </ClosingProvider>
  );
}
