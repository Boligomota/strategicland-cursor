# CHAPTER_SYSTEM — STRATEGICLAND

> The chapter inventory of the project, mapped to canon HTML, density tiers, atmospheres, and motion patterns.
> Use this document when **planning, composing, or auditing chapters and pages**.

---

## 1. Chapter Premise (Recap)

Per `chapter-architecture.mdc` and `cinematic-language.mdc`:

- **Chapter** = self-contained narrative unit with its own atmosphere, palette, motion, and pacing.
- **Scene** = single shot inside a chapter (typically one viewport tall).
- **Page** = sequence of chapters bound by a route.
- Chapters are **portable**, **first-class**, **enforced by `<SceneShell tier energy>`**.

---

## 2. The Six Canonical Chapter Types

| Type        | Role                                       | Allowed tiers (per `narrative-density-system.mdc`) | Default canon source |
|-------------|--------------------------------------------|-----------------------------------------------------|----------------------|
| `hero`      | Opens a page; immersive establishing       | T02, T04                                             | HC-01 / HC-02 / HC-03 |
| `editorial` | Long-form text + image, contemplative      | T01, T02, T03                                        | HC-01 (philosophy)   |
| `case`      | Pinned horizontal storytelling             | T03, T04, T05                                        | HC-06                |
| `human`     | Stillness, philosophy, intimate scale      | T01, T02                                             | HC-05                |
| `cultural`  | Atmospheric immersion, cultural framing    | T01, T03, T04, T05                                   | HC-04                |
| `closing`   | Outro, resolution, residue                 | T01, T02                                             | HC-05 (residue scene)|

---

## 3. Per-Chapter Specification

For each chapter type, this section defines:
- Canonical structure (scenes + tier + energy).
- Atmosphere config (recap from `ATMOSPHERIC_LANGUAGE.md`).
- Motion patterns used (recap from `MOTION_GRAMMAR.md`).
- Audio config (per `sound-behavior-system.mdc`).
- Production destination.
- Canon source mapping.

---

### 3.1 `hero` chapter

**Role:** the first chapter on every page. Establishes atmosphere, identity, and emotional tone in the first 6 seconds.

#### Canonical scene sequence (T04 → T02 → T01)
| # | Scene name              | Tier | Energy        | Description                                                  |
|---|-------------------------|------|---------------|--------------------------------------------------------------|
| 0 | `Scene00_Loader`        | T04  | climactic     | Cinematic loader (HC-02 canonical). Once per session.        |
| 1 | `Scene01_Establishing`  | T04  | immersive     | Hero display title + atmosphere full-bleed.                  |
| 2 | `Scene02_Lede`          | T02  | contemplative | Sub-headline / lede + "Enter Experience" CTA.                |
| 3 | `Scene03_ScrollCue`     | T01  | suspended     | Scroll affordance + silence; transitions to next chapter.    |

#### Atmosphere
Per `ATMOSPHERIC_LANGUAGE.md §12.1`:
- Background: `bg.warmBlack`
- Glow orbs: amber + terra (2 orbs, opposing 8s + 10s breath)
- Vignette: `0.32` center
- Light leak: warm, upper-left, `0.06`
- WebGL: `simplex-fog` at amplitude `0.04`
- Grain: `0.10` opacity (`grain-1024.png`)
- Instability: `drift`

#### Motion patterns used
- `dissolve.heroIntro` (Scene00)
- `revealText.char` (display title in Scene01)
- `parallax.atmospheric` (background + glow orbs)
- `breath.glow` (orbs)
- `revealText.line` (Scene02 lede)
- `cursor.contextual` (always-on)

#### Audio
- Ambience: distant urban edge / wind across glass (after intro completes + audio enabled).
- Transition resonance: 1.8s on entry to next chapter.

#### Canon source
- HC-02 (canonical loader + post-loader hero).
- HC-03 (variant loader).
- HC-01 (variant hero with triple title).

