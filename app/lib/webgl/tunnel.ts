/**
 * sceneTunnel — single-root R3F scene tunnel per
 * docs/SYSTEM_ARCHITECTURE.md §4 / .rules/webgl-system.mdc.
 *
 * The Canvas lives once at root layout via WebGLRoot. Any scene that
 * needs GPU rendering tunnels its three.js JSX tree through sceneTunnel.In
 * and is rendered by sceneTunnel.Out inside the root Canvas.
 *
 * Forbidden: instantiating a Canvas outside WebGLRoot.
 */

import tunnel from "tunnel-rat";

export const sceneTunnel = tunnel();
