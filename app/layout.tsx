import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { FloatingFaqWidget } from "./components/FloatingFaqWidget";
import { ScrollProgress } from "./components/ScrollProgress";
import { SitePreloader } from "./components/SitePreloader";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Athletic Wolf | Online Personal Training & Coaching",
  description:
    "ISSA-certified online personal training. Custom workout and nutrition programs, weekly check-ins, and real accountability. Coaching clients worldwide.",
};

const bootCss = `
#aw-boot{position:fixed;inset:0;z-index:100000;background:#000;display:flex;align-items:center;justify-content:center}
#aw-boot img{width:88px;height:88px;border-radius:50%;object-fit:cover;display:block;border:1px solid rgba(255,138,77,.35)}
html:not(.aw-boot-done){overflow:hidden!important}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${outfit.variable} h-full bg-black antialiased`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: bootCss }} />
      </head>
      <body className="flex min-h-full flex-col bg-black">
        {/* Instant cover — paints before React, so homepage never flashes */}
        <div id="aw-boot" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/athletic-wolf-logo.png"
            alt=""
            width={88}
            height={88}
          />
        </div>
        <div className="grain-overlay" aria-hidden />
        <SitePreloader />
        <ScrollProgress />
        {children}
        <FloatingFaqWidget />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
