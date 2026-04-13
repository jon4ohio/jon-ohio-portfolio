#!/usr/bin/env node
/**
 * Validates that ref `publish/showcase` (or VERIFY_REF) contains only public-safe paths
 * for mirroring to https://github.com/jon4ohio/jon-ohio-portfolio-showcase
 *
 * Run from repo root on any branch:
 *   npm run verify:showcase-publish
 *
 * Or: VERIFY_REF=my/ref node scripts/verify-showcase-publish-tree.mjs
 */

import { execSync } from "node:child_process";

const REF = process.env.VERIFY_REF ?? "publish/showcase";

function run(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim();
  } catch {
    return "";
  }
}

/** @param {string} p */
function isAllowedPath(p) {
  if (p === "README.md") return true;
  if (p.startsWith("docs/adrs/")) return true;
  if (
    p === "docs/aiux-process.md" ||
    p === "docs/maintenance-workflow.md" ||
    p === "docs/redaction-checklist.md"
  ) {
    return true;
  }
  if (p.startsWith("snippets/")) return true;
  return false;
}

function main() {
  const commit = run(`git rev-parse --verify ${REF}^{commit} 2>/dev/null`);
  if (!commit) {
    console.log(
      `verify:showcase-publish: skip — ref "${REF}" does not exist yet (create orphan branch per docs/showcase-publish.md)`,
    );
    process.exit(0);
  }

  const out = run(`git ls-tree -r --name-only ${REF}`);
  const files = out ? out.split("\n").filter(Boolean) : [];

  if (files.length === 0) {
    console.error(
      `verify:showcase-publish: error — ref "${REF}" has no tracked files`,
    );
    process.exit(1);
  }

  const bad = files.filter((f) => !isAllowedPath(f));
  if (bad.length > 0) {
    console.error(
      `verify:showcase-publish: disallowed paths on ${REF} (must match docs/showcase-publish.md allowlist):\n`,
    );
    for (const b of bad) console.error(`  - ${b}`);
    process.exit(1);
  }

  console.log(
    `verify:showcase-publish: OK — ${files.length} file(s) on ${REF} match allowlist`,
  );
  process.exit(0);
}

main();
