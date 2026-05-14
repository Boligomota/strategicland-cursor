# MOTION_GRAMMAR — STRATEGICLAND

> The motion vocabulary derived from the HTML canon, normalized against `.rules/motion-system.mdc`, `transition-system.mdc`, `human-irregularity-system.mdc`, and `narrative-density-system.mdc`.
> This document tells you **which motion to write, when, and how**.
> If a motion isn't in this grammar, **it doesn't belong on the site**.

---

## 1. Grammar Premise

A grammar is the inventory of valid sentences and the rules for combining them. STRATEGICLAND's motion grammar consists of:

- **Vocabulary** — the named motion patterns (revelations, dissolves, drifts, pulls).
- **Tokens** — the locked easings, durations, staggers (`EASE`, `DUR`, `STAGGER`).
- **Phrasing** — how motions sequence within a scene, chapter, page.
- **Variance** — how each instance of a motion is bounded but never identical.

Motion in this project is **not animation**. It is **cinematography**. Every motion answers: *what does the camera want the audience to feel?*

---

## 2. Token Layer (LOCKED — Recap from `.rules/`)

### 2.1 EASE dictionary (`lib/motion/eases.ts`)
| Token       | GSAP equivalent | Cubic-bezier              | Use                                    |
|-------------|-----------------|---------------------------|----------------------------------------|
| `cinematic` | `expo.out`      | `0.16, 1, 0.3, 1`         | Primary reveal (90% of motion)         |
| `editorial` | `power2.inOut`  | `0.65, 0, 0.35, 1`        | Symmetric, transitions                 |
| `drift`     | `power3.out`    | `0.22, 1, 0.36, 1`        | Long contemplative reveal (≥1200ms)    |
| `settle`    | `power1.out`    | `0.4, 0, 0.2, 1`          | Hovers, micro-settle (≤200ms)          |
| `breath`    | `sine.inOut`    | `0.45, 0.05, 0.55, 0.95`  | Atmospheric loops                      |

**Forbidden:** `bounce`, `elastic`, `back` (all variants), `linear` (except continuous loops), `ease-in-out` default CSS.

### 2.2 DUR dictionary (`lib/motion/durations.ts`)
| Token       | Seconds | Use                                              |
|-------------|---------|--------------------------------------------------|
| `micro`     | 0.18    | Hover state, focus ring, cursor adapt           |
| `quick`     | 0.38    | Small reveals, button reactions, label fades    |
| `standard`  | 0.72    | Default content reveal                          |
| `cinematic` | 1.20    | Hero element reveal, chapter title entry        |
| `epic`      | 1.80    | Chapter transitions, full-bleed dissolves       |
| `glacial`   | 2.60    | Atmospheric ambient loops                       |

### 2.3 STAGGER dictionary (`lib/motion/stagger.ts`)
| Token       | Seconds (each) | Use                                      |
|-------------|----------------|------------------------------------------|
| `tight`     | 0.04           | Letters, dots                            |
| `editorial` | 0.08           | Words, image grid                        |
| `scene`     | 0.16           | Sibling sections, paragraph blocks       |
| `chapter`   | 0.32           | Major elements between chapters          |

### 2.4 Variance envelope (per `human-irregularity-system.mdc`)
- Duration: ±8%
- Stagger gap: ±18%
- Reveal y-offset: ±1.5% of viewport
- Translation: ±1px on x
- Atmosphere blur: ±10%
- All variance via `lib/irregularity/jitter.ts`. **Never** raw `Math.random()`.

---

## 3. The Vocabulary (Named Motion Patterns)

Each named pattern is a **canonical motion**. Use the name in code, comments, and reviews.

### 3.1 `revealText.line` — The line-by-line reveal
**Source canon:** HC-05 (Human Layer pillars) · HC-04 (Impacto Cultural intro).
**Use:** body paragraphs, multi-line ledes.
**Choreography:**
```ts
import { gsap } from "gsap";
import { EASE, DUR, STAGGER } from "@lib/motion";
import { jitter } from "@lib/irregularity/jitter";

export function revealLines(target: gsap.TweenTarget, opts?: { trigger?: Element }) {
  return gsap.fromTo(target,
    { yPercent: 100, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: jitter(DUR.cinematic, 0.08),       // 1104–1296ms
      stagger: { each: jitter(STAGGER.editorial * 1.875, 0.18) }, // ~150ms
      ease: EASE.gsap.cinematic,                   // expo.out
      scrollTrigger: opts?.trigger ? { trigger: opts.trigger, start: "top 80%" } : undefined,
    }
  );
}
```
**Constraint:** Line wrappers must have `overflow: hidden` for the mask effect. Lines must be split with `SplitType` (preferred) or a custom `lib/motion/splitLines.ts`.

