import type { ImageAsset } from "@/lib/projects";

export type CommunityCard = {
  asset: ImageAsset;
  title: string;
  subtitle: string;
  body: string;
};

export const communityPullQuote = {
  text: "Design isn’t just about pixels anymore. It’s systems, strategy, and scale.",
  attribution: "My Conviction",
} as const;

export const communitySectionEyebrow = "ABOUT ME";
export const communitySectionTitle = "Community contribution";

/** Reading order: top-left, top-right, bottom-left, bottom-right */
export const communityCards: CommunityCard[] = [
  {
    asset: {
      src: "/assets/about/community/speaker-devfest.jpg",
      alt: "John Ohio speaking on stage at DevFest Lagos about design thinking",
      width: 2048,
      height: 1365,
    },
    title: "Speaker",
    subtitle: "Meetups & conferences",
    body: "Speaker at several UX panel conversations and meetups including Google Developer Fest, ADPList community meetups, Utiva Xclusive talks, and Codeable.",
  },
  {
    asset: {
      src: "/assets/about/community/facilitator-config.png",
      alt: "Community meetup group photo at a Config watch party",
      width: 1079,
      height: 608,
    },
    title: "Facilitator",
    subtitle: "Community building and workshops",
    body: "ADPList Abuja community advocate: I volunteer as a facilitator for meetups in the Abuja community, fostering collaboration and support.",
  },
  {
    asset: {
      src: "/assets/about/community/ux-mentorship.jpg",
      alt: "ADPList mentoring profile graphic for John Ohio",
      width: 973,
      height: 522,
    },
    title: "UX Mentorship",
    subtitle: "Community mentorship",
    body: "Mentored 100+ designers in 3 years, helping them navigate UX concepts and career challenges on platforms like ADPList and Utiva and FOF Abuja Community.",
  },
  {
    asset: {
      src: "/assets/about/community/speaker-fof-panel.jpg",
      alt: "John Ohio on a panel discussion with other designers",
      width: 4000,
      height: 3000,
    },
    title: "Speaker",
    subtitle: "Meetups & conferences",
    body: "Volunteer Advocate at Friends of Figma Abuja, aiding early-career designers through design reviews and collaborating with community leaders to boost the local design scene.",
  },
];
