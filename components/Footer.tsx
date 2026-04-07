import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #e5e7eb", marginTop: 120 }}>
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "48px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 24,
        }}
      >
        <div>
          <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>John Ohio</p>
          <p style={{ fontSize: 13, color: "#6b7280" }}>Product Design Lead · Abuja, Nigeria</p>
        </div>

        <div style={{ display: "flex", gap: 32 }}>
          {[
            { label: "Work", href: "/work" },
            { label: "Leadership", href: "/leadership" },
            { label: "About", href: "/about" },
          ].map((l) => (
            <Link key={l.href} href={l.href} style={{ fontSize: 14, color: "#6b7280", textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          <a href="mailto:jon4ohio@gmail.com" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}>
            jon4ohio@gmail.com
          </a>
          <a href="https://linkedin.com/in/jon4ohio" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}>
            LinkedIn ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
