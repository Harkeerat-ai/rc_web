import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import PhoenixIcon from "@/components/chat/PhoenixIcon";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 text-center">
      <Reveal scale={0.8} y={0} className="flex flex-col items-center gap-6 mb-8">
        <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center">
          <PhoenixIcon className="w-12 h-12" />
        </div>
        <h1 className="font-heading text-7xl sm:text-8xl md:text-9xl font-bold leading-none">
          <span className="bg-gradient-to-r from-goldtext to-rusttext bg-clip-text text-transparent">
            404
          </span>
        </h1>
      </Reveal>

      <Reveal delay={0.15} className="max-w-md mb-10">
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-ivory mb-3">
          This page has gone up in flames.
        </h2>
        <p className="text-text-muted text-sm sm:text-base leading-relaxed">
          But don&apos;t worry — like the phoenix, this club always rises.
          Let&apos;s get you back to solid ground.
        </p>
      </Reveal>

      <Reveal delay={0.3} className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-gold text-ivory font-semibold text-sm hover:bg-gold/90 transition-all duration-300"
        >
          Back Home
        </Link>
        <Link
          href="/projects"
          className="px-6 py-3 rounded-full bg-gold/10 border border-gold/30 text-goldtext text-sm hover:bg-gold/20 transition-all duration-300"
        >
          Explore Projects
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-full bg-transparent border border-ivory/20 text-ivory/80 text-sm hover:border-ivory/40 hover:text-ivory transition-all duration-300"
        >
          Contact Us
        </Link>
      </Reveal>
    </div>
  );
}
