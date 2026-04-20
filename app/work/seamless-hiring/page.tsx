import Link from "next/link";
import type { Metadata } from "next";
import CaseStudyImage from "@/components/CaseStudyImage";

export const metadata: Metadata = {
  title: "SeamlessHiring 2.0",
  description: "Redesigning an enterprise recruitment platform for scale, usability, and growth.",
  alternates: { canonical: "/work/seamless-hiring" },
  openGraph: {
    title: "SeamlessHiring 2.0 — Enterprise recruitment platform redesign",
    description: "A phased redesign that improved satisfaction, workflow efficiency, and support load.",
    url: "/work/seamless-hiring",
    type: "article",
  },
};

export default function SeamlessHiringCaseStudy() {
  return (
    <div style={{ paddingTop: 56 }}>
      <nav aria-label="Breadcrumb" style={{ maxWidth: 1240, margin: "0 auto", padding: "32px 24px 0" }}>
        <Link href="/work" style={{ fontSize: 13, color: "var(--fg-muted)", textDecoration: "none" }}>
          ← Work
        </Link>
      </nav>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "48px 24px 56px" }}>
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 60px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            marginBottom: 16,
            maxWidth: 900,
          }}
        >
          SeamlessHiring 2.0
        </h1>
        <p style={{ fontSize: 20, color: "var(--fg-muted)", marginBottom: 20, maxWidth: 880 }}>
          Redesigning an enterprise recruitment platform for scale, usability, and growth
        </p>

        {/* Overview (above the fold) */}
        <div className="grid-2" style={{ gap: 16, alignItems: "start" }}>
          <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "20px 22px" }}>
            <p style={{ fontSize: 11, fontWeight: 500, color: "var(--fg-subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
              Overview
            </p>
            <p style={{ fontSize: 16, color: "var(--fg-strong)", lineHeight: 1.7, marginBottom: 14 }}>
              SeamlessHiring is a recruitment management system used by HR teams to manage job creation, applications, and hiring workflows.
            </p>
            <p style={{ fontSize: 16, color: "var(--fg-strong)", lineHeight: 1.7, marginBottom: 14 }}>
              The platform struggled under scale — fragmented workflows, poor usability, and breakdowns during high-volume hiring programs.
            </p>
            <p style={{ fontSize: 16, color: "var(--fg-strong)", lineHeight: 1.7 }}>
              I led a phased redesign that transformed the system into a structured, scalable product.
            </p>
          </div>

          <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "20px 22px" }}>
            <p style={{ fontSize: 11, fontWeight: 500, color: "var(--fg-subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
              Impact (headline)
            </p>
            <div className="metric-badges metric-badges--hero" style={{ marginBottom: 0 }}>
              <div className="metric-badge">
                <span className="metric-badge__value">+75%</span>
                <span className="metric-badge__label">user satisfaction</span>
              </div>
              <div className="metric-badge">
                <span className="metric-badge__value">+60%</span>
                <span className="metric-badge__label">workflow efficiency</span>
              </div>
              <div className="metric-badge">
                <span className="metric-badge__value">↓50%</span>
                <span className="metric-badge__label">support volume</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px 96px" }}>
        {/* My Role */}
        <section style={{ marginBottom: 56, paddingBottom: 56, borderBottom: "1px solid var(--border)" }}>
          <p style={{ fontSize: 11, fontWeight: 500, color: "var(--fg-subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
            My role
          </p>
          <p style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 16 }}>
            Lead Product Designer
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, color: "var(--fg-strong)", lineHeight: 1.85 }}>
            <li>Led end-to-end redesign across 5 core modules</li>
            <li>Defined UX architecture and system structure</li>
            <li>Collaborated with engineering on Vue-based implementation</li>
            <li>Contributed to Product-Led Growth initiatives</li>
          </ul>
        </section>

        {/* The Problem */}
        <section style={{ marginBottom: 56, paddingBottom: 56, borderBottom: "1px solid var(--border)" }}>
          <p style={{ fontSize: 11, fontWeight: 500, color: "var(--fg-subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
            The problem
          </p>
          <p style={{ fontSize: 17, color: "var(--fg-strong)", lineHeight: 1.75, marginBottom: 16 }}>
            SeamlessHiring broke down under scale. HR teams were forced to stitch together fragmented flows across job creation, applicant tracking, evaluation, and approvals — creating cognitive overload and inconsistent outcomes.
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, color: "var(--fg-strong)", lineHeight: 1.85 }}>
            <li>Fragmented workflows across modules and steps</li>
            <li>Cognitive overload from inconsistent layouts and unclear next actions</li>
            <li>Inconsistent UI patterns that reduced trust and slowed task completion</li>
            <li>Support escalations during high-volume hiring programs</li>
          </ul>
          <p style={{ fontSize: 17, color: "var(--fg-strong)", lineHeight: 1.75, marginTop: 16, marginBottom: 0 }}>
            This wasn’t a feature problem. It was a system design problem.
          </p>
        </section>

        {/* Visual — BEFORE */}
        <section style={{ marginBottom: 56, paddingBottom: 56, borderBottom: "1px solid var(--border)" }}>
          <CaseStudyImage
            src="/assets/work/seamless-hiring/block-pain-points.png"
            alt="Before state: breakdowns and pain points across SeamlessHiring workflows"
            caption="Before: fragmented workflows and inconsistent UI created support escalations and slow completion."
          />
        </section>

        {/* Approach */}
        <section style={{ marginBottom: 56, paddingBottom: 56, borderBottom: "1px solid var(--border)" }}>
          <p style={{ fontSize: 11, fontWeight: 500, color: "var(--fg-subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
            Approach
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <p style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 6 }}>Break system into workflows</p>
              <p style={{ fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.7, margin: 0 }}>
                Mapped core hiring jobs-to-be-done into clear step sequences and ownership boundaries.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 6 }}>Redesign as structured modules</p>
              <p style={{ fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.7, margin: 0 }}>
                Rebuilt key modules as predictable, task-first surfaces that scale with complexity.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 6 }}>Introduce reusable patterns</p>
              <p style={{ fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.7, margin: 0 }}>
                Standardized navigation, forms, review states, and empty/error handling to reduce cognitive load.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 6 }}>Collaborate deeply with engineering</p>
              <p style={{ fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.7, margin: 0 }}>
                Partnered closely with Vue engineers to phase delivery without breaking active hiring programs.
              </p>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section style={{ marginBottom: 56, paddingBottom: 56, borderBottom: "1px solid var(--border)" }}>
          <p style={{ fontSize: 11, fontWeight: 500, color: "var(--fg-subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
            Solution
          </p>
          <p style={{ fontSize: 17, color: "var(--fg-strong)", lineHeight: 1.75, marginBottom: 16 }}>
            The redesign turned SeamlessHiring into a structured, scalable platform — where teams could move from job definition to evaluation and decision with fewer breakdowns.
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, color: "var(--fg-strong)", lineHeight: 1.85 }}>
            <li>Step-based job creation with clear progression and validation</li>
            <li>Structured ATS views for applications, stages, and candidate states</li>
            <li>Evaluation workflows for scoring, feedback, and reviewer coordination</li>
            <li>Role-based access controls that aligned permissions with responsibility</li>
          </ul>
          <p style={{ fontSize: 17, color: "var(--fg-strong)", lineHeight: 1.75, marginTop: 16, marginBottom: 0 }}>
            The platform moved from fragmented → structured and scalable.
          </p>
        </section>

        {/* Visual — AFTER */}
        <section style={{ marginBottom: 56, paddingBottom: 56, borderBottom: "1px solid var(--border)" }}>
          <CaseStudyImage
            src="/assets/work/seamless-hiring/preview-16x9.png"
            alt="After state: structured, scalable SeamlessHiring UI"
            caption="After: a structured workflow with consistent patterns across core modules."
          />
        </section>

        {/* Impact (Grouped) */}
        <section style={{ marginBottom: 56, paddingBottom: 56, borderBottom: "1px solid var(--border)" }}>
          <p style={{ fontSize: 11, fontWeight: 500, color: "var(--fg-subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
            Impact
          </p>
          <div style={{ display: "grid", gap: 18 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em", margin: "0 0 8px" }}>Efficiency</h3>
              <p style={{ margin: 0, fontSize: 15, color: "var(--fg-strong)", lineHeight: 1.7 }}>+60% workflow efficiency</p>
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em", margin: "0 0 8px" }}>Experience</h3>
              <p style={{ margin: 0, fontSize: 15, color: "var(--fg-strong)", lineHeight: 1.7 }}>+75% user satisfaction</p>
              <p style={{ margin: 0, fontSize: 15, color: "var(--fg-strong)", lineHeight: 1.7 }}>-24% application drop-offs</p>
              <p style={{ margin: 0, fontSize: 15, color: "var(--fg-strong)", lineHeight: 1.7 }}>+20% engagement</p>
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em", margin: "0 0 8px" }}>Operations</h3>
              <p style={{ margin: 0, fontSize: 15, color: "var(--fg-strong)", lineHeight: 1.7 }}>↓50% support volume</p>
            </div>
          </div>
        </section>

        {/* AI Integration */}
        <section style={{ marginBottom: 56, paddingBottom: 56, borderBottom: "1px solid var(--border)" }}>
          <p style={{ fontSize: 11, fontWeight: 500, color: "var(--fg-subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
            AI integration
          </p>
          <p style={{ fontSize: 17, color: "var(--fg-strong)", lineHeight: 1.75, margin: 0 }}>
            I designed the CV parsing + ranking experience with a focus on trust: clear confidence cues, transparent criteria, and a human override that kept final decisions with recruiters.
          </p>
        </section>

        {/* Visual — AI */}
        <section style={{ marginBottom: 56, paddingBottom: 56, borderBottom: "1px solid var(--border)" }}>
          <CaseStudyImage
            src="/assets/work/seamless-hiring/block-gallery-1.png"
            alt="AI-assisted ranking and impact snapshot interface"
            caption="AI: parsing + ranking UX designed for transparency and recruiter control."
          />
        </section>

        {/* System Impact */}
        <section style={{ marginBottom: 56, paddingBottom: 56, borderBottom: "1px solid var(--border)" }}>
          <p style={{ fontSize: 11, fontWeight: 500, color: "var(--fg-subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
            System impact
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, color: "var(--fg-strong)", lineHeight: 1.85 }}>
            <li>Created the foundation that later evolved into Seamkit (design system)</li>
            <li>Enabled Product-Led Growth work by reducing friction and improving onboarding paths</li>
            <li>Improved cross-team alignment through shared patterns and clearer module ownership</li>
          </ul>
        </section>

        {/* Visual — Design System */}
        <section style={{ marginBottom: 56, paddingBottom: 56, borderBottom: "1px solid var(--border)" }}>
          <CaseStudyImage
            src="/assets/work/seamkit/preview-16x9.png"
            alt="Design system impact: Seamkit preview"
            caption="Design system: the scalable pattern layer that emerged from this redesign work."
          />
        </section>

        {/* Key Insight */}
        <section style={{ marginBottom: 0 }}>
          <p style={{ fontSize: 11, fontWeight: 500, color: "var(--fg-subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
            Key insight
          </p>
          <p style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.7, color: "var(--fg-strong)", margin: 0 }}>
            Scaling enterprise products isn’t about adding features. It’s about structuring systems so they remain usable under complexity and growth.
          </p>
        </section>
      </section>
    </div>
  );
}

