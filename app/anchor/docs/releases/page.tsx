import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { anchorReleaseNotes } from "@/lib/anchorDocsContent";
import { anchorProduct as c } from "../../anchorProduct";

export const metadata: Metadata = {
  title: "Anchor Release Notes",
  description:
    "Public release notes for Anchor Runtime — the source of truth for what shipped to users via npm.",
  alternates: { canonical: "/anchor/docs/releases" },
  openGraph: {
    title: "Anchor Release Notes",
    description:
      "Public release notes for Anchor Runtime — the source of truth for what shipped to users via npm.",
    url: "/anchor/docs/releases",
    type: "website",
  },
};

const h2Style: CSSProperties = {
  fontFamily: c.display,
  fontWeight: 400,
  fontSize: "clamp(28px, 4vw, 40px)",
  letterSpacing: "-0.02em",
  lineHeight: 1.2,
  margin: "0 0 16px",
  maxWidth: 640,
};

const bodyStyle: CSSProperties = {
  margin: "0 0 16px",
  fontSize: 16,
  lineHeight: 1.7,
  color: c.muted,
  maxWidth: 560,
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

export default function AnchorDocsReleasesPage() {
  return (
    <main style={{ paddingTop: 72 }}>
      <section
        style={{
          padding: `clamp(48px, 8vh, 72px) ${c.pad} clamp(40px, 6vh, 56px)`,
          borderBottom: `1px solid ${c.line}`,
          maxWidth: 720,
        }}
      >
        <MonoLabel>Release Notes</MonoLabel>
        <h1
          style={{
            fontFamily: c.display,
            fontWeight: 400,
            fontSize: "clamp(36px, 5vw, 52px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.12,
            margin: "0 0 20px",
          }}
        >
          What shipped to users.
        </h1>
        <p style={{ ...bodyStyle, marginBottom: 0 }}>
          This page is the public source of truth for Anchor Runtime releases. Install from npm;
          read what changed here. GitHub Releases, when present, are an engineering artifact — not
          the product changelog.
        </p>
      </section>

      {anchorReleaseNotes.map((note) => (
        <section
          key={note.version}
          id={`v${note.version.replace(/\./g, "-")}`}
          style={{
            padding: c.sectionPad,
            borderBottom: `1px solid ${c.line}`,
            scrollMarginTop: 80,
            maxWidth: 720,
          }}
        >
          <p
            style={{
              fontFamily: c.mono,
              fontSize: 12,
              color: c.teal,
              letterSpacing: "0.08em",
              margin: "0 0 12px",
            }}
          >
            {note.version} · {note.date}
          </p>
          <h2 style={h2Style}>{note.title}</h2>
          <p style={bodyStyle}>
            <strong style={{ color: c.paper, fontWeight: 600 }}>Why it matters. </strong>
            {note.whyItMatters}
          </p>
          <p
            style={{
              fontFamily: c.mono,
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: c.muted,
              margin: "24px 0 12px",
            }}
          >
            Highlights
          </p>
          <ul style={{ margin: "0 0 8px", paddingLeft: 20, maxWidth: 560 }}>
            {note.highlights.map((h) => (
              <li
                key={h.slice(0, 48)}
                style={{ fontSize: 15, lineHeight: 1.65, color: c.muted, marginBottom: 10 }}
              >
                {h}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section style={{ padding: c.sectionPad, maxWidth: 720 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          <Link
            href="/anchor/docs"
            style={{
              fontSize: 15,
              color: c.paper,
              textDecoration: "none",
              borderBottom: `1px solid rgba(240, 240, 238, 0.28)`,
              paddingBottom: 2,
            }}
          >
            ← Documentation
          </Link>
          <a
            href={c.npm}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 15,
              color: c.paper,
              textDecoration: "none",
              borderBottom: `1px solid rgba(240, 240, 238, 0.28)`,
              paddingBottom: 2,
            }}
          >
            Install runtime ↗
          </a>
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
        <span>MIT Licensed</span>
        <Link href="/work/anchor" style={{ color: c.muted, textDecoration: "none" }}>
          Case Study →
        </Link>
      </footer>
    </main>
  );
}
