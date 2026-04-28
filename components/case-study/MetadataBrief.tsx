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

const cardSurface: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  padding: 20,
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

function MicroLabelMuted({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "var(--fg-subtle)",
        display: "block",
        marginBottom: 12,
      }}
    >
      {children}
    </span>
  );
}

function ValueTextDesktop({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 13, color: "var(--fg-body)", lineHeight: 1.6, marginBottom: 24 }}>{children}</div>;
}

function ValueMobile({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 14, color: "var(--fg-body)", lineHeight: 1.6 }}>{children}</div>;
}

function getBlock(blocks: MetadataBlock[], label: string): MetadataBlock | undefined {
  return blocks.find((b) => b.label.toLowerCase() === label.toLowerCase());
}

function formatScope(blocks: MetadataBlock[]): string {
  const s = getBlock(blocks, "Scope");
  if (!s) return "";
  return Array.isArray(s.value) ? s.value.join(" · ") : s.value;
}

export default function MetadataBrief({
  blocks,
  led,
  partneredOn,
  productImpact,
  commercialShiftTop,
  commercialShiftBottom,
}: MetadataBriefProps) {
  const role = getBlock(blocks, "Role");
  const scopeText = formatScope(blocks);
  const timeline = getBlock(blocks, "Timeline");
  const domain = getBlock(blocks, "Domain");

  const basicsRows = (
    <>
      {role ? (
        <div style={{ marginBottom: 16 }}>
          <MicroLabel>Role</MicroLabel>
          <ValueMobile>{typeof role.value === "string" ? role.value : role.value.join(", ")}</ValueMobile>
        </div>
      ) : null}
      {scopeText ? (
        <div style={{ marginBottom: 16 }}>
          <MicroLabel>Scope</MicroLabel>
          <ValueMobile>{scopeText}</ValueMobile>
        </div>
      ) : null}
      {timeline ? (
        <div style={{ marginBottom: 16 }}>
          <MicroLabel>Timeline</MicroLabel>
          <ValueMobile>{typeof timeline.value === "string" ? timeline.value : timeline.value.join(", ")}</ValueMobile>
        </div>
      ) : null}
      {domain ? (
        <div style={{ marginBottom: 0 }}>
          <MicroLabel>Domain</MicroLabel>
          <ValueMobile>{typeof domain.value === "string" ? domain.value : domain.value.join(", ")}</ValueMobile>
        </div>
      ) : null}
    </>
  );

  const ledJoined = led.join(" · ");
  const partneredJoined = partneredOn.join(" · ");

  return (
    <section id="brief" style={{ maxWidth: 1240, margin: "0 auto", padding: "60px 24px 0" }}>
      <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
        01 Project Brief
      </p>

      {/* Mobile: four stacked cards — single representation on narrow viewports (hidden on desktop via page-scoped CSS) */}
      <div className="case-study-brief-mobile" style={{ marginTop: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={cardSurface}>
            {basicsRows}
          </div>

          <div style={cardSurface}>
            <MicroLabelMuted>Product Impact</MicroLabelMuted>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {productImpact.map((m) => (
                <div key={m.label} style={{ fontSize: 13, color: "var(--fg-muted)", lineHeight: 1.6 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "var(--fg)" }}>{m.value}</span>
                  <span style={{ margin: "0 8px", color: "var(--fg-subtle)" }}>—</span>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={cardSurface}>
            <MicroLabelMuted>Commercial Shift</MicroLabelMuted>
            <div style={{ fontSize: 20, fontWeight: 700, color: "var(--fg)", lineHeight: 1.4 }}>{commercialShiftTop}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "var(--fg)", lineHeight: 1.4, marginTop: 4 }}>
              {commercialShiftBottom}
            </div>
          </div>

          <div style={cardSurface}>
            <MicroLabel>Led</MicroLabel>
            <ValueMobile>
              <div style={{ marginBottom: 16 }}>{ledJoined}</div>
            </ValueMobile>
            <MicroLabel>Partnered on</MicroLabel>
            <ValueMobile>{partneredJoined}</ValueMobile>
          </div>
        </div>
      </div>

      {/* Desktop: two-column flex — entire row uses .case-study-brief-rail so page CSS hides it on mobile */}
      <div
        className="case-study-brief-rail"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 64,
          marginTop: 32,
          alignItems: "flex-start",
        }}
      >
        <div style={{ width: 240, flexShrink: 0 }}>
          <div
            style={{
              position: "sticky",
              top: 100,
              alignSelf: "flex-start",
            }}
          >
            {blocks.map((b) => (
              <React.Fragment key={b.label}>
                <MicroLabel>{b.label}</MicroLabel>
                <ValueTextDesktop>
                  {Array.isArray(b.value) ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {b.value.map((v) => (
                        <span key={v}>{v}</span>
                      ))}
                    </div>
                  ) : (
                    b.value
                  )}
                </ValueTextDesktop>
              </React.Fragment>
            ))}

            <div style={{ borderTop: "1px solid var(--border)", margin: "20px 0" }} />

            <MicroLabel>Led</MicroLabel>
            <ValueTextDesktop>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {led.map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>
            </ValueTextDesktop>

            <MicroLabel>Partnered on</MicroLabel>
            <div style={{ fontSize: 13, color: "var(--fg-body)", lineHeight: 1.6, marginBottom: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {partneredOn.map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 0, maxWidth: 760 }}>
          <MicroLabel>Product impact</MicroLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 0 }}>
            {productImpact.map((m) => (
              <div key={m.label} style={{ fontSize: 13, color: "var(--fg-muted)", lineHeight: 1.6 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: "var(--fg)" }}>{m.value}</span>
                <span style={{ margin: "0 8px", color: "var(--fg-subtle)" }}>—</span>
                <span>{m.label}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "20px 24px",
              marginTop: 32,
            }}
          >
            <span
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--fg-subtle)",
                display: "block",
                marginBottom: 12,
              }}
            >
              Commercial Shift
            </span>
            <div style={{ fontSize: 22, fontWeight: 700, color: "var(--fg)", lineHeight: 1.4 }}>{commercialShiftTop}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "var(--fg)", lineHeight: 1.4, marginTop: 4 }}>
              {commercialShiftBottom}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
