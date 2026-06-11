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
 * ClosingProvider — chapter-scoped runtime state for HC-05 ·
 * Future Memory (ChapterId="closing").
 *
 * Mirrors HeroProvider / MethodologyProvider / SignalProvider /
 * CapabilitiesProvider exactly. The chapter does NOT invent new
 * abstractions; it reuses the canonical shape so motion controllers
 * binding to the chapter root re-run their effects the moment the
 * DOM materializes.
 *
 * Owns:
 *  - chapterPhase: "pre" / "settled" / "exiting"
 *  - progress: 0..1 scroll signal across the chapter root
 *  - root: chapter <section> element (registered by ClosingScene)
 *
 * Root is STATE so ClosingProgressController re-creates its
 * ScrollTrigger when the DOM commit lands after first paint.
 */

export type ClosingChapterPhase = "pre" | "settled" | "exiting";

type ClosingContextValue = {
  chapterPhase: ClosingChapterPhase;
  setChapterPhase: (p: ClosingChapterPhase) => void;
  progress: number;
  setProgress: (p: number) => void;
  root: HTMLElement | null;
  registerRoot: (el: HTMLElement | null) => void;
};

const ClosingContext = createContext<ClosingContextValue | null>(null);

export function ClosingProvider({ children }: { children: ReactNode }) {
  const [chapterPhase, setChapterPhase] = useState<ClosingChapterPhase>("pre");
  const [progress, setProgress] = useState(0);
  const [root, setRoot] = useState<HTMLElement | null>(null);

  const registerRoot = useCallback((el: HTMLElement | null) => {
    setRoot(el);
  }, []);

  const value = useMemo<ClosingContextValue>(
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
    <ClosingContext.Provider value={value}>{children}</ClosingContext.Provider>
  );
}

export function useClosing(): ClosingContextValue {
  const ctx = useContext(ClosingContext);
  if (!ctx) {
    throw new Error("useClosing() must be used inside <ClosingProvider>");
  }
  return ctx;
}
