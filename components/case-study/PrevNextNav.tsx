import Link from "next/link";

type NavItem = {
  slug: string;
  title: string;
  subtitle: string;
};

export default function PrevNextNav({
  prev,
  next,
  basePathPrefix = "/work/",
}: {
  prev?: NavItem;
  next?: NavItem;
  basePathPrefix?: string;
}) {
  if (!prev && !next) return null;

  return (
    <section style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px 120px" }}>
      <div className="grid-2" style={{ borderTop: "1px solid var(--border)", paddingTop: 40, gap: 24 }}>
        <div>
          {prev ? (
            <Link href={`${basePathPrefix}${prev.slug}`} className="case-study-nav-link" style={{ textDecoration: "none", color: "inherit" }}>
              <p style={{ fontSize: 12, color: "var(--fg-subtle)", marginBottom: 8 }}>← Previous</p>
              <p style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>{prev.title}</p>
              <p style={{ marginTop: 4, fontSize: 13, color: "var(--fg-muted)", lineHeight: 1.4 }}>{prev.subtitle}</p>
            </Link>
          ) : null}
        </div>
        <div className="next-item" style={{ textAlign: "right" }}>
          {next ? (
            <Link href={`${basePathPrefix}${next.slug}`} className="case-study-nav-link" style={{ textDecoration: "none", color: "inherit" }}>
              <p style={{ fontSize: 12, color: "var(--fg-subtle)", marginBottom: 8 }}>Next →</p>
              <p style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>{next.title}</p>
              <p style={{ marginTop: 4, fontSize: 13, color: "var(--fg-muted)", lineHeight: 1.4 }}>{next.subtitle}</p>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