### 3.2 `revealText.word` — The word-by-word reveal
**Source canon:** HC-04 (Impacto Cultural intro chars), HC-05 (Mandate quote words).
**Use:** display titles ≤ 5 words, italic accent quotes.
**Choreography:**
```ts
gsap.from(words, {
  yPercent: 8,
  opacity: 0,
  duration: jitter(DUR.standard, 0.08),
  stagger: { each: jitter(STAGGER.editorial, 0.18) },
  ease: EASE.gsap.cinematic,
});
```
**Cluster emphasis (per `human-irregularity-system.mdc`):** first and last words receive `× 1.15` duration.

### 3.3 `revealText.char` — The char-stagger title reveal
**Source canon:** HC-02 (loader title) · HC-03 (brand-name explosion) · HC-04 (split-word chars).
**Use:** **only for hero / chapter-establishing display titles** (`type.epic` or `type.display`). Forbidden on body text.
**Choreography (canon HC-02):**
```ts
gsap.from(chars, {
  yPercent: 120,
  opacity: 0,
  filter: "blur(12px)",
  rotate: 8,
  duration: 1.8,
  stagger: { amount: 1.4, from: "start", ease: "power2.inOut" },
  ease: EASE.gsap.cinematic,                       // expo.out
});
```
**Variant — center exit (canon HC-03):**
```ts
gsap.to(chars, {
  yPercent: -10,
  opacity: 0,
  filter: "blur(8px)",
  duration: 0.8,
  stagger: { each: 0.02, from: "center" },
  ease: EASE.gsap.editorial,
});
```
**Constraint:** Char split applied via `lib/motion/charReveal.ts`. Wrapper words must have `display: inline-flex; overflow: hidden;` for clipping.

### 3.4 `revealText.scrub` — Scroll-scrubbed word reveal
**Source canon:** HC-01 (Philosophy section).
**Use:** long editorial paragraphs presented as a contemplative scroll-driven act.
**Choreography:**
```ts
gsap.to(words, {
  opacity: 1,
  yPercent: 0,
  stagger: STAGGER.tight,                // 0.04
  ease: EASE.gsap.editorial,
  scrollTrigger: {
    trigger: paragraphRef.current,
    start: "top 60%",
    end: "center 40%",
    scrub: 1,                            // 1s smoothing — never `true`
  },
});
```
**Constraint:** Initial word opacity is `0.1` (not `0`) — the text is faintly visible before reveal, never invisible.

### 3.5 `revealImage.mask` — The clip-path image reveal
**Source canon:** HC-04 (narrative ladder per-archive image reveal) · HC-06 (horizontal panel images).
**Use:** all editorial images entering on scroll.
**Choreography:**
```ts
gsap.fromTo(imgWrapperRef.current,
  { clipPath: "inset(0% 100% 0% 0%)" },
  {
    clipPath: "inset(0% 0% 0% 0%)",
    duration: jitter(DUR.cinematic, 0.08),
    ease: EASE.gsap.drift,                          // power3.out
  }
);

gsap.fromTo(imgRef.current,
  { scale: 1.1 },
  { scale: 1, duration: jitter(DUR.cinematic, 0.08), ease: EASE.gsap.editorial }
);
```
**Constraint:** Image is wrapped in two layers — the wrapper for `clipPath` and the image itself for `scale`. The wrapper has `overflow: hidden`.

### 3.6 `revealImage.blur` — Hero image blur reveal
**Source canon:** HC-03 (right-side editorial image) · HC-06 (case study hero).
**Use:** hero / chapter-establishing imagery (≤ 2× per page).
**Choreography:**
```ts
gsap.fromTo(imgRef.current,
  { opacity: 0, filter: "blur(20px)", scale: 1.06 },
  {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    duration: DUR.cinematic,
    ease: EASE.gsap.cinematic,
  }
);
```
**Performance:** Promote to compositor before, clear `will-change` on complete.

