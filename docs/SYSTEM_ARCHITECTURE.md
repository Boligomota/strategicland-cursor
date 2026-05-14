# SYSTEM_ARCHITECTURE — STRATEGICLAND

> Technical architecture mapping the **HTML canon** and **`.mdc` rules** into the **Next.js 16 App Router** codebase.
> This document is the bridge between *what we want* (canon + rules) and *how we build it* (Next.js + GSAP + R3F + Lenis).

---

## 1. Architectural Premise

The codebase is a **single Next.js 16 App Router application** with:

- **One root canvas** (R3F) — all WebGL scenes tunneled into it.
- **One Lenis instance** — single source of scroll truth, bridged to GSAP ticker.
- **One TransitionDirector** — orchestrates all chapter, page, and route transitions.
- **One CursorProvider** — owns the custom cursor state and adaptation.
- **One AudioDirector** — owns the AudioContext (when audio ships).
- **One IrregularityProvider** — owns the seeded PRNG for variance.
- **Per-chapter atmosphere shells** — declared in `atmosphere.config.ts` files.

The architecture is **engine-and-data**: the engine knows nothing about specific chapters; chapters declare data + scene composition.

---

## 2. Layer Map (Top-Down)

```
┌─────────────────────────────────────────────────────────────────────┐
│  app/                            ← Routing (Next.js App Router)     │
│  ├─ layout.tsx                   ← Providers + WebGLRoot + Cursor   │
│  ├─ page.tsx                     ← Home: composes chapters           │
│  ├─ (chapters)/work/[slug]       ← Case study detail routes          │
│  └─ (chapters)/studio | contact  ← Human + closing routes            │
├─────────────────────────────────────────────────────────────────────┤
│  components/                     ← All React components              │
│  ├─ chapters/<X>Chapter/         ← Chapter-as-component              │
│  ├─ atmosphere/                  ← Grain, vignette, glow orbs        │
│  ├─ media/                       ← EditorialImage, RevealImage       │
│  ├─ primitives/                  ← Type, EditorialBlock, SceneShell  │
│  ├─ navigation/                  ← Header, MetaNav, ChapterIndex     │
│  ├─ interaction/                 ← CustomCursor, EditorialLink, CTA  │
│  ├─ transitions/                 ← Director, Seam, RouteVeil         │
│  ├─ webgl/                       ← Single Canvas + tunneled scenes   │
│  └─ debug/                       ← Dev overlays (FPS, grid)          │
├─────────────────────────────────────────────────────────────────────┤
│  lib/                            ← Engine code (no React)            │
│  ├─ motion/                      ← EASE, DUR, STAGGER, reveal helpers│
│  ├─ scroll/                      ← Lenis init + GSAP bridge          │
│  ├─ transitions/                 ← Dissolve, chapterCross, heroIntro │
│  ├─ webgl/                       ← Canvas root, tunnel, materials    │
│  ├─ atmosphere/                  ← Palettes, tints, composer         │
│  ├─ chapters/                    ← Types, registry, sequencing       │
│  ├─ density/                     ← Tiers, lintPage, sceneShell       │
│  ├─ irregularity/                ← jitter, pick, humanEase           │
│  ├─ interaction/                 ← Cursor, magnetic, hover hooks     │
│  ├─ sound/                       ← AudioDirector + ambience layer    │
│  └─ utils/                       ← clamp, lerp, prefersReducedMotion │
├─────────────────────────────────────────────────────────────────────┤
│  hooks/                          ← Cross-cutting React hooks         │
│  content/                        ← MDX editorial copy per chapter    │
│  shaders/                        ← Raw GLSL                          │
│  styles/                         ← @theme tokens + globals.css       │
│  types/                          ← Shared TypeScript types           │
│  public/                         ← Static assets (images, textures)  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Provider Tree (Root Layout)

```tsx
// app/layout.tsx
<html lang="es" className={`${serif.variable} ${sans.variable}`}>
  <body>
    <ReducedMotionProvider>
      <IrregularityProvider seed={getSessionSeed()}>
        <LenisProvider>
          <CursorProvider>
            <AudioProvider>
              <TransitionDirector>
                <WebGLRoot />                {/* fixed inset-0, z-0 */}
                <ChapterAtmosphere />        {/* grain, vignette, scrim — fixed */}
                <ArchitecturalFrame />       {/* 2vw inset border (HC-01) */}
                <MetaNav />                  {/* top corners */}
                <CustomCursor />             {/* desktop only */}
                <main>{children}</main>
                <RouteVeil />                {/* T3 transition layer */}
              </TransitionDirector>
            </AudioProvider>
          </CursorProvider>
        </LenisProvider>
      </IrregularityProvider>
    </ReducedMotionProvider>
  </body>
