"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { searchContent, type SearchResult } from "@/lib/search";

const isMac =
  typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

function kindLabel(kind: SearchResult["kind"]): string {
  switch (kind) {
    case "page":
      return "Page";
    case "project":
      return "Case study";
    case "writing":
      return "Writing";
    case "press":
      return "Press";
    case "conversation":
      return "Conversation";
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => searchContent(query, 10), [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const meta = isMac ? event.metaKey : event.ctrlKey;
      if (meta && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
        return;
      }
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const go = (href: string) => {
    close();
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    router.push(href);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search portfolio"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "color-mix(in srgb, var(--bg) 55%, transparent)",
        backdropFilter: "blur(8px)",
        padding: "10vh 16px",
      }}
      onClick={close}
    >
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 24px 64px color-mix(in srgb, var(--fg) 12%, transparent)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
          placeholder="Search work, writing, pages…"
          aria-label="Search query"
          style={{
            width: "100%",
            boxSizing: "border-box",
            border: "none",
            borderBottom: "1px solid var(--border)",
            padding: "16px 18px",
            fontSize: 16,
            background: "transparent",
            color: "var(--fg)",
            outline: "none",
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((i) => Math.max(i - 1, 0));
            }
            if (e.key === "Enter" && results[activeIndex]) {
              e.preventDefault();
              go(results[activeIndex].href);
            }
          }}
        />
        <ul
          role="listbox"
          aria-label="Search results"
          style={{ listStyle: "none", margin: 0, padding: 8, maxHeight: 360, overflowY: "auto" }}
        >
          {results.length === 0 ? (
            <li style={{ padding: "12px 10px", color: "var(--fg-muted)", fontSize: 14 }}>
              {query ? "No matches." : "Type to search the portfolio index."}
            </li>
          ) : (
            results.map((result, index) => {
              const active = index === activeIndex;
              return (
                <li key={result.id} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => go(result.href)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      border: "none",
                      borderRadius: 8,
                      padding: "10px 12px",
                      cursor: "pointer",
                      background: active ? "var(--surface-subtle)" : "transparent",
                      color: "var(--fg)",
                    }}
                  >
                    <span style={{ display: "block", fontWeight: 600 }}>{result.title}</span>
                    <span style={{ display: "block", fontSize: 12, color: "var(--fg-muted)", marginTop: 2 }}>
                      {kindLabel(result.kind)}
                      {result.subtitle ? ` · ${result.subtitle}` : ""}
                    </span>
                  </button>
                </li>
              );
            })
          )}
        </ul>
        <div
          style={{
            padding: "10px 14px",
            borderTop: "1px solid var(--border)",
            fontSize: 12,
            color: "var(--fg-subtle)",
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <span>
            <kbd style={{ fontFamily: "inherit" }}>{isMac ? "⌘" : "Ctrl"}</kbd> K to toggle
          </span>
          <span style={{ fontSize: 12 }}>Esc to close</span>
        </div>
      </div>
    </div>
  );
}
