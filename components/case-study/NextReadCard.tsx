import Link from "next/link";
import AnnotatedFigure from "@/components/case-study/AnnotatedFigure";

export type NextReadCardProps = {
  microLabel: string;
  title: string;
  body: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
};

export default function NextReadCard({ microLabel, title, body, href, imageSrc, imageAlt }: NextReadCardProps) {
  return (
    <section style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 80px" }}>
      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: 8,
          overflow: "hidden",
          display: "flex",
        }}
        className="case-study-nextread"
      >
        <div style={{ width: 280, flexShrink: 0 }} className="case-study-nextread-media">
          <AnnotatedFigure
            figure={0}
            label="Next Project"
            caption=""
            decisionNotes={[]}
            imageSrc={imageSrc}
            imageAlt={imageAlt}
            imageOnly
            borderless
          />
        </div>

        <div style={{ padding: 32, flex: 1, minWidth: 0, background: "var(--surface)" }}>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
            {microLabel}
          </p>
          <div style={{ marginTop: 10, fontSize: 22, fontWeight: 700, color: "var(--fg)", letterSpacing: "-0.02em" }}>{title}</div>
          <p style={{ marginTop: 12, fontSize: 15, color: "var(--fg-body)", lineHeight: 1.75, maxWidth: 640 }}>{body}</p>
          <Link
            href={href}
            style={{
              display: "inline-flex",
              marginTop: 18,
              fontSize: 14,
              fontWeight: 500,
              color: "var(--fg)",
              textDecoration: "none",
              gap: 8,
              alignItems: "center",
            }}
          >
            Read case study <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

