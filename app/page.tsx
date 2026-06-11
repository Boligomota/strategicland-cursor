import { HeroChapter } from "./components/cinematic/hero";
import { MethodologyChapter } from "./components/cinematic/methodology";
import { SignalChapter } from "./components/cinematic/signal";
import { CapabilitiesChapter } from "./components/cinematic/capabilities";
import { StoryscapeChapter } from "./components/cinematic/storyscape";
import { ShowcaseChapter } from "./components/cinematic/showcase";
import { ConversationChapter } from "./components/cinematic/conversation";

/**
 * Home — composes chapters declaratively per
 * docs/SYSTEM_ARCHITECTURE.md §7.
 *
 *  HC-01 (hero, T04 establishing)
 *   └─ HC-02 (editorial · methodology, T03 dominant) — strategic
 *      authority unfolding as cinematic editorial.
 *   └─ HC-03 (cultural · signal, T04 atmospheric peak) — silent
 *      intelligence sensing patterns beneath contemporary behavior.
 *   └─ HC-04 (human · capabilities, T03 dominant) — strategic
 *      consciousness manifesting as operational reality.
 *   └─ HC-05 ACT A (editorial · storyscape, T03 dominant) — the
 *      camera turns from the machine to the world: nine activation
 *      forces experienced as three currents of three. Instance
 *      "storyscape" (instance-keyed registry, Sprint 02).
 *   └─ HC-05 ACT B (case · showcase) — homepage evidence layer.
 *      Instance "showcase".
 *   └─ HC-05 ACT C (closing · conversation, T02→T01) — the single
 *      door (invitation), then the coda (relocated afterimage +
 *      persistent atmosphere + minimal signature). SUPERSEDES the
 *      legacy ClosingChapter (future memory), which stays unmounted —
 *      exactly ONE ChapterId "closing" mounted at a time.
 *
 * All five chapters inherit the same atmospheric field — no
 * <ChapterSeam> veil between them. Each chapter's terminal T01
 * silence flows directly into the next chapter's opening T01,
 * creating sustained silence bridges that mirror the canon
 * `silent` transition profile without overlay cost.
 *
 * Per .rules/chapter-architecture.mdc §4.2 sequencing rules:
 *  - Opens with hero ✓
 *  - One cultural chapter (HC-03 climactic) ✓
 *  - No two case chapters in a row (none yet) ✓
 *  - Two editorial chapters in a row forbidden — HC-02 (editorial)
 *    and ACT A (editorial · storyscape) are separated by cultural
 *    (HC-03) + human (HC-04) ✓
 *  - Adjacent type repetition: hero / editorial / cultural / human /
 *    editorial / closing — no duplicate adjacency ✓
 *  - Closes with `closing` chapter ✓
 *
 * Page-level emotional contour per chapter-architecture.mdc §4.3:
 *   hero (T04) → editorial (T03) → cultural (T04) → human (T03) →
 *   editorial (T03) → closing (T02)
 * Descending arc through operational territory into dissolution.
 *
 * Per page-level allowances:
 *  - type.epic: HC-01 only (1/1) ✓
 *  - type.display: HC-02 + HC-03 (2/2 — exhausted; HC-04..HC-05 below) ✓
 *  - HeroImage: HC-02 + HC-03 (2/2 — exhausted; HC-04..HC-05 use EditorialImage) ✓
 *  - Pinned sections: HC-01 only (1/2) — HC-02..HC-05 unpinned ✓
 *
 * ------------------------------------------------------------------
 * HC-05 MIGRATION — APPROVED TARGET SEQUENCE (ACT A mounted in
 * Sprint 03; ACT B / ACT C pending)
 * ------------------------------------------------------------------
 * Per the approved HC-05 production architecture (STORYSCAPE +
 * SHOWCASE + CONVERSATION), this page evolves from 5 to 7 chapters:
 *
 *   <HeroChapter />            hero       (unchanged)
 *   <MethodologyChapter />     editorial  (unchanged)
 *   <SignalChapter />          cultural   (unchanged)
 *   <CapabilitiesChapter />    case       (HC-04 ROUTE A re-type lands
 *                                           with ACT B)
 *   <StoryscapeChapter />      editorial  ← ACT A · MOUNTED (Sprint 03)
 *   <ShowcaseChapter />        case       ← ACT B · MOUNTED (Sprint 03)
 *   <ConversationChapter />    closing    ← ACT C · MOUNTED (Sprint 03 —
 *                                           REPLACES <ClosingChapter />)
 *
 * Remaining acts live at app/components/cinematic/{showcase,
 * conversation}. Remaining mount blockers:
 *  1. RESOLVED (Sprint 02) — TransitionDirector / NarrativeTimeline
 *     are instance-keyed (ChapterInstanceId). The acts register
 *     under "storyscape" / "showcase" / "conversation"; duplicated
 *     `editorial` / `case` / `closing` TYPES no longer collide.
 *  2. HC-04 `human` → `case` re-type (approved ROUTE A) lands with
 *     ACT B. Interim sequence stays legal: hero / editorial /
 *     cultural / human / editorial / closing.
 *  3. 7-chapter expansion authorized by the Human Director
 *     (Sprint 03 brief). MASTER_STATE / CHAPTER_SYSTEM updates are
 *     reserved for the closing protocol.
 */
export default function Home() {
  return (
    <>
      <HeroChapter />
      <MethodologyChapter />
      <SignalChapter />
      <CapabilitiesChapter />
      <StoryscapeChapter />
      {/* HC-05 ACT B (Sprint 03) — homepage evidence layer; `case` instance
          "showcase". ACT A (editorial · storyscape) interposes, so the
          "no two case chapters in a row" rule holds against any HC-04
          re-type. */}
      <ShowcaseChapter />
      {/* HC-05 ACT C (Sprint 03) — terminal `closing` instance
          "conversation". Replaces the legacy ClosingChapter (future
          memory); both register ChapterId "closing", so exactly one
          may be mounted. The legacy chapter stays intact at
          app/components/cinematic/closing — ACT C imports its
          calibrated AfterimageFragment + PersistentAtmosphere. */}
      <ConversationChapter />
    </>
  );
}
