"use client";

import * as React from "react";

export type Phase = {
  id: string; // "phase-I"
  number: string; // "Phase I"
  name: string; // "Stabilize"
  description: string; // "Job creation foundations"
};

function PhaseName({ name }: { name: string }) {
  const m = name.match(/^(.*?)\s*\((.+)\)\s*$/);
  if (!m) {
    return <>{name}</>;
  }
  const main = m[1] ?? name;
  const aside = m[2];
  return (
    <>
      {main}
      <span style={{ fontWeight: 500, color: "var(--fg-subtle)" }}>{` (${aside})`}</span>
    </>
  );
}

export default function PhaseTimeline({ phases }: { phases: Phase[] }) {
  const [active, setActive] = React.useState<string>(phases[0]?.id ?? "");

  React.useEffect(() => {
    const targets = phases.map((p) => document.getElementById(p.id)).filter(Boolean) as HTMLElement[];
    if (!targets.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0))[0];
        if (!visible?.target) return;
        setActive((visible.target as HTMLElement).id);
      },
      { threshold: 0.25, rootMargin: "-20% 0px -70% 0px" },
    );

    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, [phases]);

  return (
    <div>
      {/* Desktop timeline */}
      <div className="case-study-phase-desktop" style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
        {phases.map((p, idx) => {
          const isActive = p.id === active;
          return (
            <a
              key={p.id}
              href={`#${p.id}`}
              style={{
                flex: 1,
                minWidth: 0,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  borderTop: `2px solid ${isActive ? "var(--fg)" : "var(--border)"}`,
                  paddingTop: 16,
                  transition: "border-color 0.2s",
                }}
              >
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
                  {p.number}
                </div>
                <div style={{ marginTop: 4, fontSize: 15, fontWeight: 600, color: "var(--fg)" }}>
                  <PhaseName name={p.name} />
                </div>
                <div style={{ marginTop: 4, fontSize: 13, color: "var(--fg-muted)" }}>{p.description}</div>
              </div>
              {idx < phases.length - 1 ? (
                <div style={{ marginTop: 14, color: "var(--fg-subtle)", fontSize: 14 }} aria-hidden>
                  →
                </div>
              ) : null}
            </a>
          );
        })}
      </div>

      {/* Mobile stepper */}
      <div className="case-study-phase-mobile" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {phases.map((p) => {
          const isActive = p.id === active;
          return (
            <a
              key={p.id}
              href={`#${p.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                border: `1px solid ${isActive ? "color-mix(in oklab, var(--border), var(--fg) 14%)" : "var(--border)"}`,
                borderRadius: 8,
                padding: 16,
                background: "var(--surface)",
              }}
            >
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
                {p.number}
              </div>
              <div style={{ marginTop: 4, fontSize: 15, fontWeight: 600, color: "var(--fg)" }}>
                <PhaseName name={p.name} />
              </div>
              <div style={{ marginTop: 4, fontSize: 13, color: "var(--fg-muted)" }}>{p.description}</div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

