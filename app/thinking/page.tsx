import type { Metadata } from "next";
import Link from "next/link";
import PageCrumbHeader from "@/components/PageCrumbHeader";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "A small, curated set of essays and talks, organized by theme. Insight over frequency.",
  alternates: { canonical: "/thinking" },
  openGraph: {
    title: "Writing — John Ohio",
    description: "Essays and talks on enterprise product design, design systems, AI, and organizational design.",
    url: "/thinking",
    type: "article",
  },
};

const themes = [
  {
    label: "Enterprise Product Design",
    items: [
      {
        href: "/notes/design-doesnt-end-in-figma",
        title: "Design Doesn't End in Figma Anymore",
        meta: "Field note · Jul 2026",
        external: false,
      },
      {
        href: "https://techcabal.com/2026/02/13/john-ohio-quick-fire/",
        title: "Quick Fire: AI, enterprise design, and product craft",
        meta: "TechCabal · Feb 2026",
        external: true,
      },
    ],
  },
  {
    label: "Design Systems",
    items: [
      {
        href: "https://medium.com/@jon4ohio/every-team-thought-they-had-the-right-button-7efe792b0621?sk=19d5a14e80942e50912e71b77f60cca2",
        title: "Every Team Thought They Had the Right Button",
        meta: "Medium · Jul 2026",
        external: true,
      },
      {
        href: "https://theuxcompany.substack.com/p/design-tokens-the-connective-tissue",
        title: "Design tokens: the connective tissue",
        meta: "The UX Company · Substack",
        external: true,
      },
    ],
  },
  {
    label: "AI",
    items: [
      {
        href: "https://medium.com/@jon4ohio/projects-become-harder-to-understand-before-they-become-harder-to-code-a49540c19de5",
        title: "Projects Become Harder to Understand Before They Become Harder to Code",
        meta: "Medium · Jul 2026",
        external: true,
      },
      {
        href: "https://www.youtube.com/watch?v=k7KGv6FYIhM&t=1549s",
        title: "Embedding AI into Design Systems and Product Experiences",
        meta: "Talk · AIDA 2025",
        external: true,
      },
    ],
  },
  {
    label: "Organizational Design",
    items: [
      {
        href: "https://www.youtube.com/watch?v=9NG7TWiyIjo",
        title: "Design Thinking for Problem Solving: Beyond UX",
        meta: "Talk · GDG Lagos, DevFest 2024",
        external: true,
      },
    ],
  },
] as const;

export default function ThinkingPage() {
  return (
    <div style={{ paddingTop: 56 }}>
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "96px 24px 0" }}>
        <PageCrumbHeader backHref="/" crumbs={[{ href: "/", label: "Home" }, { label: "Writing" }]} />
        <h1
          style={{
            fontSize: "clamp(32px, 4.4vw, 52px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            maxWidth: 820,
            marginBottom: 20,
          }}
        >
          Ideas I contribute.
        </h1>
        <p style={{ fontSize: 17, color: "var(--fg-muted)", maxWidth: 640, lineHeight: 1.6 }}>
          A small, curated set of essays and talks, organized by theme. Insight over frequency.
        </p>
      </section>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 120px" }}>
        {themes.map((theme, themeIndex) => {
          const isLast = themeIndex === themes.length - 1;
          return (
            <div
              key={theme.label}
              style={{
                paddingBottom: isLast ? 0 : 56,
                borderBottom: isLast ? "none" : "1px solid var(--border)",
                marginBottom: isLast ? 0 : 56,
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--accent-orange)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 24,
                }}
              >
                {theme.label}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 760 }}>
                {theme.items.map((item) => {
                  const title = item.external ? `${item.title} ↗` : item.title;
                  const style = {
                    fontSize: 18,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    color: "var(--fg)",
                    lineHeight: 1.4,
                    textDecoration: "none" as const,
                  };
                  return (
                    <div key={item.href}>
                      {item.external ? (
                        <a href={item.href} target="_blank" rel="noreferrer" style={style}>
                          {title}
                        </a>
                      ) : (
                        <Link href={item.href} style={style}>
                          {title}
                        </Link>
                      )}
                      <p style={{ marginTop: 6, fontSize: 13, color: "var(--fg-subtle)" }}>{item.meta}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
