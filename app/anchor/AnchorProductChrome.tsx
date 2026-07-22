"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { anchorProduct as c } from "./anchorProduct";

const links = [
  { href: "/work/anchor", label: "Case study" },
  { href: "/anchor", label: "Product", match: (path: string) => path === "/anchor" },
  {
    href: "/anchor/docs",
    label: "Docs",
    match: (path: string) => path === "/anchor/docs" || path.startsWith("/anchor/docs/"),
  },
] as const;

export default function AnchorProductChrome() {
  const path = usePathname() || "/anchor";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        minHeight: 52,
        padding: `10px ${c.pad}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        flexWrap: "wrap",
        borderBottom: `1px solid ${c.line}`,
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <style>{`
        .anchor-chrome-link:hover { color: ${c.paper} !important; }
        @media (max-width: 880px) {
          .anchor-side-nav { display: none !important; }
        }
      `}</style>
      <nav
        aria-label="Anchor product"
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
          fontFamily: c.mono,
          fontSize: 11,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {links.map((link, i) => {
          const active =
            "match" in link && link.match
              ? link.match(path)
              : path === link.href || path.startsWith(`${link.href}/`);
          const isCaseStudy = link.href === "/work/anchor";
          const isActive = isCaseStudy ? false : active;
          return (
            <span key={link.href} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              {i > 0 ? (
                <span aria-hidden style={{ color: c.faint }}>
                  ·
                </span>
              ) : null}
              <Link
                href={link.href}
                className="anchor-chrome-link"
                aria-current={isActive ? "page" : undefined}
                style={{
                  color: isActive ? c.paper : c.muted,
                  textDecoration: "none",
                  fontWeight: isActive ? 500 : 400,
                  transition: "color 0.15s",
                }}
              >
                {link.label}
              </Link>
            </span>
          );
        })}
      </nav>
      <span
        style={{
          fontFamily: c.mono,
          fontSize: 11,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: c.faint,
        }}
      >
        Anchor
      </span>
    </header>
  );
}
