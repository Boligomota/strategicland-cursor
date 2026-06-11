"use client";

import { useId } from "react";

/**
 * AtmosphericPlaceholder — procedural SVG plate that holds the visual
 * slot until a real documentary image lands in `public/images/...`.
 *
 * Per .rules/image-treatment-system.mdc §10:
 *   "For below-fold, allow native lazy-load with no placeholder
 *    (atmosphere holds the visual until image arrives). LQIP color
 *    must match chapter atmosphere — never gray."
 *
 * This component IS that "atmosphere holds the visual" expression for
 * pre-asset development. It is NOT a "missing image" indicator and does
 * NOT pretend to be photographic. It is an atmospheric absence — a
 * warm-black noise field with a soft radial weight that integrates
 * cleanly with the system layer.
 *
 * Variants tune the noise envelope to match the host chapter's tone:
 *  - architectural (HC-02): tighter directional noise, vertical pulse
 *  - documentary   (HC-03 fragments / interpretation): organic noise
 *  - peak          (HC-03 constellation): looser, more saturated glow
 *
 * No CPU loops, no rAF, no perpetual motion. The browser composites
 * the SVG once and caches the filter result. `shape-rendering` is
 * `optimizeSpeed` because subpixel detail is irrelevant at this scale.
 */

export type AtmosphericPlaceholderVariant =
  | "architectural"
  | "documentary"
  | "peak";

type AtmosphericPlaceholderProps = {
  variant?: AtmosphericPlaceholderVariant;
};

function noiseFrequency(variant: AtmosphericPlaceholderVariant): string {
  switch (variant) {
    case "architectural":
      return "0.9 0.04";
    case "documentary":
      return "0.6 0.6";
    case "peak":
      return "0.4 0.4";
  }
}

function glowStops(
  variant: AtmosphericPlaceholderVariant
): { offset: string; color: string }[] {
  switch (variant) {
    case "architectural":
      return [
        { offset: "0%", color: "rgba(217, 196, 154, 0.08)" },
        { offset: "55%", color: "rgba(22, 19, 16, 0.55)" },
        { offset: "100%", color: "rgba(10, 9, 7, 0.95)" },
      ];
    case "documentary":
      return [
        { offset: "0%", color: "rgba(237, 230, 216, 0.06)" },
        { offset: "60%", color: "rgba(22, 19, 16, 0.6)" },
        { offset: "100%", color: "rgba(10, 9, 7, 0.95)" },
      ];
    case "peak":
      return [
        { offset: "0%", color: "rgba(217, 196, 154, 0.12)" },
        { offset: "50%", color: "rgba(22, 19, 16, 0.55)" },
        { offset: "100%", color: "rgba(10, 9, 7, 0.92)" },
      ];
  }
}

export function AtmosphericPlaceholder({
  variant = "documentary",
}: AtmosphericPlaceholderProps) {
  const id = useId();
  const noiseId = `${id}-noise`.replace(/[^\w-]/g, "");
  const glowId = `${id}-glow`.replace(/[^\w-]/g, "");
  const stops = glowStops(variant);

  return (
    <svg
      aria-hidden
      className="atmospheric-placeholder"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      shapeRendering="optimizeSpeed"
    >
      <defs>
        <filter id={noiseId} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={noiseFrequency(variant)}
            numOctaves={2}
            seed={3}
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.55 0 0 0 0 0.5 0 0 0 0 0.45 0 0 0 0.35 0"
          />
        </filter>
        <radialGradient id={glowId} cx="50%" cy="40%" r="70%">
          {stops.map((stop) => (
            <stop
              key={stop.offset}
              offset={stop.offset}
              stopColor={stop.color}
            />
          ))}
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#${glowId})`} />
      <rect
        width="100"
        height="100"
        filter={`url(#${noiseId})`}
        opacity="0.45"
      />
    </svg>
  );
}
