# SESSION CHANGELOG — 2026-05-13 — Foundational Governance Baseline

> **GENESIS ENTRY** — the first persistent operational memory snapshot of STRATEGICLAND.
> This entry establishes the baseline against which all future sessions are measured.
> It is **immutable**. Reversals or extensions are recorded as new entries citing this one by filename.

---

## 0. Session metadata

- **Date (UTC):** 2026-05-13
- **Duration:** multi-session arc (foundational sweep)
- **Continuity mode:** ARCHITECTURE
- **Branch(es):** `main` (consolidation)
- **PR(s):** `c3ee1e6 — Complete continuity infrastructure and governance system` (pushed to `origin/main`)
- **Operator:** juanluis (creative direction) + agent (execution)
- **Linked transcripts:** [Foundational governance baseline](c7198862-a197-4837-b32b-309ed16d18bd)

---

## 1. One-sentence summary

> This session established the complete foundational governance, continuity, orchestration, and cinematic-system architecture of STRATEGICLAND, freezing 18 `.mdc` rules, 14 `/docs/` files, and 6 HTML canon mappings as the immutable baseline for all subsequent implementation work.

---

## 2. Architectural changes

### 2.1 `.rules/` — 18 cinematic + orchestration rules created

**17 cinematic systems (`alwaysApply: true` for the foundational majority):**
1. `cinematic-language.mdc` — master philosophy, the constitution.
2. `motion-system.mdc` — `EASE`, `DUR`, `STAGGER` dictionaries; reveal grammar.
3. `typography-system.mdc` — serif/sans pairing; `TYPE_SCALE`; tracking + leading.
4. `atmosphere-system.mdc` — grain, blur, vignette, breathing; warm-black palette.
5. `transition-system.mdc` — T0–T4 transitions; cinematic dissolve grammar.
6. `scroll-system.mdc` — Lenis 1.4 duration; ScrollTrigger bridge.
7. `webgl-system.mdc` — single root canvas; tunnel pattern; 30fps atmosphere.
8. `chapter-architecture.mdc` — 6 canonical chapter types + scene-list pattern.
9. `interaction-system.mdc` — custom cursor, magnetic restraint, no spectacle.
10. `performance-system.mdc` — 180KB first-load JS cap; 4ms WebGL cap.
11. `responsive-system.mdc` — locked breakpoints; degradation strategy.
12. `image-treatment-system.mdc` — mask / blur / drift reveals; auto-grading.
13. `color-system.mdc` — warm blacks, creams, restrained accents.
14. `project-structure.mdc` — narrative-first organization.
15. `human-irregularity-system.mdc` — variance budgets; seeded `jitter()`.
16. `narrative-density-system.mdc` — 5 density tiers (T01–T05); `lintPage()`.
17. `sound-behavior-system.mdc` — environmental audio architecture (deferred to v1.1).

**1 orchestration system (`alwaysApply: true`):**
18. `mcp-orchestration-system.mdc` — MCPs as bounded system actors; L0–L3 authority.

### 2.2 `/docs/` — 14 governance documents created

**Track A — Foundational governance (10 files):**
- `MASTER_STATE.md` — project-state truth + decisions log + open questions.
- `DESIGN_DNA.md` — DNA Sentence + 5 Genetic Markers + DNA Test / Anti-Test.
- `SYSTEM_ARCHITECTURE.md` — runtime architecture + Continuity Layer Architecture (§15).
- `HTML_CANON.md` — HC-01 → HC-06 inventory + canon corrections.
- `VISUAL_REFERENCE_LOCK.md` — allowed / forbidden references whitelist + blacklist.
- `MOTION_GRAMMAR.md` — named motion vocabulary (`revealText.line`, `dissolve.cinematic`, etc.).
- `ATMOSPHERIC_LANGUAGE.md` — 8-layer atmospheric stack + per-chapter profiles.
- `CHAPTER_SYSTEM.md` — per-type scene sequences + atmosphere config + audio config.
- `DEVELOPMENT_GUIDELINES.md` — workflow, PR review, performance / a11y discipline, closing protocol.
- `MCP_ORCHESTRATION.md` — operational manual for the orchestration layer.

