"use client";

import { ShowcaseProvider } from "./ShowcaseState/ShowcaseProvider";
import { ShowcaseRegistration } from "./ShowcaseState/ShowcaseRegistration";
import { ShowcaseSceneRegistration } from "./ShowcaseState/ShowcaseSceneRegistration";
import { ShowcaseProgressController } from "./ShowcaseState/ShowcaseProgressController";
import { ShowcaseReveal } from "./ShowcaseMotion/ShowcaseReveal";
import { ShowcaseScene } from "./ShowcaseScene";
import { ShowcaseComposition } from "./ShowcaseComposition";

/**
 * ShowcaseChapter — chapter-scoped composition of HC-05 · ACT B ·
 * Showcase. ChapterId="case" per the approved HC-05 production
 * architecture (D1).
 *
 * Role in the film: the proof. Strategic intelligence converted into
 * position, systems, perception — shown, not described. The payment
 * of every promise the film made: HC-02 promised the smoke was
 * avoidable; HC-03 promised alignment exists; HC-04 promised the
 * machine decides. ACT B shows the three promises fulfilled in
 * matter.
 *
 * Target page position (approved 7-chapter sequence):
 *   hero → editorial(HC-02) → cultural(HC-03) → case(HC-04) →
 *   editorial(ACT A) → case(ACT B · this) → closing(ACT C)
 *
 * Budgets (architecture §14):
 *  - NO pin (pins 2/2; the T05 pin of M-04 lives in /work)
 *  - 3 EditorialImage plates only (2.39:1 / 2:1 / 3:4 — locked set);
 *    HeroImage exhausted at 2/2; reveal "mask" only (+ drift on
 *    protagonist)
 *  - NO type.display / type.epic (allowances exhausted — headline
 *    scale)
 *  - Exits: 3 × /work/[slug] — the only justified exits of the
 *    evidence: its own depth
 *
 * ============================================================
 * STATUS — MOUNTED in app/page.tsx (Sprint 03, Human Director
 * directive "Implement HC-05 ACT B").
 * ============================================================
 * Former mount blockers, all resolved:
 *  1. RESOLVED (Sprint 02) — director registry is instance-keyed;
 *     this act registers `case` under instance "showcase".
 *  2. RESOLVED (Sprint 02/03) — M-04 infrastructure live:
 *     /work/[slug] + content/work registry with three cases. The
 *     three thresholds bind to the registry's `threshold` blocks
 *     (dedicated compressed copy — the homepage presents evidence,
 *     /work contains depth, the planes never duplicate) and deep-link
 *     into /work/<slug>.
 *  3. Sprint 03 brief = Human Director authorization for the ACT B
 *     mount.
 *
 * Subtree (canonical):
 *  - ShowcaseRegistration       (director chapter contract publisher)
 *  - ShowcaseSceneRegistration  (narrative scene timeline publisher)
 *  - ShowcaseProvider           (chapter state — phase / progress / root)
 *  - ShowcaseProgressController (scroll progress + timeline push)
 *  - ShowcaseReveal             (motion placeholder; copy reveals
 *    deferred — plate mask reveals are EditorialImage-native)
 *  - ShowcaseScene → ShowcaseComposition (4-scene sequence)
 */
export function ShowcaseChapter() {
  return (
    <ShowcaseProvider>
      <ShowcaseRegistration />
      <ShowcaseSceneRegistration />

      <ShowcaseProgressController />

      <ShowcaseReveal>
        <ShowcaseScene>
          <ShowcaseComposition />
        </ShowcaseScene>
      </ShowcaseReveal>
    </ShowcaseProvider>
  );
}