#### Production destination
```
components/chapters/HeroChapter/
├─ index.tsx
├─ atmosphere.config.ts
├─ audio.config.ts
├─ motion.ts
└─ scenes/
   ├─ Scene00_Loader.tsx
   ├─ Scene01_Establishing.tsx
   ├─ Scene02_Lede.tsx
   └─ Scene03_ScrollCue.tsx
```

#### Hero variants
The hero supports **3 variants** (selected per route via prop):
- `variant="triple-title"` — HC-01 pattern (Human / Magic / Systems with offset positioning).
- `variant="editorial-image"` — HC-03 pattern (display title + right-side editorial image).
- `variant="centered-display"` — HC-02 pattern (centered display + atmospheric loader).

The home page uses `variant="centered-display"` as the canonical default.

---

### 3.2 `editorial` chapter

**Role:** long-form contemplative text. Philosophy, manifesto, written essay sections.

#### Canonical scene sequence (T02 → T03 → T03 → T01 → T02)
| # | Scene name             | Tier | Energy        | Description                                                  |
|---|------------------------|------|---------------|--------------------------------------------------------------|
| 1 | `Scene01_Eyebrow`      | T02  | contemplative | Eyebrow + lede + brief context.                              |
| 2 | `Scene02_PhilosophyScrub` | T03 | tension      | Long paragraph word-scrub reveal (HC-01 philosophy).         |
| 3 | `Scene03_MetaGrid`     | T03  | release       | 3-column meta grid (Approach / Constraint / Outcome).        |
| 4 | `Scene04_Silence`      | T01  | suspended     | Silent scene — no reveal, atmosphere only, ≥ 60vh.           |
| 5 | `Scene05_Closing`      | T02  | contemplative | Closing paragraph or attribution line.                       |

#### Atmosphere
Per `ATMOSPHERIC_LANGUAGE.md §12.2`:
- Background: `bg.paper` (light editorial chapter) **or** `bg.warmBlack` (dark editorial chapter)
- Vignette: subtle warm (`0.08` for light) or default (`0.30` for dark)
- No glow orbs
- Tint: `coolPaper` at 4%
- WebGL: none
- Grain: `0.05` opacity
- Instability: `pulse`

#### Motion patterns used
- `revealText.scrub` (philosophy paragraph)
- `revealText.line` (lede + closing)
- `revealText.word` (eyebrow + meta grid items)
- `revealImage.mask` (if illustrative image present)
- `pulse.vignette` (chapter instability behavior)

#### Audio
- Ambience: room tone (interior, soft) at very low volume.
- No transition resonance.
- No tactile micro-tones.

#### Canon source
- HC-01 (philosophy section + meta grid).

#### Production destination
```
components/chapters/EditorialChapter/
├─ index.tsx
├─ atmosphere.config.ts
├─ audio.config.ts
├─ motion.ts
├─ content.mdx                 # editorial copy
└─ scenes/
   ├─ Scene01_Eyebrow.tsx
   ├─ Scene02_PhilosophyScrub.tsx
   ├─ Scene03_MetaGrid.tsx
   ├─ Scene04_Silence.tsx
   └─ Scene05_Closing.tsx
```

#### Variants
- `variant="dark"` — warm-black background, cream text.
- `variant="light"` — paper background, primary text.

---

### 3.3 `case` chapter (pinned horizontal storytelling)

**Role:** detailed project case study with horizontal pinned narrative + creators block.

#### Canonical scene sequence (T03 → T04 → T05 → T04 → T02)
| # | Scene name                     | Tier | Energy       | Description                                                  |
|---|--------------------------------|------|--------------|--------------------------------------------------------------|
| 1 | `Scene01_CaseHero`             | T04  | immersive    | Full-bleed hero image + display title + scroll cue.          |
| 2 | `Scene02_StrategicIntro`       | T03  | tension      | Large serif statement + 3-column Problem / Strategy / Result.|
| 3 | `Scene03_HorizontalSequence`   | T05  | climactic    | Pinned horizontal panels (4–6 panels). HC-06 canonical.       |
| 4 | `Scene04_LocalCreators`        | T04  | release      | Creators block + circular SVG accolade.                       |
| 5 | `Scene05_Reflection`           | T02  | contemplative| Closing reflection + caption hold.                            |

