"use client";

import * as React from "react";

export default function ReadingProgressBar() {
  const [pct, setPct] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const next = max > 0 ? (window.scrollY / max) * 100 : 0;
      setPct(Math.max(0, Math.min(100, next)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 3,
        width: `${pct}%`,
        background: "var(--fg)",
        zIndex: 200,
        transition: "width 0.1s linear",
      }}
    />
  );
}

