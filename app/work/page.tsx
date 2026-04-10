import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import AssetImage from "@/components/AssetImage";

export const metadata: Metadata = {
  title: "Selected Systems",
  description:
    "Case studies in product systems, not isolated screens. Enterprise SaaS, fintech infrastructure, design systems, and AI-native workflows.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Selected Systems — John Ohio",
    description:
      "Case studies in product systems: SeamlessHiring, Seamkit, FetsProza, IBEDC, Rivva, SeamlessAI, ClearPrice and more.",
    url: "/work",
    type: "website",
  },
};

export default function WorkIndex() {
  return (
    <div style={{ paddingTop: 56 }}>
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 24px 64px" }}>
        <p className="section-label" style={{ marginBottom: 20 }}>
          Selected Work
        </p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: 640, marginBottom: 20 }}>
          Case studies in product systems, not isolated screens.
        </h1>
        <p style={{ fontSize: 17, color: "var(--fg-muted)", maxWidth: 520, lineHeight: 1.6 }}>
          I usually come in when the workflow is broken, the platform is fragmented, or the team needs a system it can actually scale.
        </p>
      </section>

      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 120px" }}>
        <div style={{ display: "grid", gap: 2 }}>
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="work-list-row"
              style={{
                padding: "36px 0",
                borderTop: "1px solid var(--border)",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <span className="work-list-idx" style={{ fontSize: 12, color: "var(--fg-subtle)", fontWeight: 500, letterSpacing: "0.04em", paddingTop: 4 }}>
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="work-list-thumb">
                {p.assets?.thumbnails?.[0] ? (
                  <AssetImage
                    asset={{
                      ...p.assets.thumbnails[0],
                      alt: p.assets.thumbnails[0].src.includes("/assets/work/_placeholders/")
                        ? `${p.title} — project preview`
                        : p.assets.thumbnails[0].alt,
                    }}
                    sizes="(max-width: 640px) 92vw, (max-width: 900px) 200px, 240px"
                    style={{}}
                  />
                ) : null}
              </div>

              <div className="work-list-body">
                <div style={{ display: "flex", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, color: "var(--accent-orange)", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {p.category}
                  </span>
                  <span aria-hidden="true" style={{ fontSize: 11, color: "var(--accent-orange)" }}>·</span>
                  <span style={{ fontSize: 11, color: "var(--fg-subtle)" }}>{p.company}</span>
                  <span aria-hidden="true" style={{ fontSize: 11, color: "var(--accent-orange)" }}>·</span>
                  <span style={{ fontSize: 11, color: "var(--fg-subtle)" }}>{p.period}</span>
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 8 }}>{p.title}</h2>
                <p style={{ fontSize: 14, color: "var(--fg-muted)", marginBottom: 10 }}>{p.subtitle}</p>

                <p style={{ fontSize: 14, color: "var(--fg-body-muted)", lineHeight: 1.65, maxWidth: 720, marginBottom: 12 }}>{p.summary}</p>

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
                    <span key={t} style={{ fontSize: 11, color: "var(--accent-orange)", border: "1px solid var(--border)", padding: "3px 8px", borderRadius: 4 }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="work-list-arrow" style={{ color: "var(--fg-subtle)", fontSize: 16, paddingTop: 4 }} aria-hidden>
                →
              </div>
            </Link>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </section>
    </div>
  );
}
