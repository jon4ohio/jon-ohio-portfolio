import type { CSSProperties } from "react";
import Image from "next/image";
import { trustedByLogos, type TrustedByLogo } from "@/lib/trustedBy";

const LOGO_ROW_HEIGHT = 48;
const GAP_PX = 48;

function LogoMark({ logo }: { logo: TrustedByLogo }) {
  const opacity = logo.opacity ?? 1;
  const wrapperStyle: CSSProperties = {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity,
    height: LOGO_ROW_HEIGHT,
  };

  const imageStyle: CSSProperties = {
    height: LOGO_ROW_HEIGHT,
    width: "auto",
    maxWidth: 220,
    objectFit: "contain",
  };

  if (logo.format === "svg") {
    return (
      <div style={wrapperStyle}>
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          unoptimized
          style={imageStyle}
        />
      </div>
    );
  }

  return (
    <div style={wrapperStyle}>
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        sizes="180px"
        style={imageStyle}
      />
    </div>
  );
}

export default function TrustedByMarquee() {
  return (
    <section
      aria-label="Trusted by"
      style={{
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "20px 24px 28px" }}>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--fg-body)", marginBottom: 8 }}>Trusted By</p>
        <div
          className="trusted-by-marquee-viewport"
          style={{
            overflow: "hidden",
            marginLeft: -8,
            marginRight: -8,
            paddingLeft: 8,
            paddingRight: 8,
          }}
        >
          <div className="trusted-by-marquee-track" style={{ display: "flex", width: "max-content" }}>
            <div
              className="trusted-by-marquee-group"
              style={{
                display: "flex",
                gap: GAP_PX,
                alignItems: "center",
                flexShrink: 0,
                paddingRight: GAP_PX,
              }}
            >
              {trustedByLogos.map((logo, i) => (
                <LogoMark key={`a-${logo.src}-${i}`} logo={logo} />
              ))}
            </div>
            <div
              className="trusted-by-marquee-group"
              aria-hidden
              style={{
                display: "flex",
                gap: GAP_PX,
                alignItems: "center",
                flexShrink: 0,
                paddingRight: GAP_PX,
              }}
            >
              {trustedByLogos.map((logo, i) => (
                <LogoMark key={`b-${logo.src}-${i}`} logo={logo} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
