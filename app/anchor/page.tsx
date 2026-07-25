import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import AnchorSideNav from "./AnchorSideNav";
import { anchorProduct as c } from "./anchorProduct";

const META_DESCRIPTION =
  "Anchor is a coordination protocol that keeps AI-assisted projects coherent across sessions, tools, and contributors.";

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

const navSections = [
  { id: "home", label: "Home" },
  { id: "problem", label: "Problem" },
  { id: "proof", label: "Proof" },
  { id: "start", label: "Start" },
];

const articleHref = "/anchor/articles/projects-become-harder-to-understand-before-they-become-harder-to-code";

const h2Style: CSSProperties = {
  fontFamily: c.display,
  fontWeight: 400,
  fontSize: "clamp(30px, 4.6vw, 48px)",
  letterSpacing: "-0.03em",
  lineHeight: 1.12,
  margin: "0 0 24px",
  maxWidth: 780,
};

const bodyCopyStyle: CSSProperties = {
  margin: "0 0 16px",
  fontSize: 17,
  lineHeight: 1.7,
  color: c.muted,
  maxWidth: 620,
};

const codeBlockStyle: CSSProperties = {
  margin: 0,
  padding: "22px 24px",
  background: "rgba(255,255,255,0.035)",
  border: `1px solid ${c.line}`,
  borderRadius: 4,
  color: c.paper,
  fontFamily: c.mono,
  fontSize: 13,
  lineHeight: 1.6,
  overflowX: "auto",
};

const anchorTree = `.anchor/
└── config.json`;

const anchorConfig = `{
  "anchor": {
    "runtime": "@jon4ohio/anchor-runtime",
    "capabilityApi": "v1"
  },
  "capabilities": [
    "continuity@1",
    "orientation@1",
    "review@1"
  ],
  "project": {
    "map": {
      "Project Entry": "docs/project/entry.md",
      "Handoff": "ai/handoff.md"
    }
  }
}`;

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

function OutlineBtn({ href, children }: { href: string; children: React.ReactNode }) {
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
          Plain Files&nbsp;&nbsp;·&nbsp;&nbsp;Your Repository&nbsp;&nbsp;·&nbsp;&nbsp;Inspectable Output
        </p>

        <h1
          style={{
            position: "relative",
            fontFamily: c.mono,
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "clamp(32px, 5.2vw, 56px)",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            color: c.paper,
            margin: "0 auto 24px",
            maxWidth: "22ch",
          }}
        >
          Continue instead of reconstruct.
        </h1>

        <p
          style={{
            position: "relative",
            fontFamily: c.body,
            fontSize: "clamp(17px, 2.2vw, 20px)",
            lineHeight: 1.55,
            color: c.muted,
            maxWidth: 640,
            margin: "0 auto 36px",
          }}
        >
          Anchor is a coordination protocol that keeps AI-assisted projects coherent across sessions,
          tools, and contributors.
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
          <OutlineBtn href="/work/anchor">Read the Case Study →</OutlineBtn>
        </div>
      </section>

      <section id="problem" style={{ padding: c.sectionPad, borderBottom: `1px solid ${c.line}` }}>
        <MonoLabel>The Problem</MonoLabel>
        <h2 style={h2Style}>Projects become harder to understand long before they become harder to code.</h2>
        <p style={bodyCopyStyle}>
          AI tools can write code. But projects are built across conversations, decisions, constraints,
          handoffs, and returns after time away.
        </p>
        <p style={bodyCopyStyle}>
          When project understanding lives in chat history, every new session starts by reconstructing
          what the project already knew.
        </p>
        <Link
          href={articleHref}
          style={{
            display: "inline-flex",
            marginTop: 12,
            color: c.paper,
            textDecoration: "none",
            borderBottom: `1px solid rgba(240, 240, 238, 0.28)`,
            paddingBottom: 4,
          }}
        >
          Read the article →
        </Link>
      </section>

      <section id="proof" style={{ padding: c.sectionPad, borderBottom: `1px solid ${c.line}` }}>
        <MonoLabel>Proof</MonoLabel>
        <h2 style={h2Style}>Project understanding becomes plain files.</h2>
        <p style={bodyCopyStyle}>
          `anchor init` creates an inspectable `.anchor` workspace in your repository. This is from a real
          init run, not a mockup.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(180px, 0.55fr) minmax(260px, 1.45fr)",
            gap: 18,
            marginTop: 32,
            maxWidth: 860,
          }}
        >
          <pre style={codeBlockStyle}>{anchorTree}</pre>
          <pre style={codeBlockStyle}>{anchorConfig}</pre>
        </div>
      </section>

      <section id="start" style={{ padding: c.sectionPad, borderBottom: `1px solid ${c.line}` }}>
        <MonoLabel>Try Anchor</MonoLabel>
        <h2 style={h2Style}>Install, initialize, then point your AI host at the project.</h2>
        <pre style={{ ...codeBlockStyle, maxWidth: 640, marginBottom: 24 }}>{`npm install -g @jon4ohio/anchor-runtime

cd your-project
anchor init`}</pre>
        <p style={bodyCopyStyle}>
          Today, Anchor does not promise automatic discovery across every AI tool. After initialization,
          configure the MCP server or ask a compatible AI host to use Anchor for the repository.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
          <PrimaryBtn href={c.npm} external>
            Install Runtime
          </PrimaryBtn>
          <OutlineBtn href="/work/anchor">Read the Case Study →</OutlineBtn>
        </div>
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
        <span>Runtime on npm</span>
        <Link href="/anchor/docs" style={{ color: c.muted, textDecoration: "none" }}>
          Docs →
        </Link>
      </footer>
    </>
  );
}
