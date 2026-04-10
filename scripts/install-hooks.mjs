#!/usr/bin/env node

import { chmodSync, copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const sourceHook = resolve(root, ".githooks", "pre-push");
const targetHook = resolve(root, ".git", "hooks", "pre-push");

if (!existsSync(sourceHook)) {
  console.error("Missing source hook: .githooks/pre-push");
  process.exit(1);
}

copyFileSync(sourceHook, targetHook);
chmodSync(targetHook, 0o755);

console.log("Installed git pre-push hook -> .git/hooks/pre-push");
