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
    category: "Product Systems",
    company: "SeamlessHR",
    period: "Mar 2022 – Mar 2025",
    summary:
      "Repositioned a broken recruitment add-on into a flagship hiring product by fixing workflow trust, applicant completion, and system value.",
    role: "Product Design Lead across product strategy, UX, and phased rollout.",
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
      thumbnails: [placeholderThumbA, placeholderThumbB],
      hero: placeholderHero,
      blocks: [
        {
          kind: "image",
          layout: "wide",
          treatment: "device",
          image: {
            ...placeholderThumbA,
            caption: "Example flow snapshot (replace with real visuals).",
          },
        },
        {
          kind: "gallery",
          layout: "inline",
          columns: 2,
          treatment: "plain",
          images: [
            { ...placeholderThumbA, caption: "Before" },
            { ...placeholderThumbB, caption: "After" },
          ],
        },
      ],
    },
  },
  {
    slug: "seamkit",
    title: "Seamkit",
    subtitle: "Enterprise Design System",
    category: "Organizational Systems",
    company: "SeamlessHR",
    period: "Dec 2023 – Present",
    summary:
      "Built the operating system that aligned design and engineering across 12 teams, replacing fragmented libraries with one governed source of truth.",
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
      "SeamlessHR had three fragmented UI libraries and disconnected Figma assets across squads. Duplicate components slowed releases, eroded brand trust, and inflated maintenance cost — exactly as the company pushed toward global expansion and a Product‑Led Growth (PLG) strategy.",
    problem:
      "Without a shared language (tokens, patterns, governance), design and engineering shipped inconsistent UI across products and spent days on “style churn.” The organisation needed one source of truth that could scale with teams, frameworks, and evolving brand/accessibility requirements.",
    action:
      "Consolidated the ecosystem into SeamKit — a token‑driven source of truth that aligns designers and engineers on brand, accessibility, and scale. Established foundations (token hierarchy, naming, components) plus operating system (governance, documentation, contribution/release cadence) to support sustained adoption across squads.",
    impact:
      "A single trusted system now anchors UI consistency and accelerates delivery: 2.49M token insertions and 443K component insertions, 12 teams onboarded, and measurable improvements in onboarding speed and token hygiene — while enabling progressive rollout into live screens gated by feature flags for zero downtime.",
    tags: ["Design Systems", "Tokens", "Governance", "Vue", "Figma"],
    featured: true,
    assets: {
      thumbnails: [placeholderThumbB, placeholderThumbA],
      hero: placeholderHero,
      blocks: [
        {
          kind: "callout",
          title: "System artefacts",
          body: "This case study supports sectional images and galleries (tokens, components, governance docs, rollout snapshots).",
        },
      ],
    },
  },
  {
    slug: "fetsproza",
    title: "FetsProza",
    subtitle: "Infrastructure‑as‑a‑Service (IaaS) Platform",
    category: "Operational Systems",
    company: "Fets · Nigeria",
    period: "2021 – 2025",
    summary:
      "Designed the in-house transaction infrastructure that replaced an expensive vendor dependency and opened up white-label revenue.",
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
      thumbnails: [placeholderThumbA, placeholderThumbB],
      hero: placeholderHero,
    },
  },
  {
    slug: "ibedc",
    title: "IBEDC Digital Transformation",
    subtitle: "Care App + POS System",
    category: "Operational Systems",
    company: "Fets · 2.4M+ customers",
    period: "2022 – 2024",
    summary:
      "Digitised utility payments and service workflows for millions of customers across consumer app and in-person POS touchpoints.",
    role: "Lead Product Designer for customer and operational experiences.",
    scope:
      "Consumer app flows, agent and POS workflows, reconciliation tooling, and service operations spanning digital and walk-in channels.",
    metrics: [
      { value: "4.6★", label: "Play Store rating (2,800+)" },
      { value: "↓30%", label: "Call-center volume" },
      { value: "↓30%", label: "Support volume" },
      { value: "24–48h→mins", label: "Token/payment turnaround" },
    ],
    context:
      "The Ibadan Electricity Distribution Company (IBEDC) is Nigeria’s largest distribution company by geographic coverage, serving five states. Its billing and payment operations relied heavily on manual processes and fragmented third‑party portals.",
    problem:
      "Customers bounced between third‑party portals (FETSwallet, Bypower, bank USSD…) or queued at walk‑in centres using handwritten ledgers. Token SMS often lagged 24–48 hours; revenue leaked; and support tickets doubled year‑on‑year.",
    action:
      "Designed a friction‑free, end‑to‑end digital experience: IBEDC Care App (B2C + customer relations) and a bespoke POS terminal workflow for walk‑in centres. Digitised billing, payment, receipt verification, and reconciliation so both customers and staff could transact confidently and traceably.",
    impact:
      "IBEDC’s billing and payments shifted from paper and third‑party fragmentation to a unified digital system: customers transact in seconds, staff reconcile in minutes, and revenue leakage is materially reduced. Positive feedback from customers and staff (Play Store 4.6★, 2,800+ reviews) and a ~30% reduction in call‑centre volume as queue/token complaints disappeared.",
    tags: ["Fintech", "Utilities", "Mobile App", "POS", "Public Sector"],
    featured: true,
    assets: {
      thumbnails: [placeholderThumbB, placeholderThumbA],
      hero: placeholderHero,
    },
  },
  {
    slug: "rivva",
    title: "Rivva",
    subtitle: "AI Scheduling Platform",
    category: "Intelligent Systems",
    company: "Founding Team · iOS · Android · Web",
    period: "Jul 2025 – Jan 2026",
    summary:
      "Shaped the trust layer for an AI scheduling product, translating biometric data into explainable planning people could act on.",
    role: "Founding Designer from product definition to cross-platform system design.",
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
      "Designed AI-assisted planning workflows, an energy-aware scheduling model, and Apple Health onboarding from 0→1. Co-designed Nia (AI assistant) — translating ML outputs into actionable, trusted decisions. Led web app design and established a cross-platform design system for seamless handoff between mobile and web.",
    impact:
      "#4 Product of the Day on Product Hunt. 500+ downloads in the first month. 30+ paying customers within two months. A trusted, explainable AI assistant — not just automation.",
    tags: ["AI/ML", "iOS", "Android", "Health Tech", "0→1", "Cross-platform"],
    featured: true,
    assets: {
      thumbnails: [placeholderThumbA, placeholderThumbB],
      hero: placeholderHero,
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
      "AI pattern design, prompt frameworks, workflow definition, reporting concepts, and rollout guidance across product teams.",
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
      "Defined scalable AI-UX patterns, prompt frameworks, and interaction models adopted across all product teams. Scoped analytics and reporting with ML/AI processing pipelines. Designed Smart CV Parsing, Smart Ranking, and Smart Assessment flows layered into recruitment.",
    impact:
      "Reusable AI interaction patterns established as a system — not one-off features. Faster shortlisting, improved quality, reduced bias. A foundation for AI-native enterprise design at scale.",
    tags: ["AI/ML", "Enterprise SaaS", "Design Systems", "Recruitment", "UX Patterns"],
    featured: false,
    assets: {
      thumbnails: [placeholderThumbB, placeholderThumbA],
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
    role: "Founding Designer leading MVP definition and product UX.",
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
      thumbnails: [placeholderThumbA, placeholderThumbB],
      hero: placeholderHero,
    },
  },
  {
    slug: "abms",
    title: "ABMS",
    subtitle: "Agency Banking Management System",
    category: "Operational Systems",
    company: "Fets",
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
      thumbnails: [placeholderThumbB, placeholderThumbA],
      hero: placeholderHero,
    },
  },
  {
    slug: "blualliance",
    title: "BluAlliance",
    subtitle: "Healthcare Network Platform",
    category: "0→1 Systems",
    company: "Founding Team",
    period: "2024 – 2025",
    summary:
      "Defined the foundational product for a healthcare network connecting providers, payers, and members across emerging markets.",
    role: "Founding Designer leading product definition and core flows.",
    scope:
      "Provider onboarding, member portal, claims workflows, network discovery, and the foundational design system.",
    metrics: [
      { value: "0→1", label: "Validated MVP" },
      { value: "Multi-sided", label: "Network model" },
      { value: "Pilot", label: "Provider rollout" },
    ],
    context:
      "Healthcare networks in emerging markets are fragmented across providers, payers, and members — with paper-driven claims, opaque pricing, and no shared operational layer.",
    problem:
      "No unified product to connect providers and members, no claims workflow, no shared network directory. Building infrastructure where none existed.",
    action:
      "Led product design from 0 → validated MVP. Defined provider onboarding, member discovery, and claims workflows. Established the foundational design system and key user journeys.",
    impact:
      "Validated MVP rolled out to a pilot network of providers. Foundational system in place to support the next stage of network growth.",
    tags: ["Healthcare", "0→1", "Marketplace", "Africa"],
    featured: false,
    assets: {
      thumbnails: [placeholderThumbA, placeholderThumbB],
      hero: placeholderHero,
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}
