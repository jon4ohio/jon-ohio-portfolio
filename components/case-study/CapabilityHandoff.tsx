import * as React from "react";
import Link from "next/link";

export default function CapabilityHandoff({
  domains,
  nextHref,
  nextTitle,
}: {
  domains: string[];
  nextHref: string;
  nextTitle: string;
}) {
  return (
    <section
      style={{
        maxWidth: 1240,
        margin: "64px auto 0",
        padding: "48px 24px",
        background: "var(--surface-subtle)",
      }}
    >
      <div style={{ maxWidth: 720 }}>
        <p
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--fg-subtle)",
            marginBottom: 14,
          }}
        >
          Handoff to platform strategy
        </p>
        <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, marginBottom: 28 }}>
          The architecture became the handoff layer between workforce research and product strategy — eight capability
          domains product teams could prioritise without re-litigating the research foundation.
        </p>
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: "none",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 10,
            marginBottom: 32,
          }}
        >
          {domains.map((domain) => (
            <li
              key={domain}
              style={{
                fontSize: 14,
                color: "var(--fg-strong)",
                padding: "10px 14px",
                border: "1px solid var(--border)",
                borderRadius: 8,
                background: "var(--surface)",
              }}
            >
              {domain}
            </li>
          ))}
        </ul>
        <div style={{ textAlign: "center", paddingTop: 8 }}>
          <span style={{ fontSize: 24, color: "var(--fg-subtle)", display: "block", marginBottom: 16 }} aria-hidden>
            ↓
          </span>
          <Link
            href={nextHref}
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "var(--fg)",
              textDecoration: "underline",
              textUnderlineOffset: 4,
            }}
          >
            See {nextTitle} →
          </Link>
        </div>
      </div>
    </section>
  );
}
