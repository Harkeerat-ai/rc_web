import type { Metadata } from "next";
import { Space_Grotesk, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProvider from "@/components/layout/ScrollProvider";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import MainErrorBoundary from "@/components/layout/MainErrorBoundary";
import LazyWidgets from "@/components/layout/LazyWidgets";
import CheerMarquee from "@/components/layout/CheerMarquee";
import AvenueMarquee from "@/components/layout/AvenueMarquee";
import Backdrop from "@/components/layout/Backdrop";

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

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rotaract Club of Bombay West",
    description:
      "Rise Above Yourself — Join the Rotaract Club of Bombay West.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rotaract Club of Bombay West — Rise Above Yourself",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotaract Club of Bombay West | Rise Above Yourself",
    description:
      "A dynamic community of young leaders committed to service, growth, and transformation — RCBW, RID 3141.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body antialiased">
        <Backdrop />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:border focus:border-gold/40 focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-goldtext"
        >
          Skip to main content
        </a>
        <LazyWidgets />
        <Navbar />
        <CheerMarquee />
        <AvenueMarquee />
        <MainErrorBoundary>
          <main id="main-content" tabIndex={-1} className="min-h-screen focus:outline-none">
            <LayoutWrapper>
              <ScrollProvider>{children}</ScrollProvider>
            </LayoutWrapper>
          </main>
        </MainErrorBoundary>
        <Footer />
      </body>
    </html>
  );
}