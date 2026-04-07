"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/leadership", label: "Leadership" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: "1px solid #e5e7eb",
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <nav
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 24px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ fontWeight: 600, fontSize: 15, color: "#0a0a0a", textDecoration: "none", letterSpacing: "-0.01em" }}>
          John Ohio
        </Link>

        <div style={{ display: "flex", gap: 4 }}>
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontSize: 14,
                  fontWeight: active ? 500 : 400,
                  color: active ? "#0a0a0a" : "#6b7280",
                  textDecoration: "none",
                  padding: "6px 12px",
                  borderRadius: 6,
                  transition: "color 0.15s, background 0.15s",
                  background: active ? "#f3f4f6" : "transparent",
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <a
          href="mailto:jon4ohio@gmail.com"
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "#0a0a0a",
            textDecoration: "none",
            border: "1px solid #0a0a0a",
            padding: "7px 16px",
            borderRadius: 6,
            transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = "#0a0a0a";
            (e.target as HTMLElement).style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = "transparent";
            (e.target as HTMLElement).style.color = "#0a0a0a";
          }}
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}
