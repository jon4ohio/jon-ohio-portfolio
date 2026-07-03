"use client";

import { Link } from "@jedi/react";
import { getRelatedProjects } from "@/lib/graph";
import { getProject } from "@/lib/projects";

export default function RelatedContent({ slug }: { slug: string }) {
  const related = getRelatedProjects(slug, 3);
  if (related.length === 0) return null;

  const current = getProject(slug);

  return (
    <section
      aria-labelledby={`related-${slug}`}
      style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: "48px 24px 0",
        borderTop: "1px solid var(--border)",
      }}
    >
      <h2
        id={`related-${slug}`}
        style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--fg-muted)",
          marginBottom: 16,
        }}
      >
        Related work
      </h2>
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "grid",
          gap: 12,
        }}
      >
        {related.map((node) => {
          const project = getProject(node.href.replace("/work/", ""));
          if (!project) return null;
          return (
            <li key={node.id}>
              <Link
                href={node.href}
                style={{
                  display: "block",
                  textDecoration: "none",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span style={{ display: "block", fontWeight: 600, color: "var(--fg)" }}>
                  {project.title}
                </span>
                <span style={{ display: "block", fontSize: 14, color: "var(--fg-muted)", marginTop: 4 }}>
                  {project.subtitle}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      {current ? (
        <p style={{ fontSize: 13, color: "var(--fg-subtle)", marginTop: 16 }}>
          Cross-linked via the portfolio knowledge graph — same IA, richer discovery (V2.1).
        </p>
      ) : null}
    </section>
  );
}
