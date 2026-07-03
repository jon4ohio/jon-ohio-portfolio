#!/usr/bin/env node
/**
 * Vercel install: authenticate to GitHub Packages and install from package.json aliases.
 * Requires NPM_TOKEN (GitHub PAT with read:packages) on the Vercel project.
 * Uses npm install (not ci) so lockfile is not blocked by stale file:../jedi resolutions.
 */
import { execSync } from "node:child_process";

const token = process.env.NPM_TOKEN;
if (!token) {
  console.error(
    "NPM_TOKEN is required for @jon4ohio/jedi-* on GitHub Packages. " +
      "Add a GitHub PAT with read:packages to the Vercel project environment.",
  );
  process.exit(1);
}

execSync(`npm config set //npm.pkg.github.com/:_authToken "${token}"`, {
  stdio: "inherit",
});
execSync("npm install --no-audit --no-fund", { stdio: "inherit" });
