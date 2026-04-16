# Module 3: Where the Content Lives

### Teaching Arc
- **Metaphor:** A museum's object registry — every artifact (project) has its own card with a unique ID, title, description, and dimensions. Curators don't paint directly on the walls; they update the registry and the display cases update automatically.
- **Opening hook:** "When John Ohio adds a new case study, he doesn't touch the homepage, the /work page, the sitemap, or the case study page itself. He edits ONE file — and all four update automatically."
- **Key insight:** All content lives in static TypeScript arrays in `lib/`. `lib/projects.ts` is the single source of truth for every case study. Pages read from it using helper functions. Change the data → every page that uses it updates. This is why the site has zero database, zero CMS, zero API calls.
- **"Why should I care?":** This is the most empowering thing to understand. "Add a case study" = edit one object in `lib/projects.ts`. Nothing else needed. You can tell an AI exactly what to add and where.

### Code Snippets (pre-extracted)

File: lib/projects.ts (lines 1-60) — Project interface
```ts
export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  company: string;
  period: string;
  summary: string;
  role: string;
  scope: string;
  metrics: { value: string; label: string }[];
  context: string;
  problem: string;
  action: string;
  impact: string;
  systemEvolution?: string;
  systemImpact?: string;
  keyInsight?: string;
  tags: string[];
  featured: boolean;
  assets?: ProjectAssets;
}
```

File: lib/projects.ts — helper functions (approximately lines 200-220, conceptual):
```ts
export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getPrimaryPreviewImage(
  assets: ProjectAssets | undefined
): ImageAsset | undefined {
  return assets?.hero ?? assets?.thumbnails?.[0];
}
```

File: lib/thinking.ts (lines 1-30) — same pattern for Thinking page content
```ts
export type RecognitionItem = {
  id: string;
  outlet: string;
  title: string;
  description: string;
  href: string;
};

export const recognitionItems: RecognitionItem[] = [
  {
    id: "techcabal-quick-fire",
    outlet: "TechCabal",
    title: "Quick Fire",
    description: "Interview on AI, enterprise design, and product craft — Feb 2026.",
    href: "https://techcabal.com/2026/02/13/john-ohio-quick-fire/",
  },
  // ...
];
```

File: app/sitemap.ts — how lib/ data auto-generates the sitemap:
```ts
...projects.map((p) => ({
  url: `${baseUrl}/work/${p.slug}`,
  lastModified: now,
  changeFrequency: "yearly" as const,
  priority: 0.6,
})),
```

### Interactive Elements

- [x] **Code↔English translation** — use the Project interface snippet. Left: the TypeScript interface. Right: plain English per field. e.g., `slug` → "The URL-safe name — this becomes the last part of the URL (/work/THIS-PART)". `metrics` → "An array of key wins — each metric shows a value and a label on the case study card and hero."
- [x] **Data flow animation** — "Adding a project flows everywhere." Actors: lib/projects.ts, /work page, /work/[slug] page, sitemap.xml, Homepage featured section. Steps:
  1. You add an object to the `projects` array in lib/projects.ts (highlight lib/projects.ts)
  2. The /work page reads `projects` and renders a new card automatically (packet: lib → /work)
  3. The homepage's featured section re-evaluates `getFeaturedProjects()` (packet: lib → homepage)
  4. The case study page reads `getProject(slug)` to render the full case study (packet: lib → /work/[slug])
  5. sitemap.ts maps over `projects` — a new URL appears in sitemap.xml (packet: lib → sitemap)
- [x] **Quiz** — 4 questions:
  Q1: "You want to change the title of the IBEDC case study. Where do you edit?" (options: app/work/[slug]/page.tsx / lib/projects.ts — find the IBEDC object and change the title field / components/AssetImage.tsx / public/assets/work/ibedc/). Correct: lib/projects.ts. Explanation: The page reads from lib/projects.ts — change the data, the page updates automatically.
  Q2: "You add a project with `featured: false`. Where will it appear?" (options: Everywhere / Only on /work, not the homepage featured section / Nowhere — only featured: true projects appear anywhere / Only in the sitemap). Correct: Only on /work, not the homepage featured section. Explanation: The homepage uses `getFeaturedProjects()` which filters for `featured: true`. The /work page shows all projects.
  Q3: "You want to add a press mention to the Thinking page. Which file?" (options: lib/projects.ts / app/thinking/page.tsx / lib/thinking.ts — add to recognitionItems / components/ThinkingHomeTeaser.tsx). Correct: lib/thinking.ts.
  Q4: "What does getPrimaryPreviewImage() do?" Scenario: You add a new project with both `hero` and `thumbnails`. Which image appears in the listing card? (options: thumbnails[0] always / hero always / hero if it exists, otherwise thumbnails[0] / The last image in the thumbnails array). Correct: hero if it exists, otherwise thumbnails[0].
- [x] **Architecture diagram** — clickable. Nodes: lib/projects.ts (center), app/page.tsx, app/work/page.tsx, app/work/[slug]/page.tsx, app/sitemap.ts. Click each consumer to see a description of what data it reads.
- [x] **Pattern cards** — four cards: "slug → URL", "featured → homepage", "assets → images", "tags → labels"

### Reference Files to Read
- `references/interactive-elements.md` → "Code ↔ English Translation Blocks", "Message Flow / Data Flow Animation", "Multiple-Choice Quizzes", "Interactive Architecture Diagram", "Pattern/Feature Cards"
- `references/content-philosophy.md` → always include
- `references/gotchas.md` → always include

### Connections
- **Previous module:** Module 2 — How Pages Find Their Place (routing; pages consume the data from lib/)
- **Next module:** Module 4 — How Themes Work (the visual layer — CSS tokens + ThemeScript)
- **Tone/style notes:** Module 3 uses --color-bg (off-white). Accent: teal #2A7B9B. Architecture diagram node colors: lib/projects.ts = actor-1 (teal, the hub), consumer pages = actor-2/3/4/5. Module number: 03.
