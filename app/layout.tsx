import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import CommandPalette from "@/components/CommandPalette";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ThemeScript from "@/components/ThemeScript";
import { siteDescription, siteTitle } from "@/lib/sitePositioning";
import { getSiteUrl, isIndexableDeployment } from "@/lib/siteUrl";

const siteUrl = getSiteUrl();
const indexable = isIndexableDeployment();

const defaultTitle = siteTitle;
const defaultDescription = siteDescription;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "John Ohio — Portfolio",
  title: {
    default: defaultTitle,
    template: "%s — John Ohio",
  },
  description: defaultDescription,
  keywords: [
    "John Ohio",
    "Lead Product Designer",
    "Product Systems",
    "Design Systems",
    "DesignOps",
    "Enterprise UX",
    "Fintech Design",
    "AI UX",
    "Design Tokens",
    "SeamlessHR",
    "Seamkit",
  ],
  authors: [{ name: "John Ohio", url: siteUrl }],
  creator: "John Ohio",
  publisher: "John Ohio",
  category: "design",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "John Ohio",
    title: defaultTitle,
    description: defaultDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    creator: "@jon4ohio",
  },
  robots: indexable
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-snippet": -1,
          "max-image-preview": "large",
          "max-video-preview": -1,
        },
      }
    : {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7faf8" },
    { media: "(prefers-color-scheme: dark)", color: "#1e2228" },
  ],
  colorScheme: "light dark",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "John Ohio",
  alternateName: "Jon Ohio",
  jobTitle: "Lead Product Designer",
  description: defaultDescription,
  url: siteUrl,
  email: "mailto:jon4ohio@gmail.com",
  sameAs: ["https://linkedin.com/in/jon4ohio", "https://theuxcompany.substack.com/"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abuja",
    addressCountry: "NG",
  },
  knowsAbout: [
    "Product Design",
    "Design Systems",
    "DesignOps",
    "Design Tokens",
    "AI UX",
    "Enterprise SaaS",
    "Fintech Infrastructure",
    "Product-Led Growth",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "John Ohio — Portfolio",
  url: siteUrl,
  inLanguage: "en",
  publisher: {
    "@type": "Person",
    name: "John Ohio",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <CommandPalette />
        <SpeedInsights />
        <Analytics />
        {process.env.NODE_ENV === "development" && (
          <Script
            src="https://mcp.figma.com/mcp/html-to-design/capture.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
