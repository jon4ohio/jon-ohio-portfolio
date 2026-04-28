import * as React from "react";

export interface OutcomeTier {
  category: string;
  items: string[];
}

function Micro({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)", marginBottom: 16 }}>
      {children}
    </div>
  );
}

function renderItem(item: string) {
  const parts = item.split("—");
  if (parts.length < 2) return <span>{item}</span>;
  const value = parts[0].trim();
  const rest = parts.slice(1).join("—").trim();
  return (
    <span>
      <strong style={{ fontWeight: 700, color: "var(--fg)" }}>{value}</strong>
      <span style={{ color: "var(--fg-subtle)" }}> — </span>
      <span>{rest}</span>
    </span>
  );
}

export default function OutcomeCards({ tiers }: { tiers: OutcomeTier[] }) {
  return (
    <div className="grid-2" style={{ gap: 16, marginTop: 28 }}>
      {tiers.map((t) => (
        <div
          key={t.category}
          style={{
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: 28,
            background: "var(--surface)",
            minWidth: 0,
          }}
        >
          <Micro>{t.category}</Micro>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {t.items.map((item) => (
              <div key={item} style={{ fontSize: 14, color: "var(--fg-body)", lineHeight: 1.7 }}>
                {t.category === "INTELLIGENCE" ? item : renderItem(item)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

