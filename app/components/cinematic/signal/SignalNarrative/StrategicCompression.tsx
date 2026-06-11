"use client";

/**
 * StrategicCompression — HC-03 closing realization (T01).
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §05 —
 * the misalignment consequence sentence, literal. Forward cue names
 * THE ENGINE (§06).
 *
 * PRESENTATION SOURCE: approved HTML reference .manifesto grammar —
 * italic serif quote on the editorial grid, forward cue in the
 * monospace metadata register. The legacy anamorphic backplate was
 * retired with the cinematic system.
 *
 * Reveal targets preserved:
 *  - [data-signal-compression-statement] / [data-signal-compression-cue]
 */
export function StrategicCompression() {
  return (
    <section
      data-signal-scene="compression"
      data-density-tier="T01"
      className="relative w-full"
      style={{ padding: "8vw 0" }}
    >
      <div className="grid-12 container-pad">
        <h2
          data-signal-compression-statement
          className="manifesto-quote"
        >
          Si existe un desfase entre lo que la marca dice representar y lo que
          el producto resuelve en la realidad, el resultado es ruido
          irrelevante.
        </h2>

        <span
          data-signal-compression-cue
          className="text-mono system-meta"
          style={{
            gridColumn: "1 / -1",
            marginTop: "4rem",
            textAlign: "right",
          }}
        >
          The Engine →
        </span>
      </div>
    </section>
  );
}