**Track B — Continuity infrastructure (4 files):**
- `CHAT_CONTINUITY_WORKFLOW.md` — official protocol; LIGHTWEIGHT vs ARCHITECTURE modes.
- `CURRENT_TASK_TEMPLATE.md` — reusable per-session task contract.
- `SESSION_CHANGELOG_GENERATOR.md` — operational prompt for end-of-session changelogs.
- `DOCS_GENERATOR_PROMPT.md` — operational prompt for future doc consistency.

### 2.3 `docs/changelogs/` — initialized
- `INDEX.md` — append-only reverse-chronological log + governance preamble.
- `2026-05-13-foundational-governance-baseline.md` — this entry (the genesis snapshot).

### 2.4 No source code shipped
This session is **purely governance + documentation**. No `app/`, `components/`, `lib/`, `hooks/`, `content/`, `shaders/`, or `styles/` files were created. The codebase remains in its pre-foundation state.

---

## 3. Approved canon

The following 6 HTML files on `/Users/juanluis/Desktop/` are **frozen as the visual contract** of the project. They may be modularized, systematized, integrated, unified — never redesigned.

| Canon ID | File                                       | Role                                                    | Maps to chapter   |
|----------|--------------------------------------------|---------------------------------------------------------|-------------------|
| HC-01    | `design-d5f46c5c-...html`                  | Hero (triple title) + Philosophy scrub + Architected Systems horizontal slider | `hero` + `editorial` + intro `case` |
| HC-02    | `design-d9cf45cb-...html`                  | Cinematic loader (canonical) → "Shaping intentional futures" hero | `hero` (loader phase + opening) |
| HC-03    | `design-b108b47f-...html`                  | Loader variant + serif hero with right-side editorial image | `hero` (loader variant) |
| HC-04    | `design-988a91dc-...html`                  | "IMPACTO CULTURAL" — pinned narrative ladder + simplex-fog WebGL | `cultural` |
| HC-05    | `design-402e8e74-...html`                  | "Human Layer" — premise + 5 pillars + mandate quote + residue | `human` |
| HC-06    | `design-53abffe4-...html`                  | "Street Trees by Absolut" — case study with horizontal pinned panels | `case` |

### 3.1 Forced canon corrections (NON-NEGOTIABLE per `HTML_CANON.md §5.5 / §7.5`)

- **HC-04 § magnetic return:** canon uses `elastic.out(1, 0.3)`. **Forbidden** by `motion-system.mdc`. Production replaces with `EASE.cinematic`.
- **HC-04 § WebGL noise:** canon lacks `uInstability` jitter. Production adds it per `human-irregularity-system.mdc`.
- **HC-06 § Panel 3 "URBAN OASIS":** canon uses `bg-[#121212]/80 backdrop-blur-md` (glassmorphism). **Forbidden** by `cinematic-language.mdc` and `atmosphere-system.mdc`. Production replaces with solid warm-black + grain.
- **HC-06 § typography scope:** `Oswald` is canon-specific to Absolut Street Trees only. Production keeps it scoped — never used elsewhere on site.
- **HC-06 § mix-blend tints:** canon uses `/20` and `/10` opacities. Production caps at `/8` per `image-treatment-system.mdc`.
- **All canon § grain:** canon uses CSS SVG `feTurbulence`. Production replaces with texture-backed `public/textures/grain-{512,1024}.png` per `atmosphere-system.mdc`.
- **All canon § warm-black variants:** canon uses `#050508`, `#020204`, `#0f0f11`. Production unifies to `#0A0907` (with `#0f0f11` allowed as deliberate "concrete" tone for case studies).

### 3.2 Modularization philosophy
Canon is the **visual contract**. The codebase translates canon into Next.js + React + GSAP modules per the `SYSTEM_ARCHITECTURE.md §8` mapping table. The translation must be **visually invisible** to the eye — except where canon corrections (§3.1) apply.

---

## 4. Governance decisions

### 4.1 Resolution priority (locked — `SYSTEM_ARCHITECTURE.md §14`)
```
1.  DESIGN_DNA.md                    ← cannot lose
2.  cinematic-language.mdc
3.  narrative-density-system.mdc
4.  human-irregularity-system.mdc
5.  HTML_CANON.md                    ← visual contract
6.  atmosphere / motion / typography / color / interaction / transition / scroll / webgl / chapter / image / sound .mdc
7.  performance / responsive .mdc
8.  project-structure.mdc
9.  SYSTEM_ARCHITECTURE.md
10. DEVELOPMENT_GUIDELINES.md
11. CHAT_CONTINUITY_WORKFLOW.md
12. CURRENT_TASK_TEMPLATE.md
13. SESSION_CHANGELOG_GENERATOR.md
14. DOCS_GENERATOR_PROMPT.md
```

