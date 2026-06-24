import type { Metadata } from "next";
import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";
import StickyChapterNav, { type Chapter } from "@/components/case-study/StickyChapterNav";
import FlagshipOpener from "@/components/case-study/FlagshipOpener";
import TensionCards from "@/components/case-study/TensionCards";
import PhaseTimeline from "@/components/case-study/PhaseTimeline";
import { type Phase } from "@/components/case-study/PhaseTimeline";
import EvidenceModule from "@/components/case-study/EvidenceModule";
import OutcomeCards, { type OutcomeTier } from "@/components/case-study/OutcomeCards";
import UnlockPanel from "@/components/case-study/UnlockPanel";
import PrevNextNav from "@/components/case-study/PrevNextNav";
import { getProject, projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "FetsProza",
  description:
    "Led product definition and UX for FetsProza — operational tooling that replaced a $1M+ vendor dependency, doubled throughput, and gave finance and ops teams visibility into transactions at production scale.",
  alternates: { canonical: "/work/fetsproza" },
};

const chapters: Chapter[] = [
  { id: "brief", label: "01 Brief" },
  { id: "tensions", label: "02 Tensions" },
  { id: "evidence", label: "03 Evidence" },
  { id: "outcomes", label: "04 Outcomes" },
  { id: "unlocks", label: "05 Foundations" },
];

const modules: Phase[] = [
  {
    id: "module-monitoring",
    number: "01",
    name: "Transaction monitoring",
    description: "See what happened — status, bottlenecks, re-query",
  },
  {
    id: "module-reconciliation",
    number: "02",
    name: "Reconciliation",
    description: "Understand what happened — matched and unmatched flows",
  },
  {
    id: "module-payment",
    number: "03",
    name: "Payment processing",
    description: "Act on it — accounts, products, refunds",
  },
  {
    id: "module-merchant",
    number: "04",
    name: "Merchant & agent management",
    description: "Scale operations — onboarding and team admin",
  },
  {
    id: "module-outcomes",
    number: "05",
    name: "Platform outcomes",
    description: "Business results — cost, scale, operator experience",
  },
];

const outcomeTiers: OutcomeTier[] = [
  {
    category: "PRODUCT",
    items: [
      "2× — Transaction throughput (10k → 20k per minute)",
      "↓50% — Settlement time (4s → 2s)",
      "Improved — Transaction monitoring across ops teams",
    ],
  },
  {
    category: "OPERATOR EXPERIENCE",
    items: [
      "80% — Task success on ops dashboard usability testing",
      "NPS 3.4→4.6 — Internal operator satisfaction",
      "↓40% — Onboarding time for internal teams",
      "↓30% — Support interventions",
    ],
  },
  {
    category: "BUSINESS IMPACT",
    items: [
      "$1M+ — Annual savings from vendor elimination",
      "↓30% — OpEx ($500k → $350k)",
      "Faster — Partner onboarding through unified workflows",
    ],
  },
  {
    category: "PLATFORM SCALE",
    items: [
      "₦89.7B+ — Processed in last financial year (production dashboard)",
      "Fetswallet Congo — White-label deployment",
      "Licensing — Opportunities from external fintechs",
    ],
  },
];

function SectionDivider() {
  return (
    <div style={{ padding: "0 24px" }}>
      <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
    </div>
  );
}

