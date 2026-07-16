import { notFound } from "next/navigation";
import Link from "next/link";
import { getPrimaryPreviewImage, getProject, getProjectHref, getCaseStudyNeighbors, isCaseStudyRoute, projects } from "@/lib/projects";
import AssetImage from "@/components/AssetImage";
import CaseStudyBlockRenderer from "@/components/case-study/CaseStudyBlockRenderer";
import MetadataBrief from "@/components/case-study/MetadataBrief";
import PrevNextNav from "@/components/case-study/PrevNextNav";
import ReadingProgress from "@/components/ReadingProgress";
import RelatedContent from "@/components/RelatedContent";
import WorkInProgressBadge from "@/components/WorkInProgressBadge";

export async function generateStaticParams() {
  return projects.filter((p) => isCaseStudyRoute(p.slug)).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || slug === "anchor") return {};
  const url = getProjectHref(project.slug);
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
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
    },
  };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || slug === "anchor") notFound();

  const { prev, next } = getCaseStudyNeighbors(slug);

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
      { "@type": "ListItem", position: 2, name: "Case Studies", item: "/work" },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: getProjectHref(project.slug),
      },
    ],
  };

  return (
    <div style={{ paddingTop: 56 }}>
      <ReadingProgress />
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
        style={{ maxWidth: 1240, margin: "0 auto", padding: "32px 24px 0" }}
      >
        <Link
          href="/work"
          style={{ fontSize: 13, color: "var(--fg-muted)", textDecoration: "none" }}
        >
          ← Case Studies
        </Link>
      </nav>

      {/* ── Hero ── */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "48px 24px 64px" }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 500, color: "var(--accent-orange)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {project.category}
          </span>
          <span aria-hidden="true" style={{ fontSize: 11, color: "var(--accent-orange)" }}>·</span>
          <span style={{ fontSize: 11, color: "var(--fg-subtle)" }}>{project.company}</span>
          <span aria-hidden="true" style={{ fontSize: 11, color: "var(--accent-orange)" }}>·</span>
          <span style={{ fontSize: 11, color: "var(--fg-subtle)" }}>{project.period}</span>
          {project.workInProgress ? (
            <>
              <span aria-hidden="true" style={{ fontSize: 11, color: "var(--accent-orange)" }}>·</span>
              <WorkInProgressBadge />
            </>
          ) : null}
        </div>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 16, maxWidth: 800 }}>
          {project.title}
        </h1>
        <p style={{ fontSize: 20, color: "var(--fg-muted)", marginBottom: 16 }}>{project.subtitle}</p>

        <p style={{ fontSize: 18, color: "var(--fg-body)", lineHeight: 1.7, maxWidth: 760, marginBottom: 16 }}>{project.summary}</p>

        {project.brief ? (
          <div style={{ marginTop: 40, marginBottom: 36, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
            <div className="stats-grid stats-grid--4" style={{ background: "var(--border)" }}>
              {project.metrics.map(({ value, label }) => (
                <div key={label} className="stats-cell" style={{ background: "var(--surface)" }}>
                  <div style={{ fontSize: 35, fontWeight: 600, letterSpacing: "-0.03em", color: "var(--fg)" }}>{value}</div>
                  <div style={{ fontSize: 11.5, lineHeight: 1.45, color: "var(--fg-muted)", marginTop: 8 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="metric-badges metric-badges--hero" style={{ marginBottom: 36 }}>
            {project.metrics.map((m, i) => (
              <div key={i} className="metric-badge">
                <span className="metric-badge__value">{m.value}</span>
                <span className="metric-badge__label">{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {(() => {
          const lead = getPrimaryPreviewImage(project.assets);
          if (!lead) return null;
          const alt = lead.src.includes("/assets/work/_placeholders/")
            ? `${project.title} — project preview`
            : lead.alt;
          return (
            <div style={{ marginBottom: 28 }}>
              {slug === "orchestrated-portfolio" && lead.src === "/assets/work/_placeholders/hero.svg" ? (
                <>
                  {/* TODO: Replace placeholder hero — needs real project preview image at /assets/work/orchestrated-portfolio/preview-16x9.png */}
                </>
              ) : null}
              <AssetImage
                asset={{ ...lead, alt }}
                sizes="(max-width: 900px) 92vw, 1240px"
                priority
                aspectCover="16 / 9"
                aspectFit="cover"
              />
              {lead.caption ? (
                <p style={{ fontSize: 12, color: "var(--fg-subtle)", lineHeight: 1.6, marginTop: 10 }}>{lead.caption}</p>
              ) : null}
            </div>
          );
        })()}

        {!project.brief ? (
          <div className="grid-2" style={{ gap: 16 }}>
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "20px 22px" }}>
              <p style={{ fontSize: 11, fontWeight: 500, color: "var(--fg-subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
                Role
              </p>
              <p style={{ fontSize: 15, color: "var(--fg-strong)", lineHeight: 1.65 }}>{project.role}</p>
            </div>
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "20px 22px" }}>
              <p style={{ fontSize: 11, fontWeight: 500, color: "var(--fg-subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
                Scope
              </p>
              <p style={{ fontSize: 15, color: "var(--fg-strong)", lineHeight: 1.65 }}>{project.scope}</p>
            </div>
          </div>
        ) : null}
      </section>

      {project.brief ? <MetadataBrief {...project.brief} /> : null}

      {/* ── Case Study Body ── */}
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px 80px" }}>

        {(() => {
          const sections: { label: string; content: string }[] = [
            { label: project.sectionLabels?.context ?? "Context", content: project.context },
            { label: project.sectionLabels?.problem ?? "Problem", content: project.problem },
            { label: project.sectionLabels?.action ?? "Approach", content: project.action },
            { label: project.sectionLabels?.impact ?? "Outcomes", content: project.impact },
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
                borderBottom: i < sections.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: "var(--fg-subtle)",
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
                  color: "var(--fg-strong)",
                }}
              >
                {section.content}
              </p>
            </div>
          ));
        })()}

      </section>

      {/* ── Case Study Assets ── */}
      {project.assets?.blocks?.length ? (
        <section style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px 80px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {project.assets.blocks.map((block, idx) => (
              <CaseStudyBlockRenderer key={idx} block={block} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Tags */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", gap: 6, flexWrap: "wrap" }}>
          {project.tags.map((t) => (
            <span key={t} style={{ fontSize: 12, color: "var(--accent-orange)", border: "1px solid var(--border)", padding: "4px 10px", borderRadius: 4 }}>
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ── Next / Prev ── */}
      <RelatedContent slug={slug} />
      <PrevNextNav prev={prev} next={next} />

    </div>
  );
}
