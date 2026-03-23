import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SolidLine Digital — Simple Websites That Bring Real Clients",
    template: "%s | SolidLine Digital",
  },
  description:
    "We build clean, fast websites for small businesses that want clarity, structure, and results — not unnecessary complexity.",
  keywords: ["web development", "small business website", "landing page", "lead generation", "web studio"],
  openGraph: {
    title: "SolidLine Digital — Simple Websites That Bring Real Clients",
    description:
      "Clean, fast websites for small businesses. Get a professional site that actually works for your business.",
    siteName: "SolidLine Digital",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0A0A0A] text-[#F5F5F5]`}
      >
        <LanguageProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
