import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "John Ohio — Product Design Lead",
  description: "Product Design Lead specialising in design systems, fintech infrastructure, and enterprise SaaS. I design product systems that evolve — from fragmented to structured to scalable to intelligent.",
  keywords: ["product design", "design systems", "fintech", "enterprise UX", "DesignOps", "John Ohio"],
  authors: [{ name: "John Ohio" }],
  openGraph: {
    title: "John Ohio — Product Design Lead",
    description: "Design systems · Fintech · Enterprise SaaS · 0→1 Product Design",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ margin: 0, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", WebkitFontSmoothing: "antialiased" }}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
