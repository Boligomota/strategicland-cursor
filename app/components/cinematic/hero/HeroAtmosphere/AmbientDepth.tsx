/**
 * AmbientDepth — fixed deep background gradient per HC-01.
 *
 * Canon source: #canvas-bg radial-gradient base color. We separate the
 * static base gradient (this component) from the moving particle field
 * (LightField).
 *
 * Atmospheric contrast calibration pass (current):
 *  - Falloff extended 60% → 75%. The previous stop landed inside the
 *    optical reading zone; the radial felt like a technical falloff
 *    instead of a physical light volume. Extending the curve lets the
 *    bottom-edge mid-warm "horizon" breathe further into the frame.
 *
 * Render: single fixed div, z=-2 so all content sits above.
 */

export function AmbientDepth() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[-2]"
      style={{
        background:
          "radial-gradient(circle at 50% 120%, var(--bg-mid-warm) 0%, var(--bg-deep-warm) 75%)",
      }}
    />
  );
}
