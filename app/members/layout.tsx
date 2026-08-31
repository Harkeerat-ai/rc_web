import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core Members | Rotaract Club of Bombay West",
  description:
    "Meet the core members of Rotaract Club of Bombay West — the leaders driving service, fellowship, and growth in District 3141, Mumbai.",
  alternates: {
    canonical: "/members",
  },
};

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