</html>
```

### Provider order rationale
- **ReducedMotion** outermost — every other provider checks it.
- **Irregularity** seeded before motion — ensures all motion uses the seeded PRNG.
- **Lenis** before Cursor — cursor lerp uses Lenis ticker.
- **Audio** before Transition — transitions trigger audio events.
- **TransitionDirector** wraps all rendering — owns the route transition state machine.

---

## 4. Single Root Canvas (R3F Tunnel Pattern)

```tsx
// components/webgl/WebGLRoot.tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { sceneTunnel } from "@lib/webgl/tunnel";

export function WebGLRoot() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop="demand"
        flat
      >
        <sceneTunnel.Out />
      </Canvas>
    </div>
  );
}

// In a chapter
import { sceneTunnel } from "@lib/webgl/tunnel";
<sceneTunnel.In>
  <SimplexFogScene frequency={chapter.webgl.frequency} />
</sceneTunnel.In>
```

### Performance contract
- DPR cap: 1.5 desktop, 1.0 mobile.
- `frameloop="demand"`: scenes mark dirty via `invalidate()`.
- 30 FPS for atmospheric scenes (drive `uTime` via `gsap.ticker` at half rate).
- Scenes auto-unmount during sustained TIER 01 stretches (per `narrative-density-system.mdc`).

---

## 5. Lenis ↔ GSAP Bridge

```ts
// lib/scroll/lenis.ts
import Lenis from "lenis";

export const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 0.8,
  syncTouch: true,
  syncTouchLerp: 0.075,
});

// lib/scroll/lenisGsapBridge.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenis } from "./lenis";

gsap.registerPlugin(ScrollTrigger);
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### Initialization point
- `LenisProvider` initializes Lenis on mount (client-only, `useLayoutEffect`).
- Bridge runs **once** at provider mount.
- On `prefers-reduced-motion`: `lenis.destroy()` and fall back to native scroll.
- On route change: `ScrollTrigger.killAll()` then re-create from incoming page.

---

## 6. TransitionDirector State Machine

```ts
type TransitionState =
  | { kind: "idle" }
  | { kind: "T0_micro";   target: HTMLElement; }
  | { kind: "T1_scene";   target: HTMLElement; }
  | { kind: "T2_chapter"; from: ChapterId; to: ChapterId; }
  | { kind: "T3_route";   from: string; to: string; }
  | { kind: "T4_intro";   phase: "veil" | "atmosphere" | "type" | "complete"; };

const useTransitionDirector = () => ({
  state: TransitionState,
  play: (kind, payload) => void,
  isTransitioning: boolean,
});
```

### Director responsibilities
- Owns the master GSAP timeline for each transition tier.
- Coordinates with `AudioDirector` for transition resonance.
- Coordinates with `CursorProvider` to dim cursor during T3/T4.
- Locks scroll (`lenis.stop()`) during T3/T4; unlocks on completion.

### Director coordination diagram
```
play("chapter:cross", { from, to })
   │
   ├─► Schedule outgoing chapter atmosphere fade (DUR.epic)
   ├─► Schedule incoming chapter atmosphere fade-in (DUR.epic, +30% overlap)
   ├─► Trigger audio.transitionResonance (via AudioDirector)
   ├─► Apply blur choreography (BLUR.veil at midpoint)
   └─► onComplete → set state.kind = "idle"
```

