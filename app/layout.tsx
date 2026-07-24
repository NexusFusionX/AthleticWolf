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

/** Only the homepage plays the intro. Other routes skip boot immediately. */
const bootSkipScript = `(function(){try{var p=location.pathname;if(p!=='/'&&p!==''){document.documentElement.classList.add('aw-boot-done','aw-boot-skip');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${outfit.variable} h-full bg-black antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-black">
        <script dangerouslySetInnerHTML={{ __html: bootSkipScript }} />
        {/* Instant cover on homepage full loads (open + reload + Home link) */}
        <div id="aw-boot" aria-hidden="true" suppressHydrationWarning>
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
