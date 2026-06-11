import type { CaseImageRatio, CaseImageDirection, CasePlaceholderVariant } from "@/content/work/types";

/**
 * Homepage showcase content — HC-05 ACT B.
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §08
 * SHOWCASE & PROMESA CORPORATIVA. The sitemap names exactly three
 * evidence references:
 *
 *   "…como el reposicionamiento de Sico con “Mi Punto S”, la
 *    producción inmersiva de “Chocolate Fountain” o estrategias de
 *    retail para marcas globales…"
 *
 * Each entry carries ONLY the literal sitemap reference — no invented
 * tension / decision / footprint, no invented results, no invented
 * metrics, no invented narratives. The act was decoupled from
 * content/work/registry.ts in the sitemap compliance pass because the
 * registry's speculative cases have no source in the sitemap.
 */

export type ShowcaseReference = {
  key: string;
  index: string;
  title: string;
  /** Literal sitemap reference phrase (§08 Evidencia). */
  reference: string;
  image: {
    ratio: CaseImageRatio;
    direction: CaseImageDirection;
    placeholderVariant: CasePlaceholderVariant;
  };
};

export const SHOWCASE_EVIDENCE_INTRO =
  "Grid de resultados basado en la experiencia adquirida en proyectos reales de alto nivel.";

export const SHOWCASE_REFERENCES: readonly ShowcaseReference[] = [
  {
    key: "mi-punto-s",
    index: "01",
    title: "Mi Punto S",
    reference: "El reposicionamiento de Sico con “Mi Punto S”.",
    image: {
      ratio: "2.39:1",
      direction: "left-to-right",
      placeholderVariant: "peak",
    },
  },
  {
    key: "chocolate-fountain",
    index: "02",
    title: "Chocolate Fountain",
    reference: "La producción inmersiva de “Chocolate Fountain”.",
    image: {
      ratio: "2:1",
      direction: "right-to-left",
      placeholderVariant: "architectural",
    },
  },
  {
    key: "retail-marcas-globales",
    index: "03",
    title: "Retail para marcas globales",
    reference: "Estrategias de retail para marcas globales.",
    image: {
      ratio: "3:4",
      direction: "left-to-right",
      placeholderVariant: "documentary",
    },
  },
] as const;
