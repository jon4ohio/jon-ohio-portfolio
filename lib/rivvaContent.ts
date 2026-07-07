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
  body: string[];
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
    "Helping Rivva turn a promising AI beta into a production-ready product by making AI scheduling understandable and trustworthy.",
  role: "Lead Product Designer · Founding Product Team (Contract)",
  timeline: "July 2025 – January 2026",
  team: "CEO · COO · Machine Learning Engineer · Full-stack Engineers · Product Design",
  mission:
    "Define the product experience and interaction patterns that helped transform Rivva from a fragmented beta into a launch-ready AI productivity platform.",
  outcomes: [
    "#4 Product Hunt launch",
    "500+ downloads",
    "30+ paying customers",
    "Successfully launched across Web, iOS and Android",
  ],
};

export const rivvaOpportunity: string[] = [
  "Most productivity apps are built around calendars.",
  "Rivva was built around people.",
  "Instead of helping users find more hours in the day, Rivva helps them work when they're most likely to do their best thinking. By combining AI with calendar data and wearable health signals, the product recommends when to focus, recover, or reschedule based on cognitive energy rather than availability.",
  "It was an ambitious idea with clear early validation. The team had already built a working beta and confirmed there was genuine interest in the product.",
  "The challenge wasn't the vision.",
  "It was turning that vision into a product people could confidently use.",
];

export const rivvaChallengeIntro: string[] = [
  "When I joined the founding product team, Rivva had reached an important point in its journey.",
  "The core idea resonated with users, but the experience wasn't yet ready for launch.",
  "During beta, we identified three challenges that repeatedly surfaced.",
];

export const rivvaChallengeBullets: string[] = [
  "Users didn't always understand why AI made scheduling decisions.",
  "The product behaved differently across web and mobile experiences.",
  "Because recommendations weren't always easy to interpret, users hesitated to rely on them.",
];

export const rivvaChallengeClose: string[] = [
  "For an AI product, that hesitation mattered.",
  "If users don't understand how a recommendation was made, they're unlikely to trust it—no matter how intelligent the underlying model is.",
  "Our goal wasn't simply to improve the interface.",
  "It was to make AI scheduling understandable, predictable and consistent enough for everyday use.",
];

export const rivvaRoleMission =
  "Transform a promising beta into a launch-ready AI product by making AI scheduling understandable, predictable, and consistent across every touchpoint.";

export const rivvaRoleIntro =
  "I joined Rivva during beta as the Lead Product Designer within the founding product team, working closely with the founders, engineering and machine learning teams to prepare the product for launch.";

export const rivvaLed: string[] = [
  "Product experience for the web application",
  "AI interaction design",
  "Cross-platform interaction patterns",
  "Nia conversational experience",
  "User journeys and core workflows",
  "Product behaviour definition",
];

export const rivvaCollaboratedOn: string[] = [
  "Product strategy",
  "Mobile experience",
  "Engineering implementation",
  "AI interaction rules",
  "Launch readiness",
];

export const rivvaRoleClose =
  "Rather than redesigning individual screens, my responsibility was to help define how users and AI would work together throughout the product.";

export const rivvaDecisions: RivvaDecision[] = [
  {
    title: "Make AI predictable before making it autonomous",
    body: [
      "Early testing showed that users were often unsure why Rivva had rearranged their schedules.",
      "Instead of asking users to simply trust AI, we designed the experience to explain recommendations, communicate intent and give users confidence before asking them to rely on automation.",
      "The goal wasn't to make AI feel invisible.",
      "It was to make it understandable.",
    ],
  },
  {
    title: "Fix behaviour before polishing interfaces",
    body: [
      "The biggest issues weren't visual.",
      "They were behavioural.",
      "Different parts of the product responded differently to similar situations, making the experience feel inconsistent.",
      "Before refining the interface, we focused on establishing shared interaction patterns that made Rivva behave consistently regardless of where users encountered it.",
      "Once behaviour became consistent, interface improvements became much easier.",
    ],
  },
  {
    title: "Keep the experience consistent across every touchpoint",
    body: [
      "Rivva wasn't just a web application.",
      "It included web, mobile and Nia, its AI assistant.",
      "Although each experience served different contexts, users needed them to feel like the same product.",
      "Working with engineering, I helped establish shared interaction patterns that created one consistent experience across every touchpoint.",
    ],
  },
];

export const rivvaVision: string[] = [
  "The founders had already established a compelling vision for Rivva.",
  "My role was to help translate that vision into something engineering could build and users could trust.",
  "That meant turning abstract ideas—like cognitive energy, AI scheduling and intelligent assistance—into practical interaction patterns, workflows and product behaviours.",
  "It also meant working closely with engineers and machine learning contributors to ensure technical decisions remained understandable from a user's perspective.",
  "The result wasn't simply a redesigned interface.",
  "It was a more coherent product.",
];

export const rivvaDesignInActionIntro =
  "Rather than presenting every screen created during the project, I've selected a handful of examples that illustrate the key product decisions behind Rivva's evolution.";

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
  "Traditional software is largely about helping people complete tasks.",
  "AI products introduce a different challenge.",
  "They ask users to trust decisions made by a system.",
  "That means the quality of the interaction is shaped just as much by explanation, consistency and user control as it is by the underlying intelligence.",
];

export const rivvaPortfolioThread =
  "Since Rivva, I've carried this thinking into every product I've worked on—from enterprise recruitment at SeamlessHiring, design systems through SeamKit, and other AI-assisted products—focusing on creating products that reduce complexity while giving users confidence in the systems they're using.";

export const rivvaDesignPrinciple =
  "People don't trust AI because it's intelligent. They trust AI because they understand how it works.";

export const rivvaDecisionArchitectureSrc = "/assets/work/rivva/diagram-decision-architecture.svg";
