import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader, Source_Sans_3 } from "next/font/google";

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

export const metadata: Metadata = {
  title: "Anchor — Continue instead of reconstruct",
  description:
    "A thin coordination layer for AI-assisted projects. 7 contracts. One owner each. No build step.",
  alternates: { canonical: "/anchor" },
  openGraph: {
    title: "Anchor — Continue instead of reconstruct",
    description:
      "A thin coordination layer for AI-assisted projects. 7 contracts. One owner each. No build step.",
    url: "/anchor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anchor — Continue instead of reconstruct",
    description:
      "A thin coordination layer for AI-assisted projects. 7 contracts. One owner each. No build step.",
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
const pad = "clamp(24px, 5vw, 64px)";
const sectionPad = `clamp(80px, 14vh, 160px) ${pad}`;

const contracts = [
  { n: "01", name: "Entry", desc: "Who reads what, in what order" },
  { n: "02", name: "Handoff", desc: "What changed, what's next, what's in flight" },
  { n: "03", name: "Decision", desc: "Why an architectural choice was made" },
  { n: "04", name: "Spec", desc: "What a feature must do and how it behaves" },
  { n: "05", name: "Domain", desc: "How this system works — the stable model" },
  { n: "06", name: "Research", desc: "Discovered facts from external sources" },
  { n: "07", name: "Validation", desc: "Evidence that something works as claimed" },
];

const steps = [
  {
    n: "01",
    heading: "Classify what you have",
    body: "Which of your existing files already fill which contracts? You probably have most of them — they just aren't labelled.",
  },
  {
    n: "02",
    heading: "Fill the gaps",
    body: "Handoff and Entry are read first by every AI session. If they're missing or stale, everything downstream suffers.",
  },
  {
    n: "03",
    heading: "Reference, don't duplicate",
    body: "Contracts point to each other. Knowledge lives in one place. Nothing gets contradicted.",
  },
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
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
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

function GhostLink({
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
        fontFamily: c.mono,
        fontSize: 11,
        color: c.muted,
        textDecoration: "none",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </a>
  );
}

export default function AnchorLandingPage() {
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
      {/* ─── Minimal wordmark header ──────────────────── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          height: 52,
          padding: `0 ${pad}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${c.line}`,
          background: "rgba(0,0,0,0.88)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <span
          style={{
            fontFamily: c.mono,
            fontSize: 13,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: c.paper,
          }}
        >
          Anchor
        </span>
        <a
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: c.mono,
            fontSize: 11,
            color: c.teal,
            textDecoration: "none",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          GitHub ↗
        </a>
      </header>

      {/* ─── Hero ─────────────────────────────────────── */}
      <section
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: `120px ${pad} clamp(64px, 10vh, 112px)`,
          borderBottom: `1px solid ${c.line}`,
        }}
      >
        <p
          style={{
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
            fontFamily: c.display,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(52px, 9vw, 112px)",
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            color: c.paper,
            margin: "0 0 clamp(28px, 5vh, 48px)",
            maxWidth: "15ch",
          }}
        >
          Continue instead of reconstruct.
        </h1>

        <p
          style={{
            fontFamily: c.body,
            fontSize: "clamp(16px, 1.8vw, 20px)",
            lineHeight: 1.55,
            color: c.muted,
            margin: "0 0 clamp(40px, 6vh, 64px)",
            maxWidth: "50ch",
          }}
        >
          A thin coordination layer that gives AI assistants — and the humans
          working alongside them — a single place to find project context
          without rebuilding it every session.
        </p>

        <div
          style={{
            display: "flex",
            gap: "clamp(20px, 3vw, 32px)",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <PrimaryBtn href={GITHUB}>View on GitHub →</PrimaryBtn>
          <GhostLink href="#contracts">How it works ↓</GhostLink>
        </div>
      </section>

      {/* ─── Problem ──────────────────────────────────── */}
      <section
        style={{
          padding: sectionPad,
          borderBottom: `1px solid ${c.line}`,
        }}
      >
        <MonoLabel>The Problem</MonoLabel>

        <h2
          style={{
            fontFamily: c.display,
            fontWeight: 400,
            fontSize: "clamp(36px, 5.5vw, 68px)",
            lineHeight: 1.06,
            letterSpacing: "-0.028em",
            color: c.paper,
            margin: "0 0 clamp(40px, 7vh, 64px)",
            maxWidth: "18ch",
          }}
        >
          Every session starts from scratch.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
            gap: "clamp(40px, 6vw, 80px)",
            maxWidth: 960,
            alignItems: "start",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: c.body,
                fontSize: 17,
                lineHeight: 1.7,
                color: c.muted,
                margin: "0 0 20px",
              }}
            >
              You&rsquo;ve built up context over three sessions. The fourth
              session, a new AI agent opens your AGENTS.md and has to guess
              what&rsquo;s current, what&rsquo;s already decided, and what to
              do next. So it asks. Or worse — it assumes.
            </p>
            <p
              style={{
                fontFamily: c.body,
                fontSize: 17,
                lineHeight: 1.7,
                color: c.muted,
                margin: 0,
              }}
            >
              The problem isn&rsquo;t the AI. It&rsquo;s that project knowledge
              has no defined shape. Decisions live in comments. Plans live in
              chat. Context lives in the last person who touched it.
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.025)",
              border: `1px solid ${c.line}`,
              borderRadius: 3,
              padding: "clamp(20px, 3vw, 32px)",
            }}
          >
            <p
              style={{
                fontFamily: c.mono,
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: c.faint,
                margin: "0 0 20px",
              }}
            >
              AGENTS.md (typical)
            </p>
            {[
              { text: "This is a TypeScript monorepo.", fade: false },
              { text: "We use Prisma for the database.", fade: false },
              { text: "IMPORTANT: don't touch the auth module.", fade: false },
              { text: "# Notes from last session — see if still valid", fade: true },
              { text: "# TODO: clean this up before next sprint", fade: true },
              { text: "[continues for 200 more lines]", fade: true, faint: true },
            ].map((line, i) => (
              <p
                key={i}
                style={{
                  fontFamily: c.mono,
                  fontSize: 12,
                  lineHeight: 1.8,
                  color: line.faint
                    ? "rgba(240,240,238,0.18)"
                    : line.fade
                      ? "rgba(240,240,238,0.3)"
                      : c.muted,
                  margin: 0,
                }}
              >
                {line.text}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7 Contracts ──────────────────────────────── */}
      <section
        id="contracts"
        style={{
          padding: sectionPad,
          borderBottom: `1px solid ${c.line}`,
        }}
      >
        <MonoLabel>The Framework</MonoLabel>

        <h2
          style={{
            fontFamily: c.display,
            fontWeight: 400,
            fontSize: "clamp(32px, 4.5vw, 56px)",
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            color: c.paper,
            margin: "0 0 24px",
            maxWidth: "20ch",
          }}
        >
          7 contracts. One owner each.
        </h2>

        <p
          style={{
            fontFamily: c.body,
            fontSize: 17,
            lineHeight: 1.65,
            color: c.muted,
            margin: "0 0 clamp(48px, 8vh, 72px)",
            maxWidth: "52ch",
          }}
        >
          Instead of one messy AGENTS.md mixing project description, decisions,
          and &ldquo;what we&rsquo;re doing next&rdquo; — each type of knowledge
          goes to its designated contract. Files don&rsquo;t need to move. You
          classify what already exists and fill the gaps.
        </p>

        <div style={{ maxWidth: 800 }}>
          {contracts.map((row, i) => (
            <div
              key={row.n}
              style={{
                display: "grid",
                gridTemplateColumns: "2.5ch 140px 1fr",
                gap: "0 clamp(16px, 2.5vw, 32px)",
                padding: "clamp(18px, 2.5vh, 24px) 0",
                borderTop: `1px solid ${c.line}`,
                ...(i === contracts.length - 1
                  ? { borderBottom: `1px solid ${c.line}` }
                  : {}),
                alignItems: "baseline",
              }}
            >
              <span
                style={{
                  fontFamily: c.mono,
                  fontSize: 11,
                  color: c.teal,
                  letterSpacing: "0.04em",
                }}
              >
                {row.n}
              </span>
              <span
                style={{
                  fontFamily: c.body,
                  fontSize: 15,
                  fontWeight: 600,
                  color: c.paper,
                  letterSpacing: "-0.01em",
                }}
              >
                {row.name}
              </span>
              <span
                style={{
                  fontFamily: c.body,
                  fontSize: 15,
                  color: c.muted,
                  lineHeight: 1.5,
                }}
              >
                {row.desc}
              </span>
            </div>
          ))}
        </div>

        <p
          style={{
            fontFamily: c.mono,
            fontSize: 11,
            color: c.faint,
            letterSpacing: "0.06em",
            marginTop: 28,
          }}
        >
          No build step · No tooling dependency · Version-controlled markdown
        </p>
      </section>

      {/* ─── Adopt ────────────────────────────────────── */}
      <section
        style={{
          padding: sectionPad,
          borderBottom: `1px solid ${c.line}`,
        }}
      >
        <MonoLabel>Get Started</MonoLabel>

        <h2
          style={{
            fontFamily: c.display,
            fontWeight: 400,
            fontSize: "clamp(36px, 5.5vw, 68px)",
            lineHeight: 1.06,
            letterSpacing: "-0.028em",
            color: c.paper,
            margin: "0 0 clamp(48px, 8vh, 72px)",
            maxWidth: "14ch",
          }}
        >
          Drop it in.{" "}
          <em style={{ fontStyle: "italic" }}>Don&rsquo;t move files.</em>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
            maxWidth: 960,
            marginBottom: "clamp(56px, 9vh, 80px)",
          }}
        >
          {steps.map((s) => (
            <div
              key={s.n}
              style={{
                padding: "clamp(24px, 3.5vh, 36px) clamp(0px, 2.5vw, 24px) clamp(24px, 3.5vh, 36px) 0",
                borderTop: `1px solid ${c.line}`,
              }}
            >
              <p
                style={{
                  fontFamily: c.mono,
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: c.teal,
                  margin: "0 0 16px",
                }}
              >
                {s.n}
              </p>
              <p
                style={{
                  fontFamily: c.body,
                  fontSize: 16,
                  fontWeight: 600,
                  color: c.paper,
                  margin: "0 0 10px",
                  lineHeight: 1.35,
                  letterSpacing: "-0.01em",
                }}
              >
                {s.heading}
              </p>
              <p
                style={{
                  fontFamily: c.body,
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: c.muted,
                  margin: 0,
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: "clamp(20px, 3vw, 32px)",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <PrimaryBtn href={GITHUB}>Open Anchor on GitHub →</PrimaryBtn>
          <GhostLink href="/work/anchor">Read the case study ↗</GhostLink>
        </div>
      </section>

      {/* ─── Footer bar ───────────────────────────────── */}
      <footer
        style={{
          padding: `clamp(24px, 4vh, 36px) ${pad}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: c.mono,
            fontSize: 11,
            color: c.faint,
            letterSpacing: "0.04em",
          }}
        >
          Anchor by Jon Ohio · MIT License
        </span>
        <a
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: c.mono,
            fontSize: 11,
            color: c.faint,
            textDecoration: "none",
            letterSpacing: "0.04em",
          }}
        >
          github.com/jon4ohio/anchor ↗
        </a>
      </footer>
    </div>
  );
}
