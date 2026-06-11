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
 * ShowcaseProvider — chapter-scoped runtime state for HC-05 ·
 * ACT B · Showcase (ChapterId="case").
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
 *  - root: chapter <section> element (registered by ShowcaseScene)
 *
 * Root is STATE so ShowcaseProgressController re-creates its
 * ScrollTrigger when the DOM commit lands after first paint.
 */

export type ShowcaseChapterPhase = "pre" | "settled" | "exiting";

type ShowcaseContextValue = {
  chapterPhase: ShowcaseChapterPhase;
  setChapterPhase: (p: ShowcaseChapterPhase) => void;
  progress: number;
  setProgress: (p: number) => void;
  root: HTMLElement | null;
  registerRoot: (el: HTMLElement | null) => void;
};

const ShowcaseContext = createContext<ShowcaseContextValue | null>(null);

export function ShowcaseProvider({ children }: { children: ReactNode }) {
  const [chapterPhase, setChapterPhase] = useState<ShowcaseChapterPhase>("pre");
  const [progress, setProgress] = useState(0);
  const [root, setRoot] = useState<HTMLElement | null>(null);

  const registerRoot = useCallback((el: HTMLElement | null) => {
    setRoot(el);
  }, []);

  const value = useMemo<ShowcaseContextValue>(
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
    <ShowcaseContext.Provider value={value}>
      {children}
    </ShowcaseContext.Provider>
  );
}

export function useShowcase(): ShowcaseContextValue {
  const ctx = useContext(ShowcaseContext);
  if (!ctx) {
    throw new Error("useShowcase() must be used inside <ShowcaseProvider>");
  }
  return ctx;
}
