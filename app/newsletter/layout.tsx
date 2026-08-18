import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletters & Publications | Rotaract Club of Bombay West",
  description:
    "Browse the quarterly newsletters and special editions of Rotaract Club of Bombay West — stories of service, fellowship, and impact from District 3141.",
};

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}