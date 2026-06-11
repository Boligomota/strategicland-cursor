"use client";

import type { CaseData } from "@/content/work/types";
import { CaseProvider } from "./CaseState/CaseProvider";
import { CaseRegistration } from "./CaseState/CaseRegistration";
import { CaseSceneRegistration } from "./CaseState/CaseSceneRegistration";
import { CaseProgressController } from "./CaseState/CaseProgressController";
import { CaseReveal } from "./CaseMotion/CaseReveal";
import { CaseHorizontalTransport } from "./CaseMotion/CaseHorizontalTransport";
import { CaseScene } from "./CaseScene";
import { CaseComposition } from "./CaseComposition";

/**
 * CaseChapter — chapter-scoped composition of the M-04 case system
 * (canon HC-06). ChapterId="case" per the canon-locked chapter type
 * vocabulary (.rules/chapter-architecture.mdc §2) — the last
 * unconsumed slot in the locked ChapterId set.
 *
 * The organism's FIRST PARAMETRIC chapter: it receives `caseData`
 * (typed content from content/work/<slug>/case.ts) and instantiates
 * the same canonical subtree as every home chapter. The template is
 * fixed; the instance identity is content.
 *
 * Publishes:
 *  - Chapter contract to TransitionDirector via <CaseRegistration/>
 *    (density T04_IMMERSIVE, entry atmospheric_fade, exit
 *    scroll_release, profile expansive — release after T05).
 *  - Scene timeline to NarrativeTimeline via <CaseSceneRegistration/>
 *    (T03 intro → T04 frame → T05 pinned → T04 release → T02 caption).
 *
 * Atmosphere is INHERITED from the system layer mounted by
 * app/layout.tsx (WebGLRoot, SystemGrain, SystemFrame persist across
 * routes). The case chapter does not declare a new atmosphere
 * subtree — it sits inside the same warm-black field.
 *
 * Motion ownership split (the boundary is the data-* attribute):
 *  - CaseReveal owns the VERTICAL choreography (intro / frame /
 *    release / caption scenes).
 *  - CaseHorizontalTransport owns the pinned T05 scene exclusively
 *    ([data-case-horizontal-track] subtree) — pin 1/2 on this route.
 *
 * Subtree (mirror of MethodologyChapter):
 *  - CaseRegistration         (director chapter contract publisher)
 *  - CaseSceneRegistration    (narrative scene timeline publisher)
 *  - CaseProvider             (chapter state — phase / progress / root)
 *  - CaseProgressController   (scroll progress + timeline push)
 *  - CaseHorizontalTransport  (pinned horizontal transport, md+ only)
 *  - CaseReveal               (intake-gated vertical choreography)
 *  - CaseScene → CaseComposition (the canonical 5-scene sequence)
 */
export function CaseChapter({ caseData }: { caseData: CaseData }) {
  return (
    <CaseProvider>
      <CaseRegistration />
      <CaseSceneRegistration />

      <CaseProgressController />
      <CaseHorizontalTransport />

      <CaseReveal>
        <CaseScene slug={caseData.slug}>
          <CaseComposition caseData={caseData} />
        </CaseScene>
      </CaseReveal>
    </CaseProvider>
  );
}
