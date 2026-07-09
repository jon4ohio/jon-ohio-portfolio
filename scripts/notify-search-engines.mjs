#!/usr/bin/env node
/**
 * Notify search engines after deploy. Bing legacy sitemap ping + optional IndexNow.
 * Google Search Console sitemap submission requires manual verification in GSC UI.
 *
 * Usage:
 *   npm run notify:search
 *   INDEXNOW_KEY=... NEXT_PUBLIC_SITE_URL=https://johnohio.vercel.app npm run submit:indexnow
 */
const origin =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ?? "https://johnohio.vercel.app";
const sitemapUrl = `${origin}/sitemap.xml`;

const bingPing = await fetch(
  `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
);
console.log(`notify-search: Bing ping ${bingPing.status} ${bingPing.statusText}`);

const key = process.env.INDEXNOW_KEY?.trim() || "jopindexnow";
if (key) {
  const host = origin.replace(/^https?:\/\//, "");
  const urls = [
    `${origin}/`,
    `${origin}/work`,
    `${origin}/work/rivva`,
    `${origin}/notes/design-doesnt-end-in-figma`,
    `${origin}/about`,
  ];
  const indexNow = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `${origin}/${key}.txt`,
      urlList: urls,
    }),
  });
  console.log(`notify-search: IndexNow ${indexNow.status} ${indexNow.statusText}`);
} else {
  console.log("notify-search: INDEXNOW_KEY not set — skip IndexNow (optional)");
}

console.log("");
console.log("Google Search Console (manual):");
console.log(`  1. Add property: ${origin}`);
console.log("  2. Verify via GOOGLE_SITE_VERIFICATION env → redeploy → Verify in GSC");
console.log(`  3. Submit sitemap: ${sitemapUrl}`);
console.log(`  4. URL Inspection → Request indexing: ${origin}/ and flagship case studies`);
