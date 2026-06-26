#!/usr/bin/env node
/**
 * Figma html-to-design capture via Playwright.
 * Usage: node scripts/figma-capture-run.mjs
 */
import { chromium } from "@playwright/test";

const BASE = "http://localhost:3000";

const captures = [
  { path: "/work/seamless-hiring", captureId: "32107197-06fc-44c6-9246-b37537072e63" },
  { path: "/work/rivva", captureId: "ecbaef4b-1488-4d70-85de-602df0f38a34" },
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const scriptText = await (
  await page.context().request.get("https://mcp.figma.com/mcp/html-to-design/capture.js")
).text();

for (const cap of captures) {
  const endpoint = `https://mcp.figma.com/mcp/capture/${cap.captureId}/submit`;
  console.log(`Capturing ${cap.path}...`);
  await page.goto(`${BASE}${cap.path}`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(4000);

  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 800) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
  });

  await page.evaluate((s) => {
    const el = document.createElement("script");
    el.textContent = s;
    document.head.appendChild(el);
  }, scriptText);
  await page.waitForTimeout(2000);

  const result = await page.evaluate(
    ({ captureId, endpoint }) =>
      window.figma.captureForDesign({ captureId, endpoint, selector: "body" }),
    { captureId: cap.captureId, endpoint },
  );

  console.log(JSON.stringify({ path: cap.path, captureId: cap.captureId, url: page.url(), result }));
  await page.waitForTimeout(10000);
}

await browser.close();
console.log("Done.");