---

## 7. Chapter Composition Model

Pages compose chapters declaratively. Pages contain **no layout logic**.

```tsx
// app/page.tsx
import { HeroChapter, EditorialChapter, CulturalChapter, HumanChapter, CaseChapter, ClosingChapter, ChapterSeam } from "@components/chapters";
import { lintPage } from "@lib/density/lintPage";

export default function Home() {
  if (process.env.NODE_ENV !== "production") {
    lintPage([HeroChapter, EditorialChapter, CaseChapter, HumanChapter, CulturalChapter, ClosingChapter]);
  }
  return (
    <>
      <HeroChapter />
      <ChapterSeam from="hero" to="editorial" />
      <EditorialChapter />
      <ChapterSeam from="editorial" to="case" />
      <CaseChapter slug="absolut-street-trees" />
      <ChapterSeam from="case" to="human" />
      <HumanChapter />
      <ChapterSeam from="human" to="cultural" />
      <CulturalChapter slug="impacto-cultural" />
      <ChapterSeam from="cultural" to="closing" />
      <ClosingChapter />
    </>
  );
}
```

### Chapter folder anatomy
```
components/chapters/CulturalChapter/
├─ index.tsx                  # composition
├─ atmosphere.config.ts       # palette, grain, vignette, light leak, webgl
├─ audio.config.ts            # ambience, transition resonance
├─ motion.ts                  # chapter-specific GSAP timelines
├─ scenes/
│  ├─ Scene01_Establish.tsx   # tier T03, energy contemplative
│  ├─ Scene02_Ladder.tsx      # tier T05, energy climactic, pin
│  ├─ Scene07_Outro.tsx       # tier T01, energy suspended
│  └─ ...
├─ NarrativeArchive.tsx       # internal component
└─ CulturalChapter.test.tsx
```

### `<SceneShell>` enforcement
```tsx
// components/primitives/SceneShell.tsx
type SceneShellProps = {
  tier: DensityTier;             // T01–T05
  energy: SceneEnergy;            // low/suspended/tension/release/immersive/contemplative/climactic
  pin?: boolean;
  minHeight?: string;             // "60vh" snap to tokens
  children: React.ReactNode;
};
```

`<SceneShell>` reads `tier` and:
- Applies WebGL `uIntensity` uniform (0.2/0.4/0.6/0.8/1.0).
- Coordinates audio ducking via `useDuckOnTier(tier)`.
- Validates motion budget in dev mode.
- Validates interaction affordance count in dev mode.

---

## 8. Module → Canon Mapping (Comprehensive)

This table is the authoritative cross-reference. When a module is created, it must match a canon source.

