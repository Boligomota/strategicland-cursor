"use client";

import { SignalProvider } from "./SignalState/SignalProvider";
import { SignalRegistration } from "./SignalState/SignalRegistration";
import { SignalSceneRegistration } from "./SignalState/SignalSceneRegistration";
import { SignalProgressController } from "./SignalState/SignalProgressController";
import { SignalReveal } from "./SignalMotion/SignalReveal";
import { SignalScene } from "./SignalScene";
import { SignalComposition } from "./SignalComposition";

/**
 * SignalChapter — chapter-scoped composition of HC-03 (Signal /
 * Intelligence). ChapterId="cultural" per the canon-locked chapter
 * type vocabulary (.rules/chapter-architecture.mdc §2).
 *
 * Publishes:
 *  - Chapter contract to TransitionDirector via <SignalRegistration/>
 *    (density T04_IMMERSIVE, entry atmospheric_fade, exit scroll_release).
 *  - Scene timeline to NarrativeTimeline via <SignalSceneRegistration/>
 *    (T01 silence → T03 editorial → T04 immersive → T03 reflection
 *    → T01 silence).
 *
 * Atmosphere is INHERITED from the system layer (AmbientDepth +
 * LightField + Vignette mounted by HeroChapter persist across the
 * page). HC-03 does not declare a new atmosphere subtree — it sits
 * inside the same warm-black field the Hero established. Per the
 * brief: HC-03 is "more atmospheric" through pacing + typography +
 * fragmentation, NOT through new atmospheric layers.
 *
 * Subtree:
 *  - SignalRegistration       (director chapter contract publisher)
 *  - SignalSceneRegistration  (narrative scene timeline publisher)
 *  - SignalProvider           (chapter state — phase / progress / root)
 *  - SignalProgressController (scroll progress + timeline push)
 *  - SignalReveal             (intake-gated scroll choreography)
 *  - SignalScene → SignalComposition (the canonical sequence)
 */
export function SignalChapter() {
  return (
    <SignalProvider>
      <SignalRegistration />
      <SignalSceneRegistration />

      <SignalProgressController />

      <SignalReveal>
        <SignalScene>
          <SignalComposition />
        </SignalScene>
      </SignalReveal>
    </SignalProvider>
  );
}
