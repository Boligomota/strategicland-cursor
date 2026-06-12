"use client";

/**
 * HumanInterpretation — HC-03 INPUT CORE analysis results (T03).
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §05 —
 * "Resultado del Análisis", literal sitemap wording.
 *
 * PRESENTATION SOURCE: approved HTML reference .engine grammar —
 * monospace section header over a hairline, then a 2-column
 * shared-border node pair (teal monospace id + serif statement),
 * resolve line below in the body register.
 *
 * Reveal targets preserved:
 *  - [data-signal-interpretation-machine] / -human / -resolve
 */
export function HumanInterpretation() {
  return (
    <section
      data-signal-scene="interpretation"
      data-density-tier="T03"
      className="relative w-full"
      style={{ padding: "8vw 0" }}
    >
      <div className="grid-12 container-pad">
        <div className="section-header text-mono">
          <span data-signal-section-eyebrow>Resultados de análisis</span>
        </div>

        <div className="engine-grid engine-grid-2" style={{ gridColumn: "1 / -1" }}>
          <div className="engine-node">
            <span className="text-mono node-id">
              Dimensión Marca · Meta: Deseo
            </span>
            <h3
              data-signal-interpretation-machine
              className="signal-interpretation-statement"
            >
              Extracción de Insights del Consumidor/Usuario que detonan el
              DESEO irracional y construyen una lealtad de tipo “Brand
              Crusader”.
            </h3>
          </div>

          <div className="engine-node">
            <span className="text-mono node-id">
              Dimensión Producto · Meta: Necesidad
            </span>
            <h3
              data-signal-interpretation-human
              className="signal-interpretation-statement"
            >
              Mapeo del Journey del Consumidor/Usuario para satisfacer la
              NECESIDAD básica y elevarla a una solución de vida indispensable
              y sin fricciones.
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
