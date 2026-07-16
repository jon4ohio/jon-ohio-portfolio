"use client";

import { useEffect, useRef, useState } from "react";

type Section = { id: string; label: string };

const c = {
  paper: "#f0f0ee",
  muted: "rgba(240, 240, 238, 0.52)",
  line: "rgba(240, 240, 238, 0.28)",
  teal: "#3d8f8d",
  mono: 'var(--font-anchor-mono), "SF Mono", ui-monospace, Menlo, monospace',
};

const ROW_HEIGHT = 34;

export default function AnchorSideNav({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const ratios = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.current.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId: string | undefined;
        let bestRatio = -1;
        for (const [id, ratio] of ratios.current) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestRatio > 0 && bestId) setActiveId(bestId);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <nav
      aria-label="Page sections"
      className="anchor-side-nav"
      style={{
        position: "fixed",
        top: "50%",
        right: "clamp(20px, 3.5vw, 40px)",
        transform: "translateY(-50%)",
        zIndex: 15,
        width: 168,
      }}
    >
      <div style={{ position: "relative" }}>
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: ROW_HEIGHT / 2,
            bottom: ROW_HEIGHT / 2,
            right: 3,
            width: 1,
            background: c.line,
            zIndex: 0,
          }}
        />
        {sections.map((s) => {
          const active = s.id === activeId;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => handleClick(e, s.id)}
              aria-current={active ? "true" : undefined}
              style={{
                position: "relative",
                zIndex: 1,
                display: "grid",
                gridTemplateColumns: "1fr 8px",
                alignItems: "center",
                columnGap: 12,
                minHeight: ROW_HEIGHT,
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  fontFamily: c.mono,
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textAlign: "right",
                  color: active ? c.paper : c.muted,
                  whiteSpace: "nowrap",
                  transition: "color 160ms ease",
                }}
              >
                {s.label}
              </span>
              <span
                aria-hidden="true"
                style={{
                  justifySelf: "end",
                  width: 8,
                  height: 8,
                  transform: "rotate(45deg)",
                  background: active ? c.teal : "transparent",
                  border: `1px solid ${active ? c.teal : c.line}`,
                  transition: "background 160ms ease, border-color 160ms ease",
                }}
              />
            </a>
          );
        })}
      </div>
      <style>{`
        @media (max-width: 880px) {
          .anchor-side-nav { display: none; }
        }
        .anchor-side-nav a:focus-visible {
          outline: 2px solid ${c.teal};
          outline-offset: 4px;
        }
      `}</style>
    </nav>
  );
}
