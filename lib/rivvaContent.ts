export type RivvaHeroMeta = {
  subtitle: string;
  role: string;
  timeline: string;
  team: string;
  mission: string;
  outcomes: string[];
};

export type RivvaDecision = {
  title: string;
  problem: string;
  body: string[];
  outcome: string;
};

export type RivvaEvidenceItem = {
  heading: string;
  problem: string;
  imageSrc?: string;
  imageAlt: string;
  caption: string;
  outcome: string;
};

export type RivvaResultsTier = {
  category: string;
  items: string[];
};

export const rivvaHeroMeta: RivvaHeroMeta = {
  subtitle:
    "Helping Rivva turn a promising AI beta into a production-ready AI product by making AI scheduling understandable and trustworthy.",
  role: "Lead Product Designer · Founding Product Team (Contract)",
  timeline: "July 2025 – January 2026",
  team: "Founding team (incl. co-founder John Etokhana) · ML · Engineering · Product Design",
  mission:
    "Partnered with the founding team to transform a promising beta into a production-ready AI product by making AI scheduling understandable, predictable, and consistent.",
  outcomes: [
    "Product Hunt #4",
    "Web + iOS + Android",
    "500+ downloads",
    "30+ paying customers",
  ],
};

export const rivvaOpportunity: string[] = [
  "Most productivity apps are built around calendars. Rivva was built around people—using AI and wearable health signals to recommend when to focus, recover, or reschedule based on cognitive energy rather than availability.",
  "Rivva had already validated its vision through an early beta. As the company prepared for launch, the founding team's focus expanded beyond product development to fundraising, partnerships, and company operations.",
  "To keep product development moving while preserving the original vision, I joined the founding product team to lead day-to-day product design.",
  "The challenge wasn't the vision.",
  "It was turning that vision into a product people could confidently use.",
];

export const rivvaChallengeIntro: string[] = [
  "When I joined, Rivva had reached an important point in its journey.",
  "The core idea resonated with users, but the experience wasn't yet ready for launch.",
  "During beta, we identified challenges that repeatedly surfaced.",
];

export const rivvaChallengeBullets: string[] = [
  "AI scheduling recommendations weren't always understandable.",
  "Product behaviour differed across web and mobile.",
  "The experience lacked consistency across touchpoints.",
  "Users hesitated to trust scheduling decisions they couldn't interpret.",
];

export const rivvaChallengeClose: string[] = [
  "For an AI product, that hesitation mattered.",
  "The challenge wasn't building more AI.",
  "It was making AI understandable enough for everyday use.",
];

export const rivvaRoleParagraphs: string[] = [
  "I joined Rivva during beta as Lead Product Designer within the founding product team, partnering closely with the founders to prepare the product for launch.",
  "Working together, we refined the product experience, validated design decisions against the company’s vision, and translated product strategy into experiences that users could understand and engineers could build.",
  "While the founding team led overall product vision and direction, I led design execution—defining interaction patterns, shaping the web experience, evolving Nia’s conversational UX, and collaborating with engineering and machine learning teams to ensure the product behaved consistently across every touchpoint.",
  "My work focused on making ambitious product ideas practical, coherent, and ready for production.",
];

export const rivvaDecisions: RivvaDecision[] = [
  {
    title: "Make AI understandable before making it autonomous",
    problem: "Users were often unsure why Rivva had rearranged their schedules.",
    body: [
      "Instead of asking users to simply trust AI, we designed the experience to explain recommendations, communicate intent, and give users confidence before asking them to rely on automation.",
      "The goal wasn't to make AI feel invisible—it was to make it understandable.",
    ],
    outcome: "Users could evaluate recommendations on their merits rather than guessing at the system's intent.",
  },
  {
    title: "Fix product behaviour before polishing interfaces",
    problem: "Different parts of the product responded differently to similar situations.",
    body: [
      "The biggest issues weren't visual—they were behavioural.",
      "Before refining the interface, we focused on establishing shared interaction patterns that made Rivva behave consistently regardless of where users encountered it.",
      "Once behaviour became consistent, interface improvements became much easier.",
    ],
    outcome: "A single behavioural language across the product, not just a single visual style.",
  },
  {
    title: "Create one consistent experience across web, mobile and conversational AI",
    problem: "Web, mobile, and Nia felt like separate products.",
    body: [
      "Rivva included web, mobile, and Nia—its AI assistant. Although each experience served different contexts, users needed them to feel like the same product.",
      "Working with engineering, we established shared interaction patterns that created one consistent experience across every touchpoint.",
    ],
    outcome: "Users could move between platforms without learning different behaviours.",
  },
];

