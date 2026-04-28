import * as React from "react";

export default function UnlockPanel({ items }: { items: string[] }) {
  return (
    <section
      id="unlocks"
      style={{
        marginTop: 80,
        background: "var(--surface-subtle)",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ maxWidth: 680 }}>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
            06 What This Unlocked
          </p>

          <div style={{ marginTop: 24 }}>
            {items.map((item) => (
              <div key={item} style={{ display: "flex", gap: 16, marginBottom: 20 }}>
                <span style={{ color: "var(--fg-subtle)", flexShrink: 0, marginTop: 2 }}>→</span>
                <p style={{ fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75, margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

