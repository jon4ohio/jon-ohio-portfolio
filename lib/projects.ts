import type { MetadataBriefProps } from "@/components/case-study/MetadataBrief";

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
  brief?: MetadataBriefProps;
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
    brief: {
      blocks: [
        { label: "Role", value: "Design Systems Lead and DesignOps driver" },
        { label: "Scope", value: ["Tokens", "Governance", "Component foundations", "DesignOps"] },
        { label: "Timeline", value: "Dec 2023 – Present" },
        { label: "Team", value: ["12 product teams", "Design + Engineering"] },
        { label: "Domain", value: "Enterprise SaaS / Design Systems" },
      ],
      productImpact: [
        { value: "2.49M", label: "Token insertions (2025)" },
        { value: "443K", label: "Component insertions" },
        { value: "70%+", label: "Teams using Seamkit as new-work baseline" },
      ],
      commercialShiftTop: "Fragmented, team-owned component libraries",
      commercialShiftBottom: "→ Governed, shared enterprise design system",
      led: [
        "Token architecture and taxonomy",
        "Governance model and contribution SOP",
        "System health instrumentation and adoption tracking",
        "Documentation platform (SeamKit Internal Toolkit)",
      ],
      partneredOn: ["Vue component library implementation", "Figma token sync and engineering integration"],
    },
    sectionLabels: {
      context: "02  Opportunity",
      problem: "03  Evidence That Shaped the System",
      action: "04  Strategic Thesis",
      impact: "05  Outcomes and Organisational Leverage",
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
      "Fetswallet's mobile money infrastructure ran on a Huawei-licensed engine — adequate at launch but ill-suited to a company planning cross-border expansion into markets like Congo. Licensing costs constrained the operating budget, and the vendor relationship blocked any meaningful customisation: no way to localise, extend for white-label use, or scale past the transaction ceilings the engine imposed.",
    problem:
      "Transaction monitoring, agent reconciliation, and settlement workflows all ran through manual workarounds layered on top of a system not built for them. As the agent network grew, reconciliation errors multiplied and operational overhead scaled linearly. The vendor ceiling — 10k transactions per minute — was already becoming a bottleneck, and the licensing model made every growth decision more expensive than it needed to be.",
    action:
      "Led strategy, operations, and product design for Fetsproza from concept to launch — a proprietary, white-label-ready IaaS platform built to replace the vendor dependency entirely. Worked directly with engineering to map existing financial workflows before redesigning them: transaction engine, operator console, reconciliation tooling, and reporting. The design priority was auditability — every transaction state, error, and resolution needed to be traceable without engineering support.",
    impact:
      "Fetswallet eliminated the vendor dependency and cut annual infrastructure costs by over $1M. Transaction capacity doubled from 10k to 20k per minute, settlement time halved from 4s to 2s, and reconciliation that previously required manual coordination became an auditable, self-service operation. The engine was architected for licensing — a white-label revenue stream that didn't exist under the vendor model.",
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
    title: "IBEDC — Unified Billing System",
    subtitle: "Care App + POS System",
    category: "Scalable Systems",
    company: "Fets × IBEDC",
    period: "2022 – 2024",
    summary:
      "IBEDC moved from fragmented third-party portals and manual walk-in workflows to a unified billing system — shared transaction logic across every touchpoint.",
    role: "Lead Product Designer for customer and operational experiences.",
    scope:
      "Consumer app design (IBEDC Care — B2C + customer relations), POS terminal workflow for walk-in centres, unified transaction architecture across channels, and operational visibility/reconciliation model.",
    metrics: [
      { value: "4.6★", label: "Play Store (2,800+ reviews)" },
      { value: "↓30%", label: "Call-centre volume" },
      { value: "↓80%", label: "Fraud reduction" },
      { value: "3", label: "Utilities on POS template" },
    ],
    brief: {
      blocks: [
        { label: "Role", value: "Lead Product Designer" },
        {
          label: "Scope",
          value: [
            "Consumer app design (IBEDC Care)",
            "POS workflow",
            "Unified transaction logic",
            "Operational reconciliation model",
          ],
        },
        { label: "Timeline", value: "2022 – 2024" },
        { label: "Team", value: "Fets Engineering · IBEDC Operations · Field Staff" },
        { label: "Domain", value: "Utility / FinTech / Public Sector" },
      ],
      productImpact: [
        { value: "4.6★", label: "Play Store rating (2,800+ reviews)" },
        { value: "↓30%", label: "Call-centre volume" },
        { value: "10k+", label: "App downloads in first 6 months" },
      ],
      commercialShiftTop: "Fragmented third-party portals, handwritten ledgers, 24–48h token delays",
      commercialShiftBottom: "→ Unified billing system with shared transaction logic across all touchpoints",
      led: [
        "Consumer app design (IBEDC Care — B2C + customer relations)",
        "POS terminal workflow for walk-in centres",
        "Unified transaction architecture across digital and in-person channels",
        "Operational visibility and reconciliation model",
      ],
      partneredOn: ["Engineering implementation (Fets)", "IBEDC operations validation and field staff testing"],
    },
    sectionLabels: {
      context: "02  Opportunity",
      problem: "03  Evidence That Shaped the System",
      action: "04  System Architecture",
      impact: "05  Outcomes and Organisational Leverage",
    },
    context:
      "IBEDC is Nigeria's largest electricity distributor by geographic coverage —\n" +
      "serving over 2.4 million customers across five states. At that scale, a broken\n" +
      "payment system isn't a UX problem. It's an infrastructure liability.\n\n" +
      "Billing and payment remained almost entirely manual. Walk-in centres ran on\n" +
      "handwritten ledgers. Customers were routed through a fragmented stack of\n" +
      "third-party portals — FETSwallet, Bypower, bank USSD — with no consistent\n" +
      "experience across any of them. Digital and physical channels operated\n" +
      "independently, with no shared transaction logic and no way for either to\n" +
      "compensate for the other's failures.\n\n" +
      "The opportunity was to build a unified billing system — not just a better app,\n" +
      "but a single operational model with multiple access points.",
    problem:
      "Three failure modes were compounding across every channel.\n\n" +
      "Token delays were destroying trust. When a customer paid their electricity\n" +
      "bill, token delivery via SMS lagged 24–48 hours. In communities where power is\n" +
      "managed by prepaid token, that delay meant households sat in the dark after\n" +
      "having paid — and called the support centre. Tickets doubled year-on-year\n" +
      "without any change to the underlying system.\n\n" +
      "Physical and digital channels were disconnected. Customers who couldn't\n" +
      "navigate third-party portals queued at walk-in centres, where staff processed\n" +
      "payments using handwritten ledgers and manually cross-referenced receipts.\n" +
      "Neither channel had visibility into the other, so staff couldn't verify or\n" +
      "continue a transaction started elsewhere.\n\n" +
      "Revenue leakage was structural. Unreconciled transactions between channels\n" +
      "meant payments were lost between systems. Fraud was difficult to detect\n" +
      "because there was no unified record of what had been paid, by whom, and\n" +
      "through which channel.",
    action:
      "The core problem was fragmentation, not access. Adding a better app without\n" +
      "resolving the underlying channel disconnect would improve one touchpoint while\n" +
      "leaving the system broken. The solution required a unified billing model first,\n" +
      "then two coordinated surfaces to express it.\n\n" +
      "The Unified Billing & Payment System Model has three layers.\n\n" +
      "Shared transaction logic. All payment flows — mobile app, POS terminal, and\n" +
      "backend reconciliation — resolve through the same transaction structure. Token\n" +
      "generation, validation, and settlement follow the same rules regardless of\n" +
      "where the transaction originates. A payment made through an agent behaves\n" +
      "exactly the same as one made through the app. This removes the inconsistencies\n" +
      "between channels that had previously made cross-channel reconciliation\n" +
      "impossible.\n\n" +
      "Dual interaction surfaces. The system is expressed through two coordinated\n" +
      "interfaces: the IBEDC Care App for self-service consumer transactions, and a\n" +
      "bespoke POS terminal workflow for walk-in centres. Both surfaces are designed\n" +
      "around the same underlying flow, adapted to different levels of user capability\n" +
      "and context. Customers can operate independently. Agents can step in and\n" +
      "continue any transaction without switching systems or reprocessing payments.\n\n" +
      "Real-time operational visibility. Every transaction is immediately visible to\n" +
      "both the system and operational staff. Token generation, payment confirmation,\n" +
      "and error states surface in real time — eliminating the delays that had driven\n" +
      "support volume, and enabling staff to resolve issues at the point of\n" +
      "interaction rather than escalating through support chains.\n\n" +
      "The design process started with field validation. Worked with the Fets\n" +
      "engineering team to map existing billing and token workflows before redesigning\n" +
      "them end-to-end. Validated with IBEDC staff ahead of rollout to confirm that\n" +
      "the field reality matched the design assumptions. Then built the two surfaces\n" +
      "as expressions of the shared model rather than as separate products.",
    impact:
      "IBEDC moved from fragmented payment channels to a unified billing system with\n" +
      "shared transaction logic across all touchpoints. In the first year, payment\n" +
      "times dropped 30% and customer satisfaction increased 40%. Token delivery,\n" +
      "previously a 24–48 hour wait, became immediate.\n\n" +
      "The Care App earned a 4.6-star Play Store rating across 2,800+ reviews —\n" +
      "unusually high for a utility product in the market. Call-centre volume fell\n" +
      "30% as token delay complaints vanished. Fraud reduction reached 80% as\n" +
      "unified transaction records made reconciliation auditable across every channel.\n\n" +
      "The system extended beyond IBEDC. The dual-surface POS template — validated\n" +
      "at 2.4 million customer scale — was adopted by three external utility\n" +
      "providers. That adoption proves the model is transferable, not\n" +
      "client-specific. A utility billing architecture built for one organisation\n" +
      "became a reusable infrastructure pattern for the sector.\n\n" +
      "The Unified Billing & Payment System Model is the lasting output of this work\n" +
      "— not the app, not the POS interface, but the architectural decision that both\n" +
      "surfaces share the same transaction logic. That decision is what made three-\n" +
      "utility replication possible without rebuilding from scratch.\n\n" +
      "Before this system existed, utility providers in the market chose between\n" +
      "digital-only solutions (that excluded walk-in customers) or manual-only\n" +
      "operations (that couldn't scale). The dual-surface model resolves that\n" +
      "constraint by treating digital and physical as coordinated access points to\n" +
      "the same system, not separate products serving separate audiences.\n\n" +
      "The operational model — shared logic, dual surfaces, real-time visibility —\n" +
      "is the template. IBEDC was the first implementation.",
    tags: ["FinTech", "Utilities", "Mobile App", "POS", "Public Sector", "Service Design", "0→1"],
    featured: true,
    assets: {
      thumbnails: [
        {
          src: "/assets/work/ibedc/preview-16x9.png",
          alt: "IBEDC — unified billing system preview",
          width: 2752,
          height: 1548,
        },
        {
          src: "/assets/work/ibedc/thumb-2.png",
          alt: "Overview — unified billing model objective for IBEDC",
          width: 2196,
          height: 770,
        },
      ],
      hero: {
        src: "/assets/work/ibedc/preview-16x9.png",
        alt: "IBEDC — unified billing system case study header",
        width: 2752,
        height: 1548,
      },
      blocks: [
        {
          kind: "callout",
          title: "Impact — first year in production",
          body:
            "4.6★ Play Store rating across 2,800+ reviews · ↓30% call-centre volume · ↓80% fraud reduction · POS template adopted by 3 external utilities.",
        },
        {
          kind: "image",
          layout: "wide",
          treatment: "plain",
          image: {
            src: "/assets/work/ibedc/block-customer-journey.png",
            alt: "Customer journey user flow — IBEDC digital touchpoints across app and walk-in",
            width: 2197,
            height: 1487,
            caption: "Customer journey: self-service and agent-assisted flows sharing the same underlying transaction logic.",
          },
        },
        {
          kind: "gallery",
          layout: "inline",
          columns: 2,
          treatment: "plain",
          images: [
            {
              src: "/assets/work/ibedc/block-pos-payment-flow.png",
              alt: "POS payment user flow for walk-in centres",
              width: 3024,
              height: 1330,
              caption: "POS payment flow — agent-assisted transactions in walk-in centres.",
            },
            {
              src: "/assets/work/ibedc/block-pos-ui.png",
              alt: "POS terminal interface for in-person payments",
              width: 3024,
              height: 2071,
              caption: "POS terminal interface: same transaction logic, different surface.",
            },
          ],
        },
        {
          kind: "image",
          layout: "wide",
          treatment: "plain",
          image: {
            src: "/assets/work/ibedc/block-care-app-ui.png",
            alt: "IBEDC Care App — multi-channel payment flow",
            width: 1024,
            height: 526,
            caption:
              "IBEDC Care App: bank transfer, Quickteller, FETS, and payment success — multiple payment channels unified under the same billing model.",
            backdropColor: "#ffffff",
          },
        },
        {
          kind: "image",
          layout: "wide",
          treatment: "plain",
          image: {
            src: "/assets/work/ibedc/block-additional-wins.png",
            alt: "IBEDC additional outcomes — feedback, POS template adoption",
            width: 2432,
            height: 1883,
            caption:
              "The POS template validated at IBEDC scale — adopted by three external utilities, proving the model transfers beyond a single implementation.",
          },
        },
        {
          kind: "callout",
          title: "IBEDC was the first implementation",
          body: "The model is the lasting output.",
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
      "Rivva is an AI scheduling platform that uses biometric data from Apple Health to build energy-aware daily plans — not just calendars, but schedules informed by how the user actually feels. The product was in prototype when the founding team brought in design: a functional ML model existed, but no interaction layer, no onboarding, and no way for a user to understand or trust what the AI was suggesting.",
    problem:
      "The ML model could generate a schedule. The design problem was that users had no reason to follow it. Biometric data creates a power asymmetry — the system knows something the user doesn't — and the first instinct in most AI tools is to hide that asymmetry rather than explain it. Early concept testing confirmed users would accept AI suggestions they could understand and reject ones they couldn't, regardless of the quality of the recommendation.",
    action:
      "Designed the full interaction layer from 0→1: Apple Health onboarding, energy-aware scheduling model, and the daily planning experience across iOS, Android, and web. Co-designed Nia, the AI assistant, as an explanation layer — translating ML outputs into language users could act on and disagree with. Built the cross-platform design system that unified the experience across mobile and web. Collaborated with the ML team on how the model's reasoning could be surfaced without overwhelming the interface.",
    impact:
      "Rivva launched from beta to full release and reached #4 Product of the Day on Product Hunt in its first week. 500+ downloads came in the first month, and 30+ paying customers converted within two months — without a paid marketing budget. The AI explainability layer held: post-launch user feedback consistently cited trust in Nia's recommendations as a reason for staying with the product.",
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
      "In early 2025, SeamlessHR moved from traditional SaaS toward an AI-enabled platform — embedding intelligence into existing enterprise workflows across recruitment, HR, and operations rather than shipping AI as a standalone product. With multiple product teams building AI features independently, the company needed a shared design foundation for how AI would surface decisions, handle errors, and earn trust in high-stakes enterprise contexts.",
    problem:
      "AI capability without a design language to support it. Teams were building AI features independently — different patterns for surfacing recommendations, different error states, different levels of explainability. Users encountered AI behaviour that varied across the suite, which created unpredictability in high-trust workflows like recruitment and payroll. The inconsistency didn't just look wrong; it eroded user confidence in the features themselves.",
    action:
      "Partnered with AI/ML, product, and engineering to define an AI-native UX layer across the SeamlessHR suite. Started with recruitment — where AI impact was most measurable — and worked backwards to a reusable pattern library. Defined prompt frameworks, agent behaviours, and interaction models that all product teams could implement consistently. Scoped analytics and reporting with the ML team to ensure the interface reflected what the model could actually deliver, not aspirational states the pipeline couldn't support. Designed Smart CV Parsing, Smart Ranking, and Smart Assessment flows as the first system-native AI features.",
    impact:
      "AI features across SeamlessHR moved from individually designed one-offs to a governed system of reusable interaction patterns. Smart CV Parsing, Smart Ranking, and Smart Assessment — each built on the shared layer — reduced screening time while making the system's reasoning visible to recruiters. The pattern library became the foundation other product teams adopted when building their own AI features, compressing design time for each subsequent release. SeamlessHR now has an AI design system, not just AI features.",
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
      "African SaaS founders were managing revenue operations in a structural gap: global billing tools like Stripe and Chargebee weren't built for local currencies, Nigerian tax requirements, or the pricing norms of early-stage African SaaS. The alternative was manual — invoicing in spreadsheets, tracking renewals in Notion, handling quotes over WhatsApp. ClearPrice was founded to close that gap with a localised, quote-to-cash system built for Africa.",
    problem:
      "No validated product definition existed to start from — the gap was real but uncharted. Early conversations with SaaS founders confirmed their workflows varied significantly from business to business. The design challenge was to define a system flexible enough to handle that variation without becoming too complex for a founder who was also managing sales, engineering, and customer success simultaneously.",
    action:
      "Led product design from 0 → validated MVP, anchoring every decision in founder validation before building. Ran MVP definition workshops with African SaaS founders and CFOs — testing workflow assumptions before designing for them. Designed pricing configuration, quote generation, subscription management, and billing dashboards with compliance requirements (tax, FX, local currencies) embedded in the workflow rather than bolted on. Partnered with engineering on the data model and audit trail requirements for multi-currency operations.",
    impact:
      "ClearPrice launched a soft pilot with African SaaS businesses within nine months of product definition. The MVP validated a market position with no direct competitor: a quote-to-cash system built specifically for African SaaS operators, compliant with local tax and currency requirements, and scoped for founders without a dedicated RevOps function. Pilot feedback confirmed the validation-first approach — the product fit was high because the users who would buy it had shaped the design from the start.",
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
      "Fets operates an agency banking network — field-based payment infrastructure that extends financial services into communities without direct bank access. As the network grew, operations hit a structural ceiling: agent onboarding ran through manual approval chains, cash position monitoring required supervisor intervention, and reconciliation happened once a day from exported spreadsheets rather than in real time.",
    problem:
      "Compliance was the critical risk. An agent network without real-time monitoring creates exposure: fraud goes undetected, float positions drift, and disputed transactions take days to resolve. The operational team was managing a growing network using tools not designed for it — the bottlenecks weren't a temporary scaling problem, they were structural. The network couldn't expand safely without a system built for it.",
    action:
      "Led product design for an end-to-end agency banking management system across the full operational lifecycle. Worked with operations and engineering to map the existing agent workflow before designing the replacement: tiered agent hierarchy, KYC-integrated onboarding, real-time transaction monitoring, float position management, dispute resolution workflow, and reconciliation reporting. Audit trail design was a core requirement — every action needed to be traceable for both compliance review and operational accountability.",
    impact:
      "Reconciliation moved from a daily batch process to a real-time operation, compressing multi-day resolution timelines significantly. Agent onboarding became a single guided flow with embedded KYC — removing the manual approval chains that had slowed network expansion. The system became the operational backbone of the Fets agency banking unit, providing the compliance infrastructure and monitoring capability required to scale the agent network with confidence.",
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
      "Thirty field interviews and ethnographic visits across Kenya and Nigeria produced a validated MVP scope grounded in how blue-collar workers and employers actually operate — not assumptions mapped from white-collar HR analogues. The research surfaced consistent patterns across both markets that had not previously been documented at this level of specificity, giving the product team a defensible foundation without expensive course correction later. Africa's first HRM platform for the blue-collar workforce is being built on research that didn't exist before this project.",
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
