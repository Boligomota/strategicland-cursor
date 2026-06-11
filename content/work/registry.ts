import type { CaseData } from "./types";
import { sampleCase } from "./sample-case/case";
import { liturgiaDelEstreno } from "./liturgia-del-estreno/case";
import { materiaQueRecuerda } from "./materia-que-recuerda/case";

/**
 * Case registry — single source of truth for /work/[slug] AND for the
 * homepage evidence layer (HC-05 ACT B).
 *
 * Consumed by:
 *  - app/work/[slug]/page.tsx → generateStaticParams (SSG, zero runtime
 *    fetching) + generateMetadata + render.
 *  - WorkCoda "next case" cue (Sprint 02) → registry order is circular
 *    navigation order.
 *  - ACT B thresholds (Sprint 03) → registry order is the homepage
 *    evidence order: CASES[0] = protagonist threshold (plate 2.39:1),
 *    CASES[1..2] = compact thresholds (plates 2:1 / 3:4). Three cases
 *    on the homepage is the page law (architecture §8) — the act reads
 *    only the first three regardless of archive size.
 *
 * Adding a case = create content/work/<slug>/case.ts and append it
 * here. No component changes.
 */
const CASES: readonly CaseData[] = [
  sampleCase,
  liturgiaDelEstreno,
  materiaQueRecuerda,
];

/**
 * Dev-only structural validation — mirror of the lintPage() pattern
 * (CHAPTER_SYSTEM.md §6). Throws in dev so a malformed case never
 * reaches review; production trusts build-time validation.
 */
function validateCase(c: CaseData): void {
  const problems: string[] = [];

  if (c.sequence.length < 4 || c.sequence.length > 6) {
    problems.push(
      `sequence must have 4–6 slides (canon §3.3), got ${c.sequence.length}`
    );
  }
  if (c.activators.length < 2 || c.activators.length > 3) {
    problems.push(
      `activators must have 2–3 entries (HC-05 §8), got ${c.activators.length}`
    );
  }
  if (c.hero.titleLines.length === 0) {
    problems.push("hero.titleLines must not be empty");
  }
  if (
    !c.threshold.tension.trim() ||
    !c.threshold.decision.trim() ||
    !c.threshold.footprint.trim()
  ) {
    problems.push(
      "threshold requires tension / decision / footprint (HC-05 §8 — the four homepage data points)"
    );
  }

  if (problems.length > 0) {
    throw new Error(
      `[content/work] Invalid case "${c.slug}":\n - ${problems.join("\n - ")}`
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  const seen = new Set<string>();
  for (const c of CASES) {
    if (seen.has(c.slug)) {
      throw new Error(`[content/work] Duplicate case slug "${c.slug}"`);
    }
    seen.add(c.slug);
    validateCase(c);
  }

  // ACT B slot law (architecture §8): the homepage plates use the
  // locked ratio sequence 2.39:1 (protagonist) → 2:1 → 3:4 (compacts).
  const HOMEPAGE_PLATE_RATIOS = ["2.39:1", "2:1", "3:4"] as const;
  CASES.slice(0, 3).forEach((c, i) => {
    if (c.threshold.image.ratio !== HOMEPAGE_PLATE_RATIOS[i]) {
      throw new Error(
        `[content/work] Case "${c.slug}" occupies homepage slot ${i} and must declare threshold plate ratio "${HOMEPAGE_PLATE_RATIOS[i]}", got "${c.threshold.image.ratio}"`
      );
    }
  });
}

export function getAllCases(): readonly CaseData[] {
  return CASES;
}

export function getCase(slug: string): CaseData | undefined {
  return CASES.find((c) => c.slug === slug);
}

/** Circular registry order — feeds the WorkCoda "next case" cue. */
export function getNextCase(slug: string): CaseData | undefined {
  const index = CASES.findIndex((c) => c.slug === slug);
  if (index === -1 || CASES.length < 2) return undefined;
  return CASES[(index + 1) % CASES.length];
}
