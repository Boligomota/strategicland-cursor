"use client";

import { EditorialLink } from "@/app/components/interaction/EditorialLink";
import { KNOWLEDGE_ROUTES } from "@/content/knowledge/routes";

/**
 * OperationalThreshold — HC-04 closing silence (Scene 5, T01).
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico §06 —
 * Enlazamiento Estratégico literal.
 *
 * Strategic Brain cue + Engine deep-dive CTA wired via EditorialLink.
 */
export function OperationalThreshold() {
  return (
    <section
      data-capabilities-scene="threshold"
      data-density-tier="T01"
      className="container-pad relative flex w-full flex-col items-end"
      style={{ paddingBottom: "8vw", gap: "1.5rem" }}
    >
      <p
        data-capabilities-threshold-cue
        className="text-mono system-meta methodology-threshold-link"
        style={{ textAlign: "right", maxWidth: "42rem" }}
      >
        Accede a nuestro repositorio de señales de mercado y visión
        prospectiva en{" "}
        <EditorialLink
          href={KNOWLEDGE_ROUTES["strategic-brain"]}
          className="methodology-threshold-link"
        >
          [THE STRATEGIC BRAIN 2026]
        </EditorialLink>
        .
      </p>

      <p
        data-capabilities-threshold-deep-dive
        className="text-mono system-meta methodology-threshold-link"
        style={{ textAlign: "right", maxWidth: "42rem" }}
      >
        <EditorialLink
          href={KNOWLEDGE_ROUTES["engine-deep-dive"]}
          className="methodology-threshold-link"
        >
          [¿Cómo desmantelamos la complejidad? Ver Proceso Interno]
        </EditorialLink>
      </p>
    </section>
  );
}
