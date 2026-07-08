/**
 * On-site field notes — long-form practice essays at /notes/[slug].
 */

export type FieldNoteFigure = {
  figure: number;
  label: string;
  caption: string;
  /** Set when asset exists under public/ — omit for dashed placeholder. */
  imageSrc?: string;
  imageAlt?: string;
};

export type FieldNoteSection =
  | {
      type: "prose";
      id: string;
      heading: string;
      paragraphs: string[];
      blockquote?: string;
      /** Insert blockquote after this paragraph index (0-based). Defaults to end when omitted. */
      blockquoteAfterIndex?: number;
      paragraphsAfterBlockquote?: string[];
      figures?: FieldNoteFigure[];
    }
  | {
      type: "workflow";
      id: string;
      heading: string;
      intro: string;
      diagram: string;
      outro: string;
    };

export type FieldNote = {
  slug: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  published: string;
  intro: string[];
  sections: FieldNoteSection[];
  keywords: string[];
};

const WORKFLOW_DIAGRAM = `Problem
    ↓
Conversation (ChatGPT)
    ↓
Figma
    ↓
Cursor (Implementation)
    ↓
Claude (Architecture & Review)
    ↓
Anchor (ADRs & Governance)
    ↓
GitHub (Shared Memory)
    ↓
Vercel (Live Validation)
    ↺
Learn and Repeat`;

