# CANONICAL_ARCHITECTURE — STRATEGICLAND

> **Single source of truth for platform architecture.**
> Consolidates strategic knowledge previously distributed across the Strategic Sitemap (Mapa de Sitio Estratégico), `Arquitectura_Web_wmnnd.md`, governance docs, and the `content/knowledge/` data layer.
>
> This document governs **what the platform is and how its parts relate**.
> It does not replace `DESIGN_DNA.md` (identity), `.rules/*.mdc` (implementation law), or `SYSTEM_ARCHITECTURE.md` (runtime modules). It **supersedes** them for cross-surface architectural decisions.

**Status:** Canonical · Agent 12 Governance Consolidation · 2026-06-11  
**Authority:** Human Director  
**Modification protocol:** Human Director authorship only. Layer 2 agents may cite; they may not edit.

---

## Resolution Priority (Architecture Layer)

When architectural sources conflict, resolve in this order:

```
1. CANONICAL_ARCHITECTURE.md          ← this file (platform architecture)
2. Mapa de Sitio Estratégico          ← content law (external; embedded in component comments)
3. Arquitectura_Web_wmnnd.md          ← knowledge copy + graph law (external; cited in content/knowledge/)
4. DESIGN_DNA.md                      ← project identity (wins on aesthetic judgment)
5. AGENTS.md + agents/*.md            ← orchestration
6. .rules/*.mdc                       ← implementation constraints
7. SYSTEM_ARCHITECTURE.md             ← runtime module mapping
8. CHAPTER_SYSTEM.md                  ← legacy chapter-type reference (partially superseded by §2)
9. MASTER_STATE.md                    ← operational state (may lag reality)
10. PROJECT_STATE_SNAPSHOT_CURRENT.md ← point-in-time reality snapshot
```

If `CHAPTER_SYSTEM.md` describes a 6-chapter home composition (Hero → Editorial → Case → Human → Cultural → Closing) and this document describes the 7-chapter film (HC-01 → HC-05A/B/C), **this document wins**. `CHAPTER_SYSTEM.md §4.1` is historical canon mapping, not current homepage truth.

---

## 1. System Vision

### 1.1 Identity

| Field | Value |
|-------|-------|
| Brand mark | `wmn/nd` (WE MAKE NOISE / NOT DIGITAL) |
| Entity | Consultoría Interdisciplinaria de Negocios y Marketing |
| Owner | Juan Luis Contreras — Strategic Creative Director |
| Platform type | Cinematic editorial film + knowledge ecosystem |
| KPI | Emotional residue at 30 seconds after closing the tab |

### 1.2 Architectural premise

STRATEGICLAND is **one film with two surfaces**:

1. **Homepage film** (`/`) — a single continuous scroll of seven chapters that performs the practice it documents. No route transitions within the film. Chapters share one atmospheric field; silence bridges replace overlay seams.
2. **Knowledge ecosystem** — four standalone editorial routes that expand strategic intelligence referenced from the film. Content lives in `content/knowledge/`; presentation reuses the cinematic chapter grammar (HC-02 editorial inheritance).

Between both surfaces runs a **connector layer**: Intelligence Nodes, a documented Knowledge Graph, an Ownership System, and Homepage Triggers that wire the film to the knowledge routes without breaking editorial restraint.

### 1.3 The locked sentence (downstream of identity)

> *Cinematic restraint, editorial pacing, atmospheric continuity, emotional rhythm, narrative density variation, human irregularity, strategic coherence.*

Every architectural decision in this document is a downstream expression of that sentence. Nothing here contradicts `DESIGN_DNA.md §1`.

### 1.4 Platform layers (top-down)

```
┌─────────────────────────────────────────────────────────────────────┐
│  SURFACE LAYER                                                       │
│  / (7-chapter film) · /strategic-brain · /interdisciplinary-lab     │
│  /engine-deep-dive · /verticales-impacto · /work/[slug]             │
├─────────────────────────────────────────────────────────────────────┤
│  CONNECTOR LAYER                                                     │
│  Intelligence Nodes · Knowledge Graph · Ownership · Triggers         │
│  (content/knowledge/{nodes,graph,triggers}.ts)                        │
├─────────────────────────────────────────────────────────────────────┤
│  CONTENT LAYER                                                       │
│  content/knowledge/<slug>/page.ts · content/work/<slug>/             │
│  showcaseContent.ts (homepage evidence — sitemap-bound)              │
├─────────────────────────────────────────────────────────────────────┤
│  CINEMATIC ENGINE                                                    │
│  Chapter system · TransitionDirector · NarrativeTimeline · GSAP/Lenis│
│  (app/components/cinematic/* · app/lib/{motion,scroll,transitions}) │
├─────────────────────────────────────────────────────────────────────┤
│  SYSTEM SHELL                                                        │
│  WebGLRoot · SystemFrame · SystemMetaNav · SystemCursor ·            │
│  SystemLoader · SystemGrain · TransitionLayer                        │
│  (app/components/system/* · app/layout.tsx provider tree)            │
├─────────────────────────────────────────────────────────────────────┤
│  GOVERNANCE                                                          │
│  CANONICAL_ARCHITECTURE.md · DESIGN_DNA.md · .rules/*.mdc · AGENTS.md│
└─────────────────────────────────────────────────────────────────────┘
```

