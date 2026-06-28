import type { StrategicDecision } from "@/lib/strategicDecisions";

/** Canonical strategic decisions for SeamlessHiring — brief + flagship accordion (ADR-056). */
export const seamlessHiringStrategicDecisions: StrategicDecision[] = [
  {
    title: "Phased modernization over full replacement",
    body:
      "A clean-slate rebuild would have been architecturally simpler — one launch, one coherent system. Active enterprise clients with live hiring pipelines made a full cut-over unacceptable: failure meant real hiring processes breaking, not a bad metric. Phased delivery kept the product usable while we fixed it, accepted longer coexistence of old and new patterns, and required visible trust signals early instead of a big reveal. Outcome: zero-downtime improvements and continuous adoption rather than a disruptive migration.",
  },
  {
    title: "Workflow-first UX",
    body:
      "Research showed frustration stemmed from process inefficiency — broken sequences, context switching, and mid-flow abandonment — not from visual polish alone. We prioritised workflow simplification and a single recruiter decision surface before interface enhancements. Roadmap pressure to lead with AI shortlisting was deferred: layering intelligence on broken flows would have accelerated churn. Outcome: application completion reached 100% before Phase V AI — the model landed on workflows recruiters already trusted.",
  },
  {
    title: "Evidence-led research before wireframes",
    body:
      "FullStory analytics and support ticket audits ran before stakeholder-led discovery. The default instinct is interviews first; we inverted that to get behavioural truth before rationalisation. Interviews followed to explain what the data had already shown. The cost was buy-in for an unconventional sequence; the payoff was a five-phase roadmap prioritising structural failures, not noise.",
  },
  {
    title: "Role-specific experiences",
    body:
      "Recruiters, interviewers, and administrators needed distinct workflows and permissions — a one-size-fits-all RMS could not scale to enterprise hiring. Phase IV introduced RBAC and enterprise permissions so each role saw the right surface without compromising auditability. Outcome: defensible hiring trails and reduced workarounds outside the system.",
  },
  {
    title: "Pattern-based design",
    body:
      "Shared patterns — form structure, action hierarchy, state communication — were defined system-first instead of solving the same workflow problem per screen. That reduced inconsistency across recruitment flows and became the structural precursor to Seamkit, later adopted suite-wide.",
  },
];
