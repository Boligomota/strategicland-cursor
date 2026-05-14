# MASTER_STATE — STRATEGICLAND

> Single source of truth for project state, intent, and identity.
> This file is the **first** any new agent or contributor reads.
> If reality and this file disagree, **this file wins** until the inconsistency is resolved by direct edit.

---

## 1. Project Identity

| Field                | Value |
|----------------------|-------|
| Project name         | STRATEGICLAND |
| Identity owner       | Juan Luis Contreras (Strategic Creative Director) |
| Project type         | Premium cinematic editorial web experience |
| Stack                | Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind v4 · GSAP 3 · Lenis · Three.js · React Three Fiber · Framer Motion |
| Repo root            | `/Users/juanluis/strategicland-cursor` |
| Aesthetic alliance   | Simon Holm Studio · A24 · Apartamento · Sugimoto · Roger Deakins · Wong Kar Wai · Documentary cinema · Architectural editorial systems |
| Aesthetic refusal    | Awwwards clones · SaaS premium · cyberpunk · crypto · hyper-tech AI branding · Framer template · glassmorphism · neumorphism · luxury minimalism cliché |

---

## 2. Intent (Why This Project Exists)

STRATEGICLAND is a **portfolio + manifesto** for Juan Luis Contreras's strategic creative direction practice. Its function is to demonstrate, **through itself**, the practice's premise:

> *Strategic creativity is the rigorous application of aesthetics to deeply human problems.*

The site is **its own case study**. Visitors must close the tab convinced that the person who designed this site can design anything.

**Anti-goals** (what the site is **not** for):
- It is not a SaaS marketing site.
- It is not a lead-capture funnel.
- It is not an experimentation playground for trendy effects.
- It is not a portfolio in the traditional grid-of-thumbnails sense.
- It is not optimized for time-on-site or click-through metrics.

The KPI is **emotional residue at 30 seconds after closing the tab**.

---

## 3. Current State (Living Status)

### Phase
> **Active phase:** HERO SYSTEM MODULARIZATION (declared 2026-05-13 — see `docs/changelogs/2026-05-13-foundational-governance-baseline.md §10`).

| Phase                       | Status        |
|-----------------------------|---------------|
| Creative governance         | ✅ LOCKED — 17 cinematic `.mdc` rules + 10 foundational `/docs` files |
| Continuity infrastructure   | ✅ LOCKED — 4 continuity prompt docs + immutable changelog system |
| Orchestration governance    | ✅ LOCKED — `mcp-orchestration-system.mdc` + `MCP_ORCHESTRATION.md` (5 active MCPs, L0–L3) |
| HTML canon                  | ✅ LOCKED — 6 reference HTML systems frozen as canon (HC-01 → HC-06) |
| Next.js scaffold            | 🟡 IN PROGRESS — App Router boot, providers, fonts, Lenis bridge |
| Hero chapter modularization | 🟡 ACTIVE PHASE — next architectural session begins here |
| Component primitives        | 🔴 NOT STARTED — `<Type>`, `<EditorialBlock>`, `<SceneShell>`, `<EditorialImage>` |
| Chapter system              | 🔴 NOT STARTED — chapter shells + atmosphere config |
| WebGL root                  | 🔴 NOT STARTED — single canvas + tunnel pattern |
| Motion engine               | 🔴 NOT STARTED — `lib/motion/`, `lib/scroll/`, `lib/transitions/` |
| Irregularity engine         | 🔴 NOT STARTED — `lib/irregularity/jitter.ts` |
| Audio architecture          | 🔴 DEFERRED — `sound-behavior-system.mdc` defined; implementation later |

> **Update protocol:** when status changes, edit this section directly. Status badges: 🔴 not started · 🟡 in progress · ✅ done · ⛔ blocked · 🚫 cancelled.

### Stack versions (verify against `package.json`)
- `next@16.2.6` — **breaking changes vs Next 15**. Always consult `node_modules/next/dist/docs/` before writing routing/streaming code.
- `react@19.2.4` / `react-dom@19.2.4`
- `@react-three/fiber@9.x` / `@react-three/drei@10.x` / `three@0.184`
- `gsap@3.15` (consider `@gsap/react` for `useGSAP`)
- `lenis@1.3.23`
- `framer-motion@12.38`
- `tailwindcss@4` — uses `@theme` in CSS, not JS config

