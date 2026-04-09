import type { CSSProperties } from "react";
import Image from "next/image";
import { trustedByLogos, type TrustedByLogo } from "@/lib/trustedBy";

/** Fluid logo height — slightly smaller on web; scales with viewport until cap (swap assets later for crisp vectors). */
const LOGO_HEIGHT = "clamp(13px, 2.25vw, 17px)";
const LOGO_MAX_WIDTH = "min(36vw, 118px)";

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
      sizes="(max-width: 480px) 72px, (max-width: 900px) 100px, 128px"
      style={imageStyle}
    />
  );
}

/** Reinforcement only: static logos after case study rows (no heading, no motion). */
export default function SelectedSystemsLogosRow() {
  const names = trustedByLogos.map((l) => l.alt).join(", ");

  return (
    <div
      aria-label={`Organizations: ${names}`}
      style={{
        marginTop: 40,
        paddingTop: 32,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "clamp(10px, 1.75vw, 22px) clamp(14px, 2.25vw, 26px)",
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