| Production module                                   | Canon source       | Notes                                          |
|-----------------------------------------------------|--------------------|------------------------------------------------|
| `components/transitions/CinematicLoader.tsx`         | HC-02 (canonical), HC-03 (variant) | One-time per session. SessionStorage flag. |
| `components/transitions/HeroIntro.tsx`               | HC-01              | Loader counter `000 → 100` + `expo.inOut` exit. |
| `components/transitions/RouteVeil.tsx`               | HC-02 + transition-system.mdc | View Transitions API + GSAP fallback. |
| `components/transitions/ChapterSeam.tsx`             | transition-system.mdc | T2 cross-chapter atmosphere interpolation. |
| `components/atmosphere/Grain.tsx`                    | HC-02 · HC-03 · HC-04 · HC-05 · HC-06 | Texture-backed (not CSS turbulence). |
| `components/atmosphere/Vignette.tsx`                 | HC-01 · HC-02 · HC-03 · HC-04 | Radial gradient + box-shadow inset. |
| `components/atmosphere/GlowOrbs.tsx`                 | HC-02 · HC-03 · HC-05 | Sine.inOut yoyo loops, parallax. |
| `components/atmosphere/AtmosphericGlow.tsx`          | HC-02              | Loader-time atmospheric ellipse + blur. |
| `components/atmosphere/ArchitecturalFrame.tsx`       | HC-01              | 2vw inset border. |
| `components/atmosphere/CounterLine.tsx`              | HC-03              | Vertical hairline above counter. |
| `components/atmosphere/Scrim.tsx`                    | atmosphere-system.mdc | Top/bottom gradient for nav legibility. |
| `components/navigation/MetaNav.tsx`                  | HC-01              | Identity / Domain / Clock / Status. |
| `components/navigation/Header.tsx`                   | HC-02 · HC-03 · HC-05 | JLC. + nav links with word-flip hover. |
| `components/navigation/ChapterIndex.tsx`             | chapter-architecture.mdc | Slide-in panel. |
| `components/navigation/ScrollAffordance.tsx`         | HC-04 · HC-06      | Vertical hairline + animated descending fill. |
| `components/interaction/CustomCursor.tsx`            | HC-01 · HC-04 · HC-05 | 8px dot + 32–80px outline, mix-blend-difference. |
| `components/interaction/CursorProvider.tsx`          | interaction-system.mdc | data-cursor attribute delegation. |
| `components/interaction/EditorialLink.tsx`           | HC-02 · HC-04      | Word-flip on hover (translate-y-full). |
| `components/interaction/CtaButton.tsx`               | HC-01              | Action button with arrow icon, backdrop-blur ban applied. |
| `components/interaction/HoverImage.tsx`              | image-treatment-system.mdc | Brightness shift + optional GLSL displacement. |
| `components/primitives/Type.tsx`                     | typography-system.mdc | Single primitive for all text. |
| `components/primitives/DisplayTitle.tsx`             | HC-01 · HC-02 · HC-03 · HC-04 · HC-05 | Mask-reveal pattern. |
| `components/primitives/Eyebrow.tsx`                  | HC-02 · HC-04 · HC-05 · HC-06 | All-caps tracked label. |
| `components/primitives/EditorialBlock.tsx`           | HC-05              | Eyebrow + display + lede + body. |
| `components/primitives/Caption.tsx`                  | image-treatment-system.mdc | author · year · place. |
| `components/primitives/SceneShell.tsx`               | narrative-density-system.mdc | Tier + energy enforcement. |
| `components/media/EditorialImage.tsx`                | image-treatment-system.mdc | Grain + vignette + grade composition. |
| `components/media/RevealImage.tsx`                   | HC-04              | Mask reveal with clip-path. |
| `components/media/HeroImage.tsx`                     | HC-03 · HC-06      | Full-bleed with blur+scale entry. |
| `components/media/CaseSlideImage.tsx`                | HC-06              | Image inside horizontal panel + tint overlay. |
| `components/media/EditorialAsideImage.tsx`           | HC-03              | Right-side full-bleed with gradient mask. |
| `components/media/CircularTextRing.tsx`              | HC-06              | Cannes-style rotating SVG textPath. |
| `components/chapters/HeroChapter/`                   | HC-01 · HC-02 · HC-03 | Variant scenes: TripleTitle / Editorial. |
| `components/chapters/EditorialChapter/`              | HC-01              | Philosophy scrub reveal. |
| `components/chapters/HumanChapter/`                  | HC-05              | Pillars + premise + mandate + residue. |
| `components/chapters/CulturalChapter/`               | HC-04              | Pinned narrative ladder. |
| `components/chapters/CaseChapter/`                   | HC-06              | Hero + intro + horizontal panels + creators. |
| `components/chapters/ClosingChapter/`                | HC-05 (residue scene) | Outro + footer attribution. |
| `lib/motion/eases.ts`                                | motion-system.mdc  | EASE dictionary. |
| `lib/motion/durations.ts`                            | motion-system.mdc  | DUR dictionary. |
| `lib/motion/stagger.ts`                              | motion-system.mdc  | STAGGER dictionary. |
| `lib/motion/charReveal.ts`                           | HC-02 · HC-03 · HC-04 | Char-stagger title reveal helper. |
| `lib/motion/counterCount.ts`                         | HC-01 · HC-02 · HC-03 | Counter 0 → 100 helper. |
| `lib/motion/pinnedLadder.ts`                         | HC-04              | Pinned narrative ladder choreography. |
| `lib/motion/reveal.ts`                               | motion-system.mdc  | revealText, revealBlock, revealImage. |
| `lib/scroll/lenis.ts`                                | scroll-system.mdc  | Lenis singleton. |
| `lib/scroll/horizontalSection.ts`                    | HC-01 · HC-06      | Pinned horizontal pattern. |
| `lib/scroll/velocity.ts`                             | scroll-system.mdc  | Velocity reactor. |
| `lib/transitions/heroIntro.ts`                       | HC-01 · HC-02 · HC-03 | Hero intro choreography. |
| `lib/transitions/dissolve.ts`                        | transition-system.mdc | Cinematic dissolve helper. |
| `lib/transitions/chapterCross.ts`                    | transition-system.mdc | T2 chapter seam helper. |
| `lib/webgl/tunnel.ts`                                | webgl-system.mdc   | drei View / tunnel-rat. |
| `lib/webgl/materials/simplexFog.ts`                  | HC-04              | Simplex noise atmospheric shader. |
| `lib/webgl/materials/dust.ts`                        | webgl-system.mdc   | Dust drift shader. |
| `lib/webgl/materials/displacement.ts`                | webgl-system.mdc   | Image displacement shader. |
| `lib/atmosphere/composeAtmosphere.ts`                | atmosphere-system.mdc | Per-chapter atmosphere composition. |
| `lib/chapters/registry.ts`                           | chapter-architecture.mdc | Chapter ID → metadata. |
| `lib/chapters/sequencing.ts`                         | chapter-architecture.mdc | No-two-same-type-adjacent validator. |
| `lib/density/tiers.ts`                               | narrative-density-system.mdc | TIER enum + envelope spec. |
| `lib/density/profiles.ts`                            | narrative-density-system.mdc | Chapter type → tier profile. |
| `lib/density/lintPage.ts`                            | narrative-density-system.mdc | Page composition validator. |
| `lib/irregularity/jitter.ts`                         | human-irregularity-system.mdc | jitter, pick, asymmetricJitter. |
| `lib/irregularity/humanEase.ts`                      | human-irregularity-system.mdc | Two-segment ease with sub-amplitude wobble. |
| `lib/irregularity/sceneAtmosphere.ts`                | human-irregularity-system.mdc | Per-scene atmosphere derivation. |
| `lib/interaction/useCursor.ts`                       | interaction-system.mdc | Cursor state declaration. |
| `lib/interaction/useMagnetic.ts`                     | HC-04 · HC-05 + interaction-system.mdc | Magnetic with EASE.cinematic return (no elastic). |
| `lib/interaction/usePointerRadialBg.ts`              | HC-05              | --mouse-x / --mouse-y CSS var driver. |
| `lib/interaction/useHoverIntent.ts`                  | interaction-system.mdc | Debounced hover entry. |
| `lib/sound/AudioDirector.ts`                         | sound-behavior-system.mdc | Singleton AudioContext owner. |

