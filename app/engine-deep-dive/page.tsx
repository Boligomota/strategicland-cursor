import {
  createKnowledgePageMetadata,
  KnowledgePageView,
} from "@/app/lib/knowledge/createKnowledgePage";

export const metadata = createKnowledgePageMetadata("engine-deep-dive");

export default function EngineDeepDivePage() {
  return <KnowledgePageView slug="engine-deep-dive" />;
}
