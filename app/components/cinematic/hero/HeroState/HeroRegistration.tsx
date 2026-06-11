"use client";

import { useEffect } from "react";
import { useTransitionDirector } from "@/app/providers/TransitionDirectorProvider";

/**
 * HeroRegistration — publishes HC-01's chapter contract to the
 * TransitionDirector.
 *
 * Per .rules/narrative-density-system.mdc the Hero chapter operates in
 * tier T04_IMMERSIVE (its dominant establishing tier). The full scene
 * sequence cascades to T02 → T01 inside the chapter; that intra-chapter
 * cascade is owned by individual scenes (DensityTransition + scroll
 * controllers), not by the director's chapter-level focus.
 *
 * On unmount the registration is released. When that happens while Hero
 * is the chapter in focus, the director falls back to T0_IDLE.
 *
 * No DOM. State-only.
 */
export function HeroRegistration() {
  const { registerChapter } = useTransitionDirector();

  useEffect(() => {
    return registerChapter({
      id: "hero",
      density: "T04_IMMERSIVE",
      entryBehavior: "loader_gated",
      exitBehavior: "scroll_release",
      transitionProfile: "default",
    });
  }, [registerChapter]);

  return null;
}
