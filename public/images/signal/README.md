# HC-03 · SIGNAL / INTELLIGENCE — Image Assets

Visual layer for HC-03. While these assets are absent, the corresponding
slots render `AtmosphericPlaceholder` (procedural SVG noise plate with
warm-black integration). Drop the AVIFs at the paths below and the
chapter picks them up automatically — no code changes required.

## Asset specification

All images per `.rules/image-treatment-system.mdc §2`:

- Format: AVIF primary (sRGB, 8-bit). WebP fallback acceptable.
- Source masters live outside the repo (gitignored, design-ops sync).
- Naming: kebab-case, `<scene>-<descriptor>.avif`.

Visual direction (per HC-03 brief):

> documentary · psychological · fragmented · observational ·
> culturally charged. Blurred crowds. Surveillance-like urban moments.
> Glowing phones in darkness. Fragmented faces. Transit systems.
> Reflections in glass. Behavioral micro-moments. Social isolation
> inside density.

Stock photography is forbidden (canon §1). Editorial / documentary /
original photography only.

## Slots

### `fragments-urban.avif`

- Used by: `FragmentedSignals` (`<EditorialImage ratio="2:1">` backplate
  spanning the full grid above the fragments).
- Reveal: `mask` (left-to-right).
- Crop: 2:1 cinematic landscape.
- Subject suggestion: blurred urban density — pedestrians smeared by
  shutter speed, neon reflection, screens against contemporary
  architecture. Documentary gaze, no posed subjects.
- Source ratio: 2:1 native preferred.
- Max dimensions: 2000×1000 px (≤ 400 KB AVIF).

### `constellation-glow.avif`

- Used by: `PatternConstellation` (`<HeroImage>` atmospheric backplate
  for the chapter's T04 peak).
- Reveal: `blur` (canon §4.2). One of the page's two allowed blur
  reveals (the other is HC-02 statement).
- Crop: full-bleed atmospheric.
- Subject suggestion: dispersed phone lights at distance — concert
  crowd, plaza at dusk, transit terminal — points of cold light against
  warm darkness. Suggests constellation without literal stars.
- Source ratio: 16:9 or wider.
- Max dimensions: 2400×1600 px (≤ 600 KB AVIF).

### `compression-isolation.avif`

- Used by: `StrategicCompression` (`<EditorialImage ratio="2.39:1">`
  closing residue plate, low intensity).
- Reveal: `mask` (left-to-right).
- Crop: 2.39:1 anamorphic.
- Subject suggestion: a single figure inside dense visual noise —
  social isolation inside hyper-connected environment. Negative space
  weighted to the right (cue follows after).
- Source ratio: 2.39:1 native preferred.
- Max dimensions: 2400×1004 px (≤ 400 KB AVIF).

## Caption credit

Every image must ship with caption metadata in the consuming component:

```ts
caption={{ author: "Photographer Name", year: "2024", place: "City / Project" }}
```

Captions render below the image automatically (canon §8.3).
