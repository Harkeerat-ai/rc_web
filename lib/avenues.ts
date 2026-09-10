export type AvenueKind = "main" | "support";

export interface BoardDirector {
  name: string;
  role?: string;
  photo?: string;
}

export interface Avenue {
  slug: string;
  name: string;
  kind: AvenueKind;
  /** Tailwind gradient stops for the avenue hero/banner, e.g. "from-emerald-700 to-teal-600" */
  gradient: string;
  /** Tailwind solid color used for accents/icons/badges, e.g. "emerald" */
  accent: string;
  icon: string;
  tagline: string;
  mission: string[];
  directors: BoardDirector[];
  banner?: string;
}

export const avenueBySlug = (slug: string): Avenue | undefined =>
  avenues.find((a) => a.slug === slug);

export const mainAvenues: Avenue[] = [
  {
    slug: "community-service",
    name: "Community Service",
    kind: "main",
    gradient: "from-emerald-700 to-teal-600",
    accent: "emerald",
    icon: "heart",
    tagline: "Service that touches lives.",
    mission: [
      "Our Community Service avenue channels the club's energy into projects that directly uplift communities — from feeding programmes and health drives to educational outreach.",
      "Every initiative is an opportunity to give back, to listen, and to create measurable, lasting change for those around us.",
    ],
    directors: [
      { name: "Dhyaani Shah", role: "Community Service", photo: "/members/dhyaani-shah.jpg" },
      { name: "Palak Deora", role: "Community Service", photo: "/members/palak-deora.jpg" },
    ],
  },
  {
    slug: "international-service",
    name: "International Service",
    kind: "main",
    gradient: "from-sky-700 to-blue-600",
    accent: "sky",
    icon: "globe",
    tagline: "Better world, closer together.",
    mission: [
      "Our International Service avenue connects RCBW with Rotaract and Rotary clubs across the globe, fostering cross-border projects, cultural exchange, and a shared spirit of service.",
      "Through global collaborations and district partnerships, we bring the world's best practices home and share our own.",
    ],
    directors: [
      { name: "Naqiya Paisawala", role: "International Service", photo: "/members/naqiya-paisawala.jpg" },
    ],
  },
  {
    slug: "professional-development",
    name: "Professional Development",
    kind: "main",
    gradient: "from-indigo-700 to-violet-600",
    accent: "indigo",
    icon: "briefcase",
    tagline: "Grow skills, build futures.",
    mission: [
      "Our Professional Development avenue empowers members with the skills, mentorship, and networks to excel in their careers.",
      "From workshops and speaker sessions to networking and leadership training, we invest in the leaders of tomorrow.",
    ],
    directors: [
      { name: "Ansh Manjul", role: "Professional Development" },
      { name: "Meit Bhattad", role: "Professional Development", photo: "/members/meit-bhattad.jpg" },
    ],
  },
  {
    slug: "events-fellowship",
    name: "Events and Fellowship",
    kind: "main",
    gradient: "from-rose-700 to-pink-600",
    accent: "rose",
    icon: "sparkles",
    tagline: "Where memories are made.",
    mission: [
      "Our Events and Fellowship avenue is the heartbeat of RCBW — planning the celebrations, mixers, and moments that make our club a family beyond Rotaract.",
      "From festive galas to casual get-togethers, we keep the fellowship alive and the energy high.",
    ],
    directors: [
      { name: "Naqiya Paisawala", role: "Events and Fellowship", photo: "/members/naqiya-paisawala.jpg" },
      { name: "Saloni Kapadia", role: "Events and Fellowship", photo: "/members/saloni-kapadia.jpg" },
    ],
  },
];

export const supportAvenues: Avenue[] = [
  {
    slug: "partners-in-service",
    name: "Partners in Service",
    kind: "support",
    gradient: "from-amber-600 to-yellow-500",
    accent: "amber",
    icon: "handshake",
    tagline: "Stronger together.",
    mission: [
      "Partners in Service strengthens the bonds between RCBW and our partner clubs, Interact clubs, and like-minded organisations.",
      "Together we deliver joint projects that multiply our impact and deepen our collective service.",
    ],
    directors: [
      { name: "Tanisha Kadulkar", role: "Partners in Service", photo: "/members/tanisha-kadulkar.jpg" },
    ],
  },
  {
    slug: "editorials",
    name: "Editorials",
    kind: "support",
    gradient: "from-slate-700 to-gray-600",
    accent: "slate",
    icon: "pen",
    tagline: "Telling our story.",
    mission: [
      "Editorials captures the voice of RCBW — documenting our projects, celebrating our people, and spreading our story through newsletters, features, and publications.",
      "Our words carry the club's journey to members, partners, and the wider community.",
    ],
    directors: [
      { name: "Shelly Rai", role: "Editorials", photo: "/members/shelly-rai.jpg" },
      { name: "Aindree Tiwari", role: "Editorials", photo: "/members/aindree-tiwari.jpg" },
    ],
  },
  {
    slug: "smdc",
    name: "SMDC",
    kind: "support",
    gradient: "from-purple-700 to-fuchsia-600",
    accent: "purple",
    icon: "megaphone",
    tagline: "Shares, media & digital.",
    mission: [
      "SMDC — Social Media & Digital Communications — powers RCBW's online presence, turning every event and impact into compelling stories across our digital channels.",
      "From social posts to brand identity, we keep the club visible, vibrant, and connected.",
    ],
    directors: [
      { name: "Ashish Soni", role: "SMDC", photo: "/members/ashish-soni.jpg" },
      { name: "Siddhesh Nandoskar", role: "SMDC", photo: "/members/siddhesh-nandoskar.jpg" },
      { name: "Bhavika Jain", role: "SMDC" },
    ],
  },
  {
    slug: "sports",
    name: "Sports",
    kind: "support",
    gradient: "from-orange-600 to-red-500",
    accent: "orange",
    icon: "trophy",
    tagline: "Play hard, bond harder.",
    mission: [
      "Our Sports avenue brings members together on the field — from flagship cricket tournaments to friendly racket showdowns.",
      "Sport builds discipline, teamwork, and lifelong friendships across the club.",
    ],
    directors: [
      { name: "Jiyan Shah", role: "Sports", photo: "/members/jiyan-shah.jpg" },
      { name: "Ved", role: "Sports" },
    ],
  },
  {
    slug: "entrepreneurial-development",
    name: "Entrepreneurial Development",
    kind: "support",
    gradient: "from-cyan-700 to-teal-600",
    accent: "cyan",
    icon: "rocket",
    tagline: "Build ideas, build futures.",
    mission: [
      "Our Entrepreneurial Development avenue nurtures the founders and innovators of tomorrow — mentoring young entrepreneurs, hosting pitch sessions, and building ventures that create real impact.",
      "Beyond startups, we grow the entrepreneurial mindset: initiative, resilience, and the drive to turn ideas into action.",
    ],
    directors: [
      { name: "Ansh Manjul", role: "Entrepreneurial Development" },
      { name: "Meit Bhattad", role: "Entrepreneurial Development", photo: "/members/meit-bhattad.jpg" },
    ],
  },
];

export const avenues: Avenue[] = [...mainAvenues, ...supportAvenues];