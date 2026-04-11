import Link from "next/link";
import type { Metadata } from "next";
import { getPrimaryPreviewImage, projects } from "@/lib/projects";
import AssetImage from "@/components/AssetImage";
import Hero from "@/components/Hero";
import SelectedSystemsLogosRow from "@/components/SelectedSystemsLogosRow";
import SystemModel from "@/components/SystemModel";

export const metadata: Metadata = {
  title: "John Ohio — Product Systems & DesignOps Lead",
  description:
    "Product Design Lead designing systems that evolve across enterprise SaaS, fintech, and AI — from fragmented to intelligent workflows. $1M+ saved annually, 12 teams aligned, 2.49M token usage.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "John Ohio — Product Systems & DesignOps Lead",
    description:
      "I design systems that evolve – from fragmented to intelligent workflows. Design systems · DesignOps · Enterprise SaaS · AI UX.",
    url: "/",
    type: "website",
  },
};

const heroMetrics = [
  { value: "$1M+", label: "Annual savings (Fets)" },
  { value: "↑75%", label: "CSAT (SeamlessHR)" },
  { value: "2.49m", label: "tokens used (Seamkit)" },
  { value: "12 teams", label: "Adoption (Seamkit)" },
  { value: "↓80%", label: "Fraud reduction (IBEDC)" },
  { value: "#4", label: "Product Hunt (Rivva)" },
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
  { label: "System Design", desc: "Restructure fragmented systems into scalable product foundations" },
  { label: "Design Systems", desc: "Build token-driven systems with governance and cross-team adoption" },
  { label: "Product Growth", desc: "Design onboarding, adoption, and PLG-driven system flows" },
  { label: "DesignOps", desc: "Operationalize design through governance, workflows, and team systems" },
  { label: "AI UX", desc: "Design assistive, explainable, and reusable AI interaction patterns" },
];

