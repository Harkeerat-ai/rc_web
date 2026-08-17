export interface Project {
  id: string;
  title: string;
  description: string;
  impact: string;
  image?: string;
  tags: string[];
}

export interface Newsletter {
  id: string;
  title: string;
  date: string;
  pdfUrl: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
}

const wixImage = (file: string) =>
  `https://static.wixstatic.com/media/${file}/v1/fill/w_800,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/${file}`;

export const projects: Project[] = [
  {
    id: "astra",
    title: "Astra",
    description:
      "Astra '25 brought over 150 underserved children two unforgettable days filled with interactive museum experiences, high-energy sports, gifts, and shared laughter. More than just an event, it became a space where curiosity bloomed, joy overflowed, and every child felt seen, valued, and inspired to dream bigger.",
    impact: "150+ children served",
    image: wixImage("b0eb65_b73bd8386e8e4e5e8247335b3c12e9d4~mv2.jpg"),
    tags: ["Community Service"],
  },
  {
    id: "bollyween",
    title: "Bollyween: The Ultimate Prom Night",
    description:
      "Bollyween brought the best of both worlds — Bollywood glam and Halloween mischief — all under one magical prom night!",
    impact: "Club Service",
    image: wixImage("b0eb65_67e8df535cc94ecc8a05ac3dfeaba410~mv2.jpg"),
    tags: ["Club Service"],
  },
  {
    id: "revive",
    title: "Revive",
    description:
      "A flagship cricket tournament hosted by Rotaract Club of Bombay West, bringing together teams for spirited competition and camaraderie.",
    impact: "Sports",
    image: wixImage("b0eb65_ea23b8df62b348e781518351d891de82~mv2.jpg"),
    tags: ["Sports"],
  },
  {
    id: "diwali-killa-utsav",
    title: "Diwali Killa Utsav",
    description:
      "The Diwali Killa Utsav aimed to revive and preserve the traditional Maharashtrian practice of building miniature forts or killas — a culturally rich activity that had been fading in today's fast-paced world. This cherished tradition, especially popular during Diwali, honors Chhatrapati Shivaji Maharaj and his legacy.",
    impact: "Cultural education through craft",
    image: wixImage("b0eb65_581689c788de4080b248eaf3fac5fbe4~mv2.jpg"),
    tags: ["Partners-in-Service"],
  },
  {
    id: "rangeelo-raas",
    title: "Rangeelo Raas",
    description:
      "Rangeelo Raas was a vibrant and playful Garba night, filled with energy, colors, and non-stop fun on the dance floor!",
    impact: "Club Service",
    image: wixImage("b0eb65_0da64321f32249908bfa986630f307e4~mv2.jpg"),
    tags: ["Club Service"],
  },
  {
    id: "turf-fames",
    title: "Turf Fames",
    description:
      "A fun-based sporting day, filled with all the giggles of traditional, gully games — instilling nostalgia and memories of playful childhood times.",
    impact: "Sports",
    image: wixImage("b0eb65_b29c9f1ddbcc4fddbcbf7e1f1b55f40e~mv2.jpg"),
    tags: ["Sports"],
  },
  {
    id: "fashion-extravaganza",
    title: "Fashion Extravaganza",
    description:
      "A fashion show arranged for the students of Interact school under Rotaract Club of Bombay West, where students dressed up as their favourite characters and were marked on their creativity.",
    impact: "Creativity showcase",
    image: wixImage("b0eb65_4d60d1a9f91a447aa1c28c6427bf35bd~mv2.jpg"),
    tags: ["Partners-in-Service"],
  },
  {
    id: "racquet-rivals",
    title: "Racquet Rivals",
    description:
      "A competitive racket sports showdown that brought members together for a day of sport and friendly rivalry.",
    impact: "Sports",
    image: wixImage("b0eb65_2a06d3bc8852443288d962162bff013a~mv2.jpg"),
    tags: ["Sports"],
  },
  {
    id: "happy-meals",
    title: "Happy Meals",
    description:
      "A community service initiative spreading joy through the distribution of meals to those in need.",
    impact: "Community Service",
    image: wixImage("b0eb65_242ae75e66d649b28ee2433879cd4d92~mv2.jpg"),
    tags: ["Community Service"],
  },
  {
    id: "alive-at-the-drive",
    title: "Alive at the Drive",
    description:
      "A club service event that brought members together for a memorable drive of fellowship and fun.",
    impact: "Club Service",
    image: wixImage("b0eb65_fcd0a72ee26b4fbcacae8f2a5838e444~mv2.jpg"),
    tags: ["Club Service"],
  },
];

