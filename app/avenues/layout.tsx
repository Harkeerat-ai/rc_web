import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avenues | Rotaract Club of Bombay West",
  description:
    "Explore the avenues of Rotaract Club of Bombay West — Community Service, International Service, Professional Development, Events & Fellowship, and the support avenues that power our service in District 3141, Mumbai.",
  alternates: {
    canonical: "/avenues",
  },
};

export default function AvenuesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
