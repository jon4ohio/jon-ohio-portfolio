import Link from "next/link";
import Image from "next/image";

export type CaseStudyRowProps = {
  index: number;
  title: string;
  subtitle: string;
  summary: string;
  metrics: string[];
  role: string;
  href: string;
  image: string;
};

function parseMetric(metric: string): { value: string; label?: string } {
  const trimmed = metric.trim();
  const firstSpace = trimmed.indexOf(" ");
  if (firstSpace === -1) return { value: trimmed };
  const value = trimmed.slice(0, firstSpace).trim();
  const label = trimmed.slice(firstSpace + 1).trim();
  return label ? { value, label } : { value };
}

export default function CaseStudyRow({
  index,
  title,
  subtitle,
  summary,
  metrics,
  role,
  href,
  image,
}: CaseStudyRowProps) {
  const topMetrics = metrics.slice(0, 3);

  return (
    <div className="work-list-item">
      <span className="work-list-idx">{String(index).padStart(2, "0")}</span>
      <Link href={href} className="work-list-row" aria-label={`${title} — ${subtitle}`}>
        <div className="work-list-thumb">
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid var(--border)",
              background: "var(--surface)",
            }}
          >
            <Image
              src={image}
              alt={`${title} — cover`}
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 900px) 356px, 427px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="work-list-body">
          <h3
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              marginBottom: 8,
              marginTop: 0,
            }}
          >
            {title}
          </h3>
          <p style={{ fontSize: 14, color: "var(--fg-muted)", marginBottom: 10 }}>{subtitle}</p>

          <p
            style={{
              fontSize: 14,
              color: "var(--fg-body-muted)",
              lineHeight: 1.65,
              maxWidth: 720,
              marginBottom: 12,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {summary}
          </p>

          <div className="metric-badges" style={{ marginBottom: 12 }}>
            {topMetrics.map((m) => {
              const parsed = parseMetric(m);
              return (
              <div key={m} className="metric-badge">
                <span className="metric-badge__value">{parsed.value}</span>
                {parsed.label ? <span className="metric-badge__label">{parsed.label}</span> : null}
              </div>
              );
            })}
          </div>

          <p style={{ fontSize: 13, color: "var(--fg-subtle)", lineHeight: 1.55 }}>{role}</p>
        </div>

        <div
          className="work-list-arrow"
          style={{ color: "var(--fg-subtle)", fontSize: 16, paddingTop: 4, paddingRight: 32 }}
          aria-hidden
        >
          →
        </div>
      </Link>
    </div>
  );
}

