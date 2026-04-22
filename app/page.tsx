import Link from "next/link";
import type { Metadata } from "next";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "John Ohio — Senior Product Designer",
  description:
    "Senior Product Designer specialising in systems at scale — enterprise SaaS, financial infrastructure, and AI-assisted workflows. Open to Senior / Staff IC and Lead roles globally.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "John Ohio — Senior Product Designer",
    description:
      "Product systems designer. Enterprise SaaS · Fintech infrastructure · Design systems · AI UX. Based in Nigeria, open to remote (UK/EU/US).",
    url: "/",
    type: "website",
  },
};

const heroMetrics: Array<{ value: string; label: string }> = [
  { value: "$1M+", label: "Through infrastructure redesign of a mobile money system" },
  { value: "↑75%", label: "From re-architecting enterprise HR workflows" },
  { value: "↓80%", label: "Via system-level transaction and validation redesign" },
  { value: "12+", label: "Through rollout of a unified design system (Seamkit)" },
];

const ownershipItems = [
  {
    slug: "seamkit",
    name: "Seamkit",
    type: "Design System",
    headline: "Scaled a unified product system across multiple products and teams",
    description:
      "Led the creation and rollout of a design system that aligned design and engineering across 12+ teams, improving consistency, speed, and cross-product scalability.",
  },
  {
    slug: "seamless-hiring",
    name: "SeamlessHiring",
    type: "Enterprise Product",
    headline: "Re-architected a core enterprise workflow at scale",
    description:
      "Redesigned the recruitment system used by HR teams, improving workflow efficiency and user satisfaction while introducing structured, AI-assisted decision points.",
  },
  {
    slug: "fetsproza",
    name: "FetsProza",
    type: "Financial Infrastructure",
    headline: "Designed infrastructure-level interfaces for financial systems",
    description:
      "Built a mobile money engine interface that enabled operational scale, reduced costs by over $1M annually, and simplified complex financial workflows.",
  },
  {
    slug: "ibedc",
    name: "IBEDC",
    type: "Public Infrastructure Digitisation",
    headline: "Digitised large-scale operational workflows in a critical service sector",
    description:
      "Designed tools for electricity payment and distribution workflows, reducing processing time and improving service delivery at scale.",
  },
];

const maturityStages = [
  {
    stage: "Fragmented",
    description: "Disconnected flows, inconsistent patterns, manual workarounds",
  },
  {
    stage: "Structured",
    description: "Defined patterns, improved workflows, reduced friction",
  },
  {
    stage: "Scalable",
    description: "Systems, tokens, and components enabling cross-product consistency",
  },
  {
    stage: "Intelligent",
    description: "AI-assisted workflows, automation, and adaptive user experiences",
  },
];

export default function Home() {
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
          <div
            className="hero-metrics"
            style={{ paddingTop: 32 }}
          >
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
          What I own
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
          I work at the system level — designing structures that scale across products, teams, and workflows.
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {ownershipItems.map((item, i) => (
            <div
              key={item.slug}
              style={{
                padding: "32px 0",
                borderTop: "1px solid var(--border)",
                borderBottom: i === ownershipItems.length - 1 ? "1px solid var(--border)" : "none",
              }}
              className="grid-systems-group grid-systems-group--wide"
            >
              <div>
                <p style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 4 }}>
                  {item.name}
                </p>
                <p style={{ fontSize: 12, color: "var(--fg-subtle)", lineHeight: 1.4 }}>{item.type}</p>
              </div>
              <div>
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    marginBottom: 10,
                    lineHeight: 1.35,
                  }}
                >
                  {item.headline}
                </p>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--fg-muted)",
                    lineHeight: 1.65,
                    marginBottom: 16,
                    maxWidth: 640,
                  }}
                >
                  {item.description}
                </p>
                <Link
                  href={`/work/${item.slug}`}
                  style={{ fontSize: 13, color: "var(--accent-orange)", textDecoration: "none" }}
                >
                  View case study →
                </Link>
              </div>
            </div>
          ))}
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
            How systems evolve
          </p>
          <h2
            style={{
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: 16,
              maxWidth: 680,
            }}
          >
            I approach product design as a progression of system maturity.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "var(--fg-muted)",
              lineHeight: 1.7,
              maxWidth: 640,
              marginBottom: 56,
            }}
          >
            From fragmented experiences to intelligent, adaptive systems — each stage builds on the last.
          </p>

          <div
            className="system-model-grid"
            style={{
              borderTop: "1px solid var(--border)",
              columnGap: 32,
              rowGap: 0,
              paddingTop: 32,
            }}
          >
            {maturityStages.map((s, i) => (
              <div
                key={s.stage}
                style={{ paddingBottom: 32 }}
              >
                <p
                  style={{
                    fontSize: 11,
                    color: "var(--fg-subtle)",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    marginBottom: 10,
                    lineHeight: 1.2,
                  }}
                >
                  {s.stage}
                </p>
                <p style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.65 }}>
                  {s.description}
                </p>
              </div>
            ))}
          </div>

          <p
            style={{
              fontSize: 15,
              color: "var(--fg-muted)",
              lineHeight: 1.7,
              maxWidth: 640,
              marginTop: 48,
              paddingTop: 32,
              borderTop: "1px solid var(--border)",
            }}
          >
            My work focuses on moving products forward across this curve — designing not just interfaces,
            but the systems behind them.
          </p>
        </div>
      </section>

      {/* ── 5. RANGE ─────────────────────────────────────────── */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 0" }}>
        <p className="section-label" style={{ marginBottom: 20 }}>
          Selected work and experiments
        </p>
        <h2
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: 16,
            maxWidth: 680,
          }}
        >
          Beyond core systems work.
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "var(--fg-muted)",
            lineHeight: 1.7,
            maxWidth: 580,
            marginBottom: 48,
          }}
        >
          I explore product ideas, AI-assisted workflows, and new interaction models.
        </p>

        <div
          style={{
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
          }}
          className="grid-systems-group grid-systems-group--wide"
        >
          <div style={{ padding: "32px 0" }}>
            <p style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 4 }}>
              Rivva
            </p>
            <p style={{ fontSize: 12, color: "var(--fg-subtle)", lineHeight: 1.4 }}>AI Scheduling Platform</p>
          </div>
          <div style={{ padding: "32px 0" }}>
            <p
              style={{
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                marginBottom: 10,
                lineHeight: 1.35,
              }}
            >
              Shipped and validated a product in a global market
            </p>
            <p
              style={{
                fontSize: 14,
                color: "var(--fg-muted)",
                lineHeight: 1.65,
                marginBottom: 16,
                maxWidth: 640,
              }}
            >
              Launched and reached #4 Product of the Day on Product Hunt, demonstrating product intuition,
              execution speed, and global relevance.
            </p>
            <Link
              href="/work/rivva"
              style={{ fontSize: 13, color: "var(--accent-orange)", textDecoration: "none" }}
            >
              View case study →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. CLOSING ───────────────────────────────────────── */}
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
            Senior Product Designer with experience leading systems across enterprise SaaS, fintech
            infrastructure, and platform products.
          </p>
          <p
            style={{
              fontSize: 16,
              color: "var(--fg-muted)",
              lineHeight: 1.7,
              marginBottom: 40,
            }}
          >
            My work sits at the intersection of product design, design systems, and operational scale —
            helping teams move from fragmented experiences to scalable, intelligent systems.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <a
              href="mailto:jon4ohio@gmail.com"
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
