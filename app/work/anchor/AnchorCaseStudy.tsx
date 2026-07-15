"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefCallback,
} from "react";
import { links } from "./links";
import {
  bodyMuted,
  btnGhost,
  btnPrimary,
  displayText,
  hairlineCard,
  page,
  section,
  tokens,
  waypointLabel,
  wrap,
} from "./styles";

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useInView(
  options?: IntersectionObserverInit,
): [RefCallback<HTMLElement>, boolean] {
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (!node) return;

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setVisible(true);
            observerRef.current?.disconnect();
          }
        },
        { threshold: 0.35, rootMargin: "0px 0px -8% 0px", ...options },
      );
      observerRef.current.observe(node);
    },
    [options],
  );

  return [ref, visible];
}

function Reveal({
  children,
  delayMs = 0,
  forceVisible = false,
  style,
}: {
  children: ReactNode;
  delayMs?: number;
  forceVisible?: boolean;
  style?: CSSProperties;
}) {
  const [ref, inView] = useInView();
  const visible = forceVisible || inView;

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: forceVisible
          ? "none"
          : `opacity 0.7s ease ${delayMs}ms, transform 0.7s ease ${delayMs}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const tensionLines = [
  "Every AI conversation starts from zero.",
  "Your project doesn’t.",
  "So why does your AI?",
] as const;

const chainSteps = [
  { label: "Conversation", href: links.chain.conversation },
  { label: "Decision", href: links.chain.decision },
  { label: "Evidence", href: links.chain.evidence },
  { label: "Knowledge", href: links.chain.knowledge },
] as const;

const proofCards = [
  {
    title: "Portfolio",
    blurb: "Anchor applied to real software projects.",
    href: links.portfolioWork,
  },
  {
    title: "Validation",
    blurb: "How Anchor orients an existing repository.",
    href: links.validation,
  },
  {
    title: "Decision Records",
    blurb: "Architecture choices backed by evidence.",
    href: links.decisions,
  },
  {
    title: "Documentation",
    blurb: "Start here — adopt without rewriting what you have.",
    href: links.documentation,
  },
] as const;

export function AnchorCaseStudy() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <article style={page}>
      <a
        href="#name"
        style={{
          position: "absolute",
          left: -9999,
          top: "auto",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        Skip to Anchor
      </a>

      {/* Moment 1 — Tension */}
      <section style={{ ...section, borderBottom: `1px solid ${tokens.line}` }} aria-label="The tension">
        <div style={wrap}>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {tensionLines.map((line, i) => (
              <Reveal key={line} delayMs={i * 140} forceVisible={reducedMotion}>
                <p
                  style={{
                    ...displayText,
                    fontSize: "clamp(28px, 5.2vw, 48px)",
                    maxWidth: "16ch",
                    color: i === tensionLines.length - 1 ? tokens.tealBright : tokens.paper,
                  }}
                >
                  {line}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Moment 2 — Name + promise */}
      <section
        id="name"
        style={{ ...section, borderBottom: `1px solid ${tokens.line}` }}
        aria-label="Anchor"
      >
        <div style={wrap}>
          <Reveal forceVisible={reducedMotion}>
            <p style={{ ...waypointLabel, marginBottom: 20 }}>Waypoint</p>
          </Reveal>
          <Reveal delayMs={80} forceVisible={reducedMotion}>
            <h1
              style={{
                ...displayText,
                fontSize: "clamp(56px, 12vw, 96px)",
                fontWeight: 500,
                marginBottom: 16,
              }}
            >
              Anchor
            </h1>
          </Reveal>
          <Reveal delayMs={160} forceVisible={reducedMotion}>
            <p
              style={{
                ...displayText,
                fontSize: "clamp(22px, 3.4vw, 32px)",
                maxWidth: "18ch",
                marginBottom: 28,
                color: tokens.paperMuted,
              }}
            >
              Design Engineering for continuous AI collaboration.
            </p>
          </Reveal>
          <Reveal delayMs={240} forceVisible={reducedMotion}>
            <p style={{ ...bodyMuted, marginBottom: 12 }}>
              Conversations disappear. Projects shouldn’t.
            </p>
          </Reveal>
          <Reveal delayMs={300} forceVisible={reducedMotion}>
            <p
              style={{
                ...displayText,
                fontSize: "clamp(20px, 2.8vw, 26px)",
                marginBottom: 40,
              }}
            >
              Continue instead of reconstruct.
            </p>
          </Reveal>
          <Reveal delayMs={380} forceVisible={reducedMotion}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 20,
                alignItems: "center",
              }}
            >
              <a
                href={links.repo}
                style={btnPrimary}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore Anchor
              </a>
              <a
                href={links.journey}
                style={btnGhost}
                target="_blank"
                rel="noopener noreferrer"
              >
                See it applied →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Moment 3 — Transformation chain */}
      <section
        style={{ ...section, borderBottom: `1px solid ${tokens.line}` }}
        aria-label="How thinking becomes durable"
      >
        <div style={wrap}>
          <Reveal forceVisible={reducedMotion}>
            <p style={{ ...waypointLabel, marginBottom: 36 }}>Course</p>
          </Reveal>
          <ol
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            {chainSteps.map((step, i) => (
              <li key={step.label}>
                <Reveal delayMs={i * 120} forceVisible={reducedMotion}>
                  <a
                    href={step.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      textDecoration: "none",
                      color: "inherit",
                      padding: "18px 0",
                    }}
                  >
                    <span
                      style={{
                        ...displayText,
                        fontSize: "clamp(32px, 5vw, 44px)",
                        display: "block",
                      }}
                    >
                      {step.label}
                    </span>
                  </a>
                </Reveal>
                {i < chainSteps.length - 1 ? (
                  <Reveal delayMs={i * 120 + 60} forceVisible={reducedMotion}>
                    <div
                      style={{
                        height: 36,
                        width: 1,
                        marginLeft: 4,
                        background: tokens.teal,
                        opacity: 0.55,
                      }}
                      aria-hidden
                    />
                  </Reveal>
                ) : null}
              </li>
            ))}
          </ol>
          <Reveal delayMs={chainSteps.length * 120} forceVisible={reducedMotion}>
            <p
              style={{
                ...displayText,
                fontSize: "clamp(22px, 3vw, 28px)",
                marginTop: 40,
                color: tokens.tealBright,
              }}
            >
              Continue instead of reconstruct.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Moment 4 — Proof */}
      <section
        style={{ ...section, borderBottom: `1px solid ${tokens.line}` }}
        aria-label="Evidence"
      >
        <div style={wrap}>
          <Reveal forceVisible={reducedMotion}>
            <p style={{ ...waypointLabel, marginBottom: 16 }}>Evidence log</p>
          </Reveal>
          <Reveal delayMs={80} forceVisible={reducedMotion}>
            <h2
              style={{
                ...displayText,
                fontSize: "clamp(28px, 4vw, 40px)",
                marginBottom: 12,
              }}
            >
              Proof, not claims.
            </h2>
          </Reveal>
          <Reveal delayMs={120} forceVisible={reducedMotion}>
            <p style={{ ...bodyMuted, marginBottom: 40 }}>
              Explore the artifacts Anchor leaves in a real repository.
            </p>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {proofCards.map((card, i) => {
              const external = card.href.startsWith("http");
              return (
                <Reveal key={card.title} delayMs={i * 80} forceVisible={reducedMotion}>
                  <a
                    href={card.href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    style={{
                      ...hairlineCard,
                      borderBottom:
                        i === proofCards.length - 1
                          ? `1px solid ${tokens.line}`
                          : undefined,
                    }}
                  >
                    <span
                      style={{
                        ...displayText,
                        fontSize: 22,
                      }}
                    >
                      {card.title}
                    </span>
                    <span style={{ color: tokens.paperMuted, fontSize: 15 }}>
                      {card.blurb}
                    </span>
                    <span style={{ ...waypointLabel, marginTop: 4 }}>Open →</span>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Moment 5 — Exit */}
      <section style={{ ...section, borderBottom: "none" }} aria-label="Explore">
        <div style={wrap}>
          <Reveal forceVisible={reducedMotion}>
            <p style={{ ...waypointLabel, marginBottom: 20 }}>Handoff</p>
          </Reveal>
          <Reveal delayMs={80} forceVisible={reducedMotion}>
            <h2
              style={{
                ...displayText,
                fontSize: "clamp(28px, 4.4vw, 40px)",
                maxWidth: "18ch",
                marginBottom: 36,
              }}
            >
              Anchor has already shaped real projects.
            </h2>
          </Reveal>
          <Reveal delayMs={160} forceVisible={reducedMotion}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 20,
                alignItems: "center",
                marginBottom: 48,
              }}
            >
              <a
                href={links.repo}
                style={btnPrimary}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore Anchor
              </a>
              <a
                href={links.journey}
                style={btnGhost}
                target="_blank"
                rel="noopener noreferrer"
              >
                See it applied →
              </a>
            </div>
          </Reveal>
          <Reveal delayMs={240} forceVisible={reducedMotion}>
            <p
              style={{
                ...bodyMuted,
                fontSize: 14,
                borderTop: `1px solid ${tokens.line}`,
                paddingTop: 28,
                maxWidth: "54ch",
              }}
            >
              Anchor is an actively validated Design Engineering framework,
              refined on real projects and entering broader external validation.
            </p>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
