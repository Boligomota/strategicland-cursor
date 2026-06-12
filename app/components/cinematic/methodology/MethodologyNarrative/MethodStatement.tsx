"use client";

/**
 * MethodStatement — HC-02 method manifest (Scene 2, T02).
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §02 —
 * Descriptivo Profundo literal (both paragraphs).
 *
 * PRESENTATION SOURCE: approved HTML reference .manifesto section —
 * 12vw vertical padding, 12-column grid, monospace index column
 * (1/3, right-aligned), italic serif quote (4/11), supporting text
 * (6/10) offset below.
 *
 * Sentence-level <span>s are kept so MethodologyReveal can target
 * `.methodology-statement-line` for the reveal cascade.
 */

const STATEMENT_LINES = [
  "wmn/nd no es una agencia de publicidad;",
  "es una Oficina Multidisciplinar Estratégica.",
] as const;

export function MethodStatement() {
  return (
    <section
      data-methodology-scene="statement"
      data-density-tier="T02"
      className="relative w-full"
      style={{ padding: "12vw 0" }}
    >
      <div className="grid-12 container-pad items-center">
        <div
          data-methodology-eyebrow
          className="manifesto-index text-mono system-meta"
        >
          <span>El Manifiesto</span>
          <span>La Destrucción del Humo</span>
        </div>

        <div
          className="manifesto-text"
          style={{ gridColumn: "4 / 11", marginTop: 0 }}
        >
          <p
            data-methodology-statement-lead
            className="methodology-statement-line"
          >
            En una era de saturación absoluta y &ldquo;Brain Rot&rdquo;
            algorítmico, las marcas se han extraviado en métricas de vanidad
            que no mueven el P&amp;L.
          </p>
        </div>

        <h2 data-methodology-statement className="manifesto-quote">
          {STATEMENT_LINES.map((line, i) => (
            <span key={i} className="methodology-statement-line block">
              {line}
            </span>
          ))}
        </h2>

        <div className="manifesto-text">
          <p
            data-methodology-statement-subline
            className="methodology-statement-line"
          >
            Nuestra metodología desmantela la complejidad del ecosistema
            digital para devolverle al marketing su única función legítima: la
            generación de capital de mercado tangible.
          </p>
          <p
            data-methodology-statement-closing
            className="methodology-statement-line"
          >
            Operamos en la zona donde la estrategia pragmática de la Gen X se
            encuentra con la disrupción nativa de la Gen Z / Centennials y el
            enfoque premium de la Silver Generation. Aseguramos que cada
            decibelio de &ldquo;ruido&rdquo; generado sea una inversión con
            retorno medible, no un gasto publicitario efímero.
          </p>
        </div>
      </div>
    </section>
  );
}
