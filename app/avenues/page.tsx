import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import AvenueCard from "@/components/avenues/AvenueCard";
import { mainAvenues, supportAvenues } from "@/lib/avenues";

export default function AvenuesPage() {
  return (
    <div className="relative min-h-screen pt-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <Reveal className="mb-16">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-goldtext to-rusttext bg-clip-text text-transparent">
              Avenues
            </span>
          </h1>
          <p className="text-text-muted max-w-xl text-sm md:text-base">
            Every avenue of RCBW is a strand in the fabric of our service — a
            dedicated space where members channel their passion and make
            impact. Explore each one below.
          </p>
        </Reveal>

        <section className="mb-16">
          <div className="mb-8 flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-goldtext text-xs uppercase tracking-widest">
              Main Avenues
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainAvenues.map((avenue, i) => (
              <AvenueCard key={avenue.slug} avenue={avenue} index={i} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-8 flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-goldtext text-xs uppercase tracking-widest">
              Support Avenues
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportAvenues.map((avenue, i) => (
              <AvenueCard key={avenue.slug} avenue={avenue} index={i} />
            ))}
          </div>
        </section>

        <Reveal y={20} className="mt-16 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold/10 border border-gold/30 text-goldtext text-sm hover:bg-gold/20 transition-all duration-300 cursor-pointer"
          >
            Interested? Join an avenue
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
