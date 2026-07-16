import Link from "next/link";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { availabilityLine, siteDescription, siteTitle } from "@/lib/sitePositioning";
import WorkListRow from "@/components/WorkListRow";
import { projects, getProjectHref } from "@/lib/projects";
import { getContactMailtoHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: siteTitle,
  description: `${siteDescription} Open to Lead / Staff IC roles globally.`,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteTitle,
    description:
      "Product Design Lead — enterprise products, design systems, AI experiences. Based in Nigeria, open to remote (UK/EU/US).",
    url: "/",
    type: "website",
  },
};

const selectedWork = [
  {
    slug: "seamkit",
    displayTitle: "SeamKit",
    company: "SeamlessHR",
    type: "Enterprise Design System",
    lead: "Helping product teams build more consistently.",
    description:
      "Created a shared design system that standardized decisions before components, governing 12+ product teams across the organization.",
    metrics: [
      { value: "12+", label: "teams onboarded" },
      { value: "2.49M", label: "token insertions" },
      { value: "88.9", label: "adoption score" },
    ],
  },
  {
    slug: "seamless-hiring",
    displayTitle: "SeamlessHiring",
    company: "SeamlessHR",
    type: "Recruitment Management System",
    lead: "Helping enterprise hiring teams work with less friction.",
    description:
      "Improved the highest-friction workflows through incremental modernization instead of a full redesign.",
    metrics: [
      { value: "75%", label: "higher satisfaction (27→74 NPS)" },
      { value: "↓50%", label: "fewer support requests" },
      { value: "↓24%", label: "fewer application drop-offs" },
    ],
  },
  {
    slug: "fetsproza",
    displayTitle: "FetsProza",
    company: "Fets",
    type: "Financial Operations Platform",
    lead: "Helping operations manage payments as one connected platform.",
    description:
      "Designed the shared operating layer instead of replacing existing systems, retiring an external vendor.",
    metrics: [
      { value: "$1M+", label: "annual savings" },
      { value: "2×", label: "transaction capacity" },
      { value: "", label: "external vendor retired" },
    ],
  },
  {
    slug: "ibedc",
    displayTitle: "IBEDC",
    company: "Fets × IBEDC",
    type: "Unified Billing System",
    lead: "Helping a utility provider close the gap between billing and reality.",
    description:
      "Designed consumer and field payment tools for one of Nigeria's largest electricity distributors, unifying billing across channels.",
    metrics: [{ value: "↓80%", label: "fraud reduction" }],
  },
] as const;

const howIWork = [
  {
    n: "01",
    title: "Understand",
    body: "Understand the product, people, and business before proposing solutions.",
  },
  {
    n: "02",
    title: "Simplify",
    body: "Reduce complexity to the decisions that matter.",
  },
  {
    n: "03",
    title: "Standardize",
    body: "Turn successful decisions into reusable patterns.",
  },
  {
    n: "04",
    title: "Scale",
    body: "Help teams build consistently through shared systems.",
  },
] as const;

const resultGroups = [
  { category: "Business", value: "$1M+", label: "annual savings" },
  { category: "Customer", value: "75%", label: "higher satisfaction" },
  { category: "Organization", value: "12+", label: "teams aligned" },
  { category: "Recognition", value: "↓80%", label: "fraud reduction" },
] as const;

const writingThemes = [
  {
    theme: "Enterprise Product Design",
    href: "/notes/design-doesnt-end-in-figma",
    title: "Design Doesn't End in Figma Anymore",
    meta: "Field note · Jul 2026",
  },
  {
    theme: "Design Systems",
    href: "https://theuxcompany.substack.com/p/design-tokens-the-connective-tissue",
    title: "Design tokens: the connective tissue",
    meta: "The UX Company · Substack",
  },
  {
    theme: "AI",
    href: "https://www.youtube.com/watch?v=k7KGv6FYIhM&t=1549s",
    title: "Embedding AI into design systems and product experiences",
    meta: "Talk · AIDA 2025",
  },
  {
    theme: "Organizational Design",
    href: "https://www.youtube.com/watch?v=9NG7TWiyIjo",
    title: "Design thinking for problem solving: beyond UX",
    meta: "Talk · GDG Lagos, DevFest 2024",
  },
] as const;