export const fieldNotes: FieldNote[] = [
  {
    slug: "design-doesnt-end-in-figma",
    label: "Field note",
    title: "Design Doesn't End in Figma Anymore",
    subtitle: "A field note on how I think, work, and build with AI",
    description:
      "My portfolio is a record of how my thinking evolves — the finished work is only part of it. A field note on AI-assisted design, implementation, and preserving intent.",
    published: "Jul 2026",
    intro: [
      "My portfolio is a record of how my thinking evolves — the finished work is only part of it. I publish these notes for designers exploring AI, engineers curious about design, and hiring managers who want to understand how I approach complex product problems.",
      "I don't come from a computer science background. For most of my career, that defined the edge of my work. I could frame problems, understand users, design interfaces, and collaborate closely with engineers, but implementation always felt like stepping into someone else's discipline.",
      "Over the past year, that boundary has become far less rigid, because AI changed how I participate in building software.",
      "This article documents the workflow I've developed while building products, leading Seamkit, and rebuilding this portfolio. It's the most accurate description I have of how I work today, not a methodology I'm asking anyone else to adopt.",
    ],
    sections: [
      {
        type: "prose",
        id: "how-i-think",
        heading: "How I think: design starts before Figma",
        paragraphs: [
          "My process rarely starts with pixels — it starts by reducing uncertainty.",
          "Before I open Figma, I try to make the problem smaller before I make the interface larger. ChatGPT is where that work happens, not because it has the answers, but because it helps me ask better questions: What assumptions are we making? Where are the blind spots? What edge cases haven't we considered? What does success actually look like?",
          "Those conversations almost always reshape the problem before I design a single screen. By the time I begin exploring solutions, I'm usually solving a much clearer problem than the one I started with.",
          "Once the design begins to take shape, the conversation continues. I use AI to challenge user journeys, review interaction flows, surface accessibility concerns, and explore alternatives before implementation begins. I think of it less as an author and more as a reviewer that broadens the solution space before I commit to a direction.",
        ],
      },
      {
        type: "prose",
        id: "how-i-work",
        heading: "How I work: the stack behind the process",
        paragraphs: [
          "Each tool has a clear responsibility. Figma is where I explore ideas and communicate intent. Once a design reaches sufficient maturity, I move into Cursor, where implementation becomes another round of design exploration rather than a handoff. Instead of interpreting screenshots or lengthy prompts, the implementation agent works directly from the design, making the first build much closer to the intended experience.",
        ],
        blockquote:
          "For the technically curious: this works through a Figma MCP server, which gives the implementation agent direct access to layouts, spacing, tokens, and component structure rather than a static image or prompt.",
        blockquoteAfterIndex: 0,
        paragraphsAfterBlockquote: [
          "Claude usually joins when the work becomes more architectural or when I need another perspective on visual refinement. ChatGPT stays involved as a reviewer — comparing implementation against the original product intent, questioning trade-offs, and helping me catch drift before it becomes expensive to correct.",
          "GitHub is the shared source of truth. Code, Architecture Decision Records (ADRs), governance documents, implementation plans, and supporting documentation all live in the same repository, allowing every collaborator — human or AI — to build from the same context instead of starting from scratch. Vercel closes the loop by giving me a live environment where ideas can be validated immediately. Taken together, these tools create a continuous design environment rather than a series of disconnected handoffs.",
        ],
        figures: [
          {
            figure: 1,
            label: "Figma–Cursor workflow",
            caption:
              "Figma and Cursor, connected through MCP — the same design, moving from intent to implementation without a screenshot in between.",
            imageSrc: "/images/notes-ai/workflow-figma-cursor.png",
            imageAlt:
              "The Figma-to-Cursor workflow: a design open in Figma alongside the same component mid-implementation in Cursor",
          },
        ],
      },
      {
        type: "workflow",
        id: "typical-project",
        heading: "A typical project",
        intro: "Most projects follow roughly the same rhythm.",
        diagram: WORKFLOW_DIAGRAM,
        outro:
          "Whether I'm shipping a Seamkit component or rebuilding part of this portfolio, the rhythm stays the same: understand the problem, design the solution, implement quickly, review critically, preserve context, and repeat.",
      },
      {
        type: "prose",
        id: "designing-ai",
        heading: "Designing the AI, not just using it",
        paragraphs: [
          "Everything above describes how I use AI to work. There's a second layer to this: I also design the AI other people use, and using AI well as a tool doesn't automatically make you good at designing it as a product. They're different disciplines, and they fail in different ways.",
          "At Rivva, that showed up in Nia, the AI assistant I co-designed to plan a person's day around their energy levels rather than raw calendar availability — translating wearable health data and cognitive-load signals into a conversational scheduling experience across text and voice. The interesting design problem was trust, not scheduling logic: how much should Nia decide on its own versus ask first, and how does it explain why it just moved their 3pm.",
          "At SeamlessHR, that same discipline shows up in SeamlessAI, the AI-native layer we're building into the platform — Smart CV Parsing, Smart Ranking, and Smart Assessment inside recruitment, among other surfaces.",
          "When I use ChatGPT to sharpen a brief, a wrong answer costs me a few minutes. When a ranking model misjudges a candidate, the cost lands on a real person's shot at a job, and on the recruiter who trusted the system. Designing AI-facing product surfaces meant building the interaction patterns for how the system explains a decision — the interface that displays the decision was the easier half of the job: what uncertainty looks like on screen, how a recruiter overrides a suggestion without feeling like they're fighting the tool, what the system says when it doesn't know.",
          "That's a different job than adding an AI feature — whether it's Nia deciding when to ask instead of act, or Smart Ranking showing its confidence instead of hiding it. It's building the shared vocabulary — the prompt structures, the interaction patterns, the review states — that other product teams can build on instead of inventing their own version of trust and doubt in every screen.",
        ],
        figures: [
          {
            figure: 2,
            label: "Nia scheduling UI",
            caption:
              "Nia matching a meeting suggestion to a predicted energy curve — the suggestion means little without the reasoning behind it.",
            imageSrc: "/images/notes-ai/rivva-nia-scheduling.png",
            imageAlt:
              "Nia's scheduling interface showing a suggested meeting time matched against a predicted energy curve",
          },
          {
            figure: 3,
            label: "Smart Ranking UI",
            caption:
              "Smart Ranking's review state — a ranked list only earns trust if the confidence behind it is visible too.",
            imageSrc: "/images/notes-ai/smart-ranking-ui.png",
            imageAlt:
              "A recruiter-facing screen showing a ranked candidate list with an AI confidence indicator and an override control",
          },
        ],
      },
      {
        type: "prose",
        id: "why-anchor",
        heading: "Why I built Anchor",
        paragraphs: [
          "Halfway through rebuilding this portfolio, I noticed something frustrating: the project kept getting smarter, but the conversations didn't. Every new session required rebuilding context that already existed — decisions explained again, constraints rediscovered, principles restated.",
          "I wasn't losing code.",
          "I was losing reasoning.",
          "I didn't build Anchor because AI forgets.",
          "I built it because good teams shouldn't have to remember everything.",
          "Anchor is an open coordination protocol built around a simple principle: continue instead of reconstruct. Architecture Decision Records capture why a decision was made, not just what was decided. Governance documents make principles explicit, and research remains connected to the implementation it informed.",
          "This started as a design problem, not an engineering one: how do I preserve context as work moves across people, conversations, and AI collaborators? Answering that question gradually led me into systems design, where documentation, governance, implementation, and architecture became part of the product instead of artifacts produced after it.",
          "The repository now stores reasoning alongside code. A documented principle shapes the next implementation. That implementation generates evidence. The evidence refines the architecture. The architecture informs the next conversation.",
          "Most projects lose context as they grow.",
          "This one compounds it.",
        ],
        figures: [
          {
            figure: 4,
            label: "Anchor repo structure",
            caption:
              "The repository as it actually looks — reasoning stored next to code, not after it.",
            imageSrc: "/images/notes-ai/anchor-repo-structure.png",
            imageAlt:
              "Folder structure of the Anchor repository showing ADRs, governance docs, and implementation plans as siblings to the codebase",
          },
        ],
      },
      {
        type: "prose",
        id: "what-changed",
        heading: "What actually changed",
        paragraphs: [
          "The biggest shift was in how I understood the role itself, not the tools.",
          "I no longer think of my work primarily as producing design deliverables. My responsibility is preserving intent as ideas move through research, design, implementation, documentation, architecture, and critique — some days that means designing interfaces, other days it means reviewing architectural decisions, refining documentation, or deciding that nothing should be built at all.",
          "Execution got faster.",
          "Judgment got more valuable.",
          "That's where I spend my time.",
          "I don't know exactly what product design will look like five years from now. I do know my role is no longer just to design interfaces — it's to create the conditions for good decisions to survive, from the first product conversation to the final line of code.",
          "That's the practice I'm continuing to refine, and this portfolio is where I document it as it evolves.",
        ],
      },
    ],
    keywords: [
      "field note",
      "ai",
      "figma",
      "cursor",
      "mcp",
      "anchor",
      "design",
      "workflow",
      "rivva",
      "seamlessai",
      "smart ranking",
      "nia",
      "product design",
    ],
  },
];

export function getFieldNote(slug: string): FieldNote | undefined {
  return fieldNotes.find((note) => note.slug === slug);
}

export function getFieldNoteSlugs(): string[] {
  return fieldNotes.map((note) => note.slug);
}
