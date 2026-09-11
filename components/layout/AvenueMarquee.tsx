import { avenues } from "@/lib/avenues";

export default function AvenueMarquee() {
  const row = [...avenues, ...avenues];
  return (
    <div
      aria-hidden
      className="relative z-40 overflow-hidden border-y border-gold/10 bg-primary/60 py-3 backdrop-blur-sm"
    >
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {row.map((avenue, i) => (
          <span
            key={i}
            className="flex items-center font-heading text-xs uppercase tracking-[0.3em] text-goldtext/80"
          >
            <span className="px-6">{avenue.name}</span>
            <span className="text-rust/50">&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  );
}