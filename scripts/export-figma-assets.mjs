#!/usr/bin/env node
/**
 * Batch-export frames from Figma via the Images API into public/assets/work/<slug>/.
 *
 * Prerequisites: FIGMA_TOKEN (Personal Access Token) with access to the file.
 * Copy .env.example to .env.local and set FIGMA_TOKEN=...
 *
 * Without a token, writes neutral gray PNGs at the correct pixel dimensions so the site builds;
 * re-run with a token to replace with real exports.
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

async function downloadFromFigma({ map, token, scale }) {
  const fileKey = map.fileKey;
  const idToJobs = new Map();

  for (const project of map.projects) {
    for (const asset of project.assets) {
      if (asset.status === "stale-node") continue;
      if (!idToJobs.has(asset.id)) idToJobs.set(asset.id, []);
      idToJobs.get(asset.id).push({ slug: project.slug, ...asset });
    }
  }

  const uniqueIds = [...idToJobs.keys()];
  const urlMap = new Map();

  for (const batch of chunk(uniqueIds, 15)) {
    const params = new URLSearchParams({
      ids: batch.join(","),
      format: "png",
      scale: String(scale),
    });
    const res = await fetch(`https://api.figma.com/v1/images/${fileKey}?${params}`, {
      headers: { "X-Figma-Token": token },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Figma images API ${res.status}: ${text}`);
    }
    const data = await res.json();
    if (data.err) throw new Error(String(data.err));
    for (const [id, url] of Object.entries(data.images ?? {})) {
      if (url) urlMap.set(id, url);
    }
    await new Promise((r) => setTimeout(r, 300));
  }

  let skipped = 0;
  for (const [nodeId, jobs] of idToJobs) {
    const url = urlMap.get(nodeId);
    if (!url) {
      skipped += jobs.length;
      console.warn(`skip ${nodeId} — no image URL (node missing or not exportable)`);
      for (const job of jobs) console.warn(`  skipped ${job.slug}/${job.out}`);
      continue;
    }
    const imgRes = await fetch(url);
    if (!imgRes.ok) throw new Error(`Failed to download raster for ${nodeId}`);
    const buf = Buffer.from(await imgRes.arrayBuffer());
    for (const job of jobs) {
      const outPath = path.join(root, "public", "assets", "work", job.slug, job.out);
      await fs.mkdir(path.dirname(outPath), { recursive: true });
      await fs.writeFile(outPath, buf);
      console.log("exported", outPath);
    }
  }
  if (skipped > 0) {
    console.warn(`Skipped ${skipped} asset(s) — update scripts/figma-asset-map.json node IDs.`);
  }
}

async function writePlaceholders(map, scale) {
  console.warn(
    "FIGMA_TOKEN missing or API failed — writing neutral placeholders. Set FIGMA_TOKEN and re-run to pull real assets.",
  );
  for (const project of map.projects) {
    const dir = path.join(root, "public", "assets", "work", project.slug);
    await fs.mkdir(dir, { recursive: true });
    for (const asset of project.assets) {
      const w = Math.max(1, Math.round(asset.designWidth * scale));
      const h = Math.max(1, Math.round(asset.designHeight * scale));
      const outPath = path.join(dir, asset.out);
      const png = await sharp({
        create: {
          width: w,
          height: h,
          channels: 3,
          background: { r: 244, g: 244, b: 246 },
        },
      })
        .png()
        .toBuffer();
      await fs.writeFile(outPath, png);
      console.log("placeholder", outPath, `${w}×${h}`);
    }
  }
}

async function loadEnvLocal() {
  try {
    const p = path.join(root, ".env.local");
    const raw = await fs.readFile(p, "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq <= 0) continue;
      const k = trimmed.slice(0, eq).trim();
      if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(k)) continue;
      let v = trimmed.slice(eq + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      if (v) process.env[k] = v;
    }
  } catch {
    /* optional */
  }
}

async function main() {
  await loadEnvLocal();
  const mapPath = path.join(__dirname, "figma-asset-map.json");
  const map = JSON.parse(await fs.readFile(mapPath, "utf8"));
  const slugFilter = process.argv[2]?.trim();
  if (slugFilter) {
    map.projects = map.projects.filter((p) => p.slug === slugFilter);
    if (map.projects.length === 0) {
      console.error(`No project slug "${slugFilter}" in figma-asset-map.json`);
      process.exit(1);
    }
    console.log(`Export scope: ${slugFilter} (${map.projects[0].assets.length} assets)`);
    const active = map.projects[0].assets.filter((a) => a.status !== "stale-node").length;
    const stale = map.projects[0].assets.length - active;
    if (stale > 0) console.log(`  ${stale} stale-node entries skipped (re-map in figma-asset-map.json)`);
  }
  const scale = map.scale ?? 2;
  const token = process.env.FIGMA_TOKEN?.trim();

  for (const project of map.projects) {
    await fs.mkdir(path.join(root, "public", "assets", "work", project.slug), { recursive: true });
  }

  if (token) {
    try {
      await downloadFromFigma({ map, token, scale });
      console.log("Done (Figma API).");
      return;
    } catch (e) {
      console.error(e);
      if (slugFilter) {
        console.error(
          `Export failed for slug "${slugFilter}" — existing PNGs were not modified. Fix node IDs in figma-asset-map.json.`,
        );
        process.exit(1);
      }
      await writePlaceholders(map, scale);
    }
  } else if (slugFilter) {
    console.error(
      `FIGMA_TOKEN required for slug "${slugFilter}" — existing PNGs were not modified.`,
    );
    process.exit(1);
  } else {
    await writePlaceholders(map, scale);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
