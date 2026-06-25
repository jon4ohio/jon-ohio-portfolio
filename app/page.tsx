import Link from "next/link";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { siteDescription, siteTitle } from "@/lib/sitePositioning";
import SystemModel from "@/components/SystemModel";
import AssetImage from "@/components/AssetImage";
import { getPrimaryPreviewImage, projects } from "@/lib/projects";
import { getContactMailtoHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: siteTitle,
  description: `${siteDescription} Open to Lead / Staff IC roles globally.`,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteTitle,
    description:
      "Lead Product Designer — design systems, enterprise UX, AI product design. Based in Nigeria, open to remote (UK/EU/US).",
    url: "/",
    type: "website",
  },
};

const heroMetrics: Array<{ value: string; label: string }> = [
  {
    value: "$1M+",
    label: "Saved through infrastructure redesign of a mobile money system",
  },
  {
    value: "↑75%",
    label: "Increase in user satisfaction from enterprise workflow re-architecture",
  },
  {
    value: "12+",
    label: "Teams onboarded to a unified design system (Seamkit)",
  },
  {
    value: "#4",
    label: "Product of the Day — Product Hunt launch (Rivva)",
  },
];

const ownershipItems = [
  {
    slug: "seamkit",
    name: "Seamkit",
    type: "Enterprise Design System",
    description:
      "Coordinated designers, engineers, and product stakeholders across 12 teams to establish a token-driven system embedded across every SeamlessHR product.",
  },
  {
    slug: "seamless-hiring",
    name: "SeamlessHiring 2.0",
    type: "Recruitment Management System",
    description:
      "Led a phased rebuild with PM, engineering, and GTM — transforming an underperforming add-on into a flagship module and blueprint for suite-wide modernization.",
  },
  {
    slug: "fetsproza",
    name: "FetsProza",
    type: "Financial Operations",
    description:
      "Designed the operating platform that unified a fragmented payment ecosystem—replacing vendor dependency with an owned financial operating model.",
  },
  {
    slug: "ibedc",
    name: "IBEDC Digital Transformation",
    type: "Care App + POS System",
    description:
      "Designed consumer and field payment tools for one of Nigeria's largest electricity distributors — translating utility infrastructure into usable workflows at public-sector scale.",
  },
  {
    slug: "rivva",
    name: "Rivva",
    type: "AI Scheduling Platform",
    description:
      "Co-led design for an AI scheduling product shipped from beta to full release — reaching #4 on Product Hunt in its first week and 500+ downloads within the first month.",
  },
] as const;

