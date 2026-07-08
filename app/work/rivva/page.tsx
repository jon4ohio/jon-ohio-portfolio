import type { Metadata } from "next";
import Link from "next/link";
import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";
import StickyChapterNav, { type Chapter } from "@/components/case-study/StickyChapterNav";
import RoleMissionBrief from "@/components/case-study/RoleMissionBrief";
import EvidenceClaimBlock from "@/components/case-study/EvidenceClaimBlock";
import DesignPrinciplePanel from "@/components/case-study/DesignPrinciplePanel";
import OutcomeCards from "@/components/case-study/OutcomeCards";
import PrevNextNav from "@/components/case-study/PrevNextNav";
import { projects } from "@/lib/projects";
import {
  rivvaDesignPrinciple,
  rivvaHeroMeta,
  rivvaLed,
  rivvaOpportunity,
  rivvaPreparingForLaunchBullets,
  rivvaPreparingForLaunchClose,
  rivvaPreparingForLaunchIntro,
  rivvaProductDecisions,
  rivvaReflection,
  rivvaResultsIntro,
  rivvaResultsTiers,
  rivvaRoleClose,
  rivvaRoleCollaboration,
  rivvaWorkedCloselyOn,
} from "@/lib/rivvaContent";

const SECTION_PAD = "80px 24px 0";
const PROSE_MAX = 760;

export const metadata: Metadata = {
  title: "Rivva",
  description: rivvaHeroMeta.subtitle,
  alternates: { canonical: "/work/rivva" },
  openGraph: {
    title: `Rivva — AI Scheduling Platform`,
    description: rivvaHeroMeta.subtitle,
    url: "/work/rivva",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rivva",
    description: rivvaHeroMeta.subtitle,
  },
};

const chapters: Chapter[] = [
  { id: "opportunity", label: "01 Opportunity" },
  { id: "launch", label: "02 Preparing for Launch" },
  { id: "role", label: "03 My Role" },
  { id: "decisions", label: "04 Decisions" },
  { id: "results", label: "05 Results" },
  { id: "reflection", label: "06 Reflection" },
  { id: "principle", label: "07 Principle" },
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
          key={p}
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        marginTop: 14,
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: "-0.02em",
        color: "var(--fg)",
      }}
    >
      {children}
    </h2>
  );
}