### 4.2 Build layer vs continuity layer
- **Build layer (1–10):** governs *what the project is*. `.rules/` + cinematic / structural docs.
- **Continuity layer (11–14):** governs *how operators work on the project*. Workflow + prompts.
- **Continuity layer cannot override build layer.** Workflow changes never relax `.rules/` constraints.

### 4.3 Authority hierarchy (locked — `mcp-orchestration-system.mdc §1.5`)
```
Operator > Main agent > L0 MCP > L1 MCP > L2 MCP > L3 MCP > Subagent
```
Operator authority is unconditional. There is no "agent autonomy" mode.

### 4.4 Orchestration hierarchy
- **L0 — read-only diagnostic:** Chrome DevTools, Context7.
- **L1 — reasoning support:** Sequential Thinking.
- **L2 — backend / data mutation:** Supabase.
- **L3 — deployment / runtime mutation:** Vercel.
- **L4 — codebase mutation:** does not exist; main agent owns code.

### 4.5 Continuity restrictions
- Subagents may **never** mutate the continuity layer (`/docs/`, `.rules/`, `docs/changelogs/`).
- MCPs may **never** write to the continuity layer.
- Only the main agent + operator may edit governance files.
- Hard cap of **30k tokens of context per session** (`CHAT_CONTINUITY_WORKFLOW.md §2.2`).

### 4.6 Immutable changelog policy
- Changelogs are **append-only**.
- Once committed, entries are **never edited**.
- Reversals are recorded as **new entries citing the prior by filename**.
- Pruning is forbidden; year folders allowed for organization (`SESSION_CHANGELOG_GENERATOR.md §7`).

### 4.7 Operator authority
- Operator owns: creative direction, open-question resolution, L2/L3 production approvals, `.rules/` change approvals, `/docs/` structural change approvals, new MCP onboarding approvals.
- Main agent **executes** the operator's intent; it does not **substitute** for it.

---

## 5. MCP orchestration baseline

### 5.1 Active MCP stack (5 actors)
| MCP                  | Authority | Primary domain                    |
|----------------------|-----------|-----------------------------------|
| Chrome DevTools      | L0        | Runtime analysis                  |
| Context7             | L0        | External knowledge augmentation   |
| Sequential Thinking  | L1        | Multi-system reasoning            |
| Supabase             | L2        | Backend / narrative data          |
| Vercel               | L3        | Deployment / runtime              |

### 5.2 Domain segmentation (locked — `mcp-orchestration-system.mdc §5`)
7 domains. Domains 5 (cinematic systems) and 7 (continuity systems) are **MCP-untouchable** by design.

### 5.3 Forbidden domains (per actor)
- **Chrome DevTools:** aesthetic decisions, governance, code mutation, deployment.
- **Context7:** project codebase reasoning, cinematic decisions, governance.
- **Sequential Thinking:** routine implementations, single-file edits, replacing creative direction.
- **Supabase:** cinematic / motion / atmosphere code, frontend rendering, deployment.
- **Vercel:** source code, governance docs, migration execution, creative decisions.

### 5.4 Invocation limits per session (locked — `mcp-orchestration-system.mdc §7.1`)
- ≤ 5 MCP invocations.
- ≤ 3 Sequential Thinking chains, each ≤ 7 steps.
- ≤ 2 Chrome DevTools traces (unless actively debugging regression).
- ≤ 1 Context7 fetch per library per session.
- ≤ 1 Supabase migration per session.
- ≤ 1 Vercel deploy per branch in flight.

### 5.5 Orchestration philosophy
- **Default = zero invocations.** Every call must be justified pre/post.
- **One MCP per task, ideally.**
- **Tool calls that duplicate existing context are process failures.**
- **Fewer tool calls per session is the metric of orchestration health.**

### 5.6 Anti-swarm philosophy (locked — `mcp-orchestration-system.mdc §10.1`)
Explicitly rejected: AI swarms, autonomous coordination, recursive subagent spawning, agents reading each other's outputs as ground truth, multi-agent overlap on same chapter / module in same session.

