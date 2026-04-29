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
  sectionLabels?: { context?: string; problem?: string; action?: string; impact?: string };
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
    slug: "seamkit",
    title: "Seamkit",
    subtitle: "Enterprise Design System Architecture",
    category: "Design Systems",
    company: "SeamlessHR",
    period: "Dec 2023 – Present",
    summary:
      "Built the design system that aligned design and engineering across 12 product teams — replacing fragmented component libraries with a token-driven, governed architecture that became SeamlessHR's shared baseline for building at scale.",
    role: "Design Systems Lead and DesignOps driver.",
    scope:
      "Token architecture, component foundations, governance model, documentation, adoption strategy, and system health across the product organisation.",
    metrics: [
      { value: "2.49M", label: "Token insertions (2025)" },
      { value: "443K", label: "Component insertions" },
      { value: "88.9", label: "Adoption score /100" },
      { value: "91.1", label: "Trust score /100" },
    ],
    sectionLabels: {
      context: "Opportunity",
      problem: "Evidence That Shaped the System",
      action: "Strategic Thesis",
      impact: "Outcomes and Organisational Leverage",
    },
    context:
      "SeamlessHR scaled from a single product into a multi-module HR platform — recruitment, payroll, performance management, leave, time management, and more — each built by a different product team, each with its own component library, naming conventions, and visual patterns.\n\n" +
      "Fragmentation was no longer a visual inconsistency problem. It had become operational drag. Pushing a platform-wide change — a rebrand, a compliance update, a new product line — required coordinating separately with every team. Duplicated patterns meant duplicated effort. There was no single source of truth and no one responsible for building one.\n\n" +
      "The opportunity was not to build another component library. It was to establish a governed design system that teams could build on independently without diverging from each other — and to solve the organisational problem that had made every previous attempt fail.",
    problem:
      "Three things became clear before a single token was defined.\n\n" +
      "Fragmentation had become measurable drag. Design audits across the product suite surfaced duplicated patterns: multiple button variants solving the same problem differently, inconsistent spacing systems, colour values defined and redefined per product. The cost wasn't aesthetic — it was delivery. Every time a shared pattern needed updating, it required separate coordination with each product team. Not a scaling inefficiency. A structural ceiling.\n\n" +
      "A component library without governance becomes the same problem. Shared libraries had been attempted before. They accumulated, diverged, and were abandoned. Components without lifecycle management become difficult to trust, and components teams don't trust get replaced with local alternatives. The root cause was never the library — it was the absence of a model for how things enter the system, evolve, and retire. Building another library without solving that would replicate the problem at a different layer.\n\n" +
      "Teams would not adopt what they didn't help shape. Cross-team interviews showed a consistent posture: product teams were protective of their local patterns for legitimate reasons — delivery commitments, muscle memory, and genuine investment in decisions they'd made carefully. Top-down mandates had a track record of generating surface compliance and quiet workarounds. The adoption model would have to treat contribution as influence. That changed everything about how the system was built.",
    action:
      "The governing decision: architecture before components. The faster path was to ship components immediately — visible deliverables, early wins, teams see something working. The right path was to establish the token layer first, then the governance model, then components on foundations that could scale. That decision cost roughly six weeks of visible output. The payoff was a system where a brand update touches one layer and propagates across every product in a single release cycle. Without that decision, Seamkit would have become the same problem it was built to replace.\n\n" +
      "Three structural decisions defined what Seamkit became.\n\n" +
      "Layered token architecture. Tokens are organised in three tiers: primitive values (the raw design decisions — colour, spacing, typography, radius), semantic tokens (purpose-driven mappings that give primitives meaning in context), and component-level tokens (overrides scoped to specific components). This separation determines whether a design system can scale or collapses into exceptions. The final taxonomy: 581 primitives, 488 component tokens, 349 colour tokens, consumed by design and engineering through a Figma token sync and a Vue component library.\n\n" +
      "Distributed governance. A design system without governance is a shared folder. Seamkit introduced a five-stage component lifecycle — proposal, draft, review, stable, deprecated — and three governance cadences: Token Council (bi-weekly), Component Review Board (monthly), Pattern Steering Group (quarterly). Every designer and engineer had a defined path to influence the system. The SeamKit Internal Toolkit — documentation covering tokens, components, patterns, and visual language guidelines — made governance self-serve. The 91.1/100 trust score did not come from a well-organised Figma library. It came from teams who could see how decisions were made and trusted the process.\n\n" +
      "Adoption through co-creation. Rather than distribute standards and enforce them, each product team received a design audit of their existing patterns and a working session to surface real constraints before Seamkit's contribution model was finalised. Those constraints shaped the system. Each of the 12 teams received structured onboarding with Seamkit embedded as the default starting point for new work. Rollout was deliberately incremental — a forced migration at platform scale would have generated resentment rather than adoption. System health was tracked through Figma analytics: insertion volumes, component usage frequency, and detach behaviour. Detach rate remained low throughout, indicating the system held under real product pressure.\n\n" +
      "Key tradeoffs. Every decision cost something. Prioritising token architecture over early component delivery delayed visible progress by six weeks — stakeholder pressure to show output was real, and the cost was carried. Choosing incremental rollout over full migration extended the coexistence period between Seamkit and legacy patterns; the benefit was a team that chose the system rather than one that was forced onto it. Running design audits per team before finalising contribution rules added months to the definition phase; the result was governance shaped by the people who would live with it. Standardisation versus product autonomy was never fully resolved, by design — the boundary between what belongs in shared infrastructure and what stays product-specific is an ongoing governance decision, not a fixed rule.",
    impact:
      "In 2025, Seamkit recorded 2,491,422 token insertions and 443,967 component insertions across 12 product teams — demonstrating sustained organisational reliance, not periodic usage. 80% of designers and engineers report Seamkit plays a role in their daily work. 70%+ of teams now begin new product work using Seamkit as their baseline, which means product consistency is no longer a coordination problem. It is a default.\n\n" +
      "Before Seamkit, shipping a UI change to a shared pattern required coordinating separately with each product team — if it happened at all. Now a token update propagates across every product in a single release cycle. Engineers implement components without design involvement at each step, compressing the design-to-production handoff across the suite. The top adopting teams — Design System, Talent Management, Leave, RECO, Time Management — are among SeamlessHR's highest-volume delivery teams. Seamkit adoption reinforced delivery speed rather than slowing it. The mandate to lead the design system was confirmed at 100% by Head of Product Femisayo Olofintila in the 2024 annual performance cycle — an organisational signal that design infrastructure was treated as product infrastructure.\n\n" +
      "Seamkit is not a concluded project. It is the layer the rest of the product is built on.\n\n" +
      "The 2025 expansion into AI-native features required interaction patterns that didn't exist in the original system — AI disclosure states, confidence indicators, progressive disclosure for ML outputs. The layered token architecture absorbed these as new semantic categories rather than exceptions. A system built around token primitives can evolve without breaking what is already running.\n\n" +
      "Consistent UI across the entire suite resolved a compounding risk: enterprise buyers associate visual inconsistency with system instability. Seamkit made the product feel like one product. The governance cadences, contribution workflow, and health monitoring became the operating model for how design and engineering collaborate at SeamlessHR — institutional knowledge, not personal knowledge.\n\n" +
      "A design system that only designers trust is a Figma file. Seamkit became infrastructure.",
    tags: ["Design Systems", "Token Architecture", "Design Governance", "Governance", "Vue", "Figma", "DesignOps"],
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
            alt: "SeamKit opportunity framing — product suite fragmentation before the design system",
            width: 3024,
            height: 1136,
            caption:
              "The opportunity: SeamlessHR's multi-product suite before a shared design foundation existed — fragmented libraries, duplicated patterns, no single source of truth.",
          },
        },
        {
          kind: "image",
          layout: "wide",
          treatment: "plain",
          image: {
            src: "/assets/work/_placeholders/hero.svg",
            alt: "[Replace] Three-tier token hierarchy diagram — primitives, semantic tokens, component tokens",
            width: 2400,
            height: 1350,
            caption:
              "[Replace with token architecture diagram] Three-tier token hierarchy: primitive values → semantic tokens → component tokens. 581 primitives · 488 component tokens · 349 colour tokens.",
          },
        },
        {
          kind: "image",
          layout: "wide",
          treatment: "plain",
          image: {
            src: "/assets/work/seamkit/block-approach.png",
            alt: "SeamKit token taxonomy in Token Studio — 581 primitives, 488 component tokens, 349 colour tokens",
            width: 2196,
            height: 1864,
            caption:
              "Token Studio variables panel: the full Seamkit taxonomy consumed by design and engineering across the platform.",
          },
        },
        {
          kind: "image",
          layout: "wide",
          treatment: "plain",
          image: {
            src: "/assets/work/_placeholders/hero.svg",
            alt: "[Replace] Governance contribution workflow and cadence model",
            width: 2400,
            height: 1350,
            caption:
              "[Replace with governance diagram] Contribution workflow: identify need → proposal → community review → draft → stable release. Cadences: Token Council · Component Review Board · Pattern Steering Group.",
          },
        },
        {
          kind: "image",
          layout: "wide",
          treatment: "plain",
          image: {
            src: "/assets/work/_placeholders/hero.svg",
            alt: "[Replace] Figma analytics — SeamKit vs SHR Product DL v2.0 adoption across 12 product teams",
            width: 2400,
            height: 1350,
            caption:
              "[Replace with OC3 Artefact B screenshot] Adoption analytics: SeamKit insertion volumes vs former library (SHR Product DL v2.0), per-team data across 12 product teams.",
          },
        },
        {
          kind: "image",
          layout: "wide",
          treatment: "plain",
          image: {
            src: "/assets/work/_placeholders/hero.svg",
            alt: "[Replace] System health report — adoption score, trust score, sentiment survey results",
            width: 2400,
            height: 1350,
            caption:
              "[Replace with OC3 Artefact C screenshot] System health: adoption score 88.9/100 · trust score 91.1/100 · 80% daily usage · 70%+ teams using Seamkit as new-work baseline.",
          },
        },
      ],
    },
  },
  {
    slug: "seamless-hiring",
    title: "SeamlessHiring 2.0",
    subtitle: "Recruitment Management System (RMS)",
    category: "Structured Systems",
    company: "SeamlessHR",
    period: "Mar 2022 – Mar 2025",
    summary:
      "Re-architected a fragmented recruiting product into a flagship hiring platform that restored workflow trust and scaled enterprise hiring.",
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
