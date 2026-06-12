import {
  createKnowledgePageMetadata,
  KnowledgePageView,
} from "@/app/lib/knowledge/createKnowledgePage";

export const metadata = createKnowledgePageMetadata("strategic-brain");

export default function StrategicBrainPage() {
  return <KnowledgePageView slug="strategic-brain" />;
}
