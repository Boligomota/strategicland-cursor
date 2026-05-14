# HTML_CANON — STRATEGICLAND

> The six HTML files on Desktop are the **frozen visual contract** of the project.
> They are the source of truth for layout, motion, atmosphere, and interaction patterns.
> They must NEVER be redesigned. They may ONLY be **modularized, systematized, integrated, unified** into the Next.js architecture.

---

## 0. Canon Inventory

| ID    | Filename (Desktop)                                  | Role                                  | Maps to chapter                |
|-------|-----------------------------------------------------|---------------------------------------|--------------------------------|
| HC-01 | `design-d5f46c5c-ad8f-4922-8feb-cd7ef5eaaca5.html` | HERO + Philosophy + Architected Systems slider | `hero` + `editorial` + introductory `case` carousel |
| HC-02 | `design-d9cf45cb-1d34-424c-81f5-93a0c11f7017.html` | Cinematic loader → "Shaping intentional futures" hero | `hero` (loader phase + opening) |
| HC-03 | `design-b108b47f-d26d-474e-a726-a43f8a7885ce.html` | Variant cinematic loader → "Shaping perception" hero with right-side editorial image | `hero` (loader phase + variant) |
| HC-04 | `design-988a91dc-478d-4d19-b959-c0e52326cbff.html` | "IMPACTO CULTURAL" — pinned narrative ladder of 6 archives + WebGL noise + outro | `cultural` |
| HC-05 | `design-402e8e74-2b82-4065-8569-449ac8580bad.html` | "Human Layer" — philosophy intro + 5 pillars + quote + closing residue | `human` |
| HC-06 | `design-53abffe4-238b-44e8-974e-0f89fcfdd597.html` | "Street Trees by Absolut" — case study with horizontal pinned panels, local creators, Cannes circular SVG | `case` |

---

## 1. Canon Governance Principles

### 1.1 What "frozen" means
- **Visual layout** (composition, scale, spacing, hierarchy) — frozen.
- **Motion choreography** (sequence, easing intent, timing relationships) — frozen.
- **Atmospheric texture** (grain pattern, vignette presence, glow orbs, color grading) — frozen.
- **Interaction primitives** (custom cursor, hover responses, magnetic behavior) — frozen.

### 1.2 What "may be modernized" means
- **Tooling** — vanilla DOM/jQuery-style snippets become React + GSAP context + custom hooks.
- **Tokens** — inline styles become CSS variables in `@theme` and TS tokens.
- **Performance** — vanilla `requestAnimationFrame` loops become `gsap.ticker` integrated; `Math.random()` becomes seeded `jitter()`; CSS noise becomes texture-backed grain.
- **A11y** — `prefers-reduced-motion` paths added; ARIA labels added; focus rings added.
- **Type system** — runtime-generated DOM becomes typed component props.
- **Color reconciliation** — multiple HTML palettes converge on the unified `color-system.mdc`.

### 1.3 What "may be discussed for evolution"
- Typeface consolidation (canon uses Cormorant + Playfair + Inter + Manrope + Montserrat + Oswald — production picks **2** + optional mono).
- Background canvas replacement (canon uses 2D particle canvas in HC-01 and Three.js noise shader in HC-04 — production unifies under R3F).
- Cursor consolidation (canon uses 3 cursor variants — production locks one).
- Loader unification (HC-01 / HC-02 / HC-03 each ship a different loader — production picks one as canonical and treats others as variants).

### 1.4 What "may NEVER change"
- The DNA markers (per `DESIGN_DNA.md`).
- The pinned-ladder choreography of HC-04.
- The pillar-row hover gradient of HC-05.
- The cinematic loader → cross-dissolve → hero pattern of HC-02 / HC-03.
- The horizontal pinned case study panels of HC-06.

---

## 2. HC-01 — Hero + Philosophy + Architected Systems

**File:** `design-d5f46c5c-ad8f-4922-8feb-cd7ef5eaaca5.html`
**Role:** Single-page composition demonstrating the project's full narrative spine in microcosm.

