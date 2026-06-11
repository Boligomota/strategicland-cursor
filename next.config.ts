import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF-primary delivery per image-treatment-system.mdc §2.1.
    // Next 16 defaults to ['image/webp'] only — without this, AVIF
    // sources are transcoded to WebP and the canon mandate is dead
    // letter. WebP remains the negotiated fallback.
    formats: ["image/avif", "image/webp"],
    // Capped at 1920 per the production long-edge cap
    // (docs/ASSET_SYSTEM.md §8) — masters never exceed 2400px, so the
    // default 2048/3840 variants add cache weight with zero benefit.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // 75 = primitive default; 60 allowlisted for heavy atmospheric
    // backplates rendered at low opacity under grain/vignette/grade.
    qualities: [60, 75],
  },
};

export default nextConfig;
