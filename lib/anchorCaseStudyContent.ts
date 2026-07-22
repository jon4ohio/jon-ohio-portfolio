export type AnchorProductLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type AnchorSkimItem = {
  label: string;
  value: string;
};

export type AnchorTimelineMilestone = {
  label: string;
};

export type AnchorShift = {
  eyebrow: string;
  title: string;
  question: string;
  paragraphs: string[];
  decision: string;
};

export type AnchorEvidenceColumn = {
  title: string;
  items: string[];
};

export type AnchorExploreAction = {
  label: string;
  href: string;
  external?: boolean;
};

export const anchorHero = {
  eyebrow: "Case Study · Anchor",
  title: "Anchor: Designing a Coordination Architecture for AI-Assisted Software Development",
  promise:
    "I set out to reduce context loss in collaborative software work and ended up designing a coordination architecture centered on engineering responsibilities rather than repository layout.",
  badge: "Evidence Window open — independent adoption not claimed",
};

export const anchorMetadata = {
  role: "Designer & Engineer",
  duration: "2026 (ongoing)",
  scope: "Product strategy · Systems architecture · Runtime engineering · Documentation architecture",
  status: "Runtime shipped · Evidence Window open",
};

export const anchorProductLinks: AnchorProductLink[] = [
  { label: "Website", href: "/anchor" },
  { label: "GitHub", href: "https://github.com/jon4ohio/anchor", external: true },
  { label: "npm", href: "https://www.npmjs.com/package/@jon4ohio/anchor-runtime", external: true },
  {
    label: "Docs",
    href: "https://github.com/jon4ohio/anchor/blob/main/docs/experience/04-building-your-own.md",
    external: true,
  },
];

export const anchorSkim: AnchorSkimItem[] = [
  {
    label: "Problem",
    value: "Projects lose reasoning between sessions; work restarts instead of continuing.",
  },
  {
    label: "Insight",
    value: "The durable unit isn’t a file or a prompt — it’s a responsibility.",
  },
  {
    label: "Outcome",
    value:
      "A coordination architecture with a responsibility-first product layer and a Capability API (Proposed).",
  },
  {
    label: "Runtime",
    value: "@jon4ohio/anchor-runtime@0.1.0 published on npm as a thin local delivery layer.",
  },
  {
    label: "Evidence today",
    value:
      "Maintainer dogfooding + a controlled experiment on jon-ohio-portfolio; independent adopters still pending.",
  },
  {
    label: "Next",
    value: "Independent adoption evidence, then an Evidence Review before stronger identity claims.",
  },
];

export const anchorTimeline: AnchorTimelineMilestone[] = [
  { label: "Contracts ≠ files" },
  { label: "Seven contracts + four principles" },
  { label: "Framework vs Experience split" },
  { label: "Responsibility-first product narrative" },
  { label: "Context arbitration on jon-ohio-portfolio" },
  { label: "Capability API (Proposed) + thin runtime" },
  { label: "Public npm runtime · Evidence Window open" },
];

export const anchorProblem = {
  title: "Coordination fails before generation does.",
  paragraphs: [
    "Most software projects don’t fail because people forget the code. They fail because they forget the reasons.",
    "Over months, a repository accumulates READMEs, architecture notes, decision records, agent instruction files, and chat transcripts. Each artifact answers a different question — what this project is, what we’re building now, why we chose an approach, what changed since last week — but those questions collapse into one undifferentiated pile called “context.”",
    "When a new contributor joins, or a previous contributor returns after two weeks away, the recovery ritual is familiar: skim the README, dig through git history, reopen old chats, reconstruct intent by hand. Even when the code is healthy, the coordination surface is fragile. Continuity depends on whoever happens to remember.",
    "AI coding assistants made this failure mode impossible to ignore. They are powerful generators and weak custodians. Give them an unconstrained repository and they will gather aggressively — reading too much, trusting the wrong sources, and reconstructing a plausible story that may not match the project’s actual decisions. The human then spends the session correcting the reconstruction.",
    "I stopped treating that as a prompting problem.",
    "The underlying issue was older than chat interfaces: engineering work needs a way to preserve and route durable knowledge by responsibility. Generation is plentiful. Coordination is scarce. Anchor began as an attempt to design that coordination surface carefully enough that humans and AI could continue from shared understanding instead of restarting from noise.",
  ],
  diagramWithout: ["Conversation → Conversation", "Conversation → Conversation", "Conversation → Start over"],
  diagramWith: ["Conversation", "↓", "Durable context", "↓", "Continue"],
  diagramCaption: "Without durable coordination, every return is a restart. With it, work continues.",
};