### 3.7 `revealImage.drift` — Edge-drift image reveal
**Source canon:** HC-06 (horizontal pinned panels).
**Use:** images inside pinned horizontal sequences.
**Choreography:**
- Outer: `yPercent: 8 → 0`, `opacity: 0 → 1`.
- Inner: `yPercent: -4 → 0` (parallax-on-entry).
- Duration `DUR.cinematic`, `EASE.gsap.cinematic`.

### 3.8 `dissolve.cinematic` — The cinematic dissolve
**Source canon:** HC-04 (between archives) · `transition-system.mdc`.
**Use:** chapter seams, scene seams within an immersive chapter.
**Choreography:**
```ts
// Outgoing
gsap.to(outgoing, {
  opacity: 0,
  filter: "blur(40px)",                              // BLUR.veil
  yPercent: -3,
  duration: DUR.epic,
  ease: EASE.gsap.editorial,
});
// Incoming (offset by 30% of outgoing)
gsap.from(incoming, {
  opacity: 0,
  filter: "blur(20px)",                              // BLUR.haze
  yPercent: 3,
  duration: DUR.epic,
  ease: EASE.gsap.cinematic,
  delay: DUR.epic * 0.3,
});
```
**Constraint:** Always ≥ 30% overlap between outgoing and incoming. Always blur present (pure opacity = "loading state").

### 3.9 `dissolve.heroIntro` — The hero intro choreography
**Source canon:** HC-02 (canonical) · HC-01 (variant) · HC-03 (variant).
**Use:** site entry, **once per session**.
**Choreography (canonical, HC-02 derived):**
```
t=0.0  Black hold (warm-black) for 600ms
t=0.6  Atmosphere fade-in (grain, vignette, light leak) over 800ms
       atmos-glow opacity 0 → 0.6 (3000ms, EASE.settle)
t=0.5  atmos-blur backdrop-blur 24px → 0px (2500ms, EASE.editorial)
t=0.5  Counter 0 → 100 (3500ms, EASE.editorial)
t=1.0  Display title char-reveal (1800ms, expo.out, stagger 1400ms power2.inOut)
t=1.5  Title scale 1 → 1.04 (3500ms, linear) — Ken Burns drift
t=4.0  EXIT: chars yPercent → -80%, blur(15px), rotate(-4deg), stagger random
t=4.5  Veil → transparent + main content opacity → 1
t=4.8  Hero post-loader stagger (eyebrow → title → desc)
```
**Total budget: 6.0s to first interactive frame.** Skipped on revisit (sessionStorage flag) and on `prefers-reduced-motion`.

### 3.10 `pin.horizontal` — Horizontal pinned scroll
**Source canon:** HC-01 (Architected Systems slider) · HC-06 (Street Trees panels).
**Use:** case study advance; system index slider.
**Choreography:**
```ts
const slides = gsap.utils.toArray<HTMLElement>(".slide");
gsap.to(slides, {
  xPercent: -100 * (slides.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: outerRef.current,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    end: () => `+=${trackRef.current.scrollWidth - window.innerWidth}`,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  },
});
```
**Constraint:** Mobile fallback (per `responsive-system.mdc`): convert to vertical stacked layout.

### 3.11 `pin.ladder` — Pinned narrative ladder
**Source canon:** HC-04 (Impacto Cultural archives).
**Use:** sequential immersive cultural narratives.
**Choreography:** see `lib/motion/pinnedLadder.ts`. For each step ≥ 1:
- Previous image: `scale 1 → 0.95, opacity 1 → 0.3`.
- Previous text: `y 0 → -40, opacity 1 → 0`.
- Current image: `clipPath inset(100% 0 0 0) → inset(0 0 0 0)`, inner `scale 1.1 → 1`.
- Current text: `y 40 → 0, opacity 0 → 1`, stagger 0.1, offset `+0.4`.

### 3.12 `parallax.atmospheric` — Background parallax
**Source canon:** HC-05 (glow orbs) · HC-06 (background blur orb).
**Use:** background atmosphere elements only. **Never** on content.
**Choreography:**
```ts
gsap.to(parallaxRef.current, {
  y: () => ScrollTrigger.maxScroll(window) * speed,   // speed: 0.05–0.10
  ease: "none",
  scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: true },
});
```
**Constraint:** Max 3 depth layers (`0.05`, `0.1`, `0.15`). Total displacement ≤ 15% viewport.

