# CHAT_CONTINUITY_WORKFLOW — STRATEGICLAND

> The official protocol for maintaining cinematic governance, narrative continuity, and architectural memory **across chat sessions and across agents**.
> A chat is not a conversation. A chat is **an operational session** of the project. This document defines how sessions begin, persist, and close.

---

## 1. Premise

STRATEGICLAND is a long-running cinematic system. Its identity is fragile. Every chat session that lacks proper context **drifts** — and drift is the failure mode that kills the project's DNA.

This workflow exists to:

- Rehydrate context **deterministically** at session start.
- Limit context to **what is operationally required** — never the full codebase.
- Trigger documentation updates at the **correct cadence**, not on impulse.
- Prevent the four primary failure modes of multi-session AI development:
  1. **Context flooding** — pasting everything, signal lost in noise.
  2. **Drift** — each session interpretes DNA slightly differently; the project averages toward generic.
  3. **Duplication** — the same canon redefined three different ways across chats.
  4. **Memory loss** — decisions made in chat 3 forgotten in chat 7.

---

## 2. The Two Continuity Modes

The workflow defines **exactly two** continuity modes. There are no other modes. Adding a third mode is forbidden — it dilutes the protocol.

### 2.1 LIGHTWEIGHT CONTINUITY MODE (default)

**When to use:**
- Implementing within an existing chapter / module.
- Bug fixes.
- Style polish on already-shipped features.
- Single-scene work.
- Re-running an existing pattern in a new context.

**Required prompts (in order):**
1. `MASTER_STATE.md`
2. `DESIGN_DNA.md`
3. `CURRENT_TASK_TEMPLATE.md` (instantiated with the specific task)

**Token budget:** ~12k input tokens for context, leaves headroom for work.

### 2.2 ARCHITECTURE CONTINUITY MODE

**When to use:**
- New chapter type.
- New canon HTML integration.
- Changes to `.rules/` system.
- Changes to `lib/motion/`, `lib/scroll/`, `lib/transitions/`, `lib/webgl/`, `lib/density/`, `lib/irregularity/`, `lib/sound/` engines.
- Performance budget renegotiation.
- Reference lock changes.
- Audio architecture activation.
- Cross-chapter pattern unification.

**Required prompts (in order):**
1. `MASTER_STATE.md`
2. `DESIGN_DNA.md`
3. `SESSION_CHANGELOG.md` (most recent, from `docs/changelogs/`)
4. `CURRENT_TASK_TEMPLATE.md` (instantiated)

**Optional prompts (load on demand, only if the task requires):**
- `SYSTEM_ARCHITECTURE.md` — when scaffolding new modules.
- `MOTION_GRAMMAR.md` — when writing motion code.
- `ATMOSPHERIC_LANGUAGE.md` — when composing chapter atmosphere.
- `CHAPTER_SYSTEM.md` — when adding chapter / variant.
- `HTML_CANON.md` — when implementing canon source.
- `VISUAL_REFERENCE_LOCK.md` — when introducing visual language decisions.
- `DEVELOPMENT_GUIDELINES.md` — when uncertain about workflow.

**Token budget:** ~25k input tokens for context. Hard cap: **30k tokens for context**. Beyond this, you are **flooding** — re-evaluate the mode.

---

## 3. Mode Selection Decision Tree

```
Is the task fully contained within an existing module / scene?
│
├─ YES ──► LIGHTWEIGHT MODE
│
└─ NO
   │
   ├─ Does the task introduce new motion patterns / atmosphere primitives /
   │  chapter types / canon sources / engine modules / .mdc rules?
   │  │
   │  ├─ YES ──► ARCHITECTURE MODE
   │  │
   │  └─ NO ──► LIGHTWEIGHT MODE
   │
   └─ Does the task require cross-system reasoning
      (e.g., performance + atmosphere + density)?
      │
      └─ YES ──► ARCHITECTURE MODE
```

