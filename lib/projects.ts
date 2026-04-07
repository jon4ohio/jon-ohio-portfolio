export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  company: string;
  period: string;
  metrics: { value: string; label: string }[];
  context: string;
  problem: string;
  action: string;
  impact: string;
  tags: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "seamless-hiring",
    title: "SeamlessHiring 2.0",
    subtitle: "Recruitment Management System",
    category: "Structured Systems",
    company: "SeamlessHR",
    period: "Mar 2022 – Mar 2025",
    metrics: [
      { value: "↓50%", label: "Support tickets" },
      { value: "↑75%", label: "User satisfaction" },
      { value: "↑60%", label: "Workflow efficiency" },
      { value: "↓24%", label: "App drop-offs" },
    ],
    context:
      "SeamlessHR's ATS collapsed during a high-volume recruitment programme. 12 product teams were operating with no shared system, fragmented across Blade and Vue implementations, with inconsistent patterns and compounding technical debt.",
    problem:
      "Fragmented UX, backward-compatibility constraints, high support load, and 24% application drop-offs made the system unreliable at scale. The platform needed rebuilding — not patching.",
    action:
      "Led a 5-phase system redesign: rebuilt ATS flows, RBAC, and full job lifecycle from the ground up. Implemented AI-powered CV parsing and smart ranking. Built Seamkit alongside — a token-driven design system — to unify all 12 product teams under a shared design language.",
    impact:
      "Support tickets halved. User satisfaction rose 75%. Workflow efficiency improved by 60%. Seamkit achieved 2.49M token insertions, 443K component insertions, an 88.9/100 adoption score, and 91.1/100 trust score across 12 onboarded teams.",
    tags: ["Design Systems", "ATS", "Enterprise SaaS", "AI/ML", "DesignOps"],
    featured: true,
  },
  {
    slug: "seamkit",
    title: "Seamkit",
    subtitle: "Enterprise Design System",
    category: "Organisational Scale",
    company: "SeamlessHR",
    period: "Dec 2023 – Present",
    metrics: [
      { value: "12", label: "Teams onboarded" },
      { value: "88.9", label: "Adoption score /100" },
      { value: "91.1", label: "Trust score /100" },
      { value: "~80%", label: "Daily usage" },
    ],
    context:
      "12 product teams were operating with disconnected Figma libraries, inconsistent Vue components, and no shared token system. Each team built independently, creating duplication, rework, and poor design-engineering handoffs.",
    problem:
      "No governance, no shared language, and no system to coordinate design decisions at scale. UX inconsistency across products was visible to users and costly for teams to resolve.",
    action:
      "Built a token-driven design system from scratch: a 3-layer token hierarchy (Core → Semantic → Component), a CAVIS naming model, a reusable component library, governance documentation, and a structured contribution and release pipeline.",
    impact:
      "2.49M token insertions and 443K component insertions in 12 months. Onboarding time reduced by 30%. Token misuse down 50%. All 12 product teams unified under a single, trusted system.",
    tags: ["Design Systems", "Tokens", "Governance", "Vue", "Figma"],
    featured: true,
  },
  {
    slug: "fetsproza",
    title: "FetsProza",
    subtitle: "Mobile Money Infrastructure",
    category: "Operational Scale",
    company: "Fets · Nigeria",
    period: "2021 – 2025",
    metrics: [
      { value: "$1M+", label: "Saved annually" },
      { value: "2×", label: "Transaction capacity" },
      { value: "50%", label: "Faster settlement" },
      { value: "↓", label: "Vendor dependency" },
    ],
    context:
      "Fets relied on costly third-party mobile money infrastructure — $1M+ annually in vendor fees with no control over performance, localisation, or scaling decisions.",
    problem:
      "A rigid vendor system limited scalability and market expansion. Manual workflows, operational inefficiencies, and no white-label potential constrained the business at every layer.",
    action:
      "Led product definition and UX design for an in-house IaaS platform — built with no PM, working directly with engineering. Designed a modular transaction engine, reporting system, and operational console. Translated complex financial operations into actionable, auditable UI.",
    impact:
      "Replaced a core infrastructure dependency entirely. $1M+ saved annually. Transaction capacity doubled (10k → 20k/min). Settlement time halved (4s → 2s). Operational overhead reduced. New white-label revenue stream unlocked.",
    tags: ["Fintech", "IaaS", "Mobile Money", "Infrastructure", "0→1"],
    featured: true,
  },
  {
    slug: "ibedc",
    title: "IBEDC Digital Transformation",
    subtitle: "Care App + POS System",
    category: "Societal Impact",
    company: "Fets · 2.4M+ customers",
    period: "2022 – 2024",
    metrics: [
      { value: "49→96%", label: "Ledger accuracy" },
      { value: "10k+", label: "App downloads" },
      { value: "↓30%", label: "Support volume" },
      { value: "+25pp", label: "NPS improvement" },
    ],
    context:
      "Manual, paper-based billing for 2.4M+ electricity customers across multiple Nigerian states. No real-time visibility, no digital channel, and no reconciliation infrastructure.",
    problem:
      "Revenue leakage, fraud, poor traceability. Long queues, 24–48h token delays, fragmented payment channels, and no audit trail. A critical public utility operating on broken systems.",
    action:
      "Designed IBEDC Care App (customer + staff-facing), a walk-in POS system, and digitised billing, payment, and reconciliation workflows end-to-end. Mapped complex utility workflows into clear, accessible digital experiences for both staff and customers.",
    impact:
      "Ledger accuracy improved from 49% to 96%. Fraud reduced by 80%. Support volume fell 30%. NPS improved 25 percentage points. 10,000+ app downloads. A critical public utility moved from paper to real-time digital — at societal scale.",
    tags: ["Fintech", "Utilities", "Mobile App", "POS", "Public Sector"],
    featured: true,
  },
  {
    slug: "rivva",
    title: "Rivva",
    subtitle: "AI Scheduling Platform",
    category: "Intelligent Systems",
    company: "Founding Team · iOS · Android · Web",
    period: "Jul 2025 – Jan 2026",
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
  },
  {
    slug: "seamless-ai",
    title: "SeamlessAI",
    subtitle: "AI-Native Enterprise Layer",
    category: "Intelligent Systems",
    company: "SeamlessHR",
    period: "Jan 2025 – Present",
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
  },
  {
    slug: "clearprice",
    title: "ClearPrice",
    subtitle: "Quote-to-Cash RevOps",
    category: "0→1 Systems",
    company: "Founding Team · African SaaS",
    period: "Oct 2024 – Jul 2025",
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
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}
