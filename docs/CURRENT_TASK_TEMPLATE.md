# CURRENT_TASK_TEMPLATE — STRATEGICLAND

> The reusable operational template injected into every new chat to define the **specific session task** while preserving cinematic governance.
> This file is **not** a task description. It is the **container schema** for any session's task.
> Copy §3 into the chat as the task prompt; instantiate every bracketed `[FIELD]`.

---

## 1. Purpose

Every chat session has exactly one task. Without this template:
- Tasks are described inconsistently across sessions.
- Constraints are forgotten.
- Boundaries are negotiated mid-session, not declared upfront.
- Cinematic preservation is left to the agent's interpretation.

With this template:
- Every task arrives **with its constraints attached**.
- Every session inherits the same governance reminders.
- The agent cannot drift into "improving" the system; the boundaries are explicit.

---

## 2. When to Use

- **Always**, in both LIGHTWEIGHT and ARCHITECTURE continuity modes (per `CHAT_CONTINUITY_WORKFLOW.md §2`).
- It is the **last** prompt loaded into a new chat session, after `MASTER_STATE.md`, `DESIGN_DNA.md`, and (for architecture mode) the latest `SESSION_CHANGELOG`.

---

## 3. The Template (Copy from `<COPY START>` to `<COPY END>`)

<COPY START>

# CURRENT TASK — STRATEGICLAND

## Continuation protocol

You are operating inside the STRATEGICLAND cinematic system. The project's identity, governance, and architecture have been loaded via `MASTER_STATE.md` and `DESIGN_DNA.md` (and `SESSION_CHANGELOG` if architecture mode).

Before you respond:
1. Confirm you have read both `MASTER_STATE.md §3` (current state) and `DESIGN_DNA.md §1–§2` (DNA Sentence + Five Genetic Markers).
2. Confirm the mode of this session — LIGHTWEIGHT or ARCHITECTURE — per `CHAT_CONTINUITY_WORKFLOW.md §2`.
3. If you are in ARCHITECTURE mode and `SESSION_CHANGELOG` was not provided, **stop and request it**.

## Session metadata

- **Date:** [YYYY-MM-DD]
- **Continuity mode:** [LIGHTWEIGHT | ARCHITECTURE]
- **Branch:** [branch-name]
- **Reference canon:** [HC-XX | none]
- **Reference rule(s):** [.rules/<rule>.mdc | none]
- **Reference doc(s):** [docs/<doc>.md | none]
- **Estimated PR size:** [≤ N lines net change]

## The task (one sentence)

