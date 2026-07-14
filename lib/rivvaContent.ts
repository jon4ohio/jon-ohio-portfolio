export type RivvaHeroMeta = {
  eyebrow: string;
  headline: string;
  subtitle: string;
  role: string;
  timeline: string;
  model: string;
  outcome: string;
  heroImageSrc: string;
  heroImageAlt: string;
  heroCaption: string;
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
  eyebrow: "Flagship Case Study · Rivva",
  headline: "Rivva turned a validated AI beta into a product people could trust with their day.",
  subtitle:
    "Rivva is an AI scheduling platform that plans your day around your energy, not just your calendar. I joined the founding product team to help prepare it for launch, leading day-to-day product design alongside the founders.",
  role: "Product Design Lead, founding product team",
  timeline: "Jul 2025 – Jan 2026",
  model: "Co-led with the founding team",
  outcome: "Shipped on Web, iOS, and Android",
  heroImageSrc: "/assets/work/rivva/rivva-hero.png",
  heroImageAlt: "Rivva product overview",
  heroCaption:
    "Rivva at launch. A scheduling experience where AI recommendations and user control share the same surface, so plans stay flexible without becoming unpredictable.",
  impact: [
    { value: "#4", label: "Product Hunt" },
    { value: "500+", label: "Downloads" },
    { value: "30+", label: "Paying customers" },
    { value: "~10%", label: "Conversion rate" },
  ],
};

export const rivvaOpportunity: string[] = [
  "Most scheduling tools treat every hour as equal. Rivva doesn't. It learns when you have energy and plans your most important work for those windows. That idea resonated: the beta validated demand, and the company had real momentum.",
  "When I joined, Rivva was preparing to go from beta to public launch across three platforms. The founding team was small, and the co-founder leading product was increasingly pulled into company leadership, fundraising, and partnerships. The product needed someone to maintain design momentum every day.",
  "That is why the team expanded, and why I joined.",
];

export const rivvaPreparingForLaunchIntro: string[] = [
  "The beta worked. It wasn't ready.",
  "Beta users liked what Rivva promised but struggled with what it did. Recommendations appeared without explanation, so people didn't know whether to accept them. The web, iOS, and Android experiences had drifted apart. Patterns that meant one thing on one platform meant something else on another.",
];

export const rivvaPreparingForLaunchBullets: string[] = [
  "AI recommendations appeared without explanation.",
  "Web, iOS, and Android had drifted into inconsistent patterns.",
  "Trust in the underlying technology had not caught up.",
];

export const rivvaPreparingForLaunchClose: string[] = [
  "The underlying technology was good. Trust in it had not caught up.",
  "The challenge wasn't building more AI. It was making AI understandable enough for everyday use.",
];

export const rivvaRoleCollaboration =
  "Rivva remained founder-led throughout. Co-founder John Etokhana continued shaping product direction while balancing company leadership, fundraising, partnerships, and investor relations. I joined the founding product team to maintain product momentum, leading day-to-day product design and working closely with him and with engineering to prepare the product for launch.";

export const rivvaLed: string[] = [
  "Day-to-day product design across Web, iOS, and Android",
  "Interaction patterns for AI recommendations",
  "Cross-platform consistency and launch readiness",
];

export const rivvaWorkedCloselyOn: string[] = [
  "Product direction and prioritization with the founders",
  "Recommendation behavior with the ML team",
  "Implementation details with engineering",
];

export const rivvaRoleClose = "Everything after this section is about the product.";

export const rivvaProductDecisions: RivvaProductDecision[] = [
  {
    title: "Make AI recommendations easier to understand.",
    problem:
      "In beta, Rivva moved things on people's schedules without saying why. Users either accepted blindly or ignored the AI entirely. Neither is trust.",
    decision:
      "We decided that no recommendation would appear without an explanation a non-technical person could read in one glance. That constraint shaped the interaction model: recommend, explain, then let the user decide.",
    outcome:
      "Acceptance of recommendations went up because people finally understood what they were agreeing to.",
    imageSrc: "/assets/work/rivva/rivva-nia.png",
    imageAlt: "Rivva recommendation explanation interface",
    caption:
      "Every recommendation now carries its reasoning. Before Rivva asks users to act, it explains what it noticed and why the change helps.",
  },
  {
    title: "Create one consistent experience across every touchpoint.",
    problem:
      "The web, iOS, and Android apps had been built at different speeds by different hands. The same feature looked and behaved three ways. For a product asking people to trust its judgment, inconsistency read as unreliability.",
    decision:
      "Instead of redesigning each platform separately, we defined the core patterns once and adapted them to each platform's conventions. Engineering could build against one source of truth instead of three interpretations.",
    outcome:
      "The product shipped on all three platforms simultaneously at launch, something the team could not have attempted in beta.",
    imageSrc: "/assets/work/rivva/rivva-cross-platform.png",
    imageAlt: "Rivva across web, iOS, and Android",
    caption:
      "One experience across Web, iOS, and Android. The same patterns mean the same things everywhere, so switching devices never means relearning the product.",
  },
  {
    title: "Design around how people actually work, not how calendars work.",
    problem:
      "Calendars assume every hour is interchangeable. Rivva's whole premise is that it isn't. But the beta still presented the day as a standard grid of time slots, which buried the product's core idea.",
    decision:
      "We rebuilt the planner around energy and priorities rather than empty slots. The planner evolved from a static scheduling tool into a decision-making workspace, helping users understand why Rivva recommended changes before asking them to act.",
    outcome:
      "Users stopped treating Rivva as another calendar and started treating it as the place where they decided their day.",
    imageSrc: "/assets/work/rivva/rivva-dashboard.png",
    imageAlt: "Rivva planner workspace",
    caption:
      "The planner became the centre of the experience, combining AI recommendations with user control so schedules remained flexible without becoming unpredictable.",
  },
];

export const rivvaResultsIntro = "How the story ended. And keeps going.";

export const rivvaResultsTiers: RivvaResultsTier[] = [
  {
    category: "Launch",
    items: [
      "The product shipped across Web, iOS, and Android and reached Product Hunt shortly after launch.",
      "#4 Product of the Day, a team result",
    ],
  },
  {
    category: "Adoption",
    items: [
      "Early customers validated that people were willing to trust a different approach to productivity.",
      "500+ downloads · 30+ paying customers",
    ],
  },
  {
    category: "Engagement",
    items: [
      "Usage patterns suggested that people continued returning after onboarding rather than abandoning the experience.",
      "Further engagement metrics pending final confirmation",
    ],
  },
];

export const rivvaReflection: string[] = [
  "Rivva changed the way I think about AI products. The quality of an AI product depends as much on how decisions are communicated as on how they are made. A recommendation that cannot explain itself is a demand, and people do not build habits around demands.",
  "That perspective followed me into later work. The explanation patterns we shaped at Rivva informed how I approach AI features inside enterprise products, where the cost of unexplained automation is even higher.",
];

export const rivvaDesignPrinciple = "People trust products they can understand. AI is no different.";
