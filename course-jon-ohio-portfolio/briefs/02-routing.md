# Module 2: How Pages Find Their Place

### Teaching Arc
- **Metaphor:** A building's floor directory — the folder name IS the floor number. You don't need a receptionist to route you; the address system is built into the architecture itself. `app/work/[slug]/page.tsx` literally IS the URL `/work/anything`.
- **Opening hook:** "How does the site know that `/work/seamless-hiring` should show the SeamlessHiring case study and not a 404? The answer is hidden in the folder names inside `app/`."
- **Key insight:** In Next.js App Router, the folder structure in `app/` IS the URL structure. Square brackets `[slug]` mean "this part can be anything." `layout.tsx` wraps every child page. `page.tsx` is the actual content.
- **"Why should I care?":** When you tell an AI to "add a new page at /press," you now know *exactly* what to ask for: "Create `app/press/page.tsx` as a Server Component." No guessing.

### Code Snippets (pre-extracted)

File: app/work/[slug]/page.tsx (lines 102-128)
```tsx
export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  // ... renders the case study
}
```

File: app/sitemap.ts (lines 20-28) — already shown above in brief 1, re-use for routing angle:
The sitemap is auto-built from the same projects array. No manual URL list.

### Interactive Elements

- [x] **Group chat animation** — actors: URL Bar (the browser's address bar), Next.js Router, File System. Message flow:
  1. URL Bar: "Hey, user typed `/work/seamless-hiring`"
  2. Next.js Router: "Let me check my folder map… I see `app/work/[slug]/page.tsx`"
  3. Next.js Router: "The `[slug]` part matches `seamless-hiring`. I'll run that file."
  4. File System: "Here's `page.tsx` — it's asking for the project with slug `seamless-hiring`"
  5. Next.js Router: "Got it. Rendering now. The page uses `await params` to safely read the slug."
  6. URL Bar: "Page loaded! User sees the SeamlessHiring case study."
- [x] **Code↔English translation** — use the generateStaticParams + CaseStudy snippet above
- [x] **Quiz** — 4 questions:
  Q1: "You want to add a /press page. What file do you create?" (options: app/press.tsx / app/press/page.tsx / components/Press.tsx / pages/press.tsx). Correct: app/press/page.tsx. Explanation: In App Router, every route needs a `page.tsx` inside a folder matching the URL.
  Q2: "Why does the case study use `await params`?" (options: To make it load faster / Because params is a Promise in Next.js 16 / To prevent errors on slow connections / It's optional but good practice). Correct: Because params is a Promise. Explanation: Next.js 16 changed params to be a Promise — forgetting `await` causes a runtime error.
  Q3: "What does `generateStaticParams` do?" (scenario: options: Makes pages load faster by caching / Tells Next.js which slugs to pre-build at deploy time / Generates the sitemap.xml / Validates that slugs exist in the database). Correct: Tells Next.js which slugs to pre-build. Explanation: This runs at build time and generates one HTML file per project, so each case study is instant to serve.
  Q4: "A user goes to `/work/fake-project` — what happens?" (options: The page crashes / The server looks up 'fake-project' and renders whatever it finds / `getProject()` returns undefined, then `notFound()` is called, showing a 404 / An empty page renders). Correct: getProject returns undefined, notFound() shows 404.
- [x] **Visual file tree** — show `app/` folder with all routes annotated with their URLs. `[slug]` in a different color with tooltip: "Square brackets mean this folder accepts ANY value — that value becomes the slug variable."
- [x] **Flow diagram** — URL → folder match → layout.tsx wraps → page.tsx fills → HTML out. Simple 5-step horizontal flow with arrows.

### Reference Files to Read
- `references/interactive-elements.md` → "Group Chat Animation", "Code ↔ English Translation Blocks", "Multiple-Choice Quizzes", "Visual File Tree", "Flow Diagrams"
- `references/content-philosophy.md` → always include
- `references/gotchas.md` → always include

### Connections
- **Previous module:** Module 1 — The Map of the Machine (gave the 5-bucket overview; this module zooms into the `app/` bucket)
- **Next module:** Module 3 — Where the Content Lives (the `lib/` bucket — data layer)
- **Tone/style notes:** Module 2 uses --color-bg-warm (slightly warmer). Accent: teal #2A7B9B. Group chat actors: URL Bar = actor-1, Next.js Router = actor-2, File System = actor-3. Module number: 02.
