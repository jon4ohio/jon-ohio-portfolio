# Module 5: Adding a Case Study End-to-End

### Teaching Arc
- **Metaphor:** Filling a new slot in a vinyl record shelf — the shelf (the site) already has dividers and labels; you just slide in a new record (the data object) and the system catalogues it automatically.
- **Opening hook:** "Here's the complete playbook: how to go from nothing to a fully live case study on this portfolio in exactly four steps — and which file to edit for every 'where do I change X?' question."
- **Key insight:** The whole site is built so that ONE file edit (lib/projects.ts) cascades to five places: the /work listing, the case study page, the homepage featured grid, the sitemap, and the static params build. Understanding this cascade means you can add or edit confidently without breaking anything.
- **"Why should I care?":** This module is the practical graduation test. After this, you can give an AI agent a precise, unambiguous brief: "Add a new case study to lib/projects.ts with these fields, and add a hero image at public/assets/work/my-project/hero.png." No more vague prompts.

### Code Snippets (pre-extracted)

File: lib/projects.ts — a complete project object (abbreviated SeamlessHiring):
```ts
{
  slug: "seamless-hiring",
  title: "SeamlessHiring 2.0",
  subtitle: "Recruitment Management System (RMS)",
  category: "Structured Systems",
  company: "SeamlessHR",
  period: "Mar 2022 – Mar 2025",
  summary: "Repositioned a broken recruitment add-on into a flagship hiring product...",
  role: "Lead Product Designer across product strategy, UX, and phased rollout.",
  scope: "Applicant and recruiter workflows, research synthesis...",
  metrics: [
    { value: "↓50%", label: "Support tickets" },
    { value: "100%", label: "Applicant completion" },
  ],
  context: "SeamlessHiring is SeamlessHR's pioneering Recruitment Management System...",
  problem: "The platform couldn't scale: user churn rose...",
  action: "Led a phased, user-centred rebuild...",
  impact: "In two years, SeamlessHiring moved from a discounted add-on to $3,600/year...",
  tags: ["Design Systems", "ATS", "Enterprise SaaS"],
  featured: true,
  assets: {
    hero: {
      src: "/assets/work/seamless-hiring/preview-16x9.png",
      alt: "SeamlessHiring 2.0 case study header",
      width: 3024,
      height: 1701,
    },
    thumbnails: [
      {
        src: "/assets/work/seamless-hiring/preview-16x9.png",
        alt: "SeamlessHiring 2.0 case study header",
        width: 3024,
        height: 1701,
      },
    ],
  },
}
```

File: app/work/[slug]/page.tsx (lines 102-104) — why new slugs "just work":
```tsx
export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
```

### Interactive Elements

- [x] **Data flow animation** — "Adding a case study, step by step." Actors: lib/projects.ts, /work page, homepage, sitemap, /work/[slug] page. Steps:
  Step 1: Add a new object to the `projects` array (highlight lib/projects.ts)
  Step 2: Drop your images into `public/assets/work/your-slug/` (highlight public/ — label "Assets")
  Step 3 (packet lib → /work): The /work listing page now shows your new card
  Step 4 (packet lib → homepage): If `featured: true`, the homepage featured section includes it
  Step 5 (packet lib → sitemap): sitemap.ts auto-generates a new URL entry
  Step 6 (packet lib → /work/[slug]): generateStaticParams pre-builds a static HTML file for your slug
- [x] **Code↔English translation** — use the full project object snippet. Left: the TypeScript object fields. Right: plain English for each field — especially `slug` (= URL path segment), `category` (= which group on /work), `featured` (= appears on homepage).
- [x] **Quiz** — 4 scenario/debugging questions:
  Q1: "You added a project but it's not showing on the homepage. Most likely cause?" (options: You forgot to add the image / You set `featured: false` / The slug has a space in it / The TypeScript type is wrong). Correct: featured: false. Explanation: The homepage reads `getFeaturedProjects()` which filters for `featured: true`. The /work page shows everything regardless.
  Q2: "You named your slug 'My New Project'. What will the URL look like, and is that a problem?" (options: /work/My-New-Project — totally fine / /work/My%20New%20Project — the space becomes %20, which works but looks ugly and can break some tools. Use kebab-case like 'my-new-project' instead / /work/mynewproject — spaces are stripped / It won't work at all). Correct: Space becomes %20 — use kebab-case. 
  Q3: "You want to add a second thumbnail (shown in the /work listing as a secondary image). Where does it go in the assets object?" (options: Add it to `assets.blocks` / Set it as `assets.thumbnails[1]` — the optional second slot / Add another `hero` field / Create a separate `secondary` field). Correct: assets.thumbnails[1].
  Q4: "The case study page shows a placeholder image instead of yours. Where do you check first?" (options: app/work/[slug]/page.tsx — the image rendering logic / The src path in your project object's hero/thumbnails — confirm it matches the actual file path in public/ / The AssetImage component / next.config.ts). Correct: Check the src path matches the actual file in public/.
- [x] **Numbered step cards** — "The 4-step playbook": Step 1: Add your object to `projects[]` in lib/projects.ts. Step 2: Drop images in `public/assets/work/your-slug/`. Step 3: Set `featured: true` if you want it on the homepage. Step 4: Run `npm run build` — generateStaticParams does the rest.
- [x] **"Where do I change X?" reference** — a visual table / icon-label grid of common tasks:
  - Change nav links → components/Nav.tsx
  - Add/edit a case study → lib/projects.ts
  - Change hero text → components/Hero.tsx
  - Edit footer → components/Footer.tsx
  - Add a new page → app/[page-name]/page.tsx
  - Change site title/SEO → app/layout.tsx (metadata export)
  - Add a press mention → lib/thinking.ts (recognitionItems)
  - Change theme colors → app/globals.css (CSS custom properties)
  - Add a project image → public/assets/work/[slug]/

### Reference Files to Read
- `references/interactive-elements.md` → "Message Flow / Data Flow Animation", "Code ↔ English Translation Blocks", "Multiple-Choice Quizzes", "Numbered Step Cards", "Icon-Label Rows"
- `references/content-philosophy.md` → always include
- `references/gotchas.md` → always include

### Connections
- **Previous module:** Module 4 — How Themes Work (visual layer; this module is the practical "do it" capstone)
- **Next module:** none — this is the finale
- **Tone/style notes:** Module 5 uses --color-bg (off-white). Accent: teal #2A7B9B. Flow animation actor colors: lib/projects.ts = actor-1 (teal, hub), /work = actor-2, homepage = actor-3, sitemap = actor-4, /work/[slug] = actor-5. Module number: 05.
