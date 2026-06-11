import type { CaseData } from "../types";

/**
 * Seed case — speculative exploration used to bring the /work/[slug]
 * infrastructure up before real case content lands.
 *
 * ALL copy below is WORKING copy (foundational pass). The Human
 * Director's copywriting pass replaces text without touching shape —
 * the shape is the contract.
 *
 * Image slots resolve to public/images/work/sample-case/<descriptor>.avif
 * and fall back to AtmosphericPlaceholder until assets are dropped.
 */
export const sampleCase: CaseData = {
  slug: "sample-case",
  title: "Cartografía del Ruido",
  year: "2026",
  nature: "speculative",
  activators: ["immersion", "identity", "aspirational-systems"],

  hero: {
    titleLines: ["Cartografía", "del Ruido"],
    lede: "Una exploración especulativa: cómo una marca de audio recupera posición cuando el mercado entero compite por volumen.",
    image: {
      descriptor: "hero-terrain",
      ratio: "2:1",
      reveal: "blur",
      placeholderVariant: "peak",
    },
  },

  intro: {
    statement:
      "El mercado confundió presencia con volumen. La oportunidad estaba en el silencio que nadie cartografiaba.",
    columns: {
      problem:
        "Una categoría saturada donde cada lanzamiento grita más que el anterior y ninguno deja memoria.",
      strategy:
        "Invertir el eje: posicionar la escucha — no el sonido — como territorio de deseo y de necesidad alineados.",
      result:
        "Una posición instalada en el lenguaje de la categoría: la marca que entiende el silencio posee el sonido.",
    },
  },

  sequence: [
    {
      index: "01",
      eyebrow: "Señal",
      title: "El volumen dejó de significar.",
      body: "La lectura del territorio social: audiencias fatigadas de estímulo que empezaban a pagar por menos, no por más.",
      image: {
        descriptor: "slide-01-saturation",
        ratio: "3:2",
        reveal: "mask",
        direction: "left-to-right",
        placeholderVariant: "documentary",
      },
    },
    {
      index: "02",
      eyebrow: "Tensión",
      title: "Deseo y necesidad apuntaban en direcciones opuestas.",
      body: "La marca prometía inmersión; el producto resolvía aislamiento. La desalineación era la causa del humo.",
      image: {
        descriptor: "slide-02-tension",
        ratio: "4:3",
        reveal: "mask",
        direction: "right-to-left",
        placeholderVariant: "architectural",
      },
    },
    {
      index: "03",
      eyebrow: "Decisión",
      title: "La escucha como territorio propio.",
      body: "Una sola decisión estratégica: abandonar la guerra del volumen y poseer la categoría perceptual del silencio habitado.",
      image: {
        descriptor: "slide-03-decision",
        ratio: "3:2",
        reveal: "mask",
        direction: "left-to-right",
        placeholderVariant: "documentary",
      },
    },
    {
      index: "04",
      eyebrow: "Sistema",
      title: "La posición hecha comportamiento.",
      body: "Identidad, producto y narrativa reorganizados alrededor de la misma hipótesis — cada superficie ejecuta la decisión.",
      image: {
        descriptor: "slide-04-system",
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
      body: "La categoría empezó a usar el vocabulario de la marca para describirse a sí misma. Eso no se compra con medios.",
      image: {
        descriptor: "slide-05-residue",
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
      "La ventaja no vino de ser escuchados. Vino de entender qué quería oír el silencio.",
    caption: "Exploración especulativa · Laboratorio WMN/ND",
  },

  threshold: {
    tension:
      "Una categoría entera compitiendo por volumen; ninguna marca poseía la escucha.",
    decision:
      "Abandonar la guerra del sonido y cartografiar el silencio como territorio propio.",
    footprint:
      "La categoría describe hoy su deseo con el vocabulario de la marca.",
    image: {
      descriptor: "threshold-cartografia",
      ratio: "2.39:1",
      reveal: "mask",
      direction: "left-to-right",
      placeholderVariant: "peak",
    },
  },

  atmosphere: {
    background: "warmBlack",
  },

  seo: {
    title: "Cartografía del Ruido — Caso · STRATEGICLAND",
    description:
      "Exploración especulativa: cómo una marca recupera posición cuando el mercado entero compite por volumen. Inteligencia estratégica convertida en posición instalada.",
  },
};
