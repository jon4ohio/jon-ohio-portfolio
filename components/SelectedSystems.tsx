import Link from "next/link";
import { projects } from "@/lib/projects";

const systemGroups = [
  {
    label: "Product Systems",
    slugs: ["seamless-hiring"],
  },
  {
    label: "Organizational Systems",
    slugs: ["seamkit"],
  },
  {
    label: "Operational Systems",
    slugs: ["fetsproza", "ibedc", "abms"],
  },
  {
    label: "Intelligent Systems",
    slugs: ["rivva", "seamless-ai"],
  },
  {
    label: "0→1 Systems",
    slugs: ["clearprice", "blualliance"],
  },
];

export default function SelectedSystems() {
  const projectMap = new Map(projects.map((project) => [project.slug, project]));

  return (
    <section style={{ maxWidth: 1120, margin: "0 auto", padding: "120px 24px 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 48,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: "#6b7280",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Selected Systems
        </p>
        <Link href="/work" style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}>
          View all →
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {systemGroups.map((group, groupIndex) => {
          const groupItems = group.slugs
            .map((slug) => projectMap.get(slug))
            .filter((project): project is NonNullable<typeof project> => Boolean(project));

          if (groupItems.length === 0) {
            return null;
          }

          return (
            <div
              key={group.label}
              style={{
                padding: "32px 0",
                borderTop: "1px solid #e5e7eb",
                borderBottom: groupIndex === systemGroups.length - 1 ? "1px solid #e5e7eb" : "none",
                alignItems: "start",
              }}
              className="grid-systems-group"
            >
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#9ca3af",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  paddingTop: 4,
                }}
              >
                {group.label}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {groupItems.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/work/${project.slug}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      gap: 16,
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>
                        {project.title}
                      </span>
                      <span style={{ fontSize: 13, color: "#6b7280" }}>{project.subtitle}</span>
                    </span>
                    <span style={{ fontSize: 13, color: "#9ca3af" }}>→</span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
