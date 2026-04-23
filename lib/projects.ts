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
  // Optional system-level case study sections
  systemEvolution?: string;
  systemImpact?: string;
  keyInsight?: string;
  tags: string[];
  featured: boolean;
  assets?: ProjectAssets;
}

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** Solid fill behind the image (e.g. #fff for screenshots). */
  backdropColor?: string;
};

export type CaseStudyBlock =
  | {
      kind: "image";
      image: ImageAsset;
      layout?: "inline" | "wide";
      treatment?: "plain" | "device";
    }
  | {
      kind: "gallery";
      images: ImageAsset[];
      columns?: 2 | 3;
      layout?: "inline" | "wide";
      treatment?: "plain" | "device";
    }
  | {
      kind: "callout";
      title: string;
      body: string;
    };

/** Card + case study lead art. When both `hero` and `thumbnails` exist, keep `thumbnails[0]` identical to `hero` (see IBEDC). Use {@link getPrimaryPreviewImage} in UI. */
export type ProjectAssets = {
  thumbnails?: [ImageAsset, ImageAsset?];
  hero?: ImageAsset;
  blocks?: CaseStudyBlock[];
};

const placeholderThumbA: ImageAsset = {
  src: "/assets/work/_placeholders/thumb-a.svg",
  alt: "Project thumbnail placeholder",
  width: 1200,
  height: 900,
};

const placeholderThumbB: ImageAsset = {
  src: "/assets/work/_placeholders/thumb-b.svg",
  alt: "Project thumbnail placeholder (alt)",
  width: 1200,
  height: 900,
};

const placeholderHero: ImageAsset = {
  src: "/assets/work/_placeholders/hero.svg",
  alt: "Case study hero placeholder",
  width: 2400,
  height: 1350,
};