export default function RivvaFlagshipCaseStudy() {
  const currentIndex = projects.findIndex((p) => p.slug === "rivva");
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : undefined;
  const next = currentIndex >= 0 ? projects[currentIndex + 1] : undefined;

  return (
    <div style={{ paddingTop: 56 }}>
      <ReadingProgressBar />
      <StickyChapterNav chapters={chapters} />

      <style>{`
        #opportunity,
        #launch,
        #role,
        #decisions,
        #results,
        #reflection,
        #principle {
          scroll-margin-top: 100px;
        }
        @media (max-width: 768px) {
          .case-study-chapter-nav { display: none !important; }
          #opportunity,
          #launch,
          #role,
          #decisions,
          #results,
          #reflection,
          #principle {
            scroll-margin-top: 64px;
          }
        }
        @media (max-width: 640px) {
          .rivva-hero-meta { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section id="hero" style={{ maxWidth: 1240, margin: "0 auto", padding: "48px 24px 64px" }}>
        <Link href="/work" style={{ fontSize: 13, color: "var(--fg-muted)", textDecoration: "none" }}>
          ← Case Studies
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
          Intelligent Systems · Rivva · Nigeria · {rivvaHeroMeta.timeline}
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
          Rivva
        </h1>

        <p
          style={{
            marginTop: 16,
            fontSize: "clamp(17px, 2.2vw, 22px)",
            fontWeight: 500,
            lineHeight: 1.5,
            color: "var(--fg)",
            maxWidth: PROSE_MAX,
          }}
        >
          {rivvaHeroMeta.subtitle}
        </p>

        <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid var(--border)", maxWidth: 900 }}>
          <Micro>Impact</Micro>
          <div className="stats-grid stats-grid--4" style={{ background: "var(--border)", marginTop: 16 }}>
            {rivvaHeroMeta.impact.map(({ value, label }) => (
              <div key={label} className="stats-cell" style={{ background: "var(--bg)" }}>
                <div style={{ fontSize: 35, fontWeight: 600, letterSpacing: "-0.03em", color: "var(--fg)" }}>
                  {value}
                </div>
                <div style={{ fontSize: 11.5, lineHeight: 1.45, color: "var(--fg-muted)", marginTop: 8 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rivva-hero-meta"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 24,
            marginTop: 40,
            maxWidth: 900,
          }}
        >
          <div>
            <Micro>Role</Micro>
            <p style={{ margin: "8px 0 0", fontSize: 15, color: "var(--fg-body)", lineHeight: 1.6 }}>
              {rivvaHeroMeta.role}
            </p>
          </div>
          <div>
            <Micro>Timeline</Micro>
            <p style={{ margin: "8px 0 0", fontSize: 15, color: "var(--fg-body)", lineHeight: 1.6 }}>
              {rivvaHeroMeta.timeline}
            </p>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Micro>Team</Micro>
            <p style={{ margin: "8px 0 0", fontSize: 15, color: "var(--fg-body)", lineHeight: 1.6 }}>
              {rivvaHeroMeta.team}
            </p>
          </div>
        </div>
      </section>

      <section id="opportunity" style={{ maxWidth: 1240, margin: "0 auto", padding: SECTION_PAD }}>
        <Micro>01 The Opportunity</Micro>
        <SectionHeading>The Opportunity</SectionHeading>
        <div style={{ marginTop: 24 }}>
          <ProseBlock paragraphs={rivvaOpportunity} />
        </div>
      </section>

      <section id="launch" style={{ maxWidth: 1240, margin: "0 auto", padding: SECTION_PAD }}>
        <Micro>02 Preparing for Launch</Micro>
        <SectionHeading>Preparing for Launch</SectionHeading>
        <div style={{ marginTop: 24 }}>
          <ProseBlock paragraphs={rivvaPreparingForLaunchIntro} />
          <ul style={{ margin: "0 0 20px", paddingLeft: 18, maxWidth: PROSE_MAX }}>
            {rivvaPreparingForLaunchBullets.map((b) => (
              <li key={b} style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, marginBottom: 8 }}>
                {b}
              </li>
            ))}
          </ul>
          <ProseBlock paragraphs={rivvaPreparingForLaunchClose} />
        </div>
      </section>

      <section id="role" style={{ maxWidth: 1240, margin: "0 auto", padding: SECTION_PAD }}>
        <Micro>03 My Role</Micro>
        <SectionHeading>My Role</SectionHeading>
        <div style={{ marginTop: 28 }}>
          <RoleMissionBrief
            collaboration={rivvaRoleCollaboration}
            led={rivvaLed}
            collaboratedOn={rivvaWorkedCloselyOn}
            collaboratedLabel="I worked closely on"
            close={rivvaRoleClose}
          />
        </div>
      </section>

      <section id="decisions" style={{ padding: `${SECTION_PAD.split(" ")[0]} 0 0` }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <Micro>04 Three Product Decisions</Micro>
          <SectionHeading>Three Product Decisions</SectionHeading>
        </div>
        <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 64 }}>
          {rivvaProductDecisions.map((d, i) => (
            <EvidenceClaimBlock
              key={d.title}
              index={i + 1}
              heading={d.title}
              problem={d.problem}
              decision={d.decision}
              imageSrc={d.imageSrc}
              imageAlt={d.imageAlt}
              caption={d.caption}
              outcome={d.outcome}
            />
          ))}
        </div>
      </section>

      <section id="results" style={{ maxWidth: 1240, margin: "0 auto", padding: SECTION_PAD }}>
        <Micro>05 Results</Micro>
        <SectionHeading>Results</SectionHeading>
        <p style={{ marginTop: 16, fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, maxWidth: PROSE_MAX }}>
          {rivvaResultsIntro}
        </p>
        <OutcomeCards tiers={rivvaResultsTiers} />
      </section>

      <section id="reflection" style={{ maxWidth: 1240, margin: "0 auto", padding: SECTION_PAD }}>
        <Micro>06 Reflection</Micro>
        <SectionHeading>Reflection</SectionHeading>
        <div style={{ marginTop: 24 }}>
          <ProseBlock paragraphs={rivvaReflection} />
        </div>
      </section>

      <DesignPrinciplePanel principle={rivvaDesignPrinciple} />

      <div style={{ paddingBottom: 80 }}>
        <PrevNextNav prev={prev} next={next} />
      </div>
    </div>
  );
}