---

## 9. Data Flow Patterns

### 9.1 Scroll-driven atmosphere reaction
```
Lenis.scroll event
   │
   ├─► gsap.ticker (via bridge)
   │     └─► useScrollVelocity hook → clamped + damped value
   │           └─► AudioDirector.modulateAmbience(velocity)  // ±2 dB @ 80 Hz
   │           └─► useChapterAtmosphere → light leak intensity reactor
   │           └─► WebGL uScrollVelocity uniform (per chapter shader)
   │
   └─► ScrollTrigger.update (via bridge)
         └─► chapter scene reveals
         └─► pinned section progress
```

### 9.2 Chapter transition data flow
```
User scroll crosses chapter seam
   │
   ├─► <ChapterSeam> ScrollTrigger fires
   │     └─► TransitionDirector.play("chapter:cross", { from, to })
   │           ├─► AudioDirector.fadeAmbience(from → to, lag = 200ms)
   │           ├─► AudioDirector.playTransitionResonance(toAudio)
   │           ├─► CursorProvider.dimDuringTransition()
   │           ├─► Outgoing atmosphere blur(40px) + opacity fade
   │           ├─► Incoming atmosphere blur(soft → 0) + opacity fade-in
   │           └─► onComplete → director state = idle
```

### 9.3 Variance application pipeline
```
Mount or re-roll request
   │
   └─► IrregularityProvider.seed
         └─► jitter(base, percent) called inside motion config
               └─► GSAP timeline receives jittered duration / stagger / yPercent
               └─► Atmospheric uniform receives ±10% variance
               └─► Scene shell derives scene-local atmosphere from chapter atmosphere
```

