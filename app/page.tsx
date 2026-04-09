import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import Hero from "@/components/Hero";
import SystemModel from "@/components/SystemModel";

export const metadata: Metadata = {
  title: "John Ohio — Product Systems & DesignOps Lead",
  description:
    "Product Design Lead designing systems that scale across enterprise SaaS, fintech, and AI — from fragmented to intelligent. $1M+ saved annually, 12 teams aligned, 2.49M token usage.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "John Ohio — Product Systems & DesignOps Lead",
    description:
      "I design product systems that scale — from fragmented to intelligent. Design systems · DesignOps · Enterprise SaaS · AI UX.",
    url: "/",
    type: "website",
  },
};

const heroMetrics = [
  { value: "$1M+", label: "saved annually" },
  { value: "↑75%", label: "satisfaction" },
  { value: "2.49M", label: "token usage" },
  { value: "12", label: "teams scaled" },
  { value: "#4", label: "Product Hunt" },
];

const systemGroups = [
  {
    label: "Product Systems",
    slugs: ["seamless-hiring"],
  },
  {
    label: "Organizational Systems",
    slugs: ["seamkit"],
  },
  {
    label: "Operational Systems",
    slugs: ["fetsproza", "ibedc", "abms"],
  },
  {
    label: "Intelligent Systems",
    slugs: ["rivva", "seamless-ai"],
  },
  {
    label: "0→1 Systems",
    slugs: ["clearprice", "blualliance"],
  },
];

const capabilities = [
  { label: "System Design", desc: "Restructuring fragmented products into scalable systems." },
  { label: "Design Systems", desc: "Token architecture, governance, and contribution pipelines." },
  { label: "Product Growth", desc: "Adoption, onboarding, and self-service for PLG transitions." },
  { label: "DesignOps", desc: "Operationalising design as a function across teams." },
  { label: "AI UX", desc: "Trust, explainability, and reusable AI patterns inside enterprise workflows." },
];

const principles = [
  "Systems over screens.",
  "Structure reduces complexity.",
  "Decisions should compound.",
  "Design must reflect operational reality.",
];

const currentFocus = [
  "AI-integrated enterprise systems",
  "Product-led growth transformation",
  "DesignOps and organizational scale",
];