const principles = [
  "Systems over screens.",
  "Structure reduces complexity.",
  "Decisions compound over time.",
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
          padding: "8px 0 24px",
        }}
      >
        <div
          className="hero-metrics"
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          {heroMetrics.map((m) => (
            <div key={`${m.value}-${m.label}`} className="hero-metric">
              <p className="hero-metric-value">{m.value}</p>
              <p className="hero-metric-label">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      <SystemModel />

      {/* ── 3. SELECTED SYSTEMS ─────────────────────────────── */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
          <p className="section-label">
            Selected Systems
          </p>
          <Link href="/work" style={{ fontSize: 13, color: "var(--fg-muted)", textDecoration: "none" }}>
            View all →
          </Link>
        </div>
        <p style={{ fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: 520, marginBottom: 48 }}>
          Across each stage — from structure to intelligence.
        </p>

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
                  borderTop: "1px solid var(--border)",
                  borderBottom: gi === systemGroups.length - 1 ? "1px solid var(--border)" : "none",
                  alignItems: "start",
                }}
                className="grid-systems-group"
              >
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "var(--fg-subtle)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    paddingTop: 4,
                  }}
                >
                  {group.label}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {groupItems.map((p) => {
                    const preview = getPrimaryPreviewImage(p.assets);
                    return (
                    <Link
                      key={p.slug}
                      href={`/work/${p.slug}`}
                      className="system-project-link"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "block",
                        padding: "14px 8px",
                        margin: "0 -8px",
                        borderTop: "none",
                      }}
                    >
                      <div className="system-project-link__inner">
                        {preview ? (
                          <div className="system-project-thumb">
                            <AssetImage
                              asset={{
                                ...preview,
                                alt: preview.src.includes("/assets/work/_placeholders/")
                                  ? `${p.title} — project preview`
                                  : preview.alt,
                              }}
                              sizes="(max-width: 640px) 92vw, 160px"
                              aspectCover="4 / 3"
                              style={{}}
                            />
                          </div>
                        ) : null}
                        <div className="system-project-link__body">
                          <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>
                              {p.title}
                            </span>
                            <span style={{ fontSize: 13, color: "var(--fg-muted)" }}>{p.subtitle}</span>
                          </span>
                          <span style={{ display: "flex", alignItems: "center", justifyContent: p.metrics?.length ? "space-between" : "flex-end", gap: 10 }}>
                            {p.metrics?.length ? (
                              <span className="metric-badges" aria-label="Key metrics">
                                {p.metrics.slice(0, 3).map((m, mi) => (
                                  <span key={mi} className="metric-badge">
                                    <span className="metric-badge__value">{m.value}</span>
                                    <span className="metric-badge__label">{m.label}</span>
                                  </span>
                                ))}
                              </span>
                            ) : null}
                            <span style={{ fontSize: 13, color: "var(--fg-subtle)" }}>→</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <SelectedSystemsLogosRow />
      </section>

      {/* ── 4. WHAT I DO ────────────────────────────────────── */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 0" }}>
        <p className="section-label" style={{ marginBottom: 20 }}>
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
                borderTop: "1px solid var(--border)",
                borderBottom: i === capabilities.length - 1 ? "1px solid var(--border)" : "none",
                alignItems: "baseline",
              }}
              className="grid-systems-group grid-systems-group--wide"
            >
              <p style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>{c.label}</p>
              <p style={{ fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. HOW I THINK ──────────────────────────────────── */}
      <section
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px" }}>
          <p className="section-label" style={{ marginBottom: 20 }}>
            How I Think
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
                  color: "var(--fg)",
                  padding: "24px 0",
                  borderTop: "1px solid var(--border)",
                  borderBottom: i === principles.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <span style={{ fontSize: 13, color: "var(--fg-subtle)", marginRight: 16, fontWeight: 400 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 7. LEADERSHIP & DESIGNOPS TEASER ────────────────── */}
      <section style={{ maxWidth: 1240, margin: "120px auto 0", padding: "0 24px" }}>
        <div
          className="grid-2 pad-inset-wide emphasis-block"
          style={{
            background: "var(--surface-emphasis)",
            borderRadius: 16,
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--fg-on-emphasis-soft)",
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
                color: "var(--fg-on-emphasis)",
                lineHeight: 1.2,
                marginBottom: 24,
              }}
            >
              Design as a system — not a service
            </h2>
            <p style={{ fontSize: 16, color: "var(--fg-on-emphasis-muted)", lineHeight: 1.7, marginBottom: 32 }}>
              Built and scaled design systems across 12 teams — governance, contribution, onboarding, and AI UX integration
            </p>
            <Link
              href="/leadership"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--bg)",
                color: "var(--fg)",
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
              "Unified token architecture and component libraries at scale",
              "Reduced design-to-dev handoff friction across product squads",
              "Embedded AI UX patterns into the core design workflow",
            ].map((line, i) => (
              <li
                key={i}
                style={{
                  fontSize: 15,
                  color: "var(--fg-on-emphasis-strong)",
                  padding: "18px 0",
                  borderTop: "1px solid var(--border-on-emphasis-faint)",
                  borderBottom: i === 2 ? "1px solid var(--border-on-emphasis-faint)" : "none",
                }}
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 8. CURRENT FOCUS ────────────────────────────────── */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 0" }}>
        <p className="section-label" style={{ marginBottom: 20 }}>
          Current Focus
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
          Where my work is evolving.
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 0 }}>
          {currentFocus.map((line, i) => (
            <li
              key={i}
              style={{
                fontSize: 17,
                color: "var(--fg-strong)",
                padding: "20px 0",
                borderTop: "1px solid var(--border)",
                borderBottom: i === currentFocus.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              {line}
            </li>
          ))}
        </ul>
      </section>

      {/* ── 9. CLOSING ──────────────────────────────────────── */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 120px", textAlign: "center" }}>
        <p className="section-label" style={{ marginBottom: 24 }}>
          Closing
        </p>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            maxWidth: 760,
            margin: "0 auto 32px",
          }}
        >
          I design systems that evolve<br />– from fragmented to intelligent workflows
        </h2>
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
