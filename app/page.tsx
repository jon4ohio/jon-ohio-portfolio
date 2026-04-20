import Link from "next/link";
import type { Metadata } from "next";
import { getPrimaryPreviewImage, projects } from "@/lib/projects";
import AssetImage from "@/components/AssetImage";
import Hero from "@/components/Hero";
import SelectedSystemsLogosRow from "@/components/SelectedSystemsLogosRow";
import ThinkingHomeTeaser from "@/components/ThinkingHomeTeaser";

export const metadata: Metadata = {
  title: "John Ohio — Product Design Lead",
  description:
    "Product designer and design systems lead turning complex enterprise SaaS, fintech infrastructure, and AI workflows into usable, scalable products with measurable outcomes.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "John Ohio — Product Design Lead",
    description:
      "I design high-impact products at scale — powered by systems thinking. Enterprise SaaS · Fintech infrastructure · Design systems · AI UX.",
    url: "/",
    type: "website",
  },
};

const heroMetrics: Array<{
  value: string;
  label: string;
}> = [
  { value: "$1M+", label: "Annual savings (FetsProza)" },
  { value: "↑75%", label: "User satisfaction (SeamlessHiring)" },
  { value: "↓80%", label: "Fraud reduction (IBEDC)" },
  { value: "12+", label: "Product teams onboarded (Seamkit)" },
];

const FEATURED_CASE_STUDY_SLUGS = ["seamless-hiring", "seamkit", "fetsproza", "ibedc"] as const;

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
  const featured = FEATURED_CASE_STUDY_SLUGS.map((slug) => projectMap.get(slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

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
              <p className="hero-metric-label">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. FEATURED CASE STUDIES ─────────────────────────── */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 16,
            flexWrap: "wrap",
          }}
        >
          <p className="section-label" style={{ marginBottom: 0 }}>
            Selected case studies
          </p>
          <Link href="/work" style={{ fontSize: 13, color: "var(--fg-muted)", textDecoration: "none" }}>
            View all →
          </Link>
        </div>
        <h2
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: 48,
            maxWidth: 760,
          }}
        >
          A few projects that show how I design products, systems, and platforms at scale.
        </h2>

        <div className="work-list-stack">
          {featured.map((p, i) => {
            const itemNumber = i + 1;
            const preview = getPrimaryPreviewImage(p.assets);
            return (
              <div key={p.slug} className="work-list-item">
                <span className="work-list-idx">{String(itemNumber).padStart(2, "0")}</span>
                <Link
                  href={`/work/${p.slug}`}
                  className="work-list-row"
                  aria-label={`${p.title} — ${p.subtitle}`}
                >
                  <div className="work-list-thumb">
                    {preview ? (
                      <AssetImage
                        asset={{
                          ...preview,
                          alt: preview.src.includes("/assets/work/_placeholders/")
                            ? `${p.title} — project preview`
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
                      {p.title}
                    </h3>
                    <p style={{ fontSize: 14, color: "var(--fg-muted)", marginBottom: 10 }}>{p.subtitle}</p>

                    <p
                      style={{
                        fontSize: 14,
                        color: "var(--fg-body-muted)",
                        lineHeight: 1.65,
                        maxWidth: 720,
                        marginBottom: 12,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {p.summary}
                    </p>

                    <div className="metric-badges" style={{ marginBottom: 12 }}>
                      {p.metrics.slice(0, 2).map((m, j) => (
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

      {/* ── 4. TRUSTED BY ───────────────────────────────────── */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "72px 24px 0" }}>
        <SelectedSystemsLogosRow />
      </section>

      {/* ── 4. WHAT I DO ────────────────────────────────────── */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 0" }}>
        <p className="section-label" style={{ marginBottom: 20 }}>
          How I design for scale
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
          Foundations that support growth.
        </h2>
        <p style={{ fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.7, maxWidth: 820, marginBottom: 18 }}>
          I approach product design as a system — where decisions at the component, flow, and platform level connect to long-term scalability.
        </p>
        <p style={{ fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.7, maxWidth: 820, marginBottom: 48 }}>
          From design tokens to workflow architecture, I focus on building foundations that support growth, consistency, and adaptability across products.
        </p>
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
            Operating principles.
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

      {/* ── Beyond the work: thinking, press, writing ───────── */}
      <ThinkingHomeTeaser />

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
          I design high-impact products at scale<br />— powered by systems thinking
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
