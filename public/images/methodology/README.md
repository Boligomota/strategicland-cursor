# HC-02 · STRATEGIC METHODOLOGY — Image Assets

Visual layer for HC-02. While these assets are absent, the corresponding
slots render `AtmosphericPlaceholder` (procedural SVG noise plate with
warm-black integration). Drop the AVIFs at the paths below and the
chapter picks them up automatically — no code changes required.

## Asset specification

All images per `.rules/image-treatment-system.mdc §2`:

- Format: AVIF primary (sRGB, 8-bit). WebP fallback acceptable.
- Source masters live outside the repo (gitignored, design-ops sync).
- Naming: kebab-case, `<scene>-<descriptor>.avif`.
- Sizes capped per canon (Hero ≤ 600 KB, Editorial ≤ 400 KB).

Visual direction (per HC-02 brief):

> architectural · intellectual · systemic · restrained · editorial.
> Blurred brutalist structures. Cinematic architectural surfaces.
> Fragmented paper systems. Abstract spatial grids. Human silhouettes
> inside structured space. Light moving across textured surfaces.
> Layered translucent diagrams barely visible.

Stock photography is forbidden (canon §1). Editorial / documentary /
original photography only.

## Slots

### `statement-architecture.avif`

- Used by: `MethodStatement` (`<HeroImage>` backplate).
- Reveal: `blur` (canon §4.2).
- Crop: full-bleed atmospheric.
- Subject suggestion: blurred architectural surface (concrete, steel
  facade, brutalist depth) — quiet, monumental, pre-light.
- Source ratio: 16:9 or wider.
- Max dimensions: 2400×1600 px (≤ 600 KB AVIF).

### `tension-silhouette.avif`

- Used by: `HumanAITension` (`<EditorialImage ratio="3:4">` off-center
  right column).
- Reveal: `mask` (right-to-left curtain).
- Crop: vertical 3:4 portrait.
- Subject suggestion: human silhouette inside structured space — figure
  partially hidden by architectural geometry, soft directional light.
- Source ratio: 3:4 native preferred.
- Max dimensions: 1800×2400 px (≤ 400 KB AVIF).

## Caption credit

Every image must ship with caption metadata in the consuming component:

```ts
caption={{ author: "Photographer Name", year: "2024", place: "City / Project" }}
```

Captions render below the image automatically (canon §8.3).
