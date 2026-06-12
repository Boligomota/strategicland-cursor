# KNOWLEDGE GOVERNANCE — STRATEGICLAND

> Governance layer for the Knowledge Ecosystem — Strategic Brain, Interdisciplinary Lab,
> Engine Deep-Dive, and Verticales de Impacto.
>
> This document defines **lifecycle, authority, and expansion rules** for knowledge
> artefacts. It is normative for content authors and future governance agents.
> It does **not** prescribe implementation, runtime behaviour, or UI changes.

**Authority chain:** Human Director → Cinematic Architect → Knowledge Governance  
**Data layer references:** `content/knowledge/*`  
**Validation surface:** `content/knowledge/validate.ts` (dev-time gates)  
**Copy authority:** `Arquitectura_Web_wmnnd.md`

---

## Governance Model

The Knowledge Ecosystem is a **directed intelligence graph** whose nodes (Intelligence
Nodes) connect surfaces (Home, Showcase, Storyscape activators, Knowledge pages) through
documented edges. Content lives in page modules; structure lives in registries; integrity
is enforced at dev time — not at runtime.

### Scope

| Domain | Registry / artefact | Governed by |
|--------|---------------------|-------------|
| Pages | `registry.ts`, `routes.ts`, `types.ts` | Page slug union, route bijection |
| Blocks / signals | `content/knowledge/<slug>/page.ts` | Block id stability, archive meta |
| Intelligence nodes | `nodes.ts` | Id union, appearances, primarySurface |
| Graph edges | `graph.ts` | Documented relationships only |
| Homepage triggers | `triggers.ts` | Reachability from Home film |
| Archive | `archive.ts` | Strategic Brain edition schema |

### Governance principles

1. **Documented relationships only** — no implicit cross-links. Every navigational or
   semantic relationship must exist as a graph edge, node appearance, or registered
   trigger with a `source` citation.
2. **Primary surface authority** — when a node appears on multiple Knowledge pages,
   the page declared as `primarySurface` owns editorial voice; secondary pages may
   reference via `anchorOnly` appearances.
3. **Reachability invariant** — every Knowledge page must be reachable from `home` via
   `KNOWLEDGE_GRAPH_EDGES` and/or `HOMEPAGE_KNOWLEDGE_TRIGGERS`. A page that fails
   both is unreachable and blocked at validation.
4. **No orphan intelligence** — a canonical node whose `primarySurface` is a Knowledge
   page must appear in graph, ownership, or page content. Orphans are validation errors.
5. **Archive accumulates; film does not rewind** — Strategic Brain editions are
   consultable and accumulable. Retiring a signal moves it through lifecycle states;
   it does not delete historical record.
6. **Expansion requires authorization** — new page slugs, node ids, graph themes, and
   route paths are locked vocabularies. Expansion is a Human Director decision routed
   through Cinematic Architect before any registry edit.

### Role matrix

| Actor | May decide | May not decide |
|-------|------------|----------------|
| Human Director | New pages, nodes, verticals, deprecation, edition closure | — |
| Cinematic Architect | Cross-page ownership disputes, navigation density, threshold placement | Locked slug/node unions without HD auth |
| Content author | Block copy within owned page, signal promotion within lifecycle | New routes, edges, or nodes without registry update |
| Validation layer | Block merge on integrity errors | Override HD-authorized expansions |

---

## Lifecycle Model

### Signal lifecycle

Signals are editorial blocks on Knowledge pages. Strategic Brain operates a
**signal-grid** with explicit archive metadata; other pages use editorial blocks
without per-block archive unless explicitly authorized.