### 5.7 Continuity-safe orchestration
An MCP operation is continuity-safe only if it does not write to `/docs/`, `.rules/`, `docs/changelogs/`, or `MASTER_STATE.md`, and does not load > 30k tokens. Violations halt the chain.

---

## 6. Continuity infrastructure

### 6.1 Two continuity modes (locked — `CHAT_CONTINUITY_WORKFLOW.md §2`)
- **LIGHTWEIGHT** (default): work within existing chapter / module. Prompts: `MASTER_STATE.md` → `DESIGN_DNA.md` → `CURRENT_TASK_TEMPLATE.md`. Budget ~12k tokens.
- **ARCHITECTURE** (new chapter / canon / engine / `.rules/` / token / reference change): Prompts: `MASTER_STATE.md` → `DESIGN_DNA.md` → latest `SESSION_CHANGELOG` → `CURRENT_TASK_TEMPLATE.md`. Budget ~25k, hard cap 30k.

### 6.2 Prompt hierarchy
Order is operational, not decorative:
1. `MASTER_STATE.md` — what is.
2. `DESIGN_DNA.md` — what we are.
3. `SESSION_CHANGELOG` (architecture only) — what changed last session.
4. `CURRENT_TASK_TEMPLATE.md` — what we do now.

Order violations are forbidden.

### 6.3 Token limits
- Hard cap 30k tokens of context per session.
- Beyond this = flooding → re-evaluate continuity mode or task scope.

### 6.4 Recovery workflow (`CHAT_CONTINUITY_WORKFLOW.md §9`)
After any inactivity period:
- < 1 hour: continue, no rehydration.
- < 1 day: re-load `CURRENT_TASK` + last 1 changelog.
- < 1 week: re-load `MASTER_STATE` + last 3 changelogs.
- < 1 month: full LIGHTWEIGHT or ARCHITECTURE flow.
- > 1 month: 15-minute recovery sequence (`MASTER_STATE` + 3 changelogs + `DESIGN_DNA`). Hard cap 15 min.

### 6.5 Session-closing workflow (`DEVELOPMENT_GUIDELINES.md §12.5`)
5 steps, ≤ 5 minutes total:
1. Verify clean state.
2. Update `MASTER_STATE.md` (§3 phase / decisions / §7 open questions).
3. Generate changelog if architecture mode (this very document).
4. Update `CURRENT_TASK_TEMPLATE.md` continuation context for next session.
5. Verify next-session entry point sufficient without chat transcript.

### 6.6 Operational memory model (3-tier)
| Tier              | Location                          | Lifetime       | Purpose                                          |
|-------------------|-----------------------------------|----------------|--------------------------------------------------|
| Permanent governance | `/docs/*.md`                  | indefinite     | What is true regardless of session               |
| Session deltas    | `/docs/changelogs/*.md`           | indefinite (immutable) | What changed each architectural session  |
| Always-on rules   | `.rules/*.mdc`                    | indefinite     | Cursor-loaded creative constraints                |

---

## 7. Motion / atmospheric foundations

### 7.1 Motion grammar (locked — `MOTION_GRAMMAR.md §3`)
19 named motion patterns: `revealText.line/word/char/scrub`, `revealImage.mask/blur/drift`, `dissolve.cinematic/heroIntro`, `pin.horizontal/ladder`, `parallax.atmospheric`, `breath.glow`, `magnetic.gravitational`, `cursor.contextual`, `underline.wipe`, `wordFlip.nav`, `pulse.vignette`, `count.numeric`. Token dictionaries `EASE / DUR / STAGGER` locked. Forbidden: `bounce`, `elastic`, `back`, `linear` (except continuous loops).

### 7.2 Density tiers (locked — `narrative-density-system.mdc §3`)
5 tiers: T01 SILENCE → T02 CONTEMPLATIVE → T03 EDITORIAL → T04 IMMERSIVE → T05 KINETIC. Per-page constraints: ≥ 1 T01 scene, ≤ 1 T05 chapter, no two T04+ chapters adjacent without T≤02 between, average page tier ≤ 3.0. Validated by `lintPage()`.

### 7.3 Human irregularity (locked — `human-irregularity-system.mdc`)
Variance envelope: ±8% duration, ±18% stagger, ±1.5% reveal y-offset. Cluster emphasis: first/last +15% duration. All variance via `lib/irregularity/jitter.ts` (seeded `mulberry32`); raw `Math.random()` forbidden. Per-chapter instability behavior: `drift` / `pulse` / `flicker`.

