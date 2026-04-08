import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, projects, type CaseStudyBlock } from "@/lib/projects";
import AssetImage from "@/components/AssetImage";

function BlockRenderer({ block }: { block: CaseStudyBlock }) {
  if (block.kind === "callout") {
    return (
      <div style={{ border: "1px solid var(--border)", borderRadius: 14, padding: "20px 22px", background: "var(--surface)" }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 8 }}>{block.title}</p>
        <p style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.7 }}>{block.body}</p>
      </div>
    );
  }

  if (block.kind === "image") {
    return (
      <div>
        <AssetImage
          asset={block.image}
          sizes={block.layout === "wide" ? "(max-width: 900px) 92vw, 1120px" : "(max-width: 900px) 92vw, 720px"}
          treatment={block.treatment}
        />
        {block.image.caption ? (
          <p style={{ fontSize: 12, color: "var(--fg-subtle)", lineHeight: 1.6, marginTop: 10 }}>{block.image.caption}</p>
        ) : null}
      </div>
    );
  }

  // gallery
  const columns = block.columns ?? 2;
  const gridTemplateColumns = columns === 3 ? "repeat(3, 1fr)" : "repeat(2, 1fr)";
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns, gap: 12 }}>
        {block.images.map((img, idx) => (
          <div key={`${img.src}-${idx}`}>
            <AssetImage
              asset={img}
              sizes={block.layout === "wide" ? "(max-width: 900px) 44vw, 520px" : "(max-width: 900px) 44vw, 340px"}
              treatment={block.treatment}
            />
            {img.caption ? <p style={{ fontSize: 12, color: "var(--fg-subtle)", marginTop: 10 }}>{img.caption}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const url = `/work/${project.slug}`;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} — ${project.subtitle}`,
      description: project.summary,
      url,
      type: "article",
    },
  };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const next = projects[currentIndex + 1];
  const prev = projects[currentIndex - 1];

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    alternativeHeadline: project.subtitle,
    about: project.category,
    description: project.summary,
    author: {
      "@type": "Person",
      name: "John Ohio",
    },
    publisher: {
      "@type": "Person",
      name: "John Ohio",
    },
    keywords: project.tags.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Work", item: "/work" },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `/work/${project.slug}`,
      },
    ],
  };

  return (
    <div style={{ paddingTop: 56 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Breadcrumb ── */}
      <nav
        aria-label="Breadcrumb"
        style={{ maxWidth: 1120, margin: "0 auto", padding: "32px 24px 0" }}
      >
        <Link
          href="/work"
          style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}
        >
          ← Work
        </Link>
      </nav>

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
        <p style={{ fontSize: 20, color: "#6b7280", marginBottom: 16 }}>{project.subtitle}</p>
        <p style={{ fontSize: 18, color: "#374151", lineHeight: 1.7, maxWidth: 760, marginBottom: 24 }}>{project.summary}</p>

        {/* Metric pills — stacked under case study details */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 48 }}>
          {project.metrics.map((m, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: 8,
                background: "#f3f4f6",
                borderRadius: 8,
                padding: "10px 14px",
              }}
            >
              <span style={{ fontSize: 18, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.02em" }}>{m.value}</span>
              <span style={{ fontSize: 13, color: "#6b7280" }}>{m.label}</span>
            </span>
          ))}
        </div>

        {project.assets?.hero ? (
          <div style={{ marginBottom: 28 }}>
            <AssetImage asset={project.assets.hero} sizes="(max-width: 900px) 92vw, 1120px" priority />
            {project.assets.hero.caption ? (
              <p style={{ fontSize: 12, color: "var(--fg-subtle)", lineHeight: 1.6, marginTop: 10 }}>{project.assets.hero.caption}</p>
            ) : null}
          </div>
        ) : null}

        <div className="grid-2" style={{ gap: 16, marginTop: 20 }}>
          <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px 22px" }}>
            <p style={{ fontSize: 11, fontWeight: 500, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
              Role
            </p>
            <p style={{ fontSize: 15, color: "#1f2937", lineHeight: 1.65 }}>{project.role}</p>
          </div>
          <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px 22px" }}>
            <p style={{ fontSize: 11, fontWeight: 500, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
              Scope
            </p>
            <p style={{ fontSize: 15, color: "#1f2937", lineHeight: 1.65 }}>{project.scope}</p>
          </div>
        </div>
      </section>

      {/* ── Case Study Body ── */}
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 80px" }}>

        {(() => {
          const sections: { label: string; content: string }[] = [
            { label: "Context", content: project.context },
            { label: "Problem", content: project.problem },
            { label: "My Role", content: project.role },
            { label: "Approach", content: project.action },
            { label: "Outcomes", content: project.impact },
          ];
          if (project.systemEvolution) sections.push({ label: "System Evolution", content: project.systemEvolution });
          if (project.systemImpact) sections.push({ label: "System Impact", content: project.systemImpact });
          if (project.keyInsight) sections.push({ label: "Key Insight", content: project.keyInsight });
          return sections.map((section, i) => (
            <div
              key={i}
              style={{
                marginBottom: 56,
                paddingBottom: 56,
                borderBottom: i < sections.length - 1 ? "1px solid #e5e7eb" : "none",
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: "#9ca3af",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                {section.label}
              </p>
              <p
                style={{
                  fontSize: section.label === "Key Insight" ? 20 : 17,
                  fontWeight: section.label === "Key Insight" ? 500 : 400,
                  letterSpacing: section.label === "Key Insight" ? "-0.01em" : "normal",
                  lineHeight: 1.75,
                  color: "#1f2937",
                }}
              >
                {section.content}
              </p>
            </div>
          ));
        })()}

        {project.assets?.blocks?.length ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 56 }}>
            {project.assets.blocks.map((block, idx) => (
              <BlockRenderer key={idx} block={block} />
            ))}
          </div>
        ) : null}

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
