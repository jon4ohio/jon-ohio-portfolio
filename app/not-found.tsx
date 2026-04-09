import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found",
  description: "The page you are looking for does not exist.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div style={{ paddingTop: 56 }}>
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "120px 24px 120px" }}>
        <p className="section-label" style={{ marginBottom: 16 }}>
          404
        </p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }}>
          Page not found
        </h1>
        <p style={{ fontSize: 17, color: "var(--fg-muted)", lineHeight: 1.7, maxWidth: 620, marginBottom: 32 }}>
          The page you requested does not exist or may have moved. Use the links below to continue exploring.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--fg)",
              color: "var(--bg)",
              fontSize: 14,
              fontWeight: 500,
              padding: "12px 24px",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            Back home
          </Link>
          <Link
            href="/work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "transparent",
              color: "var(--fg)",
              fontSize: 14,
              fontWeight: 500,
              padding: "12px 24px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              textDecoration: "none",
            }}
          >
            View work
          </Link>
        </div>
      </section>
    </div>
  );
}
