#!/usr/bin/env node
/**
 * Vercel install: clone ../jedi if missing, build JEDI packages, then npm ci.
 *
 * Lockfile resolves @jedi/* to ../jedi/packages/* (file links). GitHub Packages
 * v0.1.0 ships workspace:* deps — registry install fails until jedi 0.1.1+ is
 * published with pinned deps. Clone + build satisfies file links on CI.
 */
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const jediRoot = resolve(root, "../jedi");
const jediCoreDist = resolve(jediRoot, "packages/jedi-core/dist/index.js");
const JEDI_TAG = "jedi-v0.1.0";
const JEDI_REPO = "https://github.com/jon4ohio/jedi.git";

const run = (cmd, opts = {}) =>
  execSync(cmd, { stdio: "inherit", ...opts });

if (!existsSync(jediCoreDist)) {
  if (!existsSync(resolve(jediRoot, "package.json"))) {
    console.log(`Cloning ${JEDI_REPO} @ ${JEDI_TAG} → ${jediRoot}`);
    run(`git clone --depth 1 --branch ${JEDI_TAG} ${JEDI_REPO} "${jediRoot}"`, {
      cwd: dirname(jediRoot),
    });
  }

  console.log("Building JEDI packages (Astryx deps + build:jedi)...");
  run("pnpm install --frozen-lockfile || pnpm install", { cwd: jediRoot });
  run("pnpm -F @astryxdesign/core build", { cwd: jediRoot });
  run("pnpm -F @astryxdesign/theme-gothic build", { cwd: jediRoot });
  run("pnpm -F @astryxdesign/theme-neutral build", { cwd: jediRoot });
  run("pnpm build:jedi", { cwd: jediRoot });
}

run("npm install --no-audit --no-fund", { cwd: root });
