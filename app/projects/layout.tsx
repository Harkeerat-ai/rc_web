import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Flagships | Rotaract Club of Bombay West",
  description:
    "Explore the flagship projects of Rotaract Club of Bombay West — from education and sports to culture and community service, in District 3141, Mumbai.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}