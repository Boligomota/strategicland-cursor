import type { CaseActivator, CaseNature } from "./types";

/**
 * Taxonomy chrome shared by the two M-04 planes:
 *  - Internal plane: CaseHero micro-taxonomy (/work/[slug]).
 *  - Homepage plane: ACT B thresholds (ProtagonistThreshold /
 *    CompactThresholds).
 *
 * Single source so the activator grammar reads IDENTICAL on both
 * planes — the connective tissue between forces (home) and evidence
 * (/work). These are template labels, never case copy.
 *
 * Honesty register: NATURE_LABEL renders FIRST wherever a case is
 * presented — speculative work is never disguised as client work
 * (HC-05 §8).
 */

export const NATURE_LABEL: Record<CaseNature, string> = {
  real: "Caso",
  hybrid: "Caso híbrido",
  conceptual: "Exploración conceptual",
  speculative: "Exploración especulativa",
};

/**
 * SITEMAP COMPLIANCE PASS: labels are the literal activator names of
 * the Mapa de Sitio Estratégico §07 "Retícula interactiva de 9
 * activadores (Herramientas de Transformación)".
 */
export const ACTIVATOR_LABEL: Record<CaseActivator, string> = {
  entertainment: "Atmósferas de entretenimiento",
  "hyper-mediatization": "Hipermediatización",
  immersion: "Experiencias Inmersivas",
  identity: "Identidad y Patrones",
  "crowd-culture": "Crowdculture",
  "aspirational-systems": "Aspiraciones / Expectativas",
  sustainability: "Eco / Sustentable",
  innovation: "Innovación Tech",
  "hyper-personalization": "Coleccionables / Hiperpersonalización",
};