### 3.13 `breath.glow` — Glow orb breathing
**Source canon:** HC-03 (dual glow orbs) · HC-05 (single center glow).
**Use:** background atmospheric breathing.
**Choreography:**
```ts
gsap.to(glowRef.current, {
  x: jitter(20, 0.3),                                // ±vw drift
  y: jitter(20, 0.3),
  duration: jitter(8, 0.12),                         // ~7–9s
  ease: EASE.gsap.breath,                            // sine.inOut
  yoyo: true,
  repeat: -1,
});
```
**Constraint:** Two orbs visible simultaneously must have **opposing periods** (e.g., 8s + 10s) and offset directions.

### 3.14 `magnetic.gravitational` — Magnetic CTA pull
**Source canon:** HC-04 (`.hover-magnetic`) · HC-05 (pillar hover bg).
**Use:** primary CTAs, magnetic chapter-index links. ≤ 2 visible per viewport.
**Choreography (corrected from canon — no elastic):**
```ts
const onMove = (e: PointerEvent) => {
  const r = el.getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  const dx = e.clientX - cx, dy = e.clientY - cy;
  const dist = Math.hypot(dx, dy);
  if (dist < 120) {
    tx = dx * 0.25; ty = dy * 0.25;
  } else {
    tx = 0; ty = 0;
  }
};
const onLeave = () => {
  gsap.to(el, { x: 0, y: 0, duration: DUR.quick, ease: EASE.gsap.cinematic });
  // CANON CORRECTION: replaced elastic.out(1, 0.3) with EASE.cinematic
};
```
**Constraint:** Max displacement 12px. Lerp 0.10. Disabled on touch + reduced motion.

### 3.15 `cursor.contextual` — Custom cursor adapt
**Source canon:** HC-01 · HC-04 · HC-05.
**Use:** desktop only. The single global `<CustomCursor>` adapts via `data-cursor` attribute.
**Choreography:**
- Default: 8px solid + 32px outline, lerp 0.15–0.18.
- `[data-cursor="link"]`: outline → 64px, label appears.
- `[data-cursor="hover"]` (HC-04 / HC-05 pattern): outline → 80px, color → accent.
- All transitions: `EASE.settle`, `DUR.quick`.
- `mix-blend-mode: difference` (HC-04 pattern).
- Sub-pixel jitter when stationary > 2s (per `human-irregularity-system.mdc`).

### 3.16 `underline.wipe` — Animated link underline
**Source canon:** HC-02 · HC-04 (outro CTA).
**Use:** all editorial links.
**Choreography:**
```css
.link::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: -2px;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right center;
  transition: transform 380ms cubic-bezier(0.16, 1, 0.3, 1);
}
.link:hover::after,
.link:focus-visible::after {
  transform: scaleX(1);
  transform-origin: left center;                     /* origin reverse on out vs in */
}
```
**Constraint:** Always 1px (display links may use 2px). Always `currentColor`. Origin reverse creates the wipe character.

### 3.17 `wordFlip.nav` — Navigation word-flip on hover
**Source canon:** HC-02 (header nav links).
**Use:** primary navigation only.
**Choreography:**
```html
<a class="group relative overflow-hidden">
  <span class="inline-block transition-transform duration-500 group-hover:-translate-y-full">Index</span>
  <span class="inline-block absolute left-0 top-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0">Index</span>
</a>
```
**Constraint:** 500ms transition, simple translateY, single overflow wrapper. No fade — pure mask reveal.

### 3.18 `pulse.vignette` — Vignette intensity pulse
**Source canon:** declared in `human-irregularity-system.mdc §7.3`.
**Use:** chapter-declared atmospheric breathing (one of: drift / pulse / flicker per chapter).
**Choreography:**
```ts
gsap.to(vignetteRef.current, {
  opacity: () => 0.32 + jitter(0.04, 0.5),          // ±0.04 around base
  duration: jitter(14, 0.15),
  ease: EASE.gsap.breath,
  yoyo: true,
  repeat: -1,
});
```

