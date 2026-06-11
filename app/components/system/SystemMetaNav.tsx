"use client";

import { useEffect, useState } from "react";

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

export function SystemMetaNav() {
  const [timeFull, setTimeFull] = useState<string>(PLACEHOLDER_FULL);
  const [timeShort, setTimeShort] = useState<string>(PLACEHOLDER_SHORT);

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
        className="fixed left-5 right-5 top-5 z-[101] flex justify-between text-[11px] uppercase text-[color:var(--text-dim)] md:hidden"
        style={{ letterSpacing: "0.12em" }}
      >
        <span className="font-medium text-[color:var(--text-cream)]">
          wmn/nd
        </span>
        <span
          className="font-medium text-[color:var(--text-cream)]"
          style={{ fontVariantNumeric: "tabular-nums" }}
          suppressHydrationWarning
        >
          {timeShort}
        </span>
      </nav>

      <nav
        aria-label="System meta"
        className="fixed z-[101] hidden justify-between text-[11px] uppercase text-[color:var(--text-dim)] md:flex"
        style={{
          top: "4vw",
          left: "4vw",
          right: "4vw",
          letterSpacing: "0.12em",
        }}
      >
        <span className="font-medium text-[color:var(--text-cream)]">
          wmn/nd
        </span>
        <span
          className="font-medium text-[color:var(--text-cream)]"
          style={{ fontVariantNumeric: "tabular-nums" }}
          suppressHydrationWarning
        >
          {timeFull}
        </span>
      </nav>
    </>
  );
}
