import Link from "next/link";
import AnnotatedFigure from "@/components/case-study/AnnotatedFigure";

export type CaseHeroMetric = { value: string; label: string };

export type CaseHeroProps = {
  microLabel: string;
  title: string;
  subtitle: string;
  /** Bold narrative hook rendered before thesis (flagship case studies). */
  thesisLead?: string;
  thesis: string;
  abstract: string;
  impact: CaseHeroMetric[];
  heroImage: { src?: string; alt?: string };
};

export default function CaseHero({
  microLabel,
  title,
  subtitle,
  thesisLead,
  thesis,
  abstract,
  impact,
  heroImage,
}: CaseHeroProps) {
  return (
    <section style={{ maxWidth: 1240, margin: "0 auto", padding: "48px 24px 0" }}>
      <Link href="/work" style={{ fontSize: 13, color: "var(--fg-muted)", textDecoration: "none" }}>
        ← Work
      </Link>

      <p
        style={{
          marginTop: 32,
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--fg-muted)",
        }}
      >
        {microLabel}
      </p>

      <h1
        style={{
          marginTop: 12,
          fontSize: "clamp(34px, 4.6vw, 60px)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          color: "var(--fg)",
        }}
      >
        {title}
      </h1>

      <p style={{ marginTop: 8, fontSize: "clamp(16px, 4.2vw, 20px)", fontWeight: 400, color: "var(--fg-muted)" }}>
        {subtitle}
      </p>

      {thesisLead ? (
        <p
          style={{
            marginTop: 24,
            maxWidth: 640,
            fontSize: 20,
            lineHeight: 1.6,
            fontWeight: 600,
            color: "var(--fg-body)",
          }}
        >
          {thesisLead}
        </p>
      ) : null}

      <p
        style={{
          marginTop: thesisLead ? 16 : 24,
          maxWidth: 640,
          fontSize: 20,
          lineHeight: 1.6,
          fontWeight: 500,
          color: "var(--fg-body)",
        }}
      >
        {thesis}
      </p>

      <p
        style={{
          marginTop: 16,
          maxWidth: 600,
          fontSize: 16,
          lineHeight: 1.75,
          fontWeight: 400,
          color: "var(--fg-body)",
        }}
      >
        {abstract}
      </p>

      <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
        <div className="stats-grid stats-grid--4" style={{ background: "var(--border)" }}>
          {impact.map(({ value, label }) => (
            <div key={label} className="stats-cell" style={{ background: "var(--bg)" }}>
              <div style={{ fontSize: 35, fontWeight: 600, letterSpacing: "-0.03em", color: "var(--fg)" }}>{value}</div>
              <div style={{ fontSize: 11.5, lineHeight: 1.45, color: "var(--fg-muted)", marginTop: 8 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 48 }}>
        <AnnotatedFigure
          figure={0}
          label="Product Overview"
          caption=""
          decisionNotes={[]}
          imageSrc={heroImage.src}
          imageAlt={heroImage.alt}
          imageOnly
        />
      </div>
    </section>
  );
}

