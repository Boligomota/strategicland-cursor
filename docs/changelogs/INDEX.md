# Changelogs — INDEX

> **Append-only operational memory of STRATEGICLAND.**
> This index tracks every architectural session that mutated the project's governance, canon, runtime architecture, or cinematic systems.
> Routine implementation work does **not** appear here.

---

## 1. Purpose

The changelog system is the project's **persistent operational memory**. It exists for one reason: future sessions, future contributors, and future agents must be able to reconstruct *why a decision was made* without reading chat transcripts.

A changelog entry is the **only durable record** of an architectural session's outcome. Once committed, it is immutable. Reversals are recorded as new entries. Drift is the bug, not the baseline.

This is not a development log. It is **archival governance memory**.

---

## 2. Naming convention

Strict format:

```
docs/changelogs/YYYY-MM-DD-<short-id>.md
```

Rules:
- **Date is UTC**, in ISO-8601 (`YYYY-MM-DD`), based on the day the session **closed**.
- **`<short-id>`** is kebab-case, ≤ 40 chars, ≤ 5 words, neutral and descriptive.
  - Good: `hero-modularization`, `transition-director-state-machine`, `webgl-root-canvas-singleton`.
  - Forbidden: `update`, `fixes`, `wip`, `final-v2`, `cool-stuff`, `🚀-launch`.
- Multiple entries on the same date use distinct `<short-id>` values; **no numeric suffixes** (`-2`, `-v2`).
- `INDEX.md` itself is not a changelog entry.

Examples:
- ✅ `2026-05-13-foundational-governance-baseline.md`
- ✅ `2026-06-04-hero-loader-canonization.md`
- ❌ `2026-05-13-update.md`
- ❌ `2026-05-13-changelog-2.md`

---

## 3. Immutable policy

Every committed changelog entry is **append-only and immutable**.

### 3.1 Forbidden mutations
- ❌ Editing the body of a committed entry.
- ❌ Deleting a committed entry.
- ❌ Renaming a committed entry's filename.
- ❌ Re-ordering entries to "tidy" history.
- ❌ Squashing multiple historical entries into a "summary" entry.
- ❌ Editing this `INDEX.md` to remove or alter prior rows.

### 3.2 Permitted mutations
- ✅ Appending new entries.
- ✅ Adding a `> SUPERSEDED-BY: 2026-XX-XX-...` callout at the top of an entry whose decisions were reversed (the body remains intact).
- ✅ Fixing a typo within 24 hours of commit, **only if the file has not been pushed**. After push: never edit.
- ✅ Migrating older entries into year subfolders (`docs/changelogs/2026/`) when annual count exceeds 50, preserving filenames and updating this index links.

### 3.3 Rationale
Editing prior changelogs erases governance history and breaks the audit chain. If a decision is reversed, the **reversal is itself a session** and gets its own entry. The original entry stays as the canonical record of *what was true at that moment*.

---

## 4. Ordering convention

This index orders entries **reverse-chronological** (newest first).

- New rows are inserted at the top of the table in §7.
- Within the same date, order by session close time (most recent at top).
- The genesis entry (`2026-05-13-foundational-governance-baseline.md`) is the **terminal row** — it never moves, and it never has rows below it.

---

## 5. Rollback referencing system

Architectural decisions can be reversed. The reversal is **never destructive**.

### 5.1 Reversal protocol
1. Open a new ARCHITECTURE-mode session.
2. Generate a new changelog entry whose §1 one-sentence summary explicitly states the reversal:
   > "This session reverses the chapter dissolve grammar adopted in `2026-06-04-cinematic-dissolve-v1.md` and replaces it with a single-pass clip-path mask."
3. The new entry's §2 lists the reversed module + the replacement module.
4. The new entry's §13 marks the prior entry's §-numbers as `SUPERSEDED-BY: this entry`.
5. **At the top of the prior entry**, add the only permitted post-commit modification:
   ```
   > SUPERSEDED-BY: 2026-MM-DD-<short-id>.md
   > Reason: <one sentence>
   ```
6. The body of the prior entry remains unchanged.

### 5.2 Cross-references
Every entry that supersedes another **must** name the prior entry by full filename. Every entry that depends on a prior decision **should** cite it by filename in the relevant §.

### 5.3 Rollback chain visibility
This `INDEX.md` table has a `Supersedes` column. Reversal chains are reconstructable by reading filenames downward.

---

## 6. Governance snapshot philosophy

A changelog entry is more than a log line. It is an **operational snapshot** of the project at the close of an architectural session.

### 6.1 Each entry is generated to satisfy a future agent
A future operator or agent, with no prior context, must be able to:
- Read the most recent changelog entry,
- Cross-reference its citations into `/docs/` and `.rules/`,
- And resume work without consulting any chat transcript.

If a changelog entry fails this test, it has failed its purpose.

### 6.2 Entries are not summaries — they are decisions
The narrative voice of a changelog is **archival, operational, declarative**. Not conversational, not anecdotal, not promotional.

- ✅ "HC-04's elastic.out magnetic ease is replaced by `EASE.cinematic` per `motion-system.mdc §2.1`."
- ❌ "We decided that the bouncy magnetic effect felt a bit too playful, so we toned it down."

### 6.3 Entries cite, never restate
Governance content lives in `/docs/` and `.rules/`. Changelogs reference those by filename + §-number. They do not paraphrase, summarize, or reproduce them.

