# DOCS_GENERATOR_PROMPT — STRATEGICLAND

> The operational prompt for generating future documentation **consistently** with the existing `/docs/` ecosystem.
> Use this prompt whenever a new `/docs/*.md` file is required, or when an existing doc must be substantially extended.
> The prompt enforces philosophy, formatting, governance alignment, and anti-filler standards in a single place.

---

## 1. Purpose

The `/docs/` system is the project's **governance layer**. Every doc carries equal weight: a poorly written doc dilutes the system as much as a missing one.

This prompt exists to ensure that **any new doc** is generated with:

- The same philosophy as the existing 13 docs.
- The same structural rigor.
- The same cinematic language.
- The same anti-filler discipline.
- The same alignment with `.rules/` and the HTML canon.

Without this prompt, doc quality degrades chat by chat.

---

## 2. When to Use

- A **new `/docs/*.md` file** is being created.
- An **existing `/docs/*.md` file** is being extended by > 30% of its current length.
- A **major restructure** of an existing doc is being planned.
- The continuity audit (`CHAT_CONTINUITY_WORKFLOW.md §11`) flags a doc-quality regression.

Do **not** use this prompt for:
- Minor edits / typos / small additions to existing docs.
- Rewriting `MASTER_STATE.md §3 Phase` (the format is already locked).
- Updating `docs/changelogs/*.md` entries (use `SESSION_CHANGELOG_GENERATOR.md` instead).

---

## 3. Documentation Philosophy

Every doc in `/docs/` adheres to **eight principles**. New docs must adopt them; existing docs are auditable against them.

### Principle 1 — **Operational, not aspirational**
Docs describe **what is** and **what must be**, never **what would be nice**. If a doc contains "ideally" or "in the future, we might", that section needs to move to `MASTER_STATE.md §7 Open Questions` or be removed.

### Principle 2 — **Source-of-truth or silence**
Every claim in a doc is either **the source of truth** or **a reference to one**. Never restate. If `.rules/motion-system.mdc` defines `EASE.cinematic`, a `/docs/` reference is `per motion-system.mdc §X.Y`, not the value re-typed.

### Principle 3 — **Cinematic vocabulary**
Always use:
- *Scene*, *chapter*, *shot*, *cut*, *atmosphere*, *grade*, *vignette*, *grain*, *light leak*, *establishing*, *closing*, *outro*, *residue*, *tier*, *energy*, *cadence*, *pacing*, *dissolve*, *seam*.

Never use:
- *Section*, *page* (when "chapter" is meant), *background*, *level* (when "tier" is meant), *element* (when "shot" is meant), *animation* (when "motion" is meant), *transition* (UI sense; allowed in cinematic sense), *interaction* (use only as system name).

### Principle 4 — **No filler**
Every sentence must be load-bearing. Indicators that a sentence is filler:
- Starts with "It is important to note that…"
- Adds "essentially", "basically", "in essence", "fundamentally" without changing meaning.
- Repeats what the previous sentence already said.
- Repeats what an earlier section already said.
- Provides a "summary" before the actual content (we have a §X for that).

If a sentence can be deleted without information loss, **delete it**.

### Principle 5 — **Numbered sections, hierarchical anchors**
Every doc uses `## 1. ...`, `## 2. ...` heading structure. Subsections `### X.Y`. This makes cross-references stable: `MOTION_GRAMMAR.md §3.5` is unambiguous and clickable in editors.

### Principle 6 — **Tables for inventories, code blocks for canonical values**
- Inventories (canon files, chapter types, tokens, allowed/forbidden) → tables.
- Canonical code (eases dictionary, GSAP timeline pattern, atmosphere config schema) → fenced code blocks.
- Prose for rationale and flow only.

