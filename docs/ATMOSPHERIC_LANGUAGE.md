# ATMOSPHERIC_LANGUAGE — STRATEGICLAND

> The atmospheric vocabulary derived from the HTML canon, normalized against `.rules/atmosphere-system.mdc`, `color-system.mdc`, `webgl-system.mdc`, `human-irregularity-system.mdc`, and `chapter-architecture.mdc`.
> This document tells you **how the air in the room is composed** — grain, light, color tint, blur, breathing, vignette.
> If the audience can name an atmospheric element ("oh, that's a Three.js shader"), atmosphere has failed.

---

## 1. Atmosphere Premise

Atmosphere is the **air** of the page. It is what makes a viewport feel **inhabited** rather than **rendered**. Atmosphere is the difference between a screen and a room.

The audience must always feel atmosphere; they must never **see** it. When atmosphere announces itself, it has become decoration, and decoration is forbidden.

---

## 2. Atmospheric Stack (Layered Composition)

Every chapter composes its atmosphere from these layers, in z-index order from back to front. **Layers below content** (z 0–9), **content layer** (z 10–89), **layers above content** (z 90–99).

| Layer                        | z-index   | Always on?       | Source canon                          |
|------------------------------|-----------|------------------|---------------------------------------|
| Background color (chapter)   | 0         | yes              | All canon                             |
| WebGL canvas root            | 0–1       | per chapter      | HC-04 (simplex fog)                   |
| Glow orbs                    | 2–3       | per chapter      | HC-02, HC-03, HC-05                   |
| Atmospheric tint overlay     | 4         | per chapter      | atmosphere-system.mdc                 |
| Vignette                     | 90        | dark scenes only | HC-01, HC-02, HC-03, HC-04            |
| Scrim (nav legibility)       | 91–92     | conditional      | atmosphere-system.mdc                 |
| Architectural frame          | 100       | site-wide        | HC-01                                 |
| Grain                        | 101 (top) | always           | HC-02, HC-03, HC-04, HC-05, HC-06     |

The **single most important rule**: grain is **always on top**. It is the last thing the photons pass through before reaching the eye.

---

## 3. The Background Layer

### 3.1 Color tokens (per `color-system.mdc`)
- **Warm black** `#0A0907` (default dark) — used by HC-01, HC-02 (`brand.dark #020204`), HC-04 (`#050508`).
- **Cool black** `#0B0D10` — for `human` chapters with cooler tonality.
- **Cream paper** `#F2EEE5` — light editorial chapters.
- **Cream warmer** `#EDE6D8` — editorial body chapters.
- **Charcoal** `#161310` — elevated surface (rare).

### 3.2 Canon reconciliation
The HTML canon uses **multiple variants** of warm black:
- HC-01: `--bg-deep: #050508`, `--bg-mid: #0c0b12`.
- HC-02: `brand.dark #020204`.
- HC-03: `base #020204`.
- HC-04: `dark #050508`.
- HC-05: `dark #050508`, `darker #020203`.
- HC-06: `#0f0f11` (case study, slightly lighter).

