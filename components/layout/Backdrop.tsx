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

      <svg
        viewBox="0 0 1200 630"
        className="absolute left-1/2 top-[40%] w-[90rem] max-w-none -translate-x-1/2 -translate-y-1/2 text-gold opacity-[0.04]"
        fill="currentColor"
      >
        <g transform="translate(600 300)">
          <path d="M-55 -8 C -95 -45, -140 -62, -185 -62 C -160 -35, -150 -15, -148 5 C -170 -2, -190 -5, -205 0 C -180 20, -158 30, -132 32 C -148 50, -158 68, -160 88 C -130 78, -105 60, -85 36 C -55 60, -15 82, 30 92 C -5 58, -40 25, -55 -8 Z" opacity="0.9" />
          <path d="M-20 5 C 35 -35, 90 -65, 150 -78 C 120 -48, 108 -22, 104 5 C 128 -3, 148 -7, 165 0 C 138 22, 114 32, 86 34 C 102 52, 110 70, 110 90 C 80 78, 55 58, 35 32 C 2 55, -30 70, -60 78 Z" />
          <path d="M-8 -18 C 8 -40, 22 -58, 34 -70 C 28 -45, 24 -25, 22 -8 C 34 -16, 45 -20, 55 -20 C 40 -4, 28 4, 14 8 Z" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
}