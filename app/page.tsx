import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import Hero from "@/components/Hero";
import SystemModel from "@/components/SystemModel";

export const metadata: Metadata = {
  title: "John Ohio — Product Designer",
  description:
    "Product Designer focused on systems, scale, and intelligent experiences — spanning enterprise SaaS, financial infrastructure, and AI-assisted workflows.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "John Ohio — Product Designer",
    description:
      "Product Designer focused on systems, scale, and intelligent experiences. Enterprise SaaS · Financial infrastructure · AI-assisted workflows.",
    url: "/",
    type: "website",
  },
};

const heroMetrics: Array<{
  value: string;
  label: string;
}> = [
  { value: "$1M+ saved", label: "Through infrastructure redesign of a mobile money system" },
  { value: "↑75% user satisfaction", label: "From re-architecting enterprise HR workflows" },
  { value: "↓80% fraud incidents", label: "Via system-level transaction and validation redesign" },
  { value: "12+ teams onboarded", label: "Through rollout of a unified design system (Seamkit)" },
];

const OWNERSHIP_SLUGS = ["seamkit", "seamless-hiring", "fetsproza", "ibedc"] as const;
const RANGE_SLUG = "rivva" as const;

const ownershipBlurbBySlug: Record<(typeof OWNERSHIP_SLUGS)[number], { title: string; body: string }> = {
  seamkit: {
    title: "Seamkit — Design System",
    body:
      "Led the creation and rollout of a design system that aligned design and engineering across 12+ teams, improving consistency, speed, and cross-product scalability.",
  },
  "seamless-hiring": {
    title: "SeamlessHiring — Enterprise Product",
    body:
      "Redesigned the recruitment system used by HR teams, improving workflow efficiency and user satisfaction while introducing structured, AI-assisted decision points.",
  },
  fetsproza: {
    title: "FetsProza — Financial Infrastructure",
    body:
      "Built a mobile money engine interface that enabled operational scale, reduced costs by over $1M annually, and simplified complex financial workflows.",
  },
  ibedc: {
    title: "IBEDC — Public Infrastructure Digitisation",
    body:
      "Designed tools for electricity payment and distribution workflows, reducing processing time and improving service delivery at scale.",
  },
};

export default function Home() {
  const projectMap = new Map(projects.map((p) => [p.slug, p]));
  const owned = OWNERSHIP_SLUGS.map((slug) => projectMap.get(slug)).filter((p) => Boolean(p));
  const rivva = projectMap.get(RANGE_SLUG);

  return (
    <div style={{ paddingTop: 56 }}>
      {/* 1. HERO */}
      <Hero />

      {/* 2. IMPACT */}
      <section aria-label="Impact" style={{ padding: "8px 0 24px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <p className="section-label" style={{ marginBottom: 14 }}>
            Impact across products, systems, and operations
          </p>
        </div>
        <div className="hero-metrics" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          {heroMetrics.map((m) => (
            <div key={`${m.value}-${m.label}`} className="hero-metric">
              <p className="hero-metric-value">{m.value}</p>
              <p className="hero-metric-label">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. OWNERSHIP */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 0" }}>
        <p className="section-label" style={{ marginBottom: 12 }}>
          What I own
        </p>
        <h2
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: 12,
            maxWidth: 760,
          }}
        >
          I work at the system level — designing structures that scale across products, teams, and workflows.
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 28 }}>
          {owned.map((p, i) => {
            if (!p) return null;
            const rowNumber = String(i + 1).padStart(2, "0");
            const blurb = ownershipBlurbBySlug[p.slug as (typeof OWNERSHIP_SLUGS)[number]];
            return (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 24,
                  padding: "22px 0",
                  borderTop: "1px solid var(--border)",
                  textDecoration: "none",
                  color: "inherit",
                }}
                aria-label={`${blurb?.title ?? p.title} case study`}
              >
                <span style={{ fontSize: 12, color: "var(--fg-subtle)", fontWeight: 500, letterSpacing: "0.04em" }}>
                  {rowNumber}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 8 }}>
                    {blurb?.title ?? p.title}
                  </p>
                  <p style={{ fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: 860 }}>
                    {blurb?.body ?? p.summary}
                  </p>
                </div>
                <span style={{ fontSize: 13, color: "var(--fg-subtle)", flexShrink: 0 }} aria-hidden>
                  →
                </span>
              </Link>
            );
          })}
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 18 }}>
            <Link href="/work" style={{ fontSize: 14, fontWeight: 500, color: "var(--accent-orange)", textDecoration: "none" }}>
              View all case studies →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. THINKING */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 0" }}>
        <p className="section-label" style={{ marginBottom: 12 }}>
          How systems evolve
        </p>
        <h2
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: 12,
            maxWidth: 760,
          }}
        >
          I approach product design as a progression of system maturity — from fragmented experiences to intelligent, adaptive systems.
        </h2>
        <p style={{ fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.7, maxWidth: 860, marginBottom: 28 }}>
          Fragmented → Structured → Scalable → Intelligent
        </p>

        <div style={{ padding: "22px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <SystemModel />
        </div>

        <p style={{ fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.7, maxWidth: 920, marginTop: 28 }}>
          My work focuses on moving products forward across this curve — designing not just interfaces, but the systems behind them.
        </p>
      </section>

      {/* 5. RANGE */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 0" }}>
        <p className="section-label" style={{ marginBottom: 12 }}>
          Selected work and experiments
        </p>
        <h2
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: 12,
            maxWidth: 760,
          }}
        >
          Beyond core systems work, I explore product ideas, AI-assisted workflows, and new interaction models.
        </h2>

        {rivva ? (
          <Link
            href={`/work/${rivva.slug}`}
            style={{
              display: "block",
              marginTop: 28,
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "24px",
              textDecoration: "none",
              color: "inherit",
              background: "var(--surface)",
            }}
            aria-label="Rivva case study"
          >
            <p style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 8 }}>
              Rivva
            </p>
            <p style={{ fontSize: 14, color: "var(--fg-muted)", marginBottom: 12 }}>
              Shipped and validated a product in a global market
            </p>
            <p style={{ fontSize: 15, color: "var(--fg-body-muted)", lineHeight: 1.65, maxWidth: 860, marginBottom: 14 }}>
              Launched and reached #4 Product of the Day on Product Hunt, demonstrating product intuition, execution speed, and global relevance.
            </p>
            <div className="metric-badges">
              {rivva.metrics.slice(0, 3).map((m, idx) => (
                <div key={`${m.value}-${m.label}-${idx}`} className="metric-badge">
                  <span className="metric-badge__value">{m.value}</span>
                  <span className="metric-badge__label">{m.label}</span>
                </div>
              ))}
            </div>
          </Link>
        ) : null}
      </section>

      {/* 6. CLOSING */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 120px", textAlign: "center" }}>
        <p className="section-label" style={{ marginBottom: 16 }}>
          About
        </p>
        <p
          style={{
            fontSize: "clamp(18px, 2.1vw, 22px)",
            lineHeight: 1.7,
            color: "var(--fg-muted)",
            maxWidth: 860,
            margin: "0 auto 28px",
          }}
        >
          Senior Product Designer with experience leading systems across enterprise SaaS, fintech infrastructure, and platform products. My work sits at the intersection of product design, design systems, and operational scale — helping teams move from fragmented experiences to scalable, intelligent systems.
        </p>
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
      </section>

    </div>
  );
}
