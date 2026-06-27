import type { Metadata } from "next";
import type { CSSProperties } from "react";
import AssetImage from "@/components/AssetImage";
import {
  aboutBodyBlocks,
  aboutCredibilityLine,
  aboutHeadline,
  aboutHookBlocks,
  aboutTimeline,
  operatingPrinciples,
  operatingPrinciplesLabel,
  type NarrativeBlock,
} from "@/lib/aboutNarrative";
import { positioningLine } from "@/lib/sitePositioning";
import {
  communityCards,
  communityPullQuote,
  communitySectionTitle,
} from "@/lib/communityContribution";
import AboutPressStrip from "@/components/AboutPressStrip";
import { getContactMailtoHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "About",
  description:
    "John Ohio — Lead Product Designer. Design systems, enterprise UX, AI-enabled experiences. Speaker, writer, and mentor.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About",
    description:
      "Lead Product Designer — design systems, enterprise UX, and AI-enabled product experiences.",
    url: "/about",
    type: "profile",
  },
};

const bodyStyle: CSSProperties = {
  fontSize: 17,
  lineHeight: 1.75,
  color: "var(--fg-body)",
};

/** Vertical rhythm between major bands (matches hook→body scale). */
const sectionGap = "clamp(48px, 8vw, 64px)";
const sectionGapAfterNarrative = "clamp(56px, 10vw, 80px)";

/** Intro illustration — beside the About Me narrative on desktop, stacked below on mobile. */
const aboutIllustration = {
  src: "/assets/about/intro-illustration.jpg",
  alt: "Illustrated portrait of John Ohio — product designer and design leader — surrounded by his tools, values, current mission, and selected projects (SeamlessHR, SeamKit, ClearPrice).",
  width: 1028,
  height: 1120,
} as const;

function renderNarrativeBlock(block: NarrativeBlock, i: number) {
  if (block.kind === "paragraph") {
    return (
      <p key={i} style={bodyStyle}>
        {block.text}
      </p>
    );
  }
  if (block.kind === "lead") {
    return (
      <p key={i} style={{ ...bodyStyle, fontWeight: 600, color: "var(--fg-body)" }}>
        {block.text}
      </p>
    );
  }
  return (
    <p key={i} style={{ ...bodyStyle, fontWeight: 500, color: "var(--fg-strong)" }}>
      {block.text}
    </p>
  );
}

