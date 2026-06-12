"use client";

import type { KnowledgePageData } from "@/content/knowledge/types";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type KnowledgeChapterPhase = "pre" | "settled" | "exiting";

type KnowledgeContextValue = {
  pageData: KnowledgePageData;
  chapterPhase: KnowledgeChapterPhase;
  setChapterPhase: (p: KnowledgeChapterPhase) => void;
  progress: number;
  setProgress: (p: number) => void;
  root: HTMLElement | null;
  registerRoot: (el: HTMLElement | null) => void;
};

const KnowledgeContext = createContext<KnowledgeContextValue | null>(null);

export function KnowledgeProvider({
  pageData,
  children,
}: {
  pageData: KnowledgePageData;
  children: ReactNode;
}) {
  const [chapterPhase, setChapterPhase] =
    useState<KnowledgeChapterPhase>("pre");
  const [progress, setProgress] = useState(0);
  const [root, setRoot] = useState<HTMLElement | null>(null);

  const registerRoot = useCallback((el: HTMLElement | null) => {
    setRoot(el);
  }, []);

  const value = useMemo<KnowledgeContextValue>(
    () => ({
      pageData,
      chapterPhase,
      setChapterPhase,
      progress,
      setProgress,
      root,
      registerRoot,
    }),
    [pageData, chapterPhase, progress, root, registerRoot]
  );

  return (
    <KnowledgeContext.Provider value={value}>
      {children}
    </KnowledgeContext.Provider>
  );
}

export function useKnowledge(): KnowledgeContextValue {
  const ctx = useContext(KnowledgeContext);
  if (!ctx) {
    throw new Error("useKnowledge() must be used inside <KnowledgeProvider>");
  }
  return ctx;
}