When in doubt: **start LIGHTWEIGHT**. If the agent's first response shows it lacks context, escalate to ARCHITECTURE.

---

## 4. Continuity Order — Why It Matters

The prompt order is **operational**, not decorative. Each layer prepares the next.

```
1. MASTER_STATE   ── what exists right now, what's blocked, what's open
2. DESIGN_DNA     ── the constitution; rejects anything that's "not us"
3. SESSION_CHANGELOG (architecture only) ── what changed last session
4. CURRENT_TASK   ── what we're doing this session
```

- Loading **DESIGN_DNA** before **CURRENT_TASK** ensures the agent rejects off-DNA implementations before proposing them.
- Loading **SESSION_CHANGELOG** before **CURRENT_TASK** ensures continuity across chats.
- Loading **MASTER_STATE** first ensures the agent knows whether the codebase has moved since the last chat.

**Order violations are forbidden:**
- ❌ Pasting `CURRENT_TASK` first.
- ❌ Skipping `DESIGN_DNA` because "the agent already knows".
- ❌ Loading `.mdc` rules manually instead of relying on Cursor's auto-load.

---

## 5. Forbidden Continuity Patterns

These patterns destroy the protocol. Any of these = **session restart**.

| Forbidden                                                | Why                                                      |
|----------------------------------------------------------|----------------------------------------------------------|
| Pasting any `.mdc` rule into the chat                    | They auto-load via Cursor; pasting duplicates and drifts |
| Pasting full HTML canon files                            | Canon is referenced by ID, summarized in `HTML_CANON.md`  |
| Pasting > 1 historical chat transcript                   | Context flooding; signal collapses                       |
| Repeating the DNA Sentence in the prompt                 | It loads via `DESIGN_DNA.md`; repetition implies the agent didn't read it |
| Re-explaining cinematic philosophy                       | Documented; never re-derived                             |
| Asking the agent to "summarize the project"              | The summary already exists in `MASTER_STATE.md` + `DESIGN_DNA.md` |
| Loading more than 30k tokens of context                  | Beyond this, attention degrades; switch to a smaller scope |
| Loading `MOTION_GRAMMAR.md` for tasks with no motion     | Wasteful; load on demand                                 |
| Loading `ATMOSPHERIC_LANGUAGE.md` for tasks with no atmosphere | Same                                                |
| Pasting `package.json`, `tsconfig.json`, etc., as context | Agents can read those tools when needed                  |
| Including stylistic preferences ("be concise")           | Codified in `DEVELOPMENT_GUIDELINES.md §18`              |

---

## 6. Session Closing Protocol

A session does not end when the user closes the tab. A session ends with **the closing protocol**.

### 6.1 Trigger conditions for closing
- The current task is **completed** (PR opened, work merged, or feature shipped).
- The session has run for **> 90 minutes** of active work.
- A **structural change** has been made that future sessions need to know about.
- A **decision** has been made that affects future implementations.
- A **blocker** has been identified that requires explicit handoff.

If any of these is true, **execute the closing protocol** before closing the chat.

### 6.2 The closing protocol (5 steps, ≤ 5 minutes)

**Step 1 — Verify clean state.**
- All work committed.
- All TODOs in code resolved or moved to issues.
- All open files saved.

**Step 2 — Update `MASTER_STATE.md`.**
Specifically update:
- §3 Phase status badges (🔴 → 🟡 → ✅).
- §3 Decisions logged (any decision made this session).
- §7 Open Questions (resolved → moved to §3; new → added).

**Step 3 — Generate session changelog (if architecture mode).**
- Run the `SESSION_CHANGELOG_GENERATOR.md` prompt.
- Output saved to `docs/changelogs/YYYY-MM-DD-<short-id>.md`.
- Reference added to `MASTER_STATE.md §3 Decisions logged` if architecturally significant.

**Step 4 — Update `CURRENT_TASK_TEMPLATE.md` payload (if continuity needed).**
- Document what the **next session** must continue.
- Include: branch name, in-flight files, pending decisions, blockers.

