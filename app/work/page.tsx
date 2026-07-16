import type { Metadata } from "next";
import WorkListRow from "@/components/WorkListRow";
import PageCrumbHeader from "@/components/PageCrumbHeader";
import { getProject, getListableProjects, getProjectHref } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Each case study follows the same structure: the problem, the decision, the solution, the results, and what it taught me.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Case Studies — John Ohio",
    description:
      "Selected work across enterprise SaaS, fintech, AI, and design systems — SeamKit, SeamlessHiring, FetsProza, IBEDC, Rivva, and more.",
    url: "/work",
    type: "website",
  },
};

const FEATURED = [
  {
    slug: "seamkit",
    displayTitle: "SeamKit",
    description:
      "A shared design system that standardized decisions before components, now governing how 12+ product teams build across the organization.",
    metrics: [
      { value: "12+", label: "teams onboarded" },
      { value: "2.49M", label: "token insertions" },
      { value: "88.9", label: "adoption score" },
    ],
  },
  {
    slug: "seamless-hiring",
    displayTitle: "SeamlessHiring",
    description:
      "Incremental modernization of the highest-friction hiring workflows, turning an underperforming add-on into a flagship module.",
    metrics: [
      { value: "75%", label: "higher satisfaction" },
      { value: "↓50%", label: "support requests" },
      { value: "↓24%", label: "application drop-offs" },
    ],
  },
  {
    slug: "fetsproza",
    displayTitle: "FetsProza",
    companyOverride: "Fets · Nigeria",
    description:
      "The shared operating layer that unified a fragmented payment ecosystem and retired an external vendor.",
    metrics: [
      { value: "$1M+", label: "annual savings" },
      { value: "2×", label: "transaction capacity" },
    ],
  },
  {
    slug: "ibedc",
    displayTitle: "IBEDC — Unified Billing System",
    description:
      "Consumer and field payment tools for one of Nigeria's largest electricity distributors, closing the gap between billing and reality.",
    metrics: [{ value: "↓80%", label: "fraud reduction" }],
  },
  {
    slug: "rivva",
    displayTitle: "Rivva",
    description:
      "Helping Rivva prepare a validated AI beta for launch by making AI scheduling easier to understand, more consistent, and ready for everyday use.",
    metrics: [],
    coLed: true,
  },
  {
    slug: "anchor",
    displayTitle: "Anchor",
    description:
      "Anchor preserves project knowledge so humans and AI can continue work instead of reconstructing context.",
    metrics: [],
  },
] as const;

const OTHER = [
  {
    slug: "seamless-ai",
    title: "SeamlessAI",
    blurb: "AI-UX patterns and guardrails across the SeamlessHR suite · Jan 2025 – Present",
  },
  {
    slug: "workforce-ecosystem",
    title: "Workforce Ecosystem",
    blurb: "Research and capability architecture · Gates Foundation × SeamlessHR · 2025 – Present",
  },
  {
    slug: "blualliance",
    title: "BluAlliance",
    blurb: "Platform over isolated products · Gates Foundation × SeamlessHR · 2025 – Present",
  },
  {
    slug: "clearprice",
    title: "ClearPrice",
    blurb: "MVP definition and product UX as a founding member · Oct 2024 – Jul 2025",
  },
  {
    slug: "abms",
    title: "ABMS",
    blurb: "Operations and field workflows for Fets · 2022 – 2024",
  },
] as const;

export default function WorkIndex() {
  const listable = new Set(getListableProjects().map((p) => p.slug));

  const featured = FEATURED.map((item, i) => {
    const project = getProject(item.slug);
    if (!project || !listable.has(item.slug)) return null;
    return (
      <WorkListRow
        key={item.slug}
        index={String(i + 1).padStart(2, "0")}
        href={getProjectHref(item.slug)}
        title={item.displayTitle}
        company={"companyOverride" in item && item.companyOverride ? item.companyOverride : project.company}
        periodOrType={project.period}
        description={item.description}
        metrics={[...item.metrics]}
        project={project}
        variant="featured"
        badge={
          "coLed" in item && item.coLed ? (
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--accent-orange)",
                border: "1px solid var(--jop-color-violet-80, #634eca)",
                borderRadius: 999,
                padding: "2px 8px",
              }}
            >
              Co-led
            </span>
          ) : undefined
        }
      />
    );
  }).filter(Boolean);

  const other = OTHER.filter((item) => listable.has(item.slug) || getProject(item.slug)).map((item) => (
    <WorkListRow
      key={item.slug}
      href={getProjectHref(item.slug)}
      title={item.title}
      lead={item.blurb}
      variant="compact"
    />
  ));

  const agentic = getProject("orchestrated-portfolio");

  return (
    <div style={{ paddingTop: 56 }}>
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "96px 24px 0" }}>
        <PageCrumbHeader
          backHref="/"
          crumbs={[{ href: "/", label: "Home" }, { label: "Case Studies" }]}
        />
        <h1
          style={{
            fontSize: "clamp(32px, 4.4vw, 52px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            maxWidth: 820,
            marginBottom: 20,
          }}
        >
          What I&apos;ve built.
        </h1>
        <p style={{ fontSize: 17, color: "var(--fg-muted)", maxWidth: 640, lineHeight: 1.6 }}>
          Each case study follows the same structure: the problem, the decision, the solution, the results, and what
          it taught me.
        </p>
      </section>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p
          className="section-label"
          style={{ marginBottom: 0, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}
        >
          Featured Work
        </p>
        <div className="work-list-stack">{featured}</div>
      </section>

      {other.length > 0 ? (
        <section style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
          <p
            className="section-label"
            style={{ marginBottom: 0, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}
          >
            Other Work
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>{other}</div>
        </section>
      ) : null}

      {agentic && listable.has(agentic.slug) ? (
        <section style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 120px" }}>
          <p
            className="section-label"
            style={{ marginBottom: 0, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}
          >
            Experiments
          </p>
          <div className="work-list-stack" style={{ marginTop: 4 }}>
            <WorkListRow
              href={`/work/${agentic.slug}`}
              title="Agentic Portfolio"
              company="Self-directed"
              periodOrType="2026"
              description="This site, built through an orchestrated system of AI tools with every judgment call made by hand: what to build, in what order, and which tool to trust."
              project={agentic}
              variant="experiment"
            />
          </div>
        </section>
      ) : (
        <div style={{ paddingBottom: 120 }} />
      )}
    </div>
  );
}
