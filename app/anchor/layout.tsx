import { IBM_Plex_Mono, Newsreader, Source_Sans_3 } from "next/font/google";
import AnchorProductChrome from "./AnchorProductChrome";
import { anchorProduct as c } from "./anchorProduct";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-anchor-display",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-anchor-body",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-anchor-mono",
  display: "swap",
});

export default function AnchorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${newsreader.variable} ${sourceSans.variable} ${plexMono.variable}`}
      style={{
        background: c.bg,
        color: c.paper,
        fontFamily: c.body,
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        minHeight: "100vh",
      }}
    >
      <AnchorProductChrome />
      {children}
    </div>
  );
}
