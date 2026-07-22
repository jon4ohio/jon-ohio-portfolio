import type { Metadata } from "next";
import Link from "next/link";
import { IBM_Plex_Mono, Newsreader, Source_Sans_3 } from "next/font/google";
import AnchorSideNav from "./AnchorSideNav";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-anchor-display",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-anchor-body",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-anchor-mono",
  display: "swap",
});

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

const c = {
  bg: "#000000",
  paper: "#f0f0ee",
  muted: "rgba(240, 240, 238, 0.52)",
  faint: "rgba(240, 240, 238, 0.22)",
  teal: "#3d8f8d",
  line: "rgba(240, 240, 238, 0.09)",
  display:
    'var(--font-anchor-display), "Iowan Old Style", "Palatino Linotype", Palatino, serif',
  body: 'var(--font-anchor-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
  mono: 'var(--font-anchor-mono), "SF Mono", ui-monospace, Menlo, monospace',
} as const;

const GITHUB = "https://github.com/jon4ohio/anchor";
const NPM = "https://www.npmjs.com/package/@jon4ohio/anchor-runtime";
const DOCS =
  "https://github.com/jon4ohio/anchor/blob/main/docs/experience/04-building-your-own.md";
const CONTRACTS =
  "https://github.com/jon4ohio/anchor/blob/main/docs/project/entry.md";
const CAPABILITY_API =
  "https://github.com/jon4ohio/anchor/blob/main/docs/decisions/ADR-006-capability-api.md";
const POSITION =
  "https://github.com/jon4ohio/anchor/blob/main/docs/decisions/POSITION-anchor-coordination-architecture.md";

const pad = "clamp(24px, 5vw, 64px)";
const sectionPad = `clamp(80px, 14vh, 160px) ${pad}`;

const navSections = [
  { id: "home", label: "Start" },
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
  { label: "Seven Contracts", href: CONTRACTS },
  { label: "Capability API", href: CAPABILITY_API },
  { label: "Position Paper", href: POSITION },
];