### 2.1 Structural anatomy
1. **Loader** — fullscreen `#loader`, counter `000 → 100`, `expo.inOut` exit (`yPercent: -100`).
2. **Frame border** — `2vw` inset border at `rgba(255,255,255,0.03)`. Decorative architectural framing.
3. **Meta-nav** — top corners. Identity / Domain (left), Local Time / Status (right). Live clock.
4. **Hero** — three stacked `h1` lines: `Human` / `Magic` (italic, accent color, `+10vw` margin-left) / `Systems` (`-5vw` margin-right). 14vw font size. Dual-cursor.
5. **Hero bottom meta** — bottom row: short paragraph + action button.
6. **Philosophy** — full paragraph with **word-by-word scrub reveal** synced to scroll. Bottom 3-column meta grid (Approach / Constraint / Outcome).
7. **Architected Systems** — pinned horizontal slider with 4 cards. Each card: top meta + bottom title + description.
8. **Footer** — "End of Sequence" micro caption.

### 2.2 Token snapshot
- **Color** — `--bg-deep: #050508`, `--bg-mid: #0c0b12`, `--text-main: #ffffff`, `--accent: #d9a799`.
- **Type** — Inter only (300/400/500). Font scale via `clamp()` `--step--2 → --step-5`.
- **Cursor** — `#cursor-dot` 4px solid + `#cursor-circle` 32px (→ 64px on `.hover`) with `backdrop-filter: blur(2px)` on hover.
- **Background canvas** — 2D particles (50 mobile / 150 desktop), `radial-gradient` deep-purple base.

### 2.3 Motion choreography (canon-locked)
- **Loader counter** → `power2.inOut`, 2s.
- **Loader exit** → `expo.inOut`, `yPercent: -100`, 1.2s.
- **Hero h1 reveal** → `power4.out`, `y: 100, opacity: 0 → 1`, stagger 0.15.
- **Meta-nav reveal** → `y: -20, opacity: 0`, 1s, overlap `-=1.5`.
- **Hero parallax on scroll** → `y: 150, opacity: 0`, scrub.
- **Philosophy word reveal** → words split, `opacity: 0.1 → 1, y: 10 → 0`, scrub 1, stagger 0.05, `power2.out`.
- **Slider** → pinned, `xPercent: -100 * (slides - 1)`, `scrub: 1`.
- **Cursor** → dot snaps to mouse via `gsap.set`; circle lerps via `(mouseX - circleX) * 0.15` per ticker.

### 2.4 Modularization map
| Canon element             | Next.js destination                                     |
|---------------------------|---------------------------------------------------------|
| `#loader` + counter       | `components/transitions/HeroIntro.tsx`                  |
| `.frame`                  | `components/atmosphere/ArchitecturalFrame.tsx`          |
| `.meta-nav`               | `components/navigation/MetaNav.tsx` + `useClock()` hook  |
| `.hero` triple title      | `components/chapters/HeroChapter/scenes/Scene01_TripleTitle.tsx` |
| `.philosophy` word reveal | `components/chapters/EditorialChapter/scenes/Scene02_PhilosophyScrub.tsx` |
| `.systems` slider         | `lib/scroll/horizontalSection.ts` + `<PinnedHorizontalSequence>` |
| `#cursor-dot` + `#cursor-circle` | `components/interaction/CustomCursor.tsx`        |
| `#canvas-bg` particles    | `components/webgl/scenes/AmbientParticleScene.tsx` (R3F port) |

### 2.5 Open canon decisions
- **Italic accent word** in hero ("Magic") — keep italic + accent, but reconcile accent color with `color-system.mdc` (`accent.parchment` `#D9C49A` is closest).
- **Cursor radius** — canon uses 4px + 32px → 64px. `interaction-system.mdc` defines 8px + 32–64px. Canon overrides with 4px dot. Decision: **use 8px** for accessibility hit-area considerations.

---

## 3. HC-02 — Cinematic Loader → "Shaping intentional futures"