| State | Definition | Registry representation | Transitions |
|-------|------------|-------------------------|-------------|
| **emerging** | Identified in research or architecture doc; not yet authored in a page module | Absent from `blocks[]`; may appear in planning artefacts only | → active (authoring complete) |
| **active** | Published in the current edition; visible in layout; linkable when node refs present | `archive.status: "published"` or block without archive on non-archive pages | → validated, → deprecated |
| **validated** | Human Director confirmed; cross-referenced in graph and/or node appearances; stable `signalId` | Published + graph/appearance alignment verified by audit | → archived (edition close), → deprecated |
| **archived** | Retained in a closed edition; consultable but not promoted as current intelligence | `archiveYear` < current `editionYear`; block remains in registry; may move to read-only presentation in future implementation | Terminal for edition; may → deprecated |
| **deprecated** | Superseded or retracted; retained for traceability; not linkable as current truth | `archive.status: "reserved"` slot, or block removed from active grid with audit entry; node refs must not treat as primary | Terminal |

#### State rules

- **emerging → active:** Block authored in `content/knowledge/<slug>/page.ts` with stable
  `id`; for Strategic Brain, `SignalArchiveMeta` attached with `status: "published"`.
- **active → validated:** Cinematic Architect confirms graph edge or node appearance
  documents the signal's intelligence contribution; `validateKnowledgePage` passes.
- **validated → archived:** Edition closes (`PageArchiveMeta.editionYear` increments);
  prior-year signals remain in registry with historical `archiveYear`.
- **any → deprecated:** Human Director retraction; block demoted to reserved slot or
  removed from linkable surfaces; graph edges referencing deprecated intelligence are
  retired (not deleted — marked retired in governance log).

#### Mapping to current schema

| Lifecycle state | Current `SignalArchiveStatus` / layout |
|-----------------|----------------------------------------|
| emerging | Block absent; `reservedSlots` may hold placeholder |
| active | `status: "published"` |
| validated | `published` + graph/appearance audit green |
| archived | `archiveYear` < current edition |
| deprecated | `status: "reserved"` or governance retirement |

### Node lifecycle

Intelligence Nodes use `NodeStatus`: `canonical` | `reserved`.

| Node status | Meaning |
|-------------|---------|
| `canonical` | Active in registry; subject to graph, ownership, and appearance rules |
| `reserved` | Id locked for future use; must not appear in page content or graph until promoted |

Promotion `reserved → canonical` requires Human Director auth and full registry entry
(appearances, defaultTarget, connectionFunction).

### Page lifecycle

| Phase | Condition |
|-------|-----------|
| registered | Entry in `registry.ts`, slug in `KNOWLEDGE_ROUTES`, page module exists |
| wired | At least one trigger or graph path from `home` |
| canonical | All ecosystem validation gates pass in dev |
| expanded | New slug added to locked union — HD auth only |

---

## Node Authority Rules

### Ownership

`PAGE_OWNERSHIP` in `graph.ts` declares which Knowledge pages **own** which nodes for
editorial and governance purposes. Ownership is not exclusive unless `primarySurface`
demands it.

| Page | Role | Owned nodes (current) |
|------|------|------------------------|
| strategic-brain | hub | comercio-agentico, proveniencia-digital, capa-semantica-unificada, splinternet |
| interdisciplinary-lab | operativo | back-to-human, lideres-hibridos |
| engine-deep-dive | metodologico | proveniencia-digital, pensamiento-critico, storyscape |
| verticales-impacto | sectorial | comercio-agentico, back-to-human |

**Rule:** Every canonical node whose `primarySurface` is a Knowledge page slug must list
that slug among its owners in `PAGE_OWNERSHIP`. Violation is a blocking validation error.

### Authority hierarchy

1. **primarySurface** — canonical editorial home; owns voice and block depth.
2. **PAGE_OWNERSHIP entry** — governance responsibility for updates and validation.
3. **appearances[]** — permitted surfaces; `linkable` and `anchorOnly` flags constrain behaviour.
4. **defaultTarget** — preferred navigation route when node is invoked as a link target.

When ownership is shared (e.g. `comercio-agentico` on strategic-brain and
verticales-impacto):

- strategic-brain holds **narrative authority** (prospectiva, signal-grid).
- verticales-impacto holds **sectoral authority** (`anchorOnly` appearances on vertical blocks).
- Engine and Lab may reference via appearances without owning.

### Cross-page usage

