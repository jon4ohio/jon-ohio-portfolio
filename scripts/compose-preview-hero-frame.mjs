#!/usr/bin/env node
/**
 * Composite a chosen GIF frame into the media slot of a flat preview-hero PNG.
 * Layout in lib/projects.ts / AssetImage is unchanged — only the raster is updated.
 *
 * Configure per project in scripts/figma-asset-map.json:
 *   "composePreview": {
 *     "target": "preview-hero.png",
 *     "gif": "preview-hero.gif",
 *     "frame": 3,
 *     "designSize": { "width": 1192, "height": 671 },
 *     "mediaRect": { "left": 79, "top": 65, "width": 1034, "height": 618, "radius": 12 }
 *   }
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function roundedMaskSvg(width, height, radius) {
  return `<svg width="${width}" height="${height}"><rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="white"/></svg>`;
}

async function extractGifFrame(gifPath, frameOneBased) {
  const meta = await sharp(gifPath, { animated: true }).metadata();
  const pages = meta.pages ?? 1;
  const pageIndex = frameOneBased - 1;
  if (pageIndex < 0 || pageIndex >= pages) {
    throw new Error(`${gifPath}: frame ${frameOneBased} out of range (${pages} pages)`);
  }
  return sharp(gifPath, { animated: true, page: pageIndex }).png().toBuffer();
}

async function composePreviewHero({ slug, config, outDir }) {
  const targetPath = path.join(outDir, config.target);
  const gifPath = path.join(outDir, config.gif);
  const baseMeta = await sharp(targetPath).metadata();
  const scaleX = baseMeta.width / config.designSize.width;
  const scaleY = baseMeta.height / config.designSize.height;
  const scale = Math.min(scaleX, scaleY);

  const left = Math.round(config.mediaRect.left * scale);
  const top = Math.round(config.mediaRect.top * scale);
  const width = Math.round(config.mediaRect.width * scale);
  const height = Math.round(config.mediaRect.height * scale);
  const radius = Math.round(config.mediaRect.radius * scale);

  const frameBuf = await extractGifFrame(gifPath, config.frame);
  const mask = Buffer.from(roundedMaskSvg(width, height, radius));
  const mediaLayer = await sharp(frameBuf)
    .resize(width, height, { fit: "cover", position: "centre" })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const composed = await sharp(targetPath)
    .composite([{ input: mediaLayer, left, top }])
    .png()
    .toBuffer();

  await fs.writeFile(targetPath, composed);

  console.log(
    `composed ${slug}/${config.target} — GIF frame ${config.frame} at ${left},${top} ${width}×${height} (r=${radius})`,
  );
}

async function main() {
  const slugFilter = process.argv[2]?.trim();
  const mapPath = path.join(__dirname, "figma-asset-map.json");
  const map = JSON.parse(await fs.readFile(mapPath, "utf8"));

  let projects = map.projects.filter((p) => p.composePreview);
  if (slugFilter) {
    projects = projects.filter((p) => p.slug === slugFilter);
    if (projects.length === 0) {
      console.error(`No composePreview entry for slug "${slugFilter}"`);
      process.exit(1);
    }
  }

  for (const project of projects) {
    const outDir = path.join(root, "public", "assets", "work", project.slug);
    await composePreviewHero({ slug: project.slug, config: project.composePreview, outDir });
  }

  console.log("Done (preview hero frame compose).");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
