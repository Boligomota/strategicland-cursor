"use client";

import { useGlobalCursor } from "@/app/providers/GlobalCursorProvider";

/**
 * SystemCursor — visible dual-cursor leaf for GlobalCursorProvider.
 *
 * Renders only the DOM elements (dot + ring). All movement, hover logic,
 * lerp, listener management, and lifecycle is owned by the provider.
 *
 * Mounted once at root layout. Returns null when cursor is disabled
 * (touch device, reduced motion) so the native cursor remains.
 *
 * Canon preserved exactly from HeroCursor:
 *  - 8px dot (a11y-corrected per HTML_CANON §2.5)
 *  - 32px ring at rest, 64px on hover via .sl-cursor-ring.is-hover
 *  - z-index 10000
 */
export function SystemCursor() {
  const { enabled, isHovering, bindDot, bindRing } = useGlobalCursor();

  if (!enabled) return null;

  return (
    <>
      <div
        ref={bindDot}
        aria-hidden
        className="sl-cursor-dot pointer-events-none fixed left-0 top-0 z-[10000] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--text-cream)]"
      />
      <div
        ref={bindRing}
        aria-hidden
        className={
          "sl-cursor-ring pointer-events-none fixed left-0 top-0 z-[10000] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(237,230,216,0.2)]" +
          (isHovering ? " is-hover" : "")
        }
        style={{
          width: 32,
          height: 32,
          transition:
            "width 0.5s cubic-bezier(0.16, 1, 0.3, 1), height 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </>
  );
}