**Step 5 — Verify next-session entry point.**
- Confirm next session can start with the LIGHTWEIGHT or ARCHITECTURE flow without reconstructing context from chat history.

### 6.3 Closing protocol violations
A session that ends without:
- Updating `MASTER_STATE.md` when a decision was made → **memory loss**.
- Generating a changelog when architecture changed → **continuity break**.
- Recording an open blocker → **drift on resume**.

These are reviewed in the next session's first 60 seconds. If found, the next session's first action is to **reconstruct the missed update**, not to write code.

---

## 7. Changelog Trigger Rules

A `SESSION_CHANGELOG.md` is generated **only when one or more of these conditions is true**:

| Condition                                                | Required? |
|----------------------------------------------------------|-----------|
| New chapter type added                                   | ✅ yes    |
| New canon HTML integrated                                | ✅ yes    |
| Existing canon HTML implementation completed             | ✅ yes    |
| `.rules/` file added, modified, or removed               | ✅ yes    |
| `lib/motion/`, `lib/scroll/`, `lib/transitions/`, `lib/webgl/`, `lib/density/`, `lib/irregularity/`, `lib/sound/` modified | ✅ yes |
| Performance budget changed                               | ✅ yes    |
| Token dictionary (`EASE`, `DUR`, `STAGGER`, `COLOR`, `TYPE_SCALE`, `BLUR`) modified | ✅ yes |
| Reference lock list (allowed/forbidden) changed          | ✅ yes    |
| Decision logged that contradicts or extends prior docs   | ✅ yes    |
| Audio architecture activated / deactivated / re-scoped   | ✅ yes    |
| New chapter instance (e.g., new case study) shipped      | ⚠ optional (only if it introduces unique patterns) |
| Bug fix without architectural impact                     | ❌ no     |
| Style polish (token-respecting)                          | ❌ no     |
| Routine PR review                                        | ❌ no     |

**Anti-spam rule:** never generate more than **one changelog per chat session**. If a session triggers multiple conditions, they are **consolidated into a single entry**.

---

## 8. Memory Update Protocol

The project's memory lives in three places, in this priority:

```
1. /docs/*.md                     ← canonical, durable, governed
2. /docs/changelogs/*.md          ← session-by-session deltas
3. .rules/*.mdc                   ── always-on creative governance
```

### 8.1 What goes in `/docs/`?
**Permanent governance.** Things that are true regardless of which session is running. Updated only when the project's foundations move.

### 8.2 What goes in `/docs/changelogs/`?
**Session deltas.** What changed this session. Read by next session as continuity context.

### 8.3 What goes in `.rules/`?
**Cursor-loaded creative constraints.** Always present in agent context, never re-pasted in chat.

### 8.4 What does NOT go in the project memory?
- **Conversation transcripts** — referenced by UUID via the agent transcripts convention; not duplicated into `/docs/`.
- **Implementation details that the code already shows** — the code is the truth for "how"; docs are the truth for "why" and "what".
- **Personal preferences of individual contributors** — codified in `DEVELOPMENT_GUIDELINES.md §18` if shared.

---

## 9. Cross-Session Recovery

If a contributor or agent picks up the project after weeks of inactivity:

### 9.1 Recovery sequence (15 minutes total)
1. **Read `MASTER_STATE.md` (5 min)** — current phase, status, decisions, open questions.
2. **Read latest 3 `docs/changelogs/*.md` entries (5 min)** — what changed recently.
3. **Read `DESIGN_DNA.md` (5 min)** — re-anchor on identity.

After 15 minutes, the recovering operator has **enough context to make decisions**. Anything more is on-demand from `/docs/*.md` and `.rules/*.mdc`.

### 9.2 Recovery anti-patterns
- ❌ Reading the entire `.rules/` directory before starting work.
- ❌ Reading every changelog entry chronologically from the project's start.
- ❌ Reading the entire codebase to "understand" before contributing.
- ❌ Asking the agent to summarize the project's history.

