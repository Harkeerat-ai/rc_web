import Reveal from "@/components/motion/Reveal";
import { board } from "@/lib/board";

export default function MembersPage() {
  return (
    <div className="relative min-h-screen pt-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <Reveal className="mb-16">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Core{" "}
            <span className="bg-gradient-to-r from-goldtext to-rusttext bg-clip-text text-transparent">
              Members
            </span>
          </h1>
          <p className="text-text-muted max-w-xl text-sm md:text-base">
            The heart of RCBW — the core team steering our vision of service,
            fellowship, and leadership across District 3141.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {board.map((member, i) => (
            <Reveal
              key={member.id}
              delay={i * 0.06}
              className="group glass-card p-6 sm:p-8 text-center hover:border-gold/40 transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-gold to-rust flex items-center justify-center mb-5 shadow-lg">
                {member.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.photo}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-heading text-2xl font-bold">
                    {member.name.charAt(0)}
                  </span>
                )}
              </div>
              <h2 className="font-heading text-lg font-bold text-ivory mb-1">
                {member.name}
              </h2>
              <p className="text-goldtext text-sm font-semibold mb-3">
                {member.role}
              </p>
              {member.description && (
                <p className="text-text-muted text-sm leading-relaxed">
                  {member.description}
                </p>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
