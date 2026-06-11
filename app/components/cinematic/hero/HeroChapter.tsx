"use client";

import { HeroProvider } from "./HeroState/HeroProvider";
import { HeroProgressController } from "./HeroState/HeroProgressController";
import { HeroRegistration } from "./HeroState/HeroRegistration";
import { HeroSceneRegistration } from "./HeroState/HeroSceneRegistration";
import { HeroAtmosphere } from "./HeroAtmosphere";
import { HeroPinnedSequence } from "./HeroMotion/HeroPinnedSequence";
import { DensityTransition } from "./HeroMotion/DensityTransition";
import { HumanDriftController } from "./HeroMotion/HumanDriftController";
import { HeroScene } from "./HeroScene";
import { HeroComposition } from "./HeroComposition";

/**
 * HeroChapter — chapter-scoped composition of HC-01.
 *
 * Publishes:
 *  - Chapter contract to TransitionDirector via <HeroRegistration/>
 *    (density T04_IMMERSIVE, entry loader_gated, exit scroll_release).
 *  - Scene timeline to NarrativeTimeline via <HeroSceneRegistration/>
 *    (T04 immersion → T02 reflection → T04 compression → T01 silence).
 *
 * Site-wide elements live in app/components/system/* and are mounted at
 * root layout. The Hero subtree is purely chapter-scoped:
 *
 *  - HeroRegistration         (director chapter contract publisher)
 *  - HeroSceneRegistration    (narrative scene timeline publisher)
 *  - HeroProvider             (chapter state — chapterPhase / progress / root)
 *  - HeroAtmosphere           (AmbientDepth + LightField tunnel + Vignette)
 *  - HeroProgressController   (scroll progress + release request + timeline push)
 *  - DensityTransition        (gradient density crossfade)
 *  - HumanDriftController     (sub-pixel breathing on title group)
 *  - HeroPinnedSequence       (intro + parallax)
 *  - HeroScene → HeroComposition (the canonical narrative composition)
 */
export function HeroChapter() {
  return (
    <HeroProvider>
      <HeroRegistration />
      <HeroSceneRegistration />
      <HeroAtmosphere />

      <HeroProgressController />
      <DensityTransition />
      <HumanDriftController />

      <HeroPinnedSequence>
        <HeroScene>
          <HeroComposition />
        </HeroScene>
      </HeroPinnedSequence>
    </HeroProvider>
  );
}
