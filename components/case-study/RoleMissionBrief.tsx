import * as React from "react";

export type RoleMissionBriefProps = {
  mission: string;
  intro: string;
  led: string[];
  collaboratedOn: string[];
  close: string;
};

function Micro({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "var(--fg-subtle)",
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}

function ListColumn({ label, items }: { label: string; items: string[] }) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <Micro>{label}</Micro>
      <ul style={{ margin: "12px 0 0", paddingLeft: 18, color: "var(--fg-body)", lineHeight: 1.75 }}>
        {items.map((item) => (
          <li key={item} style={{ fontSize: 15, marginBottom: 6 }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RoleMissionBrief({
  mission,
  intro,
  led,
  collaboratedOn,
  close,
}: RoleMissionBriefProps) {
  return (
    <div style={{ maxWidth: 760 }}>
      <div
        style={{
          borderLeft: "3px solid var(--accent-orange)",
          paddingLeft: 20,
          marginBottom: 28,
        }}
      >
        <Micro>Mission</Micro>
        <p
          style={{
            margin: "10px 0 0",
            fontSize: 18,
            fontWeight: 600,
            lineHeight: 1.55,
            color: "var(--fg)",
          }}
        >
          {mission}
        </p>
      </div>

      <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, margin: "0 0 28px" }}>{intro}</p>

      <div
        className="grid-2"
        style={{ gap: 32, marginBottom: 28 }}
      >
        <ListColumn label="I led" items={led} />
        <ListColumn label="I collaborated on" items={collaboratedOn} />
      </div>

      <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, margin: 0 }}>{close}</p>
    </div>
  );
}
