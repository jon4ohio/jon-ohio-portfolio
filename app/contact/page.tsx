import type { Metadata } from "next";
import PageCrumbHeader from "@/components/PageCrumbHeader";
import { getContactMailtoHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Product Design Lead based in Nigeria, available for remote work and open to relocation. Let's talk about what your team is scaling.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — John Ohio",
    description: "Let's talk about what your team is scaling.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  const mailtoHref = getContactMailtoHref();

  return (
    <div
      style={{
        paddingTop: 56,
        minHeight: "calc(100vh - 56px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <section
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "96px 24px",
          width: "100%",
          flex: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: 760 }}>
          <PageCrumbHeader backHref="/" crumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]} />
          <h1
            style={{
              fontSize: "clamp(32px, 4.4vw, 52px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.12,
              marginBottom: 24,
            }}
          >
            Let&apos;s talk about what your team is scaling.
          </h1>
          <p style={{ fontSize: 17, color: "var(--fg-muted)", lineHeight: 1.7, marginBottom: 40 }}>
            I&apos;m a Product Design Lead based in Nigeria, available for remote work and open to relocation. One
            email is all it takes.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <a
              href={mailtoHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--surface-emphasis)",
                color: "var(--fg-on-emphasis)",
                fontSize: 15,
                fontWeight: 500,
                padding: "14px 28px",
                borderRadius: 8,
                textDecoration: "none",
              }}
            >
              jon4ohio@gmail.com →
            </a>
            <a
              href="https://linkedin.com/in/jon4ohio"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 14, color: "var(--fg-muted)", textDecoration: "none" }}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
