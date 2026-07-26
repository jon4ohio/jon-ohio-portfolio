import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import AnchorSideNav from "./AnchorSideNav";
import { anchorProduct as c } from "./anchorProduct";

const DEFINITION =
  "Anchor is an approach to AI-assisted engineering that helps projects stay coherent as they evolve across sessions, tools, and contributors.";

const CORE_INSIGHT =
  "Projects become harder to understand long before they become harder to code.";

export const metadata: Metadata = {
  title: "Anchor — Continue instead of reconstruct",
  description: DEFINITION,
  alternates: { canonical: "/anchor" },
  openGraph: {
    title: "Anchor — Continue instead of reconstruct",
    description: DEFINITION,
    url: "/anchor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anchor — Continue instead of reconstruct",
    description: DEFINITION,
  },
};

const navSections = [
  { id: "home", label: "Home" },
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "proof", label: "No magic" },
  { id: "start", label: "Try it" },
  { id: "principles", label: "Principles" },
];

const articleHref =
  "https://medium.com/@jon4ohio/projects-become-harder-to-understand-before-they-become-harder-to-code-a49540c19de5";

const principles = [
  "Projects outlive conversations.",
  "Durable artifacts beat chat history.",
  "Explicit responsibilities reduce ambiguity.",
  "Continue instead of reconstruct.",
  "Map existing documentation — don't own it.",
];

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

const figureCaptionStyle: CSSProperties = {
  margin: "14px 0 0",
  fontSize: 14,
  lineHeight: 1.55,
  color: c.muted,
  maxWidth: 720,
};

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
            fontFamily: c.display,
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "clamp(32px, 5.2vw, 52px)",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            color: c.paper,
            margin: "0 auto 24px",
            maxWidth: "16ch",
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
          {DEFINITION}
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
          <PrimaryBtn href="#start">Install Anchor</PrimaryBtn>
        </div>
      </section>

      <section id="problem" style={{ padding: c.sectionPad, borderBottom: `1px solid ${c.line}` }}>
        <MonoLabel>The Problem</MonoLabel>
        <h2 style={h2Style}>{CORE_INSIGHT}</h2>
        <p style={bodyCopyStyle}>
          Conversations are enough at first. Decisions pile up. A different tool or a new session
          suggests something incompatible with what was already settled. More time goes into
          restoring context than building.
        </p>
        <p style={bodyCopyStyle}>
          When project understanding lives in chat history, every new session starts by reconstructing
          what the project already knew.
        </p>

        <figure style={{ margin: "40px 0 0", maxWidth: 720 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- local SVG identity asset */}
          <img
            src="/anchor/continue-instead-of-reconstruct.svg"
            alt="Continue Instead of Reconstruct: without Anchor, conversations lead to starting over; with Anchor, a conversation leads to Project Understanding, then Continue."
            width={720}
            height={440}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 4,
              border: `1px solid ${c.line}`,
            }}
          />
        </figure>

        <a
          href={articleHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            marginTop: 28,
            color: c.paper,
            textDecoration: "none",
            borderBottom: `1px solid rgba(240, 240, 238, 0.28)`,
            paddingBottom: 4,
          }}
        >
          Read the article →
        </a>
      </section>

      <section id="approach" style={{ padding: c.sectionPad, borderBottom: `1px solid ${c.line}` }}>
        <MonoLabel>The Approach</MonoLabel>
        <h2 style={h2Style}>
          Anchor organizes project understanding so humans and AI can build from the same foundation.
        </h2>
        <p style={bodyCopyStyle}>
          Like version control and CI/CD before it, Anchor makes an engineering constraint explicit —
          durable project context — so collaborators stop reconstructing it from scratch.
        </p>
      </section>

      <section id="proof" style={{ padding: c.sectionPad, borderBottom: `1px solid ${c.line}` }}>
        <MonoLabel>No magic</MonoLabel>
        <h2 style={h2Style}>Anchor doesn’t become your documentation. It becomes the map to it.</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(220px, 0.72fr) minmax(320px, 1.28fr)",
            gap: 20,
            marginTop: 36,
            alignItems: "start",
            maxWidth: 980,
          }}
          className="anchor-proof-grid"
        >
          <figure style={{ margin: 0 }}>
            <p
              style={{
                fontFamily: c.mono,
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: c.faint,
                margin: "0 0 12px",
              }}
            >
              How it works
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element -- local SVG diagram */}
            <img
              src="/anchor/mechanism-map.svg"
              alt="Conceptual diagram: AI host reads .anchor/config.json, which declares paths to Project Entry and Handoff."
              width={640}
              height={360}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 4,
                border: `1px solid ${c.line}`,
              }}
            />
            <figcaption style={figureCaptionStyle}>
              A small configuration declares where your project’s durable documentation should live.
            </figcaption>
          </figure>

          <figure style={{ margin: 0 }}>
            <p
              style={{
                fontFamily: c.mono,
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: c.faint,
                margin: "0 0 12px",
              }}
            >
              What that looks like
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element -- local SVG evidence panel */}
            <img
              src="/anchor/evidence-overlay.svg"
              alt="Actual .anchor/config.json from this project after anchor init, mapped to docs/project/entry.md and ai/handoff.md."
              width={920}
              height={560}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 4,
                border: `1px solid ${c.line}`,
              }}
            />
            <figcaption style={figureCaptionStyle}>
              Actual output from Anchor in this project. No hidden memory. No cloud service. No
              lock-in. Everything is stored as plain files in your repository.
            </figcaption>
          </figure>
        </div>

        <style>{`
          @media (max-width: 860px) {
            .anchor-proof-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      <section id="start" style={{ padding: c.sectionPad, borderBottom: `1px solid ${c.line}` }}>
        <MonoLabel>Try it</MonoLabel>
        <h2 style={h2Style}>Install, initialize, then point your AI host at the project.</h2>
        <pre style={{ ...codeBlockStyle, maxWidth: 640, marginBottom: 20 }}>{`npm install -g @jon4ohio/anchor-runtime

cd your-project
anchor init`}</pre>
        <p style={bodyCopyStyle}>
          `anchor init` creates a small `.anchor/config.json` that declares where your project’s
          durable documentation should live. It doesn’t duplicate or replace it.
        </p>
        <p style={bodyCopyStyle}>
          Today, Anchor does not promise automatic discovery across every AI tool. After
          initialization, configure the MCP server or ask a compatible AI host to use Anchor for the
          repository.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
          <PrimaryBtn href={c.npm} external>
            Install Anchor
          </PrimaryBtn>
          <OutlineBtn href="/work/anchor">Read the Case Study →</OutlineBtn>
        </div>
      </section>

      <section id="principles" style={{ padding: c.sectionPad, borderBottom: `1px solid ${c.line}` }}>
        <MonoLabel>A few principles</MonoLabel>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            maxWidth: 640,
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {principles.map((line) => (
            <li
              key={line}
              style={{
                fontFamily: c.body,
                fontSize: 18,
                lineHeight: 1.45,
                color: c.paper,
                paddingBottom: 18,
                borderBottom: `1px solid ${c.line}`,
              }}
            >
              {line}
            </li>
          ))}
        </ul>
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
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
          <Link href="/anchor/docs" style={{ color: c.muted, textDecoration: "none" }}>
            Docs →
          </Link>
          <Link href="/work/anchor" style={{ color: c.muted, textDecoration: "none" }}>
            Case Study →
          </Link>
        </div>
      </footer>
    </>
  );
}