### 1.5 What the platform is not

- Not a SaaS marketing site or lead-capture funnel.
- Not a services grid, pricing ladder, or testimonial carousel.
- Not a portfolio thumbnail grid (cases on homepage are **thresholds**, not full case studies).
- Not a dashboard, glowing system, or cyberpunk affordance layer.

---

## 2. Homepage Architecture

### 2.1 Route and assembly

**Route:** `/` → `app/page.tsx`

**Sequence (canonical, mounted):**

| Order | Component | ChapterId | InstanceId | HC | Sitemap § | Narrative role |
|-------|-----------|-----------|------------|-----|-----------|----------------|
| 1 | `HeroChapter` | `hero` | — | HC-01 | §01 HERO | Establishing — titular + sub-título |
| 2 | `MethodologyChapter` | `editorial` | — | HC-02 | §02–§04 | Strategic authority — manifesto + framework |
| 3 | `SignalChapter` | `cultural` | — | HC-03 | §05 INPUT CORE | Pattern intelligence — atmospheric peak |
| 4 | `CapabilitiesChapter` | `human` | — | HC-04 | §06 THE ENGINE | Operational consciousness |
| 5 | `StoryscapeChapter` | `editorial` | `storyscape` | HC-05A | §07 STORYSCAPE | Nine activators as three currents of three |
| 6 | `ShowcaseChapter` | `case` | `showcase` | HC-05B | §08 SHOWCASE | Homepage evidence layer (three sitemap references) |
| 7 | `ConversationChapter` | `closing` | `conversation` | HC-05C | §09 CONVERSATION | Invitation + coda — terminal `closing` instance |

**Not mounted:** `ClosingChapter` (legacy future-memory chapter). Exactly one `ChapterId "closing"` may be active at a time.

### 2.2 Transition model

- No `<ChapterSeam>` veils between homepage chapters.
- Each chapter's terminal T01 silence flows directly into the next chapter's opening T01.
- Transition profile: `silent` — sustained silence bridges mirroring canon without overlay cost.
- Shared atmospheric field across all seven chapters.

### 2.3 Sequencing rules (validated)

Per `.rules/chapter-architecture.mdc §4.2`:

- Opens with `hero` ✓
- One `cultural` chapter (HC-03) ✓
- No two `case` chapters adjacent (HC-05B separated from any future HC-04 re-type by HC-05A) ✓
- No two `editorial` chapters adjacent (HC-02 and HC-05A separated by HC-03 + HC-04) ✓
- Closes with `closing` (HC-05C) ✓

### 2.4 Emotional contour

```
HC-01 T04 → HC-02 T03 → HC-03 T04 → HC-04 T03 → HC-05A T03 → HC-05B T03→T02 → HC-05C T02→T01
```

Descending arc through operational territory into dissolution. HC-03 is the page's atmospheric peak (T04). HC-05C holds the exclusive privilege of two consecutive T01 scenes.

### 2.5 Page-level allowances (homepage)

| Allowance | Cap | Consumed by |
|-----------|-----|-------------|
| `type.epic` | 1/page | HC-01 Hero (1/1) |
| `type.display` | 2/page | HC-02 + HC-03 (2/2 — exhausted) |
| `HeroImage` | 2/page | HC-02 + HC-03 (2/2 — exhausted) |
| Pinned sections | 2/page | HC-01 Hero pinned sequence (1/2) |

HC-04 through HC-05 use `EditorialImage` or typography-only surfaces. Any addition exceeding caps requires Cinematic Architect reallocation + Human Director authorization.

### 2.6 Per-chapter specification

#### HC-01 — Hero (`HeroChapter`)

| Attribute | Value |
|-----------|-------|
| Sitemap source | §01 HERO |
| Content surfaces | Titular: "WE MAKE NOISE / NOT DIGITAL" · Sub-título: "Consultoría Interdisciplinaria de Negocios y Marketing." |
| Scene sequence | `EditorialStatement` → `HeroChapterBoundary` |
| Density | T04 establishing |
| Pinned | Yes (HeroPinnedSequence — 1/2 page allowance) |
| Knowledge triggers | None |

#### HC-02 — Methodology (`MethodologyChapter`)

| Attribute | Value |
|-----------|-------|
| Sitemap source | §02 MANIFESTO · §03 HUMAN × AI · §04 FRAMEWORK |
| Scene sequence | `TransitionalPrelude` (T01) → `MethodStatement` (T02) → pause → `FrameworkSequence` (T03) → pause → `HumanAITension` (T02) → `ClosingThreshold` (T01) |
| Density | T03 dominant |
| Knowledge triggers | §03: `[INTERDISCIPLINARY LAB: Human x Machine]` → `/interdisciplinary-lab` · §04: `[THE ENGINE DEEP-DIVE]` → `/engine-deep-dive` · §04: `[VERTICALES DE IMPACTO]` → `/verticales-impacto` · Control pills → engine-deep-dive / verticales-impacto |

#### HC-03 — Signal (`SignalChapter`)

