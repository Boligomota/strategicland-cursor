"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { jitter } from "@/app/lib/irregularity";
import { useReducedMotion } from "./ReducedMotionProvider";

/**
 * GlobalCursorProvider — site-wide cursor ownership per
 * docs/SYSTEM_ARCHITECTURE.md §7 & .rules/cursor-interaction-system.mdc.
 *
 * Responsibilities (root-scoped, survives chapter changes):
 *  - Owns mouse position + lerped ring position state
 *  - Drives the rAF/gsap.ticker lerp loop once
 *  - Hover state propagation via [data-hover-target] / a / button
 *  - MutationObserver re-binds hover listeners as DOM mutates
 *  - Suppresses cursor entirely on touch + reduced-motion
 *
 * <SystemCursor/> reads bindDot/bindRing to attach the visible elements.
 * No subtree-scoped cursor logic remains anywhere in the tree.
 */

type CursorContextValue = {
  enabled: boolean;
  isHovering: boolean;
  bindDot: (el: HTMLElement | null) => void;
  bindRing: (el: HTMLElement | null) => void;
};

const CursorContext = createContext<CursorContextValue | null>(null);

export function GlobalCursorProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const dotRef = useRef<HTMLElement | null>(null);
  const ringRef = useRef<HTMLElement | null>(null);

  const bindDot = useCallback((el: HTMLElement | null) => {
    dotRef.current = el;
  }, []);
  const bindRing = useCallback((el: HTMLElement | null) => {
    ringRef.current = el;
  }, []);

  useEffect(() => {
    if (reduced) {
      setEnabled(false);
      return;
    }
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setEnabled(false);
      return;
    }
    setEnabled(true);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("sl-cursor-active");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    const lerp = jitter(0.18, 0.11);

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) gsap.set(dotRef.current, { x: mouseX, y: mouseY });
    };

    const tick = () => {
      ringX += (mouseX - ringX) * lerp;
      ringY += (mouseY - ringY) * lerp;
      if (ringRef.current) gsap.set(ringRef.current, { x: ringX, y: ringY });
    };

    let hoverCount = 0;
    const onEnter = () => {
      hoverCount += 1;
      if (hoverCount === 1) setIsHovering(true);
    };
    const onLeave = () => {
      hoverCount = Math.max(0, hoverCount - 1);
      if (hoverCount === 0) setIsHovering(false);
    };

    const bound = new WeakSet<HTMLElement>();
    const bind = (el: HTMLElement) => {
      if (bound.has(el)) return;
      bound.add(el);
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    };
    const SELECTOR = "[data-hover-target], a, button";
    const scan = (scope: ParentNode = document) => {
      scope.querySelectorAll<HTMLElement>(SELECTOR).forEach(bind);
    };

    scan();

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue;
          const el = node as HTMLElement;
          if (el.matches?.(SELECTOR)) bind(el);
          scan(el);
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);
    gsap.ticker.add(tick);

    return () => {
      document.documentElement.classList.remove("sl-cursor-active");
      window.removeEventListener("mousemove", onMove);
      gsap.ticker.remove(tick);
      mo.disconnect();
      // Listeners are GC'd with their elements; nothing else to unbind.
      hoverCount = 0;
      setIsHovering(false);
    };
  }, [enabled]);

  const value = useMemo<CursorContextValue>(
    () => ({ enabled, isHovering, bindDot, bindRing }),
    [enabled, isHovering, bindDot, bindRing]
  );

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useGlobalCursor(): CursorContextValue {
  const ctx = useContext(CursorContext);
  if (!ctx) {
    throw new Error("useGlobalCursor() must be used inside <GlobalCursorProvider>");
  }
  return ctx;
}
