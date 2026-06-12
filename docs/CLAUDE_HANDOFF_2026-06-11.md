# CLAUDE HANDOFF — 2026-06-11

> Session handoff package for post-promotion repository reconciliation.  
> Audience: incoming Claude / Cursor agent or contributor resuming STRATEGICLAND work.

---

## 1. Repository Identity

| Field | Value |
|-------|-------|
| **Repository URL** | `https://github.com/Boligomota/strategicland-cursor.git` |
| **Canonical branch** | `main` |
| **Canonical commit** | `7f6355f342408536c827e0e563dce243e1709175` |
| **Release tag** | `v0.1.0-strategicland-html-system` (published on remote) |
| **Local path** | `/Users/juanluis/strategicland-cursor` |
| **Identity owner** | Juan Luis Contreras (Strategic Creative Director) |
| **Project type** | Premium editorial web experience — portfolio + manifesto |

---

## 2. Current Objective

**Post-promotion documentation reconciliation.** The HTML reference system migration has been promoted to `main`. No further repository restructuring is required. The immediate work is:

1. Keep documentation aligned with repository reality (this handoff completes that pass).
2. Asset Integration Sprint — replace placeholder plates with real imagery.
3. `MASTER_STATE.md §3` reconciliation — requires explicit Human Director authorization before editing.

**Hard constraints for this phase:**

- Do NOT modify code, content, design, architecture, routing, providers, registry, or HTML migration artefacts unless explicitly directed.
- `docs/MASTER_STATE.md` is governance truth — report discrepancies, do not silently override.

---

## 3. Homepage Architecture (Current)

### Route assembly — `app/page.tsx`

Seven chapters mounted in sequence:

```
HeroChapter          → hero       (HC-01)
MethodologyChapter   → editorial  (HC-02)
SignalChapter        → cultural   (HC-03)
CapabilitiesChapter  → human      (HC-04)
StoryscapeChapter    → editorial  (HC-05 ACT A, instance "storyscape")
ShowcaseChapter      → case       (HC-05 ACT B, instance "showcase")
ConversationChapter  → closing    (HC-05 ACT C, instance "conversation")
```

Legacy `ClosingChapter` is preserved but **not mounted** — only one `ChapterId "closing"` may be active.

### Provider tree — `app/layout.tsx`

Canonical tree per `docs/SYSTEM_ARCHITECTURE.md §3`:

```
ReducedMotion → Irregularity → Lenis → Motion → TransitionDirector
  → NarrativeTimeline → GlobalCursor
    → WebGLRoot, SystemFrame, SystemMetaNav, SystemCursor
    → {children}, TransitionLayer, SystemLoader, SystemGrain
```

### Visual system (post-migration)

| Dimension | Value |
|-----------|-------|
| Palette | Ivory / umber (HTML reference) |
| Typography | Cormorant Garamond (display) + Inter (body) + Space Mono (metadata) |
| Grid | 12-column editorial |
| Compositions | engine / manifesto / dossier / footer patterns |
| Legacy cinematic atmosphere layers | Retired at `7f6355f` |

### Secondary route

- `/work/[slug]` — SSG case study pages; 3 cases in `content/work/`

---

## 4. Locked Systems (Do Not Expand Without Escalation)

Per `AGENTS.md §6` — these vocabularies and allowances are **locked**:

### Locked vocabularies

| Vocabulary | Source | Cardinality |
|------------|--------|-------------|
| `ChapterId` | `app/lib/transitions/types.ts` | 6 (locked) |
| `DensityTier` | `app/lib/transitions/types.ts` | 5 (locked) |
| `EmotionalState` | `app/lib/transitions/types.ts` | 6 (locked) |
| Ease tokens | `app/lib/motion/eases.ts` | 5 + GSAP equivalents |
| Duration tokens | `app/lib/motion/durations.ts` | 6 |
| Stagger tokens | `app/lib/motion/stagger.ts` | enumerated |
| Image aspect ratios | `app/components/media/EditorialImage.tsx` | 6 |
| Reveal patterns | `image-treatment-system.mdc §4` | 3 + `none` |

### Page-level allowances (homepage)

