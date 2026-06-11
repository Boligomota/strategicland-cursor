/**
 * Lenis singleton factory per .rules/scroll-system.mdc §2.
 *
 * One instance per app lifetime. LenisProvider owns the lifecycle.
 * Direct Lenis instantiation outside this file is forbidden.
 */

import Lenis from "lenis";

let _instance: Lenis | null = null;

export function createLenis(): Lenis {
  if (_instance) return _instance;
  _instance = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 0.8,
    touchMultiplier: 1.4,
    infinite: false,
    syncTouch: true,
    syncTouchLerp: 0.075,
  });
  return _instance;
}

export function getLenis(): Lenis | null {
  return _instance;
}

export function destroyLenis(): void {
  if (_instance) {
    _instance.destroy();
    _instance = null;
  }
}