export const anchorShifts: AnchorShift[] = [
  {
    eyebrow: "Shift 1",
    title: "From files to responsibilities",
    question: "What actually persists across engineering work?",
    paragraphs: [
      "My first instinct was organizational: put the right markdown in the right folders, write better agent rules, keep a living notes file. That helped locally and failed generally. Folders are implementation. The hard part is ownership. Two documents that both “explain the project” create ambiguity the moment work resumes. One file that mixes identity, decisions, and today’s unfinished tasks becomes a trap: every reader — human or model — has to guess which sentences are still true.",
      "The shift was to stop asking “where should this live?” and start asking “what kind of truth is this?”",
      "Some truths orient a newcomer. Some define what we’re building. Some record why a constraint exists. Some capture how a recurring workflow should run. Some are quality gates. Some are only useful until the next session ends. Those are different responsibilities. If two artifacts claim the same responsibility, collaborators disagree without knowing why. If one artifact claims several, continuity decays because nobody can tell what is durable.",
      "In Anchor’s later vocabulary, those responsibilities became seven contracts (Entry, Spec, ADR, Skill, Playbook, Review, Handoff) and four principles: contracts not files; one owner per truth; reference don’t duplicate; promote only after repetition. Early on, what mattered was the mental model: knowledge has responsibilities; artifacts implement them.",
      "That decision changed everything afterward. If responsibilities are primary, then adoption can’t mean “replace your docs with mine.” It has to mean mapping what you already have. It also meant I could no longer treat “more documentation” as progress. Progress was clearer ownership.",
      "This solved ontology. It did not yet solve products.",
    ],
    decision:
      "Anchor should organize project knowledge around engineering responsibilities, with contracts that make ownership explicit — not around a preferred directory tree.",
  },
  {
    eyebrow: "Shift 2",
    title: "From framework to product",
    question: "If the contracts are right, what am I actually shipping?",
    paragraphs: [
      "After the foundation solidified, Anchor still behaved like a framework author’s repository. The README pointed sophisticated readers toward Project Entry and the contract model. That was honest — and wrong for adoption. Strangers don’t arrive asking for a governance system. They arrive mid-project, already overloaded, trying to decide whether this is worth an afternoon.",
      "Validation made the bounce pattern obvious: framework-first onboarding asked people to learn my structure before they could feel a benefit. Most adopters also weren’t greenfield. They already had ADRs, architecture notes, and AI instruction files. A “start clean” path quietly excluded the majority case.",
      "That produced the v0.2 product narrative: frozen phrases such as “Continue instead of reconstruct,” “Knowledge has responsibilities,” and “Contracts formalize responsibilities”; overlay adoption (“discover before you introduce”); a unified orient-project path for new and existing repos; and a teach-vs-claim rule so Experience described behavior without pretending the evidence window was closed.",
      "Importantly, this was still not a runtime story. The product decision was about how people meet the system. It forced a harder question: even with better onboarding, why did sessions still restart when plenty of documentation already existed?",
    ],
    decision:
      "Treat Anchor as a product with distinct layers — a product page that states the promise, Experience material that teaches adoption, and Framework material that defines the system — and teach responsibilities before contract names.",
  },
  {
    eyebrow: "Shift 3",
    title: "From context to coordination",
    question: "If information exists in the repo, why does work still feel like reconstruction?",
    paragraphs: [
      "I had been framing the pain as missing context. The portfolio validation project (jon-ohio-portfolio) contradicted that framing. The repository had abundant durable material — including a large ADR set. In unconstrained sessions, the assistant still behaved like a gatherer: it ignored a stale handoff, reconstructed from git and decisions, and produced plausible answers that bypassed the continuity surface I thought I had built.",
      "The problem wasn’t absence of information. It was arbitration — given many possible truths, which truths are relevant for this moment of work?",
      "That is a coordination problem. Orientation, decision rationale, implementation scope, and session continuity are different responsibilities. A session that needs “what changed since last time?” should not first vacuum the entire architecture corpus. A session that needs “why did we reject option B?” should not invent rationale from nearby code comments. Continuity fails when the system cannot route questions to owners.",
      "On jon-ohio-portfolio, I ran a maintainer-operated controlled experiment on delegated responsibility resolution (context arbitration). In that setting, treatment bundles averaged about 1.5 files versus an unconstrained baseline around 8, with a negative control and a pre-registered stop condition that did not fire. That is useful signal. It is not independent proof. I label it carefully: evidence of a capability under maintainer conditions in one project and one host environment — not validation of Anchor’s identity claims.",
      "This is also where Experience and Framework stopped being sufficient as the whole product story. Teaching and defining still left a brittle interface: if adopters depended on repository layout to behave correctly, then every internal reorganization could become a breaking change. Coordination needed a stable public surface that wasn’t a directory tree.",
    ],
    decision:
      "Redefine Anchor as a coordination architecture for durable project context — policies, protocols, continuity norms, evidence governance, and environment-specific implementations — rather than a documentation convention or prompt pack.",
  },
  {
    eyebrow: "Shift 4",
    title: "From structure to capabilities",
    question: "What should remain stable when the repository evolves?",
    paragraphs: [
      "An early decision had already said “contracts, not files.” In practice, the delivered product still exposed files as the interface. Adopters learned paths. Playbooks lived at specific locations. Reorganizing the meta-repo to reduce confusion risked breaking anyone who had wired those paths into their workflow. The friction log captured the pattern: directory and playbook churn couples adopters to layout.",
      "This is recorded as ADR-006 in the Anchor repository and remains Proposed. Acceptance waits on reproducing the orientation parity and fresh-session milestone in real adoption — not only fixtures. That status is intentional. Shipping language ahead of evidence would make the portfolio shinier and the engineering weaker.",
      "The Capability API also clarified boundaries I had been tempted to blur: durable project artifacts stay in the adopter’s repository; the host AI provides inference; Anchor should not need a hosted coordination service to be useful at this stage. Once responsibilities were the stable API, “clone the framework repo to use the product” stopped looking like a strategy and started looking like an unfinished delivery model.",
    ],
    decision:
      "Make engineering responsibilities the public Capability API. Versioned capability identities (orientation@1, continuity@1, review@1, and peers) become what clients depend on; manifests and adapters fulfill them; methodology assets stay parity-preserving wrappers rather than a rewrite.",
  },
  {
    eyebrow: "Shift 5",
    title: "Runtime as consequence",
    question: "What delivers capabilities without making the meta-repo the product?",
    paragraphs: [
      "I did not set out to build a runtime.",
      "Once the earlier shifts existed, a thin local runtime became the least-cost way to keep the promises I had already made: stable responsibility identities, methodology delivered without forcing layout literacy, zero marginal infrastructure cost, and project-owned durable artifacts.",
      "On 2026-07-22 I published @jon4ohio/anchor-runtime@0.1.0 to the public npm registry and verified install and CLI help from a clean environment. Primary onboarding can now begin with install rather than clone. That matters — and it is still only half of the 1.0 bar I set for myself. Publishing proves distribution. Claiming reliable fulfillment in real adoption still requires the Capability API acceptance gate.",
      "What the runtime intentionally does not do is as important as what it does: it does not host inference, own project state, or pretend to be an orchestration engine that decides when work should happen. Those would be different products, with different failure modes, premature for the evidence I have.",
      "The runtime feels inevitable in retrospect because each prior shift removed an alternative that looked simpler and failed a constraint.",
    ],
    decision:
      "Extract @jon4ohio/anchor-runtime as an installable knowledge snapshot that can init a workspace and fulfill responsibilities (with local MCP aliases), wrapping existing methodology instead of replacing it.",
  },
];

