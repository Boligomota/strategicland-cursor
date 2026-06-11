"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR } from "@/app/lib/motion";
import { useReducedMotion } from "@/app/providers/ReducedMotionProvider";
import { useTransitionDirector } from "@/app/providers/TransitionDirectorProvider";
import { useConversation } from "../ConversationState/ConversationProvider";

/**
 * ConversationReveal — ACT C scroll choreography + the page's single
 * magnetic.gravitational binding (content + interaction pass).
 *
 * Reveal map (architecture §9 / §10):
 *
 *  invitation (T02)
 *    One timeline, once at "top 75%":
 *      1. eyebrow    opacity drift, DUR.cinematic, EASE.gsap.drift
 *      2. statement  opacity drift, DUR.epic, EASE.gsap.drift
 *      3. door       opacity drift, DUR.cinematic, EASE.gsap.drift
 *    No translate on the statement — the invitation does not arrive,
 *    it is found. Opacity-only is the chapter's whole vocabulary.
 *
 *  coda (relocated AfterimageFragment / PersistentAtmosphere /
 *  MinimalSignature)
 *    NO new reveals (§10: "estática, sin reveal nuevo"). The
 *    signature is found, not presented.
 *
 * Magnetic system (interaction-system.mdc §5 — gravitational, never
 * springy):
 *  - Target: [data-conversation-door-magnet] (the anchor). The
 *    reveal targets its CONTAINER [data-conversation-door], so the
 *    reveal's opacity and the magnet's transform never contend.
 *  - Radius 120px from element center; max displacement 12px with
 *    gravitational falloff (stronger near the center — inevitable,
 *    not elastic).
 *  - Continuous lerp 0.10 on gsap.ticker while inside the radius.
 *  - On radius exit: return to origin via EASE.cinematic, DUR.quick
 *    (single tween; the ticker yields while outside).
 *  - First and ONLY instance on the page (budget ≤ 2 per viewport).
 *  - Disabled on touch devices and under reduced motion.
 *
 * Gating:
 *  - Reduced motion: skip entirely; chapter renders fully visible,
 *    door behaves as a plain link.
 *  - Intake gate: arms only after TransitionDirector reports intake
 *    complete (never races the Hero intro).
 *
 * Lifecycle: one gsap.context() per mount; revert() kills triggers,
 * tweens and the ticker callback on unmount.
 */

const MAGNET_RADIUS = 120;
const MAGNET_MAX_DISPLACEMENT = 12;
const MAGNET_LERP = 0.1;

export function ConversationReveal({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { root } = useConversation();
  const { isIntakeComplete } = useTransitionDirector();

  useLayoutEffect(() => {
    if (reduced) return;
    if (!isIntakeComplete) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (!root) return;

    let tickMagnet: (() => void) | null = null;
    let onPointerMove: ((e: PointerEvent) => void) | null = null;

    const ctx = gsap.context(() => {
      // ── Invitation — eyebrow → statement → door drift ────────────
      const invitationSection = wrap.querySelector<HTMLElement>(
        '[data-conversation-scene="invitation"]'
      );
      const eyebrow = wrap.querySelector<HTMLElement>(
        "[data-conversation-eyebrow]"
      );
      const statement = wrap.querySelector<HTMLElement>(
        "[data-conversation-statement]"
      );
      const door = wrap.querySelector<HTMLElement>("[data-conversation-door]");

      if (invitationSection && statement) {
        const surfaces = [eyebrow, statement, door].filter(
          (el): el is HTMLElement => el !== null
        );
        gsap.set(surfaces, { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: invitationSection,
            start: "top 75%",
            once: true,
          },
        });

        if (eyebrow) {
          tl.to(eyebrow, {
            opacity: 1,
            duration: DUR.cinematic,
            ease: EASE.gsap.drift,
            clearProps: "opacity",
          });
        }

        tl.to(
          statement,
          {
            opacity: 1,
            duration: DUR.epic,
            ease: EASE.gsap.drift,
            clearProps: "opacity",
          },
          eyebrow ? "-=0.8" : 0
        );

        if (door) {
          tl.to(
            door,
            {
              opacity: 1,
              duration: DUR.cinematic,
              ease: EASE.gsap.drift,
              clearProps: "opacity",
            },
            "-=0.9"
          );
        }
      }

      // ── Door — magnetic.gravitational (single page instance) ────
      const magnet = wrap.querySelector<HTMLElement>(
        "[data-conversation-door-magnet]"
      );
      const finePointer =
        typeof window !== "undefined" &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;

      if (magnet && finePointer) {
        const setX = gsap.quickSetter(magnet, "x", "px");
        const setY = gsap.quickSetter(magnet, "y", "px");

        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        let inRadius = false;

        onPointerMove = (e: PointerEvent) => {
          const r = magnet.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.hypot(dx, dy);

          if (dist < MAGNET_RADIUS) {
            if (!inRadius) {
              inRadius = true;
              gsap.killTweensOf(magnet, "x,y");
            }
            // Gravitational falloff: pull grows as the hand closes in.
            const pull =
              (1 - dist / MAGNET_RADIUS) * MAGNET_MAX_DISPLACEMENT;
            const norm = dist === 0 ? 0 : pull / dist;
            targetX = dx * norm;
            targetY = dy * norm;
          } else if (inRadius) {
            inRadius = false;
            targetX = 0;
            targetY = 0;
            gsap.to(magnet, {
              x: 0,
              y: 0,
              duration: DUR.quick,
              ease: EASE.gsap.cinematic,
              onUpdate: () => {
                currentX = Number(gsap.getProperty(magnet, "x"));
                currentY = Number(gsap.getProperty(magnet, "y"));
              },
            });
          }
        };

        tickMagnet = () => {
          if (!inRadius) return;
          currentX += (targetX - currentX) * MAGNET_LERP;
          currentY += (targetY - currentY) * MAGNET_LERP;
          setX(currentX);
          setY(currentY);
        };

        window.addEventListener("pointermove", onPointerMove, {
          passive: true,
        });
        gsap.ticker.add(tickMagnet);
      }
    }, wrap);

    let fontsRefreshed = false;
    const refreshAfterFonts = () => {
      if (fontsRefreshed) return;
      fontsRefreshed = true;
      ScrollTrigger.refresh();
    };
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(refreshAfterFonts);
    }
    const refreshTimer = window.setTimeout(refreshAfterFonts, 1200);

    return () => {
      window.clearTimeout(refreshTimer);
      if (onPointerMove) {
        window.removeEventListener("pointermove", onPointerMove);
      }
      if (tickMagnet) {
        gsap.ticker.remove(tickMagnet);
      }
      ctx.revert();
    };
  }, [reduced, isIntakeComplete, root]);

  return <div ref={wrapRef}>{children}</div>;
}
