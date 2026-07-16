import type { Metadata } from "next";
import Image from "next/image";
import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";
import StickyChapterNav, { type Chapter } from "@/components/case-study/StickyChapterNav";
import RoleMissionBrief from "@/components/case-study/RoleMissionBrief";
import RailSection from "@/components/case-study/RailSection";
import EvidenceClaimBlock from "@/components/case-study/EvidenceClaimBlock";
import DesignPrinciplePanel from "@/components/case-study/DesignPrinciplePanel";
import OutcomeCards from "@/components/case-study/OutcomeCards";
import PrevNextNav from "@/components/case-study/PrevNextNav";
import PageCrumbHeader from "@/components/PageCrumbHeader";
import { getCaseStudyNeighbors } from "@/lib/projects";
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

const PROSE_MAX = 640;

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

export default function RivvaFlagshipCaseStudy() {
  const { prev, next } = getCaseStudyNeighbors("rivva");

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

      <section id="hero" style={{ maxWidth: 1240, margin: "0 auto", padding: "96px 24px 0" }}>
        <PageCrumbHeader
          backHref="/work"
          crumbs={[
            { href: "/", label: "Home" },
            { href: "/work", label: "Case Studies" },
            { label: "Rivva · Flagship" },
          ]}
        />

        <h1
          style={{
            fontSize: "clamp(32px, 4.4vw, 52px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.12,
            color: "var(--fg)",
            maxWidth: 900,
            marginBottom: 24,
          }}
        >
          {rivvaHeroMeta.headline}
        </h1>

        <p
          style={{
            fontSize: 18,
            color: "var(--fg-muted)",
            maxWidth: 720,
            lineHeight: 1.6,
            marginBottom: 40,
          }}
        >
          {rivvaHeroMeta.subtitle}
        </p>

        <div
          className="rivva-hero-meta"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px 40px",
            padding: "24px 0",
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            marginBottom: 48,
          }}
        >
          {(
            [
              ["Role", rivvaHeroMeta.role],
              ["Timeline", rivvaHeroMeta.timeline],
              ["Model", rivvaHeroMeta.model],
              ["Outcome", rivvaHeroMeta.outcome],
            ] as const
          ).map(([label, value]) => (
            <div key={label} style={{ minWidth: 160 }}>
              <Micro>{label}</Micro>
              <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--fg-body)", lineHeight: 1.5 }}>{value}</p>
            </div>
          ))}
        </div>

        <figure style={{ margin: "0 0 20px" }}>
          <div
            style={{
              position: "relative",
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid var(--border-subtle)",
              background: "var(--surface)",
              aspectRatio: "16 / 9",
            }}
          >
            <Image
              src={rivvaHeroMeta.heroImageSrc}
              alt={rivvaHeroMeta.heroImageAlt}
              fill
              sizes="(max-width: 1240px) 100vw, 1240px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <figcaption
            style={{
              fontSize: 13,
              color: "var(--fg-subtle)",
              lineHeight: 1.6,
              marginTop: 14,
              maxWidth: 720,
            }}
          >
            {rivvaHeroMeta.heroCaption}
          </figcaption>
        </figure>
      </section>

      <RailSection id="opportunity" eyebrow="The Opportunity" title="A different idea about productivity.">
        <ProseBlock paragraphs={rivvaOpportunity} />
      </RailSection>

      <RailSection id="launch" eyebrow="Preparing for Launch" title="The beta worked. It wasn't ready.">
        <ProseBlock paragraphs={rivvaPreparingForLaunchIntro} />
        <ul style={{ margin: "0 0 20px", paddingLeft: 18, maxWidth: PROSE_MAX }}>
          {rivvaPreparingForLaunchBullets.map((b) => (
            <li key={b} style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, marginBottom: 8 }}>
              {b}
            </li>
          ))}
        </ul>
        <ProseBlock paragraphs={rivvaPreparingForLaunchClose} />
      </RailSection>

      <RailSection id="role" eyebrow="My Role" title="Complementary leadership, not competing ownership.">
        <RoleMissionBrief
          collaboration={rivvaRoleCollaboration}
          led={rivvaLed}
          collaboratedOn={rivvaWorkedCloselyOn}
          collaboratedLabel="I collaborated on"
          close={rivvaRoleClose}
        />
      </RailSection>

      <RailSection id="decisions" eyebrow="Three Product Decisions" title="The work, in three decisions.">
        <p style={{ margin: "0 0 48px", fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.7, maxWidth: 720 }}>
          Each follows the same rhythm. The problem, the work, the decision, the outcome.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
          {rivvaProductDecisions.map((d, i) => (
            <EvidenceClaimBlock
              key={d.title}
              bare
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
      </RailSection>

      <RailSection id="results" eyebrow="Results" title={rivvaResultsIntro}>
        <OutcomeCards tiers={rivvaResultsTiers} />
      </RailSection>

      <RailSection id="reflection" eyebrow="06 Reflection" title="Reflection">
        <ProseBlock paragraphs={rivvaReflection} />
      </RailSection>

      <DesignPrinciplePanel principle={rivvaDesignPrinciple} />

      <div style={{ paddingBottom: 80 }}>
        <PrevNextNav prev={prev} next={next} />
      </div>
    </div>
  );
}
