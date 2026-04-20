import type { Metadata } from "next";
import CaseStudyRow from "@/components/CaseStudyRow";
import { caseStudyIndex } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Selected case studies",
  description:
    "High-signal case studies across enterprise SaaS, fintech infrastructure, and design systems — focused on product impact and measurable outcomes.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Selected case studies — John Ohio",
    description: "SeamlessHiring 2.0, Seamkit, FetsProza, IBEDC, and more — product outcomes first.",
    url: "/work",
    type: "website",
  },
};

export default function WorkIndex() {
  const orderedSlugs = ["seamless-hiring", "seamkit", "fetsproza", "ibedc"] as const;
  const indexBySlug = new Map(caseStudyIndex.map((p) => [p.slug, p]));
  const ordered = orderedSlugs.map((s) => indexBySlug.get(s)).filter(Boolean);
  const remaining = caseStudyIndex.filter((p) => !orderedSlugs.includes(p.slug as (typeof orderedSlugs)[number]));
  const orderedProjects = [...(ordered as typeof caseStudyIndex), ...remaining];

  return (
    <div style={{ paddingTop: 56 }}>
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 64px" }}>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: 640, marginBottom: 20 }}>
          Selected case studies
        </h1>
        <p style={{ fontSize: 17, color: "var(--fg-muted)", maxWidth: 820, lineHeight: 1.65 }}>
          I design products at scale — from enterprise SaaS platforms to fintech infrastructure and design systems.
          <br />
          Each case study shows how I approach complex problems, structure systems, and deliver measurable outcomes.
        </p>
      </section>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px 120px" }}>
        <div className="work-list-stack">
          {orderedProjects.map((p) => (
            <CaseStudyRow
              key={p.slug}
              title={p.title}
              subtitle={p.subtitle}
              summary={p.summary}
              metrics={p.metrics}
              role={p.role}
              href={`/work/${p.slug}`}
              image={p.cover}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