const installCommands = [
  "npm install -g @jon4ohio/anchor-runtime",
  "anchor init",
  "anchor fulfill orientation",
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
        margin: "0 0 40px",
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
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
    <div
      className={`${newsreader.variable} ${sourceSans.variable} ${plexMono.variable}`}
      style={{
        background: c.bg,
        color: c.paper,
        fontFamily: c.body,
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          minHeight: 52,
          padding: `10px ${pad}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          borderBottom: `1px solid ${c.line}`,
          background: "rgba(0,0,0,0.88)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <style>{`
          .anchor-crumb-back:hover,
          .anchor-crumb-link:hover,
          .anchor-learn-link:hover {
            color: ${c.paper} !important;
          }
          @media (max-width: 880px) {
            .anchor-side-nav { display: none !important; }
          }
        `}</style>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 10,
            minWidth: 0,
          }}
        >
          <Link
            href="/work/anchor"
            className="anchor-crumb-back"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontFamily: c.mono,
              fontSize: 12,
              color: c.muted,
              textDecoration: "none",
              flexShrink: 0,
              transition: "color 0.15s",
            }}
          >
            ← Case study
          </Link>
          <span aria-hidden style={{ color: c.faint, fontSize: 12, lineHeight: 1 }}>
            ·
          </span>
          <span
            style={{
              fontFamily: c.mono,
              fontSize: 11,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: c.paper,
              fontWeight: 500,
            }}
          >
            Product
          </span>
        </div>
        <a
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "6px 14px",
            border: `1px solid rgba(240, 240, 238, 0.28)`,
            borderRadius: 2,
            fontFamily: c.mono,
            fontSize: 11,
            color: c.paper,
            textDecoration: "none",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            flexShrink: 0,
          }}
        >
          GitHub ↗
        </a>
      </header>

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
          padding: `120px ${pad}`,
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
            margin: "0 0 clamp(24px, 4vh, 36px)",
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
            margin: "0 auto clamp(28px, 5vh, 40px)",
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
            margin: "0 auto clamp(36px, 6vh, 48px)",
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
          <PrimaryBtn href={NPM} external>
            Install Runtime
          </PrimaryBtn>
          <OutlineBtn href={DOCS} external>
            Read Docs
          </OutlineBtn>
          <OutlineBtn href={GITHUB} external>
            GitHub
          </OutlineBtn>
        </div>
      </section>

      <section id="how" style={{ padding: sectionPad, borderBottom: `1px solid ${c.line}` }}>
        <MonoLabel>How it works</MonoLabel>
        <h2
          style={{
            fontFamily: c.display,
            fontWeight: 400,
            fontSize: "clamp(28px, 4vw, 40px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            margin: "0 0 48px",
            maxWidth: 720,
          }}
        >
          Responsibility → Capability → Runtime
        </h2>
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

      <section id="start" style={{ padding: sectionPad, borderBottom: `1px solid ${c.line}` }}>
        <MonoLabel>Getting started</MonoLabel>
        <h2
          style={{
            fontFamily: c.display,
            fontWeight: 400,
            fontSize: "clamp(28px, 4vw, 40px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            margin: "0 0 20px",
            maxWidth: 520,
          }}
        >
          Install, initialize, fulfill.
        </h2>
        <p style={{ margin: "0 0 32px", fontSize: 16, lineHeight: 1.65, color: c.muted, maxWidth: 560 }}>
          Today, engineering responsibilities are fulfilled by a compatible AI host — such as Cursor
          or Claude Code — using the installed Anchor Runtime. Durable artifacts stay in your
          repository.
        </p>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, maxWidth: 640 }}>
          {installCommands.map((cmd, i) => (
            <li
              key={cmd}
              style={{
                display: "grid",
                gridTemplateColumns: "48px 1fr",
                gap: 16,
                alignItems: "center",
                padding: "16px 0",
                borderTop: `1px solid ${c.line}`,
              }}
            >
              <span style={{ fontFamily: c.mono, fontSize: 12, color: c.teal }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <code
                style={{
                  fontFamily: c.mono,
                  fontSize: 14,
                  color: c.paper,
                  background: "rgba(240,240,238,0.04)",
                  border: `1px solid ${c.line}`,
                  borderRadius: 4,
                  padding: "12px 14px",
                  overflowWrap: "anywhere",
                }}
              >
                {cmd}
              </code>
            </li>
          ))}
        </ol>
        <p style={{ margin: "28px 0 0", fontSize: 13, lineHeight: 1.6, color: c.faint, maxWidth: 560 }}>
          Verify with <code style={{ fontFamily: c.mono }}>anchor help</code> (the CLI has no{" "}
          <code style={{ fontFamily: c.mono }}>--help</code> flag). Fulfillment language stays
          provisional until the Capability API acceptance gate clears in real adoption.
        </p>
      </section>

      <section id="learn" style={{ padding: sectionPad, borderBottom: `1px solid ${c.line}` }}>
        <MonoLabel>Learn the ideas</MonoLabel>
        <h2
          style={{
            fontFamily: c.display,
            fontWeight: 400,
            fontSize: "clamp(28px, 4vw, 40px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            margin: "0 0 32px",
          }}
        >
          Go deeper in the repository.
        </h2>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, maxWidth: 480 }}>
          {learnLinks.map((link) => (
            <li key={link.label} style={{ borderTop: `1px solid ${c.line}` }}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
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
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="why" style={{ padding: sectionPad, borderBottom: `1px solid ${c.line}` }}>
        <MonoLabel>Why Anchor exists</MonoLabel>
        <h2
          style={{
            fontFamily: c.display,
            fontWeight: 400,
            fontSize: "clamp(28px, 4vw, 40px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            margin: "0 0 20px",
            maxWidth: 560,
          }}
        >
          Designed for coordination, not another prompt pack.
        </h2>
        <p style={{ margin: "0 0 28px", fontSize: 16, lineHeight: 1.65, color: c.muted, maxWidth: 560 }}>
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
          padding: `32px ${pad} 48px`,
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
        <span>MIT · @jon4ohio/anchor-runtime</span>
        <div style={{ display: "flex", gap: 16 }}>
          <a href={NPM} target="_blank" rel="noopener noreferrer" style={{ color: c.muted, textDecoration: "none" }}>
            npm
          </a>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" style={{ color: c.muted, textDecoration: "none" }}>
            GitHub
          </a>
          <Link href="/work/anchor" style={{ color: c.muted, textDecoration: "none" }}>
            Case study
          </Link>
        </div>
      </footer>
    </div>
  );
}
