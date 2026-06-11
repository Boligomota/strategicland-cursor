"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { EASE, DUR } from "@/app/lib/motion";
import { useReducedMotion } from "@/app/providers/ReducedMotionProvider";
import { useTransitionDirector } from "@/app/providers/TransitionDirectorProvider";

const SESSION_INTAKE_FLAG = "sl_intake_complete";

function readIntakeFlagSync(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(SESSION_INTAKE_FLAG) === "1";
  } catch {
    return false;
  }
}

/**
 * SystemLoader — site intake "000 → 100" counter. Site-wide system element.
 *
 * Owned by the TransitionDirector lifecycle. When isIntakeComplete is true
 * (first visit + already played, or sessionStorage hydrated), the loader
 * never mounts. When false, it plays the canonical choreography exactly
 * once and signals completion via completeIntake(), which advances the
 * director from T1_PRE_ENTRY to T4_IMMERSION (or sets the intake flag if
 * no chapter has registered yet).
 *
 * Canon choreography preserved exactly:
 *  - Counter advances 0 → 100 over DUR.epic with EASE.gsap.editorial.
 *  - On complete: yPercent: -100 over DUR.cinematic with EASE.gsap.cinematic.
 *  - Reduced motion: skip entirely; mark intake complete on next tick.
 */
export function SystemLoader() {
  const ref = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const dismissedRef = useRef(false);
  const reduced = useReducedMotion();
  const { completeIntake, isIntakeComplete } = useTransitionDirector();

  // Synchronously hide the loader BEFORE the browser paints when the
  // session already played intake. SSR can't read sessionStorage so it
  // always emits the loader DOM; this layout-time check prevents the
  // one-frame flash on cached visits without breaking hydration parity.
  useLayoutEffect(() => {
    if (!readIntakeFlagSync()) return;
    dismissedRef.current = true;
    const el = ref.current;
    if (el) el.style.display = "none";
    completeIntake();
  }, [completeIntake]);

  useEffect(() => {
    if (dismissedRef.current) return;
    if (isIntakeComplete) return;
    if (reduced) {
      completeIntake();
      return;
    }
    const root = ref.current;
    const counterEl = counterRef.current;
    if (!root || !counterEl) return;

    const ctx = gsap.context(() => {
      const counter = { val: 0 };
      const tl = gsap.timeline({
        defaults: { ease: EASE.gsap.cinematic },
        onComplete: () => {
          completeIntake();
        },
      });

      tl.to(counter, {
        val: 100,
        duration: DUR.epic,
        ease: EASE.gsap.editorial,
        onUpdate: () => {
          counterEl.textContent = String(Math.floor(counter.val)).padStart(3, "0");
        },
      });

      tl.to(root, {
        yPercent: -100,
        duration: DUR.cinematic,
        ease: EASE.gsap.cinematic,
        onComplete: () => {
          root.style.pointerEvents = "none";
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced, isIntakeComplete, completeIntake]);

  if (isIntakeComplete) return null;

  return (
    <div
      ref={ref}
      data-system-loader
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[color:var(--bg-deep-warm)]"
    >
      <div
        ref={counterRef}
        className="font-light leading-none"
        style={{
          fontSize: "clamp(2.4883rem, 2.0898rem + 1.9926vw, 3.5619rem)",
          letterSpacing: "-0.02em",
          color: "var(--text-cream)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        000
      </div>
      {/* "Initializing Systems" microcopy removed — no source in the
          Mapa de Sitio Estratégico (sitemap compliance pass). */}
    </div>
  );
}