| Attribute | Value |
|-----------|-------|
| Sitemap source | §05 INPUT CORE |
| Scene sequence | `SignalPrelude` (T01) → `PatternConstellation` (T04) → pause → `FragmentedSignals` (T03) → pause → `HumanInterpretation` (T03) → `StrategicCompression` (T01) |
| Density | T04 atmospheric peak |
| Intelligence nodes (surface) | `capa-semantica-unificada`, `lideres-hibridos` (Home/03) — non-linkable on homepage |
| Knowledge triggers | None direct |

#### HC-04 — Capabilities (`CapabilitiesChapter`)

| Attribute | Value |
|-----------|-------|
| Sitemap source | §06 THE ENGINE |
| Scene sequence | `OperationalPrelude` (T01) → `CapabilityFragments` (T02) → pause → `AppliedTension` (T03) → pause → `OutcomeLayer` (T02) → `OperationalThreshold` (T01) |
| Density | T03 dominant (peak T03, not T04 — descending from HC-03) |
| Intelligence nodes (surface) | `comercio-agentico`, `back-to-human`, `hipermediatizacion`, `experiencias-inmersivas`, `pensamiento-critico`, `storyscape`, `utilidad-invisible` |
| Knowledge triggers | `[THE STRATEGIC BRAIN 2026]` → `/strategic-brain` · Deep-dive CTA → `/engine-deep-dive` |

#### HC-05A — Storyscape (`StoryscapeChapter`)

| Attribute | Value |
|-----------|-------|
| Sitemap source | §07 STORYSCAPE — retícula interactiva de 9 activadores |
| Scene sequence | `ActivationThreshold` (T01) → `AttentionCurrent` (T02, activators 1–3) → `IdentityCurrent` (T03, activators 4–6) → `FutureCurrent` (T03, activators 7–9) → `EvidenceSeam` (T01) |
| Constraint | Nine activators as **three currents of three** — NOT a services grid |
| Imagery | Forbidden within the act — typography over global atmospheric field |
| Intelligence nodes | `hipermediatizacion`, `experiencias-inmersivas`, `splinternet`, `crowdculture` (activator anchors) |

#### HC-05B — Showcase (`ShowcaseChapter`)

| Attribute | Value |
|-----------|-------|
| Sitemap source | §08 SHOWCASE & PROMESA CORPORATIVA |
| Scene sequence | `ProtagonistThreshold` (T03) → `ReflectionBreath` (T02) → `CompactThresholds` (T03) → `EvidenceReframe` (T02) |
| Evidence references (exactly three, sitemap-bound) | Mi Punto S (Sico reposicionamiento) · Chocolate Fountain (producción inmersiva) · Retail para marcas globales |
| Decoupled from | `content/work/registry.ts` — registry cases have no sitemap source on homepage |
| Internal plane | Full case studies live at `/work/[slug]` — homepage never duplicates M-04 horizontal pin |

#### HC-05C — Conversation (`ConversationChapter`)

| Attribute | Value |
|-----------|-------|
| Sitemap source | §09 CONVERSATION / coda |
| Scene sequence | `ConversationInvitation` (T02) → dilated pause → `PersistentAtmosphere` (T01) → `MinimalSignature` (T01) |
| Brand | `wmn/nd` restored in footer signature |
| Unmounted legacy | `AfterimageFragment` — no sitemap source; preserved in unmounted `ClosingChapter` |

### 2.7 Secondary routes (non-homepage)

| Route | Purpose | Content source |
|-------|---------|----------------|
| `/work/[slug]` | Full case study (M-04 five-scene canonical) | `content/work/<slug>/` — 3 cases seeded |
| `/strategic-brain` | Knowledge hub | `content/knowledge/strategic-brain/page.ts` |
| `/interdisciplinary-lab` | Human × Machine operations | `content/knowledge/interdisciplinary-lab/page.ts` |
| `/engine-deep-dive` | Methodology deep-dive | `content/knowledge/engine-deep-dive/page.ts` |
| `/verticales-impacto` | Sector verticals | `content/knowledge/verticales-impacto/page.ts` |

---

## 3. Knowledge Architecture

### 3.1 Purpose

The knowledge ecosystem is **Platform Expansion**: editorial routes that hold strategic intelligence too dense for the homepage film. Each route is a self-contained cinematic chapter (`KnowledgeChapter`) with a coda (`KnowledgeCoda`).

### 3.2 Locked route vocabulary

Expanding requires Human Director authorization. Four routes — no more, no less:

| Slug | Route | Role | Sitemap / Architecture source |
|------|-------|------|-------------------------------|
| `strategic-brain` | `/strategic-brain` | Hub — prospectiva + confianza | Arquitectura Fase 04 · Página 1 |
| `interdisciplinary-lab` | `/interdisciplinary-lab` | Operativo — humano × máquina | Arquitectura Fase 04 · Página 2 |
| `engine-deep-dive` | `/engine-deep-dive` | Metodológico — proceso interno | Arquitectura Fase 04 · Página 3 |
| `verticales-impacto` | `/verticales-impacto` | Sectorial — industrias | Arquitectura Fase 04 · Página 4 |

### 3.3 Content model

