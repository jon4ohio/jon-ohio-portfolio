export type TrustedByLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** 0–1, echoes Figma logo treatment */
  opacity?: number;
  /** SVG logos use native img; PNG uses next/image */
  format?: "png" | "svg";
};

export const trustedByLogos: TrustedByLogo[] = [
  {
    src: "/assets/trusted-by/seamlesshr.png",
    alt: "SeamlessHR",
    width: 316,
    height: 159,
    opacity: 0.8,
    format: "png",
  },
  {
    src: "/assets/trusted-by/adplist.png",
    alt: "ADPList",
    width: 318,
    height: 159,
    opacity: 0.5,
    format: "png",
  },
  {
    src: "/assets/trusted-by/clearprice.svg",
    alt: "ClearPrice",
    width: 89,
    height: 16,
    opacity: 1,
    format: "svg",
  },
  {
    src: "/assets/trusted-by/ibedc.png",
    alt: "IBEDC",
    width: 128,
    height: 69,
    opacity: 0.5,
    format: "png",
  },
  {
    src: "/assets/trusted-by/fets.png",
    alt: "fets",
    width: 266,
    height: 94,
    opacity: 0.5,
    format: "png",
  },
  {
    src: "/assets/trusted-by/pertinence.png",
    alt: "Pertinence Group",
    width: 387,
    height: 130,
    opacity: 0.5,
    format: "png",
  },
  {
    src: "/assets/trusted-by/highable.png",
    alt: "HIGHABLE",
    width: 376,
    height: 134,
    opacity: 0.5,
    format: "png",
  },
  {
    src: "/assets/trusted-by/yellowdot.png",
    alt: "YellowDot",
    width: 400,
    height: 116,
    opacity: 0.8,
    format: "png",
  },
  {
    src: "/assets/trusted-by/abuja.png",
    alt: "Abuja",
    width: 284,
    height: 284,
    opacity: 0.5,
    format: "png",
  },
  {
    src: "/assets/trusted-by/utiva.png",
    alt: "Utiva",
    width: 621,
    height: 186,
    opacity: 0.5,
    format: "png",
  },
];
