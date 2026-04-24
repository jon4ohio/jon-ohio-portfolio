import type { NextConfig } from "next";
import path from "path";
import fs from "fs";

// In git worktrees, node_modules lives in the main repo, not the worktree.
// Walk up from __dirname until we find a directory that contains node_modules/next.
// Note: turbopack.root determines both the module resolution root AND the filesystem
// root for file serving — so app/ and lib/ are resolved relative to the found root,
// not the worktree. Accept this trade-off: worktree edits are committed via git and
// verified in CI/production rather than the local preview.
function findPackageRoot(dir: string): string {
  if (fs.existsSync(path.join(dir, "node_modules", "next"))) {
    return dir;
  }
  const parent = path.dirname(dir);
  if (parent === dir) return dir; // filesystem root fallback
  return findPackageRoot(parent);
}

const nextConfig: NextConfig = {
  turbopack: {
    // Prevent Next.js from inferring the wrong root when multiple lockfiles exist,
    // and resolve correctly when running from a git worktree.
    root: findPackageRoot(__dirname),
  },
  async redirects() {
    return [{ source: "/thinking", destination: "/", permanent: true }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
