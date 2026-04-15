import Link from "next/link";
import { homepageThinkingPreviews } from "@/lib/thinking";

export default function ThinkingHomeTeaser() {
  return (
    <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 0" }}>
      <p className="section-label" style={{ marginBottom: 12 }}>
        Beyond the work
      </p>
      <h2
        style={{
          fontSize: "clamp(24px, 3vw, 36px)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          marginBottom: 12,
          maxWidth: 720,
        }}
      >
        Design + thinking + conversation
      </h2>
      <p style={{ fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.65, maxWidth: 560, marginBottom: 32 }}>
        Writing on systems, interviews on AI and enterprise design, and recognition across Africa&apos;s tech ecosystem.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 28 }}>
        {homepageThinkingPreviews.map((row, i) => (
          <Link
            key={row.anchor}
            href={`/thinking#${row.anchor}`}
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
              padding: "18px 0",
              borderTop: "1px solid var(--border)",
              borderBottom: i === homepageThinkingPreviews.length - 1 ? "1px solid var(--border)" : "none",
              textDecoration: "none",
              color: "inherit",
              transition: "background 0.12s ease",
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 500, color: "var(--fg-subtle)", minWidth: "7rem" }}>{row.outlet}</span>
            <span style={{ fontSize: 15, color: "var(--fg-strong)", flex: 1, minWidth: 0 }}>{row.line}</span>
            <span style={{ fontSize: 13, color: "var(--fg-subtle)", flexShrink: 0 }}>→</span>
          </Link>
        ))}
      </div>

      <Link
        href="/thinking"
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: "var(--accent-orange)",
          textDecoration: "none",
        }}
      >
        Read more →
      </Link>
    </section>
  );
}
