"use client";

import { useCallback, type ReactNode } from "react";
import { useCapabilities } from "./CapabilitiesState/CapabilitiesProvider";

/**
 * CapabilitiesScene — semantic root of HC-04 (human · capabilities).
 *
 * Owns the chapter root <section> element + callback-ref registration
 * into CapabilitiesProvider so motion controllers re-run their effects
 * after the DOM commits. Density tier metadata declared via data
 * attributes for the density linter.
 *
 * Pure structural — no motion, no atmosphere.
 */
export function CapabilitiesScene({ children }: { children: ReactNode }) {
  const { registerRoot } = useCapabilities();

  const setRef = useCallback(
    (el: HTMLElement | null) => {
      registerRoot(el);
    },
    [registerRoot]
  );

  return (
    <section
      ref={setRef}
      data-chapter="human"
      data-chapter-name="capabilities"
      data-density-tier-default="T03"
      className="relative w-full"
    >
      {children}
    </section>
  );
}
