"use client";

import { ConversationProvider } from "./ConversationState/ConversationProvider";
import { ConversationRegistration } from "./ConversationState/ConversationRegistration";
import { ConversationSceneRegistration } from "./ConversationState/ConversationSceneRegistration";
import { ConversationProgressController } from "./ConversationState/ConversationProgressController";
import { ConversationReveal } from "./ConversationMotion/ConversationReveal";
import { ConversationScene } from "./ConversationScene";
import { ConversationComposition } from "./ConversationComposition";

/**
 * ConversationChapter — chapter-scoped composition of HC-05 · ACT C ·
 * Conversation. ChapterId="closing" per the approved HC-05
 * production architecture (D1).
 *
 * Role in the film: opens the single commercial conversation of the
 * site — and closes the film in silence after opening it. The page
 * drops to the temperature of the canon's `human` chapter:
 * stillness, intimate scale, zero pressure. The user must feel the
 * door was there from the beginning and they decide to cross it.
 * Forbidden emotion: pressure (§3).
 *
 * Target page position (approved 7-chapter sequence — terminal):
 *   hero → editorial(HC-02) → cultural(HC-03) → case(HC-04) →
 *   editorial(ACT A) → case(ACT B) → closing(ACT C · this)
 *
 * Replacement contract: this chapter SUPERSEDES the incumbent
 * ClosingChapter (HC-05 · Future Memory) as the page's terminal
 * chapter. The incumbent stays untouched and mounted until the
 * Human Director authorizes the swap — exactly ONE of the two may be
 * mounted at any time (both register ChapterId "closing").
 *
 * Budgets (architecture §14):
 *  - NO pin · NO new imagery (the residual plate inside the
 *    relocated AfterimageFragment is the act's only plate)
 *  - 1 × magnetic.gravitational — the first and only instance on the
 *    page (budget ≤ 2/viewport)
 *  - 1 exit: the conversation door (mailto / /contact — pending
 *    Director decision)
 *
 * ============================================================
 * FOUNDATION STATUS — NOT MOUNTED in app/page.tsx yet.
 * ============================================================
 * Blockers before mount (recorded as migration risks):
 *  1. Mounting requires unmounting ClosingChapter in the same commit
 *     (ChapterId "closing" collision in director + timeline).
 *  2. Human Director authorizations (§14): sequence expansion 5 → 7,
 *     formal derogation of the closing §15 doctrine, MASTER_STATE /
 *     CHAPTER_SYSTEM §4.1 updates at closing protocol.
 *  3. PersistentAtmosphere compression (80vh → ~50vh) + §15 comment
 *     rewrite happen in the migration pass, not here.
 *
 * Subtree (canonical):
 *  - ConversationRegistration       (director chapter contract publisher)
 *  - ConversationSceneRegistration  (narrative scene timeline publisher)
 *  - ConversationProvider           (chapter state — phase / progress / root)
 *  - ConversationProgressController (scroll progress + timeline push)
 *  - ConversationReveal             (invitation drift + door magnetism)
 *  - ConversationScene → ConversationComposition (invitation + coda)
 */
export function ConversationChapter() {
  return (
    <ConversationProvider>
      <ConversationRegistration />
      <ConversationSceneRegistration />

      <ConversationProgressController />

      <ConversationReveal>
        <ConversationScene>
          <ConversationComposition />
        </ConversationScene>
      </ConversationReveal>
    </ConversationProvider>
  );
}