**File:** `design-d9cf45cb-1d34-424c-81f5-93a0c11f7017.html`
**Role:** The canonical **opening sequence** of the project. Loader → cross-dissolve → editorial hero.

### 3.1 Structural anatomy
1. **Atmospheric loader** — `#loader-system` fullscreen warm-black with:
   - `#atmos-glow` — radial blur ellipse, amber/copper tint, `90vw × 90vh`, `blur(100px)`.
   - `#atmos-blur` — fullscreen `backdrop-blur(24px)` over deep-warm-black.
   - `#loader-title` — `Playfair Display` serif, `12vw / 8vw / 7vw` responsive, character-by-character reveal: `translateY(120%) → 0`, `blur(12px) → 0`, `rotate(8deg) → 0`, `opacity: 0 → 1`, `expo.out` over 1.8s with `power2.inOut` stagger of 1.4s amount.
   - `#loader-subtitle` — sans-serif Montserrat tracking `0.4em`, dashed flank lines, "Strategic Creative Director".
   - `#loader-msg` — bottom-left "This experience is intentional.", `mix-blend-difference`.
   - `#loader-counter` — bottom-right tabular numerals 0 → 100.
2. **Loader exit** — chars `y: -80%, opacity: 0, blur(15px), rotate(-4deg)`, stagger from `random`, 1.2s `power3.in`. Backdrop dissolves to transparent.
3. **Main content reveal** — `nav` + `#hero-tag` ("Portfolio / 2024") + `#hero-title` ("Shaping *intentional* futures through design.") with 1.6s `power4.out` arrivals.

### 3.2 Token snapshot
- **Color** — `brand.dark #020204`, `brand.light #EAE8E3`, `brand.terra #B87B62`, `brand.amber #C99B6A`, `brand.muted #A09D96`.
- **Type** — Playfair Display (300–600) for serif; Montserrat (200–500) for sans.
- **Atmosphere** — film grain SVG turbulence at 0.04 opacity `mix-blend-mode: screen`; vignette radial.

### 3.3 Motion timeline (canon-locked)
```
t=0.0  atmos-glow opacity → 0.6 (3s, power1.inOut)
t=0.5  atmos-blur backdrop-blur 24px → 0px (2.5s, power2.inOut)
t=0.5  counter 0 → 100 (3.5s, power2.inOut)
t=0.8  loader-msg + counter wrapper Y 100% → 0%, opacity → 1
t=1.0  chars Y 120% → 0, blur 12px → 0, rotate 8deg → 0 (1.8s, expo.out, stagger 1.4)
t=1.2  loader-subtitle opacity → 1
t=1.5  loader-title scale 1 → 1.04 (3.5s, none) — Ken Burns drift
t=4.0  EXIT: chars Y → -80%, blur(15px), rotate(-4deg), stagger random
t=4.2  subtitle/msg/counter/glow opacity → 0
t=4.5  loader bg → transparent + main-content fade-in
t=4.8+ hero elements stagger in (tag → title → desc)
```

### 3.4 Modularization map
| Canon element        | Next.js destination                                     |
|----------------------|---------------------------------------------------------|
| Loader system        | `components/transitions/CinematicLoader.tsx` (canonical opener) |
| Char split + reveal  | `lib/motion/charReveal.ts`                              |
| Counter 0–100        | `lib/motion/counterCount.ts`                            |
| atmos-glow + blur    | `components/atmosphere/AtmosphericGlow.tsx`             |
| Cross-dissolve exit  | `lib/transitions/heroIntro.ts`                          |
| Hero post-loader     | `components/chapters/HeroChapter/scenes/Scene01_HeroEditorial.tsx` |

### 3.5 Canon notes
- The loader must run **once per session** (sessionStorage flag).
- `prefers-reduced-motion: reduce` path: loader hidden, hero state set to final.
- HC-02 and HC-03 are **two variants** of the same opening pattern. Production picks **HC-02** as canonical for character reveal grammar; HC-03's brand-name explosion-from-center stagger may live as a **variant pattern** for chapter-internal title reveals.

