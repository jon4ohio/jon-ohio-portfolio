import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Prevent Next.js from inferring the wrong root when multiple lockfiles exist.
    root: __dirname,
  },
};

export default nextConfig;
