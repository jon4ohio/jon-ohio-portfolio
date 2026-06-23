"use client";

import * as React from "react";

import type { StrategicDecision } from "@/lib/strategicDecisions";

export type DecisionEntry = StrategicDecision;

export default function DecisionAccordion({ entries }: { entries: StrategicDecision[] }) {
  const [open, setOpen] = React.useState<number | null>(null);
  const contentRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const [heights, setHeights] = React.useState<Record<number, number>>({});

  React.useLayoutEffect(() => {
    if (open == null) return;
    const node = contentRefs.current[open];
    if (!node) return;
    // Measure the actual content height so we never truncate.
    const next = node.scrollHeight;
    setHeights((prev) => (prev[open] === next ? prev : { ...prev, [open]: next }));
  }, [open, entries]);

  return (
    <div style={{ borderTop: "1px solid var(--border)" }}>
      {entries.map((e, idx) => {
        const isOpen = open === idx;
        const maxHeight = isOpen ? heights[idx] ?? 0 : 0;
        return (
          <div
            key={e.title}
            style={{
              borderBottom: "1px solid var(--border)",
              padding: "20px 0",
            }}
          >
            <button
              type="button"
              onClick={() => setOpen((prev) => (prev === idx ? null : idx))}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                padding: 0,
                margin: 0,
                textAlign: "left",
                cursor: "pointer",
                color: "inherit",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "var(--fg)" }}>{e.title}</span>
                <span
                  style={{
                    color: "var(--fg-subtle)",
                    transition: "transform 0.2s",
                    transform: isOpen ? "rotate(90deg)" : "none",
                    flexShrink: 0,
                  }}
                  aria-hidden
                >
                  ▸
                </span>
              </div>
            </button>

            <div
              style={{
                maxHeight,
                overflow: "hidden",
                transition: "max-height 0.25s ease",
              }}
            >
              <div
                ref={(node) => {
                  contentRefs.current[idx] = node;
                }}
                style={{ paddingTop: 12, paddingBottom: 8 }}
              >
                <p style={{ fontSize: 15, color: "var(--fg-body)", lineHeight: 1.75 }}>{e.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

