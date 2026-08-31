import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import AvenueHero from "@/components/avenues/AvenueHero";
import AvenueProjects from "@/components/avenues/AvenueProjects";
import AvenueOfficer from "@/components/avenues/AvenueOfficer";
import { avenueBySlug, avenues } from "@/lib/avenues";
import { projectsByAvenue } from "@/lib/data";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return avenues.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const avenue = avenueBySlug(params.slug);
  if (!avenue) return {};
  return {
    title: `${avenue.name} | Rotaract Club of Bombay West`,
    description: avenue.tagline,
  };
}

export default function AvenuePage({ params }: PageProps) {
  const avenue = avenueBySlug(params.slug);
  if (!avenue) notFound();

  const projects = projectsByAvenue(avenue.slug);

  return (
    <div className="relative min-h-screen pt-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <Reveal>
          <AvenueHero avenue={avenue} />
        </Reveal>

        <Reveal y={20} className="mt-12 max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-ivory">
            What We Do
          </h2>
          <div className="space-y-4 text-text-muted leading-relaxed">
            {avenue.mission.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </Reveal>

        <Reveal y={20} className="mt-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-ivory">
              Projects &amp; Events
            </h2>
            <Link
              href="/projects"
              className="text-goldtext text-sm hover:underline"
            >
              View all flagships
            </Link>
          </div>
          <AvenueProjects projects={projects} />
        </Reveal>

        <div className="mt-16">
          <AvenueOfficer avenue={avenue} />
        </div>
      </div>
    </div>
  );
}
