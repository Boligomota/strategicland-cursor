/**
 * TemporalPause — explicit silence between narrative blocks.
 *
 * Per .rules/narrative-density-system.mdc T01 SILENCE tier: chapters need
 * load-bearing emptiness. This component is the typed boundary that
 * declares "this stretch is intentional silence" so density linting can
 * recognize and validate it.
 *
 * Per responsive-system.mdc §10 mobile pacing, holds default longer on
 * mobile (40vh) than on desktop (varies). The `height` prop is the
 * MOBILE hold; `mdHeight` overrides at the md breakpoint upward.
 *
 * Renders a pure-spacer section with no copy, no media, no motion.
 */

type TemporalPauseProps = {
  /** Mobile vertical breathing space (default 40vh per canon). */
  height?: string;
  /** Optional md+ override; falls back to `height` if omitted. */
  mdHeight?: string;
  /** Optional debug label visible only in development. */
  label?: string;
};

export function TemporalPause({
  height = "40vh",
  mdHeight,
  label,
}: TemporalPauseProps) {
  const resolvedMd = mdHeight ?? height;
  const cssVars = {
    "--pause-h": height,
    "--pause-h-md": resolvedMd,
  } as React.CSSProperties;

  return (
    <div
      data-hero-temporal-pause
      data-density-tier="T01"
      aria-hidden
      className="relative w-full h-[var(--pause-h)] md:h-[var(--pause-h-md)]"
      style={cssVars}
    >
      {process.env.NODE_ENV !== "production" && label ? (
        <span
          className="pointer-events-none absolute right-2 top-2 text-[9px] uppercase text-[color:var(--text-fog)] opacity-30"
          style={{ letterSpacing: "0.12em" }}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}
