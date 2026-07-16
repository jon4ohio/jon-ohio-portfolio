import type { CSSProperties, ReactNode } from "react";
import { Link } from "@/components/ui/Link";
import ProjectListingPreview from "@/components/ProjectListingPreview";
import WorkInProgressBadge from "@/components/WorkInProgressBadge";
import type { Project } from "@/lib/projects";

export type WorkListMetric = { value: string; label: string };

export type WorkListRowProps = {
  href: string;
  title: string;
  company?: string;
  periodOrType?: string;
  /** Short line under the title (home pattern). */
  lead?: string;
  description?: string;
  metrics?: WorkListMetric[];
  badge?: ReactNode;
  index?: string;
  variant?: "featured" | "compact" | "home" | "experiment";
  /** When set, renders the project preview thumb from assets. */
  project?: Project;
  /** Smaller thumb + dashed border (Rivva homepage treatment). */
  highlight?: boolean;
  className?: string;
  /** Override row CTA (default: View case study →). Use for non–case-study destinations like Anchor. */
  ctaLabel?: string;
};

export default function WorkListRow({
  href,
  title,
  company,
  periodOrType,
  lead,
  description,
  metrics,
  badge,
  index,
  variant = "featured",
  project,
  highlight = false,
  className,
  ctaLabel = "View case study →",
}: WorkListRowProps) {
  if (variant === "compact") {
    return (
      <Link
        href={href}
        className={`work-list-row work-list-row--compact${className ? ` ${className}` : ""}`}
        aria-label={`${title}${lead || description ? ` — ${lead ?? description}` : ""}`}
      >
        <h3 className="work-list-compact-title">{title}</h3>
        <p className="work-list-compact-desc">{lead ?? description}</p>
        <span className="work-list-arrow" aria-hidden>
          →
        </span>
      </Link>
    );
  }

  const thumbMax = highlight ? 280 : variant === "experiment" ? 320 : 427;
  const titleSize = highlight ? 18 : variant === "experiment" ? 18 : 22;
  const hasMetrics = Boolean(metrics && metrics.length > 0);
  const metricCount = metrics?.length ?? 0;

  const row = (
    <Link
      href={href}
      className={`work-list-row${highlight ? " work-list-row--dashed" : ""}${hasMetrics ? " work-list-row--has-metrics" : ""}${className ? ` ${className}` : ""}`}
      aria-label={`${title}${periodOrType ? ` — ${periodOrType}` : ""}`}
      style={
        {
          ["--work-thumb-max" as string]: `${thumbMax}px`,
          ["--work-metric-count" as string]: String(Math.min(Math.max(metricCount, 1), 4)),
        } as CSSProperties
      }
    >
      {project ? (
        <div className={`work-list-thumb${highlight ? " work-list-thumb--sm" : ""}`}>
          <ProjectListingPreview slug={project.slug} title={title} assets={project.assets} />
        </div>
      ) : null}

      <div className="work-list-body">
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 10,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {company ? <span style={{ fontSize: 11, color: "var(--fg-subtle)" }}>{company}</span> : null}
          {company && periodOrType ? (
            <span aria-hidden style={{ fontSize: 11, color: "var(--accent-orange)" }}>
              ·
            </span>
          ) : null}
          {periodOrType ? <span style={{ fontSize: 11, color: "var(--fg-subtle)" }}>{periodOrType}</span> : null}
          {badge}
          {project?.workInProgress && !badge ? <WorkInProgressBadge /> : null}
        </div>

        <h3
          style={{
            fontSize: titleSize,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            marginBottom: 8,
            marginTop: 0,
            color: "var(--fg)",
          }}
        >
          {title}
        </h3>

        {lead ? (
          <p style={{ fontSize: 14, color: "var(--fg-muted)", marginBottom: 10 }}>{lead}</p>
        ) : null}

        {description ? (
          <p
            className="work-list-desc"
            style={{
              fontSize: 14,
              color: "var(--fg-body-muted)",
              lineHeight: 1.65,
              maxWidth: 720,
              marginBottom: hasMetrics ? 14 : 12,
            }}
          >
            {description}
          </p>
        ) : null}

        {/* Metric pills (list layout at all breakpoints) */}
        {hasMetrics ? (
          <div className="metric-badges work-list-metrics">
            {metrics!.map((m) => (
              <div key={`${m.value}-${m.label}`} className="metric-badge work-list-metric">
                {m.value ? <span className="metric-badge__value">{m.value}</span> : null}
                <span className="metric-badge__label">{m.label}</span>
              </div>
            ))}
          </div>
        ) : null}

        <span className="work-list-cta">{ctaLabel}</span>
      </div>
    </Link>
  );

  if (index) {
    return (
      <div className="work-list-item">
        <span className="work-list-idx">{index}</span>
        {row}
      </div>
    );
  }

  return <div className="work-list-item work-list-item--no-idx">{row}</div>;
}
