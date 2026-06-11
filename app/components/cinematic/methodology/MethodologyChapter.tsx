"use client";

import { MethodologyProvider } from "./MethodologyState/MethodologyProvider";
import { MethodologyRegistration } from "./MethodologyState/MethodologyRegistration";
import { MethodologySceneRegistration } from "./MethodologyState/MethodologySceneRegistration";
import { MethodologyProgressController } from "./MethodologyState/MethodologyProgressController";
import { MethodologyReveal } from "./MethodologyMotion/MethodologyReveal";
import { MethodologyScene } from "./MethodologyScene";
import { MethodologyComposition } from "./MethodologyComposition";

/**
 * MethodologyChapter — chapter-scoped composition of HC-02 (Strategic
 * Methodology). ChapterId="editorial" per the canon-locked chapter type
 * vocabulary (.rules/chapter-architecture.mdc §2).
 *
 * Publishes:
 *  - Chapter contract to TransitionDirector via <MethodologyRegistration/>
 *    (density T03_EDITORIAL, entry atmospheric_fade, exit scroll_release).
 *  - Scene timeline to NarrativeTimeline via <MethodologySceneRegistration/>
 *    (T01 silence → T02 reflection → T03 immersion → T02 reflection
 *    → T01 silence).
 *
 * Atmosphere is INHERITED from the system layer (AmbientDepth + LightField
 * + HeroVignette mounted by HeroChapter persist across the page). The
 * methodology chapter does not declare a new atmosphere subtree — it sits
 * inside the same warm-black field the Hero established.
 *
 * Subtree:
 *  - MethodologyRegistration       (director chapter contract publisher)
 *  - MethodologySceneRegistration  (narrative scene timeline publisher)
 *  - MethodologyProvider           (chapter state — phase / progress / root)
 *  - MethodologyProgressController (scroll progress + timeline push)
 *  - MethodologyReveal             (intake-gated scroll choreography)
 *  - MethodologyScene → MethodologyComposition (the canonical sequence)
 */
export function MethodologyChapter() {
  return (
    <MethodologyProvider>
      <MethodologyRegistration />
      <MethodologySceneRegistration />

      <MethodologyProgressController />

      <MethodologyReveal>
        <MethodologyScene>
          <MethodologyComposition />
        </MethodologyScene>
      </MethodologyReveal>
    </MethodologyProvider>
  );
}
