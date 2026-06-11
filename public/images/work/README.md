# M-04 · `/work/[slug]` — Image Assets

Per `.rules/image-treatment-system.mdc`, `content/work/types.ts`
(`CaseImageRef`) and `docs/ASSET_SYSTEM.md`. Atmosphere Rendering
domain.

While assets are absent, every slot renders `AtmosphericPlaceholder`
— the route is reviewable with zero photography. Drop the AVIFs at
the paths below; the `src` wiring lands in the migration Phase 2
(see `docs/ASSET_SYSTEM.md §9`).

## Folder contract

One subfolder per registered case:

```
public/images/work/<slug>/
├── hero-<descriptor>.avif          # Scene01 CaseHero backplate
├── slide-NN-<descriptor>.avif      # Scene03 HorizontalSequence (4–6)
└── reflection-<descriptor>.avif    # Scene05 Reflection (optional)
```

Descriptors are fixed in `content/work/<slug>/case.ts`
(`CaseImageRef.descriptor`) BEFORE production. Renaming an asset
breaks the slot contract.

## Asset specification

- Format: AVIF only (sRGB, 8-bit, 4:2:0). No `.webp` siblings — the
  Next image optimizer negotiates AVIF → WebP automatically
  (`next.config.ts images.formats`).
- Naming: kebab-case, lowercase, ASCII. No size suffixes.
- Source masters: `assets/source/images/work/<slug>/` (gitignored).
- Stock photography is forbidden (canon §1). Editorial / documentary /
  original photography only.

## Per-slot budgets

| Slot | Primitive | Ratio | Max px | Weight target |
|------|-----------|-------|--------|---------------|
| `hero-*` | `HeroImage` backplate (radial mask, opacity 0.2) | full-bleed (source 2:1+) | 1920×1080 | ≤ 220 KB — above-fold of the route; carries `priority` + LQIP (≤ 4 KB) |
| `slide-NN-*` | `EditorialImage` (edge-drift, pinned rail) | 3:2 / 4:3 per `CaseImageRef` | 2000×1500 | ≤ 250 KB target (≤ 500 KB hard cap, canon §2.4) |
| `reflection-*` | `EditorialImage` | per `CaseImageRef` | 1920 long-edge | ≤ 220 KB |

## Current case sets

### `sample-case/` — Cartografía del Ruido (speculative)

| Asset | Ratio | Reveal |
|-------|-------|--------|
| `hero-terrain.avif` | 2:1 source | blur (backplate) |
| `slide-01-saturation.avif` | 3:2 | mask, left-to-right |
| `slide-02-tension.avif` | 4:3 | mask, right-to-left |
| `slide-03-decision.avif` | 3:2 | mask, left-to-right |
| `slide-04-system.avif` | 4:3 | mask, right-to-left |
| `slide-05-residue.avif` | 3:2 | mask, left-to-right |

No reflection image for this case.

## Caption credit

Editorial slides ship with caption metadata in `CaseImageRef`
(canon §8.3):

```ts
caption: { author: "Photographer Name", year: "2026", place: "City / Project" }
```

Hero backplates carry no caption — atmosphere, not credit.

## Status

FOUNDATION — no assets yet. All slots render placeholders.