**Authority chain:**

```
Arquitectura_Web_wmnnd.md (copy)
  → content/knowledge/<slug>/page.ts (data)
    → KnowledgeChapter (presentation)
```

Copy **never** lands in React components. Components bind to `KnowledgePageData` from the registry.

**Core types** (`content/knowledge/types.ts`):

| Type | Role |
|------|------|
| `KnowledgePageData` | Full page contract: slug, route, instanceId, opening, blocks, seo |
| `KnowledgeBlock` | One editorial block with rich body + optional archive metadata |
| `KnowledgeOpening` | Statement + positioning (two rich-content fields) |
| `KnowledgeSeo` | Route metadata |
| `BlockLayoutHint` | Layout mode: `editorial-list` or `signal-grid` |

**Rich content** (`content/knowledge/rich-content.ts`):

Segments: `text` · `emphasis` · `link` · `node` (intelligence node reference). Node refs are validated at dev time.

### 3.4 Registry

`content/knowledge/registry.ts` is the **single source of truth** for knowledge routes.

Dev-time gates:
- Unique slug, instanceId, route per page
- Route must match `KNOWLEDGE_ROUTES[slug]`
- Blocks ≤ 12 (archive allowance)
- Full ecosystem validation via `validateKnowledgeEcosystem()`

### 3.5 Knowledge chapter composition

Mirrors HC-02 editorial grammar (`KnowledgeComposition.tsx`):

```
KnowledgePrelude → KnowledgeOpening → TemporalPause → KnowledgeBlocks → KnowledgeThreshold
```

Each knowledge route renders via `createKnowledgePage.tsx` factory — `page.tsx` files remain declarative.

### 3.6 Research archive (Strategic Brain only)

Per `content/knowledge/archive.ts`:

- **Scope:** `strategic-brain` only — explicit archive vocation
- **PageArchiveMeta:** edition year, consultable, accumulable
- **SignalArchiveMeta:** per-block signal with `published` | `reserved` status
- **Source channels:** entornos-sociales, cultura-popular, alta-teoria, redes-sociales, nuevas-tecnologias (future cross-ref)

Strategic Brain uses `signal-grid` layout with reserved slots for future signals.

### 3.7 Per-page ownership summary

| Page | Role | Primary intelligence domains |
|------|------|------------------------------|
| Strategic Brain | Hub | Prospectiva, confianza, identidad |
| Interdisciplinary Lab | Operativo | Hibridismo humano-máquina, autenticidad |
| Engine Deep-Dive | Metodológico | Método, pensamiento crítico, narrativa |
| Verticales de Impacto | Sectorial | Comercio agéntico, lujo humano |

---

## 4. Intelligence Node System

### 4.1 Definition

An **Intelligence Node** is a canonical strategic connector — a named concept that may appear on multiple surfaces (homepage sections, knowledge pages, storyscape activators, showcase evidence) and carries a documented relationship function in the platform graph.

**Registry:** `content/knowledge/nodes.ts` — `INTELLIGENCE_NODES`

**Cardinality:** 12 canonical nodes (locked). No additional nodes without Human Director authorization.

### 4.2 Canonical node inventory

| Node ID | Label | Category | Primary surface |
|---------|-------|----------|-----------------|
| `comercio-agentico` | Comercio Agéntico | prospectiva | strategic-brain |
| `proveniencia-digital` | Proveniencia Digital | confianza | strategic-brain |
| `capa-semantica-unificada` | Capa Semántica Unificada | identidad | strategic-brain |
| `pensamiento-critico` | Pensamiento Crítico | metodologia | engine-deep-dive |
| `storyscape` | Storyscape | narrativa | engine-deep-dive |
| `back-to-human` | Back to Human | autenticidad | interdisciplinary-lab |
| `lideres-hibridos` | Líderes Híbridos | identidad | interdisciplinary-lab |
| `utilidad-invisible` | Utilidad Invisible | oferta | home |
| `hipermediatizacion` | Hipermediatización | oferta | home |
| `experiencias-inmersivas` | Experiencias Inmersivas | narrativa | showcase |
| `splinternet` | Splinternet | cultura | strategic-brain |
| `crowdculture` | Crowdculture | cultura | home |

### 4.3 Node anatomy

Each node declares:

| Field | Purpose |
|-------|---------|
| `id` | Stable key (locked vocabulary) |
| `label` | Human-readable name |
| `category` | Thematic grouping (8 categories, locked) |
| `primarySurface` | Authoritative home surface |
| `appearances[]` | Every surface/section/block where the node manifests |
| `connectionFunction` | Why this node exists in the graph |
| `defaultTarget` | Default navigation target (`KnowledgeRoute`, `/`, or `null`) |
| `status` | `canonical` or `reserved` |

### 4.4 Surface vocabulary

| Surface | Meaning |
|---------|---------|
| `home` | Homepage film sections (Home/03–Home/07) |
| `strategic-brain` | Knowledge hub page |
| `interdisciplinary-lab` | Lab page |
| `engine-deep-dive` | Engine page |
| `verticales-impacto` | Verticals page |
| `showcase` | HC-05B evidence layer |
| `storyscape-activator` | HC-05A nine-activator grid items |

