# HC-04 · STRATEGIC CAPABILITIES — Image Assets

Visual layer for HC-04. While these assets are absent, the corresponding
slots render `AtmosphericPlaceholder` (procedural SVG noise plate with
warm-black integration). Drop the AVIFs at the paths below and the
chapter picks them up automatically — no code changes required.

## Asset specification

All images per `.rules/image-treatment-system.mdc §2`:

- Format: AVIF primary (sRGB, 8-bit). WebP fallback acceptable.
- Source masters live outside the repo (gitignored, design-ops sync).
- Naming: kebab-case, `<scene>-<descriptor>.avif`.
- Sizes capped per canon (Editorial ≤ 400 KB).

Visual direction (per HC-04 brief):

> tangible · operational · grounded · cinematic-documentary · still
> restrained. Operational cinematic imagery. Fragmented environments.
> System surfaces. Spatial human presence. Documentary tactical
> atmosphere.

Image budget compliance:
- HeroImage allowance is exhausted (HC-02 + HC-03 = 2/2 per canon §4.2).
- HC-04 uses `EditorialImage` exclusively. Mask reveals only.
- All 3 plates are corner-anchored and md+ only — no mobile saturation.
- All 3 use `placeholderVariant="documentary"` until real assets land.

Stock photography is forbidden (canon §1). Editorial / documentary /
original photography only.

## Slots

### `fragments-tactical.avif`

- Used by: `CapabilityFragments` (`<EditorialImage ratio="2:1">`
  bottom-left corner-anchored fragment, partially extending toward
  the section's left edge).
- Reveal: `mask` (left-to-right curtain rise).
- Crop: 2:1 cinematic landscape.
- Subject suggestion: documentary tactical fragment — operational
  environment caught from a low angle. Workshop interior, studio
  surface, working architecture. Hands implied by environment but
  faces deliberately absent (humans surface in `tension-presence.avif`).
- Source ratio: 2:1 native preferred.
- Max dimensions: 2000×1000 px (≤ 400 KB AVIF).

### `tension-presence.avif`

- Used by: `AppliedTension` (`<EditorialImage ratio="3:4">` right-
  anchored vertical centre — the operational chapter's "spatial
  human presence" plate).
- Reveal: `mask` (right-to-left curtain).
- Crop: vertical 3:4 portrait.
- Subject suggestion: a single figure inside operational space —
  hands at work, profile against ambient light, focused stance.
  Architectural geometry partially frames the figure. Negative space
  weighted toward the left so the dual-axis statement (capacity /
  consequence) reads against, not over, the figure.
- Source ratio: 3:4 native preferred.
- Max dimensions: 1800×2400 px (≤ 400 KB AVIF).

### `outcome-system.avif`

- Used by: `OutcomeLayer` (`<EditorialImage ratio="2.39:1">` top-right
  corner-anchored anamorphic plate — operational documentary residue).
- Reveal: `mask` (right-to-left curtain).
- Crop: 2.39:1 anamorphic landscape.
- Subject suggestion: operational system surface at rest — control
  panel, workshop wall, finished detail. The trace of decisions, not
  the decisions themselves. Composition reads as "what remains" — the
  image embodies the scene's anchor headline without illustrating it.
- Source ratio: 2.39:1 native preferred.
- Max dimensions: 2400×1004 px (≤ 400 KB AVIF).

## Caption credit

Every image must ship with caption metadata in the consuming component:

```ts
caption={{ author: "Photographer Name", year: "2024", place: "City / Project" }}
```

Captions render below the image automatically (canon §8.3).
