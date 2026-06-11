"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * CaseProvider — chapter-scoped runtime state for the Case chapter
 * (ChapterId="case").
 *
 * Mirrors HeroProvider / MethodologyProvider intentionally: same surface,
 * same names, same register-as-state pattern. The chapter does NOT invent
 * new abstractions; it reuses the canonical shape so motion controllers
 * binding to the chapter root re-run their effects the moment the DOM
 * materializes.
 *
 * Owns:
 *  - chapterPhase: "pre" before reveals fire, "settled" once inside the
 *    chapter, "exiting" when scroll passes the bottom-top boundary.
 *  - progress: aggregated 0..1 scroll signal across the chapter root.
 *  - root: the chapter <section> element (registered by CaseScene).
 *
 * The root is STATE (not a ref) so CaseProgressController and
 * CaseHorizontalTransport re-create their ScrollTriggers when the DOM
 * commit lands after first paint.
 */

export type CaseChapterPhase = "pre" | "settled" | "exiting";

type CaseContextValue = {
  chapterPhase: CaseChapterPhase;
  setChapterPhase: (p: CaseChapterPhase) => void;
  progress: number;
  setProgress: (p: number) => void;
  root: HTMLElement | null;
  registerRoot: (el: HTMLElement | null) => void;
};

const CaseContext = createContext<CaseContextValue | null>(null);

export function CaseProvider({ children }: { children: ReactNode }) {
  const [chapterPhase, setChapterPhase] = useState<CaseChapterPhase>("pre");
  const [progress, setProgress] = useState(0);
  const [root, setRoot] = useState<HTMLElement | null>(null);

  const registerRoot = useCallback((el: HTMLElement | null) => {
    setRoot(el);
  }, []);

  const value = useMemo<CaseContextValue>(
    () => ({
      chapterPhase,
      setChapterPhase,
      progress,
      setProgress,
      root,
      registerRoot,
    }),
    [chapterPhase, progress, root, registerRoot]
  );

  return <CaseContext.Provider value={value}>{children}</CaseContext.Provider>;
}

export function useCase(): CaseContextValue {
  const ctx = useContext(CaseContext);
  if (!ctx) throw new Error("useCase() must be used inside <CaseProvider>");
  return ctx;
}