export const projects: Project[] = [
  {
    slug: "seamless-hiring",
    title: "SeamlessHiring 2.0",
    subtitle: "Recruitment Management System (RMS)",
    category: "Structured Systems",
    company: "SeamlessHR",
    period: "Mar 2022 – Mar 2025",
    summary:
      "Re-architected a core enterprise workflow from an underperforming add-on into a flagship hiring product. Rebuilt workflow trust, restored completion rates, and introduced structured AI-assisted decision points used by HR teams across the platform.",
    role: "Lead Product Designer across product strategy, UX, and phased rollout.",
    scope:
      "Applicant and recruiter workflows, research synthesis, roadmap definition, and cross-functional delivery with PM, engineering, CX, and sales.",
    metrics: [
      { value: "↓50%", label: "Support tickets" },
      { value: "100%", label: "Applicant completion" },
      { value: "27→74", label: "NPS" },
      { value: "$3,600/yr", label: "Flagship module pricing" },
    ],
    context:
      "SeamlessHiring is SeamlessHR’s pioneering Recruitment Management System (RMS). Built on a legacy PHP‑Blade foundation, it became so burdened by inefficiencies that sales could only move it as a nominal add‑on priced at ₦150,000 (≈ US $190) — a steep discount that signalled sagging perceived value and stalled revenue growth.",
    problem:
      "The platform couldn’t scale: user churn rose, applicants dropped mid‑flow, and revenue drag compounded. Research showed repetitive errors, broken links, mis‑sequenced steps, and reconciliation busywork that ate recruiter time and eroded trust in the hiring process.",
    action:
      "Led a phased, user‑centred rebuild anchored on restoring trust and eliminating systemic failure points. Partnered cross‑functionally (PM, engineering, CX, sales) to synthesize FullStory analytics, stakeholder interviews, and ticket audits into a five‑phase roadmap that delivered zero‑downtime improvements while modernising the end‑to‑end experience.",
    impact:
      "In two years, SeamlessHiring moved from a discounted “add‑on” to a $3,600‑per‑year flagship module. Support tickets dropped 50%, applicant completion reached 100%, and NPS rose from 27 to 74 while saving clients an estimated ~$500k/year in admin overhead.",
    tags: ["Design Systems", "ATS", "Enterprise SaaS", "AI/ML", "DesignOps"],
    featured: true,
    assets: {
      thumbnails: [
        {
          src: "/assets/work/seamless-hiring/preview-16x9.png",
          alt: "SeamlessHiring 2.0 case study header with RMS dashboard preview",
          width: 3024,
          height: 1701,
        },
        {
          src: "/assets/work/seamless-hiring/thumb-2.png",
          alt: "Product screenshots from the SeamlessHiring case study",
          width: 2196,
          height: 1304,
        },
      ],
      hero: {
        src: "/assets/work/seamless-hiring/preview-16x9.png",
        alt: "SeamlessHiring 2.0 case study header with RMS dashboard preview",
        width: 3024,
        height: 1701,
      },
      blocks: [
        {
          kind: "image",
          layout: "wide",
          treatment: "device",
          image: {
            src: "/assets/work/seamless-hiring/block-cover.png",
            alt: "Slide from the SeamlessHiring portfolio presentation",
            width: 2196,
            height: 1002,
            caption: "Portfolio narrative slide from the SeamlessHiring rebuild.",
          },
        },
        {
          kind: "image",
          layout: "wide",
          treatment: "plain",
          image: {
            src: "/assets/work/seamless-hiring/block-pain-points.png",
            alt: "Pain point discovery — interviews, synthesis, and key insights",
            width: 2196,
            height: 2312,
            caption: "Research-led problem framing: what broke down for recruiters and applicants.",
          },
        },
        {
          kind: "gallery",
          layout: "inline",
          columns: 2,
          treatment: "plain",
          images: [
            {
              src: "/assets/work/seamless-hiring/block-gallery-1.png",
              alt: "TL;DR metrics table — SeamlessHiring measurable impact",
              width: 2196,
              height: 966,
              caption: "Impact snapshot (TL;DR section).",
            },
            {
              src: "/assets/work/seamless-hiring/thumb-2.png",
              alt: "Overlapping mobile and desktop UI from the case study",
              width: 2196,
              height: 1304,
              caption: "Key UI explorations from the phased rollout.",
            },
          ],
        },
        {
          kind: "image",
          layout: "wide",
          treatment: "plain",
          image: {
            src: "/assets/work/seamless-hiring/block-journey.png",
            alt: "Revisiting the customer journey map after research and phased delivery",
            width: 2196,
            height: 788,
            caption: "Journey alignment as roadmap phases and governance landed.",
          },
        },
      ],
    },
  },
  {
    slug: "seamkit",
    title: "Seamkit",
    subtitle: "Enterprise Design System",
    category: "Structured Systems",
    company: "SeamlessHR",
    period: "Dec 2023 – Present",
    summary:
      "Designed and scaled a unified product system across 12 teams — from scattered component libraries to a governed, token-driven architecture embedded across every SeamlessHR product. Now the standard for how design and engineering ship together.",
    role: "Design Systems Lead and DesignOps driver.",
    scope:
      "Token architecture, component foundations, governance, adoption strategy, documentation, and team enablement across the product organisation.",
    metrics: [
      { value: "12", label: "Teams onboarded" },
      { value: "88.9", label: "Adoption score /100" },
      { value: "91.1", label: "Trust score /100" },
      { value: "+15%", label: "Efficiency uplift" },
    ],
    context:
      "SeamlessHR runs multiple products across HR, payroll, recruitment, and performance management. Each product team had evolved its own component library, its own naming conventions, its own design patterns. The result was inconsistent interfaces across the suite, duplicated design and engineering effort, and no way to roll out platform-wide changes without touching every product individually. When the company needed to move fast — on a rebrand, a new product line, a compliance update — the fragmentation made it expensive. There was no single source of truth. There was also no one responsible for building one.",
    problem:
      "Getting 12 product teams onto a shared system is not a design problem. It's an organizational one, and it was harder than the architecture. Each team had legitimate reasons to resist: delivery timelines, engineering muscle memory around existing patterns, and designers who had made considered local decisions that a new shared system might overrule. A top-down mandate would have generated surface compliance — teams technically using Seamkit but routing around it for anything that required judgment. The adoption risk was the real project. Getting the token architecture right mattered; getting twelve teams to trust a system they didn't build mattered more. That required showing up in team rituals rather than sending documentation, fixing edge cases within the same sprint they were reported, and treating adoption metrics — not just component coverage — as the primary measure of whether Seamkit was actually working. The governance model had to feel like a service, not a constraint. Contribution had to feel like influence, not bureaucratic overhead. The 91.1/100 trust score reflects that. Trust at that level, across teams with different codebases and competing priorities, doesn't come from a good Figma library. It comes from the system being genuinely useful under real product pressure.",
    action:
      "I led Seamkit from concept to cross-product adoption. I defined the token hierarchy — a layered naming model separating primitive values, semantic roles, and component-level overrides. This wasn't cosmetic; it was the structural decision that determines whether a design system can scale or collapses into a pile of exceptions. Every downstream decision — how components are named, how themes work, how engineers consume the system — traces back to this architecture. A design system without governance becomes a dumping ground, so I wrote the contribution SOP, defined the component lifecycle stages (proposal, draft, review, stable, deprecated), and set the criteria for what enters the system versus what stays product-specific. This reduced arbitrary additions and gave teams a clear path to influence the system without breaking it. I ran structured onboarding per team, embedded Seamkit into the engineering workflow via a Vue component library and Figma token sync, and maintained adoption tracking across all 12 teams. The 88.9/100 adoption score and 91.1/100 trust score came from teams that were initially skeptical. Seamkit is not a project — it's an operating system for product work at SeamlessHR. I own its roadmap, its versioning, its documentation, and the decisions about what changes when new product directions require it. Key decisions and what they cost: I prioritised token architecture before components. The faster path was to ship components immediately — visible deliverables, early wins, teams see something working. I chose to establish the token layer first: primitive values, semantic mappings, component-level overrides, all defined and agreed before a single component was built. This delayed the moment when teams could see tangible output by roughly six weeks. The cost was real — early stakeholder pressure to show visible progress. The payoff was a system where a theme change or a brand update touches one layer and propagates everywhere, rather than requiring per-component edits across the suite. Without that architecture decision, Seamkit would have become the same problem it was built to replace. I chose incremental rollout over full migration. A full cut-over would have been cleaner to coordinate and easier to communicate, but a forced migration at platform scale, across teams with active delivery commitments, would have generated resentment rather than buy-in. The cost was a longer period of coexistence between Seamkit and legacy patterns, which created some inconsistency during the transition and required more sustained coordination than a clean cut-over would have. Teams that choose to adopt a system maintain it; teams that are forced onto one route around it at the first opportunity. I chose co-creation over enforcement. I could have written the system standards and distributed them; instead I ran design audits per product team, ran sessions where teams surfaced their real constraints, and let those constraints shape the contribution model. The cost was time — this process took significantly longer than a top-down approach. The outcome was a system that teams contribute to and defend, rather than one they tolerate.",
    impact:
      "Before Seamkit, shipping a UI change to a shared pattern meant coordinating separately with each product team — if it happened at all. Now, a token update propagates across every product in one release cycle. Before Seamkit, design and engineering worked from different references. Now they work from the same source. The 88.9/100 adoption score reflects consistent usage. The 91.1/100 trust score reflects something harder to achieve: teams that rely on the system, rather than routing around it. The technical side of a design system is solvable. The architecture decisions are consequential but learnable. What can't be templated is the organizational work — building trust with teams that had no reason to give it, making governance feel like a feature rather than a fence, and sustaining engagement long past the point when the initial momentum runs out. A design system that only designers trust is a Figma file. Seamkit became infrastructure.",
    tags: ["Design Systems", "Tokens", "Governance", "Vue", "Figma"],
    featured: true,
    assets: {
      thumbnails: [
        {
          src: "/assets/work/seamkit/preview-16x9.png",
          alt: "SeamKit enterprise design system case study header",
          width: 3024,
          height: 1701,
        },
        {
          src: "/assets/work/seamkit/thumb-2.png",
          alt: "Design system screenshots and UI examples",
          width: 2120,
          height: 1110,
        },
      ],
      hero: {
        src: "/assets/work/seamkit/preview-16x9.png",
        alt: "SeamKit enterprise design system case study header",
        width: 3024,
        height: 1701,
      },
      blocks: [
        {
          kind: "image",
          layout: "wide",
          treatment: "plain",
          image: {
            src: "/assets/work/seamkit/block-hypothesis.png",
            alt: "Hypothesis and objective for consolidating SeamKit",
            width: 3024,
            height: 1136,
            caption: "Why a unified design system was essential for PLG and global scale.",
          },
        },
        {
          kind: "image",
          layout: "wide",
          treatment: "plain",
          image: {
            src: "/assets/work/seamkit/block-approach.png",
            alt: "Approach section — technology behind SeamKit",
            width: 2196,
            height: 1864,
            caption: "Technology choices: tokens, components, and integration across design and engineering.",
          },
        },
      ],
    },
  },
  {
    slug: "fetsproza",
    title: "FetsProza",
    subtitle: "Infrastructure‑as‑a‑Service (IaaS) Platform",
    category: "Scalable Systems",
    company: "Funds and Electronic Transfer Solutions (Fets) · Nigeria",
    period: "2021 – 2025",
    summary:
      "Designed the interfaces for a mobile money engine that eliminated a costly external vendor dependency. The system now handles double the original transaction capacity and enables white-label revenue — saving over $1M annually.",
    role: "Lead Product Designer across platform strategy and operational UX.",
    scope:
      "Transaction engine workflows, operator console, reporting, reconciliation, and direct collaboration with engineering on financial operations.",
    metrics: [
      { value: "$1M+", label: "Saved annually" },
      { value: "2×", label: "Transaction capacity" },
      { value: "50%", label: "Faster settlement" },
      { value: "White-label", label: "Licensable engine" },
    ],
    context:
      "Fetswallet’s mobile‑money operations relied on Huawei’s licensed engine — costly, inflexible, and struggling to keep up with growth. With expansion plans (including Congo), the team needed infrastructure we could customise instead of merely leasing.",
    problem:
      "The vendor system limited scalability and localisation, and it blocked white‑label opportunities. Operational work stayed overly manual, and strategic product decisions were constrained by a third‑party dependency.",
    action:
      "Led strategy, operations, and product design for Fetsproza: a proprietary, white‑label‑ready IaaS platform powering a modular transaction engine, reporting, and an operator console. Worked directly with engineering to translate complex financial workflows into clear, auditable interfaces.",
    impact:
      "Saved the company $1M+ annually, streamlined operations, and laid the groundwork for licensing the engine to external fintechs. Transaction capacity doubled (10k → 20k/min) and settlement time halved (4s → 2s), unlocking a new white‑label revenue stream.",
    tags: ["Fintech", "IaaS", "Mobile Money", "Infrastructure", "0→1"],
    featured: true,
    assets: {
      thumbnails: [
        {
          src: "/assets/work/fetsproza/preview-16x9.png",
          alt: "FetsProza IaaS platform case study header",
          width: 3024,
          height: 1701,
        },
        {
          src: "/assets/work/fetsproza/thumb-2.png",
          alt: "Operator console and platform screenshots",
          width: 2196,
          height: 1222,
        },
      ],
      hero: {
        src: "/assets/work/fetsproza/preview-16x9.png",
        alt: "FetsProza IaaS platform case study header",
        width: 3024,
        height: 1701,
      },
      blocks: [
        {
          kind: "gallery",
          layout: "wide",
          columns: 2,
          treatment: "plain",
          images: [
            {
              src: "/assets/work/fetsproza/block-module-payment.png",
              alt: "FetsProza platform — payment processing module in context",
              width: 2196,
              height: 1742,
              caption: "Payment processing: real-time flows, refunds, and peak-load performance.",
            },
            {
              src: "/assets/work/fetsproza/block-module-merchant.png",
              alt: "FetsProza platform — merchant and agent management",
              width: 2196,
              height: 1742,
              caption: "Merchant and agent management: onboarding and reconciliation.",
            },
          ],
        },
        {
          kind: "image",
          layout: "wide",
          treatment: "plain",
          image: {
            src: "/assets/work/fetsproza/block-outcome.png",
            alt: "Outcome — quantitative, UX, and strategic impact for FetsProza",
            width: 3024,
            height: 2254,
            caption: "Measurable impact: cost savings, throughput, and white-label positioning.",
          },
        },
      ],
    },
  },
  {
    slug: "orchestrated-portfolio",
    title: "Agentic Portfolio",
    subtitle: "From agents to production",
    category: "Intelligent Systems",
    company: "Self-directed",
    period: "2026",
    summary:
      "A production portfolio shipped without writing most of the code — by designing the system that built it.",
    role: "System designer, orchestrator, and decision-maker throughout. Every judgment call — what to build, in what order, and which tool to trust — was mine.",
    scope:
      "Workflow design, input synthesis, Figma integration, decision logging, multi-tool coordination, and live deployment.",
    metrics: [
      { value: "Solo", label: "Team" },
      { value: "4", label: "Agents" },
      { value: "4", label: "System layers" },
      { value: "Deployed", label: "Status" },
    ],
    context:
      "A partially abandoned Figma prototype, a CV, case study documents, presentation decks, and years of work across enterprise SaaS, fintech, and DesignOps had never been pulled into a single deployable portfolio. No production codebase experience. The missing piece was not a developer — it was orchestration.",
    problem:
      "Years of work scattered across a dozen files with no single through-line. No engineering background. And mid-build, the tools themselves started working against the project — burning through compute limits, losing context between sessions, repeating decisions that were already made.",
    action:
      "The first decision was to share everything upfront — prototype, CV, case study docs, presentations — before asking any tool to produce anything. When compute limits surfaced mid-build, the response wasn't to lower the ambition. It was to redesign who did what: one tool for strategy and judgment calls, another for volume output, a third for independent review — Codex flagged a real asset encoding error on a merged PR without being asked — a fourth for voice. A shared repository became the project's memory — the one place where decisions survived past any single session. Deployments went live continuously, not at the end. Late in the build, the design file and the codebase started feeding each other: changes in one reflected in the other. The loop closed — design and code stopped waiting on each other.",
    impact:
      "The site shipped across four sections with a full decision log and a live design-to-code feedback loop. The more transferable result was a shift in how execution worked — something to direct rather than absorb. The judgment that mattered most throughout: knowing which decisions needed a human and which could be handed off to a well-structured system. That's the same instinct behind every DesignOps problem.",
    systemEvolution:
      "Mid-build, compute limits surfaced before the work was done. Pushing through with the same setup would have meant lower quality or lower ambition. Instead, I treated it as a system design problem — redistributed responsibility across tools, reserved the most capable one for decisions that actually needed it. The constraint produced better role clarity than a clean start would have. The constraint was the architecture.",
    systemImpact:
      "The deeper problem wasn't compute — it was memory. Each tool session started fresh. Decisions made in one session had no way of reaching the next. The fix was to document every significant decision in the repository itself, with the reasoning attached. Any tool, in any session, could read the history and continue without repeating what had already been resolved. Writing decisions down as they were made is what held the system together. ADR-008 formalised the gate: major pushes must update the decision log so rationale never lives only in a chat session. It blocked a PR mid-build when the rule wasn't followed — no human needed to catch it.",
    keyInsight:
      "Keeping the design file in sync with the codebase changed what design feedback felt like. Changes didn't have to wait for a developer to interpret them — they moved directly into the build. The gap between design and engineering didn't close — but it became something you could cross in either direction. That changes what design is allowed to do.",
    tags: ["DesignOps", "AI/ML", "Systems", "Workflow", "0→1"],
    featured: false,
    assets: {
      thumbnails: [
        {
          src: "/assets/work/orchestrated-portfolio/preview-16x9.png",
          alt: "Agentic Portfolio — homepage hero with nav, headline, CTAs, and metrics strip",
          width: 1024,
          height: 576,
        },
        {
          src: "/assets/work/orchestrated-portfolio/system-diagram.png",
          alt: "Multi-agent portfolio system diagram — roles, infrastructure layers, and bidirectional Figma–code loop",
          width: 1024,
          height: 768,
        },
      ],
      hero: {
        src: "/assets/work/orchestrated-portfolio/preview-16x9.png",
        alt: "Agentic Portfolio — homepage hero with nav, headline, CTAs, and metrics strip",
        width: 1024,
        height: 576,
      },
      blocks: [
        {
          kind: "image",
          layout: "wide",
          treatment: "plain",
          image: {
            src: "/assets/work/orchestrated-portfolio/system-diagram.png",
            alt: "Multi-agent portfolio system: orchestrator, reasoning tools, infrastructure layers, and bidirectional Figma–code loop.",
            width: 1024,
            height: 768,
            caption: "Orchestrator, tools, shared state, ADRs, deploy — and the Figma MCP loop.",
          },
        },
        {
          kind: "callout",
          title: "System proof",
          body:
            "Independent review and governance ran continuously. Codex reviewed PRs without being asked, and ADR-008 blocked merges when major changes landed without an ADR update — no human needed to enforce it.",
        },
        {
          kind: "gallery",
          layout: "wide",
          columns: 2,
          treatment: "plain",
          images: [
            {
              src: "/assets/work/orchestrated-portfolio/codex-review.png",
              alt: "Codex bot leaving a review comment on a PR flagging JPEG bytes committed as hero.png",
              width: 1024,
              height: 768,
              caption: "Codex: JPEG bytes committed as hero.png.",
            },
            {
              src: "/assets/work/orchestrated-portfolio/adr-gate.png",
              alt: "GitHub checks showing ADR gate failing on a pull request",
              width: 1024,
              height: 768,
              caption: "ADR gate: major change without an ADR update.",
            },
          ],
        },
        {
          kind: "callout",
          title: "Design loop",
          body:
            "The Figma file stayed current with the codebase throughout the build — pages for each case study, synced with what shipped.",
        },
        {
          kind: "image",
          layout: "wide",
          treatment: "plain",
          image: {
            src: "/assets/work/orchestrated-portfolio/figma-export.png",
            alt: "Figma workspace with portfolio case study artboards — About, BluAlliance, SeamlessHiring, Seamkit, FetsProza",
            width: 1024,
            height: 768,
            caption: "Figma case study pages kept in sync with what shipped.",
          },
        },
        {
          kind: "callout",
          title: "Implementation surface",
          body:
            "Cursor handled implementation volume — edits, builds, and ADR logging — while the agent panel ran merge checks and conflict resolution in the same session.",
        },
        {
          kind: "image",
          layout: "wide",
          treatment: "plain",
          image: {
            src: "/assets/work/orchestrated-portfolio/cursor-proof.png",
            alt: "Cursor IDE showing the portfolio codebase, dev server, docs/adrs, and AI agent completing ADR log work",
            width: 1024,
            height: 768,
            caption: "Cursor: dev server, ADR log, and merge checks in one session.",
          },
        },
      ],
    },
  },
  {
    slug: "ibedc",
    title: "IBEDC Digital Transformation",
    subtitle: "Care App + POS System",
    category: "Scalable Systems",
    company: "Fets × IBEDC",
    period: "2022 – 2024",
    summary:
      "Designed consumer and field payment tools for one of Nigeria's largest electricity distributors, translating complex utility infrastructure into usable workflows at public-sector scale. 10,000+ downloads in the first six months; 4.6 stars on the Play Store.",
    role: "Lead Product Designer for customer and operational experiences.",
    scope:
      "Consumer app flows, agent and POS workflows, reconciliation tooling, and service operations spanning digital and walk-in channels.",
    metrics: [
      { value: "4.6★", label: "Play Store (2,800+ reviews)" },
      { value: "10k+", label: "App downloads (first 6 mo)" },
      { value: "↓80%", label: "Fraud reduction" },
      { value: "↓30%", label: "Call-centre volume" },
      { value: "3", label: "Utilities on POS template" },
      { value: "24–48h→mins", label: "Token/payment turnaround" },
    ],
    context:
      "The Ibadan Electricity Distribution Company (IBEDC) is Nigeria’s largest distribution company by geographic coverage, serving five states. Its billing and payment operations relied heavily on manual processes and fragmented third‑party portals.",
    problem:
      "Customers bounced between third‑party portals (FETSwallet, Bypower, bank USSD…) or queued at walk‑in centres using handwritten ledgers. Token SMS often lagged 24–48 hours; revenue leaked; and support tickets doubled year‑on‑year.",
    action:
      "Designed a friction‑free, end‑to‑end digital experience: IBEDC Care App (B2C + customer relations) and a bespoke POS terminal workflow for walk‑in centres. Digitised billing, payment, receipt verification, and reconciliation so both customers and staff could transact confidently and traceably.",
    impact:
      "IBEDC’s billing and payments shifted from paper and third‑party fragmentation to a unified digital system: customers transact in seconds, staff reconcile in minutes, and revenue leakage is materially reduced. The Care App passed 10,000+ downloads in its first six months, with a 4.6★ Play Store rating and 2,800+ reviews; fraud fell 80% with stronger verification, and call‑centre volume dropped ~30% as queue and token complaints eased. Token and payment turnaround moved from 24–48 hours to minutes. The POS template was adopted by three external utilities, proving scalability beyond IBEDC.",
    tags: ["Fintech", "Utilities", "Mobile App", "POS", "Public Sector"],
    featured: true,
    assets: {
      thumbnails: [
        {
          src: "/assets/work/ibedc/preview-16x9.png",
          alt: "IBEDC Digital Transformation — project preview",
          width: 2752,
          height: 1548,
        },
        {
          src: "/assets/work/ibedc/thumb-2.png",
          alt: "Overview — north-star objective for IBEDC digital transformation",
          width: 2196,
          height: 770,
        },
      ],
      hero: {
        src: "/assets/work/ibedc/preview-16x9.png",
        alt: "IBEDC Digital Transformation case study header",
        width: 2752,
        height: 1548,
      },
      blocks: [
        {
          kind: "image",
          layout: "wide",
          treatment: "plain",
          image: {
            src: "/assets/work/ibedc/block-customer-journey.png",
            alt: "Customer journey user flow — IBEDC digital touchpoints",
            width: 2197,
            height: 1487,
            caption: "Customer journey user flow.",
          },
        },
        {
          kind: "image",
          layout: "wide",
          treatment: "plain",
          image: {
            src: "/assets/work/ibedc/block-pos-payment-flow.png",
            alt: "POS payment user flow for walk-in centres",
            width: 3024,
            height: 1330,
            caption: "POS payment user flow.",
          },
        },
        {
          kind: "gallery",
          layout: "wide",
          columns: 2,
          treatment: "plain",
          images: [
            {
              src: "/assets/work/ibedc/block-pos-ui.png",
              alt: "POS terminal interface for in-person payments",
              width: 3024,
              height: 2071,
              caption: "POS UI.",
            },
            {
              src: "/assets/work/ibedc/block-care-app-ui.png",
              alt: "IBEDC Care — Pay Bill flow with bank transfer, Quickteller, FETS, and payment success",
              width: 1024,
              height: 526,
              caption: "A multi-payment channel that allows several payment options.",
              backdropColor: "#ffffff",
            },
          ],
        },
        {
          kind: "image",
          layout: "wide",
          treatment: "plain",
          image: {
            src: "/assets/work/ibedc/block-additional-wins.png",
            alt: "Additional wins — feedback, operations, and POS template adoption",
            width: 2432,
            height: 1883,
            caption:
              "Additional wins: customer and staff feedback (Play Store 4.6★, Twitter), call-centre relief, and POS template reused by three utilities.",
          },
        },
      ],
    },
  },
  {
    slug: "rivva",
    title: "Rivva",
    subtitle: "AI Scheduling Platform",
    category: "Intelligent Systems",
    company: "Rivva · Nigeria",
    period: "Jul 2025 – Jan 2026",
    summary:
      "Co-led design for an AI scheduling product shipped from beta to full release — reaching #4 on Product Hunt in its first week and surpassing 500 downloads within the first month. Owned the web app end-to-end and contributed to mobile.",
    role: "Product Designer (Founding Team) from product definition to cross-platform system design.",
    scope:
      "AI interaction design, Apple Health onboarding, web app design, and shared patterns spanning iOS, Android, and web.",
    metrics: [
      { value: "#4", label: "Product Hunt — Product of the Day" },
      { value: "500+", label: "Downloads in first month" },
      { value: "30+", label: "Paying customers in 2 months" },
    ],
    context:
      "An AI-powered scheduling platform built on wearable health data — energy-aware planning that adapts daily schedules based on biometric signals from Apple Health.",
    problem:
      "AI capability without usable interaction models. Most AI scheduling tools surface outputs without helping users understand or trust the underlying reasoning. The gap between ML capability and human trust was the core design challenge.",
    action:
      "Designed AI-assisted planning workflows, an energy-aware scheduling model, and Apple Health onboarding from 0→1. Led web app design and shaped the AI-driven daily planning experience. Co-designed Nia (AI assistant) — translating ML outputs into actionable, trusted decisions — and established the cross-platform design system for seamless handoff between mobile and web.",
    impact:
      "#4 Product of the Day on Product Hunt. 500+ downloads in the first month. 30+ paying customers within two months. A trusted, explainable AI assistant — not just automation.",
    tags: ["Product Design", "Web App", "0→1", "Consumer", "AI/ML", "Health Tech"],
    featured: true,
    assets: {
      thumbnails: [
        {
          src: "/assets/work/rivva/preview-16x9.png",
          alt: "Rivva — AI daily planner web landing page hero with product UI preview",
          width: 1024,
          height: 576,
        },
      ],
      hero: {
        src: "/assets/work/rivva/preview-16x9.png",
        alt: "Rivva — AI daily planner web landing page hero with product UI preview",
        width: 1024,
        height: 576,
      },
    },
  },
  {
    slug: "seamless-ai",
    title: "SeamlessAI",
    subtitle: "AI-Native Enterprise Layer",
    category: "Intelligent Systems",
    company: "SeamlessHR",
    period: "Jan 2025 – Present",
    summary:
      "Established reusable AI interaction patterns for enterprise workflows so teams could ship AI features as a system instead of one-offs.",
    role: "Lead, DesignOps & AI-UX.",
    scope:
      "AI pattern design, prompt frameworks, workflow definition, agent behaviours, reporting concepts, and rollout guidance across product teams.",
    metrics: [
      { value: "Faster", label: "Candidate shortlisting" },
      { value: "Reduced", label: "Screening bias" },
      { value: "Reusable", label: "AI interaction patterns" },
    ],
    context:
      "SeamlessHR expanding from traditional SaaS into an AI-enabled platform — embedding intelligence into existing enterprise workflows across recruitment, HR, and operations.",
    problem:
      "AI capability without a design system to support it. No shared patterns for AI interactions, no established framework for how AI surfaces decisions to enterprise users. Teams building AI features independently created inconsistency and eroded user trust.",
    action:
      "Designed an AI-native UX layer across SeamlessHR’s suite: prompt-based workflows, agent behaviours, and AI-UX patterns. Partnered with AI/ML, product, and engineering to balance usability and performance. Defined scalable AI-UX patterns, prompt frameworks, and interaction models adopted across all product teams. Scoped analytics and reporting with ML/AI processing pipelines. Designed Smart CV Parsing, Smart Ranking, and Smart Assessment flows layered into recruitment.",
    impact:
      "Reusable AI interaction patterns established as a system — not one-off features. Faster shortlisting, improved quality, reduced bias. A foundation for AI-native enterprise design at scale.",
    tags: ["AI/ML", "Enterprise SaaS", "Design Systems", "Recruitment", "UX Patterns"],
    featured: false,
    assets: {
      thumbnails: [placeholderHero, placeholderThumbA],
      hero: placeholderHero,
    },
  },
  {
    slug: "clearprice",
    title: "ClearPrice",
    subtitle: "Quote-to-Cash RevOps",
    category: "0→1 Systems",
    company: "Founding Team · African SaaS",
    period: "Oct 2024 – Jul 2025",
    summary:
      "Defined a localised quote-to-cash product for African SaaS operators where global billing tools were a poor fit.",
    role: "Product Designer (Founding Member) leading MVP definition and product UX.",
    scope:
      "Pricing configuration, billing workflows, subscription dashboards, validation with founders and CFOs, and delivery with engineering.",
    metrics: [
      { value: "0→1", label: "Validated MVP" },
      { value: "Pilot", label: "Soft launch with SaaS businesses" },
      { value: "First", label: "Localised RevOps platform for Africa" },
    ],
    context:
      "African SaaS founders were managing revenue operations manually or via costly global tools not built for local market constraints, currencies, and compliance requirements.",
    problem:
      "Undefined pricing workflows, no quote-to-cash system, no subscription management built for African market realities. A structural gap in the ecosystem for early-stage SaaS businesses.",
    action:
      "Led product design from 0 → validated MVP. Defined system architecture and UX framework. Designed pricing configuration tools, quote-to-cash flows, and subscription dashboards. Led MVP validation workshops with founders and CFOs. Partnered with engineering for compliance and scalability.",
    impact:
      "Soft launch pilot with African SaaS businesses. Scalable, compliance-ready billing infrastructure established. Positioned as the first localised RevOps platform for Africa's SaaS growth ecosystem.",
    tags: ["Fintech", "SaaS", "0→1", "Africa", "Billing Infrastructure"],
    featured: false,
    assets: {
      thumbnails: [placeholderHero, placeholderThumbB],
      hero: placeholderHero,
    },
  },
  {
    slug: "abms",
    title: "ABMS",
    subtitle: "Agency Banking Management System",
    category: "Scalable Systems",
    company: "Funds and Electronic Transfer Solutions (Fets)",
    period: "2022 – 2024",
    summary:
      "Designed the operational backbone for an agency banking network — onboarding, transaction monitoring, and reconciliation across thousands of agents.",
    role: "Lead Product Designer for operations and field workflows.",
    scope:
      "Agent onboarding, transaction monitoring, reconciliation tooling, dispute workflows, and compliance reporting.",
    metrics: [
      { value: "Multi-tier", label: "Agent hierarchy" },
      { value: "Real-time", label: "Transaction monitoring" },
      { value: "Unified", label: "Reconciliation across channels" },
    ],
    context:
      "Agency banking operations were spread across spreadsheets, paper records, and disconnected mobile apps — leaving compliance, onboarding, and reconciliation as ongoing operational bottlenecks.",
    problem:
      "No unified system for agent management, cash position monitoring, or dispute handling. Settlement delays and reconciliation errors compounded as the agent network grew.",
    action:
      "Led product design for an end-to-end agency banking management system: agent onboarding, KYC, transaction monitoring, float management, dispute workflows, and reconciliation. Worked with engineering on operational data models and audit trails.",
    impact:
      "Operational reconciliation collapsed from days to minutes. Agent onboarding became a single guided workflow. The system became the operating backbone for the agency banking business unit.",
    tags: ["Fintech", "Agency Banking", "Operations", "Compliance"],
    featured: false,
    assets: {
      thumbnails: [placeholderHero, placeholderThumbA],
      hero: placeholderHero,
    },
  },
  {
    slug: "blualliance",
    title: "BluAlliance",
    subtitle: "Blue-Collar HRM Platform",
    category: "0→1 Systems",
    company: "Gates Foundation × SeamlessHR",
    period: "Jun 2025 – Present",
    summary:
      "Co-led product discovery for Africa’s first HRM platform for the blue-collar workforce — field research across Kenya and Nigeria, journey mapping, and MVP scoping.",
    role: "UX Research Lead for product discovery and MVP definition.",
    scope:
      "Field research, ethnographic visits, worker and employer journey mapping, opportunity mapping, and MVP scoping across hiring, payroll, scheduling, and benefits.",
    metrics: [
      { value: "30+", label: "Field interviews" },
      { value: "2", label: "Markets researched (Kenya, Nigeria)" },
      { value: "0→1", label: "MVP scoped" },
    ],
    context:
      "BluAlliance is a 0→1 HRM platform for Africa’s blue-collar workforce, co-led by SeamlessHR in partnership with the Gates Foundation. The goal was to build an HRM product tailored to the realities of field-based, shift-based, and informal work — with employer needs spanning hiring, payroll, scheduling, and benefits.",
    problem:
      "Existing HR tools were not built for the operational constraints of blue-collar workforces across African markets. The team needed to validate jobs-to-be-done, map real-world workflows, and define an MVP that could earn trust quickly on both employer and worker sides.",
    action:
      "Collaborated with a product lead to develop product strategy and MVP scope. Participated in an immersive design thinking workshop with a cross-functional group of industry leaders. Conducted field research in Kenya and Nigeria (30+ interviews, ethnographic visits). Mapped worker and employer journeys across hiring, payroll, scheduling, and benefits. Facilitated opportunity mapping and MVP scoping.",
    impact:
      "Research-backed MVP scope defined with clear opportunity areas, journey maps, and validated workflow priorities to guide build and delivery.",
    tags: ["HRTech", "0→1", "Field Research", "Africa", "Gates Foundation"],
    featured: false,
    assets: {
      thumbnails: [placeholderHero, placeholderThumbB],
      hero: placeholderHero,
    },
  },
];

/** Same image as the case study hero when `hero` is set; otherwise first listing thumbnail. Keeps `/`, `/work`, and `/work/[slug]` in sync. */
export function getPrimaryPreviewImage(assets?: ProjectAssets): ImageAsset | undefined {
  return assets?.hero ?? assets?.thumbnails?.[0];
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}
