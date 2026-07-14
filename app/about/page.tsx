import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageCrumbHeader from "@/components/PageCrumbHeader";
import { aboutCredibilityLine, aboutHeadline, aboutPositioningLine } from "@/lib/sitePositioning";
import { aboutTimeline } from "@/lib/aboutNarrative";
import { getContactMailtoHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "About",
  description:
    "John Ohio — Product Design Lead. Enterprise products, design systems, and AI experiences. Speaker, writer, and mentor.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About",
    description: "Product Design Lead — designing systems that help products and teams scale.",
    url: "/about",
    type: "profile",
  },
};

const howIThink = [
  {
    n: "01",
    title: "Understand",
    body: "Understand the product, people, and business before proposing solutions.",
  },
  {
    n: "02",
    title: "Simplify",
    body: "Reduce complexity to the decisions that matter.",
  },
  {
    n: "03",
    title: "Standardize",
    body: "Turn successful decisions into reusable patterns.",
  },
  {
    n: "04",
    title: "Scale",
    body: "Help teams build consistently through shared systems.",
  },
] as const;

export default function About() {
  const mailtoHref = getContactMailtoHref();

  return (
    <div style={{ paddingTop: 56 }}>
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "96px 24px 0" }}>
        <PageCrumbHeader backHref="/" crumbs={[{ href: "/", label: "Home" }, { label: "About" }]} />
        <div className="about-intro-grid">
          <div>
            <h1
              style={{
                fontSize: "clamp(32px, 4.4vw, 52px)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.12,
                marginBottom: 28,
              }}
            >
              {aboutHeadline}
            </h1>
            <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, marginBottom: 20 }}>
              {aboutPositioningLine}
            </p>
            <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, marginBottom: 20 }}>
              Today I work at the intersection of product design, systems thinking, and AI, helping organizations
              build products that are easier to use, easier to maintain, and easier to grow.
            </p>
            <p style={{ fontSize: 13, color: "var(--fg-subtle)", lineHeight: 1.6 }}>{aboutCredibilityLine}</p>
          </div>
          <div
            style={{
              position: "relative",
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid var(--border-subtle)",
              background: "var(--surface)",
              aspectRatio: "4 / 5",
              minHeight: 280,
            }}
          >
            <Image
              src="/assets/about/about-intro.jpg"
              alt="John Ohio"
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 0" }}>
        <p className="section-label" style={{ marginBottom: 20 }}>
          How I Think
        </p>
        <h2
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: 48,
            maxWidth: 720,
          }}
        >
          The same operating model, every time.
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 32,
          }}
        >
          {howIThink.map((step) => (
            <div key={step.n} style={{ borderTop: "1px solid var(--border)", paddingTop: 20 }}>
              <p style={{ fontSize: 12, color: "var(--fg-subtle)", marginBottom: 10 }}>{step.n}</p>
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8, letterSpacing: "-0.01em" }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.65 }}>{step.body}</p>
            </div>
          ))}
        </div>
        <p
          style={{
            fontSize: 15,
            color: "var(--fg-muted)",
            lineHeight: 1.7,
            maxWidth: 720,
            marginTop: 40,
            paddingTop: 32,
            borderTop: "1px solid var(--border)",
          }}
        >
          This model runs through every case study on this site. The homepage states it. The work proves it.
        </p>
      </section>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 0" }}>
        <p className="section-label" style={{ marginBottom: 24 }}>
          Experience
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {aboutTimeline.map((t, i) => (
            <div
              key={`${t.year}-${t.org}-${i}`}
              className="about-timeline-row"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(96px, 110px) 1fr",
                gap: 16,
                padding: "14px 0",
                borderTop: "1px solid var(--border)",
                borderBottom: i === aboutTimeline.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <span style={{ fontSize: 12, color: "var(--fg-subtle)", paddingTop: 2 }}>{t.year}</span>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 500 }}>{t.role}</p>
                <p style={{ fontSize: 13, color: "var(--fg-muted)" }}>{t.org}</p>
                {t.org === "The UX Company" ? (
                  <p style={{ fontSize: 13, color: "var(--fg-muted)", marginTop: 6, lineHeight: 1.6 }}>
                    Independent practice. Product design, design systems, and UX strategy engagements across fintech,
                    enterprise SaaS, and early-stage startups in Nigeria and remote markets.
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 0" }}>
        <div style={{ maxWidth: 720 }}>
          <p className="section-label" style={{ marginBottom: 20 }}>
            Beyond Delivery
          </p>
          <h2
            style={{
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: 24,
            }}
          >
            Teaching what I practice.
          </h2>
          <p style={{ fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75, marginBottom: 20 }}>
            I speak about design systems and AI at events like DevFest Lagos and AIDA, write about enterprise product
            design, and mentor designers building careers in African product companies. The through line is the same as
            the work: making complex things understandable.
          </p>
          <Link href="/thinking" style={{ fontSize: 14, fontWeight: 500, color: "var(--accent-orange)", textDecoration: "none" }}>
            Read my writing →
          </Link>
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 120px" }}>
        <div style={{ maxWidth: 760, borderTop: "1px solid var(--border)", paddingTop: 40 }}>
          <p
            style={{
              fontSize: "clamp(20px, 2.6vw, 26px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.35,
              marginBottom: 28,
            }}
          >
            If this way of working sounds like what your team needs, I&apos;d like to hear about it.
          </p>
          <a
            href={mailtoHref}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--surface-emphasis)",
              color: "var(--fg-on-emphasis)",
              fontSize: 14,
              fontWeight: 500,
              padding: "14px 28px",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            jon4ohio@gmail.com →
          </a>
        </div>
      </section>
    </div>
  );
}
