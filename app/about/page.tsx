import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "John Ohio — Product Design Lead based in Abuja, Nigeria. Five years building trusted systems across enterprise SaaS, fintech infrastructure, and 0→1 products.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — John Ohio",
    description:
      "Product Design Lead · Systems · DesignOps · AI. Based in Abuja, Nigeria.",
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
    body: "Good design decisions create leverage. Patterns, tokens, and systems multiply individual decisions into organisation-wide consistency.",
  },
  {
    title: "Design must reflect operational reality",
    body: "The best design fails if it doesn't account for constraints: engineering capacity, compliance, team bandwidth, and market context.",
  },
];

const timeline = [
  { year: "2025–Present", role: "Lead, DesignOps & AI-UX", org: "SeamlessHR" },
  { year: "2024–2025", role: "Product Designer (Founding Member)", org: "ClearPrice" },
  { year: "2025–2026", role: "Product Designer (Founding Team)", org: "Rivva" },
  { year: "2022–2025", role: "Lead Product Designer", org: "SeamlessHR (SeamlessHiring 2.0)" },
  { year: "2021–2025", role: "Senior UX Contractor", org: "Fets" },
  { year: "2021–Present", role: "Founder & Design Lead", org: "The UX Company" },
  { year: "Earlier", role: "UX Coach & Mentor", org: "Utiva / ADPList" },
];

export default function About() {
  return (
    <div style={{ paddingTop: 56 }}>
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 24px 120px" }}>
        <div className="grid-2-lg" style={{ alignItems: "start" }}>

          {/* Left: Narrative */}
          <div>
            <p className="section-label" style={{ marginBottom: 24 }}>
              About
            </p>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 32 }}>
              I turn complexity into working systems for product teams.
            </h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: "var(--fg-body)" }}>
                I&apos;m a Product Design Lead based in Abuja, Nigeria, specialising in design systems, DesignOps, enterprise UX, and AI-native product work. Over the past five years I&apos;ve led design across some of Africa&apos;s most complex product environments, from a 12-team SaaS platform to fintech infrastructure serving millions of users.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: "var(--fg-body)" }}>
                My core thesis is simple: design at scale only works when it becomes systematic. Good taste is not enough. Teams need shared language, governance, and a repeatable way to make sound decisions without bottlenecking on individual designers.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: "var(--fg-body)" }}>
                That belief shaped Seamkit, which I built not as a component library but as an operating system for product teams: token architecture, naming logic, contribution pipelines, and governance rituals. It became the backbone of SeamlessHR&apos;s product organisation across 12 teams, with an 88.9 adoption score and roughly 80% daily usage.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: "var(--fg-body)" }}>
                I&apos;ve also worked at the 0→1 edge, shaping products like Rivva and ClearPrice, where the job is to define the product, earn trust quickly, and give the team a system worth scaling. Today I lead DesignOps and AI-UX work focused on how intelligence shows up inside enterprise workflows as reusable patterns, not one-off features.
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
            <p className="section-label" style={{ marginBottom: 24 }}>
              How I Think
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 56 }}>
              {principles.map((p, i) => (
                <div
                  key={i}
                  style={{
                    padding: "24px 0",
                    borderTop: "1px solid #e5e7eb",
                    borderBottom: i === principles.length - 1 ? "1px solid #e5e7eb" : "none",
                  }}
                >
                  <h3 style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>{p.body}</p>
                </div>
              ))}
            </div>

            <p className="section-label" style={{ marginBottom: 24 }}>
              Experience
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {timeline.map((t, i) => (
                <div
                  key={i}
                  className="about-timeline-row"
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
