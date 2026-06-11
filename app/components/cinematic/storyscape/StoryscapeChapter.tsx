"use client";

import { StoryscapeProvider } from "./StoryscapeState/StoryscapeProvider";
import { StoryscapeRegistration } from "./StoryscapeState/StoryscapeRegistration";
import { StoryscapeSceneRegistration } from "./StoryscapeState/StoryscapeSceneRegistration";
import { StoryscapeProgressController } from "./StoryscapeState/StoryscapeProgressController";
import { StoryscapeReveal } from "./StoryscapeMotion/StoryscapeReveal";
import { StoryscapeScene } from "./StoryscapeScene";
import { StoryscapeComposition } from "./StoryscapeComposition";

/**
 * StoryscapeChapter — chapter-scoped composition of HC-05 · ACT A ·
 * Storyscape. ChapterId="editorial" per the approved HC-05
 * production architecture (D1).
 *
 * Role in the film: turns the camera from the machine (HC-04) to the
 * world where the machine acts — the nine activation forces that
 * strategic intelligence mobilizes in culture. Connector between
 * PROCESS and EVIDENCE: without it, the Showcase would be a
 * portfolio glued to the end of an essay.
 *
 * Target page position (approved 7-chapter sequence):
 *   hero → editorial(HC-02) → cultural(HC-03) → case(HC-04) →
 *   editorial(ACT A · this) → case(ACT B) → closing(ACT C)
 *
 * Budgets (architecture §14):
 *  - NO pin (pins 2/2 consumed by HC-01 + HC-04)
 *  - NO imagery (Act A without image is architectural law)
 *  - NO type.display / type.epic (allowances exhausted)
 *  - NO exits (the forces do not navigate; they prepare)
 *
 * ============================================================
 * STATUS — IMPLEMENTED (Sprint 03 · ACT A) and MOUNTED in
 * app/page.tsx between Capabilities and the page close.
 * ============================================================
 * Mount blockers resolved:
 *  1. RESOLVED (Sprint 02) — TransitionDirector / NarrativeTimeline
 *     are instance-keyed; this act registers under instanceId
 *     "storyscape" and coexists with HC-02 Methodology.
 *  2. HC-04 ROUTE A (`human` → `case` re-type) is APPROVED and lands
 *     with ACT B — the current `human` registration keeps the page
 *     sequence legal in the interim (no adjacent type repetition).
 *  3. Human Director authorization for the 7-chapter expansion is
 *     GRANTED (Sprint 03 brief).
 *
 * Subtree (canonical):
 *  - StoryscapeRegistration       (director chapter contract publisher)
 *  - StoryscapeSceneRegistration  (narrative scene timeline publisher)
 *  - StoryscapeProvider           (chapter state — phase / progress / root)
 *  - StoryscapeProgressController (scroll progress + timeline push)
 *  - StoryscapeReveal             (per-current motion temperatures)
 *  - StoryscapeScene → StoryscapeComposition (5-scene sequence)
 */
export function StoryscapeChapter() {
  return (
    <StoryscapeProvider>
      <StoryscapeRegistration />
      <StoryscapeSceneRegistration />

      <StoryscapeProgressController />

      <StoryscapeReveal>
        <StoryscapeScene>
          <StoryscapeComposition />
        </StoryscapeScene>
      </StoryscapeReveal>
    </StoryscapeProvider>
  );
}