export const anchorEvidenceIntro =
  "Credibility here comes from disciplined scope, not from claiming customers that do not exist yet.";

export const anchorEvidenceColumns: AnchorEvidenceColumn[] = [
  {
    title: "Validated (maintainer-controlled)",
    items: [
      "Dogfooded foundation: Anchor coordinates its own development through the contract model.",
      "Product narrative redesign (v0.2): responsibility-first README, Experience, and adoption path under teach-vs-claim governance.",
      "Context arbitration experiment on jon-ohio-portfolio: smaller sufficient bundles vs unconstrained baseline in a pre-registered maintainer study (Cursor).",
      "Runtime packaging: parity-oriented fixture checks and public install path for @jon4ohio/anchor-runtime@0.1.0.",
    ],
  },
  {
    title: "Dogfooded / early operational",
    items: [
      "Continuous use of Handoff, Evidence Window discipline, and friction logging on the meta-repo.",
      "Portfolio AI entry-layer corrections (thin dispatch vs wiki creep) logged as adoption friction and confidence.",
      "Early operational-awareness experiment projecting meaningful GitHub transitions into Slack — useful, not yet a product claim.",
    ],
  },
  {
    title: "Not yet claimed",
    items: [
      "Independent greenfield or existing-project adopters clearing Evidence Review.",
      "Capability API Accepted (ADR-006 still Proposed upstream).",
      "Coordination architecture as settled public identity pending promotion gates.",
      "Broad market validation, hosted services, or multi-agent orchestration maturity.",
    ],
  },
];

