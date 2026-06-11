# HC-05 · Closing · Image asset spec

Per `.rules/image-treatment-system.mdc` and the HC-05 blueprint §10.

## Required asset

`afterimage-residue.avif` — with `.webp` fallback.

## Specification

- **Ratio:** 2.39:1 anamorphic
- **Subject:** empty architectural space implying recent human
  presence (no person visible, no branding, no technology)
- **Light:** natural lateral light, elongated shadows
- **Texture:** visible material grain (stone, raw concrete,
  weathered wood, suspended fabric)
- **Read:** should read as "visual memory" rather than "specific
  place"

## Forbidden subjects

- persons, faces, recognizable individuals
- recognizable objects with semantic load (logos, screens, books
  with visible titles)
- technology of any kind
- brand marks, signage, typography
- audiences, crowds
- future scenery, sci-fi aesthetic
- recognizable natural landscape (HC-05 is interior architectural,
  not nature)

## Visual references

- Hiroshi Sugimoto · *Theaters* series (projection without subject)
- Roger Deakins · architectural exteriors with atmospheric emptiness
- Andrei Tarkovsky · final exteriors of *Stalker*
- Wim Wenders · empty interiors of *Paris, Texas*

## Asset budget (page-level)

- Size cap: ≤ 220 KB (AVIF primary)
- Long-edge cap: 1920px
- LQIP: required (≤ 4 KB)

## Treatment in component

`AfterimageFragment.tsx` renders the asset via `<EditorialImage />`
with the following overrides:

- `ratio="2.39:1"`
- `reveal="mask"`, `direction="left-to-right"`
- `placeholderVariant="documentary"` (until real AVIF lands)
- `grade={false}`, `vignette={false}` — the wrapping overlay carries
  its own restricted atmosphere via a radial mask in the component
- container opacity `0.10` — lowest baseline across the organism
- `mixBlendMode: "screen"`
- anchored center-low at 55% / 60% (off-axis +5% horizontal)
- md+ only — mobile renders without the plate

## Status

Currently the procedural `AtmosphericPlaceholder` documentary
variant renders in place of the AVIF. Atmospherically acceptable in
production; replace with real asset when available.