export const rivvaVision: string[] = [
  "Rivva’s founders had already established a compelling vision for energy-aware productivity.",
  "My role was to work closely with the founding team to translate that vision into a cohesive product experience.",
  "We iterated continuously—using design explorations to validate ideas, challenge assumptions, and refine the interaction model before implementation.",
  "That close partnership ensured the product remained aligned with its founding philosophy while becoming practical enough to launch.",
  "The result wasn’t simply a redesigned interface—it was a more coherent product.",
];

export const rivvaDesignInActionIntro =
  "Rather than presenting every screen created during the project, I've selected examples that illustrate the key product decisions we refined during beta.";

export const rivvaEvidenceItems: RivvaEvidenceItem[] = [
  {
    heading: "Making AI recommendations easier to understand",
    problem: "Users didn't understand why AI moved their schedules.",
    imageSrc: "/assets/work/rivva/block-nia-explanation.png",
    imageAlt: "Nia explanation flow — contextual AI scheduling recommendations",
    caption: "Nia explanation flow",
    outcome: "We introduced contextual explanations that made recommendations easier to understand.",
  },
  {
    heading: "Creating a consistent planning experience",
    problem: "Web and mobile felt like different products.",
    imageSrc: "/assets/work/rivva/block-cross-platform.png",
    imageAlt: "Shared interaction patterns across Rivva web and mobile",
    caption: "Shared interaction patterns across platforms",
    outcome: "Users could move between platforms without learning different behaviours.",
  },
  {
    heading: "Designing around human energy",
    problem: "Schedules optimized calendar space, not cognitive capacity.",
    imageSrc: "/assets/work/rivva/block-web-dashboard.png",
    imageAlt: "Rivva planner with energy-aware scheduling recommendations",
    caption: "Planner with energy-aware recommendations",
    outcome: "Schedules adapted to how people actually work, not just calendar availability.",
  },
];

export const rivvaResultsIntro =
  "The work helped prepare Rivva for public launch across Web, iOS and Android. Early product signals showed encouraging validation.";

export const rivvaResultsTiers: RivvaResultsTier[] = [
  {
    category: "Launch",
    items: ["#4 Product Hunt", "Web, iOS and Android release"],
  },
  {
    category: "Adoption",
    items: ["500+ downloads", "30+ paying customers"],
  },
  {
    category: "Engagement",
    items: ["~10% conversion rate", "Average session duration above six minutes"],
  },
];

export const rivvaResultsClose =
  "While these numbers represent an early-stage startup, they demonstrated that people were willing not only to try Rivva, but to incorporate AI-assisted scheduling into their daily workflows.";

export const rivvaLearned: string[] = [
  "Rivva changed the way I think about designing AI products.",
  "AI products succeed when users understand how decisions are made—not when models are simply more sophisticated.",
  "That means explanation, consistency, and user control matter as much as the underlying intelligence.",
];

export const rivvaPortfolioThread =
  "Since Rivva, I've carried this thinking into enterprise recruitment at SeamlessHiring, design systems through SeamKit, and other AI-assisted products—focusing on products that reduce complexity while giving users confidence in the systems they use.";

export const rivvaDesignPrinciple =
  "People don't trust AI because it's intelligent. They trust AI because they understand how it works.";

export const rivvaDecisionArchitectureSrc = "/assets/work/rivva/diagram-decision-architecture.svg";

export const rivvaDecisionArchitectureCaption =
  "A behavioural framework the founding team refined together—how human intent, AI interpretation, and user confirmation form a repeatable trust loop.";