---

## 10. Build / Runtime Boundaries

### Server (RSC by default)
- Page composition (`app/<route>/page.tsx`).
- Chapter shell layout markup.
- Eyebrow / metadata rendering.
- MDX content rendering (chapters' editorial copy).
- Static text and image markup.

### Client boundaries (`"use client"`)
- All `Provider` components (`LenisProvider`, `CursorProvider`, etc.).
- All animation-bearing components (anything using GSAP / Framer Motion).
- `<WebGLRoot>` and all `<sceneTunnel.In>` consumers.
- `<CustomCursor>`, `<MetaNav>` (clock).
- `<ChapterSeam>` (ScrollTrigger).

### Streaming
- Use Next.js 16 streaming for chapter shells; below-fold chapters stream after first paint.
- Verify against `node_modules/next/dist/docs/` for Next 16 specifics — API may differ from training data.

---

## 11. Performance Budgets (Recap)

Per `performance-system.mdc`. Surfaced here for arch decisions.

| Asset                             | Budget          |
|-----------------------------------|-----------------|
| First-load JS (gzip)              | ≤ 180 KB        |
| Per-chapter additional JS         | ≤ 60 KB gzip    |
| Per-chapter shader + textures     | ≤ 80 KB         |
| Per-chapter ambience audio        | ≤ 200 KB        |
| Total page weight (no cache)      | ≤ 1.4 MB        |
| Per-frame render budget           | ≤ 16.6 ms total |
| WebGL render share                | ≤ 4 ms          |
| Active particles (WebGL)          | ≤ 1500          |
| Scene tris (active chapter)       | ≤ 20k           |

CI gates: Lighthouse Perf ≥ 90, A11y ≥ 95, INP ≤ 200ms p75.

---

## 12. Failure Modes & Fallbacks

| Failure                              | Fallback                                          |
|--------------------------------------|---------------------------------------------------|
| WebGL not supported                  | Canvas does not mount; CSS atmosphere alone (vignette + grain + glow orbs via CSS). |
| `prefers-reduced-motion: reduce`     | Lenis destroyed; opacity-only reveals; cursor lerp disabled; magnetic disabled; WebGL uniforms frozen at midpoint. |
| FPS < 45 sustained                   | DPR drops to 1.0; secondary WebGL scenes disabled; magnetic disabled. |
| FPS < 30 sustained                   | Canvas unmounts entirely. CSS atmosphere holds. |
| Audio autoplay blocked               | AudioContext init only on user gesture (toggle click). |
| `navigator.connection.saveData`      | Audio disabled; toggle hidden; image quality reduced via `next/image` `quality` prop. |
| Image AVIF unsupported               | `next/image` falls back to WebP, then JPG. |
| Lenis fails to init                  | Native scroll preserved; ScrollTrigger uses native scroll source. |
| MDX content fetch fails              | Editorial chapter shows skeleton atmosphere with eyebrow only; no body text. |

---

## 13. Testing & Verification Strategy

### Unit
- Variance utilities (`jitter`, `pick`, seeded reproducibility).
- Density linter (`lintPage` against valid + invalid compositions).
- Atmosphere derivation (`deriveSceneAtmosphere` envelope assertions).

### Component
- `<SceneShell>` enforces tier constraints in dev mode.
- `<EditorialImage>` renders grain + vignette + grade layers when props enabled.
- `<CustomCursor>` adapts state on `data-cursor` attribute change.

### Visual regression
- Per-chapter visual snapshots at 1440px, 1024px, 768px, 360px.
- Per-chapter motion snapshots (record 3s screencapture, compare via SSIM threshold).

### End-to-end
- Hero intro plays once per session, skipped on revisit.
- Scroll from start to end without dropped frames at 1440px.
- All `prefers-reduced-motion` paths verified.
- Audio toggle persists across navigation.

---

## 14. Source-of-Truth Map

When something contradicts, this is the **resolution priority**:

```
1.  DESIGN_DNA.md                    ← can never lose
2.  cinematic-language.mdc           ← only loses to DNA
3.  narrative-density-system.mdc
4.  human-irregularity-system.mdc
5.  HTML_CANON.md                    ← visual contract
6.  atmosphere / motion / typography / color / interaction / transition / scroll / webgl / chapter / image / sound .mdc files
7.  performance-system.mdc + responsive-system.mdc  ← bound the implementation
8.  project-structure.mdc            ← codifies the file system
9.  SYSTEM_ARCHITECTURE.md (this file) ← codifies the runtime
10. DEVELOPMENT_GUIDELINES.md        ← codifies the workflow
11. CHAT_CONTINUITY_WORKFLOW.md      ← codifies the operational session
12. CURRENT_TASK_TEMPLATE.md         ← codifies the per-session task contract
13. SESSION_CHANGELOG_GENERATOR.md   ← codifies the per-session memory write
14. DOCS_GENERATOR_PROMPT.md         ← codifies how new governance docs are produced
```

If 1–4 conflict with 5 (HTML canon), the **canon corrections in `HTML_CANON.md §5.5 / §7.5`** apply — DNA wins by reshaping canon's edges, not by discarding the canon.

If 11–14 conflict with 1–10, **11–14 lose**. The continuity layer governs *how we work*; it cannot override *what we build*.

---

## 15. Continuity Layer Architecture

The runtime architecture (§1–§14) describes **how the codebase executes**. This section describes **how operational sessions execute** — the meta-runtime that produces the codebase.

### 15.1 Layer model

```
┌──────────────────────────────────────────────────────────────────────┐
│                  OPERATIONAL GOVERNANCE LAYER                         │
│                  (CHAT_CONTINUITY_WORKFLOW.md governs)                │
│                                                                       │
│  Operational prompts        ── how operators interact with memory     │
│  ├─ CURRENT_TASK_TEMPLATE.md      (per-session task contract)         │
│  ├─ SESSION_CHANGELOG_GENERATOR.md (per-session memory write)         │
│  └─ DOCS_GENERATOR_PROMPT.md      (governance doc production)         │
└──────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────────┐
│                    OPERATIONAL MEMORY LAYER                           │
│                                                                       │
│  Permanent governance       ── /docs/*.md  (this file lives here)     │
│  Session deltas             ── /docs/changelogs/*.md                  │
│  Always-on rules            ── .rules/*.mdc (Cursor-loaded)           │
└──────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────────┐
│                       RUNTIME ARCHITECTURE                            │
│                       (§1–§13 above)                                  │
│                                                                       │
│  app/ + components/ + lib/ + hooks/ + content/ + shaders/ + styles/   │
└──────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
                          PRODUCTION ARTIFACT
                          (the cinematic site)
```

### 15.2 Prompt-to-memory binding

Each operational prompt **writes to** or **reads from** specific memory locations.

| Prompt                              | Reads                                    | Writes                                                |
|-------------------------------------|------------------------------------------|-------------------------------------------------------|
| `CURRENT_TASK_TEMPLATE.md`          | `MASTER_STATE.md`, `DESIGN_DNA.md`, optional `/docs/*.md` | nothing (instantiated per chat, not committed)        |
| `SESSION_CHANGELOG_GENERATOR.md`    | session work artifacts (PR diffs, decisions) | `docs/changelogs/YYYY-MM-DD-<id>.md` + `docs/changelogs/INDEX.md` |
| `DOCS_GENERATOR_PROMPT.md`          | existing `/docs/*.md` (for voice / structure consistency) | new `/docs/*.md` files (committed)                |

### 15.3 Chat recovery hierarchy

When a session begins after a break of any length:

```
seconds since last session ──► action
─────────────────────────────────────────────────────────────────────
< 1 hour     ──► continue with same continuity mode; no rehydration
< 1 day      ──► re-load CURRENT_TASK + last 1 changelog
< 1 week     ──► re-load MASTER_STATE + last 3 changelogs
< 1 month    ──► full LIGHTWEIGHT or ARCHITECTURE flow per workflow
> 1 month    ──► recovery sequence per CHAT_CONTINUITY_WORKFLOW.md §9
```

Recovery is **bounded** — at most 15 minutes regardless of inactivity duration. Beyond 15 minutes the operator is **flooding context**; they should start working and reference docs on demand.

### 15.4 Continuity layer constraints

- The continuity layer is **prescriptive** — it defines required workflow.
- The continuity layer is **non-prescriptive** about content — it never tells you *what* to build, only *how* to record what you built.
- The continuity layer **cannot override** runtime architecture — a workflow change cannot relax a `.rules/` constraint.
- The continuity layer **is auditable** — `CHAT_CONTINUITY_WORKFLOW.md §11` defines the monthly audit.

### 15.5 Operator vs agent distinction

| Role        | Reads continuity layer? | Writes continuity layer? |
|-------------|--------------------------|--------------------------|
| Operator (human, project owner) | yes (initial setup; periodic audit) | yes (`MASTER_STATE.md` decisions; PR-based updates to prompts) |
| Main agent (Cursor / Claude / etc.) | yes (every session start) | yes (changelogs, `MASTER_STATE.md §3` updates per closing protocol) |
| Subagent (specialized helper)   | **no** (receives only the slice needed) | **no** (returns artifacts; main agent decides what to commit) |

The hard rule: **only the main agent writes to the continuity layer**. Subagents propose, main agent disposes (per `CHAT_CONTINUITY_WORKFLOW.md §10`).

### 15.6 Failure modes & mitigations

| Failure                                              | Mitigation                                          |
|------------------------------------------------------|-----------------------------------------------------|
| Session ends without changelog when architecture changed | Next session's first action is reconstruction (per `DEVELOPMENT_GUIDELINES.md §12.5.5`) |
| `MASTER_STATE.md §3` drifts from reality             | Monthly continuity audit detects + recalibrates    |
| Two `/docs/*.md` files contradict                    | Resolution priority §14 + audit                     |
| Operational prompt edited inline mid-session         | PR review rejects (per `DEVELOPMENT_GUIDELINES.md §12.5.4`) |
| Context flooding > 30k tokens                        | Re-evaluate continuity mode; load less              |
| Subagent commits to continuity layer                 | Process violation; revert + log in changelog        |

---

## 16. Source-of-Truth Map (Continuity Layer)

For continuity-layer decisions specifically, this is the resolution order:

```
1. CHAT_CONTINUITY_WORKFLOW.md       ← protocol authority
2. CURRENT_TASK_TEMPLATE.md           ← task contract authority
3. SESSION_CHANGELOG_GENERATOR.md    ← memory-write authority
4. DOCS_GENERATOR_PROMPT.md          ← doc-production authority
5. DEVELOPMENT_GUIDELINES.md §12.5   ← operational discipline reference
6. MASTER_STATE.md §11               ← memory architecture reference
```

The continuity layer is **internally consistent by design** — these 6 documents reference each other, never contradict. If they appear to contradict, the lower-numbered file wins, and a doc-quality bug must be filed.
