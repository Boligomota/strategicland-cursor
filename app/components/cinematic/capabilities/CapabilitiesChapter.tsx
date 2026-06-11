"use client";

import { CapabilitiesProvider } from "./CapabilitiesState/CapabilitiesProvider";
import { CapabilitiesRegistration } from "./CapabilitiesState/CapabilitiesRegistration";
import { CapabilitiesSceneRegistration } from "./CapabilitiesState/CapabilitiesSceneRegistration";
import { CapabilitiesProgressController } from "./CapabilitiesState/CapabilitiesProgressController";
import { CapabilitiesReveal } from "./CapabilitiesMotion/CapabilitiesReveal";
import { CapabilitiesScene } from "./CapabilitiesScene";
import { CapabilitiesComposition } from "./CapabilitiesComposition";

/**
 * CapabilitiesChapter — chapter-scoped composition of HC-04 ·
 * Strategic Capabilities. ChapterId="human" per the canon-locked
 * chapter type vocabulary (.rules/chapter-architecture.mdc §2).
 *
 * Publishes:
 *  - Chapter contract to TransitionDirector via
 *    <CapabilitiesRegistration/> (density T03_EDITORIAL, entry
 *    atmospheric_fade, exit scroll_release).
 *  - Scene timeline to NarrativeTimeline via
 *    <CapabilitiesSceneRegistration/> (T01 silence → T02 reflection
 *    → T03 immersion → T02 reflection → T01 silence).
 *
 * Atmosphere is INHERITED from the system layer (AmbientDepth +
 * LightField + Vignette mounted by HeroChapter persist across the
 * page). HC-04 does not declare a new atmosphere subtree — it sits
 * inside the same warm-black field the Hero established. Per the
 * brief: HC-04 is "more tangible / more operational / more grounded"
 * through composition + typography + corner-anchored documentary
 * imagery, NOT through new atmospheric layers.
 *
 * Image budget compliance:
 *  - HC-04 uses EditorialImage exclusively. The HeroImage allowance
 *    (canon §4.2 "at most twice per page") is exhausted by HC-02
 *    MethodStatement + HC-03 PatternConstellation. No blur reveals.
 *  - All 3 plates (CapabilityFragments / AppliedTension / OutcomeLayer)
 *    are corner-anchored and md+ only — no mobile saturation.
 *
 * Type budget compliance:
 *  - HC-04 uses type.headline (clamp 24-38px) for its anchor headlines.
 *    The page's `type.display` allowance is exhausted by HC-02 +
 *    HC-03; HC-04 stays one tier below display.
 *
 * Subtree:
 *  - CapabilitiesRegistration       (director chapter contract publisher)
 *  - CapabilitiesSceneRegistration  (narrative scene timeline publisher)
 *  - CapabilitiesProvider           (chapter state — phase / progress / root)
 *  - CapabilitiesProgressController (scroll progress + timeline push)
 *  - CapabilitiesReveal             (intake-gated scroll choreography)
 *  - CapabilitiesScene → CapabilitiesComposition (the canonical sequence)
 */
export function CapabilitiesChapter() {
  return (
    <CapabilitiesProvider>
      <CapabilitiesRegistration />
      <CapabilitiesSceneRegistration />

      <CapabilitiesProgressController />

      <CapabilitiesReveal>
        <CapabilitiesScene>
          <CapabilitiesComposition />
        </CapabilitiesScene>
      </CapabilitiesReveal>
    </CapabilitiesProvider>
  );
}
