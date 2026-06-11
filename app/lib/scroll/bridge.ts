/**
 * Lenis ↔ GSAP bridge per .rules/scroll-system.mdc §3 and
 * docs/SYSTEM_ARCHITECTURE.md §5.
 *
 * Single-call install. Idempotent: safe to invoke twice (second is no-op).
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

let _installed = false;

export function installLenisGsapBridge(lenis: Lenis): void {
  if (_installed) return;
  gsap.registerPlugin(ScrollTrigger);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  _installed = true;
}

export function uninstallLenisGsapBridge(): void {
  // GSAP ticker callbacks are removed implicitly when Lenis is destroyed
  // because lenis.raf throws on a destroyed instance. We reset the flag so
  // the bridge can be re-installed on a fresh Lenis (e.g., after route
  // change in dev). ScrollTrigger.killAll() is the caller's responsibility.
  _installed = false;
}
