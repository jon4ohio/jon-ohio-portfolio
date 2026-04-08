import Link from "next/link";

type TitleSegment = { label: string; slug: string };

type SystemGroup = {
  categoryLabel: string;
  titleSegments: TitleSegment[];
  description: string;
};

const groups: SystemGroup[] = [
  {
    categoryLabel: "Structured → Scalable → Intelligent",
    titleSegments: [{ label: "SeamlessHiring", slug: "seamless-hiring" }],
    description:
      "Rebuilding a fragmented recruitment system into a scalable, AI-powered platform.",
  },
  {
    categoryLabel: "Organizational Scale",
    titleSegments: [{ label: "Seamkit", slug: "seamkit" }],
    description:
      "Designing the system that unified 12 product teams through shared tokens, components, and governance.",
  },
  {
    categoryLabel: "Operational Systems",
    titleSegments: [
      { label: "FetsProza", slug: "fetsproza" },
      { label: "IBEDC", slug: "ibedc" },
      { label: "ABMS", slug: "abms" },
    ],
    description:
      "Designing infrastructure systems under real-world constraints across fintech and utilities.",
  },
  {
    categoryLabel: "Intelligent Systems",
    titleSegments: [
      { label: "Rivva", slug: "rivva" },
      { label: "SeamlessAI", slug: "seamless-ai" },
    ],
    description: "Embedding AI into product workflows to support decisions and improve outcomes.",
  },
  {
    categoryLabel: "0 → 1 Systems",
    titleSegments: [
      { label: "ClearPrice", slug: "clearprice" },
      { label: "BluAlliance", slug: "blualliance" },
    ],
    description: "Defining and designing products from ambiguity to validated system direction.",
  },
];

export default function SelectedSystems() {
  return (
    <section
      aria-labelledby="selected-systems-heading"
      style={{ maxWidth: 1120, margin: "0 auto", padding: "120px 24px 0" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <h2
          id="selected-systems-heading"
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            maxWidth: 640,
          }}
        >
          Selected systems
        </h2>
        <Link href="/work" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}>
          View all →
        </Link>
      </div>
      <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.6, maxWidth: 720, marginBottom: 48 }}>
        Systems I&apos;ve designed across different stages of scale, structure, and intelligence.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {groups.map((group, gi) => (
          <div
            key={group.categoryLabel}
            style={{
              padding: "32px 0",
              borderTop: "1px solid #e5e7eb",
              borderBottom: gi === groups.length - 1 ? "1px solid #e5e7eb" : "none",
            }}
            className="grid-systems-group"
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "#9ca3af",
                letterSpacing: "0.06em",
                paddingTop: 4,
              }}
            >
              {group.categoryLabel}
            </p>
            <div>
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.35,
                  marginBottom: 8,
                }}
              >
                {group.titleSegments.map((seg, si) => (
                  <span key={seg.slug}>
                    {si > 0 ? (
                      <span style={{ color: "#9ca3af", fontWeight: 500 }} aria-hidden="true">
                        {" "}
                        ·{" "}
                      </span>
                    ) : null}
                    <Link
                      href={`/work/${seg.slug}`}
                      className="selected-systems-title-link"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {seg.label}
                    </Link>
                  </span>
                ))}
              </p>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.6 }}>{group.description}</p>
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.6, maxWidth: 720, marginTop: 48 }}>
        These systems don&apos;t scale by design alone — they scale through the systems behind how teams
        work.
      </p>
    </section>
  );
}
