import type { Metadata } from "next";
import Link from "next/link";
import { anchorProduct as c } from "../../anchorProduct";

const title = "Projects Become Harder to Understand Before They Become Harder to Code";
const description =
  "AI can accelerate coding, but long-lived projects lose momentum when project understanding is not preserved.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/anchor/articles/projects-become-harder-to-understand-before-they-become-harder-to-code" },
  openGraph: {
    title,
    description,
    url: "/anchor/articles/projects-become-harder-to-understand-before-they-become-harder-to-code",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const paragraphs = [
  "AI pair programming changes the speed of software work. A developer can explore an implementation, ask for a refactor, generate a test, and review an edge case faster than they could alone.",
  "That speed creates a misleading impression. It makes the project feel easier because the next code change is easier. But projects do not fail only because code is hard to write. They fail because the people and tools working on them lose the thread.",
  "At the beginning, the project fits inside a conversation. The goal is fresh. The constraints are obvious. The important decisions are still easy to hold in your head. A prompt is enough because there is not much project understanding to preserve.",
  "Then the project grows. The authentication choice affects the API shape. The API shape affects the frontend state model. The frontend state model affects testing. A decision made on Monday becomes an assumption on Friday. Two weeks later, a new AI session suggests a different direction because it cannot see why the old direction existed.",
  "Nothing broke in the code. The project understanding broke.",
  "This is the point where AI-assisted engineering changes character. The hard part is no longer asking an AI to write a function. The hard part is making sure every future function still belongs to the same project.",
  "Documentation helps, but documentation alone does not solve this. A repository can contain PRDs, ADRs, specs, notes, diagrams, and skill files and still leave every new AI session guessing which artifact matters right now. Stored knowledge is not the same as usable project understanding.",
  "Chat history helps even less. It is useful while the conversation is active, but it is a poor foundation for a project that will outlive the session. It hides decisions inside a transcript, mixes durable facts with temporary reasoning, and makes the next tool reconstruct meaning from whatever project understanding happens to be pasted in.",
  "The important shift is to treat project understanding as part of the engineering surface. The project should be able to say what it is, what changed recently, which decisions constrain future work, and where the next session should begin.",
  "That does not require replacing a team's existing artifacts. In most projects, the raw material already exists. The issue is whether humans and AI can use it consistently as the project evolves across sessions, tools, and contributors.",
  "This is why the core problem is project understanding. The question is not what happened in a conversation. The question is what should remain useful after the conversation is gone.",
  "The goal is continuity. A developer should be able to leave a project, return later, switch AI hosts, or invite another contributor without rebuilding the same explanation from scratch.",
  "That is the practical meaning of continue instead of reconstruct.",
];

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ margin: "0 0 22px", fontSize: 18, lineHeight: 1.78, color: c.muted, maxWidth: 760 }}>
      {children}
    </p>
  );
}

export default function ProjectUnderstandingArticlePage() {
  return (
    <article style={{ padding: `140px ${c.pad} 120px`, minHeight: "100vh", maxWidth: 980, margin: "0 auto" }}>
      <header style={{ maxWidth: 900, marginBottom: 64 }}>
        <p
          style={{
            fontFamily: c.mono,
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: c.teal,
            margin: "0 0 28px",
          }}
        >
          Article
        </p>
        <h1
          style={{
            fontFamily: c.display,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(42px, 7vw, 76px)",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            margin: "0 0 24px",
            maxWidth: 860,
          }}
        >
          {title}
        </h1>
        <p style={{ margin: "0 0 18px", color: c.muted, fontSize: 19, lineHeight: 1.65, maxWidth: 680 }}>
          AI can accelerate coding, but long-lived projects lose momentum when project understanding is
          not preserved.
        </p>
        <p style={{ margin: 0, color: c.faint, fontSize: 13, fontFamily: c.mono }}>
          John Ohio ·{" "}
          <Link href="/anchor" style={{ color: c.muted, textDecoration: "none" }}>
            Anchor
          </Link>{" "}
        </p>
      </header>

      <section>
        <Paragraph>
          <Link href="/anchor" style={{ color: c.paper, textDecoration: "none", borderBottom: `1px solid ${c.line}` }}>
            Anchor
          </Link>{" "}
          starts from a simple premise: projects become harder to understand long before they become harder
          to code.
        </Paragraph>
        {paragraphs.map((paragraph) => (
          <Paragraph key={paragraph}>{paragraph}</Paragraph>
        ))}
      </section>

      <footer
        style={{
          marginTop: 72,
          paddingTop: 36,
          borderTop: `1px solid ${c.line}`,
          maxWidth: 760,
        }}
      >
        <p style={{ margin: "0 0 18px", color: c.muted, fontSize: 16, lineHeight: 1.65 }}>
          Anchor is an approach to AI-assisted engineering that helps projects stay coherent as they evolve
          across sessions, tools, and contributors.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
          <a href={c.npm} target="_blank" rel="noopener noreferrer" style={{ color: c.paper, textDecoration: "none" }}>
            Try Anchor
          </a>
        </div>
      </footer>
    </article>
  );
}
