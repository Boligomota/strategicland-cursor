# HC-05 · ACT B · Showcase · Image asset spec

Per `.rules/image-treatment-system.mdc` and the approved HC-05
production architecture §10. Atmosphere Rendering domain.

## Required assets

Three documentary plates — one per case threshold:

| Asset | Case | Ratio (locked set) |
|-------|------|--------------------|
| `case-protagonist.avif` (+ `.webp`) | protagonist threshold | 2.39:1 anamorphic |
| `case-compact-a.avif` (+ `.webp`)   | first compact          | 2:1 |
| `case-compact-b.avif` (+ `.webp`)   | second compact         | 3:4 |

## Specification

- **Subject:** real-world photography of each case's territory —
  places, objects, people of the world the case operated in. The
  image is SUBJECT, not backplate: the first subject-image of the
  page after four chapters of atmosphere-image.
- **Grading:** warm documentary (canonical warm grade; no cool
  shifts, no high-key)
- **Light:** natural, directional, believable hour
- **Read:** "the force become matter" — the Storyscape activators
  embodied

## Forbidden subjects

- mockups of deliverables of any kind
- UI screens, devices showing work
- client logos, brand marks, awards
- stock photography (project-wide ban)
- staged corporate scenes, handshakes, offices
- collages or grids inside a single plate

## Treatment in component

Rendered via `<EditorialImage />`:

- `reveal="mask"` — the only reveal pattern of the act (locked set)
- protagonist additionally carries the canonical `revealImage.drift`
- full opacity within the editorial frame — unlike every preceding
  chapter, the plate is not atmospheric
- documentary `placeholderVariant` until real assets land

## Asset budget (page-level)

- Size cap: ≤ 220 KB each (AVIF primary)
- Long-edge cap: 1920px
- LQIP: required (≤ 4 KB each)

## Status

FOUNDATION — no assets yet. `ProtagonistThreshold` /
`CompactThresholds` render structural slots
(`data-showcase-plate`); plates bind in the content pass. The full
per-case asset sets for `/work/[slug]` live under
`content/work/<slug>/` per canon — this contract covers ONLY the
three homepage threshold plates.
