"use client";

/**
 * StrategicCompression — HC-03 threshold transition (T01).
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §05 → §06
 * seam. Diagnostic copy lives in PatternConstellation (canonical arc).
 * This scene is a pure Input Core → The Engine threshold — forward cue
 * only, no duplicated diagnostic content.
 *
 * PRESENTATION SOURCE: approved HTML reference .manifesto grammar —
 * forward cue in the monospace metadata register.
 *
 * Reveal targets preserved:
 *  - [data-signal-compression-cue]
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
        <span
          data-signal-compression-cue
          className="text-mono system-meta"
          style={{
            gridColumn: "1 / -1",
            textAlign: "right",
          }}
        >
          The Engine →
        </span>
      </div>
    </section>
  );
}
