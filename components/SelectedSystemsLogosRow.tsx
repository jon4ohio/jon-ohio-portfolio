import type { CSSProperties } from "react";
import Image from "next/image";
import { trustedByLogos, type TrustedByLogo } from "@/lib/trustedBy";

/** Fluid logo height — scales with viewport; swap assets in lib/trustedBy for sharper vectors/PNGs. */
const LOGO_HEIGHT = "clamp(15px, 2.85vw, 21px)";
const LOGO_MAX_WIDTH = "min(40vw, 140px)";

function LogoMark({ logo }: { logo: TrustedByLogo }) {
  const imageStyle: CSSProperties = {
    height: LOGO_HEIGHT,
    width: "auto",
    maxWidth: LOGO_MAX_WIDTH,
    objectFit: "contain",
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
    <div
      role="group"
      aria-label={`Organizations: ${names}`}
      style={{
        marginTop: 40,
        paddingTop: 32,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "clamp(12px, 2vw, 26px) clamp(16px, 2.75vw, 30px)",
        opacity: 0.35,
      }}
    >
      {trustedByLogos.map((logo) => (
        <span
          key={logo.src}
          style={{
            display: "inline-flex",
            alignItems: "center",
            minHeight: LOGO_HEIGHT,
          }}
        >
          <LogoMark logo={logo} />
        </span>
      ))}
    </div>
  );
}