### 3.19 `count.numeric` — Counter 000 → 100
**Source canon:** HC-01 · HC-02 · HC-03 (loaders).
**Use:** loader-only. **Never** on content metrics.
**Choreography:**
```ts
const counter = { val: 0 };
gsap.to(counter, {
  val: 100,
  duration: 3.5,
  ease: EASE.gsap.editorial,
  onUpdate: () => {
    el.innerText = Math.floor(counter.val).toString().padStart(3, "0");
  },
});
```
**Constraint:** Tabular numerals via `font-variant-numeric: tabular-nums`.

---

## 4. Phrasing Rules (Combining Motions)

### 4.1 Within a single scene
- **Layered order:** atmospheric (always-on) → structural (one) → detail (cluster) → reactive (always-on).
- **Stagger:** never two structural reveals simultaneously without stagger.
- **Pause:** insert dramatic pause `jitter(0.28, 0.3)` between two scene reveals (per `human-irregularity-system.mdc §4.1`).

### 4.2 Within a chapter
- Follow the chapter's tier sequence (per `narrative-density-system.mdc §3`).
- **Suspended moment** (per `human-irregularity-system.mdc §4.5`) used at most **once per chapter**, on the climactic reveal.
- **Cluster emphasis** — first/last elements of any reveal cluster get +15% duration (per `human-irregularity-system.mdc §6.4`).

### 4.3 Across chapters
- All chapter seams use `dissolve.cinematic` (Tier T2 transition).
- All routes use `dissolve.heroIntro`-class transitions for the route-level (Tier T3).
- The site's first visit uses `dissolve.heroIntro` once (Tier T4).

### 4.4 Pacing rules
- No two consecutive scenes share the same density tier (except T01 → T01 sustained silence).
- A TIER 04+ scene must be followed within ≤ 2 scenes by a TIER ≤ 02 scene.
- Maximum 2 pinned chapters per page.

---

## 5. Variance Rules (Applied to Every Motion)

Every motion in this grammar must obey:

1. **All durations** routed through `jitter(DUR.X, 0.08)`.
2. **All staggers** routed through `jitter(STAGGER.X, 0.18)`.
3. **All translations** routed through `jitter(value, 0.18)` (e.g., reveal y-offset).
4. **Cluster emphasis** — first/last elements ×1.15 duration via `clusterDuration(i, total, base)`.
5. **Atmospheric loops** include sub-amplitude jitter (per `human-irregularity-system.mdc §3.5`).
6. **First-frame reaction delay** — hero intro and chapter establishing reveals delayed `jitter(0.22, 0.3)` seconds (per `human-irregularity-system.mdc §3.6`).

---

## 6. Anti-Vocabulary (Forbidden Motion Patterns)

If you find yourself writing one of these, **stop and re-route to the canonical vocabulary**.

| Forbidden                                  | Why                                              | Use instead                          |
|--------------------------------------------|--------------------------------------------------|--------------------------------------|
| `ease: "elastic.out"` / `bounce` / `back`  | Reads as "cute" / SaaS                          | `EASE.cinematic`                     |
| `scale(1.05+)` on hover                    | Overgrown UI                                     | `opacity 1 → 0.85` or wipe underline |
| Pulsing CTA button                         | Begging for attention                            | Static CTA + magnetic pull (rare)    |
| Auto-rotating image carousel               | Carousel forbidden globally                     | Pinned horizontal sequence           |
| Hover-flipping card                        | Affectation                                      | Static editorial composition         |
| Cursor trail / particle follower           | Decoration                                       | Single contextual cursor             |
| Ripple effect on press                     | Material UI cliché                               | `translateY(1px)` micro-press        |
| Lottie animation in editorial section      | Decoration                                       | `revealText.line` + atmospheric drift |
| Marquee ticker as decoration               | Generic                                          | Single chapter eyebrow with stillness |
| Animated `top / left / width / height`     | Layout reflow + perf                             | `transform` only                     |
| Continuous looping rotation on UI          | Spinner / loader cliché                          | Vignette pulse / glow breath         |
| Random ease per element                    | Incoherence                                      | `EASE.cinematic` everywhere; vary `DUR` |
| `Math.random()` in motion code             | Unbounded variance                               | `jitter(value, percent)`             |

---

## 7. Implementation Patterns

### 7.1 Standard scene reveal hook
```ts
// hooks/useSceneReveal.ts
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealLines } from "@lib/motion/reveal";

export function useSceneReveal(scopeRef: RefObject<HTMLElement>) {
  useGSAP(() => {
    const lines = gsap.utils.toArray<HTMLElement>(".reveal-lines .line", scopeRef.current);
    revealLines(lines, { trigger: scopeRef.current });
  }, { scope: scopeRef });
}
```