### 4.5 Linkability rules

- Homepage appearances are predominantly **non-linkable** (`linkable: false`) — the film performs; it does not navigate mid-scroll except via explicit triggers.
- Knowledge page appearances are **linkable** where editorial context warrants cross-reference.
- `anchorOnly: true` — node appears as contextual anchor, not as navigation affordance.
- `resolveNodeHref(nodeId)` returns `defaultTarget` for programmatic navigation.

### 4.6 Surface-only nodes

Nodes whose `primarySurface` is `home`, `showcase`, or `storyscape-activator` live **outside** the knowledge-page graph by design. They connect homepage narrative to the connector layer without requiring a dedicated knowledge route.

---

## 5. Ownership System

### 5.1 Definition

**Ownership** assigns authoritative editorial responsibility for each intelligence node to one or more knowledge pages. When copy, graph edges, or triggers disagree, the **owner page** is the resolution authority for that node's canonical expression.

**Registry:** `content/knowledge/graph.ts` — `PAGE_OWNERSHIP`

### 5.2 Page roles

| Role | Meaning | Page |
|------|---------|------|
| `hub` | Central prospectiva + confianza authority | strategic-brain |
| `operativo` | Human × machine operational thesis | interdisciplinary-lab |
| `metodologico` | Process, filter, orchestration authority | engine-deep-dive |
| `sectorial` | Industry application authority | verticales-impacto |

### 5.3 Ownership matrix

| Page | Owned nodes |
|------|-------------|
| **strategic-brain** (hub) | `comercio-agentico`, `proveniencia-digital`, `capa-semantica-unificada`, `splinternet` |
| **interdisciplinary-lab** (operativo) | `back-to-human`, `lideres-hibridos` |
| **engine-deep-dive** (metodologico) | `proveniencia-digital`, `pensamiento-critico`, `storyscape` |
| **verticales-impacto** (sectorial) | `comercio-agentico`, `back-to-human` |

### 5.4 Shared ownership (by design)

These nodes are intentionally co-owned:

| Node | Owners | Resolution rule |
|------|--------|-----------------|
| `comercio-agentico` | strategic-brain + verticales-impacto | Hub owns prospectiva thesis; verticals own sector application |
| `proveniencia-digital` | strategic-brain + engine-deep-dive | Hub owns trust framing; engine owns methodological protocol |
| `back-to-human` | interdisciplinary-lab + verticales-impacto | Lab owns framework; verticals own "Lujo Humano" sector expression |

**Primary-surface rule:** When conflict arises, the node's `primarySurface` in `INTELLIGENCE_NODES` is the tiebreaker. The owner list must always include the primary surface page.

### 5.5 Validation gates

`validatePageOwnership()` enforces:

- Every `KnowledgePageSlug` in ownership exists in `KNOWLEDGE_ROUTES`
- Every owned node ID exists in `INTELLIGENCE_NODES`
- Every canonical node with a knowledge-page primary surface appears in at least one ownership entry
- Primary surface must be among the owners

---

## 6. Navigation Architecture

### 6.1 Navigation surfaces

| Surface | Component | Behavior |
|---------|-----------|----------|
| System meta | `SystemMetaNav` | Fixed top strip: `wmn/nd` wordmark + clock. No chapter index on current build. |
| System frame | `SystemFrame` | 2vw architectural inset — site-wide spatial contract |
| Editorial links | `EditorialLink` | Internal knowledge navigation — no button chrome, no CTA styling |
| Homepage triggers | Bracket cues + control pills in HC-02/HC-04 | Film-to-knowledge bridges |
| Route transitions | `TransitionLayer` | T3 veil for cross-route navigation (homepage ↔ knowledge) |
| Work routes | `/work/[slug]` | Full case study — separate from homepage showcase thresholds |

### 6.2 SystemMetaNav contract

Post sitemap-compliance pass:

- **Identity:** `wmn/nd` (literal sitemap brand mark)
- **Functional element:** Clock (HH:MM:SS desktop · HH:MM mobile)
- **Removed:** Prior 4-cell metadata grid (Identity/Domain/Time/Status) — no sitemap source

### 6.3 EditorialLink contract

`app/components/interaction/EditorialLink.tsx`:

- Uses Next.js `Link` with `data-hover-target` + `data-editorial-link`
- Default class: `editorial-link` (threshold-link underline grammar)
- Embeds in surrounding typography — inherits register classes when provided
- **Forbidden:** button chrome, CTA styling, external-link spectacle

### 6.4 Cross-route navigation model

```
Homepage film (scroll, no route change)
    │
    ├─ EditorialLink trigger → Knowledge route (T3 route transition)
    │     └─ KnowledgeChapter + KnowledgeCoda
    │           └─ Optional: EditorialLink back / cross-ref to another knowledge route
    │
    └─ Showcase threshold → /work/[slug] (full case — internal M-04 plane)
```

Knowledge routes inherit the same provider tree and system shell as the homepage. They do not mount homepage chapters.

### 6.5 Forbidden navigation patterns

