#!/usr/bin/env node
/**
 * Writes public/{INDEXNOW_KEY}.txt when INDEXNOW_KEY is set (IndexNow ownership proof).
 */
import { writeFileSync, unlinkSync, existsSync } from "node:fs";
import { join } from "node:path";

const key = process.env.INDEXNOW_KEY?.trim();
const publicDir = join(process.cwd(), "public");

if (!key) {
  process.exit(0);
}

const keyPath = join(publicDir, `${key}.txt`);
writeFileSync(keyPath, key, "utf8");
console.log(`write-indexnow-key: wrote public/${key}.txt`);

// Remove stale key files from prior deploys when key rotated.
for (const name of ["indexnow-key.txt"]) {
  const stale = join(publicDir, name);
  if (existsSync(stale) && stale !== keyPath) {
    unlinkSync(stale);
  }
}
