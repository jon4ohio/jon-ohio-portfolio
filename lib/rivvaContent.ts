export type RivvaHeroMeta = {
  subtitle: string;
  role: string;
  timeline: string;
  team: string;
  impact: Array<{ value: string; label: string }>;
};

export type RivvaProductDecision = {
  title: string;
  problem: string;
  decision: string;
  outcome: string;
  imageSrc: string;
  imageAlt: string;
  caption: string;
};

export type RivvaResultsTier = {
  category: string;
  items: string[];
};

export const rivvaHeroMeta: RivvaHeroMeta = {
  subtitle:
    "Rivva used AI and wearable health data to recommend when to focus, recover, or reschedule, based on energy rather than availability. I joined the founding product team during its beta phase and led day-to-day product design through launch.",
  role: "Lead Product Designer · Founding Product Team (Contract)",
  timeline: "July 2025 – January 2026",
  team: "CEO · COO · Machine Learning Engineer · Full-stack Engineers · Product Design",
  impact: [
    { value: "#4", label: "Product Hunt" },
    { value: "500+", label: "Downloads" },
    { value: "30+", label: "Paying customers" },
    { value: "~10%", label: "Conversion rate" },
  ],
};

export const rivvaOpportunity: string[] = [
  "Most productivity tools schedule around calendars. Rivva scheduled around people, using AI and wearable signals to understand cognitive energy and recommend when someone should focus, recover, or reschedule.",
  "By the time I joined, the idea had already been validated through an early beta. Users responded to it. The company was preparing to launch, and the founders' attention was expanding into fundraising, partnerships, and operations.",
  "The product still needed someone focused entirely on it. That's why I joined the founding product team, to keep day-to-day design and product decisions moving while the founders built the company around it.",
];

export const rivvaPreparingForLaunchIntro: string[] = [
  "The vision wasn't the problem. Getting people to trust it was.",
  "During beta, a few issues kept surfacing:",
];

export const rivvaPreparingForLaunchBullets: string[] = [
  "AI scheduling recommendations weren't always easy to understand.",
  "The product behaved differently depending on whether someone was on web, mobile, or talking to Nia, Rivva's AI assistant.",
  "Because behaviour wasn't consistent, trust didn't build the way the product needed it to.",
];

export const rivvaPreparingForLaunchClose: string[] = [
  "None of this was a modelling problem. It was a communication problem.",
  "The challenge wasn't building more AI. It was making AI understandable enough for everyday use.",
];

export const rivvaRoleCollaboration =
  "I worked closely with co-founder John Etokhana throughout the engagement. As his time increasingly went toward company leadership, investors, and partnerships, he stayed involved in product vision and design validation, and I took on day-to-day product design, interaction design, and the day-to-day collaboration with engineering and machine learning.";

export const rivvaLed: string[] = [
  "Product experience",
  "AI interaction design",
  "Web application",
  "Nia's conversational UX",
  "User journeys",
  "Product refinement",
  "Engineering collaboration",
];

export const rivvaWorkedCloselyOn: string[] = [
  "Product strategy",
  "Mobile UX",
  "AI interaction rules",
  "Launch planning",
];

export const rivvaRoleClose =
  "The goal was never to redesign Rivva. It was to make an ambitious idea practical enough to ship.";

export const rivvaProductDecisions: RivvaProductDecision[] = [
  {
    title: "Decision one: make recommendations understandable before making them automatic",
    problem:
      "Users didn't understand why Rivva had moved their schedule, so they didn't act on what it suggested.",
    decision:
      "We built a layer that explained the reasoning behind every scheduling suggestion, before asking anyone to act on it.",
    outcome:
      "People could evaluate a recommendation instead of guessing at it. That's what made the next decision possible.",
    imageSrc: "/assets/work/rivva/block-nia-explanation.png",
    imageAlt: "Nia explanation flow — contextual AI scheduling recommendations",
    caption:
      "Before Rivva could ask people to trust a recommendation, it had to say why it was making one. Every scheduling change now carries a short, plain explanation of the reasoning behind it.",
  },
  {
    title: "Decision two: make Rivva behave the same way everywhere",
    problem:
      "Web, mobile, and Nia had grown into three different products. The same request could produce three different experiences depending on where someone made it.",
    decision:
      "Working with engineering, we defined one shared set of interaction rules and applied it across every surface, rather than fixing each product's interface on its own.",
    outcome:
      "Someone could move between web, mobile, and Nia without relearning how the product behaved.",
    imageSrc: "/assets/work/rivva/block-cross-platform.png",
    imageAlt: "Shared interaction patterns across Rivva web and mobile",
    caption:
      "We rebuilt the underlying interaction patterns first, so a decision made on web and a decision made through Nia followed the same logic before either surface was restyled.",
  },
  {
    title: "Decision three: schedule around energy, not availability",
    problem:
      "Even with consistent behaviour, the underlying schedule still optimised for open calendar slots, which is the exact assumption Rivva was built to challenge.",
    decision:
      "We rebuilt the planner around energy signals, so a free slot on the calendar wasn't automatically treated as the right time to work.",
    outcome:
      "The schedule started reflecting how someone could actually work that day, not just what their calendar allowed.",
    imageSrc: "/assets/work/rivva/block-web-dashboard.png",
    imageAlt: "Rivva planner with energy-aware scheduling recommendations",
    caption:
      'The planner stopped asking "what\'s free" and started asking "what makes sense," weighing recovery and focus alongside open time.',
  },
];

export const rivvaResultsIntro =
  "The work helped take Rivva from beta to a public release across web, iOS, and Android.";

export const rivvaResultsTiers: RivvaResultsTier[] = [
  {
    category: "Launch",
    items: ["#4 Product Hunt — release day across web, iOS, and Android"],
  },
  {
    category: "Adoption",
    items: [
      "500+ downloads in the weeks following launch",
      "30+ paying customers — for a product asking people to change how they think about scheduling entirely",
    ],
  },
  {
    category: "Engagement",
    items: [
      "~10% conversion rate",
      "Average sessions above six minutes — people weren't just trying Rivva once; they were coming back to it",
    ],
  },
];

export const rivvaReflection: string[] = [
  "Rivva changed how I think about AI products.",
  "The lesson wasn't about the model. It was about trust, and trust came from explanation, consistency, and giving people some control over decisions made on their behalf, not from making the AI more sophisticated.",
  "I've carried that into every AI-related product since, from SeamlessHiring to SeamKit: reduce the complexity a user has to hold in their head, and give them a reason to believe the system.",
];

export const rivvaDesignPrinciple =
  "People don't trust AI because it's intelligent. They trust it because they understand how it works.";
