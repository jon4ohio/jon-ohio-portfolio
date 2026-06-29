export default function WorkInProgressBadge() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 8,
        lineHeight: 1,
        color: "var(--fg-muted)",
        border: "1px solid var(--border)",
        padding: "1px 4px",
        borderRadius: 2,
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
    >
      Case study in progress
    </span>
  );
}
