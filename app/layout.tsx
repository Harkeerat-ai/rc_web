import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProvider from "@/components/layout/ScrollProvider";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import MainErrorBoundary from "@/components/layout/MainErrorBoundary";
import FirefliesBackdrop from "@/components/layout/FirefliesBackdrop";

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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <FirefliesBackdrop />
        <Navbar />
        <MainErrorBoundary>
          <main className="min-h-screen">
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
