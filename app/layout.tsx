import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProvider from "@/components/layout/ScrollProvider";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import MainErrorBoundary from "@/components/layout/MainErrorBoundary";
import FirefliesBackdrop from "@/components/layout/FirefliesBackdrop";
import AnimatedPhoenix from "@/components/phoenix/AnimatedPhoenix";
import LazyWidgets from "@/components/layout/LazyWidgets";
import CheerMarquee from "@/components/layout/CheerMarquee";
import ThemeProvider from "@/components/providers/ThemeProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rc-web-six.vercel.app"),
  title: "Rotaract Club of Bombay West | Rise Above Yourself",
  description:
    "Rotaract Club of Bombay West — A dynamic community of young leaders committed to service, growth, and transformation. Rise above yourself with RCBW, RID 3141.",
  keywords: [
    "Rotaract",
    "Bombay West",
    "RCBW",
    "RID 3141",
    "community service",
    "youth leadership",
    "Mumbai",
  ],
  openGraph: {
    title: "Rotaract Club of Bombay West",
    description:
      "Rise Above Yourself — Join the Rotaract Club of Bombay West.",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Rotaract Club of Bombay West — Rise Above Yourself",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased">
        <ThemeProvider>
          <FirefliesBackdrop />
          <AnimatedPhoenix />
          <LazyWidgets />
          <Navbar />
          <CheerMarquee />
          <MainErrorBoundary>
            <main className="min-h-screen">
              <LayoutWrapper>
                <ScrollProvider>{children}</ScrollProvider>
              </LayoutWrapper>
            </main>
          </MainErrorBoundary>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