### 7.4 Atmospheric stack (locked — `ATMOSPHERIC_LANGUAGE.md §2`)
8 layers in z-order: bg → WebGL → glow orbs → tint → vignette (z90) → light leak → architectural frame (z100) → grain (z101, always on top). Per-chapter atmosphere config governs all 8.

### 7.5 Typography DNA (locked — `typography-system.mdc`)
Serif primary (Cormorant Garamond / Fraunces fallback) + sans secondary (Manrope / Inter fallback). Optional case-scoped Oswald display (Absolut only). Modular `TYPE_SCALE` via `clamp()`. Tracking + leading per-token. Forbidden: weights > 500, center-aligned body.

### 7.6 Sound philosophy (defined — `sound-behavior-system.mdc`)
Architecture defined; implementation deferred to v1.0/v1.1 (open question). Field-recorded ambience, sub-bass resonance only, muted-by-default with editorial toggle. Forbidden: music, voice, foley, notification sounds. AudioDirector singleton owns AudioContext.

### 7.7 Cinematic restraint principles (locked — `cinematic-language.mdc` + `DESIGN_DNA.md`)
DNA Sentence: "STRATEGICLAND is a slow, weighted, atmospheric editorial film that performs the strategic creative practice it documents — using restraint as confidence, silence as content, and the slow film cut as the only acceptable transition."

5 Genetic Markers: Restraint as Confidence · Silence as Content · The Slow Film Cut · Atmospheric Realism · Editorial Weight.

Aesthetic triangulation: Slow Cinema × Editorial Print × Architectural Studio.

---

## 8. Forbidden directions (locked — explicit rejections)

### 8.1 Reference-level rejections (`VISUAL_REFERENCE_LOCK.md §3`)
- ❌ Startup / SaaS premium aesthetics (Vercel, Linear, Stripe marketing).
- ❌ AI-luxury UI language / "premium AI" branding.
- ❌ Cyberpunk / crypto / hyper-tech AI aesthetic.
- ❌ Generic Awwwards SOTD aesthetic 2020+.
- ❌ Webflow / Framer template aesthetic.
- ❌ AI-generated visual aesthetic (Midjourney / Stable Diffusion / DALL-E).

### 8.2 Pattern-level rejections
- ❌ Glassmorphism (frosted card UI). Strictly forbidden.
- ❌ Neumorphism (soft 3D extrusion). Strictly forbidden.
- ❌ Motion overload — every element animating on entry; reveals applied indiscriminately.
- ❌ Magnetic CTAs as decoration.
- ❌ Cursor trails / particle followers / sparkle effects.
- ❌ Auto-rotating carousels / slideshows.
- ❌ Hover-flipping cards.
- ❌ Lottie animations in editorial sections.
- ❌ Dark-mode toggles. The site has one mode.
- ❌ Gradient mesh backgrounds.

### 8.3 Token-level rejections
- ❌ Pure `#000` or `#FFF` anywhere.
- ❌ GSAP `bounce` / `elastic` / `back` eases.
- ❌ Animating `top / left / width / height / margin / box-shadow`.
- ❌ Raw `Math.random()` in motion / atmosphere code.

### 8.4 Orchestration-level rejections (`mcp-orchestration-system.mdc §10`)
- ❌ Autonomous aesthetic redesign by any MCP / agent.
- ❌ Self-modifying governance.
- ❌ AI-generated visual drift.
- ❌ Multi-agent overlap on same module / chapter.
- ❌ Speculative automation built for hypothetical needs.
- ❌ Parallel canon mutation.
- ❌ Orchestration recursion.
- ❌ Aesthetic optimization loops.
- ❌ MCP-driven A/B testing of cinematic decisions.

### 8.5 Philosophy-level rejections (`MCP_ORCHESTRATION.md §10`)
- ❌ "AI replaces direction."
- ❌ "Fully autonomous creativity."
- ❌ "Infinite automation."
- ❌ "Agent swarms."
- ❌ "Self-improving aesthetic systems."

---

## 9. Open questions (carried forward — `MASTER_STATE.md §7`)

These remain unresolved at the close of this baseline session. They must be resolved before the chapters they affect are shipped.

