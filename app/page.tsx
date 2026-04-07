import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";

const metrics = [
  { value: "$1M+", label: "annual savings · FetsProza" },
  { value: "27→74", label: "NPS lift · SeamlessHiring" },
  { value: "12", label: "teams aligned · Seamkit" },
  { value: "#4", label: "Product Hunt · Rivva" },
];

const capabilities = [
  {
    label: "Enterprise SaaS",
    desc: "Core workflows, governance, and adoption across multi-product platforms that need to scale without losing trust.",
  },
  {
    label: "Fintech Infrastructure",
    desc: "High-stakes transaction and operational systems shaped by reconciliation, compliance, and service reliability.",
  },
  {
    label: "Design Systems & DesignOps",
    desc: "Tokens, components, governance, and adoption programmes that hold across teams and codebases.",
  },
  {
    label: "0→1 + AI Products",
    desc: "New products and AI-native workflows where trust, clarity, and speed to learning matter.",
  },
];

const evolutionStages = [
  { stage: "01", label: "Fragmented", sub: "Where most products start" },
  { stage: "02", label: "Structured", sub: "Clear foundations, consistent workflows" },
  { stage: "03", label: "Scalable", sub: "Design and engineering unified at scale" },
  { stage: "04", label: "Intelligent", sub: "AI woven into mature systems" },
];

const featuredWork = getFeaturedProjects().slice(0, 4);

export default function Home() {
  return (
    <div style={{ paddingTop: 56 }}>

      {/* ── Hero ── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "120px 24px 80px" }}>
        <p className="animate-fade-up delay-1" style={{ fontSize: 13, fontWeight: 500, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 24 }}>
          Product Design Lead · Design Systems · Fintech Infrastructure · Enterprise AI
        </p>
        <h1
          className="animate-fade-up delay-2"
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            maxWidth: 800,
            marginBottom: 32,
          }}
        >
          I turn messy products into trusted systems.
        </h1>
        <p className="animate-fade-up delay-3" style={{ fontSize: 20, color: "#6b7280", maxWidth: 540, marginBottom: 48, lineHeight: 1.5 }}>
          Across enterprise SaaS, fintech, and 0→1 bets, I design the workflows, patterns, and operating structure teams need to scale.
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
            View selected work →
          </Link>
          <a
            href="mailto:jon4ohio@gmail.com"
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
            Get in touch
          </a>
        </div>
      </section>

      {/* ── Metrics strip ── */}
      <section style={{ borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>
        <div
          className="grid-4"
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "0 24px",
            gap: 0,
          }}
        >
          {metrics.map((m, i) => (
            <div
              key={i}
              style={{
                padding: "28px 32px",
                borderRight: i < metrics.length - 1 ? "1px solid #e5e7eb" : "none",
              }}
            >
              <p style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 4 }}>{m.value}</p>
              <p style={{ fontSize: 13, color: "#6b7280" }}>{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── What I Do ── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 24px 0" }}>
        <div style={{ maxWidth: 640 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
            What I Do
          </p>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 24 }}>
            I help products move from friction to operational clarity.
          </h2>
          <p style={{ fontSize: 17, color: "#4b5563", lineHeight: 1.7 }}>
            My work sits where UX, systems thinking, and execution meet: fixing core workflows, building shared design infrastructure, and giving teams a repeatable way to ship consistent, measurable improvements.
          </p>
        </div>
      </section>

      {/* ── System Evolution Model ── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 48 }}>
          System Evolution Model
        </p>
        <div className="grid-4" style={{ gap: 0, border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
          {evolutionStages.map((s, i) => (
            <div
              key={i}
              style={{
                padding: "32px 28px",
                borderRight: i < evolutionStages.length - 1 ? "1px solid #e5e7eb" : "none",
                position: "relative",
                background: i === 3 ? "#0a0a0a" : "#fff",
                color: i === 3 ? "#fff" : "#0a0a0a",
              }}
            >
              <p style={{ fontSize: 11, fontWeight: 500, color: i === 3 ? "rgba(255,255,255,0.4)" : "#9ca3af", marginBottom: 16, letterSpacing: "0.06em" }}>
                {s.stage}
              </p>
              <p style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 8 }}>{s.label}</p>
              <p style={{ fontSize: 13, color: i === 3 ? "rgba(255,255,255,0.6)" : "#6b7280", lineHeight: 1.5 }}>{s.sub}</p>
              {i < evolutionStages.length - 1 && (
                <span style={{ position: "absolute", right: -8, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#d1d5db", zIndex: 1 }}>
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 48 }}>
          Where I Operate
        </p>
        <div className="grid-2" style={{ gap: 16 }}>
          {capabilities.map((c, i) => (
            <div
              key={i}
              style={{
                padding: "32px",
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                transition: "border-color 0.2s",
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 12 }}>{c.label}</h3>
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Selected Work ── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 48 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Selected Work
          </p>
          <Link href="/work" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}>
            View all →
          </Link>
        </div>

        <div style={{ display: "grid", gap: 2 }}>
          {featuredWork.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="grid-work-feat"
              style={{
                gap: 24,
                padding: "28px 0",
                borderTop: "1px solid #e5e7eb",
                textDecoration: "none",
                color: "inherit",
                transition: "background 0.15s",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {p.category}
                  </span>
                  <span style={{ fontSize: 11, color: "#d1d5db" }}>·</span>
                  <span style={{ fontSize: 11, color: "#9ca3af" }}>{p.company}</span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 6 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 10 }}>{p.subtitle}</p>
                <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.6, maxWidth: 640 }}>{p.summary}</p>
              </div>
              <div className="hide-mobile" style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end", alignItems: "center" }}>
                {p.metrics.slice(0, 2).map((m, j) => (
                  <span
                    key={j}
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#0a0a0a",
                      background: "#f3f4f6",
                      padding: "4px 10px",
                      borderRadius: 6,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {m.value} <span style={{ fontWeight: 400, color: "#9ca3af" }}>{m.label}</span>
                  </span>
                ))}
                <span style={{ color: "#9ca3af", fontSize: 18 }}>→</span>
              </div>
            </Link>
          ))}
          <div style={{ borderTop: "1px solid #e5e7eb" }} />
        </div>
      </section>

      {/* ── Leadership Preview ── */}
      <section style={{ maxWidth: 1120, margin: "96px auto 0", padding: "0 24px" }}>
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
            <p style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
              Leadership & DesignOps
            </p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 600, letterSpacing: "-0.02em", color: "#fff", lineHeight: 1.2, marginBottom: 20 }}>
              Scaling design as a function.
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 32 }}>
              Led DesignOps and system adoption across 12 product teams — transforming design from execution into an operational system.
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
              View leadership work →
            </Link>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {[
              { value: "12", label: "Product teams led" },
              { value: "8", label: "Designers mentored" },
              { value: "30%", label: "Onboarding time reduced" },
              { value: "88.9", label: "System adoption score" },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10,
                  padding: "18px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{stat.label}</span>
                <span style={{ fontSize: 22, fontWeight: 600, color: "#fff", letterSpacing: "-0.02em" }}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 24px 0", textAlign: "center" }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 24 }}>
          Available for senior roles
        </p>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 24 }}>
          Let&apos;s build something that lasts.
        </h2>
        <p style={{ fontSize: 17, color: "#6b7280", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.6 }}>
          Open to Design Systems Lead, Head of Design, and senior IC roles in enterprise SaaS and fintech.
        </p>
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