[Write the task in a single sentence. If you can't, the task is two tasks.]

## Acceptance criteria (3–6 bullets)

- [Bullet 1 — what must be true for the task to be complete]
- [Bullet 2]
- [Bullet 3]
- ...

## Constraints (NON-NEGOTIABLE)

These constraints apply to **every** task and override any agent intuition that contradicts them.

### Cinematic preservation
- Every visual / motion / atmosphere decision must pass the DNA Test (`DESIGN_DNA.md §5`) and the Anti-Test (`DESIGN_DNA.md §6`).
- Every reference must be on the allowed list (`VISUAL_REFERENCE_LOCK.md §2`); none may be on the forbidden list (§3).
- The HTML canon (`HTML_CANON.md`) is **frozen** — implementations may modularize, never redesign.

### Chapter architecture
- Every new scene declares a tier (`T01`–`T05`) + energy via `<SceneShell>` (per `narrative-density-system.mdc`).
- Page composition runs `lintPage()` in dev mode (per `CHAPTER_SYSTEM.md §6`).
- Chapter sequencing follows `CHAPTER_SYSTEM.md §4`; deviations require justification.

### Density discipline
- Average page tier ≤ 3.0.
- ≥ 1 TIER 01 (silence) scene per page.
- ≤ 1 TIER 05 (kinetic) chapter per page.
- No two TIER 04+ chapters adjacent without TIER ≤ 02 between them.

### Human irregularity
- All durations / staggers / translations through `jitter()` (`lib/irregularity/jitter.ts`). Never `Math.random()`.
- Cluster emphasis (first/last +15% duration) applied to reveal clusters.
- Per-scene atmosphere derived via `deriveSceneAtmosphere()`; never hardcoded scene-by-scene.

### Atmospheric restraint
- Every scene composes from the locked atmospheric stack (`ATMOSPHERIC_LANGUAGE.md §2`): bg → WebGL → glow → tint → vignette → light leak → frame → grain.
- Grain is **always** present (`0.04`–`0.14` opacity).
- Forbidden: glassmorphism, neumorphism, decorative gradients, multi-color hue shifts, postprocessing stacks.

### Motion grammar
- All motion uses named patterns from `MOTION_GRAMMAR.md §3`. Inventing a new pattern requires updating §3.
- All eases / durations / staggers from locked dictionaries (`EASE`, `DUR`, `STAGGER`). Forbidden: `bounce`, `elastic`, `back`, `linear` (except continuous loops).
- Animated properties limited to `transform`, `opacity`, `filter`, `clip-path`, WebGL uniforms.

### Performance budgets
- First-load JS ≤ 180 KB gzip.
- Per-chapter additional JS ≤ 60 KB gzip.
- WebGL render ≤ 4ms / frame.
- Per-page total weight ≤ 1.4 MB.
- Lighthouse Perf ≥ 90, A11y ≥ 95.

### Accessibility
- `prefers-reduced-motion: reduce` path verified for every motion.
- Custom interaction patterns expose ARIA equivalents.
- All interactive elements have `:focus-visible` rings.
- Mobile fallback documented (horizontal pin → vertical stack, etc.).

### Code discipline
- TypeScript `strict`. No `any` without justification.
- Server Components by default; `"use client"` only when needed.
- All GSAP work via `useGSAP` (or `gsap.context`) for cleanup safety.
- Tokens for all values (no inline hex, no inline durations, no inline eases).
- Commit messages scoped (`hero:`, `motion:`, `webgl:`, etc.) per `DEVELOPMENT_GUIDELINES.md §3.2`.

## Implementation boundaries

You **may**:
- Edit files within the scope of `[scope]`.
- Add new files inside the scope's directory tree.
- Read any file in the project to gather context.
- Propose token / pattern additions in your response (but not implement them in this session).

You **may NOT**:
- Edit `.rules/*.mdc` (governance — separate session).
- Edit `/docs/*.md` (governance — separate session).
- Modify any of the 6 HTML canon files on Desktop.
- Add dependencies > 50 KB gzip without sign-off.
- Introduce a new motion pattern outside `MOTION_GRAMMAR.md §3`.
- Introduce a new atmospheric primitive outside `ATMOSPHERIC_LANGUAGE.md §2`.
- Make creative-direction decisions on open questions (`MASTER_STATE.md §7`); flag them, do not resolve them.

## Cinematic preservation checklist (run before responding)

- [ ] Does the task respect the 5 Genetic Markers (`DESIGN_DNA.md §2`)?
- [ ] Does the task sit within an allowed reference (`VISUAL_REFERENCE_LOCK.md §2`)?
- [ ] Does the task fit the chapter's allowed tier set (`CHAPTER_SYSTEM.md §3.x`)?
- [ ] Does the task respect the chapter's atmosphere profile (`ATMOSPHERIC_LANGUAGE.md §12.x`)?
- [ ] Does the task use only named motion patterns (`MOTION_GRAMMAR.md §3`)?
- [ ] Does the task pass the Scarcity Principle (`DESIGN_DNA.md §7`)?

If any checkbox cannot be confirmed, **stop and ask** before writing code.

## Reasoning protocol

- Think in cinematic terms (shot, scene, chapter), not in UI terms (page, component, modal).
- When in doubt between two implementations, choose the one closer to **slow cinema + editorial print + architectural studio** (`DESIGN_DNA.md §4`).
- Before writing code, name the canon source and the relevant rule(s) you are implementing.
- After writing code, run the Cinematic Preservation Checklist above against your output.

## Output format

For each substantive change:
1. **Canon / rule reference.** Which canon HTML or `.mdc` rule does this implement?
2. **Code changes.** The actual edits.
3. **Verification.** How you confirmed the change passes the cinematic preservation checklist.
4. **Open questions.** Anything that requires creative-direction sign-off.

For session closing (when work completes):
- Apply `CHAT_CONTINUITY_WORKFLOW.md §6 Closing Protocol`.

## Forbidden agent behaviors (this session)

- ❌ Do not paste any `.mdc` rule into the chat — they auto-load via Cursor.
- ❌ Do not paste any HTML canon file into the chat — reference by HC-XX ID.
- ❌ Do not summarize the project, the DNA, or the canon — they are loaded.
- ❌ Do not introduce libraries, patterns, or aesthetic decisions outside the locked vocabulary.
- ❌ Do not relax constraints to make implementation easier — flag the constraint instead.
- ❌ Do not use marketing language ("premium", "sleek", "modern", "engaging").
- ❌ Do not propose tests, configs, or refactors outside the task scope unless explicitly requested.

## Task payload

> [Write the actual task here in 2–8 sentences. Be specific about files, scenes, behaviors. Cite canon HC-XX and `.rules/<rule>.mdc` references explicitly.]

## Continuation context (only for resumed sessions)

> [If this session continues prior work, list: branch, in-flight files, pending decisions, blockers. If new session, write "N/A — fresh task".]

<COPY END>

---

## 4. Field Reference

### `Continuity mode`
LIGHTWEIGHT or ARCHITECTURE per `CHAT_CONTINUITY_WORKFLOW.md §2`. Determines which prompts were loaded.

### `Reference canon`
The HTML canon ID (HC-01 through HC-06). If the task does not implement canon, write `none`.

### `Reference rule(s)`
The `.mdc` rule(s) most relevant to the task. List by filename, not by description. If multiple, list in priority order.

### `Reference doc(s)`
The `/docs/*.md` file(s) most relevant. Often the same as the rule but at a higher level.

### `Estimated PR size`
The expected net line change. Per `DEVELOPMENT_GUIDELINES.md §3.3`, max 400 lines. If estimate exceeds, **split the task**.

### `The task (one sentence)`
Single declarative sentence. Examples:
- "Implement the `Scene01_HumanLayerHero` scene of the `human` chapter per HC-05."
- "Wire up the Lenis–GSAP bridge in the root layout."
- "Add the `revealText.scrub` motion pattern utility to `lib/motion/reveal.ts`."

If the sentence requires "and", split into two tasks.

### `Acceptance criteria`
Concrete, testable. Examples:
- "Scene renders the eyebrow, display title, and italic lede with `revealText.char` choreography per HC-05 §6.3."
- "`prefers-reduced-motion: reduce` path renders the scene at final state with no transitions."
- "PR adds `<HumanChapter>` to home page composition; `lintPage()` passes."

### `Implementation boundaries — scope`
The directory tree the agent may modify. Examples:
- `components/chapters/HumanChapter/**`
- `lib/motion/**`
- `app/page.tsx` and `components/chapters/**` only

### `Task payload`
The actual task description. 2–8 sentences. Must reference at least one HC ID and one `.rules/` file. Examples:

> Implement `Scene01_HumanLayerHero` (`components/chapters/HumanChapter/scenes/Scene01_HumanLayerHero.tsx`) per HC-05 §6.1 (hero anatomy). Use `revealText.char` for the "Human Layer" display title (`MOTION_GRAMMAR.md §3.3`), the chapter atmosphere from `atmosphere.config.ts` (`ATMOSPHERIC_LANGUAGE.md §12.4`), and tier T02 + energy contemplative via `<SceneShell>` (`narrative-density-system.mdc §3`). The hero contains: eyebrow ("Internal Philosophy"), display title, italic lede, and bottom "Descend" affordance. Two atmospheric glow orbs are placed via `<GlowOrbs>` with parallax. CSS-only hover for the descend cue.

### `Continuation context`
For resumed sessions only. Documents the in-flight state of the prior session. Example:

> Branch: `chapter/human-layer`. In-flight: `Scene01_HumanLayerHero.tsx` complete, `Scene02_Premise.tsx` 60% complete (grid scaffolded, content not wired). Pending decisions: confirm whether the SVG quote glyph in Scene04 stays at 8 px stroke or moves to 1 px hairline (proposed in MASTER_STATE.md §7). Blockers: none.

---

## 5. Template Variants

### 5.1 Minimal LIGHTWEIGHT variant (when scope is single-file)

For tasks ≤ 60 lines net change touching one file:

```
# CURRENT TASK — STRATEGICLAND (lightweight)

Mode: LIGHTWEIGHT.
Reference: [HC-XX | rule | doc].
Scope: [file path].

Task: [one sentence].

Acceptance:
- [bullet 1]
- [bullet 2]

Constraints inherited from MASTER_STATE.md, DESIGN_DNA.md, and Cursor-loaded .rules/.

Boundaries: edit only [file path]. Read freely. Do not edit /docs/, .rules/, or HTML canon.

Output the diff with canon/rule reference + verification.
```

This minimal variant is acceptable **only** when the task is genuinely single-file scoped. If you find yourself reaching for a second file, switch to the full template (§3).

### 5.2 ARCHITECTURE variant (additional sections)

When in ARCHITECTURE mode, add the following sections to the §3 template:

```
## Architectural impact

- New modules introduced: [list]
- New tokens introduced: [list]
- New rules / docs touched: [list]
- Performance budget delta: [+/- KB, +/- ms]
- Risk: [LOW / MEDIUM / HIGH] — explain

## Required updates after merge

- [ ] `MASTER_STATE.md §3` — phase / decisions
- [ ] `MASTER_STATE.md §5` — canon mapping (if canon implemented)
- [ ] Generate `SESSION_CHANGELOG` per `SESSION_CHANGELOG_GENERATOR.md`
- [ ] Update affected `/docs/*.md` if structural change
- [ ] Update `.rules/<rule>.mdc` if rule changed
```

---

## 6. Anti-Patterns (Forbidden Task Descriptions)

These task descriptions **must be rejected** at session start.

| Forbidden                                                | Why                                                  |
|----------------------------------------------------------|------------------------------------------------------|
| "Make the hero look better."                             | Subjective; no canon reference; no acceptance criteria |
| "Add a cool transition between sections."                | Marketing language; no named pattern; no scope       |
| "Optimize performance."                                  | Unscoped; no budget delta; no measurement plan       |
| "Refactor the chapters folder."                          | Scope too large for one PR; no canon justification   |
| "Add a dark mode toggle."                                | DNA violation — site has one mode (`DESIGN_DNA.md §6`) |
| "Implement everything in HC-04."                         | Scope too large; split into per-scene tasks          |
| "Make it more engaging."                                 | Forbidden marketing language                         |
| "Build a hero for the contact page."                     | No HC reference, no acceptance criteria              |
| "Polish the interactions."                               | Unscoped; no specific interaction listed             |

If a task arrives in this form, **rewrite it** using the §3 template before starting work.

---

## 7. Template Maintenance

This template is updated **only** when:

- A new constraint becomes universal across sessions.
- A new continuity mode is added to `CHAT_CONTINUITY_WORKFLOW.md` (currently locked at 2).
- A new `/docs/*.md` becomes a routine reference.
- A recurring task pattern emerges that warrants its own variant section.

Updates require:
- PR with `docs:` prefix.
- Justification with reference to the prior failure mode this update prevents.
- Sign-off from the project owner.

---

## 8. The Template's Job in One Sentence

> **Make every chat session start identically, so every chat session ends correctly.**
