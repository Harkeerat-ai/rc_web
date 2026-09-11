export interface BoardMember {
  id: string;
  name: string;
  role: string;
  description?: string;
  photo?: string;
  /** CSS object-position override for the avatar crop, e.g. "50% 18%" */
  objectPosition?: string;
}

export const board: BoardMember[] = [
  {
    id: "mohit-hande",
    name: "Mohit Hande",
    role: "President",
    description: "Leading the club with vision, service, and fellowship.",
    photo: "/members/mohit-hande.jpg",
  },
  {
    id: "manasvi-thakkar",
    name: "Manasvi Thakkar",
    role: "Secretary",
    description: "Keeping the club organised, connected, and moving forward.",
    photo: "/members/manasvi-thakkar.jpg",
  },
  {
    id: "sania-kadam",
    name: "Sania Kadam",
    role: "IPP (Immediate Past President)",
    description: "Guiding the board with experience and institutional memory.",
    photo: "/members/sania-kadam.jpg",
  },
  {
    id: "harkeerat-bhasin",
    name: "Harkeerat Bhasin",
    role: "Vice President",
    description: "Supporting the President and guiding our avenues forward.",
    photo: "/members/harkeerat-bhasin.jpg",
    objectPosition: "50% 18%",
  },
  {
    id: "diya-khandelwal",
    name: "Diya Khandelwal",
    role: "Vice President and Joint Secretary",
    description: "Assisting the Secretary and supporting the President in steering the club.",
    photo: "/members/diya-khandelwal.jpg",
  },
  {
    id: "jash-bhatia",
    name: "Jash Bhatia",
    role: "Treasurer",
    description: "Managing the club's finances with transparency and care.",
  },
  {
    id: "manan-shah",
    name: "Manan Shah",
    role: "Sergeant at Arms (SAA) & Chairman PRM",
    description: "Keeping our meetings and events running smoothly.",
    photo: "/members/manan-shah.jpg",
  },
];