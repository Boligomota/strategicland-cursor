"use client";

/**
 * HumanAITension — HC-02 human + machine tension (Scene 4, T02).
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §03 —
 * statement + caption literal.
 *
 * PRESENTATION SOURCE: approved HTML reference .manifesto grammar —
 * monospace index column, italic serif quote, supporting text
 * offset below. The legacy screen-blend backplate was retired with
 * the cinematic atmosphere system.
 *
 * Reveal targets preserved:
 *  - `.methodology-tension-statement` / [data-methodology-tension-statement]
 *  - `.methodology-tension-caption` / [data-methodology-tension-caption]
 */
export function HumanAITension() {
  return (
    <section
      data-methodology-scene="tension"
      data-density-tier="T02"
      className="relative w-full"
      style={{ padding: "8vw 0" }}
    >
      <div className="grid-12 container-pad items-center">
        <div className="manifesto-index text-mono system-meta">
          <span>¿Quiénes Somos?</span>
          <span>Identidad Híbrida y Autoridad</span>
        </div>

        <h2
          data-methodology-tension-statement
          className="methodology-tension-statement manifesto-quote"
        >
          El futuro de la economía no es humano o máquina, sino lo humano
          potenciado vía máquina.
        </h2>

        <div className="manifesto-text">
          <p
            data-methodology-tension-caption
            className="methodology-tension-caption"
          >
            Líderes Híbridos capaces de orquestar una “Agents Workforce” sin
            comprometer el juicio crítico ni la ética humana. Nuestra ventaja
            competitiva radica en la Capa Semántica Unificada: una estructura
            de trabajo donde la precisión de los datos masivos y la intuición
            humana irreducible operan bajo una misma base de verdad auditable.
          </p>
        </div>
      </div>
    </section>
  );
}