export default function Home() {
  const projectMap = new Map(projects.map((p) => [p.slug, p]));

  return (
    <div style={{ paddingTop: 56 }}>

      <Hero />

      <section
        aria-label="Career metrics"
        style={{
          borderTop: "1px solid #e5e7eb",
          borderBottom: "1px solid #e5e7eb",
          background: "#f9fafb",
        }}
      >
        <div
          className="hero-metrics"
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          {heroMetrics.map((m) => (
            <div key={m.value} className="hero-metric">
              <p
                style={{
                  fontSize: 26,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  marginBottom: 4,
                }}
              >
                {m.value}
              </p>
              <p style={{ fontSize: 13, color: "#6b7280" }}>{m.label}</p>
            </div>
          ))}
          <div className="hero-metric hero-metric--filler" aria-hidden="true" />
        </div>
      </section>

      <SystemModel />

      {/* ── 3. SELECTED SYSTEMS ─────────────────────────────── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "120px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 12 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "#6b7280",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Selected Systems
          </p>
          <Link href="/work" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}>
            View all →
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {systemGroups.map((group, gi) => {
            const groupItems = group.slugs
              .map((s) => projectMap.get(s))
              .filter((p): p is NonNullable<typeof p> => Boolean(p));
            if (groupItems.length === 0) return null;
            return (
              <div
                key={group.label}
                style={{
                  padding: "32px 0",
                  borderTop: "1px solid #e5e7eb",
                  borderBottom: gi === systemGroups.length - 1 ? "1px solid #e5e7eb" : "none",
                  alignItems: "start",
                }}
                className="grid-systems-group"
              >
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#9ca3af",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    paddingTop: 4,
                  }}
                >
                  {group.label}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {groupItems.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/work/${p.slug}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        gap: 16,
                        flexWrap: "wrap",
                      }}
                    >
                      <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>
                          {p.title}
                        </span>
                        <span style={{ fontSize: 13, color: "#6b7280" }}>{p.subtitle}</span>
                      </span>
                      <span style={{ fontSize: 13, color: "#9ca3af" }}>→</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 4. WHAT I DO ────────────────────────────────────── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "120px 24px 0" }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: "#6b7280",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          What I Do
        </p>
        <h2
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: 48,
            maxWidth: 640,
          }}
        >
          System-level capabilities.
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {capabilities.map((c, i) => (
            <div
              key={c.label}
              style={{
                padding: "24px 0",
                borderTop: "1px solid #e5e7eb",
                borderBottom: i === capabilities.length - 1 ? "1px solid #e5e7eb" : "none",
                alignItems: "baseline",
              }}
              className="grid-systems-group grid-systems-group--wide"
            >
              <p style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>{c.label}</p>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. HOW I THINK ──────────────────────────────────── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "120px 24px 0" }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: "#6b7280",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          How I Think
        </p>
        <h2
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: 40,
            maxWidth: 640,
          }}
        >
          Four operating principles.
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 0 }}>
          {principles.map((p, i) => (
            <li
              key={i}
              style={{
                fontSize: "clamp(20px, 2.4vw, 28px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "#0a0a0a",
                padding: "24px 0",
                borderTop: "1px solid #e5e7eb",
                borderBottom: i === principles.length - 1 ? "1px solid #e5e7eb" : "none",
              }}
            >
              <span style={{ fontSize: 13, color: "#9ca3af", marginRight: 16, fontWeight: 400 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {p}
            </li>
          ))}
        </ul>
      </section>

      {/* ── 7. LEADERSHIP & DESIGNOPS TEASER ────────────────── */}
      <section style={{ maxWidth: 1120, margin: "120px auto 0", padding: "0 24px" }}>
        <div
          className="grid-2 pad-inset-wide"
          style={{
            background: "#0a0a0a",
            borderRadius: 16,
            gap: 64,
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Leadership & DesignOps
            </p>
            <h2
              style={{
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "#fff",
                lineHeight: 1.2,
                marginBottom: 24,
              }}
            >
              Scaling design as a system, not a service.
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 32 }}>
              Operationalising design across the product organisation — governance, contribution, onboarding, capability, and AI-UX layer.
            </p>
            <Link
              href="/leadership"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#fff",
                color: "#0a0a0a",
                fontSize: 14,
                fontWeight: 500,
                padding: "12px 24px",
                borderRadius: 8,
                textDecoration: "none",
              }}
            >
              View Leadership & DesignOps →
            </Link>
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            {[
              "Built and scaled a design system across 12 teams",
              "Defined governance, contribution, and delivery workflows",
              "Established onboarding, critique, and capability systems",
            ].map((line, i) => (
              <li
                key={i}
                style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.85)",
                  padding: "18px 0",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  borderBottom: i === 2 ? "1px solid rgba(255,255,255,0.1)" : "none",
                }}
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 8. CURRENT FOCUS ────────────────────────────────── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "120px 24px 0" }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: "#6b7280",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Current Focus
        </p>
        <h2
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: 40,
            maxWidth: 640,
          }}
        >
          Where my work lives now.
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 0 }}>
          {currentFocus.map((line, i) => (
            <li
              key={i}
              style={{
                fontSize: 17,
                color: "#1f2937",
                padding: "20px 0",
                borderTop: "1px solid #e5e7eb",
                borderBottom: i === currentFocus.length - 1 ? "1px solid #e5e7eb" : "none",
              }}
            >
              {line}
            </li>
          ))}
        </ul>
      </section>

      {/* ── 9. CLOSING ──────────────────────────────────────── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "120px 24px 0", textAlign: "center" }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: "#6b7280",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Closing
        </p>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            marginBottom: 32,
            maxWidth: 760,
            margin: "0 auto 32px",
          }}
        >
          I design systems that evolve — from fragmented to intelligent.
        </h2>
        <a
          href="mailto:jon4ohio@gmail.com"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#0a0a0a",
            color: "#fff",
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
