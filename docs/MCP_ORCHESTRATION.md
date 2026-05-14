# MCP_ORCHESTRATION — STRATEGICLAND

> The human-readable operational manual for the project's Model Context Protocol orchestration layer.
> Use this document to plan workflows, review orchestration health, onboard new MCPs, and recover from orchestration failures.
> The governance contract that this manual describes lives in `.rules/mcp-orchestration-system.mdc`.

---

## 1. Orchestration Overview

### 1.1 Why orchestration exists
STRATEGICLAND is a long-running cinematic system with a fragile identity, governed by 17 `.mdc` rules, 13 `/docs/` files, and 6 frozen HTML canon files. As the project integrates more MCPs into its development environment, the risk profile changes:

- More tools means more **paths to drift**.
- More agents means more **paths to overlap**.
- More automation means more **paths to silent governance erosion**.

Orchestration is the discipline that prevents these failure modes. It exists to keep the project's identity intact while leveraging MCPs for the narrow operational tasks they're suited to.

### 1.2 Why MCPs are bounded
Without bounds, MCPs become "AI tools the agent calls when convenient" — the canonical anti-pattern of multi-agent systems. With bounds, each MCP becomes a **system actor** with:

- A defined role.
- A defined authority level.
- A defined domain.
- A defined escalation path.

The bounded model is **not** about limiting the agents — it is about ensuring the project remains **author-directed** rather than **tool-directed**.

### 1.3 Why governance matters
The project's governance is its **identity layer**. `cinematic-language.mdc`, `narrative-density-system.mdc`, `human-irregularity-system.mdc`, `DESIGN_DNA.md`, and the locked vocabularies (motion, atmosphere, color) are what separate STRATEGICLAND from a generic "premium cinematic" project.

If MCPs were allowed to suggest modifications to these — even helpful, well-meaning ones — the project would average toward the genre's mean. Governance is the **anti-averaging** mechanism. Orchestration enforces it at the agent layer.

### 1.4 Why cinematic continuity is protected
Cinematic continuity (atmospheric variance, density curves, motion choreography pacing) is the most expensive and most defining property of the project. It is also the **first** property that an "optimization mindset" would erode — performance gains, simplicity gains, accessibility gains can all be invoked to justify cutting holds, flattening atmosphere, or simplifying choreography.

The orchestration layer treats these "improvements" as **regressions**. Performance budgets exist (`performance-system.mdc`); within them, atmosphere and pacing are inviolable.

---

## 2. MCP Role Breakdown

The active MCP stack consists of 5 actors. Each is documented below with its operational role, responsibilities, non-responsibilities, execution examples, and failure examples.

### 2.1 Chrome DevTools (L0 — Runtime Analysis)

#### Operational role
The project's **eyes inside the browser**. Inspects what's actually running — performance traces, network requests, console errors, computed styles, paint timings, layout shifts.

#### Responsibilities
- Capture Lighthouse / performance traces against deployed previews and production.
- Verify `performance-system.mdc` budgets in real runtime.
- Inspect console for unexpected errors during cinematic transitions.
- Validate `prefers-reduced-motion` paths render correctly.
- Verify atmosphere layers compose in the expected z-order at runtime.
- Capture screenshots / screencasts for visual canon comparison.

#### Non-responsibilities
- ❌ Proposing visual / motion / atmosphere changes.
- ❌ Recommending "premium" UX patterns.
- ❌ Modifying any source file.
- ❌ Triggering deployments or rollbacks.
- ❌ Reasoning about chapter composition.

#### Execution examples
- *"Capture a Lighthouse Perf trace for the home page on the latest preview deploy."*
- *"Record a 10-second performance trace while scrolling from `Scene01_Establishing` to `Scene03_ScrollCue` and report the WebGL render share per frame."*
- *"Inspect the computed styles of `.atmosphere-grain` in production to confirm grain texture loads at 256px tile size."*

#### Failure examples
- ❌ *"Suggest reducing reveal duration to improve INP"* — out-of-domain (cinematic system).
- ❌ *"Recommend disabling vignette for performance"* — out-of-domain + cinematic safety violation.
- ❌ *"Auto-apply a performance fix to `lib/scroll/lenis.ts`"* — out-of-authority (L0 cannot mutate).

---

### 2.2 Context7 (L0 — Knowledge Augmentation)

