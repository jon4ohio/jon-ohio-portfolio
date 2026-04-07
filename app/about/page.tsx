export const metadata = {
  title: "About — John Ohio",
  description: "Product Design Lead with a decade of experience building systems across enterprise SaaS, fintech, and 0→1 environments.",
};

const principles = [
  {
    title: "Systems over screens",
    body: "The interface is a surface. The system is what matters — how it behaves under load, at scale, and over time.",
  },
  {
    title: "Structure reduces complexity",
    body: "Complexity is unavoidable. The job is to impose structure so teams can navigate it without friction.",
  },
  {
    title: "Decisions should compound",
    body: "Good design decisions create leverage. Patterns, tokens, and systems multiply individual decisions into organisation-wide consistency.",
  },
  {
    title: "Design must reflect operational reality",
    body: "The best design fails if it doesn't account for constraints: engineering capacity, compliance, team bandwidth, and market context.",
  },
];

const timeline = [
  { year: "2025–Now", role: "Lead, DesignOps & AI-UX", org: "SeamlessHR / SeamlesTech" },
  { year: "2024–2025", role: "Founding Designer", org: "ClearPrice" },
  { year: "2025–2026", role: "Founding Designer", org: "Rivva" },
  { year: "2022–2025", role: "Product Design Lead", org: "SeamlessHR" },
  { year: "2021–2025", role: "Lead Product Designer", org: "Fets" },
  { year: "2020–2022", role: "Senior Product Designer", org: "The UX Company" },
  { year: "Earlier", role: "Instructor & Coach", org: "Utiva" },
];

export default function About() {
  return (
    <div style={{ paddingTop: 56 }}>
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 24px 64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>

          {/* Left: Narrative */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 24 }}>
              About
            </p>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 32 }}>
              I think in systems, build in structures, and lead through clarity.
            </h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: "#374151" }}>
                I&apos;m a Product Design Lead based in Abuja, Nigeria, specialising in design systems, DesignOps, and enterprise UX. Over the past several years I&apos;ve led design across some of Africa&apos;s most complex product environments — from a 12-team SaaS platform to fintech infrastructure serving millions of users.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: "#374151" }}>
                My core thesis is simple: design at scale only works when it&apos;s systematic. Good taste isn&apos;t enough — you need shared language, governance, and a repeatable way for teams to make consistent decisions without bottlenecking on designers.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: "#374151" }}>
                That&apos;s why I built Seamkit — not as a component library, but as an operational system. A 3-layer token architecture, a CAVIS naming model, contribution pipelines, and governance rituals. It became the backbone of SeamlessHR&apos;s product organisation: 12 teams, 88.9/100 adoption score, ~80% daily usage.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: "#374151" }}>
                I&apos;ve also built on the other end of the spectrum — 0→1 founding design for Rivva (AI scheduling, #4 Product Hunt) and ClearPrice (Africa&apos;s first localised RevOps platform). Each environment demands different instincts, and I&apos;ve developed both.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: "#374151" }}>
                Currently, I&apos;m leading DesignOps and AI-UX at SeamlessTech — defining how AI surfaces decisions inside enterprise workflows. Not features. Not one-off experiments. Patterns, frameworks, and interaction models that scale.
              </p>
            </div>

            <div style={{ marginTop: 40, display: "flex", gap: 16 }}>
              <a href="mailto:jon4ohio@gmail.com" style={{ fontSize: 14, fontWeight: 500, color: "#0a0a0a", textDecoration: "none", border: "1px solid #0a0a0a", padding: "10px 20px", borderRadius: 8 }}>
                Get in touch
              </a>
              <a href="https://linkedin.com/in/jon4ohio" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, fontWeight: 500, color: "#6b7280", textDecoration: "none", border: "1px solid #e5e7eb", padding: "10px 20px", borderRadius: 8 }}>
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Right: Principles + Timeline */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 24 }}>
              How I Think
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 56 }}>
              {principles.map((p, i) => (
                <div
                  key={i}
                  style={{
                    padding: "24px 0",
                    borderTop: i === 0 ? "1px solid #e5e7eb" : "1px solid #e5e7eb",
                    borderBottom: i === principles.length - 1 ? "1px solid #e5e7eb" : "none",
                  }}
                >
                  <h3 style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>{p.body}</p>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 24 }}>
              Experience
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {timeline.map((t, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "100px 1fr",
                    gap: 16,
                    padding: "14px 0",
                    borderTop: "1px solid #e5e7eb",
                    borderBottom: i === timeline.length - 1 ? "1px solid #e5e7eb" : "none",
                  }}
                >
                  <span style={{ fontSize: 12, color: "#9ca3af", paddingTop: 2 }}>{t.year}</span>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500 }}>{t.role}</p>
                    <p style={{ fontSize: 13, color: "#6b7280" }}>{t.org}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
