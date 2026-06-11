/**
 * prefers-reduced-motion utilities.
 *
 * Server-safe: getPrefersReducedMotion() returns false during SSR; the
 * actual subscription happens in ReducedMotionProvider on client mount.
 */

export function getPrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function subscribePrefersReducedMotion(
  cb: (reduced: boolean) => void
): () => void {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handler = (e: MediaQueryListEvent) => cb(e.matches);
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}
