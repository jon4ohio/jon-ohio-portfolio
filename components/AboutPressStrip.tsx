import { aboutPressOutlets } from "@/lib/thinking";

export default function AboutPressStrip() {
  return (
    <div style={{ marginTop: "clamp(48px, 8vw, 72px)" }}>
      <p className="section-label" style={{ marginBottom: 20 }}>
        Press & media
      </p>
      <div className="about-press-strip">
        {aboutPressOutlets.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              padding: "20px 18px",
              border: "1px solid var(--border)",
              borderRadius: 12,
              textDecoration: "none",
              color: "inherit",
              background: "var(--bg)",
              transition: "border-color 0.15s ease, background 0.15s ease",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>{item.name}</span>
              <span style={{ fontSize: 13, color: "var(--fg-subtle)" }} aria-hidden>
                ↗
              </span>
            </span>
            <span style={{ fontSize: 13, color: "var(--fg-muted)", lineHeight: 1.4 }}>{item.detail}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
