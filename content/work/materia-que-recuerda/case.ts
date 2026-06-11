import type { CaseData } from "../types";

/**
 * Seed case 03 — speculative exploration registered to complete the
 * three-case evidence law of HC-05 ACT B (architecture §8). Compact
 * slot B on the homepage plane (threshold plate 3:4 — the portrait
 * ratio of the locked homepage set).
 *
 * ALL copy below is WORKING copy (foundational pass). The Human
 * Director's copywriting pass replaces text without touching shape —
 * the shape is the contract.
 *
 * Image slots resolve to
 * public/images/work/materia-que-recuerda/<descriptor>.avif and fall
 * back to AtmosphericPlaceholder until assets are dropped.
 */
export const materiaQueRecuerda: CaseData = {
  slug: "materia-que-recuerda",
  title: "Materia que Recuerda",
  year: "2026",
  nature: "speculative",
  activators: ["sustainability", "innovation", "hyper-personalization"],

  hero: {
    titleLines: ["Materia", "que Recuerda"],
    lede: "Una exploración especulativa: cómo una marca de objetos recupera deseo cuando la sustentabilidad se volvió un sello que ya nadie lee.",
    image: {
      descriptor: "hero-veta",
      ratio: "2:1",
      reveal: "blur",
      placeholderVariant: "documentary",
    },
  },

  intro: {
    statement:
      "La sustentabilidad se volvió genérica el día en que todas las marcas la certificaron. El origen, en cambio, nadie lo narraba.",
    columns: {
      problem:
        "Una categoría donde cada etiqueta promete lo mismo y el sello verde dejó de mover una sola decisión de compra.",
      strategy:
        "Convertir la trazabilidad en biografía: cada objeto carga la memoria verificable de su material y de sus manos.",
      result:
        "Una posición instalada en el criterio de compra: el origen dejó de ser certificado y se volvió deseo.",
    },
  },

  sequence: [
    {
      index: "01",
      eyebrow: "Señal",
      title: "El sello verde dejó de significar.",
      body: "La lectura del territorio: consumidores que ya no leen certificaciones porque todas las marcas exhiben las mismas.",
      image: {
        descriptor: "slide-01-sello",
        ratio: "3:2",
        reveal: "mask",
        direction: "left-to-right",
        placeholderVariant: "documentary",
      },
    },
    {
      index: "02",
      eyebrow: "Tensión",
      title: "La virtud no producía deseo.",
      body: "La marca comunicaba responsabilidad; el comprador buscaba pertenencia. Dos lenguajes que no se tocaban en el punto de decisión.",
      image: {
        descriptor: "slide-02-virtud",
        ratio: "4:3",
        reveal: "mask",
        direction: "right-to-left",
        placeholderVariant: "architectural",
      },
    },
    {
      index: "03",
      eyebrow: "Decisión",
      title: "La trazabilidad como biografía.",
      body: "Una sola decisión estratégica: dejar de certificar y empezar a narrar — cada objeto recuerda de dónde viene y quién lo hizo.",
      image: {
        descriptor: "slide-03-biografia",
        ratio: "3:2",
        reveal: "mask",
        direction: "left-to-right",
        placeholderVariant: "documentary",
      },
    },
    {
      index: "04",
      eyebrow: "Huella",
      title: "Lo que quedó instalado.",
      body: "El origen se volvió criterio de deseo. La categoría empezó a narrar procedencia porque la marca convirtió la memoria del material en estatus.",
      image: {
        descriptor: "slide-04-huella",
        ratio: "4:3",
        reveal: "mask",
        direction: "right-to-left",
        placeholderVariant: "peak",
      },
    },
  ],

  creators: [
    {
      name: "WMN/ND",
      role: "Dirección estratégica",
      note: "Exploración interna del laboratorio interdisciplinario.",
    },
  ],

  reflection: {
    statement:
      "Un objeto sin memoria es mercancía. Un objeto que recuerda su origen es una posición.",
    caption: "Exploración especulativa · Laboratorio WMN/ND",
  },

  threshold: {
    tension:
      "La sustentabilidad se volvió un sello que ya nadie lee al momento de decidir.",
    decision:
      "Convertir la trazabilidad en biografía: cada objeto recuerda de dónde viene.",
    footprint:
      "El origen dejó de ser certificado y se volvió criterio de deseo.",
    image: {
      descriptor: "threshold-materia",
      ratio: "3:4",
      reveal: "mask",
      direction: "left-to-right",
      placeholderVariant: "documentary",
    },
  },

  atmosphere: {
    background: "warmBlack",
  },

  seo: {
    title: "Materia que Recuerda — Caso · STRATEGICLAND",
    description:
      "Exploración especulativa: cómo una marca de objetos convierte la trazabilidad en biografía y el origen en criterio de deseo.",
  },
};
