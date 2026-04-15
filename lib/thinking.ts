/**
 * Canonical URLs and copy for /thinking, homepage teaser, and About press strip.
 */

export type RecognitionItem = {
  id: string;
  outlet: string;
  title: string;
  description: string;
  href: string;
};

export type WritingItem = {
  id: string;
  title: string;
  kind: "featured" | "secondary";
  href: string;
};

export type ConversationItem = {
  id: string;
  title: string;
  outlet: string;
  href: string;
};

export const substackHomeUrl = "https://theuxcompany.substack.com/";

export const recognitionItems: RecognitionItem[] = [
  {
    id: "techcabal-quick-fire",
    outlet: "TechCabal",
    title: "Quick Fire",
    description: "Interview on AI, enterprise design, and product craft — Feb 2026.",
    href: "https://techcabal.com/2026/02/13/john-ohio-quick-fire/",
  },
  {
    id: "tribune-future-of-work",
    outlet: "Tribune Online",
    title: "The future of work in Nigeria",
    description: "Youth, opportunity, and preparing for what comes next in tech and work.",
    href: "https://tribuneonlineng.com/the-future-of-work-in-nigeria-preparing-todays-youth-for-tomorrows-opportunities/",
  },
  {
    id: "connected-awards",
    outlet: "Leadership.ng",
    title: "Connected Awards — Global Tech Hero",
    description: "Certified as the 119th Global Tech Hero by the Connected Awards.",
    href: "https://leadership.ng/the-connected-awards-certifies-john-ohio-119th-global-tech-hero/",
  },
];

export const writingItems: WritingItem[] = [
  {
    id: "design-tokens",
    title: "Design tokens: the connective tissue",
    kind: "featured",
    href: "https://theuxcompany.substack.com/p/design-tokens-the-connective-tissue",
  },
  {
    id: "cards-modals-tables",
    title: "Rethinking cards, modals, and tables",
    kind: "secondary",
    href: "https://theuxcompany.substack.com/p/rethinking-cards-modals-and-tables",
  },
  {
    id: "ux-designer-2025",
    title: "How to become a UX designer in 2025",
    kind: "secondary",
    href: "https://theuxcompany.substack.com/p/how-to-become-a-ux-designer-in-2025",
  },
];

export const conversationItems: ConversationItem[] = [
  {
    id: "youtube-devfest",
    title: "Design Thinking for Problem Solving: Beyond UX by John Ohio",
    outlet: "GDG Lagos (DevFest)",
    href: "https://www.youtube.com/watch?v=9NG7TWiyIjo&list=PLzIthozLDW280eWfYTKxqe2Lu-uvCU7T7&index=13",
  },
  {
    id: "youtube-aida",
    title: "Embedding AI into Design Systems and Product Experiences / John Ohio",
    outlet: "AIDA",
    href: "https://www.youtube.com/watch?v=k7KGv6FYIhM&t=1549s",
  },
];

/** Homepage: three preview rows → /thinking#… */
export const homepageThinkingPreviews: Array<{
  anchor: string;
  outlet: string;
  line: string;
}> = [
  {
    anchor: "recognition-techcabal-quick-fire",
    outlet: "TechCabal",
    line: "Quick Fire — enterprise design & AI",
  },
  {
    anchor: "conversation-youtube-devfest",
    outlet: "GDG Lagos (DevFest)",
    line: "Design Thinking for Problem Solving — beyond UX",
  },
  {
    anchor: "recognition-connected-awards",
    outlet: "Leadership.ng",
    line: "Connected Awards — Global Tech Hero",
  },
];

/** About page — outlet credibility strip (four tiles). */
export const aboutPressOutlets: Array<{
  name: string;
  detail: string;
  href: string;
}> = [
  {
    name: "TechCabal",
    detail: "Quick Fire · 2026",
    href: "https://techcabal.com/2026/02/13/john-ohio-quick-fire/",
  },
  {
    name: "Leadership.ng",
    detail: "Connected Awards",
    href: "https://leadership.ng/the-connected-awards-certifies-john-ohio-119th-global-tech-hero/",
  },
  {
    name: "Tribune Online",
    detail: "Future of work",
    href: "https://tribuneonlineng.com/the-future-of-work-in-nigeria-preparing-todays-youth-for-tomorrows-opportunities/",
  },
  {
    name: "The UX Company",
    detail: "Newsletter on Substack",
    href: substackHomeUrl,
  },
];
