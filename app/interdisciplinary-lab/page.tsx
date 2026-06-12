import {
  createKnowledgePageMetadata,
  KnowledgePageView,
} from "@/app/lib/knowledge/createKnowledgePage";

export const metadata = createKnowledgePageMetadata("interdisciplinary-lab");

export default function InterdisciplinaryLabPage() {
  return <KnowledgePageView slug="interdisciplinary-lab" />;
}