### Principle 7 — **Each doc has one job**
A doc that does two jobs is two docs. The 13 existing docs:
- `MASTER_STATE.md` — current state.
- `DESIGN_DNA.md` — identity.
- `SYSTEM_ARCHITECTURE.md` — technical translation.
- `HTML_CANON.md` — frozen visual contract.
- `VISUAL_REFERENCE_LOCK.md` — allowed / forbidden references.
- `MOTION_GRAMMAR.md` — motion vocabulary.
- `ATMOSPHERIC_LANGUAGE.md` — atmosphere stack.
- `CHAPTER_SYSTEM.md` — chapter inventory.
- `DEVELOPMENT_GUIDELINES.md` — workflow.
- `CHAT_CONTINUITY_WORKFLOW.md` — session protocol.
- `CURRENT_TASK_TEMPLATE.md` — session task container.
- `SESSION_CHANGELOG_GENERATOR.md` — changelog prompt.
- `DOCS_GENERATOR_PROMPT.md` — this doc.

A new doc must justify why **none of these** can absorb its content.

### Principle 8 — **Closing meta-section**
Every doc ends with one of:
- A **one-sentence summary** of the doc's job (e.g., `MOTION_GRAMMAR.md §11`, `DESIGN_DNA.md §11`).
- A **decision filter** (`VISUAL_REFERENCE_LOCK.md §11`, `DESIGN_DNA.md §10`).
- A **maintenance protocol** (`HTML_CANON.md §10`, `DOCS_GENERATOR_PROMPT.md §10`).

This ending acts as the **doc's signature** — it tells the reader the doc is complete and how to use it at a glance.

---

## 4. Formatting Standards

### 4.1 Top of every doc
```markdown
# <DOC_NAME> — STRATEGICLAND

> 1–2 sentence purpose statement.
> Optional second blockquote line for "when to use" or "what this is not".

---
```

The `# <DOC_NAME> — STRATEGICLAND` heading is **mandatory and uniform** across every doc.

### 4.2 Section separators
Use `---` (three dashes) between top-level sections **only when the doc exceeds 200 lines**. Below 200 lines, blank line separation is sufficient.

### 4.3 Headings
- `## N. Title` for top-level sections.
- `### N.M Subtitle` for subsections.
- `#### N.M.K Detail` only when truly needed; ≥ 4 levels deep is a smell.

### 4.4 Lists
- Use `-` (hyphen) for bullets. Never `*`.
- Use numbered lists (`1.`, `2.`, ...) for ordered protocols only.
- Two-space indent for nested bullets.

