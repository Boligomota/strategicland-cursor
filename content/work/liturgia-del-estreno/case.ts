import type { CaseData } from "../types";

/**
 * Seed case 02 — speculative exploration registered to complete the
 * three-case evidence law of HC-05 ACT B (architecture §8: three is
 * the minimum that proves pattern, the maximum before the portfolio
 * smell). Compact slot A on the homepage plane (threshold plate 2:1).
 *
 * ALL copy below is WORKING copy (foundational pass). The Human
 * Director's copywriting pass replaces text without touching shape —
 * the shape is the contract.
 *
 * Image slots resolve to
 * public/images/work/liturgia-del-estreno/<descriptor>.avif and fall
 * back to AtmosphericPlaceholder until assets are dropped.
 */
export const liturgiaDelEstreno: CaseData = {
  slug: "liturgia-del-estreno",
  title: "La Liturgia del Estreno",
  year: "2026",
  nature: "speculative",
  activators: ["entertainment", "hyper-mediatization", "crowd-culture"],

  hero: {
    titleLines: ["La Liturgia", "del Estreno"],
    lede: "Una exploración especulativa: cómo una plataforma de entretenimiento recupera gravedad cultural cuando todo se estrena en todas partes al mismo tiempo.",
    image: {
      descriptor: "hero-umbral",
      ratio: "2:1",
      reveal: "blur",
      placeholderVariant: "architectural",
    },
  },

  intro: {
    statement:
      "Cuando todo es estreno, nada es acontecimiento. La escasez dejó de ser limitación: era el último territorio libre.",
    columns: {
      problem:
        "Un calendario saturado donde cada semana promete el evento del año y ninguna fecha deja memoria colectiva.",
      strategy:
        "Devolverle al estreno su condición de rito: una sola puerta, un solo momento, una audiencia que llega junta.",
      result:
        "Una posición instalada en el tiempo de la categoría: la plataforma que consagra fechas en lugar de llenarlas.",
    },
  },

  sequence: [
    {
      index: "01",
      eyebrow: "Señal",
      title: "El evento perdió su hora.",
      body: "La lectura del territorio: audiencias que ya no recuerdan dónde vieron nada, porque todo apareció en todas partes a la vez.",
      image: {
        descriptor: "slide-01-saturacion",
        ratio: "3:2",
        reveal: "mask",
        direction: "left-to-right",
        placeholderVariant: "documentary",
      },
    },
    {
      index: "02",
      eyebrow: "Tensión",
      title: "Alcance y gravedad apuntaban en direcciones opuestas.",
      body: "La plataforma prometía acontecimiento; el sistema de distribución lo disolvía. Cada punto de contacto adicional restaba peso.",
      image: {
        descriptor: "slide-02-dispersion",
        ratio: "4:3",
        reveal: "mask",
        direction: "right-to-left",
        placeholderVariant: "architectural",
      },
    },
    {
      index: "03",
      eyebrow: "Decisión",
      title: "El estreno como liturgia colectiva.",
      body: "Una sola decisión estratégica: renunciar a la ubicuidad y consagrar el momento — una puerta, una hora, una congregación.",
      image: {
        descriptor: "slide-03-decision",
        ratio: "3:2",
        reveal: "mask",
        direction: "left-to-right",
        placeholderVariant: "peak",
      },
    },
    {
      index: "04",
      eyebrow: "Sistema",
      title: "La escasez hecha comportamiento.",
      body: "Programación, narrativa y comunidad reorganizadas alrededor del rito — cada superficie protege la hora en lugar de multiplicarla.",
      image: {
        descriptor: "slide-04-sistema",
        ratio: "4:3",
        reveal: "mask",
        direction: "right-to-left",
        placeholderVariant: "architectural",
      },
    },
    {
      index: "05",
      eyebrow: "Huella",
      title: "Lo que quedó instalado.",
      body: "La categoría volvió a organizar su calendario alrededor de un solo umbral. Las fechas de la plataforma se convirtieron en las fechas del mercado.",
      image: {
        descriptor: "slide-05-huella",
        ratio: "3:2",
        reveal: "mask",
        direction: "left-to-right",
        placeholderVariant: "documentary",
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
      "El acontecimiento no se programa. Se consagra — y la consagración exige renunciar a estar en todas partes.",
    caption: "Exploración especulativa · Laboratorio WMN/ND",
  },

  threshold: {
    tension:
      "Cuando todo se estrena en todas partes al mismo tiempo, ningún estreno pesa.",
    decision:
      "Consagrar el momento: una sola puerta, una sola hora, una audiencia que llega junta.",
    footprint:
      "El calendario de la categoría volvió a girar alrededor de un solo umbral.",
    image: {
      descriptor: "threshold-liturgia",
      ratio: "2:1",
      reveal: "mask",
      direction: "right-to-left",
      placeholderVariant: "architectural",
    },
  },

  atmosphere: {
    background: "warmBlack",
  },

  seo: {
    title: "La Liturgia del Estreno — Caso · STRATEGICLAND",
    description:
      "Exploración especulativa: cómo una plataforma de entretenimiento recupera gravedad cultural devolviéndole al estreno su condición de rito colectivo.",
  },
};
