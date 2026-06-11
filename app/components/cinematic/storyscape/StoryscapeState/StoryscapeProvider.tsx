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
 * StoryscapeProvider — chapter-scoped runtime state for HC-05 ·
 * ACT A · Storyscape (ChapterId="editorial").
 *
 * Mirrors HeroProvider / MethodologyProvider / SignalProvider /
 * CapabilitiesProvider / ClosingProvider exactly. The chapter does
 * NOT invent new abstractions; it reuses the canonical shape so
 * motion controllers binding to the chapter root re-run their
 * effects the moment the DOM materializes.
 *
 * Owns:
 *  - chapterPhase: "pre" / "settled" / "exiting"
 *  - progress: 0..1 scroll signal across the chapter root
 *  - root: chapter <section> element (registered by StoryscapeScene)
 *
 * Root is STATE so StoryscapeProgressController re-creates its
 * ScrollTrigger when the DOM commit lands after first paint.
 */

export type StoryscapeChapterPhase = "pre" | "settled" | "exiting";

type StoryscapeContextValue = {
  chapterPhase: StoryscapeChapterPhase;
  setChapterPhase: (p: StoryscapeChapterPhase) => void;
  progress: number;
  setProgress: (p: number) => void;
  root: HTMLElement | null;
  registerRoot: (el: HTMLElement | null) => void;
};

const StoryscapeContext = createContext<StoryscapeContextValue | null>(null);

export function StoryscapeProvider({ children }: { children: ReactNode }) {
  const [chapterPhase, setChapterPhase] =
    useState<StoryscapeChapterPhase>("pre");
  const [progress, setProgress] = useState(0);
  const [root, setRoot] = useState<HTMLElement | null>(null);

  const registerRoot = useCallback((el: HTMLElement | null) => {
    setRoot(el);
  }, []);

  const value = useMemo<StoryscapeContextValue>(
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

  return (
    <StoryscapeContext.Provider value={value}>
      {children}
    </StoryscapeContext.Provider>
  );
}

export function useStoryscape(): StoryscapeContextValue {
  const ctx = useContext(StoryscapeContext);
  if (!ctx) {
    throw new Error("useStoryscape() must be used inside <StoryscapeProvider>");
  }
  return ctx;
}
