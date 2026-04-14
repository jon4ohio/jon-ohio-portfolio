import type { CSSProperties } from "react";
import Image from "next/image";
import { trustedByLogos, type TrustedByLogo } from "@/lib/trustedBy";

/** Fluid logo height — scales with viewport; swap assets in lib/trustedBy for sharper vectors/PNGs. */
const LOGO_HEIGHT = "clamp(16px, 2.35vw, 24px)";
const LOGO_MAX_WIDTH = "min(44vw, 160px)";

function LogoMark({ logo }: { logo: TrustedByLogo }) {
  const imageStyle: CSSProperties = {
    height: LOGO_HEIGHT,
    width: "auto",
    maxWidth: LOGO_MAX_WIDTH,
    objectFit: "contain",
    opacity: logo.opacity ?? 0.6,
    filter: "grayscale(1) contrast(1.05)",
  };

  if (logo.format === "svg") {
    return (
      <Image
        src={logo.src}
        alt=""
        width={logo.width}
        height={logo.height}
        unoptimized
        style={imageStyle}
      />
    );
  }

  return (
    <Image
      src={logo.src}
      alt=""
      width={logo.width}
      height={logo.height}
      sizes="(max-width: 480px) 88px, (max-width: 900px) 120px, 152px"
      style={imageStyle}
    />
  );
}

/** Reinforcement only: static logos after case study rows (no heading, no motion). */
export default function SelectedSystemsLogosRow() {
  const names = trustedByLogos.map((l) => l.alt).join(", ");

  return (
    <div style={{ marginTop: 40, paddingTop: 32 }}>
      <p
        className="section-label"
        style={{
          marginBottom: 16,
          color: "var(--fg-subtle)",
          opacity: 0.85,
        }}
      >
        Trusted by
      </p>
      <div
        role="group"
        aria-label={`Organizations: ${names}`}
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "clamp(10px, 1.4vw, 16px) clamp(14px, 2.2vw, 22px)",
        }}
      >
        {trustedByLogos.map((logo) => (
          <span
            key={logo.src}
            style={{
              display: "inline-flex",
              alignItems: "center",
              minHeight: LOGO_HEIGHT,
              paddingTop: 2,
              paddingBottom: 2,
            }}
          >
            <LogoMark logo={logo} />
          </span>
        ))}
      </div>
    </div>
  );
}