### 7.2 Standard hero intro hook
```ts
// hooks/useHeroIntro.ts
export function useHeroIntro(scopeRef: RefObject<HTMLElement>) {
  useGSAP(() => {
    if (sessionStorage.getItem("strategicland.intro") === "seen") {
      // Skip intro — set to final state
      gsap.set(scopeRef.current, { opacity: 1 });
      gsap.set(".hero-elem", { opacity: 1, y: 0 });
      return;
    }
    runHeroIntroTimeline(scopeRef.current);
    sessionStorage.setItem("strategicland.intro", "seen");
  }, { scope: scopeRef });
}
```

### 7.3 GSAP context cleanup
All GSAP work in React **must** use `useGSAP` (preferred) or manual `gsap.context()` with revert in cleanup. Never bare `gsap.to()` in `useEffect`.

```ts
// Correct
useGSAP(() => {
  gsap.from(".reveal", { /* ... */ });
}, { scope: scopeRef });

// Incorrect
useEffect(() => {
  gsap.from(".reveal", { /* ... */ }); // leaks on remount
}, []);
```

### 7.4 ScrollTrigger refresh discipline
- After font load: `ScrollTrigger.refresh()`.
- After image load (above-fold): `ScrollTrigger.refresh()`.
- On route change: `ScrollTrigger.killAll()` then re-create.
- On window resize: handled automatically by ScrollTrigger.

---

## 8. Reduced-Motion Path

Under `prefers-reduced-motion: reduce`:

- **All `jitter()` collapses to base** (percent → 0).
- **All translates disabled** — opacity-only reveals.
- **All blur-entry disabled** — replaced with opacity.
- **Cursor lerp disabled** — instant snap.
- **Magnetic disabled** — static.
- **WebGL uniforms frozen** at midpoint values.
- **Atmosphere breathing motion disabled** — static at chapter declared base.
- **Audio capped** at -32 dB; transition resonance disabled.
- **All durations capped at `DUR.quick`** (380ms) for content reveals.
- **Hero intro skipped** — set to final state.
- **Chapter transitions** retain a 800ms total (veil hold), but the choreography simplifies.

The `lib/utils/prefersReducedMotion.ts` exposes a hook + a sync utility. Every motion in this grammar **must** consume it.

---

## 9. Performance Constraints (Per Motion)

Per `performance-system.mdc`:

- Concurrent GSAP tweens ≤ 16.
- Concurrent ScrollTriggers ≤ 24.
- `will-change` ≤ 8 elements at any moment.
- Per-motion render budget: `revealText.scrub` ≤ 2ms/frame, `revealImage.mask` ≤ 1.5ms/frame.

If a chapter exceeds budgets, **degrade**: drop blur entry first, then drop scrub, then drop parallax depth.

---

## 10. The Motion Grammar Test

Before merging any motion code, answer:

1. **Is the motion in the named vocabulary (§3)?** (If not, why not? Justify in PR.)
2. **Are eases / durations / staggers from the locked dictionaries (§2)?**
3. **Is variance applied via `jitter()` (§5)?**
4. **Does the motion respect cluster emphasis (first/last +15%)?**
5. **Does the reduced-motion path render coherently?**
6. **Does the motion fit the chapter's tier (per `narrative-density-system.mdc`)?**
7. **Does the motion fit the chapter's allowed reference cinematographer (per `VISUAL_REFERENCE_LOCK.md §4`)?**

Six "yes"es → ship.
Any "no" → revise.

---

## 11. Cinematic Rationale

- A locked grammar is what separates **a film** from **a motion graphics reel**. A reel uses a different ease per shot. A film uses three eases for 90 minutes.
- The 15% cluster emphasis maps onto musical phrasing (held downbeat, resolved final note). The audience feels it without naming it.
- Variance via seeded `jitter()` is the difference between **alive** and **glitchy**. The same site visit is consistent; two visits never identical.
- The vocabulary names (`revealText.line`, `dissolve.cinematic`, `pin.ladder`) force narrative thinking at the file-system level. You cannot accidentally write a SaaS animation when the function you're calling is `dissolve.cinematic`.
