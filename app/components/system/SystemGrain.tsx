/**
 * SystemGrain — site-wide cinematic grain overlay.
 *
 * Promoted from app/components/cinematic/hero/HeroAtmosphere/FilmGrain
 * during the TransitionDirector expansion pass. Grain is a film-print
 * signature that persists across every chapter, not a chapter-scoped
 * atmosphere primitive (canon: .rules/atmosphere-system.mdc).
 *
 * Visual canon preserved exactly:
 *  - fixed inset-0
 *  - z-index 101 (top of atmospheric stack per ATMOSPHERIC_LANGUAGE.md §2)
 *  - opacity 0.05, mix-blend-overlay
 *  - SVG turbulence data URI; will be swapped for
 *    public/textures/grain-1024.png once the texture asset ships
 *
 * No interactivity. aria-hidden. pointer-events-none.
 */

const NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.93 0 0 0 0 0.9 0 0 0 0 0.85 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function SystemGrain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[101] opacity-[0.05] mix-blend-overlay"
      style={{
        backgroundImage: NOISE_URI,
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
      }}
    />
  );
}
