import { AmbientDepth } from "./AmbientDepth";
import { LightField } from "./LightField";
import { HeroVignette } from "./HeroVignette";

/**
 * HeroAtmosphere — chapter-scoped atmospheric layers per
 * docs/ATMOSPHERIC_LANGUAGE.md §2.
 *
 * Layers (in canonical z-order):
 *
 *   z[-2]  AmbientDepth   — fixed radial gradient base (chapter-tinted)
 *   z[-2]  LightField     — R3F particles tunneled into WebGLRoot
 *   z[-1]  HeroVignette   — radial darkening + inset shadow
 *
 * Site-wide film grain (z[101]) has been promoted to <SystemGrain/> at
 * root layout — it is no longer part of any chapter's atmosphere.
 *
 * All layers are pointer-events:none and aria-hidden. They mount once at
 * chapter root and persist through scene scrolls.
 */
export function HeroAtmosphere() {
  return (
    <>
      <AmbientDepth />
      <LightField />
      <HeroVignette />
    </>
  );
}

export { AmbientDepth, LightField, HeroVignette };
