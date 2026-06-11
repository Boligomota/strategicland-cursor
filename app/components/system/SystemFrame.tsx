/**
 * SystemFrame — inset architectural border. Site-wide system element.
 *
 * Promoted from app/components/cinematic/hero/HeroFrame during HC-01
 * stabilization. Lives in root layout; persists across chapters.
 *
 * Responsive inset establishes the canonical mobile framing rhythm:
 *   frame inset (16px) → 8px channel → content inset (24px)
 * so every content layer (hero, philosophy, rail, meta) shares the same
 * architectural margin and the frame reads as the outer boundary instead
 * of a competing element.
 *
 * z-index 100 (above content, below SystemMetaNav z101).
 */
export function SystemFrame() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-[2vw] z-[100] rounded-[4px] border border-[rgba(237,230,216,0.03)] max-md:inset-5"
    />
  );
}
