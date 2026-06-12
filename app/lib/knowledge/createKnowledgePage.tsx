import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KnowledgeChapter, KnowledgeCoda } from "@/app/components/cinematic/knowledge";
import { getKnowledgePage } from "@/content/knowledge/registry";
import type { KnowledgePageSlug } from "@/content/knowledge/types";

/**
 * Factory for static knowledge routes — keeps page.tsx files declarative.
 */
export function createKnowledgePageMetadata(slug: KnowledgePageSlug): Metadata {
  const pageData = getKnowledgePage(slug);
  if (!pageData) return {};
  return {
    title: pageData.seo.title,
    description: pageData.seo.description,
  };
}

export function KnowledgePageView({ slug }: { slug: KnowledgePageSlug }) {
  const pageData = getKnowledgePage(slug);
  if (!pageData) notFound();

  return (
    <main className="relative w-full">
      <KnowledgeChapter pageData={pageData} />
      <KnowledgeCoda pageData={pageData} />
    </main>
  );
}
