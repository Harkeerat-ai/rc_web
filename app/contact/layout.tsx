import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Rotaract Club of Bombay West",
  description:
    "Get in touch with the Rotaract Club of Bombay West — join our community of young leaders in District 3141, Mumbai, and rise above yourself.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}