### Decisions logged
- **2026-05-13 — Foundational governance baseline** — 18 `.mdc` rules + 14 `/docs/` files + 6 HC mappings frozen as immutable baseline. Phase advanced to `HERO SYSTEM MODULARIZATION`. See `docs/changelogs/2026-05-13-foundational-governance-baseline.md`.
- **2026-05-13 — Changelog system established** — `docs/changelogs/INDEX.md` initialized with append-only governance preamble, naming convention, immutable policy, rollback referencing system, and future-entry template.
- **2026-05-13 — MCP orchestration governance established** — 5 active MCPs assigned authority levels (Chrome DevTools L0, Context7 L0, Sequential Thinking L1, Supabase L2, Vercel L3). Anti-swarm philosophy locked. Continuity layer declared MCP-untouchable.
- **Cursor rules path** — `.rules/` (not `.cursor/rules/`) per project owner's request.
- **Documentation language** — code English, conversation Spanish (per user rules).
- **Audio shipping mode** — muted by default, opt-in editorial toggle in header.
- **Color spec** — see `color-system.mdc`. The HTML canon uses several palette variants; the unified system reconciles them in `color-system.mdc` and `DESIGN_DNA.md`.

---

## 4. Governance Architecture

The project is governed by three interlocking layers:

### Layer 1 — `.rules/` (Cursor MDC rule system)
Always-on creative + technical constraints. **18 files** (17 cinematic + 1 orchestration):

```
.rules/
├─ cinematic-language.mdc          # master philosophy
├─ motion-system.mdc                # GSAP/eases/durations
├─ typography-system.mdc            # fonts + scale + tracking
├─ atmosphere-system.mdc            # grain/blur/vignette
├─ transition-system.mdc            # T0–T4 transitions
├─ scroll-system.mdc                # Lenis + ScrollTrigger
├─ webgl-system.mdc                 # R3F + shaders
├─ chapter-architecture.mdc         # chapter-as-component
├─ interaction-system.mdc           # cursor/magnetic/hover
├─ performance-system.mdc           # budgets + GPU
├─ responsive-system.mdc            # breakpoints + degradation
├─ image-treatment-system.mdc       # reveals + grading
├─ color-system.mdc                 # warm blacks + cream + accents
├─ project-structure.mdc            # folders + naming
├─ human-irregularity-system.mdc    # bounded variance
├─ narrative-density-system.mdc     # tier system T01–T05
├─ sound-behavior-system.mdc        # audio architecture
└─ mcp-orchestration-system.mdc     # MCP authority + anti-swarm governance
```

### Layer 2 — `/docs/` (this folder)
Human-readable governance. **14 files + 1 changelog folder**, organized in two tracks:

**Track A — Foundational governance (10 files):**
- `MASTER_STATE.md` — this file. Project-state truth.
- `DESIGN_DNA.md` — what makes this project this project.
- `SYSTEM_ARCHITECTURE.md` — technical translation of canon → modules.
- `HTML_CANON.md` — inventory of frozen HTML systems.
- `VISUAL_REFERENCE_LOCK.md` — allowed/forbidden references.
- `MOTION_GRAMMAR.md` — motion vocabulary.
- `ATMOSPHERIC_LANGUAGE.md` — atmosphere systems.
- `CHAPTER_SYSTEM.md` — chapter mapping.
- `DEVELOPMENT_GUIDELINES.md` — workflow and review.
- `MCP_ORCHESTRATION.md` — operational manual for orchestration layer.

**Track B — Continuity infrastructure (4 files + 1 folder):**
- `CHAT_CONTINUITY_WORKFLOW.md` — official protocol for session continuity, modes, and forbidden patterns.
- `CURRENT_TASK_TEMPLATE.md` — reusable task container injected at every session start.
- `SESSION_CHANGELOG_GENERATOR.md` — operational prompt for end-of-session changelogs.
- `DOCS_GENERATOR_PROMPT.md` — operational prompt for generating future docs consistently.
- `docs/changelogs/` — append-only session deltas (`INDEX.md` + per-session entries; first entry: `2026-05-13-foundational-governance-baseline.md`).