#### Atmosphere
Per `ATMOSPHERIC_LANGUAGE.md §12.3`:
- Background: `bg.charcoal` (Absolut concrete tone) or `bg.warmBlack` (default)
- Vignette: `0.30` center
- Light leak: warm, upper-right, `0.04`
- Glow orbs: 1 copper, large blur, low opacity
- Tint: `amberDust` at 5%
- WebGL: typically none (imagery dominant)
- Grain: `0.08` opacity
- Instability: `drift`

#### Motion patterns used
- `revealImage.blur` (Scene01 hero)
- `revealText.scrub` (Scene02 statement)
- `pin.horizontal` (Scene03)
- `revealImage.mask` + `revealImage.drift` (per panel image in Scene03)
- `revealText.line` (panel titles + bodies)
- `revealText.word` (Scene04 LOCAL CREATORS title)
- `cursor.contextual` (cursor adapts to "drag" state inside Scene03)

#### Audio
- Ambience: project-specific recording (varies per case).
- Transition resonance: mid (1.6s).
- Tactile micro-tones: allowed on slide advance (HC-06's panel transitions), at -28 dB max.

#### Canon source
- HC-06 (Street Trees by Absolut).

#### Production destination
```
components/chapters/CaseChapter/
├─ index.tsx                   # accepts slug prop
├─ atmosphere.config.ts        # default atmosphere; overridden by per-case config
├─ audio.config.ts
├─ motion.ts
└─ scenes/
   ├─ Scene01_CaseHero.tsx
   ├─ Scene02_StrategicIntro.tsx
   ├─ Scene03_HorizontalSequence.tsx
   ├─ Scene04_LocalCreators.tsx
   └─ Scene05_Reflection.tsx
```

Per-case data lives in:
```
content/work/<slug>/
├─ content.mdx
├─ slides.ts                   # panel manifest for Scene03
├─ creators.ts                 # creators manifest for Scene04
├─ atmosphere.config.ts        # per-case override (palette, accent)
└─ audio.config.ts             # per-case ambience
```

#### Routing
- `/work/[slug]` route renders `<CaseChapter slug={slug} />` as the only chapter on the route (preceded by hero, followed by `human` cooldown + closing).

#### Constraints
- A `case` chapter **must** end on T02 (per `narrative-density-system.mdc`) — `Scene05_Reflection` is non-optional.
- Maximum **2 case chapters per page** per `narrative-density-system.mdc`.

---

### 3.4 `human` chapter

**Role:** intimate, philosophy-first, contemplative chapter providing rest between dense chapters.

#### Canonical scene sequence (T02 → T01 → T02 → T01)
| # | Scene name              | Tier | Energy        | Description                                                  |
|---|-------------------------|------|---------------|--------------------------------------------------------------|
| 1 | `Scene01_HumanLayerHero`| T02  | contemplative | Eyebrow + display "Human Layer" + serif italic lede.         |
| 2 | `Scene02_Premise`       | T02  | contemplative | 12-col grid (col-4 left + col-8 right). Multi-paragraph essay.|
| 3 | `Scene03_Pillars`       | T02  | contemplative | 5 pillar rows (Culture / Meaning / Connection / etc).         |
| 4 | `Scene04_Mandate`       | T02  | contemplative | Italic serif quote + attribution + SVG quote glyph.           |
| 5 | `Scene05_Residue`       | T01  | suspended     | "The work is the *residue* of the thinking." + footer attribution. |

#### Atmosphere
Per `ATMOSPHERIC_LANGUAGE.md §12.4`:
- Background: `bg.coolBlack` (cooler tonality for human chapter)
- Glow orbs: amber + copper, parallax, slow breath (11s + 13s)
- Vignette: `0.28` center
- No light leak (pure stillness)
- Tint: `coolFog` at 4%
- WebGL: none (CSS atmosphere only)
- Grain: `0.10` opacity
- Instability: `pulse`

#### Motion patterns used
- `revealText.char` (Scene01 "Human Layer" hero)
- `revealText.line` (Scene02 paragraphs)
- `revealText.word` (Scene04 quote words, rotateX subtle)
- `parallax.atmospheric` (glow orbs)
- `breath.glow` (orbs)
- Pure CSS hover (Scene03 pillar rows — radial gradient via `--mouse-x`)
- `magnetic.gravitational` (none — human chapter forbids magnetic)

#### Audio
- Ambience: near-silence; subtle breath / wind at low volume.
- Transition resonance: almost imperceptible (0.8s wash) on entry.
- Tactile micro-tones: **forbidden** in human chapter.

#### Canon source
- HC-05 (Human Layer).

#### Production destination
```
components/chapters/HumanChapter/
├─ index.tsx
├─ atmosphere.config.ts
├─ audio.config.ts
├─ motion.ts
├─ content.mdx
├─ PillarRow.tsx
├─ pillars.ts                  # 5 pillar definitions (Culture, Meaning, Connection, Perception, Transformation)
└─ scenes/
   ├─ Scene01_HumanLayerHero.tsx
   ├─ Scene02_Premise.tsx
   ├─ Scene03_Pillars.tsx
   ├─ Scene04_Mandate.tsx
   └─ Scene05_Residue.tsx
```

#### Constraints
- **Forbidden tiers:** T03, T04, T05.
- **Forbidden interactions:** magnetic, tactile audio.
- **Required:** ≥ 1 TIER 01 scene (Scene05 satisfies).

---

### 3.5 `cultural` chapter (pinned narrative ladder)

**Role:** atmospheric immersion through sequential cultural narratives.

#### Canonical scene sequence (T03 → T04 → T05 → T01 → T03)
| # | Scene name                | Tier | Energy        | Description                                                  |
|---|---------------------------|------|---------------|--------------------------------------------------------------|
| 1 | `Scene01_Establish`       | T03  | tension       | Display title + scroll affordance. WebGL atmosphere active.  |
| 2 | `Scene02_LadderEntry`     | T04  | immersive     | First narrative archive — establishes the ladder pattern.    |
| 3 | `Scene03_Ladder`          | T05  | climactic     | Pinned narrative ladder of 4–6 archives (HC-04 canonical).   |
| 4 | `Scene04_Silence`         | T01  | suspended     | Silent post-climax scene. Atmosphere holds.                  |
| 5 | `Scene05_Outro`           | T03  | release       | Closing statement + magnetic CTA.                            |

#### Atmosphere
Per `ATMOSPHERIC_LANGUAGE.md §12.5`:
- Background: `bg.warmBlack`
- Vignette: `0.35` center + `0.45` lower-left crushed corner
- Light leak: warm, upper-left, `0.08`
- No glow orbs (WebGL carries weight)
- Tint: `amberDust` at 6%
- WebGL: `simplex-fog` at amplitude `0.08`, palette `amber-dust`
- Grain: `0.10` opacity (`grain-1024.png`)
- Instability: `flicker` (single light leak fade per ~45s)

#### Motion patterns used
- `revealText.char` (Scene01 establishing title with `rotationZ: 5`)
- `pin.ladder` (Scene03 — the canonical motion pattern)
- `revealImage.mask` (per archive image in Scene03)
- `revealText.line` (per archive title + body)
- `magnetic.gravitational` (Scene05 CTA)
- `dissolve.cinematic` (transitions to next chapter)

#### Audio
- Ambience: place-specific field recording.
- Transition resonance: full (2.0s sub wash) on entry.
- Tactile micro-tones: none.

#### Canon source
- HC-04 (Impacto Cultural).

#### Production destination
```
components/chapters/CulturalChapter/
├─ index.tsx                   # accepts slug prop
├─ atmosphere.config.ts
├─ audio.config.ts
├─ motion.ts
├─ NarrativeArchive.tsx
└─ scenes/
   ├─ Scene01_Establish.tsx
   ├─ Scene02_LadderEntry.tsx
   ├─ Scene03_Ladder.tsx
   ├─ Scene04_Silence.tsx
   └─ Scene05_Outro.tsx
```

Per-cultural-narrative data lives in:
```
content/cultural/<slug>/
├─ content.mdx
├─ archives.ts                 # array of { index, image, title, body, freq, frequencyLabel }
└─ atmosphere.config.ts        # per-narrative override
```

#### Cultural-specific rules
- The `Scene03_Ladder` accepts **4–6 archives**. Fewer = the chapter is too thin; more = audience fatigue.
- Each archive's `freq` label (e.g., `Freq. 432Hz · [Resonancia Colectiva]`) is **canonical decoration** — keep it; it is part of the cultural chapter's authorial voice.
- `cultural` chapters are limited to **1 per page** per `narrative-density-system.mdc`.

---

### 3.6 `closing` chapter

**Role:** the final chapter of every page. Resolution, residue, attribution.

#### Canonical scene sequence (T02 → T01 → T01)
| # | Scene name             | Tier | Energy        | Description                                                  |
|---|------------------------|------|---------------|--------------------------------------------------------------|
| 1 | `Scene01_Residue`      | T02  | contemplative | Single italic line ("The work is the residue of the thinking."). |
| 2 | `Scene02_Hairline`     | T01  | suspended     | Vertical hairline + brief silence.                           |
| 3 | `Scene03_Footer`       | T01  | suspended     | Footer attribution (Juan Luis Contreras / Strategic Creative Director). End of sequence. |

#### Atmosphere
Per `ATMOSPHERIC_LANGUAGE.md §12.6`:
- Background: `bg.warmBlack`
- Vignette: `0.40` (crushes inward as page ends)
- Light leak: faint, fading
- No glow orbs
- Tint: `warmFog` at 4%
- No WebGL
- Grain: `0.08`

#### Motion patterns used
- `revealText.line` (Scene01 residue line)
- Hairline reveal (Scene02 — `scaleY: 0 → 1`)
- `revealText.word` (Scene03 footer)
- All audio fades to silence (per `sound-behavior-system.mdc`).

#### Audio
- Ambience: room tone fading to dead air.
- No transition resonance.
- No tactile micro-tones.

#### Canon source
- HC-05 (Scene05_Residue + footer pattern).

#### Production destination
```
components/chapters/ClosingChapter/
├─ index.tsx
├─ atmosphere.config.ts
├─ audio.config.ts
├─ motion.ts
└─ scenes/
   ├─ Scene01_Residue.tsx
   ├─ Scene02_Hairline.tsx
   └─ Scene03_Footer.tsx
```

#### Constraints
- Every page **must** end with a `closing` chapter.
- `closing` is the **only** chapter allowed two consecutive T01 scenes.
- Audio **must** end in silence (audio confirmation of the closing).

---

## 4. Page Composition Patterns

### 4.1 Canonical home page
```
HeroChapter (variant: centered-display)
ChapterSeam from="hero" to="editorial"
EditorialChapter (variant: dark, content: manifesto)
ChapterSeam from="editorial" to="case"
CaseChapter slug="absolut-street-trees"
ChapterSeam from="case" to="human"
HumanChapter
ChapterSeam from="human" to="cultural"
CulturalChapter slug="impacto-cultural"
ChapterSeam from="cultural" to="closing"
ClosingChapter
```

Tier curve:
```
T04→T02→T01 → T02→T03→T03→T01→T02 → T04→T04→T05→T04→T02 → T02→T01→T02→T01 → T03→T04→T05→T01→T03 → T02→T01→T01
```

Average tier: ~2.7 (≤ 3.0 — passes density check). One T05 chapter (cultural). One TIER 01 silence stretch (closing). Passes all linter rules.

### 4.2 `/work/[slug]` page
```
HeroChapter (variant: editorial-image)        # short hero specific to the case
CaseChapter slug={slug}
HumanChapter (single-scene: Mandate only)     # cooldown
ClosingChapter
```

### 4.3 `/studio` page
```
HeroChapter (variant: editorial-image, content: studio identity)
HumanChapter
EditorialChapter (variant: light, content: methodology)
ClosingChapter
```

### 4.4 `/contact` page
```
HeroChapter (variant: centered-display, content: contact heading)
HumanChapter (single-scene: Mandate only)
ClosingChapter (with embedded contact form in Scene01)
```

---

## 5. Chapter Index (Navigation Affordance)

The site exposes a **chapter index** as a slide-in panel from the header.

### Behavior
- Triggered by header "Index" link (or chapter index icon).
- Panel slides in from right at `EASE.cinematic`, `DUR.cinematic`.
- Lists each chapter on the current page with: index number, type label, 6-word summary.
- Click → `lenis.scrollTo(target, { duration: 1.6, easing: easeOut(4) })`.
- Panel atmosphere inherits **current chapter's atmosphere** (grain + tint).

### Constraints
- Maximum **8 entries** in the panel (longer pages summarize sub-sections).
- Background of panel: `bg.warmBlack` at 92% opacity (no glassmorphism — solid + grain, not blur).
- Closes on second tap of trigger or on `Esc`.

---

## 6. Chapter Sequencing Validator

Per `narrative-density-system.mdc §4.3`:

```ts
// lib/density/lintPage.ts
export function lintPage(chapters: ChapterComponent[]): void {
  // 1. No two same-type adjacent
  // 2. Page must contain ≥ 1 TIER 01 scene total
  // 3. Page must contain ≤ 1 TIER 05 chapter
  // 4. Page must end on a closing chapter
  // 5. No two TIER 04+ chapters adjacent without TIER ≤ 02 chapter between
  // 6. Average tier must be ≤ 3.0
  // 7. Chapter type must be allowed for its declared variant
  // ... throws on violation in dev mode
}
```

Run in `app/<route>/page.tsx`:
```ts
if (process.env.NODE_ENV !== "production") {
  lintPage([HeroChapter, EditorialChapter, CaseChapter, HumanChapter, CulturalChapter, ClosingChapter]);
}
```

---

## 7. Adding a New Chapter

To add a new chapter type **(rare — should require creative-direction sign-off)**:

1. Confirm the chapter cannot be expressed as a variant of an existing type.
2. Define its tier set in `lib/density/profiles.ts`.
3. Define its atmosphere config defaults.
4. Define its audio config defaults.
5. Define its scene sequence (3–7 scenes).
6. Add to `lib/chapters/registry.ts`.
7. Update `narrative-density-system.mdc §3` table.
8. Update this document with a new §3.x section.
9. Update `chapter-architecture.mdc` allowed-tiers table.
10. Submit for creative-direction review.

To add a new **instance** of an existing chapter type (e.g., a new `case` study):

1. Create `content/work/<slug>/` folder.
2. Add `content.mdx`, `slides.ts`, `creators.ts`, `atmosphere.config.ts`, `audio.config.ts`.
3. Add a route at `app/(chapters)/work/[slug]/page.tsx` (or rely on existing dynamic route).
4. Update `MASTER_STATE.md §5` with the new case canon mapping (if it introduces unique patterns).

---

## 8. Cross-Chapter Patterns

### 8.1 Patterns shared across multiple chapter types
| Pattern                          | Chapters where used        |
|----------------------------------|----------------------------|
| `revealText.char` (display title)| hero, cultural, human      |
| `revealText.line` (body)         | editorial, human, cultural, closing |
| `revealImage.mask`               | case, cultural, editorial  |
| `revealImage.blur`               | hero, case                 |
| `pin.horizontal`                 | hero (architected systems), case |
| `pin.ladder`                     | cultural                   |
| `magnetic.gravitational`         | hero (CTA), cultural (outro CTA) |
| `breath.glow`                    | hero, human                |
| `cursor.contextual`              | all chapters               |
| `underline.wipe`                 | all chapters with links    |

### 8.2 Patterns scoped to one chapter type
| Pattern                          | Chapter            |
|----------------------------------|--------------------|
| Word-flip nav (HC-02)            | header (cross-chapter) |
| Pillar hover with `--mouse-x`    | human only         |
| Counter 000 → 100                | hero loader only   |
| Architectural frame              | site-wide (HC-01)  |
| Meta-nav with clock              | site-wide          |
| Frequency labels (`Freq. 432Hz`) | cultural only      |
| Cannes circular SVG ring         | case (Absolut only)|
| `Oswald` display font            | case (Absolut only)|

### 8.3 Patterns deliberately limited to scarcity (per `DESIGN_DNA.md §7`)
- `type.epic` — max 2 per page.
- Magnetic CTA — max 2 visible per viewport.
- Pinned chapter — max 2 per page.
- TIER 05 chapter — max 1 per page.
- Light leak peak — once per chapter.
- Tactile audio target — once per chapter (case studies only).

---

## 9. Chapter-to-Chapter Transition Choreography

Per `transition-system.mdc §4` (T2 chapter transition) and `ATMOSPHERIC_LANGUAGE.md §15`:

```ts
<ChapterSeam from="hero" to="editorial" />
```

Internally:
1. ScrollTrigger fires when scroll crosses the seam (60vh transition zone).
2. `TransitionDirector.play("chapter:cross", { from, to })`.
3. Outgoing chapter atmosphere fades + blurs (`BLUR.veil`, `yPercent: -2`) over `DUR.epic`.
4. Audio ducks ambience to 40%; transition resonance fires 200ms after visual midpoint.
5. Incoming chapter atmosphere fades in (`BLUR.soft → 0`, `yPercent: 3 → 0`) with 30% overlap.
6. Incoming chapter eyebrow re-mounts with `revealText.char`.
7. Director state returns to `idle`.

---

## 10. Chapter Authoring Checklist

For every new chapter (instance or type), confirm:

- [ ] Chapter type declared and validates against allowed tiers.
- [ ] Atmosphere config exists and matches `ATMOSPHERIC_LANGUAGE.md §12.x` profile (or declares overrides justified).
- [ ] Audio config exists with appropriate ambience + transition resonance.
- [ ] Scene sequence follows the canonical pattern (or deviates with justification).
- [ ] Each scene declared `tier` + `energy` via `<SceneShell>`.
- [ ] Each `<SceneShell>` `minHeight` snaps to tokens (60/80/100/120vh).
- [ ] Per-scene atmosphere derived via `deriveSceneAtmosphere()`.
- [ ] Variance applied to all motion via `jitter()`.
- [ ] Reduced-motion path verified.
- [ ] Mobile fallback verified (horizontal pin → vertical stack, etc.).
- [ ] Page-level `lintPage()` passes.
- [ ] Visual matches canon (or canon corrections per `HTML_CANON.md §5.5/§7.5`).
- [ ] No forbidden patterns (per `MOTION_GRAMMAR.md §6`, `ATMOSPHERIC_LANGUAGE.md §16`).
- [ ] Chapter ends in correct tier (T01/T02 for closing, T02 for case, etc.).