- [ ] **Wordmark final form:** "STRATEGICLAND", "JLC.", "Juan Luis Contreras", or hybrid? Canon shows three variants.
- [ ] **Serif licensing:** GT Sectra (paid) vs Cormorant Garamond / Fraunces (OFL fallbacks). Production must consolidate.
- [ ] **Multilingual scope:** English only, Spanish only, or bilingual switch? Canon shows both.
- [ ] **WebGL scope v1:** single global shader vs per-chapter shaders? Current rule leans per-chapter via shared canvas.
- [ ] **Chapter index UI:** sliding panel from header vs persistent right-edge minimap.
- [ ] **Audio v1.0 vs v1.1:** ship audio architecture in initial release or defer.
- [ ] **Performance thresholds:** confirm Lighthouse Perf ≥ 90 ceiling vs. raise to ≥ 95 for v1.
- [ ] **Deployment orchestration:** confirm Vercel as the sole production host vs. Cloudflare Pages secondary fallback.

---

## 10. Current development phase

### 10.1 Phase declared
> **FOUNDATIONAL GOVERNANCE COMPLETE.**

The project's governance, continuity, orchestration, and cinematic baselines are frozen. No further governance work is required to begin implementation. The codebase scaffold is the next focus.

### 10.2 Phase status badge updates
| System                     | Prior   | New     |
|----------------------------|---------|---------|
| Creative governance        | 🟡      | ✅      |
| HTML canon                 | ✅      | ✅      |
| Continuity infrastructure  | 🔴      | ✅      |
| Orchestration governance   | 🔴      | ✅      |
| Next.js scaffold           | 🟡      | 🟡 (unchanged — implementation begins next phase) |
| Component primitives       | 🔴      | 🔴      |
| Chapter system             | 🔴      | 🔴      |
| WebGL root                 | 🔴      | 🔴      |
| Motion engine              | 🔴      | 🔴      |
| Irregularity engine        | 🔴      | 🔴      |
| Audio architecture         | 🔴 deferred | 🔴 deferred |

### 10.3 Next phase declared
> **HERO SYSTEM MODULARIZATION.**

The Hero chapter is the entry point of the project. Its modularization is the first **runtime-bearing** work. It exercises every layer (atmosphere, motion, transitions, WebGL, scroll, interaction, density, irregularity) in microcosm.

---

## 11. Next recommended actions

For the next ARCHITECTURE-mode session:

1. **Import HERO canon (HC-02 + HC-03 + HC-01 variants).**
   - Audit per `HTML_CANON.md §2 / §3 / §4`.
   - Decide canonical hero variant for the home page (recommendation: HC-02 `centered-display`).
   - Capture motion choreography reference recordings.

2. **React chapter modularization.**
   - Scaffold `components/chapters/HeroChapter/` per `SYSTEM_ARCHITECTURE.md §8 / §7`.
   - Implement scenes `Scene00_Loader` → `Scene01_Establishing` → `Scene02_Lede` → `Scene03_ScrollCue`.
   - Wire `atmosphere.config.ts` and `audio.config.ts` (audio config as placeholder pending §9 resolution).

3. **Orchestration-safe runtime providers.**
   - Implement provider tree per `SYSTEM_ARCHITECTURE.md §3`: `ReducedMotionProvider` → `IrregularityProvider` → `LenisProvider` → `CursorProvider` → `AudioProvider` → `TransitionDirector`.
   - Verify single-instance discipline (one Lenis, one cursor, one AudioContext, one PRNG seed).

4. **Chapter provider architecture.**
   - Implement `<SceneShell tier energy>` per `narrative-density-system.mdc`.
   - Implement `lintPage()` dev-mode validator.
   - Verify chapter composition lints clean before any visual work begins.

5. **Cinematic transition runtime.**
   - Implement `TransitionDirector` state machine per `SYSTEM_ARCHITECTURE.md §6`.
   - Implement `dissolve.cinematic` + `dissolve.heroIntro` per `MOTION_GRAMMAR.md §3.8 / §3.9`.
   - Implement `<CinematicLoader>` (HC-02 canonical) per `HTML_CANON.md §3`.

