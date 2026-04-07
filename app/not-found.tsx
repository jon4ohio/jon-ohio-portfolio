import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ paddingTop: 56, minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 16 }}>404</p>
        <h1 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 12 }}>Page not found</h1>
        <p style={{ fontSize: 16, color: "#6b7280", marginBottom: 32 }}>This system doesn&apos;t have that route.</p>
        <Link href="/" style={{ fontSize: 14, fontWeight: 500, color: "#0a0a0a", textDecoration: "none", border: "1px solid #0a0a0a", padding: "10px 20px", borderRadius: 8 }}>
          Back home →
        </Link>
      </div>
    </div>
  );
}
