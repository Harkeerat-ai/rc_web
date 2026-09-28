export default function Backdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-48 left-1/2 h-[52rem] w-[92rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(227,178,80,0.16),transparent_62%)]" />
      <div className="absolute -bottom-52 -left-44 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(200,90,30,0.10),transparent_62%)]" />
      <div className="absolute -top-28 -right-36 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(120,140,210,0.08),transparent_62%)]" />

      <div className="absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10" />
      <div className="absolute left-1/2 top-1/2 h-[72rem] w-[72rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/5" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/rcbw-phoenix.webp"
        alt=""
        className="absolute left-1/2 top-[45%] w-[min(70rem,90vw)] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[var(--phoenix-opacity)] [mask-image:linear-gradient(to_bottom,#000_60%,transparent)]"
      />
    </div>
  );
}