---

## 4. HC-03 — Loader Variant + Editorial Image Hero

**File:** `design-b108b47f-d26d-474e-a726-a43f8a7885ce.html`
**Role:** Alternate cinematic loader pattern + variant hero with right-side editorial image.

### 4.1 Structural distinctions vs HC-02
- Two background glow orbs (`#glow-1` amber + `#glow-2` accentDark) with opposing sine.inOut yoyo loops (8s + 10s).
- Brand title chars: `opacity: 0 → 1, y: 24px → 0, blur(15px) → 0, scale: 1.1 → 1`, stagger from start, then exit from **center**.
- Vertical hairline indicator (`#counter-line`) above counter, 96–144px, `bg-gradient-to-b`, `scaleY` reveal.
- Loader exit: scale 1.05 + opacity 0; main content fades to opacity 1.
- Hero: `Cormorant Garamond` serif "Shaping perception through *intentional* systems of design", with right-side full-bleed editorial image (`opacity-40 grayscale mix-blend-luminosity scale-105`) and gradient mask from left.

### 4.2 Token snapshot
- **Color** — `base #020204`, `textPrimary #F5F2EF`, `textSecondary #A1968E`, `accentAmber #A86C4E`, `accentDark #3A2C26`.
- **Type** — Cormorant Garamond (300–500) for serif; Manrope (200–500) for sans.

### 4.3 Modularization map
| Canon element         | Next.js destination                                     |
|-----------------------|---------------------------------------------------------|
| Dual glow orbs        | `components/atmosphere/GlowOrbs.tsx` (param: count, color, period) |
| Brand char reveal     | Variant in `lib/motion/charReveal.ts` with `from: "center"` exit |
| Counter line          | `components/atmosphere/CounterLine.tsx`                 |
| Editorial right-image | `components/media/EditorialAsideImage.tsx`              |

### 4.4 Canon notes
- Use HC-03's **glow orb breathing** as the canonical pattern for hero atmospheric breathing across all hero variants.
- HC-03's right-side editorial image with gradient mask is the canonical **side-image pattern** for editorial chapters. See `image-treatment-system.mdc`.

---

## 5. HC-04 — IMPACTO CULTURAL (Cultural Chapter Canon)

**File:** `design-988a91dc-478d-4d19-b959-c0e52326cbff.html`
**Role:** The **cultural chapter** archetype. Pinned narrative ladder + WebGL noise atmosphere + emotional outro.

### 5.1 Structural anatomy
1. **Intro section** (`#intro`) — h1 "IMPACTO CULTURAL" with second word offset `+15vw`, italic, muted color. Top corners: identity + role. Bottom: scroll indicator with vertical hairline + animated downward fill.
2. **Pinned narrative section** (`#narrative-pin-wrapper`) — `h-[600vh]` (6 archives × 100vh). Sticky inner. **6 narrative items** stacked:
   - Archive 01 — *El Movimiento como Fuerza Cultural* (Nike)
   - Archive 02 — *Momentos Humanos Compartidos* (Coca-Cola)
   - Archive 03 — *Identidad Americana Reimaginada* (Calvin Klein)
   - Archive 04 — *Energía de la Cultura Pop* (Pepsi)
   - Archive 05 — *Ritual y Celebración* (Diageo)
   - Archive 06 — *Sistemas de Convivialidad* (Pernod Ricard)
   - Each item: full-bleed image (`opacity-80`) + gradient overlay + top meta (`Archivo. NN` + label) + bottom title (serif, italic muted accent) + bottom-right freq label (`Freq. 432Hz` + bracketed quality).
3. **Outro** (`#outro`) — "La influencia no se mide. *Se siente.*" + magnetic "Iniciar Conversación" button with dual scaleX underlines.

### 5.2 Token snapshot
- **Color** — `dark #050508`, `light #e2e2e2`, `muted #888888`. No brand accent — cultural chapter uses muted-gray restraint.
- **Type** — Cormorant Garamond serif + Inter sans.
- **Atmosphere** — animated noise overlay (CSS keyframes 0.2s) + vignette `inset 0 0 150px rgba(0,0,0,0.9)` + WebGL simplex noise shader at `opacity: 0.6`.