| Pattern | Allowed when |
|---------|--------------|
| Full block + node ref | Node owned by page or appearance declares `linkable: true` |
| Inline `node()` in rich content | Node exists in `INTELLIGENCE_NODES`; refs validated |
| anchorOnly appearance | Secondary page; no duplicate narrative block; anchor to owned blockId |
| Home / Showcase / activator | `primarySurface` may be non-knowledge; appearances document section |

**Forbidden:**

- Duplicate full narrative blocks for the same signal id across pages.
- Linkable appearance on a page that does not own or secondary-authorize the node.
- Node ref in content for `reserved` nodes.

### Duplication rules

| Artefact | Duplication policy |
|----------|-------------------|
| `block.id` | Unique within page; globally unique for archived signals (`signalId`) |
| `IntelligenceNodeId` | Globally unique; one registry entry |
| Node label copy | May repeat in prose; semantic authority follows primarySurface |
| Graph edge | Unique tuple `(from, to, theme, kind)`; no duplicate edges |
| Route / slug | Bijection; one page module per slug |

Shared ownership is **informational**, not duplicative — validators emit
`collectSharedOwnership()` findings; they are not errors when `primarySurface` matches
an owner.

---

## Graph Rules

The knowledge graph (`KNOWLEDGE_GRAPH_EDGES`) is the **institutional map** of documented
relationships. It is not a runtime navigation engine; it is a governance and audit artefact.

### Edge creation

A new edge requires:

1. **Endpoints** — `from` and `to` must be valid graph endpoints: `home`, `showcase`,
   a `KnowledgePageSlug`, or a registered `IntelligenceNodeId`.
2. **Theme** — one of locked `KnowledgeTheme` values.
3. **Kind** — one of locked `GraphEdgeKind` values.
4. **Dependency** — `hard` | `medium` | `soft` (navigation priority, not runtime weight).
5. **Source** — traceable citation (architecture doc section, phase, trigger id).

**Creation authority:** Cinematic Architect proposes; Human Director approves if the edge
introduces a new theme or cross-film dependency class.

**Alignment rule:** If a canonical node's `defaultTarget` is a Knowledge route, a graph
edge from that node to the target slug must exist. Absence is **graph drift** (audit finding).

### Edge retirement

Edges are never silently deleted.

| Action | Procedure |
|--------|-----------|
| Retire | Remove from `KNOWLEDGE_GRAPH_EDGES` with changelog entry citing reason |
| Supersede | Add replacement edge; retire old edge in same commit |
| Deprecate node | Retire all edges where node is endpoint; node moves to deprecated lifecycle |

Retired edges remain cited in session changelogs for institutional memory.

### Edge validation

Dev-time gates (`validateKnowledgeGraph`, `validateGraphNodeAlignment`,
`validateGraphReachabilityGaps`, `validateGraphOrphans`):

| Check | Severity |
|-------|----------|
| Unknown endpoint | Error |
| Duplicate edge tuple | Error |
| defaultTarget without edge | Drift (audit) |
| Page-primary node without edge | Drift (audit) |
| Page reachable only via triggers, not graph | Reachability gap (audit) |
| Orphan page-primary node | Error |

**Surface-only nodes** (primarySurface: `home`, `showcase`, `storyscape-activator`) may
live outside the graph by design — documented as informational findings, not errors.

---

## Archive Rules

Archive governance applies primarily to **Strategic Brain** — the only page with explicit
archive vocation per architecture (`ArchiveScope: "strategic-brain"`).

### Archive eligibility

| Entity | Eligible | Conditions |
|--------|----------|------------|
| Strategic Brain page | Yes | `PageArchiveMeta` with `consultable: true`, `accumulable: true` |
| Signal blocks on Strategic Brain | Yes | `SignalArchiveMeta` with stable `signalId`, `documentedAt`, `archiveYear` |
| Other Knowledge pages | No page-level archive | Unless Human Director extends `ArchiveScope` |
| Intelligence nodes | No | Nodes persist across editions; signals archive, nodes evolve |
| Graph edges | No | Edges are institutional; retired via graph rules, not archive |

### Archive expiration

Archive does **not** expire by default. `accumulable: true` means editions stack.