export default function About() {
  const mailtoHref = getContactMailtoHref();
  return (
    <div style={{ paddingTop: 56 }}>
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "clamp(56px, 12vw, 80px) clamp(20px, 4vw, 24px) clamp(80px, 14vw, 120px)",
        }}
      >
        {/* About Me — 60% narrative left, 40% intro illustration right (stacks below on mobile) */}
        <div className="about-intro-grid" style={{ alignItems: "start" }}>
          {/* Left: hook + body narrative + CTAs */}
          <div style={{ minWidth: 0 }}>
            <p className="section-label" style={{ marginBottom: 24 }}>
              About Me
            </p>
            <h1
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: 20,
              }}
            >
              {aboutHeadline}
            </h1>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: "var(--fg-muted)",
                marginBottom: 16,
                maxWidth: 640,
              }}
            >
              {positioningLine}
            </p>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.65,
                color: "var(--fg-body)",
                marginBottom: 32,
                maxWidth: 640,
              }}
            >
              {aboutCredibilityLine}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(20px, 3vw, 28px)",
              }}
            >
              {aboutHookBlocks.map((block, i) => renderNarrativeBlock(block, i))}
            </div>

            <div style={{ marginTop: sectionGap }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(20px, 3vw, 28px)",
                }}
              >
                {aboutBodyBlocks.map((block, i) => renderNarrativeBlock(block, i))}
              </div>

              <div style={{ marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap" }}>
                <a
                  href={mailtoHref}
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "var(--fg)",
                    textDecoration: "none",
                    border: "1px solid var(--fg)",
                    padding: "10px 20px",
                    borderRadius: 8,
                  }}
                >
                  Get in touch
                </a>
                <a
                  href="https://linkedin.com/in/jon4ohio"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "var(--fg-muted)",
                    textDecoration: "none",
                    border: "1px solid var(--border)",
                    padding: "10px 20px",
                    borderRadius: 8,
                  }}
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right: intro illustration + caption (sticky on desktop) */}
          <div style={{ minWidth: 0 }}>
            <figure style={{ margin: 0, position: "sticky", top: 80 }}>
              <AssetImage
                asset={aboutIllustration}
                sizes="(max-width: 640px) 100vw, (max-width: 900px) 92vw, 460px"
                priority
              />
              <figcaption
                style={{
                  marginTop: 12,
                  fontSize: 12,
                  lineHeight: 1.5,
                  color: "var(--fg-subtle)",
                  fontStyle: "italic",
                }}
              >
                A fun experiment imagining what an illustrator might capture after observing my work,
                thoughts, habits, and design philosophy over the years.
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Experience */}
        <div style={{ marginTop: sectionGapAfterNarrative }}>
          <p className="section-label" style={{ marginBottom: 24 }}>
            Experience
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {aboutTimeline.map((t, i) => (
              <div
                key={`${t.year}-${t.org}-${i}`}
                className="about-timeline-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(96px, 110px) 1fr",
                  gap: 16,
                  padding: "14px 0",
                  borderTop: "1px solid var(--border)",
                  borderBottom: i === aboutTimeline.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <span style={{ fontSize: 12, color: "var(--fg-subtle)", paddingTop: 2 }}>{t.year}</span>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 500 }}>{t.role}</p>
                  <p style={{ fontSize: 13, color: "var(--fg-muted)" }}>{t.org}</p>
                  {t.org === "The UX Company" ? (
                    <p style={{ fontSize: 13, color: "var(--fg-muted)", marginTop: 6, lineHeight: 1.6 }}>
                      Independent practice. Product design, design systems, and UX strategy engagements across fintech,
                      enterprise SaaS, and early-stage startups in Nigeria and remote markets.
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conviction quote */}
        <div style={{ marginTop: sectionGap }}>
          <blockquote style={{ margin: 0, padding: 0, maxWidth: "min(100%, 720px)" }}>
            <p
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                color: "var(--fg-strong)",
                marginBottom: "clamp(12px, 2vw, 20px)",
              }}
            >
              “{communityPullQuote.text}”
            </p>
            <p
              style={{
                fontSize: "clamp(16px, 2vw, 22px)",
                color: "var(--fg-muted)",
                fontWeight: 500,
              }}
            >
              — {communityPullQuote.attribution}
            </p>
          </blockquote>
        </div>

        {/* Operating Principles — surface band (between conviction and community; no top border — fill provides separation) */}
        <div style={{ marginTop: sectionGap }}>
          <div
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "var(--surface-subtle)",
              borderRadius: 12,
              padding: "clamp(28px, 5vw, 40px) clamp(20px, 4vw, 28px)",
            }}
          >
            <p className="section-label" style={{ marginBottom: 28 }}>
              {operatingPrinciplesLabel}
            </p>
            <div className="about-principles-grid">
              {operatingPrinciples.map((p) => (
                <div key={p.title}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 8 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.6 }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Community */}
        <div style={{ marginTop: sectionGap }}>
          <h2
            style={{
              fontSize: "clamp(26px, 3.2vw, 40px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: "clamp(20px, 4vw, 32px)",
            }}
          >
            {communitySectionTitle}
          </h2>

          <div
            className="grid-2"
            style={{
              gap: "clamp(32px, 5vw, 48px) clamp(24px, 4vw, 56px)",
              alignItems: "start",
            }}
          >
            {communityCards.map((card, i) => (
              <div key={i}>
                <div style={{ marginBottom: "clamp(12px, 2vw, 16px)" }}>
                  <AssetImage
                    asset={card.asset}
                    aspectCover="16 / 9"
                    sizes="(max-width: 640px) 100vw, (max-width: 900px) 92vw, 520px"
                  />
                </div>
                <h3
                  style={{
                    fontSize: "clamp(17px, 2.1vw, 20px)",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    marginBottom: 6,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontSize: "clamp(14px, 1.6vw, 16px)",
                    color: "var(--fg-muted)",
                    fontWeight: 500,
                    marginBottom: "clamp(8px, 1.5vw, 12px)",
                  }}
                >
                  {card.subtitle}
                </p>
                <p
                  style={{
                    fontSize: "clamp(15px, 1.6vw, 17px)",
                    lineHeight: 1.5,
                    color: "var(--fg-body)",
                  }}
                >
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <AboutPressStrip />
      </div>
    </div>
  );
}