export default function FetsprozaFlagshipCaseStudy() {
  const project = getProject("fetsproza");
  if (!project) return null;
  if (!project.brief) return null;

  const currentIndex = projects.findIndex((p) => p.slug === "fetsproza");
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : undefined;
  const next = currentIndex >= 0 ? projects[currentIndex + 1] : undefined;

  return (
    <div style={{ paddingTop: 56 }}>
      <ReadingProgressBar />
      <StickyChapterNav chapters={chapters} />

      <style>{`
        @media (max-width: 768px) {
          .case-study-chapter-nav { display: none !important; }
        }
        @media (max-width: 900px) {
          .case-study-phase-desktop { display: none !important; }
          .case-study-evidence-row--text-left { flex-direction: column !important; }
          .case-study-evidence-row--text-right { flex-direction: column !important; }
        }
        @media (max-width: 640px) {
          .case-study-tension-grid { flex-direction: column !important; }
          .case-study-nextread { flex-direction: column !important; }
          .case-study-nextread-media { width: 100% !important; }
        }
        @media (min-width: 901px) {
          .case-study-phase-mobile { display: none !important; }
        }
      `}</style>

      <FlagshipOpener
        microLabel={`${project.company} · ${project.period}`}
        title={project.title}
        subtitle={project.subtitle}
        thesis="Operators shouldn't need engineering to answer what happened to this transaction."
        abstract="Fetswallet's operations depended on an expensive third-party platform that was difficult to customize and increasingly constrained growth. I led product definition and UX for FetsProza — a new operational platform that gave finance, operations, and support teams visibility into transactions, reconciliation, merchant management, and reporting workflows. The result was a platform that reduced costs, doubled throughput, improved operator efficiency, and processed ₦89.7B+ in production transaction volume."
        impact={project.metrics}
        heroImage={{
          src: project.assets?.hero?.src ?? project.assets?.thumbnails?.[0]?.src,
          alt: project.assets?.hero?.alt ?? project.assets?.thumbnails?.[0]?.alt,
        }}
        executiveBrief={project.brief}
      />

      <TensionCards
        label="02 Core Tensions"
        heading="What made this hard"
        subhead="Three constraints that made replacing the vendor a product problem — not just a procurement decision."
        cards={[
          {
            number: "01",
            title: "Vendor dependency",
            body:
              "The company relied on a third-party mobile money platform for all transaction processing. That dependency constrained margins, blocked customisation, and imposed a hard ceiling on throughput — 10k per minute — that the business was already approaching.",
          },
          {
            number: "02",
            title: "Operations invisible in the old platform",
            body:
              "Reconciliation, settlement, and transaction monitoring lived in manual workarounds because the vendor UI wasn't built for how finance and ops teams actually worked. Errors surfaced at end-of-day review — too late to fix at source — and operators had no self-service path to answer basic questions about transaction status.",
          },
          {
            number: "03",
            title: "No PM — product definition was unowned",
            body:
              "There was no product manager. Engineering was building and design had no formal brief. The risk was a technically capable platform with no coherent operator workflows, no visibility into transaction states, and no tooling that finance and support teams could run day to day.",
          },
        ]}
      />

      <div style={{ maxWidth: 1240, margin: "32px auto 0", padding: "0 24px" }}>
        <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, maxWidth: 760 }}>
          The answer was not to replace the vendor with a better vendor. It was to design operational tooling that let the
          business own and scale its mobile-money operations — starting with what operators needed to see, understand, and
          act on every day.
        </p>
      </div>

      <section id="evidence" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          03 Evidence in practice
        </p>
        <p style={{ marginTop: 8, fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: 680 }}>
          See what happened → understand it → act on it → scale operations → platform outcomes.
        </p>
        <div style={{ marginTop: 24 }}>
          <PhaseTimeline phases={modules} />
        </div>
      </section>

      <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 72 }}>
        <EvidenceModule
          id="module-monitoring"
          phase="01 — Transaction monitoring"
          layout="text-left"
          challenge="Finance and ops teams couldn't see transaction status without engineering — stuck, pending, and failed payments had no self-service path."
          intervention="Transaction tracker and bottleneck view — status breakdown, re-query actions, and a production dashboard used at scale."
          figure={{
            figure: 1,
            label: "Transaction tracker",
            imageSrc: "/assets/work/fetsproza/thumb-2.png",
            imageAlt: "Transaction tracker and bottleneck view with status breakdown and re-query actions",
            caption:
              "Transaction monitoring: all-transactions view and bottleneck resolution — operators can see status and re-query without engineering support.",
            decisionNotes: [
              "Visibility treated as the primary operator job — not a reporting afterthought",
              "Re-query at row level so stuck transactions are actionable where operators work",
              "Production-proven at scale — referenced in live operational use",
            ],
          }}
        />

        <SectionDivider />

        <EvidenceModule
          id="module-reconciliation"
          phase="02 — Reconciliation"
          layout="text-right"
          challenge="Closing the books required manual coordination across teams; errors surfaced at end-of-day, not at source."
          intervention="Reconciliation dashboard — matched and unmatched transactions, settlement reports, and export for finance teams."
          figure={{
            figure: 2,
            label: "Reconciliation dashboard",
            imageSrc: "/assets/work/fetsproza/hero.png",
            imageAlt: "Reconciliation dashboard showing matched and unmatched transaction breakdown",
            caption:
              "Reconciliation dashboard: matched and unmatched transactions with settlement reporting — continuous visibility instead of end-of-day batch review.",
            decisionNotes: [
              "Continuous visibility chosen over batch review — errors actionable where operators work",
              "Matched vs unmatched breakdown gives finance teams a single place to close the books",
            ],
          }}
        />

        <SectionDivider />

        <EvidenceModule
          id="module-payment"
          phase="03 — Payment processing"
          layout="text-left"
          challenge="Peak periods exposed lag in the operator experience; refunds and disputes lacked guided workflows."
          intervention="Account profiles and product configuration — real-time status, refund and dispute prompts, and category management."
          figure={{
            figure: 3,
            label: "Payment processing",
            imageSrc: "/assets/work/fetsproza/block-module-payment.png",
            imageAlt: "Payment processing — account profiles and product configuration",
            caption:
              "Payment processing: account profiles with wallet visibility and product configuration for categories, charges, and payment methods.",
            decisionNotes: [
              "Operator control over products and accounts — not a backend-only configuration exercise",
              "Peak-load performance treated as an operator experience requirement",
            ],
          }}
        />

        <SectionDivider />

        <EvidenceModule
          id="module-merchant"
          phase="04 — Merchant & agent management"
          layout="text-right"
          challenge="Onboarding merchants and admin teams was error-prone without guided setup and clear role definitions."
          intervention="User management with clear roles and contextual help embedded across forms."
          figure={{
            figure: 4,
            label: "Merchant & agent management",
            imageSrc: "/assets/work/fetsproza/block-module-merchant.png",
            imageAlt: "Merchant and agent management — user management and team admin",
            caption:
              "Merchant and agent management: team admin with role clarity and guided onboarding for operations staff.",
            decisionNotes: [
              "Onboarding designed for ops admins — not engineers configuring the system",
              "Unified workflows enabling faster partner onboarding across the agent network",
            ],
          }}
        />

        <SectionDivider />

        <EvidenceModule
          id="module-outcomes"
          phase="05 — Platform outcomes"
          layout="text-left"
          accent
          challenge="Vendor dependency made it hard to prove the redesign worked — cost, scale, and operator experience all needed defensible evidence."
          intervention="Before/after outcomes across product performance, operator experience, business impact, and platform scale."
          figure={{
            figure: 5,
            label: "Platform outcomes",
            imageSrc: "/assets/work/fetsproza/block-outcome.png",
            imageAlt: "Platform outcomes — product, operator experience, business impact, and scale metrics",
            caption:
              "Platform outcomes: before/after metrics across cost, throughput, operator experience, and production volume at scale.",
            decisionNotes: [
              "₦89.7B+ processed in production — verified on live dashboard",
              "NPS and task success from usability testing treated as first-class design evidence",
              "Fetswallet Congo demonstrates white-label deployment beyond the core market",
            ],
          }}
        />
      </div>

      <section id="outcomes" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          04 Outcomes
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          Results across four dimensions
        </h2>
        <OutcomeCards tiers={outcomeTiers} />
      </section>

      <div style={{ maxWidth: 1240, margin: "48px auto 0", padding: "0 24px" }}>
        <p style={{ fontSize: 15, color: "var(--fg-muted)", fontStyle: "italic", lineHeight: 1.7, maxWidth: 760, margin: 0 }}>
          &quot;John demonstrated deep systems thinking and product leadership throughout FetsProza&apos;s redesign,
          translating complex financial infrastructure into intuitive, scalable systems.&quot;
        </p>
        <p style={{ marginTop: 10, fontSize: 12, color: "var(--fg-subtle)", maxWidth: 760 }}>
          — Clement Asibeluo, Chief Technology Officer, Fets
        </p>
      </div>

      <UnlockPanel
        label="05 Foundations"
        items={[
          "Product definition without a PM — sole design and product owner from concept through launch, working directly with engineering and domain experts.",
          "Visibility-first ops tooling became the internal standard for how Fets builds operator-facing financial products.",
          "The operator console pattern — transaction monitoring, reconciliation, merchant admin — established a reusable model across markets.",
          "Replacing a $1M+ vendor dependency proved that operational UX redesign was a commercial decision, not just a technical one.",
        ]}
      />

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