| Concept | Rule |
|---------|------|
| Edition boundary | Defined by `PageArchiveMeta.editionYear` |
| Signal year | `SignalArchiveMeta.archiveYear` must align with edition at publish time |
| Expiration | No automatic purge; deprecated signals may be hidden from active grid via lifecycle |
| Cross-edition consult | Future implementation may expose prior editions; governance preserves data |

Reserved slots (`blocksLayout.reservedSlots`) hold capacity for emerging signals without
archive commitment.

### Archive authority

| Decision | Authority |
|----------|-----------|
| Open / close edition | Human Director |
| Publish signal to edition | Content author within active edition |
| Validate signal for archive | Cinematic Architect (audit) |
| Retract / deprecate signal | Human Director |
| Extend archive to another page | Human Director ( expands `ArchiveScope` ) |

**Invariant:** `archive.signalId` must equal `block.id`. Mismatch is a blocking error.

---

## Navigation Governance

Navigation into the Knowledge Ecosystem flows from the Home film through **threshold cues**
and **registered triggers**. Internal Knowledge navigation follows graph-documented
relationships and node `defaultTarget` values.

### Threshold rules

Thresholds are cinematic handoff points — bracket typography, deep-dive CTAs, control pills —
that bridge chapters without breaking editorial register.

| Rule | Requirement |
|------|-------------|
| Register every threshold | Entry in `HOMEPAGE_KNOWLEDGE_TRIGGERS` with label, targetSlug, route, sourceComponent, kind |
| Preserve register | Wiring uses `EditorialLink`; existing threshold CSS classes retained |
| Kind discipline | `strategic-link` \| `deep-dive-cta` \| `control-pill` — no new kinds without HD auth |
| Scene parity | Knowledge chapter includes threshold scene registration (`KnowledgeThreshold`) |
| No orphan pages | Every `KnowledgePageSlug` must appear in at least one trigger target |

Threshold placement is a Cinematic Architect decision; trigger registration is mandatory
before merge.

### Trigger rules

| Rule | Detail |
|------|--------|
| Route parity | `trigger.route` must equal `KNOWLEDGE_ROUTES[targetSlug]` |
| Slug validity | `targetSlug` must be in locked `KnowledgePageSlug` union |
| Source traceability | `sourceComponent` identifies film chapter origin |
| Wire strategy | Documented per entry; implementation tracked separately |
| Reachability fallback | If graph does not reach a page from `home`, trigger wiring is mandatory |

Current trigger inventory covers all four Knowledge pages from Home chapters (Methodology,
Capabilities, Framework Sequence, Operational Threshold).

### Institutional index rules

The **institutional index** is the combined view of:

- `KNOWLEDGE_ROUTES` — canonical paths
- `registry.ts` — page metadata and SEO
- `INTELLIGENCE_NODES` — connector registry
- `KNOWLEDGE_GRAPH_EDGES` — documented relationships
- `HOMEPAGE_KNOWLEDGE_TRIGGERS` — film entry points

| Rule | Requirement |
|------|-------------|
| Bijection | One registry page per route slug; no duplicates |
| SEO coherence | Each page carries `KnowledgeSeo` aligned with institutional title |
| Index completeness | `getAllKnowledgePages()` returns full slug set |
| Audit cadence | Run `auditKnowledgeEcosystem()` before Knowledge merges |
| Drift visibility | Drift, orphans, shared ownership, reachability gaps reported separately from errors |

The index is not a public sitemap UI — it is the governance source for internal linking,
validation, and future institutional navigation surfaces.

---

## Expansion Rules

All expansion touches locked vocabularies. Default posture: **reject until authorized**.

### New pages

Requires Human Director authorization.

| Step | Action |
|------|--------|
| 1 | Add slug to `KnowledgePageSlug` and route to `KnowledgeRoute` / `KNOWLEDGE_ROUTES` |
| 2 | Create `content/knowledge/<slug>/page.ts` conforming to `KnowledgePageData` |
| 3 | Register in `registry.ts` |
| 4 | Assign `PageOwnership` role and owned nodes in `graph.ts` |
| 5 | Add graph edges from `home` and/or `HOMEPAGE_KNOWLEDGE_TRIGGERS` entries |
| 6 | Create App Router page via `createKnowledgePage` factory |
| 7 | Pass full ecosystem validation |

