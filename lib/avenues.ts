export type AvenueKind = "main" | "support";

export interface BoardDirector {
  name: string;
  role?: string;
  photo?: string;
  /** CSS object-position override for the avatar crop, e.g. "50% 45%" */
  objectPosition?: string;
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
      "We strongly believe in giving back to society, and the Community Services Team, being the crux of the organisation, works profusely towards uplifting the different strata of society, bringing about awareness on various issues that affect our surroundings, building multiple volunteering opportunities and associating with NGOs and other public servants to contribute towards the community's welfare.",
    ],
    directors: [
      { name: "Dhyaani Shah", role: "Community Service", photo: "/members/dhyaani-shah.jpg" },
      { name: "Palak Deora", role: "Community Service", photo: "/members/palak-deora.jpg" },
    ],
  },
  {
    slug: "club-service",
    name: "Events and Fellowship",
    kind: "main",
    gradient: "from-rose-700 to-pink-600",
    accent: "rose",
    icon: "sparkles",
    tagline: "Where memories are made.",
    mission: [
      "The team needs to stand together as one, and the Events and Fellowship Team, with its highly contagious energy, brings this feeling to the forefront.",
      "Responsible for getting the members to know each other well and bond like a family, Events and Fellowship aims at building strong bondings by conducting fun games, parties, outings and other recreational activities!",
    ],
    directors: [
      { name: "Naqiya Paisawala", role: "Events and Fellowship", photo: "/members/naqiya-paisawala.jpg" },
      { name: "Saloni Kapadia", role: "Events and Fellowship", photo: "/members/saloni-kapadia.jpg", objectPosition: "50% 45%" },
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
      "Rotaract being a worldwide organisation, allows members to connect with Rotaractors around the globe, nurturing new relationships and creating opportunities.",
      "Team International Services celebrates the different cultures across India and the World, recognising various UN International Days and does events to acknowledge and celebrate them. They also conduct Inter Club Youth Exchange Programme wherein the club members can travel to different places where they are hosted by the fellow Rotaractors.",
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
      "Empowering the youth and creating leaders is what Rotaract aims to do. The Professional Development Team is responsible for shaping young minds and preparing them to step into the Professional world.",
      "The avenue nurtures the spirit of learning, and helps one to be better equipped to face the world by conducting workshops which can help them improve themselves and learn new things.",
    ],
    directors: [
      { name: "Ansh Manjul", role: "Professional Development" },
      { name: "Meit Bhattad", role: "Professional Development", photo: "/members/meit-bhattad.jpg" },
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
      "The avenue of Partners-In-Service, as the name itself says, looks after building and maintaining relations with the club's partners, namely - Rotary Club, Interact Club, Club Alumni, Inner Wheel Clubs and Sponsors.",
      "The avenue stands responsible to the partners, in terms of communication and coordination, and undertakes initiatives and projects to keep the partners connected and satisfied with the services.",
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
      "Editorials is the avenue which focuses on literary activities. They are the writers of the club, using their words to highlight the work of the club and the movement.",
      "They create interesting content around varied topics giving people an insight about various things that are trending worldwide. It also aims at fostering communication skills of the members through events and initiative, thereby instilling the basics of literary activities in the minds of people.",
    ],
    directors: [
      { name: "Shelly Rai", role: "Editorials", photo: "/members/shelly-rai.jpg" },
      { name: "Aindree Tiwari", role: "Editorials", photo: "/members/aindree-tiwari.jpg" },
    ],
  },
  {
    slug: "smdc",
    name: "Social Media & Digital Communications",
    kind: "support",
    gradient: "from-purple-700 to-fuchsia-600",
    accent: "purple",
    icon: "megaphone",
    tagline: "Digital first, always connected.",
    mission: [
      "We understand the rising importance of digital presence and ensure that we do our part to leverage its potential. The Digital Communication Avenue takes responsibility for the club's digital media, ensuring a strong online presence for the club.",
      "The team looks after the graphic designing and the social media strategies, to make sure that all the club events and activities are covered online. Majorly conducting online events, the events undertaken by this avenue revolve around the digital space.",
    ],
    directors: [
      { name: "Ashish Soni", role: "Social Media", photo: "/members/ashish-soni.jpg" },
      { name: "Siddhesh Nandoskar", role: "Social Media", photo: "/members/siddhesh-nandoskar.jpg" },
      { name: "Bhavika Jain", role: "Social Media" },
    ],
  },
  {
    slug: "pr-marketing",
    name: "Public Relations & Marketing",
    kind: "support",
    gradient: "from-lime-600 to-green-600",
    accent: "lime",
    icon: "megaphone",
    tagline: "The face of RCBW.",
    mission: [
      "Public Relations and Marketing is the image creator of the club, and as the name suggests, stands responsible for the PR and Marketing of the club.",
      "All the publicity activities, media coverage, event permissions and maintaining relations with the club's participants and associates are under the purview of PR. Marketing involves closing sponsorships for the various activities of the club - helping raise funds and procure benefits for the club and its members.",
    ],
    directors: [
      { name: "Ved", role: "Public Relations & Marketing" },
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
      "Sports caters to the need of the people for fitness and sportsmanship. The avenue stands responsible for taking initiatives that are all sports, and may involve conducting different sporting tournaments, athletic events, workshops and the likes for not only our members but also outsiders.",
    ],
    directors: [
      { name: "Jiyan Shah", role: "Sports", photo: "/members/jiyan-shah.jpg" },
      { name: "Ved", role: "Sports" },
    ],
  },
  {
    slug: "entrepreneurial-development",
    name: "Entrepreneurship Development",
    kind: "support",
    gradient: "from-cyan-700 to-teal-600",
    accent: "cyan",
    icon: "rocket",
    tagline: "Build ideas, build futures.",
    mission: [
      "With the entrepreneurial wave rising, we want to ensure that the youth is empowered and well-versed with the challenges that may come in their journey.",
      "Entrepreneurship Development looks after the entrepreneurial spirit of the members, guiding and preparing them to take up steps towards a successful business.",
    ],
    directors: [
      { name: "Ansh Manjul", role: "Entrepreneurship Development" },
      { name: "Meit Bhattad", role: "Entrepreneurship Development", photo: "/members/meit-bhattad.jpg" },
    ],
  },
];

export const avenues: Avenue[] = [...mainAvenues, ...supportAvenues];