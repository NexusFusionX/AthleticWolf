import type { Metadata } from "next";
import { Geist, Geist_Mono, Anton } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Athletic Wolf | Online Personal Training & Coaching",
  description:
    "ISSA-certified online personal training. Custom workout and nutrition programs, weekly check-ins, and real accountability — coaching clients worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="grain-overlay" aria-hidden />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
