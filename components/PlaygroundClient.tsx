"use client";

import { Badge, Button, Card, Link } from "@jedi/react";

export default function PlaygroundClient() {
  return (
    <div style={{ paddingTop: 56 }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "48px 24px" }}>
        <Badge label="V2.3" variant="purple" />
        <h1 style={{ fontSize: 40, fontWeight: 700, margin: "16px 0 8px", color: "var(--fg)" }}>
          Playground
        </h1>
        <p style={{ color: "var(--fg-muted)", maxWidth: 640, marginBottom: 32, lineHeight: 1.6 }}>
          JEDI component sandbox for Portfolio V2 — not linked from primary navigation
          (preservation-first). Reach via search (⌘K / Ctrl+K) or direct URL.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          <Card padding={4}>
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 8px" }}>Buttons</h2>
            <p style={{ fontSize: 14, color: "var(--fg-muted)", margin: "0 0 12px" }}>
              Primary chrome actions via @jedi/react
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Button label="Primary" variant="primary" />
              <Button label="Secondary" variant="secondary" />
              <Button label="Ghost" variant="ghost" />
            </div>
          </Card>

          <Card padding={4}>
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 8px" }}>Badges</h2>
            <p style={{ fontSize: 14, color: "var(--fg-muted)", margin: "0 0 12px" }}>
              Status and metadata chips
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Badge label="Purple" variant="purple" />
              <Badge label="Neutral" variant="neutral" />
              <Badge label="Success" variant="success" />
            </div>
          </Card>

          <Card padding={4}>
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 8px" }}>Links</h2>
            <p style={{ fontSize: 14, color: "var(--fg-muted)", margin: "0 0 12px" }}>
              Routed through JediProviders + Next.js Link
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Link href="/work">Work index</Link>
              <Link href="/thinking">Thinking</Link>
              <Link href="/">Home</Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
