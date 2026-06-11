"use client";

import { TemporalPause } from "@/app/components/cinematic/hero/HeroNarrative/TemporalPause";
import { SignalPrelude } from "./SignalNarrative/SignalPrelude";
import { FragmentedSignals } from "./SignalNarrative/FragmentedSignals";
import { PatternConstellation } from "./SignalNarrative/PatternConstellation";
import { HumanInterpretation } from "./SignalNarrative/HumanInterpretation";
import { StrategicCompression } from "./SignalNarrative/StrategicCompression";

/**
 * SignalComposition — canonical narrative ordering of HC-03
 * (ChapterId="cultural", chapter name "signal").
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §05
 * INPUT CORE. Scene order mirrors the sitemap's section order:
 * Introducción Metodológica → Dimensión Marca / Dimensión Producto →
 * Resultados de análisis → consecuencia del desfase.
 *
 *  1. Signal prelude            tier T01 silence       (seam from HC-02)
 *  2. Pattern constellation     tier T04 immersive     (Introducción Metodológica)
 *  3. Temporal pause            tier T01 silence       (T04 → T03 bridge)
 *  4. Fragmented signals        tier T03 editorial     (las dos dimensiones)
 *  5. Temporal pause            tier T01 silence       (T03 → T03 bridge)
 *  6. Human interpretation      tier T03 editorial     (resultados de análisis)
 *  7. Strategic compression     tier T01 silence       (closing realization)
 *
 * Pacing per narrative-density-system.mdc §5.2 satisfied: no two
 * consecutive scenes share a tier outside sustained T01 silence.
 *
 * TemporalPause is REUSED from the Hero canon (HeroNarrative). HC-03
 * does not invent its own silence primitive. Reusing the same component
 * guarantees identical rhythm tokens across all chapters.
 *
 * Pure structural ownership. No motion, no atmosphere — both live in
 * sibling subtrees and bind to the data-* selectors declared here.
 */
export function SignalComposition() {
  return (
    <>
      <SignalPrelude />

      <PatternConstellation />

      <TemporalPause height="22vh" mdHeight="14vh" label="silence" />

      <FragmentedSignals />

      <TemporalPause height="22vh" mdHeight="14vh" label="silence" />

      <HumanInterpretation />

      <StrategicCompression />
    </>
  );
}
