import type { Metadata } from "next";
import Image from "next/image";
import {
  conversationItems,
  recognitionItems,
  substackHomeUrl,
  writingItems,
} from "@/lib/thinking";

export const metadata: Metadata = {
  title: "Thinking",
  description:
    "Writing on design systems and tokens, press and interviews across African tech, and conversations on enterprise UX and AI.",
  alternates: { canonical: "/thinking" },
  openGraph: {
    title: "Thinking — John Ohio",
    description:
      "Design systems writing, media, and conversations — Substack, TechCabal, Tribune, Connected Awards, and more.",
    url: "/thinking",
    type: "article",
  },
};

function getYouTubeVideoId(href: string): string | null {
  try {
    const url = new URL(href);

    // youtu.be/<id>
    if (url.hostname === "youtu.be") {
      const id = url.pathname.replace(/^\/+/, "").split("/")[0];
      return id ? id : null;
    }

    const host = url.hostname.replace(/^www\./, "");
    if (host !== "youtube.com" && host !== "m.youtube.com") return null;

    // youtube.com/watch?v=<id>
    const v = url.searchParams.get("v");
    if (v) return v;

    // youtube.com/embed/<id> or /shorts/<id>
    const parts = url.pathname.split("/").filter(Boolean);
    const embedIndex = parts.indexOf("embed");
    if (embedIndex !== -1 && parts[embedIndex + 1]) return parts[embedIndex + 1]!;
    const shortsIndex = parts.indexOf("shorts");
    if (shortsIndex !== -1 && parts[shortsIndex + 1]) return parts[shortsIndex + 1]!;

    return null;
  } catch {
    return null;
  }
}

function getYouTubeThumbnailSrc(href: string): string | null {
  const id = getYouTubeVideoId(href);
  if (!id) return null;
  // i.ytimg.com is the canonical thumbnail host (no Next image config required for <img>).
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

function ExternalCard({
  id,
  outlet,
  title,
  description,
  href,
}: {
  id: string;
  outlet: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <article
      id={id}
      style={{
        padding: "28px 24px",
        border: "1px solid var(--border)",
        borderRadius: 12,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        minHeight: "100%",
        boxSizing: "border-box",
      }}
    >
      <p style={{ fontSize: 12, fontWeight: 500, color: "var(--fg-subtle)", letterSpacing: "0.04em", margin: 0 }}>
        {outlet}
      </p>
      <h3 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.3 }}>
        {title}
      </h3>
      <p style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.6, margin: 0, flex: 1 }}>{description}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: "var(--accent-orange)",
          textDecoration: "none",
          alignSelf: "flex-start",
        }}
      >
        Open article ↗
      </a>
    </article>
  );
}

export default function ThinkingPage() {
  const featured = writingItems.filter((w) => w.kind === "featured");
  const secondary = writingItems.filter((w) => w.kind === "secondary");

  return (
    <div style={{ paddingTop: 56 }}>
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(56px, 10vw, 88px) 24px 48px" }}>
        <p className="section-label" style={{ marginBottom: 20 }}>
          Thinking
        </p>
        <h1
          style={{
            fontSize: "clamp(32px, 4.5vw, 52px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            maxWidth: 720,
            marginBottom: 20,
          }}
        >
          Design, discourse, and what shows up outside the case studies.
        </h1>
        <p style={{ fontSize: 18, color: "var(--fg-body-muted)", maxWidth: 640, lineHeight: 1.65 }}>
          Long-form notes on systems, recognition from the ecosystem, and interviews on AI and enterprise product design.
        </p>
      </section>

      {/* Recognition */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px 72px" }}>
        <p className="section-label" style={{ marginBottom: 16 }}>
          Recognition
        </p>
        <h2
          style={{
            fontSize: "clamp(22px, 2.8vw, 32px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            marginBottom: 32,
            maxWidth: 560,
          }}
        >
          Press & awards
        </h2>
        <div className="thinking-recognition-grid">
          {recognitionItems.map((item) => (
            <ExternalCard
              key={item.id}
              id={`recognition-${item.id}`}
              outlet={item.outlet}
              title={item.title}
              description={item.description}
              href={item.href}
            />
          ))}
        </div>
      </section>

      {/* Writing */}
      <section
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "72px 24px" }}>
          <p className="section-label" style={{ marginBottom: 16 }}>
            Writing
          </p>
          <h2
            style={{
              fontSize: "clamp(22px, 2.8vw, 32px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              marginBottom: 28,
              maxWidth: 560,
            }}
          >
            The UX Company — Substack
          </h2>

          {featured.map((w) => (
            <article
              key={w.id}
              id={`writing-${w.id}`}
              style={{
                padding: "32px 28px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "var(--bg)",
                marginBottom: 20,
              }}
            >
              <p style={{ fontSize: 12, fontWeight: 500, color: "var(--fg-subtle)", marginBottom: 10 }}>Featured</p>
              <h3 style={{ fontSize: "clamp(20px, 2.2vw, 26px)", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 16 }}>
                {w.title}
              </h3>
              <a
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 14, fontWeight: 500, color: "var(--accent-orange)", textDecoration: "none" }}
              >
                Read on Substack ↗
              </a>
            </article>
          ))}

          <div className="thinking-writing-grid" style={{ marginBottom: 28 }}>
            {secondary.map((w) => (
              <article
                key={w.id}
                id={`writing-${w.id}`}
                style={{
                  padding: "24px 20px",
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  background: "var(--bg)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  minHeight: "100%",
                }}
              >
                <h3 style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em", margin: 0, lineHeight: 1.35 }}>
                  {w.title}
                </h3>
                <a
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 14, fontWeight: 500, color: "var(--accent-orange)", textDecoration: "none" }}
                >
                  Read ↗
                </a>
              </article>
            ))}
          </div>

          <a
            href={substackHomeUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 14, fontWeight: 500, color: "var(--fg-muted)", textDecoration: "none" }}
          >
            Explore all posts on Substack →
          </a>
        </div>
      </section>

      {/* Conversations */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "72px 24px 96px" }}>
        <p className="section-label" style={{ marginBottom: 16 }}>
          Conversations
        </p>
        <h2
          style={{
            fontSize: "clamp(22px, 2.8vw, 32px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            marginBottom: 28,
            maxWidth: 560,
          }}
        >
          Video
        </h2>
        <div className="thinking-conversation-grid">
          {conversationItems.map((c) => {
            const thumbnailSrc = c.thumbnailSrc ?? getYouTubeThumbnailSrc(c.href);
            return (
            <article
              key={c.id}
              id={`conversation-${c.id}`}
              style={{
                padding: "28px 24px",
                border: "1px solid var(--border)",
                borderRadius: 12,
                background: "var(--bg)",
              }}
            >
              {thumbnailSrc ? (
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    borderRadius: 12,
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                    aspectRatio: "16 / 9",
                    position: "relative",
                    marginBottom: 16,
                    textDecoration: "none",
                  }}
                >
                  <Image
                    src={thumbnailSrc}
                    alt={`${c.title} — video thumbnail`}
                    fill
                    sizes="(min-width: 1240px) 560px, 100vw"
                    style={{ objectFit: "cover" }}
                  />
                </a>
              ) : null}
              <p style={{ fontSize: 12, fontWeight: 500, color: "var(--fg-subtle)", marginBottom: 8 }}>{c.outlet}</p>
              <h3 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 16 }}>{c.title}</h3>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 14, fontWeight: 500, color: "var(--accent-orange)", textDecoration: "none" }}
              >
                Watch on YouTube ↗
              </a>
            </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
