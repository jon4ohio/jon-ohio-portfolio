import type { Metadata } from "next";
import Link from "next/link";
import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";
import StickyChapterNav, { type Chapter } from "@/components/case-study/StickyChapterNav";
import RailSection from "@/components/case-study/RailSection";
import PrevNextNav from "@/components/case-study/PrevNextNav";
import PageCrumbHeader from "@/components/PageCrumbHeader";
import { getCaseStudyNeighbors } from "@/lib/projects";
import {
  anchorEvidenceColumns,
  anchorEvidenceIntro,
  anchorExplore,
  anchorHero,
  anchorMetadata,
  anchorNext,
  anchorProblem,
  anchorProductLinks,
  anchorReflection,
  anchorReversals,
  anchorShifts,
  anchorSkim,
  anchorTimeline,
} from "@/lib/anchorCaseStudyContent";

const PROSE_MAX = 640;

export const metadata: Metadata = {
  title: "Anchor",
  description: anchorHero.promise,
  alternates: { canonical: "/work/anchor" },
  openGraph: {
    title: "Anchor — Coordination Architecture Case Study",
    description: anchorHero.promise,
    url: "/work/anchor",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anchor",
    description: anchorHero.promise,
  },
};

const chapters: Chapter[] = [
  { id: "problem", label: "01 Problem" },
  { id: "shift-1", label: "02 Shift 1" },
  { id: "shift-2", label: "03 Shift 2" },
  { id: "shift-3", label: "04 Shift 3" },
  { id: "shift-4", label: "05 Shift 4" },
  { id: "shift-5", label: "06 Shift 5" },
  { id: "evidence", label: "07 Evidence" },
  { id: "reversals", label: "08 Reversals" },
  { id: "next", label: "09 Next" },
  { id: "reflection", label: "10 Reflection" },
  { id: "explore", label: "11 Explore" },
];

