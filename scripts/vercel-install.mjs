#!/usr/bin/env node
/**
 * Vercel install: authenticate to GitHub Packages and install from package.json aliases.
 * Requires NPM_TOKEN (GitHub PAT with read:packages) on the Vercel project.
 *
 * The lockfile may still link @jedi/* to local ../jedi paths from dev — npm install alone
 * leaves broken symlinks on CI. After the base install, force registry resolution for aliases.
 */
import { execSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";

const token = process.env.NPM_TOKEN;
if (!token) {
  console.error(
    "NPM_TOKEN is required for @jon4ohio/jedi-* on GitHub Packages. " +
      "Add a GitHub PAT with read:packages to the Vercel project environment.",
  );
  process.exit(1);
}

const run = (cmd) => execSync(cmd, { stdio: "inherit" });

run(`npm config set //npm.pkg.github.com/:_authToken "${token}"`);

const jediDir = "node_modules/@jedi";
if (existsSync(jediDir)) {
  rmSync(jediDir, { recursive: true, force: true });
}

run("npm install --no-audit --no-fund");

const jediPackages = [
  "@jedi/core@npm:@jon4ohio/jedi-core@0.1.0",
  "@jedi/react@npm:@jon4ohio/jedi-react@0.1.0",
  "@jedi/themes@npm:@jon4ohio/jedi-themes@0.1.0",
  "@jedi/tokens@npm:@jon4ohio/jedi-tokens@0.1.0",
].join(" ");

run(`npm install ${jediPackages} --no-audit --no-fund --force`);
