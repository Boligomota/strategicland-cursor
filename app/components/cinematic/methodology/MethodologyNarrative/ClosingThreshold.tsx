"use client";

import { EditorialLink } from "@/app/components/interaction/EditorialLink";
import { KNOWLEDGE_ROUTES } from "@/content/knowledge/routes";

/**
 * ClosingThreshold — HC-02 narrative seam to the next chapter
 * (Scene 5, T01).
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §03 —
 * Enlazamiento Estratégico literal.
 *
 * Forward cue wired to /interdisciplinary-lab via EditorialLink (W1).
 */
export function ClosingThreshold() {
  return (
    <section
      data-methodology-scene="threshold"
      data-density-tier="T01"
      className="container-pad relative flex w-full justify-end"
      style={{ paddingBottom: "8vw" }}
    >
      <p
        data-methodology-threshold-cue
        className="text-mono system-meta methodology-threshold-link"
        style={{ textAlign: "right", maxWidth: "42rem" }}
      >
        Para entender cómo gestionamos esta frontera crítica entre el talento
        humano y la automatización inteligente, explora nuestro{" "}
        <EditorialLink
          href={KNOWLEDGE_ROUTES["interdisciplinary-lab"]}
          className="methodology-threshold-link"
        >
          [INTERDISCIPLINARY LAB: Human x Machine]
        </EditorialLink>
        .
      </p>
    </section>
  );
}
