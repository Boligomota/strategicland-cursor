# DESIGN_DNA — STRATEGICLAND

> The DNA file. The minimum information required to recognize whether a candidate decision belongs to **this** project or **a different** project.
> If you can't justify a design choice against this file, the choice is wrong.

---

## 1. The DNA Sentence (Read This First)

> **STRATEGICLAND is a slow, weighted, atmospheric editorial film that performs the strategic creative practice it documents — using restraint as confidence, silence as content, and the slow film cut as the only acceptable transition.**

Every other rule in the project is a derivative of that sentence. Test every decision against it.

---

## 2. The Five Genetic Markers

These five markers are **non-negotiable**. A design that lacks any of these is **not STRATEGICLAND**.

### Marker 1 — **Restraint as Confidence**
The site shows fewer things, larger, with more weight. Decoration is treated as evidence of insecurity. The work demonstrates that we trust the audience's intelligence.

- **Manifest in code:** ≤ 3 typographic sizes per viewport · ≤ 2 image elements per scene · ≤ 1 interactive affordance per scene (TIER 03+) or 0 (TIER 01–02) · 0 decorative icons.

### Marker 2 — **Silence as Content**
Empty space is not "negative space waiting to be filled". It is the **most expensive and most meaningful** element on the page. Silence is content because it gives the next scene meaning.

- **Manifest in code:** ≥ 40% of any viewport is intentional negative space · ≥ 1 TIER 01 (silence) scene per page · 60vh+ holds between dense chapters · audio ducks to silence during TIER 01 scenes (`sound-behavior-system.mdc`).

### Marker 3 — **The Slow Film Cut**
Transitions are cinematic dissolves with intentional duration weight (`DUR.epic` = 1.8s minimum at chapter level). Audio lags visual by 200ms during cuts. The cut **is** the meaning; we do not rush it.

- **Manifest in code:** chapter transitions ≥ `DUR.epic` · 30% overlap dissolve · 120ms veil hold · forbidden: spinners, skeletons, loading bars.

### Marker 4 — **Atmospheric Realism**
Every viewport carries grain, vignette, ambient light source, and breathing motion. The page never reads as "rendered" — it reads as "shot". Surfaces feel like paper, ink, granite, fog. Never "screen".

- **Manifest in code:** grain present in every scene (0.04–0.12 opacity) · vignette in every dark scene · light leak in hero/establishing/cultural · WebGL atmospheric drift at 30 FPS · per-scene atmosphere variance via `lib/irregularity/`.

### Marker 5 — **Editorial Weight**
The page reads like a printed monograph, not a website. Type is architectural. Composition is asymmetric and weighted to the optical golden ratio. Copy is short, declarative, unhurried — never marketing voice.

- **Manifest in code:** serif display + sans body pairing · oversized type as image not label · left-aligned ragged-right · interpunct (`·`) as the project separator · em dashes (`—`) for breaks · no exclamation marks · no emoji · no buzzwords.

---

## 3. The Six Pillars (Cross-Cut by Marker)

Each pillar describes a system in the project. The HTML canon proves these pillars in practice.

### Pillar A — **Cinematic Language** (governs all other pillars)
Defined in `.rules/cinematic-language.mdc` + this file.

The site is a **film, not a website**. Every component is a shot. Every section is a scene. Every page is a chapter. If a decision can't be defended in cinematic language, it doesn't ship.

### Pillar B — **Editorial Composition**
Defined in `.rules/typography-system.mdc` + canon files HC-01, HC-02, HC-03, HC-05.

12-column grid (soft constraint), asymmetric weighted layouts, oversized serif display + sans body, type-as-image. Always off-center. Always ragged-right. The grid is a guide, not a cage; display type may break it deliberately.

### Pillar C — **Atmospheric Layering**
Defined in `.rules/atmosphere-system.mdc` + `ATMOSPHERIC_LANGUAGE.md` + canon files HC-01, HC-02, HC-03, HC-04, HC-05.

Grain (always) + vignette (always for dark scenes) + light leak (chapter-declared) + WebGL ambient (optional per chapter) + breathing motion (always, glacial pacing). Atmosphere is the air the audience breathes; it is never the subject.

### Pillar D — **Narrative Density**
Defined in `.rules/narrative-density-system.mdc` + `CHAPTER_SYSTEM.md`.

Every scene declares a TIER (T01 SILENCE → T05 KINETIC). Every chapter has a tier sequence. Every page has a density curve that includes ≥ 1 TIER 01 scene and ≤ 1 TIER 05 chapter. Density modulation prevents cinematic fatigue.

### Pillar E — **Human Irregularity**
Defined in `.rules/human-irregularity-system.mdc`.

All variance is bounded and seeded (never raw `Math.random()`). Stagger gaps drift ±18%. Reveal durations drift ±8%. First/last cluster elements get +15% duration. The page breathes; nothing loops perfectly. Result: the project feels **alive, not generated**.

### Pillar F — **Tactile Interaction**
Defined in `.rules/interaction-system.mdc` + canon files HC-01, HC-04, HC-05.

Custom cursor (8px dot + 32–64px outline) with `mix-blend-mode: difference`, lerp 0.15–0.18. Magnetic effects gravitational (lerp 0.1, max 12px displacement), never elastic. Animated underlines wipe in left-to-right, out right-to-left. Hover states acknowledge, never transform.

---

## 4. The Aesthetic Triangulation

The project's aesthetic is the **specific intersection** of three coordinates. Move on any axis and the result stops being STRATEGICLAND.