- Header nav with word-flip links to services (not shipped)
- Chapter index slide-in panel (architected in `CHAPTER_SYSTEM.md §5` — not mounted)
- Mid-film auto-redirect or scroll-jacking to knowledge routes
- Carousels, hamburger menus with nested service trees

---

## 7. Trigger Architecture

### 7.1 Definition

**Triggers** are the documented wiring points where the homepage film connects to knowledge routes. They are declarative references in `content/knowledge/triggers.ts` — implementation surfaces are named; wiring uses `EditorialLink`.

### 7.2 Trigger kinds

| Kind | Meaning | Visual register |
|------|---------|-----------------|
| `strategic-link` | Bracket typographic cue embedded in editorial copy | `[LABEL]` in threshold/framework register |
| `deep-dive-cta` | Explicit process invitation | Question-form CTA in operational register |
| `control-pill` | Profile-based routing pill | Framework sequence control pills |

### 7.3 Canonical trigger registry

| Label | Target | Source component | HC |
|-------|--------|------------------|-----|
| `[INTERDISCIPLINARY LAB: Human x Machine]` | interdisciplinary-lab | `ClosingThreshold.tsx` | HC-02 |
| `[THE ENGINE DEEP-DIVE]` | engine-deep-dive | `FrameworkSequence.tsx` | HC-02 |
| `[VERTICALES DE IMPACTO]` | verticales-impacto | `FrameworkSequence.tsx` | HC-02 |
| `[THE STRATEGIC BRAIN 2026]` | strategic-brain | `OperationalThreshold.tsx` | HC-04 |
| `[¿Cómo desmantelamos la complejidad? Ver Proceso Interno]` | engine-deep-dive | `OperationalThreshold.tsx` | HC-04 |
| Nodo de Control — Metodología técnica | engine-deep-dive | `FrameworkSequence.tsx` | HC-02 |
| Nodo de Control — Soluciones por Industria | verticales-impacto | `FrameworkSequence.tsx` | HC-02 |

### 7.4 Coverage rule

Every knowledge route slug **must** appear in at least one `HOMEPAGE_KNOWLEDGE_TRIGGERS` entry. Validated at dev time by `validateHomepageTriggers()`.

Current coverage:

| Slug | Trigger count |
|------|---------------|
| strategic-brain | 1 |
| interdisciplinary-lab | 1 |
| engine-deep-dive | 3 |
| verticales-impacto | 2 |

### 7.5 Wiring contract

1. Trigger registry declares label, target, source component, wire strategy.
2. Source component wraps bracket text in `<EditorialLink href={KNOWLEDGE_ROUTES[slug]}>`.
3. Surrounding typography register classes are preserved (e.g. `methodology-threshold-link`).
4. No new visual affordance is introduced — the bracket cue **is** the affordance.

---

## 8. Knowledge Graph

### 8.1 Definition

The Knowledge Graph documents **declared relationships only** — no inferred edges. It is not a runtime navigation engine; it is an architectural audit artefact that validates strategic coherence across surfaces.

**Registry:** `content/knowledge/graph.ts` — `KNOWLEDGE_GRAPH_EDGES`

### 8.2 Edge anatomy

| Field | Purpose |
|-------|---------|
| `from` | Source: node ID, page slug, `home`, or `showcase` |
| `to` | Target: node ID, page slug, `home`, or `showcase` |
| `theme` | Thematic classification (7 locked themes) |
| `kind` | Relationship pattern (6 locked kinds) |
| `dependency` | `hard` · `medium` · `soft` |
| `source` | Traceability reference to architecture document section |

### 8.3 Thematic vocabulary (locked)

| Theme | Domain |
|-------|--------|
| `hibridez-humano-maquina` | Human × machine hybridity |
| `metodologia-sistema-operativo` | Method as operating system |
| `narrativa-persistente` | Persistent narrative / Storyscape |
| `confianza-auditable` | Auditable trust / provenance |
| `prospectiva-2026` | 2026 strategic prospectiva |
| `autenticidad-lujo` | Back to Human / luxury authenticity |
| `especializacion-sectorial` | Sector specialization |

### 8.4 Edge kind vocabulary (locked)

| Kind | Pattern |
|------|---------|
| `bidirectional` | Mutual reinforcement between endpoints |
| `hub-and-spoke` | Central hub radiates to satellite |
| `method-prospectiva` | Methodology grounded in prospectiva |
| `identity-prospectiva` | Identity thesis linked to forward look |
| `sector-bridge` | Sector application bridge |
| `thematic` | Thematic affinity without hierarchy |

### 8.5 Canonical edges (summary)

| From | To | Theme | Dependency |
|------|-----|-------|------------|
| home | strategic-brain | metodologia-sistema-operativo | **hard** |
| capa-semantica-unificada | interdisciplinary-lab | hibridez-humano-maquina | medium |
| comercio-agentico | verticales-impacto | prospectiva-2026 | medium |
| comercio-agentico | strategic-brain | prospectiva-2026 | soft |
| proveniencia-digital | engine-deep-dive | confianza-auditable | medium |
| proveniencia-digital | strategic-brain | confianza-auditable | medium |
| strategic-brain | interdisciplinary-lab | hibridez-humano-maquina | medium |
| strategic-brain | verticales-impacto | prospectiva-2026 | medium |
| storyscape | engine-deep-dive | narrativa-persistente | medium |
| lideres-hibridos | interdisciplinary-lab | hibridez-humano-maquina | medium |
| back-to-human | interdisciplinary-lab | autenticidad-lujo | soft |
| splinternet | crowdculture | prospectiva-2026 | soft |