**Production unification:** all "warm black" instances resolve to `#0A0907`. Case study chapters may use `#0f0f11` as a deliberate "concrete" tone (matches HC-06's urban subject). Per-chapter overrides allowed only via `atmosphere.config.ts`, never inline.

### 3.3 Forbidden background patterns
- ❌ Pure `#000000` or pure `#FFFFFF`.
- ❌ Multi-color decorative gradients (linear, conic, mesh).
- ❌ Animated hue shifts.
- ❌ Repeating patterns (stripes, dots, grids) as background.

---

## 4. The Grain Layer

### 4.1 Source
Per `atmosphere-system.mdc §2.1`: **pre-baked texture**, not CSS turbulence.

The HTML canon uses CSS SVG `feTurbulence` for grain (HC-02 `baseFrequency='0.75'`, HC-03 `0.8`, HC-04 `0.8`, HC-05 `0.85`, HC-06 `0.8`). Production replaces these with:

- `public/textures/grain-512.png` — 512×512 tileable, 8-bit grayscale, organic film grain.
- `public/textures/grain-1024.png` — for hero / full-bleed scenes.

### 4.2 Implementation
```css
.atmosphere-grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 101;
  background-image: url("/textures/grain-512.png");
  background-size: 256px 256px;
  background-repeat: repeat;
  mix-blend-mode: overlay;
  opacity: var(--grain-opacity, 0.06);
}
```

### 4.3 Opacity by context (per chapter atmosphere config)
| Context                         | Opacity     |
|---------------------------------|-------------|
| Light scenes (cream)            | 0.04–0.06   |
| Dark scenes (warm-black)        | 0.08–0.12   |
| Hero / chapter establishing     | 0.10–0.14   |
| Image overlays                  | 0.05–0.08   |
| Reduced-motion mode             | 0.04 (static, no animation) |

### 4.4 Motion (canon-derived, normalized)
- HC-04 / HC-05 use a `noise` keyframe animation (0.2s steps shifting -2% / +2%). **Production replaces** this rapid jitter with the slower `breath` drift per `atmosphere-system.mdc §2.4`:
  ```ts
  gsap.to(grainRef.current, {
    x: jitter(8, 0.5),
    y: jitter(8, 0.5),
    duration: jitter(8, 0.12),
    ease: EASE.gsap.breath,
    yoyo: true,
    repeat: -1,
  });
  ```
- HC-03 keyframe (8s, 10 steps) is closer to the production target — keep it as inspiration.

### 4.5 Per-chapter grain variance (per `human-irregularity-system.mdc`)
Each scene re-rolls grain opacity within `±10%` of the chapter's declared value. Each chapter randomizes grain drift direction at session start.

---

## 5. The Vignette Layer

### 5.1 Default (dark scenes)
```css
.atmosphere-vignette {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 90;
  background: radial-gradient(
    ellipse at center,
    transparent 55%,
    rgba(0, 0, 0, 0.35) 100%
  );
  box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.9);
}
```

### 5.2 Canon comparison
- HC-01: `radial-gradient(circle at 50% 50%, transparent 40%, rgba(5,5,8,0.8) 100%)` + `box-shadow: inset 0 0 100px rgba(0,0,0,0.9)`.
- HC-02 / HC-03: similar radial pattern, no inset shadow.
- HC-04: `box-shadow: inset 0 0 150px rgba(0,0,0,0.9)` (heavier).
- HC-06: `box-shadow: inset 0 0 200px rgba(0,0,0,0.9)` (heaviest, on case study panel only).

**Production unification:** vignette intensity is **per-chapter declared** in `atmosphere.config.ts`:
```ts
vignette: { intensity: 0.32, origin: "center", innerRadius: 55 }
```

### 5.3 Light scene vignette
Light scenes (cream backgrounds) use a **subtle warm vignette**:
```css
background: radial-gradient(
  ellipse at center,
  transparent 60%,
  rgba(60, 45, 30, 0.08) 100%
);
```
Intensity ~`0.08` max. The corners darken faintly with warmth, never with shadow.

### 5.4 Motion
- Default: static.
- Per `human-irregularity-system.mdc §7.3`: per-chapter, may breathe (`pulse` instability behavior) at `jitter(14, 0.15)`s cycle, ±2% intensity.

### 5.5 Asymmetry (canon-derived)
Per `human-irregularity-system.mdc §7.2`: each dark chapter declares **one corner of crushed shadow** where vignette intensity reaches `0.45` instead of `0.32`. Implementation:
```ts
vignette: {
  intensity: 0.32,
  origin: "center",
  crushedCorner: "lower-left",   // direction-locked per chapter
  crushedIntensity: 0.45,
}
```

---

## 6. The Glow Orb Layer

### 6.1 Source canon
- HC-02: `#atmos-glow` — single ellipse, `90vw × 90vh`, `blur(100px)`, amber gradient, `mix-blend-screen`.
- HC-03: `#glow-1` (amber) + `#glow-2` (accentDark) — opposing sine.inOut yoyo, 8s + 10s.
- HC-05: hero (amber + terra parallax) + quote section (centered amber).

### 6.2 Production specification
```tsx
// components/atmosphere/GlowOrbs.tsx
type GlowOrbProps = {
  color: ColorToken;          // accent.amber, accent.terra, accent.copper
  origin: { x: string; y: string };
  size: { w: string; h: string };  // viewport units
  blur: string;               // blur(80px) – blur(180px)
  opacityPeak: number;        // 0.04 – 0.40
  driftPeriodSec: number;     // 7–11
  driftRange: { x: string; y: string };  // vw / vh
};
```

### 6.3 Constraints
- Maximum **2 glow orbs visible per scene**.
- If 2 orbs: their drift periods must differ by `≥ 1.5s` (avoid synchrony).
- Their blur values must differ (visual depth separation).
- `mix-blend-mode: screen` on dark backgrounds; `mix-blend-mode: multiply` on light.
- All breathing via `EASE.breath` (sine.inOut).

### 6.4 Motion
```ts
gsap.to(orbRef.current, {
  x: jitter(driftRange.x, 0.3),
  y: jitter(driftRange.y, 0.3),
  duration: jitter(driftPeriodSec, 0.12),
  ease: EASE.gsap.breath,
  yoyo: true,
  repeat: -1,
});
```

### 6.5 Reveal (loader phase)
```ts
gsap.to(orbsRef.current, {
  opacity: 0.35,
  duration: 2.5,
  ease: EASE.gsap.editorial,
  stagger: 0.5,
});
```

---

## 7. The Atmospheric Tint Overlay

### 7.1 Purpose
A fullscreen `mix-blend-mode` overlay that **grades** the chapter — like a colorist's LUT. Sits below content, above background.

### 7.2 Specification
```ts
// per atmosphere.config.ts
tint: {
  color: "tint.warmFog",        // from color-system.mdc
  opacity: 0.06,                 // 3–8% range
  blendMode: "multiply",        // dark scenes
  // OR
  blendMode: "overlay",         // light scenes
}
```

### 7.3 Tokens (per `color-system.mdc`)
| Token              | Hex        | Use                                            |
|--------------------|------------|------------------------------------------------|
| `tint.warmFog`     | `#3A2D1E`  | Hero / drift / cultural                       |
| `tint.coolFog`     | `#1F2B30`  | Human / editorial                             |
| `tint.amberDust`   | `#5A3F1A`  | Cultural climactic / case study warm          |
| `tint.coolPaper`   | `#1F252A`  | Cool grade for light backgrounds              |

### 7.4 Cross-chapter interpolation
During chapter seam transitions (`<ChapterSeam>`), the tint **interpolates** from outgoing to incoming over `DUR.epic`:
```ts
gsap.to(tintLayerRef.current, {
  backgroundColor: incomingTint,
  opacity: incomingOpacity,
  duration: DUR.epic,
  ease: EASE.gsap.editorial,
});
```

---

## 8. The WebGL Atmospheric Layer

### 8.1 Source canon
HC-04 ships the canonical WebGL atmosphere — full-screen plane with simplex noise shader, color mix between `#050508` and `#0F1220`, `uTime` driven by `delta * 0.2 + |scrollVelocity| * 0.05`, `opacity: 0.6`.

### 8.2 Production architecture
- **Single root canvas** (per `webgl-system.mdc §4`).
- **Per-chapter atmospheric scene** tunneled in (`<sceneTunnel.In>`).
- **Frequency profile** declared per chapter (per `webgl-system.mdc §7`):
  ```ts
  webgl: {
    scene: "simplex-fog",
    frequency: { speed: 0.012, amplitude: 0.04, palette: "warm-fog" },
  }
  ```

### 8.3 Shader anatomy (canonical, derived from HC-04)
```glsl
precision highp float;
uniform float uTime;
uniform float uScrollVelocity;
uniform float uIntensity;        // 0.2..1.0 from tier
uniform float uInstability;      // 0..0.03 from human-irregularity
uniform vec2  uResolution;
uniform vec3  uTone;             // chapter palette
varying vec2 vUv;

float fbm(vec2 p);               // 4 octaves max

void main() {
  vec2 uv = vUv;
  vec2 driftUv = uv + vec2(uTime * 0.012 + uInstability * 0.04, uTime * 0.006);
  float density = fbm(driftUv * 1.4);
  density += sin(uTime * 0.3) * 0.04;          // breath
  density += uScrollVelocity * 0.08;           // velocity reactor
  // grain sample
  vec3 color = mix(uTone * 0.6, uTone * 1.05, density);
  gl_FragColor = vec4(color, 0.4 * uIntensity);
}
```

### 8.4 Performance contract
- Render at **30 FPS** (drive `uTime` via `gsap.ticker` at half rate).
- Disable on `< md` breakpoint by default.
- Auto-pause during sustained TIER 01 stretches (per `narrative-density-system.mdc`).

### 8.5 Forbidden WebGL atmosphere
- ❌ Postprocessing stacks (Bloom, DOF, SSAO).
- ❌ Real-time PBR.
- ❌ Hero 3D objects.
- ❌ Particle followers.
- ❌ Any shader that competes with content for attention.

---

## 9. The Light Leak Layer

### 9.1 Specification (per `atmosphere-system.mdc §5`)
A radial bloom positioned off-axis, suggesting an out-of-frame light source.

```css
.atmosphere-light-leak {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 4;
  background: radial-gradient(
    circle at 20% 30%,
    rgba(200, 146, 60, 0.10) 0%,
    transparent 60%
  );
  mix-blend-mode: screen;
}
```

### 9.2 Per-chapter declaration
```ts
lightLeak: {
  intensity: 0.06,                       // 0.04 – 0.10
  origin: "upper-left",                  // direction-locked per chapter
  warmth: "warm",                        // warm | cool
}
```

### 9.3 Direction consistency
A chapter declares its light source direction **once** and all light leaks within respect it. If hero leak comes from upper-left, vignette crush corner is lower-right. The audience reads this as **a coherent room**.

### 9.4 Motion
- Breathing per `EASE.breath`, ≥6s cycle, ≤8% opacity peak (per `atmosphere-system.mdc §5.3`).
- Per `human-irregularity-system.mdc §6.2`: secondary delay layer behind scroll-velocity reactions.

---

## 10. The Scrim Layer

For nav / footer legibility on imagery.

```css
.atmosphere-scrim-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 30vh;
  z-index: 91;
  pointer-events: none;
  background: linear-gradient(to bottom, var(--bg-warm-black) 0%, transparent 100%);
  opacity: 0.6;
}
```

Used **only** when nav sits over imagery. Disable when nav sits over solid background.

---

## 11. The Architectural Frame Layer (HC-01 derived)

```css
.architectural-frame {
  position: fixed;
  top: 2vw;
  right: 2vw;
  bottom: 2vw;
  left: 2vw;
  z-index: 100;
  pointer-events: none;
  border: 1px solid rgba(255, 255, 255, 0.03);  /* dark scenes */
  border-radius: 4px;
}
```

For light scenes:
```css
border: 1px solid rgba(15, 14, 12, 0.05);
```

### Constraints
- Hidden on mobile (per HC-01 media query).
- Opacity 0.03 — barely visible, suggests editorial framing without insisting on it.
- 1px hairline only, never 2px+ (would read as UI chrome).

---

## 12. Per-Chapter Atmosphere Profiles

Each canonical chapter type ships a default atmosphere. Chapters may override individual values within the variance envelope.

### 12.1 `hero` atmosphere
```ts
{
  background: "color.bg.warmBlack",
  text: "color.text.cream",
  grain: { texture: "1024", opacity: 0.10 },
  vignette: { intensity: 0.32, origin: "center" },
  lightLeak: { intensity: 0.06, origin: "upper-left", warmth: "warm" },
  glowOrbs: [
    { color: "accent.amber",    size: { w: "60vw", h: "60vw" }, blur: "120px", opacityPeak: 0.10, driftPeriodSec: 8 },
    { color: "accent.terra",    size: { w: "50vw", h: "30vw" }, blur: "180px", opacityPeak: 0.05, driftPeriodSec: 10 },
  ],
  tint: { color: "tint.warmFog", opacity: 0.06, blendMode: "multiply" },
  webgl: { scene: "simplex-fog", frequency: { speed: 0.012, amplitude: 0.04, palette: "warm-fog" } },
  instability: "drift",
}
```

### 12.2 `editorial` atmosphere
```ts
{
  background: "color.bg.paper",
  text: "color.text.primary",
  grain: { texture: "512", opacity: 0.05 },
  vignette: { intensity: 0.08, origin: "center" },         // light scene = subtle warm
  lightLeak: null,
  glowOrbs: [],
  tint: { color: "tint.coolPaper", opacity: 0.04, blendMode: "overlay" },
  webgl: null,
  instability: "pulse",
}
```

### 12.3 `case` atmosphere (Absolut Street Trees)
```ts
{
  background: "color.bg.charcoal",                          // case-specific (concrete tone)
  text: "color.text.cream",
  grain: { texture: "1024", opacity: 0.08 },
  vignette: { intensity: 0.30, origin: "center" },
  lightLeak: { intensity: 0.04, origin: "upper-right", warmth: "warm" },
  glowOrbs: [
    { color: "accent.copper", size: { w: "800px", h: "800px" }, blur: "200px", opacityPeak: 0.10, driftPeriodSec: 9 },
  ],
  tint: { color: "tint.amberDust", opacity: 0.05, blendMode: "multiply" },
  webgl: null,                                              // case studies typically rely on imagery
  instability: "drift",
}
```

### 12.4 `human` atmosphere (Human Layer)
```ts
{
  background: "color.bg.coolBlack",                          // cool variant for human chapter
  text: "color.text.cream",
  grain: { texture: "1024", opacity: 0.10 },
  vignette: { intensity: 0.28, origin: "center" },
  lightLeak: null,                                           // pure stillness
  glowOrbs: [
    { color: "accent.amber", size: { w: "60vw", h: "60vw" }, blur: "150px", opacityPeak: 0.10, driftPeriodSec: 11 },
    { color: "accent.copper", size: { w: "80vw", h: "40vw" }, blur: "180px", opacityPeak: 0.05, driftPeriodSec: 13 },
  ],
  tint: { color: "tint.coolFog", opacity: 0.04, blendMode: "multiply" },
  webgl: null,                                               // CSS atmosphere only
  instability: "pulse",
}
```

### 12.5 `cultural` atmosphere (Impacto Cultural)
```ts
{
  background: "color.bg.warmBlack",
  text: "color.text.cream",
  grain: { texture: "1024", opacity: 0.10 },
  vignette: { intensity: 0.35, origin: "center", crushedCorner: "lower-left", crushedIntensity: 0.45 },
  lightLeak: { intensity: 0.08, origin: "upper-left", warmth: "warm" },
  glowOrbs: [],                                              // WebGL carries the atmospheric weight
  tint: { color: "tint.amberDust", opacity: 0.06, blendMode: "multiply" },
  webgl: { scene: "simplex-fog", frequency: { speed: 0.020, amplitude: 0.08, palette: "amber-dust" } },
  instability: "flicker",                                    // single light leak fade per ~45s
}
```

### 12.6 `closing` atmosphere
```ts
{
  background: "color.bg.warmBlack",
  text: "color.text.cream",
  grain: { texture: "512", opacity: 0.08 },
  vignette: { intensity: 0.40, origin: "center" },          // crushes inward as page ends
  lightLeak: { intensity: 0.03, origin: "upper-left", warmth: "warm" },  // fading
  glowOrbs: [],
  tint: { color: "tint.warmFog", opacity: 0.04, blendMode: "multiply" },
  webgl: null,                                               // silence
  instability: "drift",
}
```

---

## 13. Atmosphere Composition Order (Implementation)

The `<ChapterAtmosphere>` component composes layers in this order:

```tsx
<ChapterAtmosphere>
  {/* z=0 background color (CSS body) */}
  {atmosphere.webgl && <SceneTunnel><WebGLScene {...atmosphere.webgl} /></SceneTunnel>}
  {atmosphere.glowOrbs.map(orb => <GlowOrb key={orb.id} {...orb} />)}
  {atmosphere.tint && <TintLayer {...atmosphere.tint} />}
  {atmosphere.vignette && <Vignette {...atmosphere.vignette} />}
  {atmosphere.lightLeak && <LightLeak {...atmosphere.lightLeak} />}
  {atmosphere.scrim && <Scrim {...atmosphere.scrim} />}
  <ArchitecturalFrame />
  <Grain texture={atmosphere.grain.texture} opacity={atmosphere.grain.opacity} />
</ChapterAtmosphere>
```

---

## 14. Per-Scene Atmosphere Variance

Per `human-irregularity-system.mdc §8`: each scene re-rolls atmosphere parameters within the chapter's envelope. Implementation:

```ts
// lib/irregularity/sceneAtmosphere.ts
export function deriveSceneAtmosphere(chapter: ChapterAtmosphere, sceneIndex: number) {
  return {
    ...chapter,
    grain: { ...chapter.grain, opacity: jitter(chapter.grain.opacity, 0.10) },
    vignette: { ...chapter.vignette, intensity: jitter(chapter.vignette.intensity, 0.12) },
    lightLeak: chapter.lightLeak && {
      ...chapter.lightLeak,
      intensity: jitter(chapter.lightLeak.intensity, 0.15),
    },
    glowOrbs: chapter.glowOrbs.map(o => ({
      ...o,
      opacityPeak: jitter(o.opacityPeak, 0.12),
      driftPeriodSec: jitter(o.driftPeriodSec, 0.12),
    })),
  };
}
```

Result: two scenes in the same chapter never look identical, but the **average** matches the chapter's declared atmosphere.

---

## 15. Cross-Chapter Atmospheric Transitions

During `<ChapterSeam>` (T2 transition):

1. **Outgoing chapter atmosphere** fades / blurs over `DUR.epic`.
2. **Tint layer** interpolates from outgoing tint to incoming tint with 30% overlap.
3. **WebGL `uIntensity`** transitions from outgoing to incoming chapter values.
4. **Glow orbs** of outgoing chapter fade out; incoming orbs fade in.
5. **Audio ambience** crossfades with 200ms lag behind visual (per `sound-behavior-system.mdc`).
6. **Grain** continues uninterrupted (always present).

---

## 16. Atmospheric Anti-Vocabulary

Forbidden atmospheric patterns:

| Forbidden                                  | Why                                              | Use instead                          |
|--------------------------------------------|--------------------------------------------------|--------------------------------------|
| Glassmorphism (frosted card)               | Trend / decoration                               | Solid surface + grain                |
| Neumorphism (soft 3D shadow)               | Trend / decoration                               | Hairline border 1px                  |
| Pure `#000` or `#FFF` background           | Reads as digital                                 | Warm black / cream                   |
| CSS turbulence noise                       | Looks like JPEG artifacts                        | Texture-backed grain                 |
| Animated gradient hue shift                | Trend                                            | Static or breathing tint             |
| Heavy `box-shadow` for "depth"             | UI cliché                                        | Vignette + light leak                |
| Continuous fast grain animation (≤ 0.5s)   | Reads as digital noise                           | `breath`-paced drift (≥ 8s)          |
| Multiple competing WebGL scenes            | Performance + attention conflict                 | One scene tunneled                   |
| Bloom / DOF postprocessing                 | Demoscene aesthetic                              | Bake atmosphere into shader          |
| Particle followers / cursor trails         | Decoration                                       | Single contextual cursor             |
| Linear gradient backgrounds (decorative)   | Trend                                            | Radial atmospheric only              |
| Lottie animation as ambient                | UX cliché                                        | WebGL drift or CSS breathing         |

---

## 17. Atmospheric Test (Apply Before Shipping)

Before merging atmosphere code:

1. **Is grain present at the documented opacity for this chapter?**
2. **Is vignette declared (dark scenes) with the correct intensity + crushed corner?**
3. **Is the light source direction consistent across this chapter's scenes?**
4. **Are glow orbs ≤ 2 per scene with non-synchronous periods?**
5. **Is the chapter's tint at 3–8% opacity and blend-mode appropriate?**
6. **Is the WebGL scene budget respected (≤ 4ms/frame, ≤ 200 lines, ≤ 4 FBM octaves)?**
7. **Does the per-scene atmosphere derive from the chapter atmosphere via `deriveSceneAtmosphere`?**
8. **Does the cross-chapter transition interpolate atmosphere with 30% overlap?**
9. **Does the reduced-motion path freeze atmosphere coherently?**
10. **Could you describe the atmosphere as "a room", not as "a website background"?**

Ten "yes"es → ship.
Any "no" → revise.

---

## 18. Cinematic Rationale

- The five atmospheric layers (bg, WebGL, glow, tint, vignette + grain on top) reproduce the **cinematic post-production stack**: scene plate, grade, lighting, vignette, film grain. The web doesn't need to invent atmospheric design — it needs to **inherit** what cinema already perfected.
- Grain on top is the **single most important** atmospheric rule. It is what photographs have that screens don't. Without it, every viewport reads as digital, regardless of the rest.
- Direction-locked light source per chapter is the cinematic principle of **continuity** — the audience subconsciously trusts a room when its light comes from one direction.
- Per-scene atmospheric variance + cross-chapter interpolation make the project feel like **a continuous film** rather than a sequence of pages. This is the most expensive, most defining design decision in STRATEGICLAND.
