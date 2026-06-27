#!/usr/bin/env node
/**
 * Pull GIF fills and optional poster PNGs (imageRef) from Figma image nodes.
 * Resolves gifRef / imageRef via /v1/files/:key/images — not covered by export-figma-assets.mjs.
 *
 * Configure per-project `gifs: [{ imageNodeId, out, posterOut? }]` in scripts/figma-asset-map.json.
 * Requires FIGMA_TOKEN in .env.local.
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

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

function findImageFillRef(node, key) {
  for (const fill of node.fills ?? []) {
    if (fill.type === "IMAGE" && fill[key]) return fill[key];
  }
  for (const child of node.children ?? []) {
    const ref = findImageFillRef(child, key);
    if (ref) return ref;
  }
  return null;
}

function findGifRef(node) {
  return findImageFillRef(node, "gifRef");
}

function findImageRef(node) {
  return findImageFillRef(node, "imageRef");
}

function isPng(buf) {
  return buf.length >= 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
}

async function downloadAsset(url, outPath, { label, expectGif }) {
  const imgRes = await fetch(url);
  if (!imgRes.ok) {
    console.error(`Download failed for ${label}`);
    return false;
  }
  const buf = Buffer.from(await imgRes.arrayBuffer());
  if (expectGif) {
    if (buf.slice(0, 3).toString() !== "GIF") {
      console.warn(`skip ${label} — downloaded bytes are not GIF`);
      return false;
    }
  } else if (!isPng(buf)) {
    console.warn(`skip ${label} — downloaded bytes are not PNG`);
    return false;
  }
  await fs.writeFile(outPath, buf);
  console.log("exported", outPath, `(${buf.length} bytes)`);
  return true;
}

async function main() {
  await loadEnvLocal();
  const token = process.env.FIGMA_TOKEN?.trim();
  if (!token) {
    console.error("FIGMA_TOKEN required — set in .env.local");
    process.exit(1);
  }

  const slugFilter = process.argv[2]?.trim();
  const mapPath = path.join(__dirname, "figma-asset-map.json");
  const map = JSON.parse(await fs.readFile(mapPath, "utf8"));
  let projects = map.projects.filter((p) => Array.isArray(p.gifs) && p.gifs.length > 0);
  if (slugFilter) {
    projects = projects.filter((p) => p.slug === slugFilter);
    if (projects.length === 0) {
      console.error(`No GIF entries for slug "${slugFilter}" in figma-asset-map.json`);
      process.exit(1);
    }
  }

  const fileKey = map.fileKey;
  const imageRes = await fetch(`https://api.figma.com/v1/files/${fileKey}/images`, {
    headers: { "X-Figma-Token": token },
  });
  if (!imageRes.ok) {
    console.error(`Figma images API ${imageRes.status}: ${await imageRes.text()}`);
    process.exit(1);
  }
  const imageMap = (await imageRes.json()).meta?.images ?? {};

  for (const project of projects) {
    const outDir = path.join(root, "public", "assets", "work", project.slug);
    await fs.mkdir(outDir, { recursive: true });

    for (const job of project.gifs) {
      const nodeId = encodeURIComponent(job.imageNodeId);
      const nodeRes = await fetch(`https://api.figma.com/v1/files/${fileKey}/nodes?ids=${nodeId}`, {
        headers: { "X-Figma-Token": token },
      });
      if (!nodeRes.ok) {
        console.error(`Node fetch failed for ${job.imageNodeId}`);
        continue;
      }
      const nodeData = await nodeRes.json();
      const doc = nodeData.nodes?.[job.imageNodeId]?.document;
      if (!doc) {
        console.warn(`skip ${job.imageNodeId} — node missing`);
        continue;
      }

      const gifRef = findGifRef(doc);
      if (gifRef) {
        const url = imageMap[gifRef];
        if (!url) {
          console.warn(`skip ${job.out} — no URL for gifRef ${gifRef}`);
        } else {
          await downloadAsset(url, path.join(outDir, job.out), { label: job.out, expectGif: true });
        }
      } else {
        console.warn(`skip ${job.out} — no gifRef on ${job.imageNodeId}`);
      }

      if (job.posterOut) {
        const imageRef = findImageRef(doc);
        if (!imageRef) {
          console.warn(`skip ${job.posterOut} — no imageRef on ${job.imageNodeId}`);
        } else {
          const posterUrl = imageMap[imageRef];
          if (!posterUrl) {
            console.warn(`skip ${job.posterOut} — no URL for imageRef ${imageRef}`);
          } else {
            await downloadAsset(posterUrl, path.join(outDir, job.posterOut), {
              label: job.posterOut,
              expectGif: false,
            });
          }
        }
      }
    }
  }
  console.log("Done (GIF + poster pull).");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