export const newsletters: Newsletter[] = [
  {
    id: "1",
    title: "RCBW Newsletter",
    date: "Latest Edition",
    pdfUrl:
      "https://9cab57e6-cc37-4214-9bab-8a5197db78b1.filesusr.com/ugd/b0eb65_1d64dbfe8d2e474d926c0ade75288f0b.pdf",
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/rotaractbombaywest/",
    icon: "instagram",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/RotaractBombayWest/",
    icon: "facebook",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/rotaract-club-of-bombay-west-106ba7289/",
    icon: "linkedin",
  },
];

export const clubStats = {
  yearFounded: 1969,
  yearRevived: 2016,
  installations: 9,
  district: "3141",
  rank: 21,
  totalClubs: 130,
  communityRank: 9,
  parentClub: "Rotary Club of Bombay West",
  motto: "Family Beyond Rotaract",
};

export const contactInfo = {
  phone1: "+91 98203 04620",
  phone2: "+91 79775 22662",
  email: "rtr.saniakadam.rcbw@gmail.com",
  joinFormUrl:
    "https://docs.google.com/forms/d/1lpc4zqX9qqP887wGD7E_piusMYOgoWNM-kiuWAvwLoA/viewform",
};

export const gallery: GalleryItem[] = [
  {
    id: "1",
    title: "Fashion Extravaganza",
    image:
      "https://static.wixstatic.com/media/b0eb65_4d60d1a9f91a447aa1c28c6427bf35bd~mv2.jpg/v1/fill/w_800,h_960,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b0eb65_4d60d1a9f91a447aa1c28c6427bf35bd~mv2.jpg",
  },
  {
    id: "2",
    title: "Rangeelo Raas 2024",
    image:
      "https://static.wixstatic.com/media/b0eb65_0da64321f32249908bfa986630f307e4~mv2.jpg/v1/fill/w_800,h_960,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b0eb65_0da64321f32249908bfa986630f307e4~mv2.jpg",
  },
  {
    id: "3",
    title: "Feminine Focus",
    image:
      "https://static.wixstatic.com/media/b0eb65_62992abd9397490d9ff73b93b924567e~mv2.jpg/v1/fill/w_800,h_960,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b0eb65_62992abd9397490d9ff73b93b924567e~mv2.jpg",
  },
  {
    id: "4",
    title: "Astra",
    image:
      "https://static.wixstatic.com/media/b0eb65_b73bd8386e8e4e5e8247335b3c12e9d4~mv2.jpg/v1/fill/w_800,h_960,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b0eb65_b73bd8386e8e4e5e8247335b3c12e9d4~mv2.jpg",
  },
  {
    id: "5",
    title: "Bollyween Prom Night",
    image:
      "https://static.wixstatic.com/media/b0eb65_fcd0a72ee26b4fbcacae8f2a5838e444~mv2.jpg/v1/fill/w_800,h_960,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b0eb65_fcd0a72ee26b4fbcacae8f2a5838e444~mv2.jpg",
  },
  {
    id: "6",
    title: "Revive Cricket Tournament",
    image:
      "https://static.wixstatic.com/media/b0eb65_ea23b8df62b348e781518351d891de82~mv2.jpg/v1/fill/w_800,h_960,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b0eb65_ea23b8df62b348e781518351d891de82~mv2.jpg",
  },
  {
    id: "7",
    title: "Diwali Killa Utsav",
    image:
      "https://static.wixstatic.com/media/b0eb65_581689c788de4080b248eaf3fac5fbe4~mv2.jpg/v1/fill/w_800,h_960,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b0eb65_581689c788de4080b248eaf3fac5fbe4~mv2.jpg",
  },
];