If a changelog entry is duplicating governance content, the governance file is the source of truth — not the entry.

### 6.4 Entries are sized to scope
- Routine architectural session: ~120–250 lines.
- Foundational baseline (rare): may exceed; intentional foundational scope justified.
- Emergency revert / hotfix governance change: may be ~60–100 lines if the scope is genuinely narrow.

---

## 7. Index of entries (reverse-chronological)

| Date (UTC) | Filename | Mode | Scope | Phase declared | Supersedes |
|------------|----------|------|-------|----------------|------------|
| 2026-06-11 | [`2026-06-11-film-implementation-snapshot.md`](./2026-06-11-film-implementation-snapshot.md) | ARCHITECTURE | 8 chapters + system layer + motion/scroll/transition/irregularity engines + media primitives + asset contracts + case registry + `/work/[slug]` + agent governance | FILM IMPLEMENTATION (de-facto; MASTER_STATE reconciliation pending) | — |
| 2026-05-13 | [`2026-05-13-foundational-governance-baseline.md`](./2026-05-13-foundational-governance-baseline.md) | ARCHITECTURE | 18 `.mdc` + 14 `/docs/` + 6 HC + MCP orchestration + continuity infrastructure | FOUNDATIONAL GOVERNANCE COMPLETE → HERO SYSTEM MODULARIZATION | — (genesis) |

---

## 8. Future-entry template

Use this template when generating a new entry. The full operational prompt lives in `docs/SESSION_CHANGELOG_GENERATOR.md`. This is the structural skeleton.

```markdown
# SESSION CHANGELOG — YYYY-MM-DD — <short title>

## 0. Session metadata
- **Date (UTC):**
- **Duration:**
- **Continuity mode:** LIGHTWEIGHT | ARCHITECTURE
- **Branch(es):**
- **PR(s):**
- **Operator:**
- **Linked transcripts:** [<title>](<uuid>)

## 1. One-sentence summary
> ...

## 2. Architectural changes
(systems, modules, providers added / removed / replaced — cite files)

## 3. Approved canon updates
(only if HC-XX inventory changed)

## 4. Governance decisions
(only if `.rules/` or `/docs/` priority order changed)

## 5. MCP orchestration changes
(only if MCP roster, authority, or invocation limits changed)

## 6. Continuity infrastructure changes
(only if `CHAT_CONTINUITY_WORKFLOW`, prompts, or modes changed)

## 7. Motion / atmospheric / typography / interaction changes
(only if cinematic vocabulary changed; cite token tables)

## 8. Forbidden directions added / refined
(only if VISUAL_REFERENCE_LOCK or anti-vocabulary changed)

## 9. Open questions
(opened, resolved, deferred — cite MASTER_STATE.md §7)

## 10. Current development phase
(declare phase status; declare next phase if changing)

## 11. Next recommended actions
(numbered, scoped to the next 1–3 sessions)

## 12. Do not change
(only if new freezes were established this session)

## 13. Required follow-up
- [ ] MASTER_STATE.md §3 phase update
- [ ] MASTER_STATE.md §3 decisions logged
- [ ] INDEX.md row appended
- [ ] CURRENT_TASK_TEMPLATE.md continuation context updated
- [ ] (other doc updates)

## 14. Continuity instructions for next session
```
Branch:
Mode for next session:
In-flight files:
Recommended next task:
Blockers:
Open questions raised:
Critical reference reading:
```

## 15. Snapshot signature
> *Doc-generation review:* <principles applied / cross-refs count / line budget>
```

### 8.1 Section discipline
- §0, §1, §10, §11, §13, §14, §15 are **mandatory** for every entry.
- §2 through §9 are **conditional** — include only the sections the session actually touched. Skipping irrelevant sections is required, not optional.
- §12 is mandatory only when the session establishes new freezes.

### 8.2 Length discipline
- Default ceiling: **250 lines per entry**.
- Lines saved by skipping irrelevant sections are **not redistributable** to other sections.
- If an entry exceeds 250 lines without a foundational justification, the operator must approve.

---

## 9. Lifecycle

| Stage | Condition |
|-------|-----------|
| Authored | After session closing protocol step 3 (`DEVELOPMENT_GUIDELINES.md §12.5`). |
| Reviewed | Operator validates against the actual session scope. |
| Committed | Single commit per entry. Commit message: `changelog: YYYY-MM-DD <short-id>`. |
| Pushed | Pushed to `main` after operator approval. |
| Indexed | Row appended to §7 of this `INDEX.md` in the same commit or immediately after. |
| Immutable | Once pushed, the entry is frozen per §3. |
| Superseded | Optionally, when reversed by a later entry per §5. The body remains; only the supersession callout is added. |

---

## 10. Audit cadence

- **Monthly:** verify every entry in §7 has a real file in this folder; verify no entry was edited post-push (`git log --diff-filter=M -- docs/changelogs/`).
- **Per release:** confirm the most recent entry's phase declaration matches the release scope.
- **Per architectural session:** confirm the new entry was generated, indexed, and the closing protocol completed.

Audit failures escalate to the operator. They are not silently fixed — they are recorded as a new changelog entry titled `<date>-changelog-audit-finding.md`.

---

## 11. Discipline reminder

This index is the **chronological backbone of project memory**. Treat it the way an architectural firm treats its drawing archive: every revision dated, every supersession declared, every prior version preserved.

Forgetting is not allowed. Tidying is not allowed. Only adding.