export default function Home() {
  const mailtoHref = getContactMailtoHref();
  const rivva = projects.find((p) => p.slug === "rivva");
  const anchor = projects.find((p) => p.slug === "anchor");

  return (
    <div style={{ paddingTop: 56 }}>
      <Hero />

      {/* Selected Work */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "96px 24px 0" }}>
        <p className="section-label" style={{ marginBottom: 20 }}>
          Selected Work
        </p>
        <h2
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: 48,
            maxWidth: 720,
          }}
        >
          Systems that ship, and the results they produced.
        </h2>

        <div className="work-list-stack">
          {selectedWork.map((item) => {
            const p = projects.find((project) => project.slug === item.slug);
            if (!p) return null;
            return (
              <WorkListRow
                key={item.slug}
                href={getProjectHref(item.slug)}
                title={item.displayTitle}
                company={item.company}
                periodOrType={item.type}
                lead={item.lead}
                description={item.description}
                metrics={[...item.metrics]}
                project={p}
                variant="home"
              />
            );
          })}

          {rivva ? (
            <WorkListRow
              href="/work/rivva"
              title="Rivva"
              company="Rivva"
              periodOrType="AI Scheduling Platform · Flagship"
              lead="Co-led a new product from concept to market launch."
              description="Founding team member. Product design co-led alongside the team, preparing a validated AI beta for everyday use. Strong day-one reception."
              project={rivva}
              variant="home"
            />
          ) : null}

          {anchor ? (
            <WorkListRow
              href={getProjectHref("anchor")}
              title="Anchor"
              company="Open Source"
              periodOrType="Design Engineering · Framework"
              lead="Continue instead of reconstruct."
              description="Anchor preserves project knowledge so humans and AI can continue work instead of reconstructing context."
              project={anchor}
              variant="home"
              ctaLabel="View Anchor →"
            />
          ) : null}
        </div>
        <div style={{ paddingTop: 32 }}>
          <Link
            href="/work"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--accent-orange)",
              textDecoration: "none",
            }}
          >
            View more case studies →
          </Link>
        </div>
      </section>

      {/* How I Work */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 0" }}>
        <p className="section-label" style={{ marginBottom: 20 }}>
          How I Work
        </p>
        <h2
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: 48,
            maxWidth: 720,
          }}
        >
          Understand → Simplify → Standardize → Scale
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 32,
          }}
        >
          {howIWork.map((step) => (
            <div key={step.n} style={{ borderTop: "1px solid var(--border)", paddingTop: 20 }}>
              <p style={{ fontSize: 12, color: "var(--fg-subtle)", marginBottom: 10 }}>{step.n}</p>
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8, letterSpacing: "-0.01em" }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.65 }}>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          marginTop: 120,
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "96px 24px" }}>
          <p
            className="section-label"
            style={{ marginBottom: 0, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}
          >
            Results, grouped by the value they created
          </p>
          <div className="hero-metrics" style={{ paddingTop: 40 }}>
            {resultGroups.map((m) => (
              <div key={m.category} className="hero-metric" style={{ whiteSpace: "normal" }}>
                <p
                  style={{
                    fontSize: 11,
                    color: "var(--fg-subtle)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  {m.category}
                </p>
                <p className="hero-metric-value">{m.value}</p>
                <p className="hero-metric-label">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 0" }}>
        <div style={{ maxWidth: 760 }}>
          <p className="section-label" style={{ marginBottom: 24 }}>
            About
          </p>
          <h2
            style={{
              fontSize: "clamp(22px, 2.8vw, 30px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
              marginBottom: 20,
            }}
          >
            The products changed. The work stayed the same.
          </h2>
          <p style={{ fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.7, marginBottom: 28 }}>
            Over the last five years I&apos;ve worked across enterprise HR, financial infrastructure, workforce
            technology, AI, and design systems. Although the products changed, the work remained consistent:
            understanding complex problems, simplifying them, and building systems that help products and teams
            scale. Today I work at the intersection of product design, systems thinking, and AI, helping
            organizations build products that are easier to use, easier to maintain, and easier to grow.
          </p>
          <Link href="/about" style={{ fontSize: 14, fontWeight: 500, color: "var(--accent-orange)", textDecoration: "none" }}>
            Learn more →
          </Link>
        </div>
      </section>

      {/* Writing */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 0" }}>
        <p className="section-label" style={{ marginBottom: 20 }}>
          Writing
        </p>
        <h2
          style={{
            fontSize: "clamp(22px, 2.8vw, 30px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
            marginBottom: 48,
            maxWidth: 720,
          }}
        >
          Ideas I contribute beyond delivery.
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 32,
          }}
        >
          {writingThemes.map((item) => {
            const isInternal = item.href.startsWith("/");
            const linkStyle = {
              fontSize: 15,
              color: "var(--fg)",
              lineHeight: 1.5,
              display: "block" as const,
              textDecoration: "none" as const,
            };
            return (
              <div key={item.href} style={{ borderTop: "1px solid var(--border)", paddingTop: 20 }}>
                <p
                  style={{
                    fontSize: 11,
                    color: "var(--fg-subtle)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  {item.theme}
                </p>
                {isInternal ? (
                  <Link href={item.href} style={linkStyle}>
                    {item.title}
                  </Link>
                ) : (
                  <a href={item.href} target="_blank" rel="noreferrer" style={linkStyle}>
                    {item.title}
                  </a>
                )}
                <p style={{ marginTop: 6, fontSize: 12, color: "var(--fg-subtle)" }}>{item.meta}</p>
              </div>
            );
          })}
        </div>
        <div style={{ paddingTop: 32 }}>
          <Link href="/thinking" style={{ fontSize: 14, fontWeight: 500, color: "var(--accent-orange)", textDecoration: "none" }}>
            All writing →
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 120px" }}>
        <div style={{ maxWidth: 760 }}>
          <p className="section-label" style={{ marginBottom: 24 }}>
            Contact
          </p>
          <h2
            style={{
              fontSize: "clamp(22px, 2.8vw, 30px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
              marginBottom: 20,
            }}
          >
            If your team is scaling a product, a system, or both, let&apos;s talk.
          </h2>
          <p style={{ fontSize: 13, color: "var(--fg-subtle)", lineHeight: 1.6, marginBottom: 0 }}>
            {availabilityLine}
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center", marginTop: 32 }}>
            <a
              href={mailtoHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--surface-emphasis)",
                color: "var(--fg-on-emphasis)",
                fontSize: 14,
                fontWeight: 500,
                padding: "14px 28px",
                borderRadius: 8,
                textDecoration: "none",
              }}
            >
              jon4ohio@gmail.com →
            </a>
            <a
              href="https://linkedin.com/in/jon4ohio"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 14, color: "var(--fg-muted)", textDecoration: "none" }}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
