"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/leadership", label: "Leadership" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          borderBottom: "1px solid var(--border)",
          background: "var(--nav-backdrop)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <nav
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "0 24px",
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{ fontWeight: 600, fontSize: 15, color: "var(--fg)", textDecoration: "none", letterSpacing: "-0.01em" }}
            onClick={() => setMenuOpen(false)}
          >
            John Ohio
          </Link>

          {/* Desktop nav links */}
          <div className="nav-desktop-links">
            {links.map((l) => {
              const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    fontSize: 14,
                    fontWeight: active ? 500 : 400,
                    color: active ? "var(--fg)" : "var(--fg-muted)",
                    textDecoration: "none",
                    padding: "6px 12px",
                    borderRadius: 6,
                    transition: "color 0.15s, background 0.15s",
                    background: active ? "var(--surface-subtle)" : "transparent",
                  }}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop actions: keep switcher tight to CTA and away from link cluster */}
          <div className="nav-desktop-cta" style={{ gap: 18, marginLeft: 12 }}>
            <ThemeToggle compact />
            <a
              href="mailto:jon4ohio@gmail.com"
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "var(--fg)",
                textDecoration: "none",
                border: "1px solid var(--fg)",
                padding: "7px 16px",
                borderRadius: 8,
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = "var(--surface-emphasis)";
                (e.target as HTMLElement).style.color = "var(--fg-on-emphasis)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = "transparent";
                (e.target as HTMLElement).style.color = "var(--fg)";
              }}
              onFocus={(e) => {
                (e.target as HTMLElement).style.background = "var(--surface-emphasis)";
                (e.target as HTMLElement).style.color = "var(--fg-on-emphasis)";
              }}
              onBlur={(e) => {
                (e.target as HTMLElement).style.background = "transparent";
                (e.target as HTMLElement).style.color = "var(--fg)";
              }}
            >
              Get in touch
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="nav-mobile-panel"
          >
            <span
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: "var(--fg)",
                transition: "transform 0.2s",
                transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: "var(--fg)",
                transition: "opacity 0.2s",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: "var(--fg)",
                transition: "transform 0.2s",
                transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu panel */}
      <div
        id="nav-mobile-panel"
        className={`nav-mobile-panel${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="nav-mobile-panel-inner">
          <div className="nav-mobile-panel-scroll">
            {links.map((l) => {
              const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: 16,
                    fontWeight: active ? 600 : 400,
                    color: active ? "var(--fg)" : "var(--fg-muted)",
                    textDecoration: "none",
                    padding: "13px 0",
                    borderBottom: "1px solid var(--surface-subtle)",
                  }}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
          <div className="nav-mobile-panel-footer">
            <ThemeToggle compact />
            <a
              href="mailto:jon4ohio@gmail.com"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--fg-on-emphasis)",
                textDecoration: "none",
                background: "var(--surface-emphasis)",
                padding: "10px 20px",
                borderRadius: 8,
                flex: "0 0 auto",
              }}
            >
              Get in touch →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