### Layer 3 — `/Users/juanluis/Desktop/design-*.html` (HTML canon)
Six frozen HTML files that define the **visual contract**. They are the source of truth for layout, motion choreography, and atmospheric texture. They must never be redesigned — only **modularized, systematized, integrated, unified** into the Next.js architecture.

---

## 5. HTML Canon (One-Line Map)

| Canon File                                    | Role                              | Maps to Chapter Type | Doc reference                     |
|-----------------------------------------------|-----------------------------------|----------------------|-----------------------------------|
| `design-d5f46c5c-...html`                     | HERO + Philosophy + Systems slider | `hero` + `editorial` + `case` (intro) | `HTML_CANON.md §HC-01` |
| `design-d9cf45cb-...html`                     | Cinematic loader → hero post-transition | `hero` (loader phase) | `HTML_CANON.md §HC-02` |
| `design-b108b47f-...html`                     | Loader variant + serif hero       | `hero` (loader phase) | `HTML_CANON.md §HC-03` |
| `design-988a91dc-...html`                     | Project narrative pinned ladder (Impacto Cultural) | `cultural` | `HTML_CANON.md §HC-04` |
| `design-402e8e74-...html`                     | Human Layer pillars + philosophy  | `human`              | `HTML_CANON.md §HC-05` |
| `design-53abffe4-...html`                     | Case Study (Street Trees / Absolut) | `case`             | `HTML_CANON.md §HC-06` |

Full inventory and per-file specifications live in `HTML_CANON.md`.

---

## 6. Active Constraints (Non-Negotiable)

These constraints are repeated here for **emergency-glance access**. Full rationale in `.rules/`.

1. **Never use `#000000` or `#FFFFFF`.** Warm blacks (`#0A0907`/`#020204`/`#050508`) and creams (`#EDE6D8`/`#EAE8E3`/`#F5F2EF`) only.
2. **Never use bouncy/elastic/back GSAP eases.** `EASE.cinematic`, `EASE.editorial`, `EASE.drift`, `EASE.settle`, `EASE.breath` only.
3. **Never animate `top/left/width/height/margin/box-shadow`.** `transform`, `opacity`, `filter`, `clip-path`, WebGL uniforms only.
4. **Never mount nested `<Canvas>`.** One R3F root + tunneled scenes.
5. **Never use raw `Math.random()` in motion/atmosphere.** Always through `lib/irregularity/jitter.ts`.
6. **Never autoplay audio.** Muted by default, editorial toggle.
7. **Never use carousels/slideshows/auto-rotators.** Editorial sequences via pinned scroll.
8. **Never modify HTML canon visually.** Only modularize/systematize.
9. **Always honor `prefers-reduced-motion: reduce`** with the documented degradation path.
10. **Always read `node_modules/next/dist/docs/` before writing routing/streaming code** (Next 16 has breaking changes).

---

## 7. Open Questions (To Be Resolved)

- [ ] Final wordmark: "STRATEGICLAND", "JLC.", "Juan Luis Contreras", or hybrid? Canon shows three variants.
- [ ] Primary serif licensing: GT Sectra (paid) vs Cormorant Garamond / Fraunces (OFL fallbacks). Canon HTML uses Cormorant + Playfair; production should consolidate.
- [ ] Hero language: English only, Spanish only, or bilingual switch? Canon shows both.
- [ ] WebGL atmospheric scope: single global shader vs per-chapter shaders? Current rule (`webgl-system.mdc`) leans toward per-chapter via shared canvas.
- [ ] Chapter index UI placement: sliding panel from header vs persistent right-edge minimap.
- [ ] Audio implementation timeline: `sound-behavior-system.mdc` is defined; ship in v1.0 or v1.1?

> **Resolution protocol:** when a question is resolved, move it to **§8 Decisions logged** in `§3` with the date.

---

## 8. Onboarding Checklist (For New Agents / Contributors)

When picking up this project, do this **in order**:

1. Read `MASTER_STATE.md` (this file). 5 minutes.
2. Read `DESIGN_DNA.md`. 5 minutes.
3. Read `CHAT_CONTINUITY_WORKFLOW.md` to understand how sessions begin and close. 5 minutes.
4. Read `VISUAL_REFERENCE_LOCK.md`. 3 minutes.
5. Read `HTML_CANON.md` and skim the 6 canon HTML files in browser. 30 minutes.
6. Read `SYSTEM_ARCHITECTURE.md` to understand canon → Next.js translation. 15 minutes.
7. Read all 17 `.mdc` files in `.rules/` (skim allowed; index in `project-structure.mdc`). 60 minutes.
8. Read `DEVELOPMENT_GUIDELINES.md` for workflow. 10 minutes.
9. Run `npm install && npm run dev` and verify the scaffold renders.
10. Open Cursor; the `.mdc` rules will load automatically into context.

**Do not** start writing code until steps 1–8 are complete. The cost of correcting an off-DNA implementation is 10× the cost of reading the docs.

### 8.1 Cross-session recovery (returning operator)
If you are resuming the project after weeks of inactivity, follow `CHAT_CONTINUITY_WORKFLOW.md §9`:
1. Read `MASTER_STATE.md` (this file) — 5 min.
2. Read latest 3 `docs/changelogs/*.md` entries — 5 min.
3. Re-read `DESIGN_DNA.md` — 5 min.

After 15 minutes you have enough context to make decisions. Beyond that, learn by **doing**, not by reading.

---

## 9. Communication Conventions

- **Language** — Spanish for conversation, English for code, English for documentation.
- **Tone** — Senior Principal Engineer. Direct. No fluff. Technical specificity over enthusiasm.
- **Code comments** — only for non-obvious intent, trade-offs, constraints. Never narrate code.
- **Commit messages** — present tense, imperative, ≤ 72 chars summary, scoped (`hero: ...`, `motion: ...`, `webgl: ...`).
- **PR titles** — same as commit message. Body explains *why*, not *what*.

---

## 10. Emergency Rollback Procedure

If a creative direction conflict arises mid-implementation:

1. Stop coding.
2. Re-read the **conflict's source rule** in `.rules/`.
3. If the rule is unclear, escalate by editing this file's **§7 Open Questions** with the conflict.
4. Default ruling: **`cinematic-language.mdc` and `narrative-density-system.mdc` outrank all other rules.** They are the constitution.
5. If even those don't resolve it, the HTML canon **wins**. The 6 frozen designs are the visual contract.

---

## 11. Continuity & Operational Memory

The project's memory is a **three-tier architecture**:

| Tier              | Location                          | Lifetime       | Purpose                                          |
|-------------------|-----------------------------------|----------------|--------------------------------------------------|
| Permanent governance | `/docs/*.md`                  | indefinite     | What is true regardless of which session is running |
| Session deltas    | `/docs/changelogs/*.md`           | indefinite (immutable) | What changed each architectural session  |
| Always-on rules   | `.rules/*.mdc`                    | indefinite     | Cursor-loaded creative constraints                |

**Operational prompts** (`CURRENT_TASK_TEMPLATE.md`, `SESSION_CHANGELOG_GENERATOR.md`, `DOCS_GENERATOR_PROMPT.md`) are how operators **interact with** these memory tiers — they are not memory themselves.

The official protocol that binds these together is `CHAT_CONTINUITY_WORKFLOW.md`. Every session begins and ends through it. There is **no other entry point** to working on the project.

### 11.1 Memory update triggers
| Event                                     | What gets updated                                  |
|-------------------------------------------|----------------------------------------------------|
| Phase status change                       | `MASTER_STATE.md §3`                               |
| Decision logged                           | `MASTER_STATE.md §3 Decisions logged`              |
| Open question raised / resolved           | `MASTER_STATE.md §7`                               |
| Architectural session ends                | `docs/changelogs/YYYY-MM-DD-<id>.md` + `INDEX.md`  |
| Canon added / corrected                   | `MASTER_STATE.md §5` + `HTML_CANON.md`             |
| `.rules/` modified                        | The `.mdc` file + a changelog entry                |
| New `/docs/*.md` created                  | This file's §4 Layer 2 list                        |
| Reference list change                     | `VISUAL_REFERENCE_LOCK.md §2 / §3` + changelog     |

---

## 12. File Hash Reference (for change detection)

> Maintained in CI; do not edit manually. If hashes diverge from CI, the `/docs` and `.rules/` may have drifted from the canon. Trigger a re-alignment review.

```
# placeholder — populate via: shasum -a 256 .rules/*.mdc docs/*.md
```
