# SESSION_CHANGELOG_GENERATOR — STRATEGICLAND

> The operational prompt for generating production-grade session changelogs.
> A changelog is **long-term cinematic memory** — what changed, why it changed, what the next session must know.
> Run this prompt at the **end of any architectural session** (per `CHAT_CONTINUITY_WORKFLOW.md §7`).

---

## 1. Purpose

A `SESSION_CHANGELOG.md` entry exists to:

- **Record decisions** that future sessions need to inherit.
- **Capture the "why"** behind structural changes the code alone won't explain.
- **Bridge sessions** in `ARCHITECTURE` continuity mode (per `CHAT_CONTINUITY_WORKFLOW.md §2.2`).
- **Trigger document updates** in `/docs/*.md` and `.rules/*.mdc` if the change is foundational.

A changelog is **not**:
- A git commit log (the repo has those).
- A meeting summary (we don't have those).
- A retrospective on the agent's reasoning (irrelevant to the project).
- A list of every file touched (load-bearing changes only).

---

## 2. When to Generate

Per `CHAT_CONTINUITY_WORKFLOW.md §7`, generate a changelog **only when one or more conditions is true**:

- New chapter type added.
- New canon HTML integrated.
- Existing canon HTML implementation completed.
- `.rules/` file added / modified / removed.
- Engine module (`lib/motion/`, `lib/scroll/`, `lib/transitions/`, `lib/webgl/`, `lib/density/`, `lib/irregularity/`, `lib/sound/`) added / modified.
- Performance budget changed.
- Token dictionary modified (`EASE`, `DUR`, `STAGGER`, `COLOR`, `TYPE_SCALE`, `BLUR`).
- Reference lock list (allowed / forbidden) changed.
- Decision logged that contradicts or extends prior docs.
- Audio architecture activated / deactivated / re-scoped.

If none of these is true, **do not generate a changelog**. Routine work does not need to be remembered structurally.

---

## 3. Output Format

### 3.1 Filename
```
docs/changelogs/YYYY-MM-DD-<short-id>.md
```
- `YYYY-MM-DD` — UTC date.
- `<short-id>` — kebab-case 2–4 word identifier (e.g., `cultural-chapter-scaffold`).

Example: `docs/changelogs/2026-05-13-cultural-chapter-scaffold.md`.

### 3.2 Required sections (in order)

```markdown
# SESSION CHANGELOG — YYYY-MM-DD — <Short Title>

## 0. Session metadata
- Date (UTC): YYYY-MM-DD
- Duration: <hours>h
- Continuity mode: [LIGHTWEIGHT | ARCHITECTURE]
- Branch(es): [list]
- PR(s): [list with URLs]
- Operator: [name | "agent" | "agent + reviewer"]
- Linked transcript: [<title>](<uuid>)

## 1. One-sentence summary
> [Single sentence. No marketing language.]

## 2. Architectural changes
[List structural changes — modules, tokens, rules, docs. Empty if none.]

## 3. Approved systems
[Patterns / decisions that became canonical this session.]

## 4. Rejected systems
[Patterns / decisions explicitly considered and rejected, with rationale.]

## 5. Motion changes
[Additions / modifications to MOTION_GRAMMAR.md vocabulary or token dictionaries.]

## 6. Typography changes
[Font / scale / tracking / leading changes.]

## 7. Atmospheric changes
[Atmosphere stack / token / per-chapter profile changes.]

## 8. Canon updates
[Canon corrections applied; new canon integrated; canon source mapping changes.]

## 9. Performance updates
[Budget changes; new measurements; degradation paths added.]

## 10. Governance changes
[.rules/ changes; /docs/ changes; reference lock changes; resolution priority changes.]

## 11. Pending systems
[Work not finished; blockers; open questions raised.]

## 12. Required follow-up
[Updates to MASTER_STATE.md, /docs/, .rules/ that this session triggers.]

## 13. Continuity instructions for next session
[What the next session needs to know to continue. Branch names, in-flight files, recommended next steps.]
```

Sections **2–11** are **conditional** — include only if non-empty. Sections **0, 1, 12, 13** are mandatory.

---

## 4. The Generation Prompt (Copy from `<COPY START>` to `<COPY END>`)

Paste this into a chat at session end. Provide the agent with the necessary context (PR diffs, decision log, branch info).

<COPY START>

# GENERATE SESSION CHANGELOG — STRATEGICLAND

You are at the end of an architectural session. Your task is to generate a `SESSION_CHANGELOG.md` entry per the format defined in `docs/SESSION_CHANGELOG_GENERATOR.md §3`.

## Before you write

1. Confirm at least one trigger condition from `CHAT_CONTINUITY_WORKFLOW.md §7` is satisfied. If not, respond: *"No trigger condition met. No changelog needed."* and stop.
2. Identify the load-bearing changes from the session — not every file touched, only the structural deltas.
3. Identify all decisions made (explicit or implicit). Anything that future sessions will inherit is a decision.

## Writing constraints

- **No marketing language.** Reject "premium", "sleek", "modern", "engaging", "elevated", "polished".
- **No filler.** Every line earns its place. Empty sections omitted entirely (per §3 conditional rule).
- **No restating documented governance.** Reference `DESIGN_DNA.md §X`, `HTML_CANON.md §HC-XX`, etc.; never paraphrase them.
- **Speak in cinematic terms.** "Scene", "chapter", "atmosphere", "tier", "shot" — not "section", "page", "background", "level", "element".
- **One sentence summary (§1) is non-negotiable.** If you cannot summarize the session in one sentence, the session was unfocused; flag it as the first item of §11 Pending systems.
- **Decisions are documented as decisions.** "Selected `Cormorant Garamond` for serif primary; deferred GT Sectra licensing to future." Not "we used Cormorant Garamond".
- **Trade-offs are documented as trade-offs.** "Accepted -2 ms WebGL render budget overhead for cultural chapter to support `simplex-fog` at amplitude 0.08." Not "made cultural chapter shader more intense".

## Output rules

- Output as a single Markdown file, ready to save.
- Use the canonical filename pattern: `docs/changelogs/YYYY-MM-DD-<short-id>.md`.
- Maximum length: 250 lines. Beyond this, the session was too large for one changelog; split into multiple.
- Cite specific line numbers / function names / file paths where applicable. Vague references are useless to future sessions.
- Cross-reference with explicit anchors: `MASTER_STATE.md §3`, `HTML_CANON.md §HC-04 §5.5`, etc.

## Required follow-up section (§12) format

For every change in §2–§10, list any required update to:
- `MASTER_STATE.md` (which subsection).
- `/docs/*.md` (which file, which section).
- `.rules/*.mdc` (which file, which section).
- `docs/changelogs/INDEX.md` (always — append the new entry).

If no follow-up needed, write `None`.

## Continuity section (§13) format

A 3–6 line block for the next session. Format:

```
Branch: <branch-name>
Mode for next session: [LIGHTWEIGHT | ARCHITECTURE]
In-flight files: [list]
Recommended next task: [one sentence per CURRENT_TASK_TEMPLATE.md §3]
Blockers: [list or "none"]
Open questions raised: [list with MASTER_STATE.md §7 reference]
```

## Forbidden

- ❌ Do not restate the project's DNA, philosophy, or canon.
- ❌ Do not log routine commits (typo fixes, formatting, dependency upgrades within minor version).
- ❌ Do not log work that has not yet been merged unless it represents a finalized decision.
- ❌ Do not include subjective evaluation ("the result looks great"). Outcomes are described in cinematic terms or measurements only.
- ❌ Do not narrate the session ("we started by reading the canon, then…"). The changelog is a state document, not a story.
- ❌ Do not invent metrics. If a budget delta is not measured, write "not measured".

## Output

Begin the changelog now. Use the format from `docs/SESSION_CHANGELOG_GENERATOR.md §3`.

<COPY END>

---

## 5. Example Changelog Entry (Reference)

> *Use this as a structural reference, not as content to mimic.*

```markdown
# SESSION CHANGELOG — 2026-05-13 — Cultural Chapter Scaffold

## 0. Session metadata
- Date (UTC): 2026-05-13
- Duration: 2.5h
- Continuity mode: ARCHITECTURE
- Branch(es): chapter/cultural-impacto
- PR(s): #42 — chapter/cultural-impacto-scaffold
- Operator: agent + reviewer (juanluis)
- Linked transcript: [Cultural chapter scaffold](7f2a91a4-...)

## 1. One-sentence summary
> Scaffolded the `cultural` chapter shell per HC-04, including atmosphere config, audio config, and 5 empty scene files; deferred WebGL `simplex-fog` shader implementation to next session.

## 2. Architectural changes
- Added `components/chapters/CulturalChapter/` per `SYSTEM_ARCHITECTURE.md §8` mapping.
- Added `lib/motion/pinnedLadder.ts` skeleton (no implementation yet).
- Added `lib/density/profiles.ts` entry for `cultural` chapter type.

## 3. Approved systems
- Cultural chapter atmosphere defaults match `ATMOSPHERIC_LANGUAGE.md §12.5` exactly; no overrides needed for first instance (`impacto-cultural`).
- Per-narrative data lives in `content/cultural/<slug>/archives.ts` confirmed as canonical pattern (extends `CHAPTER_SYSTEM.md §3.5`).

## 4. Rejected systems
- Considered porting the HC-04 `elastic.out` magnetic return verbatim. Rejected per `HTML_CANON.md §5.5 canon correction`. Will use `EASE.cinematic`.
- Considered loading the simplex-fog shader inline in `Scene01_Establish`. Rejected — shaders live in `shaders/` per `project-structure.mdc §8`.

## 8. Canon updates
- HC-04 mapped to production at module-level. Per-scene mapping deferred until each scene is implemented.
- HC-04 §5.5 `elastic.out` correction logged as TODO in `lib/interaction/useMagnetic.ts` (currently throws if `elastic` is requested).

## 11. Pending systems
- WebGL `simplex-fog` shader implementation (next session).
- `Scene03_Ladder` choreography wiring (next session).
- Per-archive content authoring (`content/cultural/impacto-cultural/archives.ts`) (content team).
- Audio config left as placeholder; activation per `MASTER_STATE.md §7 Open Question` on audio v1.0/v1.1 timeline.

## 12. Required follow-up
- `MASTER_STATE.md §3` — update `Chapter system` row from 🔴 to 🟡.
- `MASTER_STATE.md §3 Decisions logged` — record HC-04 `elastic.out` correction confirmed.
- `docs/changelogs/INDEX.md` — append entry.
- No `.rules/` updates required.

## 13. Continuity instructions for next session
```
Branch: chapter/cultural-impacto
Mode for next session: ARCHITECTURE
In-flight files: shaders/atmosphere/simplex-fog.frag (to be created), components/chapters/CulturalChapter/scenes/Scene01_Establish.tsx
Recommended next task: Implement shaders/atmosphere/simplex-fog.frag per HC-04 §5.3 + ATMOSPHERIC_LANGUAGE.md §8.3.
Blockers: none.
Open questions raised: none.
```
```

---

## 6. Changelog Index

A `docs/changelogs/INDEX.md` file maintains a single-line summary of every changelog entry.

### 6.1 INDEX.md format

```markdown
# Changelog Index — STRATEGICLAND

> Reverse-chronological. Most recent at top. One line per entry.

| Date       | Title                                  | Mode         | PR    | Trigger                          |
|------------|----------------------------------------|--------------|-------|----------------------------------|
| 2026-05-13 | Cultural Chapter Scaffold              | ARCHITECTURE | #42   | new chapter type                 |
| 2026-05-12 | Lenis–GSAP Bridge Wired                | ARCHITECTURE | #41   | engine module added              |
| 2026-05-10 | HTML Canon HC-04 Inventory             | ARCHITECTURE | #38   | canon integrated                 |
```

### 6.2 INDEX.md update rule
- Append a row **as part of generating each new changelog**.
- Never edit prior rows (changelogs are immutable history).
- If a changelog is later found to be incorrect, **add a new changelog entry** that supersedes it; never edit the original.

---

## 7. Changelog Lifecycle

### 7.1 Immutability
Once committed, changelog entries are **immutable**. They are historical records.

If a decision logged in a prior changelog is reversed:
- **Do not edit** the prior changelog.
- **Generate a new changelog** documenting the reversal.
- The new changelog cites the prior changelog by filename.

### 7.2 Retention
All changelogs are retained indefinitely. The project's history is a project asset.

### 7.3 Pruning
Changelogs are **never pruned**. If the directory grows large, organize by year:
```
docs/changelogs/
├─ INDEX.md
├─ 2026/
│  ├─ 05-13-cultural-chapter-scaffold.md
│  ├─ 05-12-lenis-gsap-bridge.md
│  └─ ...
└─ 2027/
   └─ ...
```

The `INDEX.md` remains a flat reverse-chronological log regardless of folder structure.

---

## 8. Anti-Patterns (Forbidden Changelog Patterns)

| Forbidden                                                | Why                                              |
|----------------------------------------------------------|--------------------------------------------------|
| Narrating the session as a story                         | Changelog is a state document, not a story      |
| Listing every file touched                               | Only load-bearing changes                        |
| Praising the work ("clean implementation")               | Subjective; useless to future sessions           |
| Copying entire diffs into the changelog                  | Diffs live in PRs; changelog references them     |
| Repeating canon / DNA / philosophy                       | Already documented; flooding wastes context     |
| Vague items ("improved cultural chapter")                | Specific or omitted                              |
| Inventing metrics                                        | Honesty: "not measured" is acceptable            |
| Overlapping changelog entries (same change logged twice) | Each session = one changelog max                |
| Forward-looking promises ("will fix in next session")    | Use §13 Continuity instructions, never §1–§10    |

---

## 9. Quality Gate

Before committing a changelog, verify:

- [ ] One-sentence summary in §1 is genuinely a single sentence, no semicolons used as conjunctions.
- [ ] Every section omitted is genuinely empty (not lazy).
- [ ] Every cross-reference cites a specific anchor (`§X.Y`).
- [ ] No marketing language anywhere.
- [ ] Continuity instructions in §13 are sufficient for the next session to start without reading the chat transcript.
- [ ] `docs/changelogs/INDEX.md` updated with the new row.
- [ ] `MASTER_STATE.md §3` updated per §12 follow-up list.

If any gate fails, the changelog is not ready to commit.

---

## 10. The Changelog's Job in One Sentence

> **Tell the next session exactly what changed and why, in the smallest number of words that preserve continuity.**
