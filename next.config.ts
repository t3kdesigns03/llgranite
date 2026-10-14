import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static: `next build` writes plain HTML/CSS/JS to ./out (no server functions).
  output: "export",
  // Photos are pre-built into responsive WebP by scripts/build-images.mjs and rendered by
  // src/components/Photo.tsx, so the runtime optimizer (which needs a server) is never used.
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
