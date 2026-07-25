import type { Metadata } from "next";
import Link from "next/link";
import { anchorProduct as c } from "../anchorProduct";

const firstArticleHref = "/anchor/articles/projects-become-harder-to-understand-before-they-become-harder-to-code";

export const metadata: Metadata = {
  title: "Anchor Articles",
  description: "Essays on project understanding and AI-assisted engineering.",
  alternates: { canonical: "/anchor/articles" },
  openGraph: {
    title: "Anchor Articles",
    description: "Essays on project understanding and AI-assisted engineering.",
    url: "/anchor/articles",
    type: "website",
  },
};

export default function AnchorArticlesPage() {
  return (
    <main style={{ padding: `140px ${c.pad} 120px`, minHeight: "100vh" }}>
      <p
        style={{
          fontFamily: c.mono,
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: c.teal,
          margin: "0 0 28px",
        }}
      >
        Articles
      </p>
      <h1
        style={{
          fontFamily: c.display,
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(42px, 7vw, 72px)",
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          maxWidth: 760,
          margin: "0 0 24px",
        }}
      >
        Essays on project understanding.
      </h1>
      <p style={{ fontSize: 18, lineHeight: 1.7, color: c.muted, maxWidth: 620, margin: "0 0 56px" }}>
        Standalone arguments behind Anchor. Start with the core premise.
      </p>
      <Link
        href={firstArticleHref}
        style={{
          display: "block",
          maxWidth: 760,
          padding: "28px 0",
          borderTop: `1px solid ${c.line}`,
          borderBottom: `1px solid ${c.line}`,
          color: c.paper,
          textDecoration: "none",
        }}
      >
        <span style={{ display: "block", fontFamily: c.mono, fontSize: 11, color: c.teal, marginBottom: 12 }}>
          Article 1
        </span>
        <span style={{ display: "block", fontSize: 26, lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: 10 }}>
          Projects Become Harder to Understand Before They Become Harder to Code
        </span>
        <span style={{ display: "block", color: c.muted, fontSize: 15, lineHeight: 1.6 }}>
          Why AI-assisted projects lose momentum, and why project understanding has to become durable.
        </span>
      </Link>
    </main>
  );
}