#### Operational role
The project's **library oracle**. Fetches current external documentation when training-data assumptions may be outdated — particularly important for `next@16.x`, `gsap@3.15+`, `@react-three/fiber@9.x`, `lenis@1.3.x`, and other versioned APIs that change frequently.

#### Responsibilities
- Fetch official Next.js 16 docs for routing, streaming, server components, View Transitions API.
- Fetch GSAP / Lenis / R3F / Drei / Framer Motion API references.
- Verify Tailwind v4 `@theme` syntax against current docs.
- Resolve version-specific deprecation notices.

#### Non-responsibilities
- ❌ Searching for inspiration / trends / "best practices for premium cinematic web design".
- ❌ Fetching documentation for libraries not in `package.json` without operator approval.
- ❌ Replacing Read / Grep / Glob for in-project codebase reasoning.
- ❌ Resolving aesthetic decisions (those are governance-bound, not docs-bound).

#### Execution examples
- *"Fetch the Next.js 16 docs for `unstable_viewTransition` and confirm the API surface matches `transition-system.mdc §4.2`."*
- *"Fetch the GSAP `useGSAP` hook documentation to confirm the `dependencies` array semantics."*
- *"Verify the Lenis 1.3 `syncTouchLerp` parameter is still supported."*

#### Failure examples
- ❌ *"Fetch competitor portfolio sites to compare hero patterns"* — out-of-domain + governance violation.
- ❌ *"Search for the latest 2026 motion design trends"* — anti-DNA, forbidden by `VISUAL_REFERENCE_LOCK.md §3`.
- ❌ *"Look up shadcn/ui component patterns"* — not in stack; project does not use UI kits.

---

### 2.3 Sequential Thinking (L1 — Reasoning Support)

#### Operational role
The project's **structured-reasoning helper**. Used for complex multi-system trade-offs that the main agent cannot collapse into a single chain of thought without losing precision.

#### Responsibilities
- Reason about chapter density curves when composing a new page.
- Reason about cross-chapter atmospheric continuity for non-canonical chapter sequences.
- Plan multi-file refactors that touch ≥ 4 systems (motion + atmosphere + chapter + density).
- Debug failures that span runtime + governance + performance.
- Pre-implementation planning for new canonical motion patterns (extending `MOTION_GRAMMAR.md §3`).

#### Non-responsibilities
- ❌ Routine implementations (a single scene matching an existing pattern).
- ❌ Replacing the operator's creative direction.
- ❌ Resolving open questions in `MASTER_STATE.md §7` autonomously.
- ❌ Re-deriving locked vocabularies (EASE / DUR / STAGGER / TIER are already defined).
- ❌ "Thinking out loud" as a substitute for reading the relevant `.rules/` rule.

#### Execution examples
- *"Plan the integration of a new `cultural` chapter alongside the existing `case` chapter on the home page; verify density curve passes `lintPage()`."*
- *"Reason through why the `Scene03_HorizontalSequence` of `case` chapter intermittently drops frames at the panel-3 transition; identify the most likely root cause."*
- *"Plan the cross-chapter atmospheric interpolation between `human` (cool tonality) and `cultural` (warm tonality) — what `tint` interpolation curve preserves continuity?"*

#### Failure examples
- ❌ *"Use Sequential Thinking to decide which display font to use"* — anti-pattern; the choice belongs in `typography-system.mdc` and the operator's call.
- ❌ *"Reason about how to make the hero more engaging"* — forbidden language + DNA violation.
- ❌ A reasoning chain of 12 steps for adding a single scene — over-spent; the task should have referenced existing patterns.

---

### 2.4 Supabase (L2 — Backend / Data)

#### Operational role
The project's **data backbone**, when narrative backend systems exist. Currently scoped to: contact-form storage, audio credits index (when audio ships), and any future content metadata. **Not** scoped to cinematic configuration (which lives in code as tokens).

#### Responsibilities
- Schema design + migration management for narrative backend tables.
- Row-level security (RLS) for any user-facing data ingress.
- Read project schema for verification.
- Manage data exports for content team handoff.

