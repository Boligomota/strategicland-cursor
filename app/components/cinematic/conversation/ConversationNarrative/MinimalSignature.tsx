"use client";

/**
 * MinimalSignature — ACT C terminal surface: the canonical footer
 * signature line.
 *
 * CONTENT SOURCE (immutable law): the wordmark is the literal
 * sitemap titular "WE MAKE NOISE / NOT DIGITAL" (§01 HERO).
 *
 * PRESENTATION SOURCE: approved HTML reference .footer-bottom —
 * monospace 0.65rem grey strip at the very bottom of the umber
 * footer field.
 */
export function MinimalSignature() {
  return (
    <footer
      data-conversation-scene="signature"
      data-density-tier="T01"
      className="container-pad relative w-full"
      style={{ paddingBottom: "2vw" }}
    >
      <div className="footer-bottom text-mono" style={{ marginTop: 0 }}>
        <span data-conversation-signature-line>
          WE MAKE NOISE / NOT DIGITAL
        </span>
      </div>
    </footer>
  );
}