**Caps:** Respect page-level cinematic allowances if Knowledge chapter mounts on Home route.
Knowledge satellite pages are separate routes — they do not consume Home chapter caps, but
must honour cinematic restraint on their own chapter.

### New nodes

Requires Human Director authorization.

| Step | Action |
|------|--------|
| 1 | Add id to `IntelligenceNodeId` union |
| 2 | Full `IntelligenceNode` entry: category, primarySurface, appearances, connectionFunction, defaultTarget, status |
| 3 | Add to `PAGE_OWNERSHIP` on owning page(s) |
| 4 | Add graph edge(s) if primarySurface is Knowledge page or defaultTarget is set |
| 5 | Reference in page content via rich-content `node()` segments |

Promote `reserved → canonical` before any content or graph reference.

### New signals

Does not require vocabulary expansion if block id is new within page.

| Step | Action |
|------|--------|
| 1 | Start lifecycle at **emerging** (planning) |
| 2 | Author block with stable `id`; attach `SignalArchiveMeta` on Strategic Brain |
| 3 | Promote to **active** (`published`) |
| 4 | Validate node refs and archive signalId parity |
| 5 | Audit for **validated** status before edition close |

Strategic Brain signal-grid: respect `minSlots`, `reservedSlots`, and 12-block archive
allowance enforced in registry validation.

### New verticals

Verticales de Impacto is the sectorial surface. Adding a vertical block:

| Step | Action |
|------|--------|
| 1 | Add block to `verticales-impacto/page.ts` with unique `id` |
| 2 | Link sector nodes via appearances (`anchorOnly` where hub owns narrative) |
| 3 | Add graph edge if vertical introduces new cross-page dependency |
| 4 | Do not duplicate hub signal blocks — reference via node appearance |

A **new vertical page** (beyond Verticales de Impacto) is treated as **new page**
expansion, not a block addition.

---

## Files Created

| File | Purpose |
|------|---------|
| `docs/KNOWLEDGE_GOVERNANCE.md` | This document — lifecycle, authority, graph, archive, navigation, and expansion governance for the Knowledge Ecosystem |

### Related artefacts (unchanged by this agent)

| Path | Role |
|------|------|
| `content/knowledge/types.ts` | Page and block contracts |
| `content/knowledge/nodes.ts` | Intelligence Node registry |
| `content/knowledge/graph.ts` | Graph edges and page ownership |
| `content/knowledge/archive.ts` | Archive schema |
| `content/knowledge/triggers.ts` | Homepage trigger registry |
| `content/knowledge/validate.ts` | Dev-time integrity gates |
| `content/knowledge/registry.ts` | Page registry and boot validation |

---

## Final Verdict

The Knowledge Ecosystem now has a **governance constitution** that:

1. Defines a five-state **signal lifecycle** (emerging → active → validated → archived → deprecated) mapped to existing archive schema.
2. Codifies **node authority** through primarySurface, PAGE_OWNERSHIP, and appearance flags — including shared ownership patterns already present in the graph.
3. Establishes **graph discipline** for edge creation, retirement, and validation aligned with `validate.ts` gates.
4. Restricts **archive vocation** to Strategic Brain unless Human Director extends scope.
5. Binds **navigation** to registered triggers and threshold rules — preserving cinematic register at film-to-knowledge handoffs.
6. Gates **expansion** of pages, nodes, signals, and verticals behind Human Director authorization and ecosystem validation.

**Status:** Architecture artefact complete. No implementation, runtime, or UI modifications were made.

**Next authorized work (out of scope for Agent 15):**

- Agent specification `agents/knowledge-governance.md` if the orchestration layer requires a Layer-2 agent spec mirroring this document.
- Runtime lifecycle enforcement (signal state UI, edition browser) — requires separate Cinematic Architect directive.
- Alignment entry in `docs/MASTER_STATE.md` — Human Director instruction only.
