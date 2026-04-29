#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const TARGET_DIRS = ["app", "components"];
const TARGET_EXTENSIONS = new Set([".ts", ".tsx", ".css"]);
const SPACING_PROPERTIES = new Set([
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "gap",
  "rowGap",
  "columnGap",
]);

function walk(dir, output = []) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      if (entry === "node_modules" || entry === ".next" || entry === ".git") continue;
      walk(fullPath, output);
      continue;
    }

    if ([...TARGET_EXTENSIONS].some((extension) => fullPath.endsWith(extension))) {
      output.push(fullPath);
    }
  }
  return output;
}

function isOffGrid(value) {
  if (Number.isNaN(value)) return false;
  if (value === 0) return false;
  return value % 4 !== 0;
}

function collectPxNumbers(rawValue) {
  const values = [];
  const pxRegex = /(-?\d+(?:\.\d+)?)px/g;
  let match = pxRegex.exec(rawValue);
  while (match) {
    values.push(Number(match[1]));
    match = pxRegex.exec(rawValue);
  }
  return values;
}

function lintFile(filePath) {
  const text = readFileSync(filePath, "utf8");
  const lines = text.split("\n");
  const violations = [];

  lines.forEach((line, index) => {
    const propertyRegex = /([A-Za-z]+)\s*:\s*([^,}]+)/g;
    let propertyMatch = propertyRegex.exec(line);
    while (propertyMatch) {
      const property = propertyMatch[1];
      const rawValue = propertyMatch[2].trim();
      if (!SPACING_PROPERTIES.has(property)) {
        propertyMatch = propertyRegex.exec(line);
        continue;
      }

      for (const pxValue of collectPxNumbers(rawValue)) {
        if (isOffGrid(pxValue)) {
          violations.push({
            line: index + 1,
            property,
            value: `${pxValue}px`,
            source: rawValue,
          });
        }
      }

      if (/^-?\d+(?:\.\d+)?$/.test(rawValue)) {
        const numericValue = Number(rawValue);
        if (isOffGrid(numericValue)) {
          violations.push({
            line: index + 1,
            property,
            value: String(numericValue),
            source: rawValue,
          });
        }
      }

      propertyMatch = propertyRegex.exec(line);
    }
  });

  return violations;
}

function main() {
  const runFullScan = process.argv.includes("--all");
  const files = runFullScan
    ? TARGET_DIRS.flatMap((dir) => walk(join(ROOT, dir)))
    : getChangedFiles();

  if (files.length === 0) {
    console.log("Spacing grid check skipped (no changed app/components/css files).");
    return;
  }

  const report = files.flatMap((filePath) =>
    lintFile(filePath).map((violation) => ({
      filePath: relative(ROOT, filePath),
      ...violation,
    })),
  );

  if (report.length === 0) {
    console.log("Spacing grid check passed (all spacing values are 4pt aligned).");
    return;
  }

  console.error("Spacing grid violations found (non-4pt values):\n");
  for (const item of report) {
    console.error(
      `${item.filePath}:${item.line} ${item.property}=${item.value} (from: ${item.source})`,
    );
  }
  console.error(`\nTotal violations: ${report.length}`);
  process.exit(1);
}

function getChangedFiles() {
  const changedPaths = new Set();
  const commands = [
    "git diff --name-only -- app components",
    "git diff --name-only --cached -- app components",
    "git ls-files --others --exclude-standard -- app components",
  ];

  for (const command of commands) {
    const output = run(command);
    if (!output) continue;
    output
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .forEach((filePath) => changedPaths.add(join(ROOT, filePath)));
  }

  return [...changedPaths].filter((filePath) =>
    [...TARGET_EXTENSIONS].some((extension) => filePath.endsWith(extension)),
  );
}

function run(command) {
  try {
    return execSync(command, { cwd: ROOT, encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

main();
