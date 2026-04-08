import Link from "next/link";

const heroMetrics = [
  { value: "$1M+", label: "saved annually" },
  { value: "↑75%", label: "satisfaction" },
  { value: "2.49M", label: "token usage" },
  { value: "12", label: "teams scaled" },
  { value: "#4", label: "Product Hunt" },
];

export default function Hero() {
  return (
    <>
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "120px 24px 80px" }}>
        <p
          className="animate-fade-up delay-1"
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "#6b7280",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          PRODUCT DESIGN LEAD · DESIGN SYSTEMS · DESIGNOPS · AI UX
        </p>
        <h1
          className="animate-fade-up delay-2"
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            maxWidth: 880,
            marginBottom: 32,
          }}
        >
          I design product systems that scale — from fragmented to intelligent.
        </h1>
        <p
          className="animate-fade-up delay-3"
          style={{
            fontSize: 20,
            color: "#6b7280",
            maxWidth: 600,
            marginBottom: 48,
            lineHeight: 1.5,
          }}
        >
          Product Design Lead working across enterprise SaaS, fintech infrastructure, and AI — structuring complex products into scalable systems.
        </p>
        <div className="animate-fade-up delay-4" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link
            href="/work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#0a0a0a",
              color: "#fff",
              fontSize: 14,
              fontWeight: 500,
              padding: "12px 24px",
              borderRadius: 8,
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            View systems →
          </Link>
          <Link
            href="/designops"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "transparent",
              color: "#0a0a0a",
              fontSize: 14,
              fontWeight: 500,
              padding: "12px 24px",
              borderRadius: 8,
              textDecoration: "none",
              border: "1px solid #e5e7eb",
              letterSpacing: "-0.01em",
            }}
          >
            Leadership & DesignOps
          </Link>
        </div>
      </section>

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
    </>
  );
}
