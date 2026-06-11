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
 * MethodologyProvider — chapter-scoped runtime state for the Methodology
 * chapter (HC-02, ChapterId="editorial").
 *
 * Mirrors HeroProvider intentionally: same surface, same names, same
 * register-as-state pattern. The chapter does NOT invent new abstractions;
 * it reuses the same canonical shape so motion controllers binding to the
 * chapter root re-run their effects the moment the DOM materializes.
 *
 * Owns:
 *  - chapterPhase: "pre" before reveals fire, "settled" once inside the
 *    chapter, "exiting" when scroll passes the bottom-top boundary.
 *  - progress: aggregated 0..1 scroll signal across the chapter root.
 *  - root: the chapter <section> element (registered by MethodologyScene).
 *
 * The root is STATE (not a ref) so MethodologyProgressController re-creates
 * its ScrollTrigger when the DOM commit lands after first paint.
 */

export type MethodologyChapterPhase = "pre" | "settled" | "exiting";

type MethodologyContextValue = {
  chapterPhase: MethodologyChapterPhase;
  setChapterPhase: (p: MethodologyChapterPhase) => void;
  progress: number;
  setProgress: (p: number) => void;
  root: HTMLElement | null;
  registerRoot: (el: HTMLElement | null) => void;
};

const MethodologyContext = createContext<MethodologyContextValue | null>(null);

export function MethodologyProvider({ children }: { children: ReactNode }) {
  const [chapterPhase, setChapterPhase] =
    useState<MethodologyChapterPhase>("pre");
  const [progress, setProgress] = useState(0);
  const [root, setRoot] = useState<HTMLElement | null>(null);

  const registerRoot = useCallback((el: HTMLElement | null) => {
    setRoot(el);
  }, []);

  const value = useMemo<MethodologyContextValue>(
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
    <MethodologyContext.Provider value={value}>
      {children}
    </MethodologyContext.Provider>
  );
}

export function useMethodology(): MethodologyContextValue {
  const ctx = useContext(MethodologyContext);
  if (!ctx) {
    throw new Error(
      "useMethodology() must be used inside <MethodologyProvider>"
    );
  }
  return ctx;
}