The 15-minute recovery is **deliberately bounded**. Beyond it, learn by **doing**, not by reading.

---

## 10. Continuity Across Agents (Multi-Agent Sessions)

When multiple agents collaborate (e.g., main + subagent for browser testing):

- **The main agent owns the continuity context.** Subagents receive **only the slice they need**.
- **Subagents do NOT receive `MASTER_STATE.md` or `DESIGN_DNA.md`** unless their task requires DNA-level reasoning.
- **Subagents return artifacts**, not context. Their output is appended to the main agent's reasoning, never to the project's memory directly.
- **Only the main agent updates `/docs/`**. Subagents may propose updates via their final response; the main agent decides whether to apply them.

---

## 11. Continuity Audit (Monthly)

Once per month, a continuity audit verifies:

- [ ] `MASTER_STATE.md` is current (phase, status, decisions match reality).
- [ ] `docs/changelogs/` has at least one entry per architecturally significant week.
- [ ] No `/docs/*.md` references a removed `.rules/` file or vice versa.
- [ ] No two `/docs/*.md` files contradict each other.
- [ ] No `.rules/` rule duplicates a `/docs/*.md` source-of-truth.

If audit fails: **schedule a continuity recalibration** — half-day re-alignment session before any new feature work.

---

## 12. The Three Continuity Sentences

Memorize these three sentences. They define the protocol in plain language.

> 1. **Every session starts with the LIGHTWEIGHT or ARCHITECTURE flow. No exceptions.**
> 2. **Every architectural session ends with `SESSION_CHANGELOG.md` + `MASTER_STATE.md` update. No exceptions.**
> 3. **Context above 30k tokens is flooding. If you need more, you're in the wrong scope.**

---

## 13. Workflow Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                          NEW CHAT SESSION                             │
└──────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
                        ┌────────────────────┐
                        │ Mode determination │
                        └────────────────────┘
                                  │
                  ┌───────────────┴───────────────┐
                  ▼                               ▼
        ┌──────────────────┐            ┌─────────────────────┐
        │ LIGHTWEIGHT MODE │            │ ARCHITECTURE MODE   │
        └──────────────────┘            └─────────────────────┘
                  │                               │
                  ▼                               ▼
       1. MASTER_STATE.md             1. MASTER_STATE.md
       2. DESIGN_DNA.md               2. DESIGN_DNA.md
       3. CURRENT_TASK (instance)     3. SESSION_CHANGELOG (latest)
                                      4. CURRENT_TASK (instance)
                  │                               │
                  ▼                               ▼
       On-demand: only the           On-demand: any /docs/ file
       /docs/ file the task          relevant; cap at 30k tokens
       directly references            total context
                  │                               │
                  └───────────────┬───────────────┘
                                  ▼
                         ┌──────────────────┐
                         │   WORK PHASE     │
                         └──────────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │  Closing trigger met?     │
                    └──────────────────────────┘
                                  │
                  ┌───────────────┴───────────────┐
                  ▼                               ▼
                  NO                              YES
                  │                               │
                  ▼                               ▼
       Continue working          1. Verify clean state
                                  2. Update MASTER_STATE.md
                                  3. Generate SESSION_CHANGELOG
                                     (if architecture)
                                  4. Update CURRENT_TASK payload
                                     (if continuity needed)
                                  5. Verify next-session entry
                                          │
                                          ▼
                                ┌──────────────────┐
                                │  CHAT CLOSED     │
                                └──────────────────┘
```

---

## 14. The Cinematic Rationale

A film is shot in scenes by different units (camera, sound, light), then assembled in the edit room. Without **continuity reports** between units, the film loses coherence — an actor wears a different shirt in two halves of the same scene.

This workflow is **the continuity reporter** of STRATEGICLAND. Without it, the project's chapters end up shot by different "units" with subtly different DNA, and the audience feels the seams.

The cost of the protocol is 5 minutes per session. The cost of skipping it is **the project itself**.