### 5.3 Motion choreography (canon-locked)
- **Intro hero** — `.split-word` chars `y: 120%, rotationZ: 5, opacity: 0`, 1.2s `power4.out`, stagger 0.04. Intro fade group 1.5s `power3.out` stagger 0.2.
- **Hero scroll parallax** — `.split-word y: -150, opacity: 0.2`, scrub 1.
- **Pinned ladder timeline** — for each archive (i ≥ 1):
  - At label `step{i}`: prev image `scale: 0.95, opacity: 0.3` (1s `power2.inOut`); prev top/bottom content `y: -40, opacity: 0`.
  - Simultaneously: current image `clipPath: inset(0)` reveal (1.2s `power3.inOut`) + image inner `scale: 1.1 → 1` (1.2s `power2.out`).
  - Offset `+0.4`: current top/bottom content `y: 0, opacity: 1`, stagger 0.1.
- **WebGL** — fullscreen plane, simplex noise (`finalNoise = (noise1 + noise2) * 0.5`), color mix `#050508 → #0F1220`, `uTime` driven by `delta * 0.2 + |scrollVelocity| * 0.05`.
- **Custom cursor** — 10px solid `#e2e2e2`, lerp 0.15, expand to 40px outlined on `[data-cursor="hover"]`, `mix-blend-mode: difference`.
- **Magnetic** — `.hover-magnetic` translate by 0.3 × delta, return with `elastic.out(1, 0.3)` (CANON ALERT — see §5.5).

### 5.4 Modularization map
| Canon element                | Next.js destination                                     |
|------------------------------|---------------------------------------------------------|
| Intro split-word hero        | `components/chapters/CulturalChapter/scenes/Scene01_Establish.tsx` |
| Pinned ladder timeline       | `lib/motion/pinnedLadder.ts` + `<NarrativeLadder slides={...} />` |
| Each narrative item          | `components/chapters/CulturalChapter/NarrativeArchive.tsx` (props: index, image, title, body, freq) |
| WebGL simplex noise          | `components/webgl/scenes/SimplexFogScene.tsx` + `shaders/atmosphere/simplex-fog.frag` |
| Outro                        | `components/chapters/CulturalChapter/scenes/Scene07_Outro.tsx` |

### 5.5 Canon corrections required (NON-NEGOTIABLE)
- **Magnetic return** uses `elastic.out(1, 0.3)` in canon. **Forbidden** by `motion-system.mdc`. Production must replace with `EASE.cinematic` (`expo.out` feel). The visual difference is acceptable; the bouncy ease is not.
- **WebGL noise period** does not include `uInstability` jitter. Production must add per `human-irregularity-system.mdc`.

---

## 6. HC-05 — Human Layer (Human Chapter Canon)

**File:** `design-402e8e74-2b82-4065-8569-449ac8580bad.html`
**Role:** The **human chapter** archetype. Philosophy-first, glow orbs, hover-revealing pillars, contemplative cadence.

### 6.1 Structural anatomy
1. **Hero** — "Internal Philosophy" eyebrow + serif "Human Layer" `12vw` + serif italic muted lede "The invisible architecture of strategic creativity." + bottom "Descend" affordance with vertical hairline. Two background glow orbs (amber + terra) with parallax.
2. **The Premise section** — 12-column grid: left col-4 ("Where meaning *begins.*" with italic muted second line) + right col-8 (3 stacked paragraphs, the second sized `text-2xl → text-[2.75rem]`, with inline italic accent words and accent quote line "We are building for decades, not quarters.").
3. **Core Elements (Pillars)** — 5 horizontal rows, each a pillar:
   - Culture · Meaning · Connection · Perception · Transformation
   - Each row: large serif title left + 2-line description right. Hover: title color → amber, secondary text fades in from below (`translate-y-4 → 0`), background gets `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(201,124,73,0.08), transparent 40%)`.
