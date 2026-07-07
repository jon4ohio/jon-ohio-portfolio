import type { Metadata } from "next";
import Link from "next/link";
import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";
import StickyChapterNav, { type Chapter } from "@/components/case-study/StickyChapterNav";
import RoleMissionBrief from "@/components/case-study/RoleMissionBrief";
import EvidenceClaimBlock from "@/components/case-study/EvidenceClaimBlock";
import DesignPrinciplePanel from "@/components/case-study/DesignPrinciplePanel";
import AnnotatedFigure from "@/components/case-study/AnnotatedFigure";
import OutcomeCards from "@/components/case-study/OutcomeCards";
import PrevNextNav from "@/components/case-study/PrevNextNav";
import { projects } from "@/lib/projects";
import {
  rivvaChallengeBullets,
  rivvaChallengeClose,
  rivvaChallengeIntro,
  rivvaDecisionArchitectureSrc,
  rivvaDecisions,
  rivvaDesignInActionIntro,
  rivvaDesignPrinciple,
  rivvaEvidenceItems,
  rivvaHeroMeta,
  rivvaLearned,
  rivvaOpportunity,
  rivvaPortfolioThread,
  rivvaResultsClose,
  rivvaResultsIntro,
  rivvaResultsTiers,
  rivvaRoleClose,
  rivvaRoleIntro,
  rivvaRoleMission,
  rivvaCollaboratedOn,
  rivvaLed,
  rivvaVision,
} from "@/lib/rivvaContent";

const SECTION_PAD = "80px 24px 0";
const PROSE_MAX = 760;

export const metadata: Metadata = {
  title: "Rivva",
  description: rivvaHeroMeta.subtitle,
  alternates: { canonical: "/work/rivva" },
};

