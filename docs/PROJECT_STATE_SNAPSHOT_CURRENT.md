# PROJECT STATE SNAPSHOT — CURRENT

> Generated: 2026-06-11 (UTC)  
> Purpose: Post-promotion reconciliation snapshot. Reflects repository reality at canonical commit.  
> Authority: This snapshot describes reality; `docs/MASTER_STATE.md` remains governance truth until Human Director reconciliation.

---

## 1. Canonical Reference

| Field | Value |
|-------|-------|
| Repository | `https://github.com/Boligomota/strategicland-cursor.git` |
| Canonical branch | `main` |
| Canonical commit | `7f6355f342408536c827e0e563dce243e1709175` |
| Commit message | VISUAL MIGRATION: adopt HTML reference system (ivory/umber palette, Cormorant+Inter+Space Mono, 12-col grid, engine/manifesto/dossier/footer compositions; retire cinematic atmosphere layers) |
| Release tag | `v0.1.0-strategicland-html-system` → points to `7f6355f` |
| Tag remote status | ✅ Published on `origin` (verified 2026-06-11) |
| Working tree | Clean — `main` up to date with `origin/main` |
| Package version | `0.1.0` (`package.json`) |

---

## 2. Migration Status

| Milestone | Status |
|-----------|--------|
| HTML reference system adoption | ✅ COMPLETE — promoted to `main` at `7f6355f` |
| Cinematic atmosphere layers (legacy) | ⛔ RETIRED — superseded by HTML reference compositions |
| Visual palette | Ivory / umber (HTML reference) |
| Typography stack | Cormorant Garamond + Inter + Space Mono |
| Layout system | 12-column editorial grid |
| Repository restructuring | ✅ NOT REQUIRED — promotion complete, no further restructuring planned |

---

## 3. Homepage Architecture

### 3.1 Route

- **Primary route:** `/` → `app/page.tsx`
- **Secondary route:** `/work/[slug]` → `app/work/[slug]/page.tsx` (SSG, 3 cases seeded)

### 3.2 Chapter sequence (mounted on homepage)

| Order | Component | ChapterId / Instance | Narrative role |
|-------|-----------|----------------------|----------------|
| 1 | `HeroChapter` | hero | HC-01 — establishing, T04 epic |
| 2 | `MethodologyChapter` | editorial | HC-02 — strategic authority, T03 dominant |
| 3 | `SignalChapter` | cultural | HC-03 — pattern intelligence, T04 atmospheric peak |
| 4 | `CapabilitiesChapter` | human | HC-04 — operational consciousness, T03 dominant |
| 5 | `StoryscapeChapter` | editorial · instance `storyscape` | HC-05 ACT A — activation currents |
| 6 | `ShowcaseChapter` | case · instance `showcase` | HC-05 ACT B — homepage evidence layer |
| 7 | `ConversationChapter` | closing · instance `conversation` | HC-05 ACT C — invitation + coda |

**Not mounted:** `ClosingChapter` (legacy future-memory chapter; preserved at `app/components/cinematic/closing/` — exactly one `ChapterId "closing"` at a time).

### 3.3 Provider tree (`app/layout.tsx`)

```
ReducedMotionProvider
 └─ IrregularityProvider
     └─ LenisProvider
         └─ MotionProvider
             └─ TransitionDirectorProvider
                 └─ NarrativeTimelineProvider
                     └─ GlobalCursorProvider
                         ├─ WebGLRoot
                         ├─ SystemFrame
                         ├─ SystemMetaNav
                         ├─ SystemCursor
                         ├─ {children}
                         ├─ TransitionLayer
                         ├─ SystemLoader
                         └─ SystemGrain
```

### 3.4 System layer

| Component | Role |
|-----------|------|
| `WebGLRoot` | Single R3F canvas singleton |
| `SystemFrame` | 2vw architectural inset border |
| `SystemMetaNav` | Top corners + clock metadata |
| `SystemCursor` | Dual cursor leaf |
| `TransitionLayer` | T3 transition veil |
| `SystemLoader` | Site intake loader (000→100) |
| `SystemGrain` | Cinematic grain overlay |

### 3.5 Engine modules (`app/lib/`)

| Module | Path | Status |
|--------|------|--------|
| Motion | `app/lib/motion/` | ✅ Implemented (eases, durations, stagger) |
| Scroll | `app/lib/scroll/` | ✅ Implemented (Lenis + GSAP bridge) |
| Transitions | `app/lib/transitions/` | ✅ Implemented (types, profiles, density) |
| Irregularity | `app/lib/irregularity/` | ✅ Implemented (PRNG + jitter, deterministic) |
| Timeline | `app/lib/timeline/` | ✅ Implemented (types) |
| WebGL tunnel | `app/lib/webgl/tunnel.ts` | ✅ Implemented |

### 3.6 Media primitives

- `EditorialImage` — editorial image with locked aspect ratios
- `HeroImage` — hero-tier image treatment
- `AtmosphericPlaceholder` — placeholder plates (real assets pending)

### 3.7 Case content registry

- `content/work/registry.ts` — 3 cases: `sample-case`, `liturgia-del-estreno`, `materia-que-recuerda`
- Internal route at `/work/[slug]` with `generateStaticParams`

---

## 4. Stack (verified `package.json`)

| Dependency | Version |
|------------|---------|
| next | 16.2.6 |
| react / react-dom | 19.2.4 |
| typescript | ^5 |
| tailwindcss | ^4 |
| gsap | ^3.15.0 |
| lenis | ^1.3.23 |
| three | ^0.184.0 |
| @react-three/fiber | ^9.6.1 |
| @react-three/drei | ^10.7.7 |
| framer-motion | ^12.38.0 |
| tunnel-rat | ^0.1.2 |

---

## 5. Governance Layer

| Layer | Location | Count |
|-------|----------|-------|
| Cursor rules | `.rules/*.mdc` | 18 files |
| Governance docs | `docs/*.md` | 17 files + changelogs |
| Agent specs | `agents/*.md` | 4 agents + `AGENTS.md` |
| Changelogs | `docs/changelogs/` | 2 entries (2026-05-13 baseline, 2026-06-11 film snapshot) |

---

## 6. Repository Status

| Item | State |
|------|-------|
| Branch `main` | Canonical, synced with remote |
| Branch `visual-migration-html-system` | Exists locally and on remote — migration merged; branch is historical |
| Uncommitted changes | None |
| Pending restructuring | None |
| `MASTER_STATE.md` reconciliation | ⏳ Pending Human Director authorization (known stale — see discrepancy report) |

---

## 7. De-Facto Development Phase

**Declared in `MASTER_STATE.md`:** HERO SYSTEM MODULARIZATION (stale).

**Actual phase at this snapshot:** POST-PROMOTION RECONCILIATION — HTML reference system live on `main`; film homepage complete (7 chapters); asset integration and documentation reconciliation are the forward work.

---

## 8. Forward Work (non-blocking)

1. Asset Integration Sprint — replace `AtmosphericPlaceholder` with real plates per `docs/ASSET_SYSTEM.md`
2. `MASTER_STATE.md §3` reconciliation — phase table, decisions log, open questions (Human Director authorization required)
3. Case Intelligence expansion — enrich non-sample cases, define `/work` index narrative
4. Internal pages beyond `/work/[slug]` — about, contact, work index (not yet implemented)

---

## 9. Snapshot Signature

> Post-promotion reconciliation snapshot. No code, design, content, architecture, routing, provider, or registry modifications performed. Documentation-only deliverable. Tag `v0.1.0-strategicland-html-system` published and verified on remote.