function Micro({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "var(--fg-subtle)",
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}

function ProseBlock({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div style={{ maxWidth: PROSE_MAX }}>
      {paragraphs.map((p) => (
        <p
          key={p.slice(0, 48)}
          style={{
            fontSize: 17,
            color: "var(--fg-body)",
            lineHeight: 1.75,
            margin: "0 0 20px",
          }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}

function ProductCard() {
  return (
    <aside
      aria-label="Product links"
      style={{
        border: "1px solid var(--border)",
        borderRadius: 12,
        background: "var(--surface)",
        padding: "18px 20px",
        maxWidth: 360,
      }}
    >
      <Micro>Product</Micro>
      <ul style={{ listStyle: "none", margin: "12px 0 0", padding: 0, display: "grid", gap: 10 }}>
        {anchorProductLinks.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 14,
                  color: "var(--fg)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: 2,
                }}
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                style={{
                  fontSize: 14,
                  color: "var(--fg)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: 2,
                }}
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default function AnchorCaseStudyPage() {
  const { prev, next } = getCaseStudyNeighbors("anchor");

  return (
    <div style={{ paddingTop: 56 }}>
      <ReadingProgressBar />
      <StickyChapterNav chapters={chapters} />

      <style>{`
        #problem,
        #shift-1,
        #shift-2,
        #shift-3,
        #shift-4,
        #shift-5,
        #evidence,
        #reversals,
        #next,
        #reflection,
        #explore {
          scroll-margin-top: 100px;
        }
        @media (max-width: 768px) {
          .case-study-chapter-nav { display: none !important; }
          #problem,
          #shift-1,
          #shift-2,
          #shift-3,
          #shift-4,
          #shift-5,
          #evidence,
          #reversals,
          #next,
          #reflection,
          #explore {
            scroll-margin-top: 64px;
          }
        }
        @media (max-width: 900px) {
          .anchor-hero-grid { grid-template-columns: 1fr !important; }
          .anchor-evidence-grid { grid-template-columns: 1fr !important; }
          .anchor-meta-row { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .anchor-meta-row { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section id="hero" style={{ maxWidth: 1240, margin: "0 auto", padding: "96px 24px 0" }}>
        <PageCrumbHeader
          backHref="/work"
          crumbs={[
            { href: "/", label: "Home" },
            { href: "/work", label: "Case Studies" },
            { label: "Anchor" },
          ]}
        />

        <p
          style={{
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--fg-subtle)",
            margin: "0 0 16px",
          }}
        >
          {anchorHero.eyebrow}
        </p>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 10px",
            borderRadius: 999,
            border: "1px solid var(--border)",
            background: "var(--surface-subtle)",
            marginBottom: 20,
          }}
        >
          <span
            aria-hidden
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--fg-muted)",
            }}
          />
          <span style={{ fontSize: 12, color: "var(--fg-muted)", lineHeight: 1.4 }}>{anchorHero.badge}</span>
        </div>

        <div
          className="anchor-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 280px",
            gap: 40,
            alignItems: "start",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                color: "var(--fg)",
                maxWidth: 820,
                marginBottom: 20,
              }}
            >
              {anchorHero.title}
            </h1>
            <p
              style={{
                fontSize: 18,
                color: "var(--fg-muted)",
                maxWidth: 720,
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {anchorHero.promise}
            </p>
          </div>
          <ProductCard />
        </div>

        <div
          className="anchor-meta-row"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 24,
            padding: "28px 0",
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            marginTop: 48,
            marginBottom: 40,
          }}
        >
          {(
            [
              ["Role", anchorMetadata.role],
              ["Duration", anchorMetadata.duration],
              ["Scope", anchorMetadata.scope],
              ["Status", anchorMetadata.status],
            ] as const
          ).map(([label, value]) => (
            <div key={label}>
              <Micro>{label}</Micro>
              <p style={{ margin: "8px 0 0", fontSize: 14, color: "var(--fg-body)", lineHeight: 1.5 }}>{value}</p>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 40, maxWidth: PROSE_MAX }}>
          <Micro>At a glance</Micro>
          <ul style={{ listStyle: "none", margin: "14px 0 0", padding: 0 }}>
            {anchorSkim.map((item) => (
              <li
                key={item.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px minmax(0, 1fr)",
                  gap: 12,
                  padding: "10px 0",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                <span style={{ fontSize: 13, color: "var(--fg-subtle)" }}>{item.label}</span>
                <span style={{ fontSize: 14, color: "var(--fg-body)", lineHeight: 1.55 }}>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: 8 }}>
          <Micro>Timeline</Micro>
          <ol
            style={{
              listStyle: "none",
              margin: "16px 0 0",
              padding: 0,
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {anchorTimeline.map((m, i) => (
              <li
                key={m.label}
                style={{
                  fontSize: 12,
                  color: "var(--fg-muted)",
                  border: "1px solid var(--border)",
                  borderRadius: 999,
                  padding: "6px 12px",
                  background: "var(--surface)",
                }}
              >
                <span style={{ color: "var(--fg-subtle)", marginRight: 6 }}>{String(i + 1).padStart(2, "0")}</span>
                {m.label}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <RailSection id="problem" eyebrow="The Problem" title={anchorProblem.title}>
        <ProseBlock paragraphs={anchorProblem.paragraphs} />
        <figure
          style={{
            margin: "28px 0 0",
            padding: 20,
            border: "1px solid var(--border)",
            borderRadius: 12,
            background: "var(--surface)",
            maxWidth: 720,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 12,
              lineHeight: 1.7,
              color: "var(--fg-body)",
            }}
          >
            <div>
              <Micro>Without</Micro>
              <pre style={{ margin: "10px 0 0", whiteSpace: "pre-wrap", font: "inherit" }}>
                {anchorProblem.diagramWithout.join("\n")}
              </pre>
            </div>
            <div>
              <Micro>With</Micro>
              <pre style={{ margin: "10px 0 0", whiteSpace: "pre-wrap", font: "inherit" }}>
                {anchorProblem.diagramWith.join("\n")}
              </pre>
            </div>
          </div>
          <figcaption style={{ marginTop: 14, fontSize: 13, color: "var(--fg-subtle)", lineHeight: 1.5 }}>
            {anchorProblem.diagramCaption}
          </figcaption>
        </figure>
      </RailSection>

      {anchorShifts.map((shift, index) => (
        <RailSection
          key={shift.eyebrow}
          id={`shift-${index + 1}`}
          eyebrow={shift.eyebrow}
          title={shift.title}
        >
          <p
            style={{
              margin: "0 0 20px",
              fontSize: 15,
              fontStyle: "italic",
              color: "var(--fg-muted)",
              lineHeight: 1.6,
              maxWidth: PROSE_MAX,
            }}
          >
            {shift.question}
          </p>
          <ProseBlock paragraphs={shift.paragraphs} />
          <div
            style={{
              marginTop: 8,
              padding: "16px 18px",
              borderLeft: "3px solid var(--border)",
              background: "var(--surface-subtle)",
              maxWidth: PROSE_MAX,
            }}
          >
            <Micro>Decision</Micro>
            <p style={{ margin: "8px 0 0", fontSize: 16, color: "var(--fg-body)", lineHeight: 1.65 }}>
              {shift.decision}
            </p>
          </div>
        </RailSection>
      ))}

      <RailSection id="evidence" eyebrow="Evidence" title="What is validated, dogfooded, and not yet claimed.">
        <p style={{ margin: "0 0 28px", fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.7, maxWidth: 720 }}>
          {anchorEvidenceIntro}
        </p>
        <div
          className="anchor-evidence-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 16,
          }}
        >
          {anchorEvidenceColumns.map((col) => (
            <div
              key={col.title}
              style={{
                border: "1px solid var(--border)",
                borderRadius: 12,
                background: "var(--surface)",
                padding: "20px 18px",
              }}
            >
              <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600, color: "var(--fg)", lineHeight: 1.35 }}>
                {col.title}
              </h3>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {col.items.map((item) => (
                  <li
                    key={item.slice(0, 40)}
                    style={{ fontSize: 14, color: "var(--fg-body)", lineHeight: 1.6, marginBottom: 10 }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </RailSection>

      <RailSection id="reversals" eyebrow="What I Got Wrong" title={anchorReversals.title}>
        <p style={{ margin: "0 0 24px", fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.7, maxWidth: PROSE_MAX }}>
          {anchorReversals.intro}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: PROSE_MAX }}>
          {anchorReversals.items.map((item) => (
            <div key={item.title}>
              <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 600, color: "var(--fg)" }}>{item.title}</h3>
              <p style={{ margin: 0, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.7 }}>{item.body}</p>
            </div>
          ))}
        </div>
        <p style={{ margin: "28px 0 0", fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.7, maxWidth: PROSE_MAX }}>
          {anchorReversals.close}
        </p>
      </RailSection>

      <RailSection id="next" eyebrow="What I’d Build Next" title={anchorNext.title}>
        <ol style={{ margin: "0 0 20px", paddingLeft: 20, maxWidth: PROSE_MAX }}>
          {anchorNext.items.map((item) => (
            <li key={item.slice(0, 40)} style={{ fontSize: 16, color: "var(--fg-body)", lineHeight: 1.7, marginBottom: 12 }}>
              {item}
            </li>
          ))}
        </ol>
        <p style={{ margin: 0, fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.7, maxWidth: PROSE_MAX }}>
          {anchorNext.close}
        </p>
      </RailSection>

      <RailSection id="reflection" eyebrow="Reflection" title="Judgment over completeness.">
        <ProseBlock paragraphs={anchorReflection} />
      </RailSection>

      <RailSection id="explore" eyebrow="Explore Anchor" title={anchorExplore.title}>
        <p style={{ margin: "0 0 24px", fontSize: 17, color: "var(--fg-body)", lineHeight: 1.7, maxWidth: PROSE_MAX }}>
          {anchorExplore.intro}
        </p>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, maxWidth: 520 }}>
          {anchorExplore.actions.map((action) => (
            <li key={action.label} style={{ marginBottom: 12 }}>
              {action.external ? (
                <a
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 16,
                    color: "var(--fg)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: 2,
                  }}
                >
                  {action.label}
                  <span aria-hidden style={{ color: "var(--fg-subtle)" }}>
                    ↗
                  </span>
                </a>
              ) : (
                <Link
                  href={action.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 16,
                    color: "var(--fg)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: 2,
                  }}
                >
                  {action.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </RailSection>

      <div style={{ paddingBottom: 80, paddingTop: 48 }}>
        <PrevNextNav prev={prev} next={next} />
      </div>
    </div>
  );
}
