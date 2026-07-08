import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AnnotatedFigure from "@/components/case-study/AnnotatedFigure";
import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";
import {
  getFieldNote,
  getFieldNoteSlugs,
  type FieldNoteFigure,
  type FieldNoteSection,
} from "@/lib/fieldNotes";

const PROSE_MAX = 760;
const SECTION_PAD = "0 24px 80px";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getFieldNoteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getFieldNote(slug);
  if (!note) return { title: "Field note" };

  return {
    title: note.title,
    description: note.description,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: {
      title: note.title,
      description: note.description,
      url: `/notes/${note.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: note.title,
      description: note.description,
    },
  };
}

function ProseParagraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <>
      {paragraphs.map((p) => (
        <p
          key={p}
          style={{
            fontSize: 17,
            color: "var(--fg-body)",
            lineHeight: 1.75,
            margin: "0 0 20px",
            maxWidth: PROSE_MAX,
          }}
        >
          {p}
        </p>
      ))}
    </>
  );
}

function Blockquote({ children }: { children: string }) {
  return (
    <blockquote
      style={{
        margin: "0 0 28px",
        padding: "20px 24px",
        borderLeft: "3px solid var(--accent-orange)",
        background: "var(--surface)",
        borderRadius: "0 8px 8px 0",
        maxWidth: PROSE_MAX,
      }}
    >
      <p style={{ fontSize: 16, color: "var(--fg-body-muted)", lineHeight: 1.7, margin: 0 }}>{children}</p>
    </blockquote>
  );
}

function NoteFigure({ figure }: { figure: FieldNoteFigure }) {
  return (
    <div style={{ margin: "32px 0 0", maxWidth: 960 }}>
      <AnnotatedFigure
        figure={figure.figure}
        label={figure.label}
        caption={figure.caption}
        imageSrc={figure.imageSrc}
        imageAlt={figure.imageAlt}
        hideDecisionNotes
        reviewable={false}
      />
    </div>
  );
}

function WorkflowSection({ section }: { section: Extract<FieldNoteSection, { type: "workflow" }> }) {
  return (
    <section id={section.id} style={{ maxWidth: 1240, margin: "0 auto", padding: SECTION_PAD }}>
      <h2
        style={{
          fontSize: "clamp(24px, 3vw, 32px)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          marginBottom: 20,
          maxWidth: PROSE_MAX,
        }}
      >
        {section.heading}
      </h2>
      <p
        style={{
          fontSize: 17,
          color: "var(--fg-body)",
          lineHeight: 1.75,
          margin: "0 0 24px",
          maxWidth: PROSE_MAX,
        }}
      >
        {section.intro}
      </p>
      <pre
        style={{
          margin: "0 0 24px",
          padding: "24px 28px",
          maxWidth: PROSE_MAX,
          fontSize: 14,
          lineHeight: 1.6,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          color: "var(--fg-body)",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          overflowX: "auto",
          whiteSpace: "pre",
        }}
      >
        {section.diagram}
      </pre>
      <p
        style={{
          fontSize: 17,
          color: "var(--fg-body)",
          lineHeight: 1.75,
          margin: 0,
          maxWidth: PROSE_MAX,
        }}
      >
        {section.outro}
      </p>
    </section>
  );
}

function ProseSection({ section }: { section: Extract<FieldNoteSection, { type: "prose" }> }) {
  return (
    <section id={section.id} style={{ maxWidth: 1240, margin: "0 auto", padding: SECTION_PAD }}>
      <h2
        style={{
          fontSize: "clamp(24px, 3vw, 32px)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          marginBottom: 20,
          maxWidth: PROSE_MAX,
        }}
      >
        {section.heading}
      </h2>
      <ProseParagraphs paragraphs={section.paragraphs} />
      {section.blockquote ? <Blockquote>{section.blockquote}</Blockquote> : null}
      {section.paragraphsAfterBlockquote ? (
        <ProseParagraphs paragraphs={section.paragraphsAfterBlockquote} />
      ) : null}
      {section.figures?.map((figure) => (
        <NoteFigure key={figure.figure} figure={figure} />
      ))}
    </section>
  );
}

function renderSection(section: FieldNoteSection) {
  switch (section.type) {
    case "prose":
      return <ProseSection key={section.id} section={section} />;
    case "workflow":
      return <WorkflowSection key={section.id} section={section} />;
    default: {
      const _exhaustive: never = section;
      return _exhaustive;
    }
  }
}

export default async function FieldNotePage({ params }: PageProps) {
  const { slug } = await params;
  const note = getFieldNote(slug);
  if (!note) notFound();

  return (
    <article style={{ paddingTop: 56 }}>
      <ReadingProgressBar />

      <header style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 64px" }}>
        <Link href="/" style={{ fontSize: 13, color: "var(--fg-muted)", textDecoration: "none" }}>
          ← Home
        </Link>
        <p className="section-label" style={{ marginTop: 32, marginBottom: 20 }}>
          {note.label}
        </p>
        <h1
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            maxWidth: 800,
            marginBottom: 16,
          }}
        >
          {note.title}
        </h1>
        <p style={{ fontSize: 19, color: "var(--fg-body-muted)", maxWidth: 680, lineHeight: 1.65, marginBottom: 32 }}>
          {note.subtitle}
        </p>
        <ProseParagraphs paragraphs={note.intro} />
        <p style={{ fontSize: 13, color: "var(--fg-subtle)", marginTop: 8, marginBottom: 0 }}>{note.published}</p>
      </header>

      {note.sections.map((section) => renderSection(section))}

      <footer
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 24px 96px",
          borderTop: "1px solid var(--border)",
          paddingTop: 48,
        }}
      >
        <Link href="/" style={{ fontSize: 14, fontWeight: 500, color: "var(--accent-orange)", textDecoration: "none" }}>
          ← Back to home
        </Link>
      </footer>
    </article>
  );
}
