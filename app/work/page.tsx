import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import ProjectListingPreview from "@/components/ProjectListingPreview";
import WorkInProgressBadge from "@/components/WorkInProgressBadge";

export const metadata: Metadata = {
  title: "Selected Systems",
  description:
    "Case studies in product systems, not isolated screens. Enterprise SaaS, fintech infrastructure, design systems, and AI-native workflows.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Selected Systems — John Ohio",
    description:
      "Case studies in product systems: SeamlessHiring, Seamkit, FetsProza, IBEDC, Rivva, Agentic Portfolio, ClearPrice and more.",
    url: "/work",
    type: "website",
  },
};

const CATEGORIES = [
  "Design Systems",
  "Structured Systems",
  "Scalable Systems",
  "Intelligent Systems",
  "0→1 Systems",
] as const;

export default function WorkIndex() {
  const grouped = CATEGORIES.reduce<Array<{ category: string; startIndex: number; projects: typeof projects }>>(
    (acc, category) => {
      const items = projects.filter((p) => p.category === category);
      if (items.length === 0) return acc;

      const startIndex = acc.length ? acc[acc.length - 1].startIndex + acc[acc.length - 1].projects.length : 0;
      acc.push({ category, startIndex, projects: items });
      return acc;
    },
    [],
  );

  return (
    <div style={{ paddingTop: 56 }}>
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 64px" }}>
        <p className="section-label" style={{ marginBottom: 20 }}>
          Case Studies
        </p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: 640, marginBottom: 20 }}>
          Building products that scale.
        </h1>
        <p style={{ fontSize: 17, color: "var(--fg-muted)", maxWidth: "min(100%, 760px)", lineHeight: 1.6 }}>
          Explore selected case studies spanning enterprise SaaS, fintech, AI, and design systems.
        </p>
      </section>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px 120px" }}>
        {grouped.map((group, groupIndex) => {
          const isFirst = groupIndex === 0;
          return (
            <section
              key={group.category}
              style={{
                paddingTop: isFirst ? 0 : 56,
              }}
              aria-label={group.category}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 16,
                  padding: "0 0 16px",
                  borderBottom: "1px solid var(--border)",
                  marginBottom: 8,
                  flexWrap: "wrap",
                }}
              >
                <h2
                  style={{
                    fontSize: "clamp(18px, 2.2vw, 22px)",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    margin: 0,
                  }}
                >
                  {group.category}
                </h2>
              </div>

              <div className="work-list-stack">
                {group.projects.map((p, i) => {
                  const itemNumber = group.startIndex + i + 1;
                  return (
                    <div key={p.slug} className="work-list-item">
                      <span className="work-list-idx">{String(itemNumber).padStart(2, "0")}</span>
                      <Link
                        href={`/work/${p.slug}`}
                        className="work-list-row"
                        aria-label={`${p.title} — ${p.subtitle}`}
                      >
                      <div className="work-list-thumb">
                        <ProjectListingPreview slug={p.slug} title={p.title} assets={p.assets} />
                      </div>

                      <div className="work-list-body">
                        <div style={{ display: "flex", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 11, color: "var(--fg-subtle)" }}>{p.company}</span>
                          <span aria-hidden="true" style={{ fontSize: 11, color: "var(--accent-orange)" }}>
                            ·
                          </span>
                          <span style={{ fontSize: 11, color: "var(--fg-subtle)" }}>{p.period}</span>
                          {p.workInProgress ? (
                            <>
                              <span aria-hidden="true" style={{ fontSize: 11, color: "var(--accent-orange)" }}>
                                ·
                              </span>
                              <WorkInProgressBadge />
                            </>
                          ) : null}
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
                          {p.title}
                        </h3>
                        <p style={{ fontSize: 14, color: "var(--fg-muted)", marginBottom: 10 }}>
                          {p.subtitle}
                        </p>

                        <p
                          style={{
                            fontSize: 14,
                            color: "var(--fg-body-muted)",
                            lineHeight: 1.65,
                            maxWidth: 720,
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            marginBottom: 12,
                          }}
                        >
                          {p.summary}
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
            </section>
          );
        })}
      </section>
    </div>
  );
}
