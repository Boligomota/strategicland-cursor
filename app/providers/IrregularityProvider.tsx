"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { bindVarianceSource, getSessionSeed, mulberry32 } from "@/app/lib/irregularity";

/**
 * IrregularityProvider — binds the seeded PRNG to the global variance
 * source on mount per .rules/human-irregularity-system.mdc §2.
 *
 * Renders nothing visible. Mounted near root, before any motion-bearing
 * component subscribes to jitter().
 */
export function IrregularityProvider({ children }: { children: ReactNode }) {
  const bound = useRef(false);

  if (!bound.current && typeof window !== "undefined") {
    const seed = getSessionSeed();
    bindVarianceSource(mulberry32(seed));
    bound.current = true;
  }

  useEffect(() => {
    if (bound.current) return;
    const seed = getSessionSeed();
    bindVarianceSource(mulberry32(seed));
    bound.current = true;
  }, []);

  return <>{children}</>;
}
