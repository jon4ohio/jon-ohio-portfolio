import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import AnchorSideNav from "./AnchorSideNav";
import { anchorProduct as c } from "./anchorProduct";

const META_DESCRIPTION =
  "Continue instead of reconstruct. Anchor coordinates durable project context so humans and AI can continue work instead of rebuilding it.";

export const metadata: Metadata = {
  title: "Anchor — Continue instead of reconstruct",
  description: META_DESCRIPTION,
  alternates: { canonical: "/anchor" },
  openGraph: {
    title: "Anchor — Continue instead of reconstruct",
    description: META_DESCRIPTION,
    url: "/anchor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anchor — Continue instead of reconstruct",
    description: META_DESCRIPTION,
  },
};

const h2Style: CSSProperties = {
  fontFamily: c.display,
  fontWeight: 400,
  fontSize: "clamp(28px, 4vw, 40px)",
  letterSpacing: "-0.02em",
  lineHeight: 1.2,
  margin: "0 0 24px",
  maxWidth: 640,
};

const bodyCopyStyle: CSSProperties = {
  margin: "0 0 16px",
  fontSize: 16,
  lineHeight: 1.7,
  color: c.muted,
  maxWidth: 560,
};

const navSections = [
  { id: "home", label: "Start" },
  { id: "problem", label: "The Problem" },
  { id: "how", label: "How it works" },
  { id: "start", label: "Get started" },
  { id: "learn", label: "Learn" },
  { id: "why", label: "Why" },
];

const howSteps = [
  {
    n: "01",
    title: "Responsibility",
    body: "Project knowledge is owned by responsibility — orientation, decisions, scope, continuity — not by whichever file happened to mention it last.",
  },
  {
    n: "02",
    title: "Capability",
    body: "Engineering responsibilities become stable capability identities. Clients depend on what to fulfill, not on a directory layout.",
  },
  {
    n: "03",
    title: "Runtime",
    body: "A thin local runtime initializes a workspace and fulfills responsibilities, writing durable artifacts into your repository. Your host AI provides inference.",
  },
];

const learnLinks = [
  { label: "Getting Started", href: "/anchor/docs#getting-started" },
  { label: "Concepts", href: "/anchor/docs#concepts" },
  { label: "Architecture", href: "/anchor/docs#architecture" },
  { label: "Reference", href: "/anchor/docs#reference" },
];

const problemParagraphs = [
  "Projects accumulate decisions, not just code — intent, constraints, and tradeoffs that live nowhere durable.",
  "AI sessions reconstruct that intent from whatever they can find, instead of continuing from what the project already knows.",
  "Anchor preserves engineering responsibilities so humans and AI can continue work instead of rebuilding context every time.",
];

function MonoLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: c.mono,
        fontSize: 11,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: c.teal,
        margin: "0 0 28px",
      }}
    >
      {children}
    </p>
  );
}

function PrimaryBtn({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "14px 26px",
        background: c.teal,
        color: "#000",
        fontFamily: c.body,
        fontSize: 15,
        fontWeight: 600,
        textDecoration: "none",
        borderRadius: 2,
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </a>
  );
}

function OutlineBtn({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "13px 25px",
        background: "transparent",
        border: "1px solid rgba(240, 240, 238, 0.28)",
        color: c.paper,
        fontFamily: c.body,
        fontSize: 15,
        fontWeight: 500,
        textDecoration: "none",
        borderRadius: 2,
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </a>
  );
}

function ContinuityDiagram() {
  const col = (title: string, top: string, bottom: string) => (
    <div
      style={{
        background: "rgba(255,255,255,0.025)",
        border: `1px solid ${c.line}`,
        borderRadius: 3,
        padding: "20px 22px",
      }}
    >
      <p
        style={{
          fontFamily: c.mono,
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: c.muted,
          margin: "0 0 18px",
        }}
      >
        {title}
      </p>
      <p style={{ margin: 0, fontFamily: c.mono, fontSize: 13, lineHeight: 1.7, color: c.paper }}>
        {top}
      </p>
      <p aria-hidden style={{ margin: "6px 0", fontFamily: c.mono, fontSize: 13, color: c.teal }}>
        ↓
      </p>
      <p style={{ margin: 0, fontFamily: c.mono, fontSize: 13, lineHeight: 1.7, color: c.muted }}>
        {bottom}
      </p>
    </div>
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 16,
        marginTop: 36,
        maxWidth: 640,
      }}
    >
      {col("Without Anchor", "Conversation", "Reconstruction")}
      {col("With Anchor", "Responsibility", "Continue")}
    </div>
  );
}

