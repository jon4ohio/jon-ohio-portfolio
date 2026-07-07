import { Link } from "@/components/ui/Link";
import { getContactMailtoHref } from "@/lib/contact";

export default function Footer() {
  const mailtoHref = getContactMailtoHref();
  return (
    <footer style={{ borderTop: "1px solid var(--border)", marginTop: 0 }}>
      <div
        style={{
          maxWidth: 1240,
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
          <p style={{ fontSize: 13, color: "var(--fg-muted)" }}>Lead Product Designer · Abuja, Nigeria</p>
        </div>

        <nav aria-label="Footer navigation" className="footer-nav" style={{ display: "flex", gap: 32 }}>
          {[
            { label: "Work", href: "/work" },
            { label: "About", href: "/about" },
          ].map((l) => (
            <Link key={l.href} href={l.href} style={{ fontSize: 14, color: "var(--fg-muted)", textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="footer-contact-links" style={{ display: "flex", gap: 16 }}>
          <a href={mailtoHref} style={{ fontSize: 13, color: "var(--accent-orange)", textDecoration: "none" }}>
            jon4ohio@gmail.com
          </a>
          <a href="https://linkedin.com/in/jon4ohio" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--fg-muted)", textDecoration: "none" }}>
            LinkedIn ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
