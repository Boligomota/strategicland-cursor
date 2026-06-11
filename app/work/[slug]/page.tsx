import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCases, getCase } from "@/content/work/registry";
import { CaseChapter, WorkCoda } from "@/app/components/cinematic/case";

/**
 * /work/[slug] — evidence route for the M-04 case system.
 *
 * Composes chapters declaratively per the approved M-04 blueprint §1:
 *
 *  <CaseChapter />   ChapterId "case"    · 5 canonical scenes
 *                    (T03 intro → T04 frame → T05 pinned → T04
 *                    release → T02 caption) — ends on T02 per canon.
 *  <WorkCoda />      ChapterId "closing" · compressed coda + return /
 *                    next-case threshold cues.
 *
 * Page-level rules satisfied: ends with `closing`, single pinned
 * section (1/2), no adjacent chapter-type repetition. Route budgets:
 * type.display 1/2 (CaseHero title) · HeroImage 1/2 (CaseHero plate)
 * · type.epic 0/1.
 *
 * Next 16 conventions (node_modules/next/dist/docs/01-app):
 *  - `params` is a Promise — resolved with `await params`.
 *  - generateStaticParams() → full SSG from the case registry.
 *  - Unknown slug → notFound().
 *
 * Global providers + system layers (loader, frame, grain, cursor,
 * meta-nav) are inherited from app/layout.tsx — this route mounts
 * nothing system-level. Pages never contain layout, GSAP, or
 * atmosphere code — only chapter composition.
 */

export function generateStaticParams() {
  return getAllCases().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseData = getCase(slug);
  if (!caseData) return {};
  return {
    title: caseData.seo.title,
    description: caseData.seo.description,
  };
}

export default async function WorkCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseData = getCase(slug);
  if (!caseData) notFound();

  return (
    <main className="relative w-full">
      <CaseChapter caseData={caseData} />
      <WorkCoda caseData={caseData} />
    </main>
  );
}
