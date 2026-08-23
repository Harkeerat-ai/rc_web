import Reveal from "@/components/motion/Reveal";
import { newsletters } from "@/lib/data";

export default function NewsletterPage() {
  return (
    <div className="relative min-h-screen pt-24">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <Reveal className="mb-12">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-goldtext to-rusttext bg-clip-text text-transparent">
              Publications
            </span>
          </h1>
          <p className="text-text-muted max-w-xl text-sm md:text-base">
            Browse our quarterly newsletters and special editions to stay
            updated on our journey and impact.
          </p>
        </Reveal>

        <div className="space-y-4">
          {newsletters.map((newsletter, i) => (
            <Reveal
              key={newsletter.id}
              delay={i * 0.1}
              y={20}
              className="group glass-card p-3 sm:p-5 flex items-center justify-between hover:border-gold/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-goldtext"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-sm md:text-base font-semibold text-ivory group-hover:text-goldtext transition-colors duration-300">
                    {newsletter.title}
                  </h3>
                  <p className="text-text-muted text-xs mt-1">
                    {newsletter.date}
                  </p>
                </div>
              </div>

              <a
                href={newsletter.pdfUrl}
                download
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-goldtext text-xs hover:bg-gold/20 transition-all duration-300 cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                View PDF
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
