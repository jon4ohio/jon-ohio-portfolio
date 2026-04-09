import Link from "next/link";

export default function Hero() {
  return (
    <section style={{ maxWidth: 1120, margin: "0 auto", padding: "120px 24px 80px" }}>
      <p
        className="animate-fade-up delay-1"
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: "var(--fg-muted)",
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
        I design product systems that evolve — from fragmented to intelligent.
      </h1>
      <p
        className="animate-fade-up delay-3"
        style={{
          fontSize: 20,
          color: "var(--fg-muted)",
          maxWidth: 600,
          marginBottom: 48,
          lineHeight: 1.5,
        }}
      >
        Product Design Lead working across enterprise SaaS, fintech infrastructure, and AI — designing systems, DesignOps, and intelligent workflows.
      </p>
      <div className="animate-fade-up delay-4 hero-cta">
        <Link
          href="/work"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "var(--fg)",
            color: "var(--bg)",
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
          href="/leadership"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "transparent",
            color: "var(--fg)",
            fontSize: 14,
            fontWeight: 500,
            padding: "12px 24px",
            borderRadius: 8,
            textDecoration: "none",
            border: "1px solid var(--border)",
            letterSpacing: "-0.01em",
          }}
        >
          Leadership & DesignOps
        </Link>
      </div>
    </section>
  );
}
