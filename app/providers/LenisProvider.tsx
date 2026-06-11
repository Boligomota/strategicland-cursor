"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type Lenis from "lenis";
import { createLenis, destroyLenis } from "@/app/lib/scroll/lenis";
import { installLenisGsapBridge, uninstallLenisGsapBridge } from "@/app/lib/scroll/bridge";
import { useReducedMotion } from "./ReducedMotionProvider";

const LenisContext = createContext<Lenis | null>(null);

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * LenisProvider — owns the Lenis singleton + GSAP bridge per
 * .rules/scroll-system.mdc §2/§3 and docs/SYSTEM_ARCHITECTURE.md §5.
 *
 * On reduced-motion, Lenis is destroyed and native scroll is restored.
 * Lifecycle is StrictMode-safe via the singleton in lib/scroll/lenis.ts.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const mountedRef = useRef(false);

  useIsoLayoutEffect(() => {
    if (reduced) {
      destroyLenis();
      uninstallLenisGsapBridge();
      setLenis(null);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      return;
    }

    const instance = createLenis();
    installLenisGsapBridge(instance);
    setLenis(instance);
    mountedRef.current = true;

    document.documentElement.classList.add("lenis", "lenis-smooth");

    return () => {
      // Strict Mode double-invoke: only destroy on real unmount in production.
      // In dev under StrictMode, the singleton survives the synthetic remount.
      if (process.env.NODE_ENV === "production") {
        destroyLenis();
        uninstallLenisGsapBridge();
        document.documentElement.classList.remove("lenis", "lenis-smooth");
      }
    };
  }, [reduced]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}