### 4.5 Code blocks
- Always specify the language: ` ```ts `, ` ```css `, ` ```glsl `, ` ```sh `, ` ```markdown `.
- Use ` ```text ` for filesystem trees and pseudo-code.
- Never use bare ` ``` ` (no language) except inside `<COPY START>` / `<COPY END>` template blocks.

### 4.6 Tables
- Always include a header row.
- Always include alignment colons when the column has consistent alignment requirement.
- Vertical bars at start and end of every row.

### 4.7 Cross-references
- Within the same doc: `§N.M`.
- To another `/docs/` file: `<filename>.md §N.M`.
- To a `.rules/` file: `<rule>.mdc §N.M` (or `<rule>.mdc` if entire rule applies).
- To a canon HTML: `HC-XX §N.M`.
- To external URLs: full URL in markdown link.

### 4.8 Emphasis
- **Bold** for terms being defined or for non-negotiable constraints.
- *Italic* for cinematic terms in their first usage in the doc, and for quoted aesthetic statements.
- ALL CAPS for project-locked tokens (`EASE`, `DUR`, `TIER`, `STAGGER`).
- ❌ / ✅ / ⚠ / 🔴 / 🟡 / ✅ ⛔ 🚫 — used **only** in tables / status indicators, never in prose.

---

## 5. Cinematic Language Consistency

### 5.1 Mandatory vocabulary
- The site is a *film*; not an *experience*, *journey*, or *site*.
- Audiences *watch* / *witness* / *inhabit*; they do not *engage* / *consume* / *interact* with.
- Atmosphere is *air* / *room* / *grade*; not *background* / *vibe* / *theme*.
- Restraint is *confidence*; not *minimalism* (avoid the word — too associated with luxury cliché).
- Decisions are *signed* / *authored*; not *chosen* / *picked*.

### 5.2 Forbidden vocabulary
| Forbidden               | Why                                                        |
|-------------------------|------------------------------------------------------------|
| premium                 | SaaS marketing                                             |
| sleek / polished        | luxury cliché                                              |
| modern / contemporary   | trend-tied; ages instantly                                 |
| innovative / cutting-edge | startup adjective                                       |
| engaging / immersive (UX sense) | "immersive" allowed in cinematic sense; not UX sense |
| seamless                | UX cliché                                                  |
| delightful / fun / playful | SaaS adjective                                          |
| user / users            | use *audience*, *visitor*, *operator* (per role)           |
| UX / UI                 | use *interaction*, *composition*, *interface* if needed    |
| frictionless            | invisible UI cliché                                        |
| empower                 | startup verb                                               |
| democratize             | startup verb                                               |

### 5.3 Tone
- Direct. Senior Principal Engineer voice (`DEVELOPMENT_GUIDELINES.md §18.2`).
- No hedging ("perhaps", "maybe", "I think").
- No apologies ("unfortunately", "this is admittedly").
- No filler enthusiasm ("great!", "awesome!", "exciting work").
- Where uncertainty exists, name it explicitly: "Open question: ..." or "To be confirmed: ...".

---

## 6. Governance Alignment

### 6.1 Resolution priority
A new doc must respect the resolution priority defined in `SYSTEM_ARCHITECTURE.md §14`:

```
DESIGN_DNA > cinematic-language.mdc > narrative-density-system.mdc
> human-irregularity-system.mdc > HTML_CANON > all other .mdc
> performance / responsive .mdc > project-structure.mdc
> SYSTEM_ARCHITECTURE > DEVELOPMENT_GUIDELINES
```

A new doc cannot **outrank** an existing rule. If a new doc claims authority over a higher-rank doc, it is misplaced — the change belongs in the higher-rank doc.

### 6.2 Source-of-truth handoffs
Every claim in a new doc must point to its source of truth:
- **Cinematic identity claim** → `DESIGN_DNA.md`.
- **Visual / motion / atmosphere implementation detail** → corresponding `.rules/*.mdc`.
- **Canon source** → `HTML_CANON.md`.
- **Token value** → `lib/<domain>/<tokens>.ts` (referenced via `.rules/`).
- **Workflow / process** → `DEVELOPMENT_GUIDELINES.md` or `CHAT_CONTINUITY_WORKFLOW.md`.

A new doc that **redefines** any of these is a violation. Reference, never restate.

### 6.3 No `.mdc` paste-in
A `/docs/` file **never** contains the body of a `.mdc` rule. The agent loads `.mdc` files from Cursor automatically. `/docs/` summarizes and references; it does not duplicate.

---

## 7. Anti-Filler Discipline

### 7.1 The deletion test
For every paragraph, delete it and re-read the doc. If the doc's information content is unchanged, the paragraph was filler — keep it deleted.

### 7.2 The references test
For every claim, ask: "What is this claim's source?" If the claim is its own source (i.e., it is being defined here), it must be a **canonical definition** — not a restatement.

### 7.3 The duplication test
For every section, search the rest of `/docs/` for similar content (`rg -i <key phrase>`). If a near-match exists, **link to it** instead of restating it.

### 7.4 The structure test
A doc with > 5% of its lines being headings has too few sections OR sections too short. A doc with < 1% headings has too few sections to be navigable. Aim for 2–3% headings.

### 7.5 Length budget by doc type
| Doc type                                 | Target length (lines) |
|------------------------------------------|------------------------|
| Identity / state / DNA                   | 200–400                |
| Architecture / system                    | 400–600                |
| Vocabulary / grammar (motion, atmosphere)| 500–700                |
| Inventory (canon, chapters)              | 400–700                |
| Workflow / protocol                      | 250–500                |
| Operational prompt (this kind)           | 250–400                |

A doc 50%+ over its budget needs splitting. A doc 50%+ under is incomplete.

---

## 8. The Generation Prompt (Copy from `<COPY START>` to `<COPY END>`)

Paste this into a chat to generate a new `/docs/*.md` file. Provide the agent with the doc's name and purpose.

<COPY START>

# GENERATE STRATEGICLAND DOCUMENTATION

You are creating a new `/docs/*.md` file for STRATEGICLAND. Adhere strictly to `docs/DOCS_GENERATOR_PROMPT.md` philosophy and standards.

## Doc to generate
- **Filename:** `docs/<DOC_NAME>.md`
- **Purpose:** [1–2 sentences]
- **Length budget:** [target line range from §7.5]

## Mandatory structure
- Top heading exactly: `# <DOC_NAME> — STRATEGICLAND`
- Followed by a 1–2 sentence purpose blockquote.
- Numbered sections (`## N. Title`), subsections (`### N.M Subtitle`).
- Closing meta-section per `DOCS_GENERATOR_PROMPT.md §3 Principle 8`.

## Pre-write checklist
1. Confirm the new doc has **one job** (`DOCS_GENERATOR_PROMPT.md §3 Principle 7`).
2. Confirm none of the existing 13 docs can absorb its content.
3. Confirm the doc's resolution-priority position (`DOCS_GENERATOR_PROMPT.md §6.1`).
4. Identify all source-of-truth handoffs (`§6.2`).
5. Apply the 8 philosophy principles (`§3`).

## Cinematic vocabulary rule
- Use mandatory vocabulary (§5.1).
- Reject forbidden vocabulary (§5.2). Substitute as needed.
- Tone: Senior Principal Engineer (`DEVELOPMENT_GUIDELINES.md §18.2`).

## Anti-filler discipline (apply continuously while writing)
- Delete sentences that fail the deletion test (§7.1).
- Replace restated claims with cross-references (§7.2).
- Search `/docs/` for similar content; link to it (§7.3).

## Cross-reference rule
- Every governance claim cites the relevant `.mdc` rule by `<rule>.mdc §X.Y`.
- Every canon claim cites `HTML_CANON.md §HC-XX`.
- Every cross-doc claim cites `<doc>.md §X.Y`.
- Never paste `.mdc` content. Never paste HTML canon content.

## Forbidden in any new doc
- ❌ Marketing language (per §5.2).
- ❌ Aspirational language ("ideally", "in the future we might").
- ❌ Philosophical restatement of the DNA.
- ❌ Verbose prose where a table or code block suffices.
- ❌ Centered headings, decorative dividers, ASCII art unless functionally necessary (workflow diagrams allowed).
- ❌ Personal pronouns ("I think", "we recommend"). Use imperatives or third-person definitional voice.
- ❌ Forward-looking promises. Document only present-tense governance.

## Output

Begin the doc now. Apply continuous self-review per §7 (anti-filler).

After the doc, append a single line:
> *Doc-generation review:* applied 8 principles, [N] cross-references, [target] lines actual / [budget] budget.

<COPY END>

---

## 9. Doc-Generation Review (Post-Generation Audit)

Before committing a newly generated doc, audit:

- [ ] Top heading uses the canonical format.
- [ ] 1–2 sentence purpose blockquote present.
- [ ] All sections numbered (`## N. ...`).
- [ ] No `.mdc` content pasted.
- [ ] No HTML canon content pasted.
- [ ] No forbidden vocabulary (§5.2 list).
- [ ] All cross-references use the canonical anchor format (§4.7).
- [ ] Length within the budget (§7.5).
- [ ] Closing meta-section present (Principle 8).
- [ ] Doc has one job (Principle 7).
- [ ] Doc respects resolution priority (§6.1).

If any item fails, revise before commit.

---

## 10. Doc Maintenance Protocol

When an existing doc requires extension (>30% length increase) or major restructure:

1. **Open a `docs:` branch.**
2. **Use the §8 Generation Prompt** with the existing doc's filename and a "purpose: extend / restructure" instruction.
3. **Side-by-side compare** the old and new versions for content equivalence (no information loss).
4. **Run §9 Doc-Generation Review.**
5. **Update `docs/changelogs/`** with a `governance change` entry per `SESSION_CHANGELOG_GENERATOR.md §2`.
6. **Update cross-doc references** if section numbers shifted.

For minor edits (typos, single-paragraph additions, broken cross-references):

- Direct edit. No prompt required. PR with `docs:` prefix. No changelog needed.

---

## 11. The DOCS_GENERATOR's Job in One Sentence

> **Make every new doc indistinguishable in voice, structure, and rigor from the 13 docs already in `/docs/`.**

If a future contributor reads a doc and cannot tell which session generated it, the prompt is working correctly.
