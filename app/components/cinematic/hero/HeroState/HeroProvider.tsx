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
 * HeroProvider — chapter-scoped runtime state for the Hero chapter.
 *
 * Site-wide concerns (loader, cursor, frame, meta-nav, transitions) live
 * in app/providers/* + app/components/system/*. This provider only owns
 * what is chapter-local:
 *
 *  - chapterPhase: "pre" while site intake is still running, "settled"
 *    once we are inside the chapter, "exiting" once the scroll has passed
 *    the chapter's bottom-top boundary.
 *  - progress: aggregated 0..1 scroll signal across the chapter root.
 *  - root: the chapter <main> element (registered by HeroScene).
 *
 * The root element is STATE, not a ref, so downstream motion controllers
 * (HorizontalTransport, DensityTransition, etc.) re-run their effects
 * when the root mounts after HeroScene's first paint.
 *
 * Note: intake completion is owned by TransitionDirectorProvider. Motion
 * controllers read isIntakeComplete directly from useTransitionDirector;
 * they no longer gate on chapterPhase.
 */

export type HeroChapterPhase = "pre" | "settled" | "exiting";

type HeroContextValue = {
  chapterPhase: HeroChapterPhase;
  setChapterPhase: (p: HeroChapterPhase) => void;
  progress: number;
  setProgress: (p: number) => void;
  root: HTMLElement | null;
  registerRoot: (el: HTMLElement | null) => void;
};

const HeroContext = createContext<HeroContextValue | null>(null);

export function HeroProvider({ children }: { children: ReactNode }) {
  const [chapterPhase, setChapterPhase] = useState<HeroChapterPhase>("pre");
  const [progress, setProgress] = useState(0);
  const [root, setRoot] = useState<HTMLElement | null>(null);

  const registerRoot = useCallback((el: HTMLElement | null) => {
    setRoot(el);
  }, []);

  const value = useMemo<HeroContextValue>(
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

  return <HeroContext.Provider value={value}>{children}</HeroContext.Provider>;
}

export function useHero(): HeroContextValue {
  const ctx = useContext(HeroContext);
  if (!ctx) throw new Error("useHero() must be used inside <HeroProvider>");
  return ctx;
}