export const anchorReversals = {
  title: "Several reversals matter more than a clean spine.",
  intro:
    "Interviewers should see where the architecture changed because the problem was redefined — not because a polished story needed more chapters.",
  items: [
    {
      title: "I shipped framework-first.",
      body: "Early README strategy assumed the curious reader wanted contracts. They wanted a reason to care and a way to continue their existing project. Product layering fixed a mistake I should have predicted from ordinary onboarding craft.",
    },
    {
      title: "I treated greenfield as the default path.",
      body: "The first start playbook implied a clean beginning. Most real adoption is inheritance. Unifying new and existing orientation wasn’t a feature polish — it was admitting who the user was.",
    },
    {
      title: "I let file layout become the product API.",
      body: "“Contracts, not files” lived in principle while adopters still had to learn my directories. The Capability API exists because I under-estimated interface coupling.",
    },
    {
      title: "I briefly treated live session state as shippable methodology.",
      body: "Bundling the meta-repo’s living handoff into a continuity asset caused drift by construction. Methodology has to be stateless; project state belongs to the project. That bug was conceptual before it was technical.",
    },
    {
      title: "I over-trusted documentation as the product.",
      body: "Writing clearer guides helped. It did not substitute for a delivery model that preserves responsibility identities as the repository evolves. Experience teaches; it does not fulfill.",
    },
  ],
  close: "These weren’t aesthetic regrets. Each one created the next design pressure.",
};

export const anchorNext = {
  title: "Concrete next work, not a vision deck.",
  items: [
    "Recruit independent Branch A (greenfield) and Branch B (existing) adopters; record friction without coaching the answers I want.",
    "Clear the Capability API acceptance gate in real adoption, then decide Accepted vs revise.",
    "Complete the v0.2 Evidence Review only when the exit checklist is honestly satisfied — not when the runtime feels exciting.",
    "Keep operational awareness in evidence mode until the same friction repeats.",
    "Expand capabilities only by adding manifests and adapters after repetition — never by inventing an eighth contract from anticipation.",
  ],
  close: "The Evidence Window is not a disclaimer pasted on a finished product. It is the current operating mode.",
};

export const anchorReflection: string[] = [
  "Designing Anchor changed how I evaluate systems work.",
  "I used to optimize for completeness — more guidance, more structure, more coverage. Anchor kept punishing that instinct. The valuable move was repeatedly redefining the problem: from missing files, to missing ownership, to missing product framing, to missing arbitration, to missing a stable capability surface. Each time, a tidy solution for the previous framing became the next source of fragility.",
  "That is the judgment I care about showing. Not that I invented a clever architecture, but that I could notice when the architecture was answering the wrong question — and revise the question before scaling the answer.",
  "Anchor is my current, evidence-bounded response to a coordination problem software teams already had, and AI made urgent. The more important artifact is the habit the project forced: design the ownership of truth first, then let packaging follow.",
];

export const anchorExplore = {
  title: "Explore Anchor",
  intro:
    "Anchor is an active project. If you’re interested in the coordination architecture described here, you can:",
  actions: [
    { label: "Visit the product website", href: "/anchor" },
    {
      label: "Install the runtime",
      href: "https://www.npmjs.com/package/@jon4ohio/anchor-runtime",
      external: true,
    },
    {
      label: "Browse the repository",
      href: "https://github.com/jon4ohio/anchor",
      external: true,
    },
    {
      label: "Read the architecture decisions",
      href: "https://github.com/jon4ohio/anchor/tree/main/docs/decisions",
      external: true,
    },
    {
      label: "Follow ongoing evidence",
      href: "https://github.com/jon4ohio/anchor/blob/main/releases/v0.2/evidence.md",
      external: true,
    },
  ] satisfies AnchorExploreAction[],
};