4. **Quote section** — small SVG quote glyph + italic serif quote `text-3xl → text-7xl` "Strategic creativity is simply beauty with purpose..." + "— The Creative Mandate" attribution. Background glow orb at center with parallax.
5. **Outro residue** — "The work is the *residue* of the thinking." + vertical hairline + footer "Juan Luis Contreras / Strategic Creative Director".

### 6.2 Token snapshot
- **Color** — `dark #050508`, `darker #020203`, `sand #e3dacc`, `sandMuted #9e978f`, `amber #c97c49`, `terra #8f422e`, `surface rgba(255,255,255,0.03)`.
- **Type** — Cormorant Garamond serif + Manrope sans.
- **Cursor** — 8px solid + 40px (→ 80px on `.hovering`) outline. `mix-blend-mode` not used in canon HC-05; outline becomes amber on hover.

### 6.3 Motion choreography (canon-locked)
- **Hero timeline** — `reveal-text-fast` opacity+y reveal 1.5s; title chars (`SplitType`) `y: 40, opacity: 0, scale: 0.95` 2s stagger 0.08 `power4.out` overlap `-=1`; lede `opacity: 0, blur(10px) → 0` 2.5s `power2.out` overlap `-=1.5`.
- **Lines reveal** — every `.reveal-lines` line `y: 100%, opacity: 0 → 0, 1`, 1.8s stagger 0.15 `power3.out`, ScrollTrigger `top 80%`.
- **Words reveal** — every `.reveal-words` word `opacity: 0, y: 20, rotateX: 20 → 0, 0, 0`, 2s stagger 0.04, ScrollTrigger `top 75%`.
- **Pillars enter** — each row `opacity: 0, x: -20 → 1, 0`, 1.5s `power2.out`, ScrollTrigger `top 90%`.
- **Pillar hover** — pure CSS: title color transition `duration-700`; secondary text `translate-y-4 → 0` + `opacity: 0 → 1` `duration-700`; background radial gradient via `--mouse-x / --mouse-y` CSS vars updated on `mousemove`.
- **Parallax glow orbs** — `.parallax-bg` `y: ScrollTrigger.maxScroll * speed`, scrub.

### 6.4 Modularization map
| Canon element       | Next.js destination                                     |
|---------------------|---------------------------------------------------------|
| Hero                | `components/chapters/HumanChapter/scenes/Scene01_HumanLayerHero.tsx` |
| Premise grid        | `components/chapters/HumanChapter/scenes/Scene02_Premise.tsx` |
| Pillars container   | `components/chapters/HumanChapter/PillarRow.tsx` + `<PillarsList items={...} />` |
| Pillar hover bg     | `lib/interaction/usePointerRadialBg.ts` (CSS-var driven) |
| Quote section       | `components/chapters/HumanChapter/scenes/Scene04_Mandate.tsx` |
| Outro residue       | `components/chapters/HumanChapter/scenes/Scene05_Residue.tsx` |
| Glow orbs           | `components/atmosphere/GlowOrbs.tsx` (shared with HC-03) |

### 6.5 Canon notes
- HC-05 is the project's canonical **TIER 02 contemplative** chapter. No T03+ scenes inside.
- Pillars are **the only place** in the project where a 5-item hover-list is allowed. Replicating this pattern elsewhere is forbidden.
- The closing residue line is the canonical pattern for `closing` chapters everywhere on the site.

---

## 7. HC-06 — Street Trees by Absolut (Case Study Canon)

**File:** `design-53abffe4-238b-44e8-974e-0f89fcfdd597.html`
**Role:** The **case study chapter** archetype. Hero image + horizontal pinned narrative panels + creators block + circular SVG accolade.

