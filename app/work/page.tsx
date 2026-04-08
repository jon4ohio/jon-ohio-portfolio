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
        <p style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
          Selected Work
        </p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: 640, marginBottom: 20 }}>
          Case studies in product systems, not isolated screens.
        </h1>
        <p style={{ fontSize: 17, color: "#6b7280", maxWidth: 520, lineHeight: 1.6 }}>
          I usually come in when the workflow is broken, the platform is fragmented, or the team needs a system it can actually scale.
        </p>
      </section>

      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 120px" }}>
        <div style={{ display: "grid", gap: 2 }}>
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="grid-work-row"
              style={{
                padding: "36px 0",
                borderTop: "1px solid #e5e7eb",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500, letterSpacing: "0.04em", paddingTop: 4 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="hide-mobile" style={{ paddingTop: 6 }}>
                {p.assets?.thumbnails?.[0] ? (
                  <AssetImage
                    asset={p.assets.thumbnails[0]}
                    sizes="(max-width: 900px) 180px, 200px"
                    style={{}}
                  />
                ) : null}
              </div>
              <div>
                <div style={{ display: "flex", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {p.category}
                  </span>
                  <span style={{ fontSize: 11, color: "#d1d5db" }}>·</span>
                  <span style={{ fontSize: 11, color: "#9ca3af" }}>{p.company}</span>
                  <span style={{ fontSize: 11, color: "#d1d5db" }}>·</span>
                  <span style={{ fontSize: 11, color: "#9ca3af" }}>{p.period}</span>
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 8 }}>{p.title}</h2>
                <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 10 }}>{p.subtitle}</p>
                <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.65, maxWidth: 720, marginBottom: 16 }}>{p.summary}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                  {p.metrics.slice(0, 2).map((m, j) => (
                    <span
                      key={j}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        background: "#f3f4f6",
                        borderRadius: 6,
                        padding: "6px 10px",
                        fontSize: 12,
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span style={{ fontWeight: 600, color: "#0a0a0a", letterSpacing: "-0.01em" }}>{m.value}</span>
                      <span style={{ color: "#6b7280" }}>{m.label}</span>
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {p.tags.map((t) => (
                    <span key={t} style={{ fontSize: 11, color: "#6b7280", border: "1px solid #e5e7eb", padding: "3px 8px", borderRadius: 4 }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span style={{ fontSize: 16, color: "#9ca3af", paddingTop: 6 }}>→</span>
            </Link>
          ))}
          <div style={{ borderTop: "1px solid #e5e7eb" }} />
        </div>
      </section>
    </div>
  );
}
