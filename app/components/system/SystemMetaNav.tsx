"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SystemInstitutionalIndex } from "./SystemInstitutionalIndex";

/**
 * SystemMetaNav — top corners metadata strip. Site-wide system element.
 *
 * Promoted from app/components/cinematic/hero/HeroMetaNav during HC-01
 * stabilization.
 *
 * SITEMAP COMPLIANCE PASS: the prior 4-cell metadata grid (Identity /
 * Domain / Local Time / Status with "Creative Strategy" / "Applied AI
 * Systems" / "Active") had no source in the Mapa de Sitio Estratégico
 * and was removed. The strip now carries only the canonical brand
 * mark "wmn/nd" (literal sitemap identity) and the functional clock.
 *
 * INSTITUTIONAL INDEX PASS: "wmn/nd" is the discoverability entry point
 * for the knowledge ecosystem — opens SystemInstitutionalIndex (editorial
 * archive panel, not a navbar).
 *
 * Mobile cut per responsive-system.mdc §1/§13 ("the same film, shorter
 * cut — never erased"):
 *  - Desktop (md+): wordmark left, HH:MM:SS right.
 *  - Mobile (<md): wordmark left, HH:MM right. Position uses the
 *    SystemFrame inset (20px) so the strip reads as part of the same
 *    frame system.
 *
 * Hydration-safe clock: initial render shows a placeholder so SSR matches
 * client; after mount, a single setInterval(1000) tick refreshes the
 * timestamp. Atmospheric motion restraint pass replaced the prior
 * requestAnimationFrame loop — refreshing a 1-second timestamp at ~60fps
 * is perpetual CPU work without perceptible benefit.
 *
 * Typography pinned to typography-system.mdc §3/§4:
 *  - 11px (type.micro) + 0.12em (track.caps) for all caps.
 *  - 9px micro label sits within micro band; track.caps preserved.
 *
 * z-index 101 (above SystemFrame z100, below SystemCursor z10000).
 */

const PLACEHOLDER_FULL = "—— ——";
const PLACEHOLDER_SHORT = "——";

const WORDMARK_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "1.5rem",
  fontWeight: 600,
  letterSpacing: "0.05em",
  lineHeight: 1.1,
};

function formatTimeFull(d: Date): string {
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  return `${h}:${m}:${s} GMT`;
}

function formatTimeShort(d: Date): string {
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

function InstitutionalWordmark({
  triggerRef,
  open,
  onToggle,
}: {
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      ref={triggerRef}
      type="button"
      className="institutional-wordmark"
      onClick={onToggle}
      aria-expanded={open}
      aria-haspopup="dialog"
      aria-label="Open institutional index"
      style={WORDMARK_STYLE}
    >
      wmn/nd
    </button>
  );
}

export function SystemMetaNav() {
  const [timeFull, setTimeFull] = useState<string>(PLACEHOLDER_FULL);
  const [timeShort, setTimeShort] = useState<string>(PLACEHOLDER_SHORT);
  const [indexOpen, setIndexOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggleIndex = useCallback(() => {
    setIndexOpen((prev) => !prev);
  }, []);

  const closeIndex = useCallback(() => {
    setIndexOpen(false);
  }, []);

  useEffect(() => {
    let lastShort = "";
    const tick = () => {
      const now = new Date();
      setTimeFull(formatTimeFull(now));
      const nextShort = formatTimeShort(now);
      if (nextShort !== lastShort) {
        lastShort = nextShort;
        setTimeShort(nextShort);
      }
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <nav
        aria-label="System meta"
        className="institutional-meta-nav fixed left-0 top-0 z-[101] flex w-full items-start justify-between"
        style={{
          mixBlendMode: "difference",
          color: "#fff",
        }}
      >
        <InstitutionalWordmark
          triggerRef={triggerRef}
          open={indexOpen}
          onToggle={toggleIndex}
        />
        <span
          className="nav-meta md:hidden"
          style={{ fontVariantNumeric: "tabular-nums" }}
          suppressHydrationWarning
        >
          {timeShort}
        </span>
        <span
          className="nav-meta hidden md:inline"
          style={{ fontVariantNumeric: "tabular-nums" }}
          suppressHydrationWarning
        >
          {timeFull}
        </span>
      </nav>

      <SystemInstitutionalIndex
        open={indexOpen}
        onClose={closeIndex}
        triggerRef={triggerRef}
      />
    </>
  );
}
