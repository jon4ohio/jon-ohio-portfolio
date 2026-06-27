#!/usr/bin/env node
/**
 * Replace one frame in an animated preview-hero GIF while preserving the others.
 *
 * Configure per project in scripts/figma-asset-map.json under `replaceGifFrame`.
 * After `npm run pull:figma-gifs`, re-run this script — Figma pull overwrites
 * preview-hero.gif and clears the local frame override. Listing thumbnail is the
 * pure Figma export (29737:53463); do not run compose:preview-hero for fetsproza.
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

async function extractFrameSlice(fullBuffer, top, width, height) {
  return sharp(fullBuffer).extract({ left: 0, top, width, height }).png().toBuffer();
}

async function replaceGifFrame({ slug, config, outDir }) {
  const gifPath = path.join(outDir, config.gif);
  const sourcePath = path.join(outDir, config.source);
  const posterPath = path.join(outDir, config.posterOut);

  const frameIndex = config.frame - 1;
  const width = config.frameWidth;
  const height = config.frameHeight;
  const delayMs = config.delayMs ?? 1500;

  const meta = await sharp(gifPath, { animated: true }).metadata();
  const pages = meta.pages ?? 1;
  if (frameIndex < 0 || frameIndex >= pages) {
    throw new Error(`${config.gif}: frame ${config.frame} out of range (${pages} pages)`);
  }

  const stacked = await sharp(gifPath, { animated: true, page: 0 }).png().toBuffer();
  const frames = [];

  for (let i = 0; i < pages; i++) {
    if (i === frameIndex) {
      const replacement = await sharp(sourcePath)
        .resize(width, height, { fit: "cover", position: "centre" })
        .png()
        .toBuffer();
      frames.push(replacement);
    } else {
      frames.push(await extractFrameSlice(stacked, i * height, width, height));
    }
  }

  const gifOut = await sharp(frames, { join: { animated: true } })
    .gif({ delay: Array(pages).fill(delayMs) })
    .toBuffer();

  await fs.writeFile(gifPath, gifOut);
  console.log(`rebuilt ${slug}/${config.gif} — frame ${config.frame} from ${config.source}`);

  await fs.writeFile(posterPath, frames[frameIndex]);
  console.log(`updated ${slug}/${config.posterOut} from frame ${config.frame}`);
}

async function main() {
  const slugFilter = process.argv[2]?.trim();
  const mapPath = path.join(__dirname, "figma-asset-map.json");
  const map = JSON.parse(await fs.readFile(mapPath, "utf8"));

  let projects = map.projects.filter((p) => p.replaceGifFrame);
  if (slugFilter) {
    projects = projects.filter((p) => p.slug === slugFilter);
    if (projects.length === 0) {
      console.error(`No replaceGifFrame entry for slug "${slugFilter}" in figma-asset-map.json`);
      process.exit(1);
    }
  }

  for (const project of projects) {
    const outDir = path.join(root, "public", "assets", "work", project.slug);
    await replaceGifFrame({ slug: project.slug, config: project.replaceGifFrame, outDir });
  }

  console.log("Done (GIF frame replace).");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
