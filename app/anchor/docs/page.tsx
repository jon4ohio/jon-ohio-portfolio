import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  anchorDocsMaturity,
  anchorDocsMeta,
  anchorDocsSections,
} from "@/lib/anchorDocsContent";
import { anchorProduct as c } from "../anchorProduct";
import AnchorDocsSectionNav from "../AnchorDocsSectionNav";

export const metadata: Metadata = {
  title: anchorDocsMeta.title,
  description: anchorDocsMeta.description,
  alternates: { canonical: "/anchor/docs" },
  openGraph: {
    title: anchorDocsMeta.title,
    description: anchorDocsMeta.description,
    url: "/anchor/docs",
    type: "website",
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

const sectionNav = [
  ...anchorDocsSections.map((s) => ({ id: s.id, label: s.label })),
  { id: anchorDocsMaturity.id, label: anchorDocsMaturity.label },
];

export default function AnchorDocsPage() {
  return (
    <>
      <AnchorDocsSectionNav sections={sectionNav} />

      <main style={{ paddingTop: 72 }}>
        <section
          style={{
            padding: `clamp(48px, 8vh, 72px) ${c.pad} clamp(40px, 6vh, 56px)`,
            borderBottom: `1px solid ${c.line}`,
            maxWidth: 720,
          }}
        >
          <MonoLabel>Documentation</MonoLabel>
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
            How to adopt Anchor.
          </h1>
          <p style={{ ...bodyStyle, marginBottom: 0 }}>{anchorDocsMeta.intro}</p>
        </section>

        {anchorDocsSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            style={{
              padding: c.sectionPad,
              borderBottom: `1px solid ${c.line}`,
              scrollMarginTop: 80,
            }}
          >
            <MonoLabel>{section.label}</MonoLabel>
            <h2 style={h2Style}>{section.title}</h2>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} style={bodyStyle}>
                {p}
              </p>
            ))}
            {section.commands ? (
              <ol style={{ listStyle: "none", margin: "8px 0 24px", padding: 0, maxWidth: 640 }}>
                {section.commands.map((cmd, i) => (
                  <li
                    key={cmd}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "48px 1fr",
                      gap: 16,
                      alignItems: "center",
                      padding: "14px 0",
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
            ) : null}
            {section.bullets ? (
              <ul style={{ margin: "0 0 24px", paddingLeft: 20, maxWidth: 560 }}>
                {section.bullets.map((b) => (
                  <li
                    key={b.slice(0, 40)}
                    style={{ fontSize: 15, lineHeight: 1.65, color: c.muted, marginBottom: 10 }}
                  >
                    {b}
                  </li>
                ))}
              </ul>
            ) : null}
            {section.nextHref ? (
              <a
                href={section.nextHref}
                style={{
                  fontSize: 15,
                  color: c.paper,
                  textDecoration: "none",
                  borderBottom: `1px solid rgba(240, 240, 238, 0.28)`,
                  paddingBottom: 2,
                }}
              >
                {section.nextLabel}
              </a>
            ) : null}
          </section>
        ))}

        <section
          id={anchorDocsMaturity.id}
          style={{
            padding: c.sectionPad,
            borderBottom: `1px solid ${c.line}`,
            scrollMarginTop: 80,
          }}
        >
          <MonoLabel>{anchorDocsMaturity.label}</MonoLabel>
          <h2 style={h2Style}>{anchorDocsMaturity.title}</h2>
          {anchorDocsMaturity.paragraphs.map((p) => (
            <p key={p.slice(0, 40)} style={bodyStyle}>
              {p}
            </p>
          ))}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 28 }}>
            <Link
              href="/anchor"
              style={{
                fontSize: 15,
                color: c.paper,
                textDecoration: "none",
                borderBottom: `1px solid rgba(240, 240, 238, 0.28)`,
                paddingBottom: 2,
              }}
            >
              ← Product overview
            </Link>
            <Link
              href="/anchor/docs/releases"
              style={{
                fontSize: 15,
                color: c.paper,
                textDecoration: "none",
                borderBottom: `1px solid rgba(240, 240, 238, 0.28)`,
                paddingBottom: 2,
              }}
            >
              Release notes →
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
    </>
  );
}
