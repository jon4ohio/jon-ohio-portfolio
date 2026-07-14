import { Link } from "@/components/ui/Link";

export type CrumbItem = {
  label: string;
  /** When set, crumb is a link; omit for the current page. */
  href?: string;
};

export type PageCrumbHeaderProps = {
  /** Parent destination for the subtle ← Back control. */
  backHref: string;
  crumbs: CrumbItem[];
};

export default function PageCrumbHeader({ backHref, crumbs }: PageCrumbHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
        marginBottom: 20,
      }}
    >
      <Link
        href={backHref}
        className="page-crumb-back"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          fontSize: 13,
          color: "var(--fg-subtle)",
          textDecoration: "none",
          flexShrink: 0,
          transition: "color 0.15s",
        }}
      >
        ← Back
      </Link>
      <span aria-hidden style={{ color: "var(--fg-subtle)", fontSize: 13, lineHeight: 1 }}>
        ·
      </span>
      <nav
        aria-label="Breadcrumb"
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10,
          fontSize: 12,
          minWidth: 0,
        }}
      >
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <span key={`${crumb.label}-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              {i > 0 ? (
                <span aria-hidden style={{ color: "var(--fg-subtle)" }}>
                  /
                </span>
              ) : null}
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="page-crumb-link"
                  style={{
                    color: "var(--fg-subtle)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  style={{
                    color: "var(--fg-muted)",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                  aria-current={isLast ? "page" : undefined}
                >
                  {crumb.label}
                </span>
              )}
            </span>
          );
        })}
      </nav>
    </div>
  );
}