const chapters: Chapter[] = [
  { id: "opportunity", label: "01 Opportunity" },
  { id: "challenge", label: "02 Challenge" },
  { id: "role", label: "03 My Role" },
  { id: "decisions", label: "04 Decisions" },
  { id: "vision", label: "05 Vision" },
  { id: "action", label: "06 In Action" },
  { id: "results", label: "07 Results" },
  { id: "learned", label: "08 Learned" },
  { id: "principle", label: "09 Principle" },
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
        @media (max-width: 768px) {
          .case-study-chapter-nav { display: none !important; }
        }
        @media (max-width: 640px) {
          .rivva-hero-meta { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Hero — five questions in 20 seconds */}
      <section id="hero" style={{ maxWidth: 1240, margin: "0 auto", padding: "48px 24px 64px" }}>
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
          <div style={{ gridColumn: "1 / -1" }}>
            <Micro>Mission</Micro>
            <p style={{ margin: "8px 0 0", fontSize: 15, color: "var(--fg-body)", lineHeight: 1.6 }}>
              {rivvaHeroMeta.mission}
            </p>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Micro>Outcome</Micro>
            <ul style={{ margin: "8px 0 0", paddingLeft: 18, color: "var(--fg-body)", lineHeight: 1.7 }}>
              {rivvaHeroMeta.outcomes.map((o) => (
                <li key={o} style={{ fontSize: 15 }}>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 01 — The Opportunity */}
      <section id="opportunity" style={{ maxWidth: 1240, margin: "0 auto", padding: SECTION_PAD }}>
        <Micro>01 The Opportunity</Micro>
        <SectionHeading>The Opportunity</SectionHeading>
        <div style={{ marginTop: 24 }}>
          <ProseBlock paragraphs={rivvaOpportunity} />
        </div>
      </section>

      {/* 02 — The Challenge */}
      <section id="challenge" style={{ maxWidth: 1240, margin: "0 auto", padding: SECTION_PAD }}>
        <Micro>02 The Challenge</Micro>
        <SectionHeading>The Challenge</SectionHeading>
        <div style={{ marginTop: 24 }}>
          <ProseBlock paragraphs={rivvaChallengeIntro} />
          <ul style={{ margin: "0 0 20px", paddingLeft: 18, maxWidth: PROSE_MAX }}>
            {rivvaChallengeBullets.map((b) => (
              <li key={b} style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, marginBottom: 8 }}>
                {b}
              </li>
            ))}
          </ul>
          <ProseBlock paragraphs={rivvaChallengeClose} />
        </div>
      </section>

      {/* 03 — My Role */}
      <section id="role" style={{ maxWidth: 1240, margin: "0 auto", padding: SECTION_PAD }}>
        <Micro>03 My Role</Micro>
        <SectionHeading>My Role</SectionHeading>
        <div style={{ marginTop: 28 }}>
          <RoleMissionBrief
            mission={rivvaRoleMission}
            intro={rivvaRoleIntro}
            led={rivvaLed}
            collaboratedOn={rivvaCollaboratedOn}
            close={rivvaRoleClose}
          />
        </div>
      </section>

      {/* 04 — Key Design Decisions */}
      <section id="decisions" style={{ maxWidth: 1240, margin: "0 auto", padding: SECTION_PAD }}>
        <Micro>04 Key Design Decisions</Micro>
        <SectionHeading>Key Design Decisions</SectionHeading>
        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 40, maxWidth: PROSE_MAX }}>
          {rivvaDecisions.map((d, i) => (
            <div key={d.title}>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--fg)",
                  margin: "0 0 12px",
                  lineHeight: 1.4,
                }}
              >
                {i + 1}. {d.title}
              </h3>
              {d.body.map((para) => (
                <p
                  key={para}
                  style={{
                    fontSize: 16,
                    color: "var(--fg-body)",
                    lineHeight: 1.75,
                    margin: "0 0 12px",
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* 05 — From Vision to Product */}
      <section id="vision" style={{ maxWidth: 1240, margin: "0 auto", padding: SECTION_PAD }}>
        <Micro>05 From Vision to Product</Micro>
        <SectionHeading>From Vision to Product</SectionHeading>
        <div style={{ marginTop: 24 }}>
          <ProseBlock paragraphs={rivvaVision} />
        </div>
        <div style={{ marginTop: 40 }}>
          <AnnotatedFigure
            figure="A"
            label="Human–AI decision architecture"
            caption="How human intent, AI interpretation, and user confirmation form a repeatable trust loop — the behavioural framework behind Rivva's interaction model."
            imageSrc={rivvaDecisionArchitectureSrc}
            imageAlt="Human–AI decision architecture — intent, interpretation, engine, explanation, confirmation, learning"
            hideDecisionNotes
            reviewable
          />
        </div>
      </section>

      {/* 06 — Design in Action */}
      <section id="action" style={{ padding: `${SECTION_PAD.split(" ")[0]} 0 0` }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <Micro>06 Design in Action</Micro>
          <SectionHeading>Design in Action</SectionHeading>
          <p
            style={{
              marginTop: 16,
              fontSize: 17,
              color: "var(--fg-muted)",
              lineHeight: 1.75,
              maxWidth: PROSE_MAX,
              fontStyle: "italic",
            }}
          >
            {rivvaDesignInActionIntro}
          </p>
        </div>
        <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 64 }}>
          {rivvaEvidenceItems.map((item, i) => (
            <EvidenceClaimBlock
              key={item.heading}
              index={i + 1}
              heading={item.heading}
              problem={item.problem}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              caption={item.caption}
              outcome={item.outcome}
            />
          ))}
        </div>
      </section>

      {/* 07 — Results */}
      <section id="results" style={{ maxWidth: 1240, margin: "0 auto", padding: SECTION_PAD }}>
        <Micro>07 Results</Micro>
        <SectionHeading>Results</SectionHeading>
        <p style={{ marginTop: 16, fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, maxWidth: PROSE_MAX }}>
          {rivvaResultsIntro}
        </p>
        <OutcomeCards tiers={rivvaResultsTiers} />
        <p
          style={{
            marginTop: 28,
            fontSize: 17,
            color: "var(--fg-body)",
            lineHeight: 1.75,
            maxWidth: PROSE_MAX,
          }}
        >
          {rivvaResultsClose}
        </p>
      </section>

      {/* 08 — What I Learned */}
      <section id="learned" style={{ maxWidth: 1240, margin: "0 auto", padding: SECTION_PAD }}>
        <Micro>08 What I Learned</Micro>
        <SectionHeading>What I Learned</SectionHeading>
        <div style={{ marginTop: 24 }}>
          <ProseBlock paragraphs={rivvaLearned} />
          <p
            style={{
              fontSize: 17,
              color: "var(--fg-body)",
              lineHeight: 1.75,
              maxWidth: PROSE_MAX,
              margin: 0,
            }}
          >
            {rivvaPortfolioThread}
          </p>
        </div>
      </section>

      <DesignPrinciplePanel principle={rivvaDesignPrinciple} />

      <div style={{ paddingBottom: 80 }}>
        <PrevNextNav prev={prev} next={next} />
      </div>
    </div>
  );
}