### 8.6 Reachability model

Two parallel reachability paths exist:

1. **Graph reachability** — BFS from `home` through `KNOWLEDGE_GRAPH_EDGES`. Currently reaches: `strategic-brain` (hard edge from home).
2. **Trigger reachability** — direct homepage trigger to any knowledge slug.

Pages reachable only via triggers (not graph BFS from home) are flagged as **reachability gaps** — informational, not blocking:

| Page | Graph from home | Trigger |
|------|-----------------|---------|
| strategic-brain | ✓ (hard) | ✓ |
| interdisciplinary-lab | ✗ | ✓ |
| engine-deep-dive | ✗ | ✓ |
| verticales-impacto | ✗ | ✓ |

This is by design: the film performs authority; triggers open doors. The graph documents semantic relationships, not UX paths.

### 8.7 Validation gates

| Validator | Checks |
|-----------|--------|
| `validateKnowledgeGraph()` | Endpoint existence, no duplicate edges |
| `validateGraphNodeAlignment()` | defaultTarget edges exist in graph |
| `validateGraphOrphans()` | Page-primary nodes appear in graph, ownership, or content |
| `validateGraphReachabilityGaps()` | Trigger-only pages flagged |
| `validateSurfaceOnlyNodes()` | Home/showcase nodes outside page graph — informational |

Full audit: `auditKnowledgeEcosystem(pages)` — splits errors (blocking) from drift (informational).

---

## 9. Governance Rules

### 9.1 Agent hierarchy (architecture decisions)

Per `AGENTS.md`:

| Layer | Agent | Architecture veto |
|-------|-------|-------------------|
| 0 | Human Director | Absolute — meaning, narrative, taste |
| 1 | Cinematic Architect | Sequence, density, continuity across chapters |
| 2 | Motion Governance | GSAP, ScrollTrigger, Lenis, easing |
| 2 | Atmosphere Rendering | Grain, vignette, light, image integration |
| 2 | Performance Audit | SSR, hydration, runtime, mobile budget |

Architecture expansion (new routes, nodes, chapters) requires **Cinematic Architect decision + Human Director authorization**.

### 9.2 Locked vocabularies (architecture-relevant)

| Vocabulary | Source | Count | Expand? |
|------------|--------|-------|---------|
| `ChapterId` | `app/lib/transitions/types.ts` | 6 | No — use instanceId for multiples |
| `KnowledgePageSlug` | `content/knowledge/types.ts` | 4 | Human Director only |
| `IntelligenceNodeId` | `content/knowledge/nodes.ts` | 12 | Human Director only |
| `KnowledgeTheme` | `content/knowledge/graph.ts` | 7 | Human Director only |
| `GraphEdgeKind` | `content/knowledge/graph.ts` | 6 | Human Director only |
| `HomepageTriggerKind` | `content/knowledge/triggers.ts` | 3 | Human Director only |
| `DensityTier` | `app/lib/transitions/types.ts` | 5 | No |
| `EmotionalState` | `app/lib/transitions/types.ts` | 6 | No |

### 9.3 Content authority rules

1. **Sitemap is content law for homepage.** Component copy must trace to Mapa de Sitio Estratégico §01–§09. No invented marketing copy.
2. **Arquitectura_Web_wmnnd.md is content law for knowledge pages.** Copy lands in `content/knowledge/<slug>/page.ts`.
3. **Showcase is sitemap-bound.** Three evidence references only — decoupled from `content/work/registry.ts`.
4. **Storyscape activators are sitemap-bound.** Nine items, three currents of three — not a services grid.
5. **Intelligence nodes are connector law.** Appearances must match declared surfaces; blockId anchors must exist on registry pages.

### 9.4 Implementation boundaries (this document)

| Allowed | Forbidden |
|---------|-----------|
| Cite this document in PRs and agent directives | Modify runtime code when producing architecture artefacts |
| Extend validation in `content/knowledge/validate.ts` | Add nodes/routes/themes without Human Director auth |
| Update this document on architectural change | Silently override sitemap or Arquitectura copy in components |
| Flag drift in changelogs | Edit `MASTER_STATE.md` without Human Director instruction |

### 9.5 Provider tree (canonical)

Unchanged across homepage and knowledge routes:

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

No new top-level providers without Human Director instruction.

### 9.6 Documentation maintenance

When architecture changes:

1. Update this document first.
2. Update affected `content/knowledge/*` registries.
3. Log in `docs/changelogs/` via closing protocol.
4. Reconcile `MASTER_STATE.md` only on Human Director instruction.
5. Do **not** update `CHAPTER_SYSTEM.md §4.1` unless explicitly directed — it describes legacy canon mapping.

---

## 10. Future Expansion Rules

### 10.1 Adding a knowledge route

Requires Human Director authorization. Minimum deliverables:

