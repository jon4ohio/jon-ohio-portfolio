"use client";

import { useEffect, useRef, useState } from "react";
import { anchorProduct as c } from "./anchorProduct";

type Section = { id: string; label: string };

export default function AnchorDocsSectionNav({ sections }: { sections: Section[] }) {
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
  }, [sections]);

  return (
    <nav
      aria-label="Documentation sections"
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
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {sections.map((s) => {
          const active = s.id === activeId;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  const el = document.getElementById(s.id);
                  if (!el) return;
                  e.preventDefault();
                  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
                }}
                style={{
                  display: "block",
                  padding: "8px 0",
                  fontFamily: c.mono,
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: active ? c.paper : c.muted,
                  borderLeft: active ? `2px solid ${c.teal}` : `2px solid transparent`,
                  paddingLeft: 12,
                }}
              >
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