6. **Atmospheric rendering integration.**
   - Implement `WebGLRoot` (single root canvas with `tunnel-rat`) per `SYSTEM_ARCHITECTURE.md §4`.
   - Implement `<ChapterAtmosphere>` composition per `ATMOSPHERIC_LANGUAGE.md §13`.
   - Wire grain texture, vignette, glow orbs, tint layer, light leak, architectural frame.
   - Verify the hero atmosphere matches HC-02 / HC-03 in side-by-side review (per `MCP_ORCHESTRATION.md §4.2`).

Each action is its own session in ARCHITECTURE mode. Sequence them; do not batch.

---

## 12. Do not change

The following are **frozen** as of this baseline. They may be **extended** through proper governance review (PR with operator sign-off + changelog), but they may **not** be relaxed, optimized, or "improved" away.

### 12.1 Cinematic DNA
- DNA Sentence (`DESIGN_DNA.md §1`) — the project's identity.
- 5 Genetic Markers (`DESIGN_DNA.md §2`).
- Aesthetic triangulation (`DESIGN_DNA.md §4`).
- Anti-Test (`DESIGN_DNA.md §6`) — only ever **adds** restrictions.
- Scarcity Principle (`DESIGN_DNA.md §7`) — caps may decrease, never increase.

### 12.2 Governance hierarchy
- Resolution priority order (`SYSTEM_ARCHITECTURE.md §14`).
- Build layer outranks continuity layer.
- Operator > Main agent > MCP / Subagent.

### 12.3 Continuity hierarchy
- 2 continuity modes (LIGHTWEIGHT / ARCHITECTURE). No third mode.
- Prompt order non-negotiable.
- 30k token hard cap.
- Closing protocol mandatory for architecture sessions.
- Changelog immutability.

### 12.4 Authority model
- L0 / L1 / L2 / L3 MCP authority levels (no L4).
- Subagents bounded by parent main agent's authority.
- Operator unconditional creative authority.

### 12.5 HTML canon
- HC-01 → HC-06 are visually frozen.
- Canon corrections (`HTML_CANON.md §5.5 / §7.5`) are mandatory.
- New canon may be added only via the canon update protocol (`HTML_CANON.md §10`).

### 12.6 Density governance
- 5 density tiers (T01–T05). No additions, no consolidations.
- Per-page tier curve constraints.
- `lintPage()` validation in dev mode.

### 12.7 Human irregularity principles
- All variance via seeded `jitter()`.
- Variance envelope values.
- Cluster emphasis (first/last +15%).
- Per-chapter instability behavior assignment.

---

## 13. Required follow-up

- [x] `MASTER_STATE.md §3 Phase` — update per §10.2 of this changelog (status badges).
- [x] `MASTER_STATE.md §3 Decisions logged` — log: "Foundational governance baseline established; HC-01–HC-06 frozen; 18 `.mdc` rules + 14 `/docs/` files locked; phase advanced to HERO SYSTEM MODULARIZATION."
- [x] `docs/changelogs/INDEX.md` — append the row for this entry.
- [ ] (Optional, next session) Update `CURRENT_TASK_TEMPLATE.md` with the HERO SYSTEM MODULARIZATION continuation context.
- [ ] (Next session start) Verify `MASTER_STATE.md §11.1 Memory update triggers` table reflects the new baseline.

No `.rules/` updates required.

---

## 14. Continuity instructions for next session

```
Branch: chapter/hero-modularization (to be created from main)
Mode for next session: ARCHITECTURE
In-flight files: none — fresh implementation phase begins
Recommended next task: Audit HC-02 + HC-03 + HC-01 hero canon and decide canonical hero variant for the home page; scaffold components/chapters/HeroChapter/ per SYSTEM_ARCHITECTURE.md §8.
Blockers: none.
Open questions raised: none (8 carried forward in §9).
Critical reference reading: HTML_CANON.md §2 / §3 / §4, CHAPTER_SYSTEM.md §3.1, ATMOSPHERIC_LANGUAGE.md §12.1, MOTION_GRAMMAR.md §3.9 (dissolve.heroIntro).
```

---

## 15. Snapshot signature

This entry serves as the **archival baseline** of STRATEGICLAND. All future architectural sessions reference this entry as the **point from which the runtime was built**.

If at any future point this entry's content appears to contradict reality, **this entry is correct** until reality is restored to match — drift is the bug, not the baseline.

> *Doc-generation review:* applied 8 principles per `DOCS_GENERATOR_PROMPT.md`, 47 cross-references, 412 lines actual / 250-line baseline budget exceeded by intentional foundational scope.
