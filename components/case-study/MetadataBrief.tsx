import * as React from "react";

export type MetadataBlock = { label: string; value: string | string[] };

export type MetadataBriefProps = {
  blocks: MetadataBlock[];
  led: string[];
  partneredOn: string[];
  productImpact: Array<{ value: string; label: string }>;
  commercialShiftTop: string;
  commercialShiftBottom: string;
  mobileSummary: Array<{ label: string; value: string }>;
};

function MicroLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "var(--fg-subtle)",
        marginBottom: 4,
      }}
    >
      {children}
    </p>
  );
}

function ValueText({ children, marginBottom = 20 }: { children: React.ReactNode; marginBottom?: number }) {
  return (
    <div style={{ fontSize: 13, color: "var(--fg-body)", lineHeight: 1.6, marginBottom }}>
      {children}
    </div>
  );
}

export default function MetadataBrief({
  blocks,
  led,
  partneredOn,
  productImpact,
  commercialShiftTop,
  commercialShiftBottom,
  mobileSummary,
}: MetadataBriefProps) {
  return (
    <section id="brief" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
      <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
        01 Project Brief
      </p>

      {/* Mobile summary card */}
      <div className="case-study-brief-mobile">
        <div
          style={{
            marginTop: 24,
            border: "1px solid var(--border)",
            borderRadius: 8,
            background: "var(--surface-subtle)",
            padding: 20,
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
            {mobileSummary.map((row) => (
              <div key={row.label}>
                <MicroLabel>{row.label}</MicroLabel>
                <ValueText marginBottom={0}>{row.value}</ValueText>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 64, marginTop: 32, alignItems: "flex-start" }}>
        {/* Sticky rail */}
        <div className="case-study-brief-rail">
          <div
            style={{
              position: "sticky",
              top: 100,
              alignSelf: "flex-start",
              width: 220,
              flexShrink: 0,
            }}
          >
            {blocks.map((b) => (
              <div key={b.label}>
                <MicroLabel>{b.label}</MicroLabel>
                <ValueText>
                  {Array.isArray(b.value) ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {b.value.map((v) => (
                        <span key={v}>{v}</span>
                      ))}
                    </div>
                  ) : (
                    b.value
                  )}
                </ValueText>
              </div>
            ))}

            <div style={{ borderTop: "1px solid var(--border)", margin: "20px 0" }} />

            <MicroLabel>Led</MicroLabel>
            <ValueText>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {led.map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>
            </ValueText>

            <MicroLabel>Partnered on</MicroLabel>
            <ValueText marginBottom={0}>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {partneredOn.map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>
            </ValueText>
          </div>
        </div>

        {/* Impact column */}
        <div style={{ flex: 1, minWidth: 0, maxWidth: 760 }}>
          <MicroLabel>Product impact</MicroLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {productImpact.map((m) => (
              <div key={m.label} style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.6 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: "var(--fg)" }}>{m.value}</span>
                <span style={{ margin: "0 10px", color: "var(--fg-subtle)" }}>—</span>
                <span>{m.label}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32 }}>
            <MicroLabel>Commercial shift</MicroLabel>
            <div style={{ fontSize: 24, fontWeight: 700, color: "var(--fg)", lineHeight: 1.2 }}>
              <div>{commercialShiftTop}</div>
              <div>{commercialShiftBottom}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

