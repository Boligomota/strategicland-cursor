"use client";

/**
 * HumanInterpretation — HC-03 INPUT CORE analysis results (T03).
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §05
 * INPUT CORE — "Resultado del Análisis" of Columna A (DIMENSIÓN
 * MARCA → Meta: DESEO) and Columna B (DIMENSIÓN PRODUCTO → Meta:
 * NECESIDAD). The resolve line is the §05 methodology alignment
 * sentence. All copy is literal sitemap wording.
 *
 * Two statements sit on a horizontally-paired axis, separated by a
 * hairline gutter. On mobile they collapse to a single column.
 *
 * Reveal targets:
 *  - `[data-signal-interpretation-machine]`
 *  - `[data-signal-interpretation-human]`
 *  - `[data-signal-interpretation-resolve]`
 */
export function HumanInterpretation() {
  return (
    <section
      data-signal-scene="interpretation"
      data-density-tier="T03"
      className="relative w-full py-[8vh] md:py-[10vh]"
      style={{
        minHeight: "60vh",
        paddingInline: "clamp(32px, 6vw, 96px)",
      }}
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <span
          data-signal-section-eyebrow
          className="mb-10 block text-[11px] uppercase text-[color:var(--text-fog)] md:mb-12"
          style={{ letterSpacing: "0.12em" }}
        >
          Resultados de análisis
        </span>

        <div className="grid w-full grid-cols-1 gap-y-[clamp(28px,3vw,48px)] md:grid-cols-2 md:gap-x-[clamp(32px,4vw,72px)]">
          <div className="md:pr-[clamp(8px,1vw,16px)]">
            <span
              className="mb-4 block text-[11px] uppercase text-[color:var(--text-fog)]"
              style={{ letterSpacing: "0.12em" }}
            >
              Dimensión Marca · Meta: Deseo
            </span>
            <p
              data-signal-interpretation-machine
              className="signal-interpretation-statement"
              style={{
                fontSize: "clamp(20px, 2.2vw, 28px)",
                fontWeight: 300,
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: "var(--text-cream)",
                textWrap: "balance",
                maxWidth: "34ch",
                willChange: "opacity, transform",
              }}
            >
              Extracción de Insights del Consumidor/Usuario que detonan el
              DESEO irracional y construyen una lealtad de tipo “Brand
              Crusader”.
            </p>
          </div>

          <div className="md:border-l md:border-[color:var(--line-cool)] md:pl-[clamp(24px,3vw,48px)]">
            <span
              className="mb-4 block text-[11px] uppercase text-[color:var(--text-fog)]"
              style={{ letterSpacing: "0.12em" }}
            >
              Dimensión Producto · Meta: Necesidad
            </span>
            <p
              data-signal-interpretation-human
              className="signal-interpretation-statement"
              style={{
                fontSize: "clamp(20px, 2.2vw, 28px)",
                fontWeight: 300,
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: "var(--text-cream)",
                textWrap: "balance",
                maxWidth: "34ch",
                willChange: "opacity, transform",
              }}
            >
              Mapeo del Journey del Consumidor/Usuario para satisfacer la
              NECESIDAD básica y elevarla a una solución de vida indispensable
              y sin fricciones.
            </p>
          </div>
        </div>

        <p
          data-signal-interpretation-resolve
          className="mt-[clamp(32px,3.6vw,56px)] text-[color:var(--text-dim)]"
          style={{
            fontSize: "clamp(15px, 1.05vw, 17px)",
            lineHeight: 1.55,
            letterSpacing: "-0.005em",
            maxWidth: "60ch",
            willChange: "opacity, transform",
          }}
        >
          Nuestra metodología alinea estas dos fuerzas para crear una
          propuesta de valor inexpugnable.
        </p>
      </div>
    </section>
  );
}
