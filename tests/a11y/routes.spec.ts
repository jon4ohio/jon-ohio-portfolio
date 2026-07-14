import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "@/lib/projects";
import { THEME_STORAGE_KEY } from "@/components/theme";

const staticPaths = ["/", "/work", "/thinking", "/about", "/contact", "/notes/design-doesnt-end-in-figma"];

/** Pin light theme so axe runs are deterministic (avoids site default dark). */
test.beforeEach(async ({ page }) => {
  await page.addInitScript((key) => {
    try {
      window.localStorage.setItem(key, "light");
    } catch {
      /* private mode */
    }
    document.documentElement.dataset.theme = "light";
  }, THEME_STORAGE_KEY);
});

const caseStudySlug = projects[0]?.slug;
if (!caseStudySlug) {
  throw new Error("projects[0] is required for case study a11y route");
}

test("theme toggle exposes current state and updates theme", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const toggle = page.getByRole("button", {
    name: /light theme active\. switch to dark mode\./i,
  });
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  await toggle.click();

  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(
    page.getByRole("button", {
      name: /dark theme active\. switch to light mode\./i,
    })
  ).toHaveAttribute("aria-pressed", "true");
});

function formatViolations(violations: import("axe-core").Result[]) {
  return violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    help: v.help,
    nodes: v.nodes.map((n) => n.html?.slice(0, 200)),
  }));
}

/** Fail on critical + serious (common gate for automated a11y). */
function assertNoSeriousViolations(results: import("axe-core").AxeResults) {
  const bad = results.violations.filter(
    (v) => v.impact === "critical" || v.impact === "serious"
  );
  expect(
    bad,
    `Serious/critical axe violations:\n${JSON.stringify(formatViolations(bad), null, 2)}`
  ).toEqual([]);
}

for (const path of staticPaths) {
  test(`axe wcag2a/aa (no serious/critical): ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    assertNoSeriousViolations(results);
  });
}

test(`axe wcag2a/aa (no serious/critical): /work/${caseStudySlug}`, async ({
  page,
}) => {
  await page.goto(`/work/${caseStudySlug}`, { waitUntil: "domcontentloaded" });
  await page.locator("main").waitFor({ state: "visible" });
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    // FigJam embed UI is third-party; our page provides fallback links + noscript snapshot.
    .exclude("iframe")
    .analyze();
  assertNoSeriousViolations(results);
});

test("axe wcag2a/aa (no serious/critical): mobile viewport with menu open — /", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.scrollTo(0, 0));
  const menuButton = page.getByRole("button", { name: /open menu/i });
  await menuButton.scrollIntoViewIfNeeded();
  await expect(menuButton).toBeVisible();
  await menuButton.click({ force: true });
  await expect(page.locator("#nav-mobile-panel.open")).toBeVisible();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  assertNoSeriousViolations(results);
});

test("axe wcag2a/aa (no serious/critical): dark theme — /", async ({ page }) => {
  await page.addInitScript((key) => {
    try {
      window.localStorage.setItem(key, "dark");
    } catch {
      /* private mode */
    }
    document.documentElement.dataset.theme = "dark";
  }, THEME_STORAGE_KEY);
  await page.goto("/", { waitUntil: "networkidle" });
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  assertNoSeriousViolations(results);
});

test("axe wcag2a/aa (no serious/critical): 404 page", async ({ page }) => {
  const res = await page.goto("/this-route-should-not-exist-404", {
    waitUntil: "networkidle",
  });
  expect(res?.status(), "404 response").toBe(404);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  assertNoSeriousViolations(results);
});
