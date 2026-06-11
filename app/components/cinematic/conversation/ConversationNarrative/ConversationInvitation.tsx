"use client";

/**
 * ConversationInvitation — ACT C Scene 1 (T02): the single door.
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico —
 * "Trazabilidad Operativa": address + phone, literal. Brand mark
 * "wmn/nd" is the canonical sitemap identity (shared with the nav).
 *
 * PRESENTATION SOURCE: approved HTML reference footer — umber
 * field, 12-column footer grid: serif brand block (1/5) and contact
 * block (10/13) with monospace label, supporting line and a
 * teal-underlined monospace contact link.
 *
 * The phone line keeps the magnetic/hover affordance slot
 * ([data-conversation-door-magnet]) so ConversationReveal's
 * selector contract stays intact.
 */

const OPERATIONAL_ADDRESS = "Isabel la Católica 964 | Piso 1, CDMX. 03430.";
const OPERATIONAL_PHONE = "044 (55) 1499 3121";

export function ConversationInvitation() {
  return (
    <section
      data-conversation-scene="invitation"
      data-density-tier="T02"
      className="relative w-full"
      style={{ paddingTop: "6vw" }}
    >
      <div
        className="grid-12 container-pad footer-grid hairline-bottom"
        style={{ paddingBottom: "4rem" }}
      >
        <div className="footer-brand">
          <h2>wmn/nd</h2>
        </div>

        <div className="footer-contact">
          <span
            data-conversation-eyebrow
            className="text-mono"
            style={{
              color: "var(--accent-grey)",
              marginBottom: "1rem",
              display: "block",
            }}
          >
            Trazabilidad Operativa
          </span>

          <p
            data-conversation-statement
            style={{ marginBottom: "1rem", opacity: 0.8 }}
          >
            {OPERATIONAL_ADDRESS}
          </p>

          <div data-conversation-door>
            <a
              data-conversation-door-magnet
              data-hover-target
              href={`tel:${OPERATIONAL_PHONE.replace(/[^\d+]/g, "")}`}
              className="sl-door-link text-mono"
              style={{ color: "var(--text-light)" }}
            >
              {OPERATIONAL_PHONE}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
