import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader, Source_Sans_3 } from "next/font/google";
import PageCrumbHeader from "@/components/PageCrumbHeader";
import { AnchorCaseStudy } from "./AnchorCaseStudy";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-anchor-display",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-anchor-body",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-anchor-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anchor",
  description:
    "Anchor preserves project knowledge so humans and AI can continue work instead of reconstructing context.",
  alternates: { canonical: "/work/anchor" },
  openGraph: {
    title: "Anchor — Continue instead of reconstruct",
    description:
      "Anchor preserves project knowledge so humans and AI can continue work instead of reconstructing context.",
    url: "/work/anchor",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anchor",
    description:
      "Anchor preserves project knowledge so humans and AI can continue work instead of reconstructing context.",
  },
};

export default function AnchorWorkPage() {
  return (
    <div style={{ paddingTop: 56 }}>
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 24px 8px",
        }}
      >
        <PageCrumbHeader
          backHref="/work"
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Case Studies", href: "/work" },
            { label: "Anchor" },
          ]}
        />
      </div>
      <div
        className={`${newsreader.variable} ${sourceSans.variable} ${plexMono.variable}`}
      >
        <AnchorCaseStudy />
      </div>
    </div>
  );
}