### 7.1 Structural anatomy
1. **Hero** — full-bleed urban concrete image with vignette gradients. Bottom-aligned content: amber eyebrow ("A Cultural Intervention") + display "STREET / TREES" (second line `text-outline` stroke-only). Bottom-right: vertical "Scroll" indicator with hairline + animated descending fill.
2. **Strategic intro** — large serif statement "Transforming urban spaces into living art..." with split-text scrub reveal + 3-column grid (Problem / Strategy / Result) with colored accent labels (foliage / blue / amber).
3. **Horizontal pinned section** (`#horizontal-section`) — `400vw` track, 4 panels:
   - Panel 1 — *NIGHT SHIFT* — left text + right image clip-reveal with `bg-[#0033a0]/20 mix-blend-overlay`.
   - Panel 2 — *LIVING CANVAS* — text col-1/3 + image with `bg-[#4a7c59]/10 mix-blend-color`.
   - Panel 3 — *URBAN OASIS* — full-bleed amber-street image + `text-outline` background title + foreground text card with `bg-[#121212]/80 backdrop-blur-md` (CANON ALERT — see §7.5).
   - Panel 4 — *150 TREES* — centered display number with `clip-reveal-up` reveal + foliage subtitle.
   - Bottom hairline progress indicator.
4. **Local Creators** — left col: "LOCAL / CREATORS." display (line-by-line stagger) + 3 artist blocks (border-left + animated colored line per artist: amber / blue / foliage). Right col: circular SVG with rotating Cannes Lions textPath.
5. **(continued sections beyond 280-line snapshot — see canon file)** — additional reflection / process / outcome scenes.

### 7.2 Token snapshot
- **Color** — `--absolut-blue: #0033a0`, `--concrete: #2a2a2a`, `--foliage: #4a7c59`, `--amber: #ff9f43`. Background `#0f0f11`, text `#f5f5f5`.
- **Type** — `Oswald` (500/700) for display + `Inter` (300/400/500) for sans. (CANON ALERT — see §7.5.)
- **Atmosphere** — noise overlay 0.04 SVG turbulence + per-panel color-tinted mix-blend overlays.

### 7.3 Motion choreography (canon-locked)
- **Hero** — `.hero-elem opacity: 0 → 1`, `.hero-title-line translateY full → 0` per line.
- **Strategic intro** — split-text scrub reveal on `.split-text-target`; `.fade-up-elem` ScrollTrigger `top 85%` enter.
- **Horizontal section** — pinned, `xPercent: -100 * (panels - 1)`, `scrub: 1`. Per panel: `.h-img-reveal` `clipPath: inset(0)` over scrub progress; `.image-parallax-inner` translates inversely for depth.
- **Artist lines** — `.artist-line height: 0 → 100%` ScrollTrigger.
- **Cannes ring** — pure CSS `animate-[spin_20s_linear_infinite]` on SVG.

### 7.4 Modularization map
| Canon element             | Next.js destination                                     |
|---------------------------|---------------------------------------------------------|
| Hero with line-stack title| `components/chapters/CaseChapter/scenes/Scene01_CaseHero.tsx` |
| Strategic intro 3-col     | `components/chapters/CaseChapter/scenes/Scene02_StrategicIntro.tsx` |
| Horizontal pinned panels  | `lib/scroll/horizontalSection.ts` + `<CaseHorizontalSequence panels={...} />` |
| Per-panel image w/ tint   | `components/media/CaseSlideImage.tsx`                   |
| Local creators block      | `components/chapters/CaseChapter/scenes/Scene04_Creators.tsx` + `<ArtistBlock>` |
| Cannes circular SVG       | `components/media/CircularTextRing.tsx`                 |

### 7.5 Canon corrections required (NON-NEGOTIABLE)
- **Glassmorphism violation** — Panel 3 ("URBAN OASIS") uses `bg-[#121212]/80 backdrop-blur-md` on a text card. **Forbidden** by `cinematic-language.mdc` and `atmosphere-system.mdc`. Production must replace with a solid warm-black surface + grain overlay (no backdrop blur).
- **Typeface scope** — `Oswald` is canon-specific to this case study only. Production may keep it as a **case-study-specific display face** (declared in chapter atmosphere config) or unify to the global serif. Recommendation: **keep Oswald scoped to one case study** (Absolut) as a deliberate "this brand has its own voice" device, but never use it elsewhere on the site.
- **Mix-blend tints** — `mix-blend-color` and `mix-blend-overlay` on panel images are allowed but must respect `image-treatment-system.mdc`'s ≤ 4% opacity tint cap. Canon shows `/20` and `/10` opacities — production caps at `/8`.

