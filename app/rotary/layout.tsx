import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rotary & District 3141 | Rotaract Club of Bombay West",
  description:
    "Rooted in the values of Rotary International, Rotaract Club of Bombay West is a youth-led club proudly serving under Rotary District 3141 in Mumbai.",
};

export default function RotaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}