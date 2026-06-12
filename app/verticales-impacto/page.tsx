import {
  createKnowledgePageMetadata,
  KnowledgePageView,
} from "@/app/lib/knowledge/createKnowledgePage";

export const metadata = createKnowledgePageMetadata("verticales-impacto");

export default function VerticalesImpactoPage() {
  return <KnowledgePageView slug="verticales-impacto" />;
}