| Allowance | Cap | Consumed |
|-----------|-----|----------|
| `type.epic` | 1/page | HC-01 Hero (1/1) |
| `type.display` | 2/page | HC-02 + HC-03 (2/2) |
| `HeroImage` | 2/page | HC-02 + HC-03 (2/2) |
| Pinned sections | 2/page | HC-01 Hero (1/2) |

### Forbidden patterns (project-wide)

- Stock photography, carousels, dashboards, neon/cyberpunk affordances
- Inline `cubic-bezier(...)` or duration literals in motion code
- `Math.random()` in render or motion
- Multiple `<Canvas>` instances (`WebGLRoot` is singleton)
- `framer-motion` for chapter motion (GSAP only)
- Services-shaped grids, marketing CTA blocks, testimonial carousels

### Governance layers

| Layer | Location |
|-------|----------|
| Cursor rules | `.rules/*.mdc` (18 files — read-only for agents) |
| Governance docs | `docs/*.md` |
| Agent orchestration | `AGENTS.md` + `agents/*.md` |
| HTML canon | 6 frozen reference HTML systems (HC-01 → HC-06) |

---

## 5. Implementation Status Summary

| System | Status |
|--------|--------|
| Next.js scaffold + providers | ✅ Complete |
| Chapter system (7 mounted + 1 legacy preserved) | ✅ Complete |
| Motion / scroll / transition engines | ✅ Complete |
| Irregularity engine | ✅ Complete |
| WebGL root + tunnel | ✅ Complete |
| System layer (frame, nav, cursor, loader, grain, transitions) | ✅ Complete |
| Media primitives | ✅ Complete (placeholders in use) |
| Case registry + `/work/[slug]` | ✅ Complete (3 cases seeded) |
| HTML reference visual migration | ✅ Complete — promoted `7f6355f` |
| Real asset plates | 🔴 Pending |
| Audio architecture | 🚫 Deferred |
| Internal pages (about, contact, work index) | 🔴 Not started |

---

## 6. Agent Onboarding — Read Order

1. `AGENTS.md` — orchestration model and escalation rules (5 min)
2. `docs/MASTER_STATE.md` — governance truth (note: §3 is stale — see discrepancy report)
3. `docs/PROJECT_STATE_SNAPSHOT_CURRENT.md` — repository reality at this commit
4. `docs/DESIGN_DNA.md` — project identity (5 min)
5. `docs/SYSTEM_ARCHITECTURE.md §3` — provider tree
6. `docs/changelogs/2026-06-11-film-implementation-snapshot.md` — latest architectural delta
7. `app/page.tsx` — homepage chapter assembly
8. `.rules/cinematic-language.mdc` — constitution

**Do not start implementation until steps 1–7 are complete.**

---

## 7. Communication Conventions

- **Conversation language:** Spanish (Neutro/Latinoamérica)
- **Code and technical comments:** English
- **Tone:** Senior Principal Engineer — direct, no fluff
- **Commits:** Only when explicitly requested by Human Director

---

## 8. Known Staleness

`docs/MASTER_STATE.md §3` declares phase `HERO SYSTEM MODULARIZATION` with multiple systems marked NOT STARTED. Repository reality at `7f6355f` has advanced to full film implementation + HTML migration. Reconciliation is authorized only by Human Director instruction per `AGENTS.md §4.4`.

See the Documentation Discrepancy Report (delivered alongside this handoff) for the full itemized list.

---

## 9. Recommended Next Session

| Priority | Task | Mode | Owner |
|----------|------|------|-------|
| 1 | Asset Integration Sprint | LIGHTWEIGHT | Atmosphere Rendering → Performance Audit |
| 2 | `MASTER_STATE.md §3` reconciliation | ARCHITECTURE | Human Director authorization required |
| 3 | Case Intelligence expansion | LIGHTWEIGHT | Cinematic Architect directive |

---

## 10. Handoff Signature

> Generated 2026-06-11 as part of post-promotion repository reconciliation. Canonical state: `main@7f6355f`, tag `v0.1.0-strategicland-html-system`. No code changes performed in this handoff pass.
