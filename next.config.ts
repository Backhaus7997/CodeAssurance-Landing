import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    // Two root layouts (one per language) leave no shared layout for the 404, see the spec, 3.1.
    globalNotFound: true,
  },
};

export default nextConfig;
