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
 * SignalProvider — chapter-scoped runtime state for the Signal /
 * Intelligence chapter (HC-03, ChapterId="cultural").
 *
 * Mirrors HeroProvider / MethodologyProvider exactly: same surface,
 * same names, same register-as-state pattern. The chapter does NOT
 * invent new abstractions; it reuses the canonical shape so motion
 * controllers binding to the chapter root re-run their effects the
 * moment the DOM materializes.
 *
 * Owns:
 *  - chapterPhase: "pre" before reveals fire, "settled" once inside
 *    the chapter, "exiting" when scroll passes the bottom-top boundary.
 *  - progress: aggregated 0..1 scroll signal across the chapter root.
 *  - root: the chapter <section> element (registered by SignalScene).
 *
 * Root is STATE (not a ref) so SignalProgressController re-creates its
 * ScrollTrigger when the DOM commit lands after first paint.
 */

export type SignalChapterPhase = "pre" | "settled" | "exiting";

type SignalContextValue = {
  chapterPhase: SignalChapterPhase;
  setChapterPhase: (p: SignalChapterPhase) => void;
  progress: number;
  setProgress: (p: number) => void;
  root: HTMLElement | null;
  registerRoot: (el: HTMLElement | null) => void;
};

const SignalContext = createContext<SignalContextValue | null>(null);

export function SignalProvider({ children }: { children: ReactNode }) {
  const [chapterPhase, setChapterPhase] = useState<SignalChapterPhase>("pre");
  const [progress, setProgress] = useState(0);
  const [root, setRoot] = useState<HTMLElement | null>(null);

  const registerRoot = useCallback((el: HTMLElement | null) => {
    setRoot(el);
  }, []);

  const value = useMemo<SignalContextValue>(
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
    <SignalContext.Provider value={value}>{children}</SignalContext.Provider>
  );
}

export function useSignal(): SignalContextValue {
  const ctx = useContext(SignalContext);
  if (!ctx) {
    throw new Error("useSignal() must be used inside <SignalProvider>");
  }
  return ctx;
}