export default function Home() {
  const mailtoHref = getContactMailtoHref();
  return (
    <div style={{ paddingTop: 56 }}>
      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <Hero />

      {/* ── 2. IMPACT ────────────────────────────────────────── */}
      <section aria-label="Career metrics" style={{ padding: "0" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "48px 24px 0" }}>
          <p
            className="section-label"
            style={{ marginBottom: 0, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}
          >
            Impact across products, systems, and operations
          </p>
          <div className="hero-metrics" style={{ paddingTop: 32 }}>
            {heroMetrics.map((m) => (
              <div key={`${m.value}-${m.label}`} className="hero-metric" style={{ whiteSpace: "normal" }}>
                <p className="hero-metric-value">{m.value}</p>
                <p className="hero-metric-label">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. OWNERSHIP ─────────────────────────────────────── */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 0" }}>
        <p className="section-label" style={{ marginBottom: 20 }}>
          Systems I&apos;ve Shaped
        </p>
        <h2
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: 48,
            maxWidth: 720,
          }}
        >
          I operate at the system level — designing structures that scale across products, teams, and organizations.
        </h2>

        <div className="work-list-stack">
          {ownershipItems.map((item) => {
            const p = projects.find((project) => project.slug === item.slug);
            if (!p) return null;
            const copy = ownershipItems.find((o) => o.slug === item.slug);
            if (!copy) return null;
            const preview = getPrimaryPreviewImage(p.assets);
            return (
              <div key={p.slug} className="work-list-item work-list-item--no-idx">
                <Link
                  href={`/work/${p.slug}`}
                  className="work-list-row"
                  aria-label={`${copy.name} — ${copy.type}`}
                >
                  <div className="work-list-thumb">
                    {preview ? (
                      <AssetImage
                        asset={{
                          ...preview,
                          alt: preview.src.includes("/assets/work/_placeholders/")
                            ? `${copy.name} — project preview`
                            : preview.alt,
                        }}
                        sizes="(max-width: 640px) 92vw, (max-width: 900px) 356px, 427px"
                        aspectCover="16 / 9"
                        aspectFit={p.slug === "orchestrated-portfolio" ? "contain" : "auto"}
                        style={{}}
                      />
                    ) : null}
                  </div>

                  <div className="work-list-body">
                    <div style={{ display: "flex", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, color: "var(--fg-subtle)" }}>{p.company}</span>
                      <span aria-hidden="true" style={{ fontSize: 11, color: "var(--accent-orange)" }}>
                        ·
                      </span>
                      <span style={{ fontSize: 11, color: "var(--fg-subtle)" }}>{p.period}</span>
                    </div>
                    <h3
                      style={{
                        fontSize: 22,
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        marginBottom: 8,
                        marginTop: 0,
                      }}
                    >
                      {copy.name}
                    </h3>
                    <p style={{ fontSize: 14, color: "var(--fg-muted)", marginBottom: 10 }}>{copy.type}</p>

                    <p
                      style={{
                        fontSize: 14,
                        color: "var(--fg-body-muted)",
                        lineHeight: 1.65,
                        maxWidth: 720,
                        marginBottom: 12,
                      }}
                    >
                      {copy.description}
                    </p>

                    <div className="metric-badges" style={{ marginBottom: 12 }}>
                      {p.metrics.map((m, j) => (
                        <div key={j} className="metric-badge">
                          <span className="metric-badge__value">{m.value}</span>
                          <span className="metric-badge__label">{m.label}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: 11,
                            color: "var(--accent-orange)",
                            border: "1px solid var(--border)",
                            padding: "3px 8px",
                            borderRadius: 4,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    className="work-list-arrow"
                    style={{ color: "var(--fg-subtle)", fontSize: 16, paddingTop: 4, paddingRight: 32 }}
                    aria-hidden
                  >
                    →
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div style={{ paddingTop: 18 }}>
          <Link href="/work" style={{ fontSize: 14, fontWeight: 500, color: "var(--accent-orange)", textDecoration: "none" }}>
            View all case studies →
          </Link>
        </div>
      </section>

      {/* ── 4. THINKING ──────────────────────────────────────── */}
      <section
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          marginTop: 120,
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px" }}>
          <p className="section-label" style={{ marginBottom: 20 }}>
            Perspectives
          </p>
          <h2
            style={{
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: 16,
              maxWidth: 720,
            }}
          >
            I approach product design as a progression of system maturity — from fragmented experiences to intelligent, adaptive systems.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "var(--fg-muted)",
              lineHeight: 1.7,
              maxWidth: 720,
              marginBottom: 40,
            }}
          >
            Fragmented → Structured → Scalable → Intelligent
          </p>

          <div style={{ paddingTop: 8, borderTop: "1px solid var(--border)" }}>
            <SystemModel />
          </div>

          <p
            style={{
              fontSize: 15,
              color: "var(--fg-muted)",
              lineHeight: 1.7,
              maxWidth: 720,
              marginTop: 40,
              paddingTop: 32,
              borderTop: "1px solid var(--border)",
            }}
          >
            My work focuses on moving products forward across this curve — designing not just interfaces, but the systems behind them.
          </p>

          <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
            <p className="section-label" style={{ marginBottom: 16, fontSize: 12 }}>
              Writing
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 720 }}>
              <div style={{ paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
                <a
                  href="https://theuxcompany.substack.com/p/design-tokens-the-connective-tissue"
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 15, color: "var(--accent-orange)", textDecoration: "none" }}
                >
                  Design tokens: the connective tissue
                </a>
                <p style={{ marginTop: 6, fontSize: 12, color: "var(--fg-subtle)" }}>The UX Company — Substack</p>
              </div>

              <div style={{ paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
                <p style={{ fontSize: 15, color: "var(--fg)", marginBottom: 0 }}>
                  Designing for Failure: How High-Risk Digital Systems Really Fail
                </p>
                <p style={{ marginTop: 6, fontSize: 12, color: "var(--fg-subtle)" }}>TechCabal (forthcoming)</p>
              </div>

              <div>
                <a
                  href="https://techcabal.com/2026/02/13/john-ohio-quick-fire/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 15, color: "var(--accent-orange)", textDecoration: "none" }}
                >
                  Quick Fire — AI, enterprise design, and product craft
                </a>
                <p style={{ marginTop: 6, fontSize: 12, color: "var(--fg-subtle)" }}>TechCabal · Feb 2026</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
            <p className="section-label" style={{ marginBottom: 16, fontSize: 12 }}>
              Talks
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 720 }}>
              <div style={{ paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
                <a
                  href="https://www.youtube.com/watch?v=9NG7TWiyIjo"
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 15, color: "var(--accent-orange)", textDecoration: "none" }}
                >
                  Design Thinking for Problem Solving: Beyond UX
                </a>
                <p style={{ marginTop: 6, fontSize: 12, color: "var(--fg-subtle)" }}>GDG Lagos — DevFest 2024</p>
              </div>

              <div>
                <a
                  href="https://www.youtube.com/watch?v=k7KGv6FYIhM&t=1549s"
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 15, color: "var(--accent-orange)", textDecoration: "none" }}
                >
                  Embedding AI into Design Systems and Product Experiences
                </a>
                <p style={{ marginTop: 6, fontSize: 12, color: "var(--fg-subtle)" }}>AIDA 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CLOSING ───────────────────────────────────────── */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 120px" }}>
        <div style={{ maxWidth: 760 }}>
          <p className="section-label" style={{ marginBottom: 24 }}>
            About
          </p>
          <p
            style={{
              fontSize: "clamp(20px, 2.8vw, 28px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
              marginBottom: 20,
            }}
          >
            Lead Product Designer — design systems, enterprise UX, and AI-enabled experiences across SaaS, fintech, and platform products.
          </p>
          <p
            style={{
              fontSize: 16,
              color: "var(--fg-muted)",
              lineHeight: 1.7,
              marginBottom: 40,
            }}
          >
            My work sits at the intersection of product design, design systems, and operational scale — helping teams move from fragmented experiences to scalable, intelligent systems.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <a
              href={mailtoHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--surface-emphasis)",
                color: "var(--fg-on-emphasis)",
                fontSize: 14,
                fontWeight: 500,
                padding: "14px 28px",
                borderRadius: 8,
                textDecoration: "none",
              }}
            >
              jon4ohio@gmail.com →
            </a>
            <Link
              href="/about"
              style={{
                fontSize: 14,
                color: "var(--fg-muted)",
                textDecoration: "none",
              }}
            >
              More about me →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
