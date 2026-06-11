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
 * CapabilitiesProvider — chapter-scoped runtime state for HC-04 ·
 * Strategic Capabilities (ChapterId="human").
 *
 * Mirrors HeroProvider / MethodologyProvider / SignalProvider exactly.
 * Same surface, same names, same register-as-state pattern. The chapter
 * does NOT invent new abstractions; it reuses the canonical shape so
 * motion controllers binding to the chapter root re-run their effects
 * the moment the DOM materializes.
 *
 * Owns:
 *  - chapterPhase: "pre" before reveals fire, "settled" once inside the
 *    chapter, "exiting" when scroll passes the bottom-top boundary.
 *  - progress: aggregated 0..1 scroll signal across the chapter root.
 *  - root: the chapter <section> element (registered by
 *    CapabilitiesScene).
 *
 * Root is STATE (not a ref) so CapabilitiesProgressController re-creates
 * its ScrollTrigger when the DOM commit lands after first paint.
 */

export type CapabilitiesChapterPhase = "pre" | "settled" | "exiting";

type CapabilitiesContextValue = {
  chapterPhase: CapabilitiesChapterPhase;
  setChapterPhase: (p: CapabilitiesChapterPhase) => void;
  progress: number;
  setProgress: (p: number) => void;
  root: HTMLElement | null;
  registerRoot: (el: HTMLElement | null) => void;
};

const CapabilitiesContext = createContext<CapabilitiesContextValue | null>(
  null
);

export function CapabilitiesProvider({ children }: { children: ReactNode }) {
  const [chapterPhase, setChapterPhase] =
    useState<CapabilitiesChapterPhase>("pre");
  const [progress, setProgress] = useState(0);
  const [root, setRoot] = useState<HTMLElement | null>(null);

  const registerRoot = useCallback((el: HTMLElement | null) => {
    setRoot(el);
  }, []);

  const value = useMemo<CapabilitiesContextValue>(
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
    <CapabilitiesContext.Provider value={value}>
      {children}
    </CapabilitiesContext.Provider>
  );
}

export function useCapabilities(): CapabilitiesContextValue {
  const ctx = useContext(CapabilitiesContext);
  if (!ctx) {
    throw new Error(
      "useCapabilities() must be used inside <CapabilitiesProvider>"
    );
  }
  return ctx;
}
