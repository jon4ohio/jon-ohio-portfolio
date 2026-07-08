import * as React from "react";

/**
 * Theme-aware inline diagram — external SVG cannot read `data-theme` when used via <img>.
 */
export default function DecisionArchitectureDiagram() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 320"
      fill="none"
      role="img"
      aria-label="Human–AI decision architecture"
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        borderRadius: 8,
        border: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <text
        x="600"
        y="36"
        textAnchor="middle"
        fill="var(--fg)"
        fontFamily="system-ui, sans-serif"
        fontSize="14"
        fontWeight="700"
        letterSpacing="0.06em"
      >
        HUMAN–AI DECISION ARCHITECTURE
      </text>
      <g fontFamily="system-ui, sans-serif" fontSize="11" fill="var(--fg-muted)">
        <circle cx="100" cy="160" r="44" fill="#e8f0fe" stroke="#5b7fd4" strokeWidth="1.5" />
        <text x="100" y="156" textAnchor="middle" fontWeight="600" fill="var(--fg)">
          Human
        </text>
        <text x="100" y="172" textAnchor="middle" fontWeight="600" fill="var(--fg)">
          Intent
        </text>
        <path d="M148 160 H168" stroke="var(--border)" strokeWidth="1.5" markerEnd="url(#rivva-arr)" />
        <circle cx="260" cy="160" r="44" fill="#ede8fe" stroke="#7b5bd4" strokeWidth="1.5" />
        <text x="260" y="156" textAnchor="middle" fontWeight="600" fill="var(--fg)">
          AI
        </text>
        <text x="260" y="172" textAnchor="middle" fontWeight="600" fill="var(--fg)">
          Interpretation
        </text>
        <path d="M308 160 H328" stroke="var(--border)" strokeWidth="1.5" markerEnd="url(#rivva-arr)" />
        <circle cx="420" cy="160" r="44" fill="#e8f4fe" stroke="#5ba8d4" strokeWidth="1.5" />
        <text x="420" y="156" textAnchor="middle" fontWeight="600" fill="var(--fg)">
          Decision
        </text>
        <text x="420" y="172" textAnchor="middle" fontWeight="600" fill="var(--fg)">
          Engine
        </text>
        <path d="M468 160 H488" stroke="var(--border)" strokeWidth="1.5" markerEnd="url(#rivva-arr)" />
        <circle cx="580" cy="160" r="44" fill="#e8fef4" stroke="#5bd4a8" strokeWidth="1.5" />
        <text x="580" y="156" textAnchor="middle" fontWeight="600" fill="var(--fg)">
          Explanation
        </text>
        <text x="580" y="172" textAnchor="middle" fontWeight="600" fill="var(--fg)">
          Layer
        </text>
        <path d="M628 160 H648" stroke="var(--border)" strokeWidth="1.5" markerEnd="url(#rivva-arr)" />
        <circle cx="740" cy="160" r="44" fill="#fef8e8" stroke="#d4b85b" strokeWidth="1.5" />
        <text x="740" y="156" textAnchor="middle" fontWeight="600" fill="var(--fg)">
          User
        </text>
        <text x="740" y="172" textAnchor="middle" fontWeight="600" fill="var(--fg)">
          Confirmation
        </text>
        <path d="M788 160 H808" stroke="var(--border)" strokeWidth="1.5" markerEnd="url(#rivva-arr)" />
        <circle cx="900" cy="160" r="44" fill="#f0e8fe" stroke="#9b5bd4" strokeWidth="1.5" />
        <text x="900" y="148" textAnchor="middle" fontWeight="600" fill="var(--fg)">
          Continuous
        </text>
        <text x="900" y="164" textAnchor="middle" fontWeight="600" fill="var(--fg)">
          Learning
        </text>
        <path
          d="M944 200 Q600 280 156 200"
          stroke="var(--border)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          fill="none"
        />
        <text
          x="600"
          y="268"
          textAnchor="middle"
          fontSize="10"
          fill="var(--fg-muted)"
          fontStyle="italic"
        >
          Trust is built through a transparent, repeatable loop
        </text>
      </g>
      <defs>
        <marker id="rivva-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--fg-subtle)" />
        </marker>
      </defs>
    </svg>
  );
}
