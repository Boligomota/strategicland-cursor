"use client";

import { EditorialLink } from "@/app/components/interaction/EditorialLink";
import { KNOWLEDGE_ROUTES } from "@/content/knowledge/routes";

/**
 * HumanAITension — HC-02 human + machine tension (Scene 4, T02).
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §03 —
 * Descriptivo Profundo + Enlazamiento Estratégico literal.
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

        <p
          data-methodology-tension-lead
          className="methodology-tension-line"
          style={{ gridColumn: "4 / 11", marginTop: 0 }}
        >
          Somos una Oficina Interdisciplinaria que entiende que
        </p>

        <h2
          data-methodology-tension-statement
          className="methodology-tension-statement manifesto-quote"
        >
          <span className="methodology-tension-line block">
            el futuro de la economía no es humano <em>o</em> máquina, sino lo
            humano <em>potenciado vía</em> máquina.
          </span>
        </h2>

        <div className="manifesto-text">
          <p
            data-methodology-tension-definition
            className="methodology-tension-line"
          >
            Nos definimos como arquitectos de sistemas vivos.
          </p>
          <p
            data-methodology-tension-caption
            className="methodology-tension-line"
          >
            Nuestro equipo no está compuesto por operativos de software, sino
            por{" "}
            <EditorialLink href={KNOWLEDGE_ROUTES["interdisciplinary-lab"]}>
              <strong>Líderes Híbridos</strong>
            </EditorialLink>{" "}
            capaces de orquestar una{" "}
            <strong>&ldquo;Agents Workforce&rdquo;</strong> (agentes de IA) sin
            comprometer el juicio crítico ni la ética humana. Nuestra ventaja
            competitiva radica en la{" "}
            <strong>Capa Semántica Unificada</strong>: una estructura de trabajo
            donde la precisión de los datos masivos y la intuición humana
            irreducible operan bajo una misma base de verdad auditable.
          </p>
        </div>
      </div>
    </section>
  );
}
