import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "John Ohio — Senior Product Designer based in Abuja, Nigeria. A decade building trusted systems across enterprise SaaS, fintech infrastructure, and 0→1 products.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — John Ohio",
    description:
      "Senior Product Designer · Systems · DesignOps · AI. Based in Abuja, Nigeria.",
    url: "/about",
    type: "profile",
  },
};

import AssetImage from "@/components/AssetImage";
import type { ImageAsset } from "@/lib/projects";

const portrait: ImageAsset = {
  src: "/assets/about/portrait.svg",
  alt: "Portrait of John Ohio",
  width: 1200,
  height: 1400,
};

const principles = [
  {
    title: "Systems over screens",
    body: "The interface is a surface. The system is what matters — how it behaves under load, at scale, and over time.",
  },
  {
    title: "Structure reduces complexity",
    body: "Complexity is unavoidable. The job is to impose structure so teams can navigate it without friction.",
  },
  {
    title: "Decisions should compound",
    body: "Good design decisions create leverage. Patterns, tokens, and systems multiply individual decisions into consistency across teams.",
  },
  {
    title: "Design must reflect operational reality",
    body: "The best design fails if it doesn't account for constraints: engineering capacity, compliance, team bandwidth, and market context.",
  },
];

const timeline = [
  { year: "2025–Now", role: "Lead, DesignOps & AI-UX", org: "SeamlessHR / SeamlesTech" },
  { year: "2024–2025", role: "Founding Designer", org: "ClearPrice" },
  { year: "2025–2026", role: "Founding Designer", org: "Rivva" },
  { year: "2022–2025", role: "Product Design Lead", org: "SeamlessHR" },
  { year: "2021–2025", role: "Lead Product Designer", org: "Fets" },
  { year: "2020–2022", role: "Senior Product Designer", org: "The UX Company" },
  { year: "Earlier", role: "Instructor & Coach", org: "Utiva" },
];

export default function About() {
  return (
    <div style={{ paddingTop: 56 }}>
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 24px 64px" }}>
        <div className="grid-2-lg" style={{ alignItems: "start" }}>

          {/* Left: Narrative */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 24 }}>
              About
            </p>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 32 }}>
              I turn complexity into working systems for product teams.
            </h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: "#374151" }}>
                I&apos;m a Senior Product Designer based in Abuja, Nigeria, specialising in design systems, DesignOps, enterprise UX, and AI-native product work. Over the past decade I&apos;ve worked across some of Africa&apos;s most complex product environments — from a 12-team SaaS platform to fintech infrastructure serving millions of users — leading initiatives and contributing to systems that scale.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: "#374151" }}>
                My core thesis is simple: design at scale only works when it becomes systematic. Good taste is not enough. Teams need shared language, governance, and a repeatable way to make sound decisions without bottlenecking on individual designers.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: "#374151" }}>
                That belief shaped Seamkit, which I built not as a component library but as an operating system for product teams: token architecture, naming logic, contribution pipelines, and governance rituals. It was adopted across 12 product teams at SeamlessHR, with an 88.9 adoption score and roughly 80% daily usage.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: "#374151" }}>
                I&apos;ve also worked at the 0→1 edge, shaping products like Rivva and ClearPrice, where the job is to define the product, earn trust quickly, and give the team a system worth scaling. Today I focus on DesignOps and AI-UX — how intelligence shows up inside enterprise workflows as reusable patterns, not one-off features.
              </p>
            </div>

            <div style={{ marginTop: 40, display: "flex", gap: 16 }}>
              <a href="mailto:jon4ohio@gmail.com" style={{ fontSize: 14, fontWeight: 500, color: "#0a0a0a", textDecoration: "none", border: "1px solid #0a0a0a", padding: "10px 20px", borderRadius: 8 }}>
                Get in touch
              </a>
              <a href="https://linkedin.com/in/jon4ohio" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, fontWeight: 500, color: "#6b7280", textDecoration: "none", border: "1px solid #e5e7eb", padding: "10px 20px", borderRadius: 8 }}>
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Right: Principles + Timeline */}
          <div>
            <div style={{ marginBottom: 24 }}>
              <AssetImage asset={portrait} sizes="(max-width: 900px) 92vw, 480px" />
            </div>
            <p style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 24 }}>
              How I Think
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 56 }}>
              {principles.map((p, i) => (
                <div
                  key={i}
                  style={{
                    padding: "24px 0",
                    borderTop: i === 0 ? "1px solid #e5e7eb" : "1px solid #e5e7eb",
                    borderBottom: i === principles.length - 1 ? "1px solid #e5e7eb" : "none",
                  }}
                >
                  <h3 style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>{p.body}</p>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 24 }}>
              Experience
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {timeline.map((t, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "100px 1fr",
                    gap: 16,
                    padding: "14px 0",
                    borderTop: "1px solid #e5e7eb",
                    borderBottom: i === timeline.length - 1 ? "1px solid #e5e7eb" : "none",
                  }}
                >
                  <span style={{ fontSize: 12, color: "#9ca3af", paddingTop: 2 }}>{t.year}</span>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500 }}>{t.role}</p>
                    <p style={{ fontSize: 13, color: "#6b7280" }}>{t.org}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
