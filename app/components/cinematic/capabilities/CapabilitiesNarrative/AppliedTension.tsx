"use client";

/**
 * AppliedTension — HC-04 THE ENGINE tension peak (Scene 3, T03).
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §06 —
 * "Planeación + Pensamiento Crítico", literal.
 *
 * PRESENTATION SOURCE: approved HTML reference .engine grammar —
 * monospace section header over a hairline, then a 2-column
 * shared-border node pair (teal monospace id + serif statement),
 * resolve line below in the body register. The legacy portrait
 * backplate was retired.
 *
 * Reveal targets preserved:
 *  - [data-capabilities-tension-capacity] / -consequence / -resolve
 */
export function AppliedTension() {
  return (
    <section
      data-capabilities-scene="tension"
      data-density-tier="T03"
      className="relative w-full"
      style={{ padding: "8vw 0" }}
    >
      <div className="grid-12 container-pad">
        <div className="section-header text-mono">
          <span data-capabilities-section-eyebrow>
            Planeación + Pensamiento Crítico
          </span>
        </div>

        <div
          className="engine-grid engine-grid-2"
          style={{ gridColumn: "1 / -1" }}
        >
          <div className="engine-node">
            <span className="text-mono node-id">Business Intelligence</span>
            <h3
              data-capabilities-tension-capacity
              className="capabilities-tension-statement"
            >
              Aquí los datos mueren para convertirse en pilares estratégicos
              de alto rendimiento.
            </h3>
          </div>

          <div className="engine-node">
            <span className="text-mono node-id">Pensamiento Crítico</span>
            <h3
              data-capabilities-tension-consequence
              className="capabilities-tension-statement"
            >
              El filtro humano irreducible.
            </h3>
          </div>
        </div>

        <p
          data-capabilities-tension-resolve
          style={{ gridColumn: "1 / 9", marginTop: "3rem" }}
        >
          Nuestra capacidad de discernir lo relevante de lo ruidoso, ponerlo
          en un lugar adecuado y hacer de lo complejo algo claro y explícito.
          Rechazamos la creencia ciega en la información de nuevas Apps o
          métricas automatizadas para entregar estrategias ancladas en la
          realidad de los negocios.
        </p>
      </div>
    </section>
  );
}
