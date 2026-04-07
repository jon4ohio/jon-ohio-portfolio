import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, projects } from "@/lib/projects";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — John Ohio`,
    description: project.context,
  };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const next = projects[currentIndex + 1];
  const prev = projects[currentIndex - 1];

  return (
    <div style={{ paddingTop: 56 }}>

      {/* ── Breadcrumb ── */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "32px 24px 0" }}>
        <Link href="/work" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}>
          ← Work
        </Link>
      </div>

      {/* ── Hero ── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "48px 24px 64px" }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 500, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {project.category}
          </span>
          <span style={{ fontSize: 11, color: "#d1d5db" }}>·</span>
          <span style={{ fontSize: 11, color: "#9ca3af" }}>{project.company}</span>
          <span style={{ fontSize: 11, color: "#d1d5db" }}>·</span>
          <span style={{ fontSize: 11, color: "#9ca3af" }}>{project.period}</span>
        </div>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 16, maxWidth: 800 }}>
          {project.title}
        </h1>
        <p style={{ fontSize: 20, color: "#6b7280", marginBottom: 48 }}>{project.subtitle}</p>

        {/* Metrics */}
        <div className="grid-metrics" style={{ gridTemplateColumns: `repeat(${project.metrics.length}, 1fr)`, gap: 0, border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
          {project.metrics.map((m, i) => (
            <div
              key={i}
              style={{
                padding: "28px 24px",
                borderRight: i < project.metrics.length - 1 ? "1px solid #e5e7eb" : "none",
              }}
            >
              <p style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 6 }}>{m.value}</p>
              <p style={{ fontSize: 13, color: "#6b7280" }}>{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Case Study Body ── */}
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 80px" }}>

        {[
          { label: "Context", content: project.context },
          { label: "Problem", content: project.problem },
          { label: "Action", content: project.action },
          { label: "Impact", content: project.impact },
        ].map((section, i) => (
          <div key={i} style={{ marginBottom: 56, paddingBottom: 56, borderBottom: i < 3 ? "1px solid #e5e7eb" : "none" }}>
            <p style={{ fontSize: 11, fontWeight: 500, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
              {section.label}
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: "#1f2937" }}>{section.content}</p>
          </div>
        ))}

        {/* Tags */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {project.tags.map((t) => (
            <span key={t} style={{ fontSize: 12, color: "#6b7280", border: "1px solid #e5e7eb", padding: "4px 10px", borderRadius: 4 }}>
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ── Next / Prev ── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 80px" }}>
        <div className="grid-2" style={{ borderTop: "1px solid #e5e7eb", paddingTop: 40, gap: 24 }}>
          <div>
            {prev && (
              <Link href={`/work/${prev.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>← Previous</p>
                <p style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>{prev.title}</p>
              </Link>
            )}
          </div>
          <div className="next-item" style={{ textAlign: "right" }}>
            {next && (
              <Link href={`/work/${next.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>Next →</p>
                <p style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>{next.title}</p>
              </Link>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
