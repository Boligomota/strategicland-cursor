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
 * ConversationProvider — chapter-scoped runtime state for HC-05 ·
 * ACT C · Conversation (ChapterId="closing").
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
 *  - root: chapter <section> element (registered by ConversationScene)
 *
 * Root is STATE so ConversationProgressController re-creates its
 * ScrollTrigger when the DOM commit lands after first paint.
 */

export type ConversationChapterPhase = "pre" | "settled" | "exiting";

type ConversationContextValue = {
  chapterPhase: ConversationChapterPhase;
  setChapterPhase: (p: ConversationChapterPhase) => void;
  progress: number;
  setProgress: (p: number) => void;
  root: HTMLElement | null;
  registerRoot: (el: HTMLElement | null) => void;
};

const ConversationContext = createContext<ConversationContextValue | null>(
  null
);

export function ConversationProvider({ children }: { children: ReactNode }) {
  const [chapterPhase, setChapterPhase] =
    useState<ConversationChapterPhase>("pre");
  const [progress, setProgress] = useState(0);
  const [root, setRoot] = useState<HTMLElement | null>(null);

  const registerRoot = useCallback((el: HTMLElement | null) => {
    setRoot(el);
  }, []);

  const value = useMemo<ConversationContextValue>(
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
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversation(): ConversationContextValue {
  const ctx = useContext(ConversationContext);
  if (!ctx) {
    throw new Error(
      "useConversation() must be used inside <ConversationProvider>"
    );
  }
  return ctx;
}