1. Add slug to `KnowledgePageSlug` + route to `KNOWLEDGE_ROUTES`
2. Create `content/knowledge/<slug>/page.ts` with literal copy from architecture document
3. Register in `content/knowledge/registry.ts`
4. Add `PAGE_OWNERSHIP` entry with role
5. Add graph edges with documented `source` field
6. Add at least one `HOMEPAGE_KNOWLEDGE_TRIGGERS` entry OR document explicit exclusion with justification
7. Create `app/<slug>/page.tsx` via `createKnowledgePage.tsx` factory
8. Update this document §3 and §5
9. Cinematic Architect density review — knowledge pages inherit editorial tier profile

### 10.2 Adding an intelligence node

Requires Human Director authorization. Minimum deliverables:

1. Add to `IntelligenceNodeId` vocabulary in `nodes.ts`
2. Declare `primarySurface`, `appearances[]`, `connectionFunction`, `defaultTarget`
3. Add to `PAGE_OWNERSHIP` on owner page(s)
4. Add graph edge(s) with theme, kind, dependency, source
5. Embed in page content via `node()` rich-content segments
6. Update this document §4

### 10.3 Adding a homepage chapter

Requires Cinematic Architect decision + Human Director authorization. Triggers:

- Would exceed page-level allowances → reallocation required
- Would violate sequencing rules → rejected or require intermediate chapter
- Would duplicate `ChapterId` without `instanceId` → rejected

The homepage is currently at **7 chapters** (authorized Sprint 03 expansion from 5). Further expansion requires explicit re-authorization.

### 10.4 Adding a homepage trigger

1. Add entry to `HOMEPAGE_KNOWLEDGE_TRIGGERS`
2. Wire in named source component via `EditorialLink`
3. Preserve typography register
4. Validate coverage via `validateHomepageTriggers()`

### 10.5 Adding a graph edge

1. Both endpoints must exist in the graph endpoint vocabulary
2. `source` field must cite architecture document section
3. No inferred edges — documented relationships only
4. Run `validateKnowledgeGraph()` + `validateGraphNodeAlignment()`

### 10.6 Case study expansion

Homepage showcase (HC-05B) and internal cases (`/work/[slug]`) are **separate planes**:

- Homepage: sitemap §08 references only — thresholds, not full cases
- Internal: `content/work/<slug>/` with full M-04 five-scene canonical
- Adding a homepage showcase reference requires sitemap amendment
- Adding an internal case requires `content/work/` registry entry only

### 10.7 Explicitly deferred (not expansion)

| Item | Status | Gate |
|------|--------|------|
| Audio system | Deferred | `sound-behavior-system.mdc` defined; ships later |
| Chapter index nav panel | Not mounted | Cinematic Architect decision |
| About / contact / work index routes | Not started | Human Director brief |
| Real asset plates | Pending | Asset Integration Sprint |
| `MASTER_STATE.md §3` reconciliation | Stale | Human Director authorization |

---

## Appendix A — Source-of-Truth Cross-Reference

| Concern | Canonical location |
|---------|-------------------|
| Platform architecture | **This document** |
| Project identity / DNA | `docs/DESIGN_DNA.md` |
| Runtime module mapping | `docs/SYSTEM_ARCHITECTURE.md` |
| Homepage content law | Mapa de Sitio Estratégico (external) |
| Knowledge copy law | Arquitectura_Web_wmnnd.md (external) |
| Knowledge routes | `content/knowledge/routes.ts` |
| Knowledge pages | `content/knowledge/registry.ts` |
| Intelligence nodes | `content/knowledge/nodes.ts` |
| Graph + ownership | `content/knowledge/graph.ts` |
| Homepage triggers | `content/knowledge/triggers.ts` |
| Ecosystem validation | `content/knowledge/validate.ts` |
| Homepage assembly | `app/page.tsx` |
| Provider tree | `app/layout.tsx` |
| Chapter types (legacy mapping) | `docs/CHAPTER_SYSTEM.md` |
| Operational state | `docs/MASTER_STATE.md` |
| Reality snapshot | `docs/PROJECT_STATE_SNAPSHOT_CURRENT.md` |
| Agent orchestration | `AGENTS.md` |
| Implementation law | `.rules/*.mdc` |

---

## Appendix B — Glossary

| Term | Definition |
|------|------------|
| **Film** | The homepage scroll experience — seven chapters, one route |
| **Chapter** | Self-contained narrative unit with atmosphere, density, motion |
| **Scene** | Single shot inside a chapter |
| **Instance** | Mounted occurrence of a chapter type (`instanceId` when duplicated) |
| **Intelligence Node** | Named strategic connector across surfaces |
| **Trigger** | Documented homepage → knowledge wiring point |
| **Threshold** | Compressed case reference on homepage (HC-05B plane) |
| **M-04** | Full five-scene case chapter (`/work/[slug]` plane) |
| **Platform Expansion** | Knowledge ecosystem — four editorial routes |
| **Connector Layer** | Nodes + graph + ownership + triggers |
| **Sitemap compliance pass** | Migration that bound all homepage copy to Mapa de Sitio Estratégico |

---

*End of CANONICAL_ARCHITECTURE.md*
