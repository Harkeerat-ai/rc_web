export interface BoardMember {
  id: string;
  name: string;
  role: string;
  description?: string;
  photo?: string;
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
    id: "tanaya-kadam",
    name: "Tanaya Kadam",
    role: "Joint Secretary",
    description: "Assisting the Secretary in driving day-to-day operations.",
    photo: "/members/tanaya-kadam.jpg",
  },
  {
    id: "diya-khandelwal",
    name: "Diya Khandelwal",
    role: "Joint Secretary and Vice President",
    description: "Assisting the Secretary and supporting the President in steering the club.",
    photo: "/members/diya-khandelwal.jpg",
  },
  {
    id: "manan-shah",
    name: "Manan Shah",
    role: "Sergeant at Arms (SAA)",
    description: "Keeping our meetings and events running smoothly.",
    photo: "/members/manan-shah.jpg",
  },
  {
    id: "harkeerat-bhasin",
    name: "Harkeerat Bhasin",
    role: "Vice President",
    description: "Supporting the President and guiding our avenues forward.",
    photo: "/members/harkeerat-bhasin.jpg",
  },
  {
    id: "jash-bhatia",
    name: "Jash Bhatia",
    role: "Treasurer",
    description: "Managing the club's finances with transparency and care.",
  },
];