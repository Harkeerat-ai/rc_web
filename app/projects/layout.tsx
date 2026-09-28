import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Rotaract Club of Bombay West",
  description:
    "Explore the projects of Rotaract Club of Bombay West — from education and sports to culture and community service, in District 3141, Mumbai.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}