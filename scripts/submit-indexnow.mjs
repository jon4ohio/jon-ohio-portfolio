#!/usr/bin/env node
/**
 * Notify Bing/Yandex via IndexNow after deploy. Requires INDEXNOW_KEY in env and
 * NEXT_PUBLIC_SITE_URL for the public origin.
 *
 * Usage: INDEXNOW_KEY=... NEXT_PUBLIC_SITE_URL=https://johnohio.vercel.app npm run submit:indexnow
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const key = process.env.INDEXNOW_KEY?.trim() || "jopindexnow";
const origin = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
const host = origin?.replace(/^https?:\/\//, "");

if (!key || !host) {
  console.error("submit-indexnow: set INDEXNOW_KEY and NEXT_PUBLIC_SITE_URL");
  process.exit(1);
}

const sitemapPath = join(process.cwd(), ".next", "server", "app", "sitemap.xml.body");
let urlList;

try {
  const body = readFileSync(sitemapPath, "utf8");
  urlList = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
} catch {
  const fallback = [
    `${origin}/`,
    `${origin}/work`,
    `${origin}/thinking`,
    `${origin}/about`,
    `${origin}/notes/design-doesnt-end-in-figma`,
    `${origin}/work/rivva`,
  ];
  urlList = fallback;
}

if (urlList.length === 0) {
  console.error("submit-indexnow: no URLs found");
  process.exit(1);
}

const payload = {
  host,
  key,
  keyLocation: `${origin}/${key}.txt`,
  urlList,
};

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});

console.log(`submit-indexnow: ${response.status} ${response.statusText} (${urlList.length} URLs)`);
if (!response.ok) {
  const text = await response.text();
  console.error(text || "IndexNow request failed");
  process.exit(1);
}
