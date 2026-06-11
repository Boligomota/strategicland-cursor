"use client";

/**
 * ConversationInvitation — ACT C Scene 1 (T02): the single door.
 *
 * CONTENT SOURCE (immutable law): Mapa de Sitio Estratégico —
 * "Trazabilidad Operativa": the only operational contact data the
 * sitemap defines:
 *
 *   ISABEL LA CATÓLICA 964 | PISO 1, CDMX. 03430. | 044 (55) 1499 3121.
 *
 * SITEMAP COMPLIANCE PASS — removed (no source in the sitemap):
 *  - the invitation statement ("Si algo de lo que atravesó aquí
 *    nombra un problema que ya era suyo…"),
 *  - the eyebrow "Una sola puerta · Sin urgencia",
 *  - the mailto door (conversacion@strategicland.com — neither the
 *    address nor the domain exists in the sitemap).
 *
 * The single-door law survives structurally: one scene, one contact
 * surface, zero marketing chrome. The phone line keeps the
 * magnetic/hover affordance slot ([data-conversation-door-magnet])
 * so ConversationReveal's selector contract stays intact.
 *
 * Density linting attaches via data-density-tier="T02".
 */

const OPERATIONAL_ADDRESS = "Isabel la Católica 964 | Piso 1, CDMX. 03430.";
const OPERATIONAL_PHONE = "044 (55) 1499 3121";

export function ConversationInvitation() {
  return (
    <section
      data-conversation-scene="invitation"
      data-density-tier="T02"
      className="relative w-full"
      style={{
        minHeight: "80vh",
        paddingInline: "clamp(32px, 6vw, 96px)",
        paddingBlock: "14vh",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col">
        <span
          data-conversation-eyebrow
          className="mb-10 block text-[11px] uppercase text-[color:var(--text-fog)] md:mb-12"
          style={{ letterSpacing: "0.12em" }}
        >
          Trazabilidad Operativa
        </span>

        <p
          data-conversation-statement
          className="text-[color:var(--text-cream)]"
          style={{
            maxWidth: "26ch",
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 300,
            lineHeight: 1.18,
            letterSpacing: "-0.02em",
            textWrap: "balance",
          }}
        >
          {OPERATIONAL_ADDRESS}
        </p>

        <div data-conversation-door className="mt-[10vh] md:mt-[12vh]">
          <a
            data-conversation-door-magnet
            data-hover-target
            href={`tel:${OPERATIONAL_PHONE.replace(/[^\d+]/g, "")}`}
            className="sl-door-link text-[color:var(--text-cream)]"
            style={{
              fontSize: "clamp(18px, 1.6vw, 22px)",
              fontWeight: 300,
              lineHeight: 1.55,
              letterSpacing: "-0.005em",
              willChange: "transform",
            }}
          >
            {OPERATIONAL_PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}
