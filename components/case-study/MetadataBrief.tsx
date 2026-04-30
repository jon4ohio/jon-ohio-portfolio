import * as React from "react";

export type MetadataBlock = { label: string; value: string | string[] };

export type MetadataBriefProps = {
  blocks: MetadataBlock[];
  led: string[];
  partneredOn: string[];
  productImpact: Array<{ value: string; label: string }>;
  commercialShiftTop: string;
  commercialShiftBottom: string;
};

const cardBase: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  padding: "20px 22px",
};

const mutedCardBase: React.CSSProperties = { ...cardBase, background: "var(--surface-subtle)" };

const mobileCardBase: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  padding: 20,
};

const sectionLabelStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--fg-subtle)",
  display: "block",
  marginBottom: 16,
};

const rowLabelStyle: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--fg-subtle)",
  marginBottom: 3,
};

const rowValueStyle: React.CSSProperties = {
  fontSize: 13,
  color: "var(--fg-body)",
  lineHeight: 1.6,
  marginBottom: 12,
  overflowWrap: "anywhere",
};

const mobileImpactRow: React.CSSProperties = {
  fontSize: 13,
  color: "var(--fg-muted)",
  lineHeight: 1.6,
  overflowWrap: "anywhere",
};

const mobileImpactValue: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 700,
  color: "var(--fg)",
};

function RowValue({
  children,
  marginBottom = 12,
}: {
  children: React.ReactNode;
  marginBottom?: number;
}) {
  return <div style={{ ...rowValueStyle, marginBottom }}>{children}</div>;
}

function getBlock(blocks: MetadataBlock[], label: string): MetadataBlock | undefined {
  return blocks.find((b) => b.label.toLowerCase() === label.toLowerCase());
}

function impactStackDesc(rawLabel: string): string {
  const label = rawLabel.toLowerCase();
  if (label.includes("support")) return "Support volume";
  if (label.includes("nps")) return "NPS";
  if (label.includes("completion")) return "Completion rate";
  return rawLabel;
}

export default function MetadataBrief({
  blocks,
  led,
  partneredOn,
  productImpact,
  commercialShiftTop,
  commercialShiftBottom,
}: MetadataBriefProps) {
  const mobileBasicsBlocks = blocks.filter((b) => b.label.toLowerCase() !== "team");
  const bottomLine = commercialShiftBottom.replace(/^→\s*/, "");
  const hasBottomLine = bottomLine.trim().length > 0;
  const ledJoined = led.join(" · ");
  const partneredJoined = partneredOn.join(" · ");

  return (
    <section id="brief" style={{ maxWidth: 1240, margin: "0 auto", padding: "48px 24px 0" }}>
      {/* Mobile (≤768px) */}
      <div className="brief-mobile" style={{ marginTop: 24 }}>
        <div style={{ ...mobileCardBase, width: "100%", minWidth: 0 }}>
          <span style={sectionLabelStyle}>01 Executive Brief</span>
          {mobileBasicsBlocks.map((b, i) => (
            <div key={b.label}>
              <div style={rowLabelStyle}>{b.label}</div>
              <RowValue marginBottom={i === mobileBasicsBlocks.length - 1 ? 0 : 12}>
                {Array.isArray(b.value) ? b.value.join(" · ") : b.value}
              </RowValue>
            </div>
          ))}
        </div>

        <div style={{ ...mobileCardBase, width: "100%", minWidth: 0 }}>
          <span style={sectionLabelStyle}>Product impact</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {productImpact.map((m) => (
              <div key={m.label} style={mobileImpactRow}>
                <span style={mobileImpactValue}>{m.value}</span>
                <span style={{ margin: "0 8px", color: "var(--fg-subtle)" }}>—</span>
                <span>{impactStackDesc(m.label)}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...mobileCardBase, width: "100%", minWidth: 0 }}>
          <span style={sectionLabelStyle}>Commercial shift</span>
          <div style={{ fontSize: 20, fontWeight: 700, color: "var(--fg)", lineHeight: 1.4 }}>{commercialShiftTop}</div>
          {hasBottomLine ? (
            <div style={{ fontSize: 20, fontWeight: 700, color: "var(--fg)", lineHeight: 1.4, marginTop: 4 }}>{bottomLine}</div>
          ) : null}
        </div>

        <div style={{ ...mobileCardBase, width: "100%", minWidth: 0 }}>
          <span style={sectionLabelStyle}>Contribution scope</span>
          <div style={{ marginBottom: 14 }}>
            <div style={rowLabelStyle}>Led</div>
            <div style={{ fontSize: 14, color: "var(--fg-body)", lineHeight: 1.6 }}>{ledJoined}</div>
          </div>
          <div>
            <div style={rowLabelStyle}>Partnered on</div>
            <div style={{ fontSize: 14, color: "var(--fg-body)", lineHeight: 1.6 }}>{partneredJoined}</div>
          </div>
        </div>
      </div>

      {/* Desktop bento (≥769px) */}
      <div
        className="brief-bento"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(280px, 1.15fr) 1fr 1fr",
          gridTemplateRows: "auto auto",
          gridTemplateAreas: "'basics impact commercial' 'basics contribution contribution'",
          gap: 16,
          marginTop: 24,
        }}
      >
        <div style={{ gridArea: "basics", ...cardBase }}>
          <span style={sectionLabelStyle}>01 Executive Brief</span>
          {blocks.map((b, i) => (
            <div key={b.label}>
              <div style={rowLabelStyle}>{b.label}</div>
              <RowValue marginBottom={i === blocks.length - 1 ? 0 : 12}>
                {Array.isArray(b.value) ? b.value.join(" · ") : b.value}
              </RowValue>
            </div>
          ))}
        </div>

        <div style={{ gridArea: "impact", ...cardBase }}>
          <span style={sectionLabelStyle}>Product impact</span>
          {productImpact.map(({ value, label }, idx) => (
            <div key={value} style={{ marginBottom: idx === productImpact.length - 1 ? 0 : 18 }}>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: "var(--fg)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--fg-subtle)",
                  marginTop: 2,
                  letterSpacing: "0.01em",
                }}
              >
                {impactStackDesc(label)}
              </div>
            </div>
          ))}
        </div>

        <div style={{ gridArea: "commercial", ...mutedCardBase }}>
          <span style={sectionLabelStyle}>Commercial shift</span>
          <div style={{ fontSize: 15, fontWeight: 500, color: "var(--fg)", lineHeight: 1.4 }}>{commercialShiftTop}</div>
          {hasBottomLine ? (
            <>
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 600,
                  color: "var(--fg)",
                  lineHeight: 1,
                  margin: "10px 0 8px",
                }}
              >
                →
              </div>
              <div style={{ fontSize: 15, fontWeight: 500, color: "var(--fg)", lineHeight: 1.4 }}>{bottomLine}</div>
            </>
          ) : null}
        </div>

        <div style={{ gridArea: "contribution", ...mutedCardBase }}>
          <span style={sectionLabelStyle}>Contribution scope</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <div style={rowLabelStyle}>Led</div>
              <div style={{ fontSize: 12, color: "var(--fg-body)", lineHeight: 1.75 }}>
                {led.map((line) => (
                  <React.Fragment key={line}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div>
              <div style={rowLabelStyle}>Partnered on</div>
              <div style={{ fontSize: 12, color: "var(--fg-body)", lineHeight: 1.75 }}>
                {partneredOn.map((line) => (
                  <React.Fragment key={line}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
