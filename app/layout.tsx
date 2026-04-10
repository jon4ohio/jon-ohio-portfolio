import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ThemeScript from "@/components/ThemeScript";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const defaultTitle = "John Ohio — Product Systems & DesignOps Lead";
const defaultDescription =
  "John Ohio designs product systems that scale — from fragmented to intelligent. Design systems, DesignOps, enterprise SaaS, fintech infrastructure, and AI-native workflows.";

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
    "Product Design Lead",
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f5" },
    { media: "(prefers-color-scheme: dark)", color: "#1e2228" },
  ],
  colorScheme: "light dark",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "John Ohio",
  alternateName: "Jon Ohio",
  jobTitle: "Product Systems & DesignOps Lead",
  description: defaultDescription,
  url: siteUrl,
  email: "mailto:jon4ohio@gmail.com",
  sameAs: ["https://linkedin.com/in/jon4ohio"],
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
    <html lang="en" data-theme="warm" suppressHydrationWarning>
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
      </body>
    </html>
  );
}
