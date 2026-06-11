"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  getPrefersReducedMotion,
  subscribePrefersReducedMotion,
} from "@/app/lib/utils/prefersReducedMotion";

const ReducedMotionContext = createContext<boolean>(false);

export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    setReduced(getPrefersReducedMotion());
    return subscribePrefersReducedMotion(setReduced);
  }, []);

  return (
    <ReducedMotionContext.Provider value={reduced}>
      {children}
    </ReducedMotionContext.Provider>
  );
}

export function useReducedMotion(): boolean {
  return useContext(ReducedMotionContext);
}
