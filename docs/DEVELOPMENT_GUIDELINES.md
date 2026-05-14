# DEVELOPMENT_GUIDELINES — STRATEGICLAND

> The workflow document. How we **work on** this project — local setup, branching, reviews, debugging, performance verification, accessibility audit, deployment.
> If process feels heavy, that is the point. The cinematic identity is fragile; process protects it.

---

## 1. Workflow Premise

The codebase is **disciplined slow craft**. We optimize for **identity preservation over velocity**. Three small disciplined PRs are infinitely better than one large "premium cinematic refactor" PR.

Every contribution must answer:
1. *Which canon HTML or `.mdc` rule does this implement?*
2. *Which `/docs` document governs this decision?*
3. *Does this preserve, deepen, or threaten the project's DNA?*

If the answer to #3 is "threaten", the contribution is rejected — even if technically correct.

---

## 2. Local Setup

### 2.1 Prerequisites
- **Node.js** ≥ 22.x (Next.js 16 requirement).
- **pnpm** ≥ 9.x preferred (faster installs; works with the project's lockfile).
  - If using `npm`, the existing `package-lock.json` controls.
- **Git** ≥ 2.40.x.
- **Cursor** IDE (the `.rules/` system is Cursor-native; other IDEs work but lose the always-on rule context).

### 2.2 Clone + install
```sh
git clone <repo>
cd strategicland-cursor
npm install                        # respects existing package-lock.json
```

### 2.3 First-time agent / contributor onboarding
Follow `MASTER_STATE.md §8 Onboarding Checklist`. Do **not** skip steps.

### 2.3.1 Every new chat session
After onboarding, **every new chat session** follows the official continuity protocol defined in `CHAT_CONTINUITY_WORKFLOW.md`:

- **Lightweight mode** (default): `MASTER_STATE.md` → `DESIGN_DNA.md` → `CURRENT_TASK_TEMPLATE.md` (instantiated).
- **Architecture mode** (new chapter / canon / engine / `.rules/` / token / reference change): `MASTER_STATE.md` → `DESIGN_DNA.md` → latest `SESSION_CHANGELOG` → `CURRENT_TASK_TEMPLATE.md` (instantiated).

Mode determination: `CHAT_CONTINUITY_WORKFLOW.md §3`. Forbidden patterns: `§5`. Hard cap: **30k tokens of context per session**.

### 2.4 Run dev server
```sh
npm run dev                        # Next.js dev on :3000
```

Verify:
- Page renders without console errors.
- Lenis smooth scroll active.
- Custom cursor visible on desktop.
- Grain visible at low opacity.

### 2.5 Build + production preview
```sh
npm run build
npm start
```

Run before any PR opens. The dev server forgives mistakes the build does not (RSC boundaries, font preload, ESM/CJS interop).

### 2.6 Lint
```sh
npm run lint                        # eslint
```

The project lints strictly. **Never** disable a rule with inline comments without a written justification in the same comment.

---

## 3. Branching Model

### 3.1 Branch names
```
main                               # production, protected
chapter/<chapter-id>               # work on a specific chapter
canon/<HC-id>-<short-desc>         # implementing a canon HTML system
rule/<rule-name>-<short-desc>      # changes to .rules/ governance
infra/<short-desc>                 # build, CI, deps
fix/<short-desc>                   # bug fixes
```

Examples:
- `chapter/cultural-impacto`
- `canon/HC-04-pinned-ladder`
- `rule/sound-behavior-init`
- `infra/lighthouse-ci`

### 3.2 Commit messages
- Imperative present tense.
- ≤ 72-char summary.
- Scoped prefix: `hero:`, `motion:`, `webgl:`, `chapter:`, `atmosphere:`, `audio:`, `density:`, `irregularity:`, `interaction:`, `transition:`, `infra:`, `docs:`.

Examples:
- `hero: implement HC-02 cinematic loader char-reveal`
- `motion: route DUR through jitter() in revealText.line`
- `chapter: scaffold CulturalChapter scene tree`
- `atmosphere: replace CSS turbulence with grain-1024.png`
- `density: add lintPage validator and dev-time gate`

### 3.3 PR cadence
- Maximum **400 lines of net change per PR**. Larger PRs are split.
- Each PR addresses **one chapter, one rule, or one infra concern**. Never mix.
- PR description **must** answer the three workflow premise questions (§1).

---

## 4. PR Review Protocol

### 4.1 Mandatory PR template
```markdown
## Canon / rule reference
- Implements: [HC-XX | rule-name | doc-section]

## DNA check (per DESIGN_DNA.md §5)
- 5 markers respected: [list which]
- Reference (per VISUAL_REFERENCE_LOCK.md): [name + work + principle]

## Tier / atmosphere check
- Tier(s) of new scene(s): [T01-T05 list]
- Atmosphere derives from: [chapter atmosphere config]
- Variance applied via: [jitter calls]

## Performance impact
- Bundle delta (gzip): [+X KB]
- New ScrollTriggers: [+N]
- New WebGL elements: [+N tris, +N FBM octaves]
- Lighthouse delta (Perf, A11y): [+/-X]

## Reduced-motion verified
- [ ] All new motion has reduced-motion path tested

## Visual canon match
- Side-by-side screenshot vs canon HTML attached
```

### 4.2 Review checklist (reviewer applies)
- [ ] Confirms canon / rule reference is correct.
- [ ] Confirms no forbidden patterns introduced (per `MOTION_GRAMMAR.md §6`, `ATMOSPHERIC_LANGUAGE.md §16`, `VISUAL_REFERENCE_LOCK.md §3`).
- [ ] Confirms tokens used (no inline hex, no inline durations, no inline eases).
- [ ] Confirms `jitter()` used (no raw `Math.random()`).
- [ ] Confirms `useGSAP` (or `gsap.context`) used; no leaked tweens on remount.
- [ ] Confirms `<SceneShell>` declares `tier` + `energy`.
- [ ] Confirms reduced-motion path coherent.
- [ ] Confirms mobile fallback coherent (horizontal pin → vertical stack, etc.).
- [ ] Confirms accessibility: `:focus-visible` rings, semantic HTML, ARIA labels, sufficient contrast.
- [ ] Confirms performance budget not exceeded (per `performance-system.mdc §2`).
- [ ] Confirms `lintPage()` passes.

### 4.3 Reviewer authority
- Any reviewer may **block merge** for DNA violations. The "ship it anyway" override requires creative-direction sign-off **and** a documented exception in `MASTER_STATE.md §3 Decisions logged`.
- A failing **DNA Anti-Test** (`DESIGN_DNA.md §6`) is an automatic block.

---

## 5. Code Standards

### 5.1 TypeScript discipline
- `strict: true` always.
- No `any` without a written justification (`// @ts-expect-error <reason>`).
- All exported functions and components typed explicitly.
- Prefer types over interfaces (single import surface).
- Path aliases (`@components/`, `@lib/`, etc.) — never relative cross-module imports.

### 5.2 React patterns
- Server Components by default. `"use client"` only when needed (motion, refs, browser APIs).
- One component per file. Default export named identically.
- Props typed via dedicated `type Props = { ... }`.
- No prop drilling > 2 levels — lift to context provider.
- All animation code in components uses `useGSAP` (`@gsap/react`) for context isolation.

### 5.3 Styling
- Tailwind v4 with `@theme` tokens. Never arbitrary `text-[40px]` — always semantic tokens (`text-display`).
- Tokens mirrored in TS (`styles/tokens/colors.ts`, `typography.ts`, etc.) for JS-driven motion code.
- No inline `style={{ ... }}` except for runtime-computed values (CSS vars driven by JS like `--mouse-x`).

### 5.4 No comments unless necessary
- Comments only for non-obvious intent, trade-offs, constraints.
- Forbidden:
  - `// import the module`
  - `// loop through items`
  - `// returns the count`
- Required:
  - Canon corrections: `// CANON CORRECTION (HC-04 §5.5): elastic.out replaced with EASE.cinematic`
  - Performance trade-offs: `// will-change cleared in onComplete to avoid layer leak`
  - Browser quirks: `// Safari requires -webkit-clip-path; auto-prefixer handles`

### 5.5 Naming
Per `project-structure.mdc §12`:
- Components: PascalCase file (`EditorialImage.tsx`).
- Hooks: `useCamelCase.ts` (`useScrollProgress.ts`).
- Lib utilities: camelCase (`lenisGsapBridge.ts`).
- Shaders: kebab-case `.frag` / `.vert`.
- Image assets: chapter-prefix kebab-case (`drift-scene02-foglake.avif`).
- Tokens: SCREAMING_SNAKE for JS dictionaries (`EASE`, `DUR`, `STAGGER`, `COLOR`, `TYPE_SCALE`).

---

## 6. Working with the HTML Canon

### 6.1 Canon translation workflow
For each canon HTML being implemented:

1. **Open canon in browser.** Screen-record at 60 FPS for at least 30 seconds of scroll. Save the recording for side-by-side comparison.
2. **Inspect with DevTools.** Note:
   - All inline styles (color, font-family, font-size).
   - All GSAP eases, durations, staggers.
   - All ScrollTrigger configs.
   - All `prefers-reduced-motion` paths (if any).
3. **Map to tokens.** Convert every inline value to a token reference. Document violations (e.g., HC-04's `elastic.out` mapped to canon-correction in `HTML_CANON.md §5.5`).
4. **Decompose to components.** List every visual element. Map each to a destination component path (per `SYSTEM_ARCHITECTURE.md §8`).
5. **Implement scene-by-scene.** One scene per commit, ideally one scene per PR.
6. **Visual diff.** Run side-by-side at 0.5× and 1× playback. Visual delta must be **invisible** except for documented canon corrections.
7. **Lint + density check.** Run `lintPage()` against the page composition.

### 6.2 Canon-deviation escalation
If a canon design seems wrong while implementing:

1. **Pause.** Re-read the canon HTML completely.
2. **Document the perceived issue** in a draft PR comment.
3. **Cross-check** against `.rules/` — does the canon violate a rule, or did you misread the canon?
4. **If a real conflict** — flag in `MASTER_STATE.md §7 Open Questions`. Do not silently "improve" the canon.
5. **Wait for creative-direction resolution** before continuing.

---

## 7. Working with the `.rules/` System

### 7.1 How rules load in Cursor
The `.rules/` folder is Cursor-native. Rules with `alwaysApply: true` load into every chat context automatically. Rules with glob patterns load when matching files are open.

### 7.2 When to consult a rule
- **Before writing any code in a domain** (motion → `motion-system.mdc`, atmosphere → `atmosphere-system.mdc`, etc.).
- **When in doubt** about an ease, duration, color, or pattern.
- **During PR review** when the reviewer flags a potential rule violation.

### 7.3 When to update a rule
Rules evolve, but **slowly**:
- Adding to a rule (e.g., a new allowed pattern, a new token) requires:
  - PR with `rule/` branch prefix.
  - Justification with reference to canon or to a recurring need.
  - Creative-direction sign-off.
- Removing from a rule (e.g., loosening a restriction) requires:
  - Same as above, **plus** documented impact on `DESIGN_DNA.md §7 Scarcity Principle`.
- Adding a new rule file requires:
  - Same as above, **plus** updates to `MASTER_STATE.md §4` and `project-structure.mdc`.

### 7.4 Rule conflict resolution
Per `SYSTEM_ARCHITECTURE.md §14`:
```
DESIGN_DNA.md > cinematic-language.mdc > narrative-density-system.mdc
> human-irregularity-system.mdc > HTML_CANON.md > all other .mdc
> performance-system.mdc + responsive-system.mdc
> project-structure.mdc > SYSTEM_ARCHITECTURE.md > DEVELOPMENT_GUIDELINES.md
```

---

## 8. Performance Discipline

### 8.1 Local performance verification (before PR)
```sh
npm run build && npm start
# In Chrome DevTools:
# 1. Performance tab → record 10s scroll
# 2. Verify ≥ 55 FPS sustained (target 60)
# 3. Check Memory tab → no GL context leaks on route change
# 4. Coverage tab → unused JS < 30%
# 5. Lighthouse → Perf ≥ 90, A11y ≥ 95
```

### 8.2 CI gates (mandatory)
- **Lighthouse CI** — Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 90 on home + 1 case + 1 cultural page.
- **Bundle analyzer** — first-load JS ≤ 180 KB gzip.
- **Web Vitals** — INP ≤ 200ms p75 via real-user monitoring.

### 8.3 Performance bisection
If a PR drops Lighthouse Perf below threshold:
1. Disable new motion individually (feature flags) and re-test.
2. Identify the worst offender.
3. Apply degradation per `performance-system.mdc §11`:
   - Sacrifice atmosphere first.
   - Then WebGL fidelity.
   - Then magnetic / cursor effects.
   - **Never** sacrifice typography or accessibility.

---

## 9. Accessibility Discipline

### 9.1 Contracts
- WCAG **AA minimum** for body text contrast.
- WCAG **AA** for interactive controls.
- Display type may go below AA if a readable secondary equivalent exists nearby.
- All interactive elements have visible `:focus-visible` rings (per `interaction-system.mdc §7`).
- All images have descriptive `alt` (or `alt=""` for decorative).
- All custom interaction patterns expose ARIA equivalents:
  - `<EditorialLink>` → ARIA-labeled link.
  - Magnetic CTAs → still navigable by keyboard.
  - Pinned horizontal sections → keyboard arrow advance allowed (or vertical fallback).
  - Custom cursor → ignored on `pointer: coarse`.

### 9.2 `prefers-reduced-motion: reduce` paths
Mandatory for every motion. The reduced-motion path:
- Disables Lenis smoothing (native scroll).
- Disables parallax, magnetic, image displacement.
- Caps reveals at `DUR.quick` opacity-only.
- Disables WebGL drift (uniforms frozen).
- Disables atmospheric breathing motion.
- Disables sub-pixel cursor jitter.
- Disables transition resonance audio.
- Caps audio at -32 dB.
- Skips hero intro.

### 9.3 Verification
- Test with macOS System Preferences → Accessibility → Display → Reduce Motion.
- Test with Windows Settings → Ease of Access → Display → Show animations.
- Lighthouse A11y audit + manual screen reader (VoiceOver / NVDA) per chapter.

---

## 10. Debugging

### 10.1 Motion debugging
- **GSAP DevTools** (paid) — visualize timelines.
- **`ScrollTrigger.normalizeScroll(true)`** — only as a last-resort patch for scroll-jank on touch.
- **Print timeline labels** — every chapter timeline should expose labels for debugging:
  ```ts
  tl.addLabel("scene01:start").from(...).addLabel("scene01:end");
  ```
- **Slow-motion review** — use Chrome DevTools "Animation" panel + 0.25× playback to inspect reveal pacing.

### 10.2 Atmosphere debugging
- **`<DebugGridOverlay>`** — toggleable 12-col grid overlay.
- **`<FpsMeter>`** — top-right FPS counter (dev only).
- **Atmosphere isolation** — temporarily disable layers (grain, vignette, glow orbs) one at a time to identify the source of a visual issue.

### 10.3 WebGL debugging
- **Three.js inspector** — verify scene tree.
- **`gl.getExtension('WEBGL_debug_renderer_info')`** — confirm `dpr`, GPU.
- **`<Canvas>` `frameloop="always"`** — temporary, for shader iteration.

### 10.4 Lenis debugging
- **`lenis.on("scroll", e => console.log(e.scroll, e.velocity))`** — inspect scroll values.
- **Chrome `Rendering` tab → "Show paint flashing"** — confirm Lenis isn't repainting unnecessarily.

---

## 11. Asset Pipeline

### 11.1 Images
- **Source masters** in `assets/source/images/` (gitignored if large; sync via design ops).
- **Production assets** in `public/images/<chapter>/<scene>-<descriptor>.avif`.
- Format priority: AVIF → WebP → JPG fallback.
- Always provide explicit `width` / `height` to `<Image>` to prevent CLS.

### 11.2 Fonts
- **Self-hosted** via `next/font/local` (preferred) for licensed fonts.
- **Free fallbacks** (Cormorant Garamond, Fraunces, Inter, Manrope) via `next/font/google`.
- Subset to `latin`, `latin-ext` only.
- Preload only critical weights (Regular serif + Regular sans).

### 11.3 Textures
- Grain textures in `public/textures/grain-{512,1024}.png`.
- Versioned filenames on update (`grain-1024-v2.png`) to bust caches.

### 11.4 Audio (when implemented per `sound-behavior-system.mdc`)
- Field recordings in `public/audio/<category>-<descriptor>.m4a`.
- AAC primary; Opus fallback for modern browsers.
- Provenance + credits in `content/audio/credits.mdx`.

---

## 12. Variance & Determinism in Tests

`lib/irregularity/jitter.ts` is seeded — same seed produces same output. Tests rely on this:

```ts
import { setIrregularitySeed } from "@lib/irregularity/jitter";
beforeEach(() => setIrregularitySeed(0xCAFEBABE));
```

Visual regression tests freeze the seed. Production uses `Date.now() & 0xffffffff` per session.

---

## 12.5 Session Closing Protocol

Every architectural session ends with the closing protocol defined in `CHAT_CONTINUITY_WORKFLOW.md §6`. **Skipping this is a memory loss event** that the next session inherits as drift.

### 12.5.1 Trigger conditions
Run the closing protocol if **any** is true:
- Current task completed (PR opened, work merged, feature shipped).
- Session has run > 90 minutes of active work.
- A structural change has been made.
- A decision has been made.
- A blocker has been identified.

### 12.5.2 The 5 closing steps (≤ 5 minutes total)
1. Verify clean state (commits, TODOs, saves).
2. Update `MASTER_STATE.md` (§3 phase, §3 decisions, §7 open questions).
3. Generate session changelog if architecture mode (per `SESSION_CHANGELOG_GENERATOR.md`); save to `docs/changelogs/YYYY-MM-DD-<id>.md`; update `INDEX.md`.
4. Update `CURRENT_TASK_TEMPLATE.md` payload for next session (continuation context).
5. Verify next-session entry point is sufficient without reading chat transcript.

### 12.5.3 Changelog generation requirement
Per `CHAT_CONTINUITY_WORKFLOW.md §7`, generate a changelog **only when** at least one trigger condition is met. Do **not** generate a changelog for routine bug fixes or token-respecting style polish. **Maximum one changelog per chat session** — consolidate if multiple triggers fire.

### 12.5.4 Prompt governance discipline
Operational prompts (`CURRENT_TASK_TEMPLATE.md`, `SESSION_CHANGELOG_GENERATOR.md`, `DOCS_GENERATOR_PROMPT.md`) are part of the project's governance layer. They are:
- **Versioned** with the codebase (live in `/docs/`).
- **Updated only via PR** with `docs:` prefix and creative-direction sign-off.
- **Never inlined** with one-off modifications during a session — if the template needs to change, change the template.
- **Cited explicitly** when used: a chat using `CURRENT_TASK_TEMPLATE.md` references it by name in the first response.

### 12.5.5 Continuity workflow violations
A session that ends without:
- Updating `MASTER_STATE.md` when a decision was made → **memory loss**.
- Generating a changelog when architecture changed → **continuity break**.
- Recording an open blocker → **drift on resume**.

These are reviewed at the start of the next session. The next session's first action becomes **reconstruction of the missed update** before any code is written.

### 12.5.6 Continuity audit (monthly)
Per `CHAT_CONTINUITY_WORKFLOW.md §11`. Verify:
- `MASTER_STATE.md` matches reality.
- `docs/changelogs/` has ≥ 1 entry per architecturally significant week.
- No `/docs/*.md` references removed `.rules/` files (or vice versa).
- No two `/docs/*.md` files contradict each other.
- No `.rules/` rule duplicates a `/docs/*.md` source-of-truth.

If audit fails: schedule a continuity recalibration before any new feature work.

---

## 13. Documentation Maintenance

Whenever a structural change is made:

| Change                                  | Files to update                                  |
|-----------------------------------------|--------------------------------------------------|
| New chapter type                        | `CHAPTER_SYSTEM.md`, `chapter-architecture.mdc`, `narrative-density-system.mdc` |
| New canon HTML                          | `HTML_CANON.md`, `MASTER_STATE.md §5`            |
| New motion pattern                      | `MOTION_GRAMMAR.md §3`                            |
| New atmosphere primitive                | `ATMOSPHERIC_LANGUAGE.md §2`                     |
| New token in `EASE`/`DUR`/`STAGGER`     | `motion-system.mdc`, `MOTION_GRAMMAR.md §2`      |
| New token in `COLOR`                    | `color-system.mdc`, `ATMOSPHERIC_LANGUAGE.md §3.1` |
| Performance budget change               | `performance-system.mdc`, `SYSTEM_ARCHITECTURE.md §11` |
| Reference list change                   | `VISUAL_REFERENCE_LOCK.md §2 / §3`               |
| Status / phase change                   | `MASTER_STATE.md §3`                             |
| Decision logged                         | `MASTER_STATE.md §3 Decisions logged`            |
| New `/docs/*.md` file                   | `MASTER_STATE.md §4 Layer 2`, `DOCS_GENERATOR_PROMPT.md §3 Principle 7` |
| Continuity workflow change              | `CHAT_CONTINUITY_WORKFLOW.md` + changelog        |
| Operational prompt change               | The prompt file + `CHAT_CONTINUITY_WORKFLOW.md`  |
| Architectural session ends              | `docs/changelogs/YYYY-MM-DD-<id>.md` + `INDEX.md` |

---

## 14. Deployment

### 14.1 Hosting target
- Vercel (preferred — Next.js 16 RSC streaming + edge runtime support).
- Optional fallback: Cloudflare Pages with Next 16 adapter (verify support per `node_modules/next/dist/docs/`).

### 14.2 Deployment gates
Before deploying to production:
- [ ] All tests pass.
- [ ] Lighthouse CI gate passes.
- [ ] Bundle analyzer report attached to PR.
- [ ] Visual regression diff approved.
- [ ] Cross-browser smoke test (Safari 17+, Firefox 120+, Chrome 120+, Edge 120+).
- [ ] Mobile tested on real device (iOS Safari + Android Chrome).
- [ ] Audio toggle verified (when audio is implemented).
- [ ] Reduced-motion path verified.
- [ ] Hero intro plays once per session, skips on revisit.
- [ ] All `lintPage()` checks pass for every route.

### 14.3 Cache strategy
- HTML: streamed, ISR with revalidate as appropriate.
- Static assets: `Cache-Control: public, max-age=31536000, immutable`.
- Fonts: same as static assets.
- Audio: same as static assets.

---

## 15. Rollback Procedure

If a production deployment introduces a DNA regression:

1. **Immediate** — Vercel: revert to previous deployment via dashboard.
2. **Forensics** — open an `incident/<id>` branch with the offending commits cherry-picked back.
3. **Root cause** — document in `MASTER_STATE.md §3 Decisions logged`:
   - What shipped that violated DNA.
   - Which review step missed it.
   - What gate is added to prevent recurrence.
4. **Re-design + re-ship** — never "patch" a DNA regression; redesign from `DESIGN_DNA.md` and `VISUAL_REFERENCE_LOCK.md §2`.

---

## 16. Working with Cursor / AI Agents

### 16.1 Agent onboarding
The agent's first action in any session must be: **read `MASTER_STATE.md`**.

### 16.2 Agent constraints
- **Never** modify `.rules/` without explicit user request.
- **Never** add libraries above 50 KB gzip without justification + sign-off.
- **Never** introduce a new motion pattern outside `MOTION_GRAMMAR.md §3`.
- **Always** run the DNA Test before shipping (`DESIGN_DNA.md §5`).
- **Always** prefer extending existing components over creating new ones.

### 16.3 Agent prompt patterns
When an agent is asked to implement a chapter or canon:
- The agent **must** quote the canon source and the relevant `.mdc` rules in its response.
- The agent **must** propose the canon-correction list before writing code.
- The agent **must** include `prefers-reduced-motion` and mobile fallback in the implementation.

### 16.4 Agent transcript reference
Past chats inform context. Cite as `[<title>](<uuid>)` per the agent transcripts convention.

---

## 17. Open Source / Inspiration Sourcing

### 17.1 Allowed dependencies (already shipped)
Per `package.json`:
- `next` `react` `react-dom` `@react-three/fiber` `@react-three/drei` `three` `gsap` `lenis` `framer-motion` `tailwindcss`.

### 17.2 Adding a new dependency
- ≤ 50 KB gzip.
- Tree-shakable.
- Active maintenance (last commit < 6 months).
- License compatible (MIT / OFL / Apache 2.0 preferred).
- Justified in PR with bundle-impact measurement.

### 17.3 Forbidden dependencies (examples)
- ❌ `lodash` (use native or specific micro-deps like `lodash.debounce`).
- ❌ `moment` / `dayjs` (use `Intl.DateTimeFormat`).
- ❌ Any `@studio-freight/*` legacy package — Lenis is now `lenis`.
- ❌ Any UI kit (MUI, Chakra, AntD, Mantine, Radix-themed).
- ❌ Any animation kit beyond GSAP / Framer Motion.

---

## 18. Communication

### 18.1 Language
- Conversation: Spanish (per user rules).
- Code: English.
- Docs: English.
- Commit / PR titles: English.
- Inline comments: English.

### 18.2 Tone
- Senior Principal Engineer.
- Direct. Concise. No hedging.
- Technical specificity over enthusiasm.
- No unnecessary praise, no "great question".

### 18.3 Escalation
If a contributor / agent is uncertain about a creative direction decision:
1. Re-read the relevant `.mdc` rule.
2. Re-read the relevant `/docs/*.md` file.
3. Re-read `DESIGN_DNA.md`.
4. If still uncertain, **flag in `MASTER_STATE.md §7 Open Questions`** and ask the project owner directly.

Never silently make a creative decision in absence of guidance.

---

## 19. Final Discipline

This project is not built **fast**. It is built **right**.

The cost of building it right is:
- More planning, less coding.
- More reading, less writing.
- More restraint, less feature.
- More questions in PRs, less code in PRs.
- More discipline, less innovation.

The reward is the same reward A24 gets for not making blockbusters: a project people remember.

If at any point this workflow feels heavy, that is the **system working correctly**. The friction is **the protection of the identity**. Do not optimize it away.
