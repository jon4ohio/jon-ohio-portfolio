#!/usr/bin/env node

import { execSync } from "node:child_process";

const ZERO_SHA = "0000000000000000000000000000000000000000";

function run(command) {
  try {
    return execSync(command, { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

function gitFilesFromRange(range) {
  const out = run(`git diff --name-only ${range}`);
  return out ? out.split("\n").filter(Boolean) : [];
}

function gitFilesFromCommit(commitSha) {
  const out = run(`git diff-tree --no-commit-id --name-only -r ${commitSha}`);
  return out ? out.split("\n").filter(Boolean) : [];
}

function readPushLines() {
  return new Promise((resolve) => {
    let buffer = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      buffer += chunk;
    });
    process.stdin.on("end", () => {
      const lines = buffer
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      resolve(lines);
    });
  });
}

function isMajorPath(filePath) {
  if (filePath === "app/layout.tsx") return true;
  if (filePath === "app/globals.css") return true;
  if (filePath === "lib/projects.ts") return true;
  if (filePath === "package.json") return true;
  if (filePath.startsWith("app/") && filePath.endsWith("/page.tsx")) return true;
  if (filePath.startsWith("components/") && filePath.endsWith(".tsx")) return true;
  return false;
}

function isAdrPath(filePath) {
  if (filePath === "docs/adrs/index.md") return true;
  return /^docs\/adrs\/ADR-\d{3}-.*\.md$/.test(filePath);
}

async function main() {
  const args = process.argv.slice(2);
  const rangeArgIndex = args.indexOf("--range");
  if (rangeArgIndex !== -1) {
    const baseSha = args[rangeArgIndex + 1];
    const headSha = args[rangeArgIndex + 2];
    if (!baseSha || !headSha) {
      console.error("Usage: node scripts/check-adr-major-push.mjs --range <base_sha> <head_sha>");
      process.exit(2);
    }
    const changed = gitFilesFromRange(`${baseSha}..${headSha}`);
    const majorTouched = changed.some(isMajorPath);
    if (!majorTouched) process.exit(0);
    const adrTouched = changed.some(isAdrPath);
    if (adrTouched) process.exit(0);
    console.error("\nADR gate blocked this change set.");
    console.error("Major changes detected in the PR range, but no ADR files were updated.\n");
    console.error("Required for major changes:");
    console.error("- Add/update an ADR file in docs/adrs/ADR-NNN-*.md");
    console.error("- Update docs/adrs/index.md\n");
    console.error("Policy: docs/adrs/ADR-008-adr-update-gate-for-major-pushes.md\n");
    process.exit(1);
  }

  const lines = await readPushLines();
  if (lines.length === 0) process.exit(0);

  const changedFiles = new Set();

  for (const line of lines) {
    const [localRef, localSha, remoteRef, remoteSha] = line.split(/\s+/);
    if (!localRef || !localSha || !remoteRef || !remoteSha) continue;
    if (localSha === ZERO_SHA) continue; // local deletion

    if (remoteSha !== ZERO_SHA) {
      for (const filePath of gitFilesFromRange(`${remoteSha}..${localSha}`)) {
        changedFiles.add(filePath);
      }
      continue;
    }

    // New remote ref: inspect commits not yet on any remote.
    const revList = run(`git rev-list ${localSha} --not --remotes`);
    const commits = revList ? revList.split("\n").filter(Boolean) : [localSha];
    for (const commit of commits) {
      for (const filePath of gitFilesFromCommit(commit)) {
        changedFiles.add(filePath);
      }
    }
  }

  const changed = [...changedFiles];
  const majorTouched = changed.some(isMajorPath);
  if (!majorTouched) process.exit(0);

  const adrTouched = changed.some(isAdrPath);
  if (adrTouched) process.exit(0);

  console.error("\nADR gate blocked this push.");
  console.error("Major push changes detected, but no ADR files were updated.\n");
  console.error("Required for major push:");
  console.error("- Add/update an ADR file in docs/adrs/ADR-NNN-*.md");
  console.error("- Update docs/adrs/index.md\n");
  console.error("Policy: docs/adrs/ADR-008-adr-update-gate-for-major-pushes.md\n");
  process.exit(1);
}

main();