#### Non-responsibilities
- ❌ Storing cinematic / motion / atmosphere config (those are code, not data).
- ❌ Storing chapter content (chapters live in MDX, not Supabase).
- ❌ Modifying frontend code to consume backend data (that's main-agent work).
- ❌ Provisioning databases without corresponding migration commits.
- ❌ Operating in production without operator sign-off for L2 mutations.

#### Execution examples
- *"Design a `contact_inquiries` table with RLS that allows anonymous inserts but no reads from the client."*
- *"Apply the migration `add-audio-credits-table` to the staging project; verify schema with `list_tables`."*
- *"Read the current schema and confirm the `audio_credits` table's `provenance` column exists before the closing chapter audio config consumes it."*

#### Failure examples
- ❌ *"Store the chapter atmosphere config in a Supabase table for runtime fetching"* — anti-pattern; atmosphere config is build-time governance, not data.
- ❌ *"Modify the React component that consumes the contact form"* — out-of-domain (frontend code, main agent's work).
- ❌ *"Apply a multi-table migration in one go"* — escalation required (per `mcp-orchestration-system.mdc §2.3 Supabase`).

---

### 2.5 Vercel (L3 — Deployment / Runtime)

#### Operational role
The project's **deployment runtime owner**. Handles preview / production deploys, environment variables, log retrieval, and rollbacks. The only L3 actor in the active stack.

#### Responsibilities
- Trigger preview deploys for confirmed branches.
- Trigger production deploys after CI gates pass.
- Read production logs for incident response.
- Manage environment variables (with operator sign-off).
- Execute manual rollback when production regressions are detected.

#### Non-responsibilities
- ❌ Modifying source code in any branch.
- ❌ Modifying `.rules/` or `/docs/`.
- ❌ Bypassing CI gates (Lighthouse Perf ≥ 90, A11y ≥ 95, bundle ≤ 180 KB gzip).
- ❌ Promoting experimental branches to production without operator approval.
- ❌ Suggesting code changes ("change motion durations to improve INP" is out-of-domain).

#### Execution examples
- *"Trigger a preview deploy of the `chapter/cultural-impacto` branch."*
- *"Pull the last 50 production deploy logs to verify the most recent deploy completed without runtime errors."*
- *"Roll back production to the deploy from 2026-05-12 due to confirmed performance regression."*

#### Failure examples
- ❌ *"Promote a branch to production without CI green"* — bypass forbidden.
- ❌ *"Set `NEXT_PUBLIC_*` environment variables without operator approval"* — escalation required.
- ❌ *"Suggest disabling the WebGL atmosphere to improve TTFB"* — out-of-domain + cinematic safety violation.

---

## 3. Operational Hierarchy

### 3.1 Authority chain
The hierarchy is fixed:

```
Operator (creative direction)
   └── Main agent (Cursor session owner)
         ├── Subagents (explore, browser-use, shell)  — read-bounded
         └── MCP actors (L0 / L1 / L2 / L3)            — bounded per §2
```

Higher authority may delegate. Lower authority **never** initiates without delegation. There is no "agent autonomy" mode in this project.

### 3.2 Main agent role
The main agent owns the chat session. It is the **only** entity that:
- Reads the operational memory layer (`MASTER_STATE.md`, `DESIGN_DNA.md`, `/docs/changelogs/`).
- Writes to source code.
- Writes to operational memory at session close.
- Decides which MCP / subagent to invoke and with what slice of context.

### 3.3 Subagent role
Subagents are **scoped helpers**. Per `CHAT_CONTINUITY_WORKFLOW.md §10`:
- They receive **only** the slice of context their task requires.
- They return **artifacts**, not state.
- They may not write to the continuity layer.
- They may not spawn further subagents.
- They may invoke MCPs only within the parent's authority and only for their delegated task.

### 3.4 MCP role
Per `mcp-orchestration-system.mdc §2`. MCPs are **system actors with bounded authority**, not utilities. Each carries an authority level (L0–L3), a primary domain, a non-domain, and an escalation condition. They contribute artifacts to the main agent's reasoning; they do not own outcomes.

### 3.5 Ownership chain
For any task touching multiple actors:

```
Operator defines the task
   ↓
Main agent plans the implementation, references .rules/ + /docs/
   ↓
Main agent decides whether MCP / subagent is required
   ↓
If MCP/subagent invoked, output returns to main agent
   ↓
Main agent integrates output, writes code, writes docs
   ↓
Main agent runs the cinematic preservation checklist
   ↓
Main agent generates session changelog at close (if architecture mode)
   ↓
Operator reviews, approves, merges
```

### 3.6 Escalation flow
An operation must escalate **upward** when:
- An MCP returns a result that conflicts with any `.rules/` constraint.
- A subagent reports a blocker outside its delegated slice.
- An L2 / L3 MCP would mutate state in production.
- Two MCP findings appear to contradict.
- Sequential Thinking exceeds 7 steps.
- Any continuity-corrupting operation is required.

Escalation is **synchronous** — the chain halts until resolved. There is no "best-effort continue" path.

### 3.7 Orchestration order
Within a single task, the order is:
1. Main agent reads relevant `.rules/` + `/docs/` context.
2. Main agent identifies gaps requiring MCP support (rare — most tasks need none).
3. Main agent invokes MCPs **one at a time**, with pre/post justification.
4. Main agent integrates MCP outputs and writes code.
5. Main agent runs cinematic preservation checklist.
6. Main agent commits + opens PR with canonical references.
7. (Session close) Main agent runs closing protocol per `DEVELOPMENT_GUIDELINES.md §12.5`.

---

## 4. Orchestration Workflows

The following workflows describe how to compose MCPs + subagents for common operational scenarios. Each is **prescriptive** — deviations require justification.

### 4.1 Runtime debugging workflow
**Trigger:** chapter atmosphere flickers, scroll jank, WebGL context loss, console errors in production.

```
1. Main agent reproduces locally if possible.
2. If reproducible only in production:
   ├─ Vercel (L3) → pull recent deploy logs.
   └─ Chrome DevTools (L0) → record performance trace + console capture from production URL.
3. Main agent analyses the trace against performance-system.mdc budgets.
4. If the cause spans systems (e.g., motion + WebGL + scroll):
   └─ Sequential Thinking (L1) → reason about root cause across systems.
5. Main agent identifies fix; reads .rules/ for any constraint that bounds the fix.
6. Main agent implements fix locally; verifies via local Chrome DevTools trace.
7. Main agent opens PR with the trace as artifact.
8. Vercel (L3) → preview deploy; verify with Chrome DevTools (L0) on preview URL.
9. CI gates pass → operator approves → production deploy.
```

**Forbidden in this workflow:**
- Vercel rolling back production "preemptively" before the cause is identified.
- Chrome DevTools "auto-fixing" via DevTools Protocol mutations.
- Skipping the .rules/ consultation step.

### 4.2 Cinematic review workflow
**Trigger:** new chapter / scene shipped to preview; pre-merge cinematic verification.

```
1. Main agent ensures the implementation passes the Cinematic Preservation Checklist (CURRENT_TASK_TEMPLATE.md §3).
2. Vercel (L3) → trigger preview deploy.
3. Chrome DevTools (L0) → screen-record the chapter at 60fps for ≥ 30 seconds.
4. Operator + main agent compare side-by-side with the canon HTML (HC-XX).
5. If divergence detected:
   ├─ Within canon-correction zone → log + accept.
   └─ Outside canon-correction zone → main agent revises; re-run from step 2.
6. Once aligned: PR review + merge per DEVELOPMENT_GUIDELINES.md §4.
```

**Forbidden in this workflow:**
- Chrome DevTools "suggesting" cinematic improvements.
- Sequential Thinking "deciding" if the chapter is on-DNA — the operator owns that.
- Bypassing the canon side-by-side compare.

### 4.3 Performance audit workflow
**Trigger:** weekly cadence, or when a feature lands that introduces motion / WebGL / atmosphere.

```
1. Vercel (L3) → confirm production is on the latest expected deploy.
2. Chrome DevTools (L0) → run Lighthouse on home + 1 case + 1 cultural page.
3. Chrome DevTools (L0) → record 10s scroll trace per page; capture FPS, render share, bundle.
4. Compare results to performance-system.mdc §2 budgets and SYSTEM_ARCHITECTURE.md §11.
5. If any budget exceeded:
   └─ Main agent identifies the offending change via git bisect / coverage analysis.
6. If degradation needed:
   └─ Apply degradation strategy from performance-system.mdc §11 — sacrifice atmosphere first, then WebGL, then magnetic, never typography or a11y.
7. Document in a session changelog per SESSION_CHANGELOG_GENERATOR.md (trigger: performance budget changed).
```

### 4.4 Deployment review workflow
**Trigger:** a PR is approved and ready for production deploy.

```
1. Main agent confirms CI gates pass (Lighthouse, bundle, lint, build).
2. Main agent confirms visual regression diff approved (if applicable).
3. Main agent confirms reduced-motion path verified locally.
4. Vercel (L3) → trigger preview deploy.
5. Chrome DevTools (L0) → post-deploy verification on preview URL (smoke test + Lighthouse).
6. Operator approves production promotion.
7. Vercel (L3) → promote to production.
8. Chrome DevTools (L0) → post-production verification on prod URL.
9. Main agent updates MASTER_STATE.md §3 phase if applicable.
10. Main agent generates session changelog if architecturally significant.
```

**Forbidden in this workflow:**
- Vercel auto-promoting without operator approval.
- Skipping the preview verification step.
- Production deploys outside operator-approved deploy windows.

### 4.5 Continuity-safe architecture changes workflow
**Trigger:** new chapter type, new canon HTML integration, new engine module, new `.rules/` rule, token dictionary modification.

```
1. Open a `chapter/` or `infra/` or `rule/` branch per DEVELOPMENT_GUIDELINES.md §3.1.
2. Mode: ARCHITECTURE per CHAT_CONTINUITY_WORKFLOW.md §2.2.
3. Load: MASTER_STATE.md, DESIGN_DNA.md, latest SESSION_CHANGELOG, CURRENT_TASK_TEMPLATE.md (instantiated).
4. If task spans ≥ 4 systems → Sequential Thinking (L1) for planning, ≤ 7 steps.
5. If implementation requires unfamiliar library API → Context7 (L0) fetch.
6. Main agent implements per relevant .rules/ + /docs/.
7. Run lintPage() in dev for affected pages.
8. Local verification + commit + PR.
9. Closing protocol (per DEVELOPMENT_GUIDELINES.md §12.5):
   ├─ Update MASTER_STATE.md §3.
   ├─ Generate session changelog.
   ├─ Update affected /docs/ if structural.
   └─ Update affected .rules/ if rule changed.
```

**Forbidden in this workflow:**
- Skipping the SESSION_CHANGELOG (architecture mode requirement).
- Modifying multiple `.rules/` files in one PR (sequence them).
- Skipping the closing protocol because "the work is small".

### 4.6 Narrative backend operations workflow
**Trigger:** new contact form, audio credits ingestion, content metadata tracking.

```
1. Operator defines the data shape and access pattern.
2. Main agent designs the schema; runs through Sequential Thinking (L1) if RLS requirements are non-trivial.
3. Supabase (L2) → list current tables, read schema.
4. Main agent writes migration SQL + commits to repo.
5. Supabase (L2) → apply migration to staging project.
6. Main agent writes the consuming frontend code (Server Action / RSC fetch).
7. Local verification + Chrome DevTools (L0) for runtime check.
8. PR review + Supabase (L2) apply to production after merge.
9. Generate session changelog (governance change: backend data layer extended).
```

**Forbidden in this workflow:**
- Storing cinematic config in Supabase.
- Multi-table migrations in one go (split + sequence).
- Bypassing the staging-first applyto.

---

## 5. Review Pipelines

### 5.1 Pre-merge review
Standard PR review per `DEVELOPMENT_GUIDELINES.md §4`. Reviewer applies the §4.2 checklist. Cinematic and performance reviews are **part of** pre-merge for relevant PRs.

### 5.2 Cinematic review
Triggered when a PR touches `components/chapters/`, `lib/motion/`, `lib/atmosphere/`, `lib/transitions/`, `lib/webgl/`, or any HC-XX implementation.

- **Verifier:** operator (creative direction).
- **MCP support:** Chrome DevTools (L0) for screen capture; Vercel (L3) for preview deploy.
- **Required artifact:** side-by-side recording vs canon HTML.
- **Block conditions:** any DNA Anti-Test failure (`DESIGN_DNA.md §6`); any forbidden reference (`VISUAL_REFERENCE_LOCK.md §3`); any forbidden motion / atmosphere pattern.

### 5.3 Performance review
Triggered when a PR adds JS / CSS / WebGL / images, or when CI Lighthouse score drops > 2 points.

- **Verifier:** main agent + reviewer.
- **MCP support:** Chrome DevTools (L0) for trace; Vercel (L3) for preview.
- **Required artifact:** Lighthouse report + render-share trace.
- **Block conditions:** any `performance-system.mdc §2` budget exceeded; INP > 200ms p75; FPS < 55 sustained on 1440px.

### 5.4 Continuity review
Triggered when a PR modifies `/docs/`, `.rules/`, `MASTER_STATE.md`, or any `docs/changelogs/` entry.

- **Verifier:** operator + main agent.
- **MCP support:** none (continuity is human-and-agent territory).
- **Required artifact:** cross-reference verification (no broken anchors, no contradictions).
- **Block conditions:** MASTER_STATE.md inconsistencies; doc-to-rule contradictions; missing required follow-up updates per `DEVELOPMENT_GUIDELINES.md §13`.

### 5.5 Orchestration audit
Triggered monthly (per `CHAT_CONTINUITY_WORKFLOW.md §11`).

- **Verifier:** operator + main agent (next session start).
- **MCP support:** none.
- **Audit checklist:**
  - [ ] All MCP invocations in the past month had pre/post justification (per `mcp-orchestration-system.mdc §7.3`).
  - [ ] No MCP wrote to a forbidden domain.
  - [ ] No subagent mutated the continuity layer.
  - [ ] Per-session orchestration overhead within budget (per `mcp-orchestration-system.mdc §7.1`).
  - [ ] All architecture sessions produced changelogs.
  - [ ] No L3 (Vercel) deploys bypassed CI gates.
  - [ ] No L2 (Supabase) mutations outside the staging-first protocol.
- **Output:** continuity audit log appended to `docs/changelogs/INDEX.md`.

---

## 6. Continuity Relationship

The orchestration layer integrates with the continuity infrastructure as follows:

### 6.1 Relationship to `CHAT_CONTINUITY_WORKFLOW.md`
- The continuity workflow defines **how sessions begin and end**.
- The orchestration layer defines **what may happen between begin and end**.
- Mode determination (LIGHTWEIGHT vs ARCHITECTURE) bounds the orchestration overhead budget per `mcp-orchestration-system.mdc §7.1`.
- Closing protocol triggers the changelog when MCP-driven changes are made.

### 6.2 Relationship to `SESSION_CHANGELOG_GENERATOR.md`
- MCP-driven changes that meet a changelog trigger condition (`SESSION_CHANGELOG_GENERATOR.md §2`) **must** be logged.
- Specifically: any L2 (Supabase) schema mutation, any L3 (Vercel) deploy with code changes, and any Sequential Thinking chain that produced an architectural decision are changelog-worthy.
- The changelog cites the MCP invocation in the relevant section (e.g., §2 Architectural changes, §10 Governance changes).

### 6.3 Relationship to `MASTER_STATE.md`
- MCP-driven decisions are logged in `MASTER_STATE.md §3 Decisions logged` when they affect the project's state.
- Examples: Vercel-managed environment variable additions, Supabase schema decisions, performance budget renegotiation backed by Chrome DevTools traces.
- MCP-introduced phase changes (e.g., audio architecture activated via Supabase migration shipped) update `MASTER_STATE.md §3` phase badges.

### 6.4 Relationship to `SYSTEM_ARCHITECTURE.md`
- The orchestration layer is the **agent-runtime equivalent** of the codebase's runtime architecture.
- `SYSTEM_ARCHITECTURE.md §15` (Continuity Layer Architecture) names the orchestration governance under the Operational Governance Layer.
- The MCP responsibility matrix (`mcp-orchestration-system.mdc §2`) and the codebase module map (`SYSTEM_ARCHITECTURE.md §8`) together describe **how work happens** end-to-end.

---

## 7. Failure Recovery

### 7.1 Orchestration rollback
When an MCP-driven change must be reversed:

```
1. Identify the change scope:
   ├─ Source code → revert commit + push.
   ├─ Production deploy → Vercel (L3) rollback.
   ├─ Database schema → Supabase (L2) rollback migration (or fix-forward if irreversible).
   └─ Continuity layer (forbidden — should never happen) → manual restore from git history.
2. Verify the rollback was complete (Chrome DevTools L0 if runtime affected).
3. Generate an incident changelog per SESSION_CHANGELOG_GENERATOR.md §2 ("decision logged that contradicts or extends prior docs").
4. Update MASTER_STATE.md §3 Decisions logged with the incident summary.
```

### 7.2 Continuity restoration
When `MASTER_STATE.md` or `/docs/changelogs/` is detected as out-of-sync with reality:

```
1. Halt all new work.
2. Reconstruct missed updates by examining git history of the past N sessions.
3. Generate a retroactive `docs/changelogs/YYYY-MM-DD-continuity-restoration.md` entry.
4. Update MASTER_STATE.md §3 to reflect actual current state.
5. Resume work only after the restoration PR is merged.
```

### 7.3 Recovery protocol per failure mode
The full failure-mode-to-recovery matrix lives in `mcp-orchestration-system.mdc §9.1`. Use that as the canonical lookup; this document references it.

### 7.4 Conflict recovery
When two MCPs (or one MCP and one main-agent action) collide:

```
1. Halt both operations.
2. Apply the higher-authority outcome (per mcp-orchestration-system.mdc §6.3).
3. Roll back the lower-authority action.
4. Log the conflict in session notes; include in changelog if material.
5. Tighten the orchestration guard if the conflict was process-level (e.g., subagent given excessive scope).
```

### 7.5 Escalation chain
For any failure that cannot be resolved within the session:

```
Subagent / MCP detects → halts and surfaces
                              ↓
Main agent evaluates → may resolve, may escalate
                              ↓
Operator (creative direction) → final authority
                              ↓
If beyond operator: schedule continuity recalibration (CHAT_CONTINUITY_WORKFLOW.md §11)
```

---

## 8. Governance Discipline

### 8.1 Orchestration restraint
The default orchestration count is **zero**. Every invocation must be justified. The mature operator + main agent ship features with **fewer** MCP calls over time, not more.

Indicators of orchestration over-spend:
- Every PR mentions MCP usage.
- Sequential Thinking is invoked for routine implementations.
- Chrome DevTools traces accumulate without matching performance changes.
- Context7 fetches re-cover documentation already internalized in prior sessions.

### 8.2 Human oversight
The operator retains:
- Final authority over creative decisions.
- Approval for L2 / L3 mutations to production.
- Approval for `.rules/` changes.
- Approval for `/docs/` structural changes.
- Approval for new MCP integrations (per §9).

The main agent **executes** the operator's intent; it does not **substitute** for it.

### 8.3 Cinematic preservation
The orchestration layer's **first job** is preserving the cinematic identity. If an MCP invocation produces a recommendation that compromises atmospheric continuity, density curve, motion vocabulary, or any other DNA-bound property, the recommendation is **rejected by default**.

A rejected MCP recommendation is not a failure — it is the orchestration working correctly.

### 8.4 Operational rigor
Every MCP invocation has:
- A pre-justification (one sentence: why this MCP, why now, what the output enables).
- A post-summary (one sentence: what was learned, what the next step is).
- A reference to its authority level + domain (per §2).

Without the pre/post block, the invocation is **process-non-compliant** and surfaces as a violation in the orchestration audit.

### 8.5 Anti-chaos principles
- One MCP per task, ideally.
- One reasoning chain per decision.
- One mutation per resource per session.
- One operator approval per L2 / L3 production change.
- One changelog per architectural session.

When in doubt: do less.

---

## 9. Future MCP Integration Policy

### 9.1 Onboarding requirements
A new MCP cannot enter the active stack without:

1. A **proposal PR** with `infra:` prefix containing:
   - The MCP's name, vendor, license.
   - The MCP's authority level (L0–L3).
   - The MCP's primary domain assignment (per §5.1).
   - The MCP's non-domain (forbidden territory).
   - The MCP's escalation conditions.
   - The expected operational use cases (concrete, not speculative).
   - The expected orchestration overhead added (per `mcp-orchestration-system.mdc §7.1`).

2. A **continuity impact analysis** documenting:
   - Whether the MCP can write to the continuity layer (must be **no**).
   - Whether the MCP duplicates an existing actor's role.
   - Whether the MCP's domain overlaps an existing actor's domain.
   - Whether the MCP introduces any failure mode not covered by §9.1 in the orchestration rule.

3. **Operator sign-off** on the PR, with explicit acknowledgment of authority assignment.

4. **Updates** to:
   - `mcp-orchestration-system.mdc §2.2` (responsibility matrix).
   - `mcp-orchestration-system.mdc §2.3` (per-MCP execution boundaries).
   - This document's §2 (role breakdown).
   - `MASTER_STATE.md §3 Decisions logged`.
   - `docs/changelogs/` entry per `SESSION_CHANGELOG_GENERATOR.md §2` (governance change).

### 9.2 Governance review
Every MCP onboarding triggers a governance review:
- Is the MCP's authority level minimal for its job?
- Is its domain narrowly scoped?
- Does it duplicate any existing capability that the main agent could perform natively?

If any answer is "yes, it overlaps", the proposal is **revised or rejected**.

### 9.3 Authority assignment
Authority is **never** assigned higher than necessary:
- Read-only diagnostics → L0.
- Reasoning support → L1.
- Project data layer → L2.
- Production runtime → L3.

There is no L4 (codebase mutation) and no plan to introduce one. Code is the main agent's responsibility, period.

### 9.4 Domain assignment
Each new MCP receives **one** primary domain. Multi-domain MCPs are decomposed (the project uses the relevant capability bounded to one domain; the others are off).

If a new MCP genuinely spans two domains, the proposal must explain why splitting it across two MCPs is not feasible.

### 9.5 Conflict analysis
Before approval, the proposal documents:
- What conflicts with existing MCPs are possible (e.g., "Both this MCP and Chrome DevTools could capture screenshots — assign exclusive ownership to which?").
- How conflicts will be detected and arbitrated (per `mcp-orchestration-system.mdc §6`).

### 9.6 Continuity impact analysis
- The MCP **must not** be able to write to `/docs/`, `.rules/`, or `docs/changelogs/`.
- The MCP **must not** retain state across sessions.
- The MCP **must not** be invoked recursively.

If the MCP's protocol allows behaviors that violate these, the integration is gated until guards are in place at the orchestration layer.

### 9.7 Forbidden integration practices
- ❌ **Spontaneous MCP addition** — installing an MCP via Cursor settings without the §9.1 proposal flow.
- ❌ **Unreviewed orchestration expansion** — using a newly-installed MCP in a session before it appears in the responsibility matrix.
- ❌ **Experimental orchestration in production** — testing new MCP capabilities against production resources (Supabase project, Vercel production deploy) without staging.

---

## 10. Forbidden Philosophy

The orchestration layer explicitly **rejects** the following ideas. They are not considered, not entertained, not tested.

### 10.1 "AI replaces direction"
False. The operator's creative direction is the **first** authority, the **last** authority, and the only authority that can **resolve** open questions. AI assists; it does not author.

### 10.2 "Fully autonomous creativity"
False. The project's identity is hand-authored, hand-defended, and hand-shipped. No autonomous agent will be permitted to author cinematic decisions, governance rules, or canon. AI executes within author-defined bounds.

### 10.3 "Infinite automation"
False. The cost of automation is restraint, not scaling. Adding MCPs reduces clarity, not increases it, beyond the minimum necessary stack. The optimal MCP count is "the smallest set that ships the work without compromising governance".

### 10.4 "Agent swarms"
False. Multi-agent systems with autonomous coordination are forbidden. Subagents are scoped helpers under main-agent authority, not peers. There is no "AI team", only "agents that report to a main agent that reports to an operator".

### 10.5 "Self-improving aesthetic systems"
False. The aesthetic does not improve through ML iteration, A/B testing, or autonomous variant generation. The aesthetic is **authored**, **defended**, and **iterated by humans**. MCPs may inform, never optimize.

---

## 11. Reinforcement: Human Creative Direction Remains Primary

Every clause of this document, every clause of `mcp-orchestration-system.mdc`, every workflow, every authority assignment, and every escalation rule exists to enforce **one principle**:

> **The project's identity is human-authored, and orchestration exists to protect that authorship from erosion.**

If at any point a workflow, a tool, or an agent appears to act against this principle, the workflow / tool / agent is wrong — and the principle wins.

---

## 12. The MCP Orchestration Manual's Job in One Sentence

> **Make every MCP invisible until needed, bounded when used, and silent again the moment its job is done.**

The orchestration is not the project's intelligence. The project's intelligence is its operator, its rules, its canon, and its docs. The orchestration is the discipline that keeps those four authorities **in charge**.