```
                  Editorial Print
                  (Apartamento, Aperture)
                         │
                         │
                         │
   Slow Cinema  ─────────●───────── Architectural Studio
   (Wong Kar Wai,                   (Simon Holm,
    Sugimoto,                        Kaare Klint,
    Roger Deakins)                   Donald Judd)
```

### Coordinate 1 — **Slow Cinema**
- Frame composition over plot velocity.
- Light as character.
- The held shot. The freeze frame. The soundtrack of room tone.
- References: Wong Kar Wai (*In the Mood for Love*), Roger Deakins (*Sicario*), Sugimoto (seascapes).

### Coordinate 2 — **Editorial Print**
- The page as a printed spread.
- Type that bleeds into gutters.
- Captions with author + year + place.
- References: *Apartamento*, *Aperture*, *MacGuffin*, *Toilet Paper*.

### Coordinate 3 — **Architectural Studio**
- Modular systems with declared joinery.
- Surfaces with material restraint.
- Furniture-grade hardware over marketing flourish.
- References: Simon Holm Studio, Kaare Klint, Donald Judd, Carlo Scarpa.

---

## 5. The DNA Test (Apply Before Shipping)

For any new design choice, answer **all 5 questions**. If any answer is "no" or "I'm not sure", the choice is wrong.

1. **Does it respect at least 4 of the 5 genetic markers?** (See §2.)
2. **Does it sit at the intersection of slow cinema, editorial print, and architectural studio?** (See §4.)
3. **Could a stakeholder describe it without using marketing language?** (E.g., "calm" not "exciting"; "weighted" not "engaging"; "deliberate" not "premium".)
4. **Does it survive the 3-second test?** (Pause the page at second 3. Does the still frame look like a film frame, an editorial spread, or an architectural drawing? If it looks like a "website", redesign.)
5. **Could you justify it without referencing trends?** (No "this is what Awwwards 2024 winners are doing"; no "this is the new 2025 motion language"; no "Vercel does this".)

---

## 6. The DNA Anti-Test (Reject if Any of These Apply)

If any of these are true of a design candidate, **reject it**.

- The element exists to "draw attention" without narrative reason.
- The motion is "playful", "fun", or "delightful" (those are SaaS adjectives).
- The interaction is "satisfying" in a tactile-app way (we are not a productivity app).
- The composition is centered and symmetric by default.
- The color palette uses pure black, pure white, or saturation > 40%.
- The type is "modern geometric" sans (Poppins, Montserrat, Quicksand).
- The transition involves a flash, a slide, a swipe, or a "swoosh".
- The audio carries melodic content.
- The page contains a hover-flipping card, a gradient mesh, a Lottie animation, or an icon set.
- The design "shows the technology" (the audience can name "this is Three.js", "this is GSAP").

---

## 7. The Scarcity Principle

Each of these elements appears **at most once** per page. Scarcity is what makes them powerful.

| Element                          | Page-level cap |
|----------------------------------|----------------|
| `type.epic` (oversized display)  | 2              |
| Hero intro animation             | 1              |
| TIER 05 (kinetic) chapter        | 1              |
| Pinned horizontal section        | 2              |
| Magnetic CTA                     | 2 visible per viewport |
| Light leak peak intensity        | 1 per chapter  |
| WebGL chapter at peak amplitude  | 1 sustained moment per page |
| Tactile audio micro-tone target  | 1 per chapter (case studies) |

If you find yourself wanting "another one", reconsider whether the first one is doing its job.

---

## 8. The Authorship Principle

Every visible element on the page has an author. Every choice is signed.

- Images are credited: `Photographer · Year · Place / Project`.
- Field recordings are credited (in `content/audio/credits.mdx`).
- Typography is credited in the colophon page.
- Color palette decisions are tied to chapter atmospheres in `color-system.mdc`.
- Motion choreography is named (e.g., "the IMPACTO CULTURAL pinned ladder", "the JLC. cinematic loader").

The site is **not a template**. Every component is named after its narrative function, not its UI shape.

---

## 9. The Lineage Statement

When asked "what does this site look like?", the project's allowed answers (in order of preference):

1. *"It looks like a slow film about strategic creative direction."*
2. *"It looks like a printed editorial monograph about the work — animated, but quietly."*
3. *"It looks like Sugimoto's Seascapes shot by Roger Deakins, edited by an architect."*
4. *"It looks like the kind of site Simon Holm Studio would design if they were also an A24 director."*

When asked the same question, the project's **forbidden** answers:

- *"It looks premium / luxury / clean / modern."*
- *"It looks like Apple / Vercel / Linear / Stripe."*
- *"It looks like a portfolio site."*
- *"It looks like the Awwwards SOTD."*
- *"It looks AI-generated."*

If a stakeholder describes the site with any of the forbidden answers, **the site has a DNA bug**, not a perception problem.

---

## 10. Inheritance Note (For Future Decisions)

When this project ships v1 and begins evolution, the following will **inherit unchanged** to v2:

- The DNA Sentence (§1).
- The Five Genetic Markers (§2).
- The Aesthetic Triangulation (§4).
- The Anti-Test (§6).

The following may evolve:

- The HTML canon may be replaced if the new canon also passes the DNA Test.
- The chapter inventory may grow.
- The motion vocabulary may be extended within the locked easing/duration tokens.
- The audio system may be implemented (currently architected, not shipped).

The following may **never** evolve:

- The Anti-Test (§6) only ever **adds** restrictions — it never relaxes them.
- The Scarcity Principle (§7) only ever **tightens** — caps may decrease, never increase.

---

## 11. The DNA in 7 Words

If you must summarize the DNA in 7 words for a hallway decision:

> **Slow. Weighted. Atmospheric. Editorial. Restrained. Tactile. Authored.**

Memorize them. They are the project's name in adjectives.
