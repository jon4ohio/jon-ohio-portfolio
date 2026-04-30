"use client";

import * as React from "react";

export type Chapter = { id: string; label: string };

const DEFAULT_CHAPTERS: Chapter[] = [
  { id: "brief", label: "01 Brief" },
  { id: "tensions", label: "02 Tensions" },
  { id: "phases", label: "03 Phases" },
  { id: "evidence", label: "04 Evidence" },
  { id: "outcomes", label: "05 Outcomes" },
  { id: "unlocks", label: "06 Unlocks" },
];

export default function StickyChapterNav({ chapters = DEFAULT_CHAPTERS }: { chapters?: Chapter[] }) {
  const [active, setActive] = React.useState<string>(chapters[0]?.id ?? "brief");

  React.useEffect(() => {
    const targets = chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    if (!targets.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0))[0];
        if (!visible?.target) return;
        setActive((visible.target as HTMLElement).id);
      },
      {
        root: null,
        threshold: 0.2,
        rootMargin: "-20% 0px -70% 0px",
      },
    );

    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, [chapters]);

  return (
    <div
      className="case-study-chapter-nav"
      style={{
        position: "sticky",
        top: 56,
        zIndex: 50,
        background: "var(--nav-backdrop)",
        borderBottom: "1px solid var(--border)",
        height: 44,
        width: "100%",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div
        className="case-study-chapter-nav-scroll"
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 24px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 6,
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {chapters.map((c) => {
          const isActive = c.id === active;
          return (
            <a
              key={c.id}
              href={`#${c.id}`}
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                textDecoration: "none",
                padding: "0 12px",
                color: isActive ? "var(--fg)" : "var(--fg-muted)",
                fontWeight: isActive ? 600 : 500,
                whiteSpace: "nowrap",
                lineHeight: "44px",
              }}
            >
              {c.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}

