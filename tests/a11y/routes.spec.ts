import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "@/lib/projects";

const staticPaths = ["/", "/work", "/about", "/leadership"];

const caseStudySlug = projects[0]?.slug;
if (!caseStudySlug) {
  throw new Error("projects[0] is required for case study a11y route");
}

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
  await page.goto(`/work/${caseStudySlug}`, { waitUntil: "networkidle" });
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