---

## 8. Canon Cross-References

### Patterns shared across canon files
| Pattern                         | Canon files where present | Production destination |
|---------------------------------|---------------------------|------------------------|
| Custom cursor                   | HC-01 · HC-04 · HC-05     | `components/interaction/CustomCursor.tsx` |
| Film grain SVG turbulence       | HC-02 · HC-03 · HC-04 · HC-05 · HC-06 | `components/atmosphere/Grain.tsx` (texture-backed in production) |
| Vignette                        | HC-01 · HC-02 · HC-03 · HC-04 | `components/atmosphere/Vignette.tsx` |
| Scroll indicator hairline       | HC-04 · HC-06             | `components/navigation/ScrollAffordance.tsx` |
| Magnetic hover                  | HC-04 · HC-05             | `lib/interaction/useMagnetic.ts` |
| Animated underline              | HC-02 · HC-04             | `components/interaction/EditorialLink.tsx` |
| Glow orbs (amber + secondary)   | HC-02 · HC-03 · HC-05     | `components/atmosphere/GlowOrbs.tsx` |
| Char-stagger title reveal       | HC-02 · HC-03 · HC-04 · HC-05 | `lib/motion/charReveal.ts` |
| Pinned horizontal sequence      | HC-01 · HC-06             | `lib/scroll/horizontalSection.ts` |
| Pinned narrative ladder         | HC-04                     | `lib/motion/pinnedLadder.ts` |
| Pillar hover radial gradient    | HC-05                     | `lib/interaction/usePointerRadialBg.ts` |

### Patterns NOT to copy
- HC-04's `elastic.out` magnetic return → use `EASE.cinematic`.
- HC-06's glassmorphism card → use solid warm-black + grain.
- HC-01's pure white text on `#050508` → use cream `#EDE6D8` per `color-system.mdc`.
- All canon's CSS noise via SVG `fractalNoise` → switch to image-texture grain per `atmosphere-system.mdc`.

---

## 9. Canon → Production Translation Workflow

For each canon HTML, the production translation follows this sequence:

1. **Audit** — open the canon HTML in browser. Screen-record the choreography. Note all eases, durations, staggers, and color values.
2. **Decompose** — list every component, motion, and atmosphere element.
3. **Map** — assign each element a Next.js destination from §2–§7 above.
4. **Translate tokens** — convert inline values to `lib/motion/eases.ts` / `durations.ts` / `colors.ts` tokens.
5. **Identify violations** — flag any element that violates `.rules/`. Apply the canon corrections (§5.5, §7.5).
6. **Modularize** — write React + GSAP context + custom hooks. Maintain props for all variant inputs.
7. **Verify visual** — side-by-side compare production vs canon at 0.5× and 1× playback. Visual delta must be **invisible to the eye** except where canon corrections apply.
8. **Lint** — run `lib/density/lintPage.ts` to verify tier composition.

---

## 10. Canon Update Protocol

The canon may only be updated via the following procedure:

1. New canon HTML file is added to Desktop with a UUID name.
2. The new file's role and chapter mapping are added to §0 Canon Inventory.
3. A new section (HC-NN) is written in this document following the §2–§7 template.
4. `MASTER_STATE.md §5` is updated with the new canon row.
5. The new canon HTML is reviewed against the DNA Test (`DESIGN_DNA.md §5`) and Anti-Test (`DESIGN_DNA.md §6`).
6. If the new canon passes both tests, it joins the frozen set. If it fails, it is rejected and removed.

**Removing a canon file** requires direct creative-direction sign-off and a deprecation note in `MASTER_STATE.md`.