export default function AnchorProductPage() {
  return (
    <>
      <AnchorSideNav sections={navSections} />

      <section
        id="home"
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: `120px ${c.pad}`,
          borderBottom: `1px solid ${c.line}`,
          overflow: "hidden",
          background: "linear-gradient(180deg, #050b14 0%, #0a1a2a 55%, #000 100%)",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 50% at 50% 25%, rgba(61, 143, 141, 0.22), transparent 70%)",
          }}
        />

        <p
          style={{
            position: "relative",
            fontFamily: c.mono,
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: c.teal,
            margin: "0 0 28px",
          }}
        >
          Anchor&nbsp;&nbsp;·&nbsp;&nbsp;Open Source&nbsp;&nbsp;·&nbsp;&nbsp;MIT
        </p>

        <h1
          style={{
            position: "relative",
            fontFamily: c.display,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(44px, 7vw, 84px)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: c.paper,
            margin: "0 auto 24px",
            maxWidth: "14ch",
          }}
        >
          Continue instead of reconstruct.
        </h1>

        <p
          style={{
            position: "relative",
            fontSize: "clamp(17px, 2.2vw, 20px)",
            lineHeight: 1.55,
            color: c.muted,
            maxWidth: 540,
            margin: "0 auto 36px",
          }}
        >
          Anchor coordinates durable project context so humans and AI can continue work instead of
          rebuilding it.
        </p>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
          }}
        >
          <PrimaryBtn href={c.npm} external>
            Install Runtime
          </PrimaryBtn>
          <OutlineBtn href="#problem">See the problem →</OutlineBtn>
        </div>
      </section>

      <section id="problem" style={{ padding: c.sectionPad, borderBottom: `1px solid ${c.line}` }}>
        <MonoLabel>The Problem</MonoLabel>
        <h2 style={h2Style}>Why Anchor exists.</h2>
        {problemParagraphs.map((p, i) => (
          <p
            key={p.slice(0, 32)}
            style={{
              ...bodyCopyStyle,
              marginBottom: i === problemParagraphs.length - 1 ? 0 : 16,
            }}
          >
            {p}
          </p>
        ))}
        <ContinuityDiagram />
      </section>

      <section id="how" style={{ padding: c.sectionPad, borderBottom: `1px solid ${c.line}` }}>
        <MonoLabel>How it works</MonoLabel>
        <h2 style={h2Style}>Responsibility → Capability → Runtime</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 28,
          }}
        >
          {howSteps.map((step) => (
            <div key={step.n} style={{ borderTop: `1px solid ${c.line}`, paddingTop: 24 }}>
              <p
                style={{
                  fontFamily: c.mono,
                  fontSize: 12,
                  color: c.teal,
                  letterSpacing: "0.08em",
                  margin: "0 0 12px",
                }}
              >
                {step.n}
              </p>
              <h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: 600 }}>{step.title}</h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: c.muted }}>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="start" style={{ padding: c.sectionPad, borderBottom: `1px solid ${c.line}` }}>
        <MonoLabel>Getting started</MonoLabel>
        <h2 style={h2Style}>Start in minutes.</h2>
        <p style={{ ...bodyCopyStyle, marginBottom: 28 }}>
          Install the runtime, then follow the canonical Getting Started guide in Documentation —
          product introduces adoption; docs owns the full walkthrough.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <PrimaryBtn href={c.npm} external>
            Install Runtime
          </PrimaryBtn>
          <OutlineBtn href="/anchor/docs#getting-started">Open Getting Started →</OutlineBtn>
        </div>
      </section>

      <section id="learn" style={{ padding: c.sectionPad, borderBottom: `1px solid ${c.line}` }}>
        <MonoLabel>Learn</MonoLabel>
        <h2 style={h2Style}>Documentation — the How surface.</h2>
        <p style={{ ...bodyCopyStyle, marginBottom: 28 }}>
          Concepts, architecture, and runtime reference live on the product documentation surface —
          not in the implementation repository.
        </p>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, maxWidth: 480 }}>
          {learnLinks.map((link) => (
            <li key={link.label} style={{ borderTop: `1px solid ${c.line}` }}>
              <Link
                href={link.href}
                className="anchor-learn-link"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  padding: "18px 0",
                  color: c.muted,
                  textDecoration: "none",
                  fontSize: 17,
                  transition: "color 0.15s",
                }}
              >
                <span>{link.label}</span>
                <span aria-hidden style={{ fontFamily: c.mono, fontSize: 12 }}>
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="why" style={{ padding: c.sectionPad, borderBottom: `1px solid ${c.line}` }}>
        <MonoLabel>Why Anchor exists</MonoLabel>
        <h2 style={h2Style}>Designed for coordination, not another prompt pack.</h2>
        <p style={{ ...bodyCopyStyle, marginBottom: 28 }}>
          If you want the systems-thinking story — the shifts, tradeoffs, and evidence — read the
          design case study on this portfolio.
        </p>
        <Link
          href="/work/anchor"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 16,
            fontWeight: 500,
            color: c.paper,
            textDecoration: "none",
            borderBottom: `1px solid rgba(240, 240, 238, 0.28)`,
            paddingBottom: 4,
          }}
        >
          Read the design case study →
        </Link>
      </section>

      <footer
        style={{
          padding: `28px ${c.pad} 40px`,
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: c.mono,
          fontSize: 11,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: c.faint,
        }}
      >
        <span>MIT Licensed</span>
        <Link href="/work/anchor" style={{ color: c.muted, textDecoration: "none" }}>
          Case Study →
        </Link>
      </footer>
    </>
  );
}
