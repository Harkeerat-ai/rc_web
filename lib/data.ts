export interface Project {
  id: string;
  title: string;
  description: string;
  impact: string;
  image: string;
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

export const projects: Project[] = [
  {
    id: "1",
    title: "Project Vidyadhan",
    description: "Educational sponsorship for underprivileged students, providing school supplies and tuition support across 5 municipal schools.",
    impact: "200+ students supported",
    image: "/images/projects/vidyadhan.jpg",
    tags: ["Education", "Community"],
  },
  {
    id: "2",
    title: "Green Bombay Initiative",
    description: "Tree plantation drives and waste management awareness campaigns in partnership with local civic bodies.",
    impact: "1,000+ trees planted",
    image: "/images/projects/green-bombay.jpg",
    tags: ["Environment", "Sustainability"],
  },
  {
    id: "3",
    title: "Health & Hygiene Camps",
    description: "Free health check-up camps and hygiene awareness workshops in underserved communities.",
    impact: "500+ beneficiaries",
    image: "/images/projects/health-camp.jpg",
    tags: ["Health", "Outreach"],
  },
  {
    id: "4",
    title: "Blood Donation Drives",
    description: "Regular blood donation camps in collaboration with major hospitals across Mumbai.",
    impact: "300+ units collected",
    image: "/images/projects/blood-donation.jpg",
    tags: ["Health", "Emergency"],
  },
  {
    id: "5",
    title: "Digital Literacy Mission",
    description: "Computer and digital skills training for senior citizens and economically weaker sections.",
    impact: "150+ trained",
    image: "/images/projects/digital-lit.jpg",
    tags: ["Education", "Technology"],
  },
  {
    id: "6",
    title: "Disaster Relief Efforts",
    description: "Emergency relief distribution during floods and natural calamities in Maharashtra.",
    impact: "1,000+ families aided",
    image: "/images/projects/disaster-relief.jpg",
    tags: ["Relief", "Emergency"],
  },
];

export const newsletters: Newsletter[] = [
  {
    id: "1",
    title: "RCBW Quarterly - Q1 2026",
    date: "March 2026",
    pdfUrl: "/newsletters/q1-2026.pdf",
  },
  {
    id: "2",
    title: "RCBW Quarterly - Q4 2025",
    date: "December 2025",
    pdfUrl: "/newsletters/q4-2025.pdf",
  },
  {
    id: "3",
    title: "RCBW Quarterly - Q3 2025",
    date: "September 2025",
    pdfUrl: "/newsletters/q3-2025.pdf",
  },
  {
    id: "4",
    title: "RCBW Anniversary Special 2025",
    date: "July 2025",
    pdfUrl: "/newsletters/anniversary-2025.pdf",
  },
  {
    id: "5",
    title: "RCBW Quarterly - Q2 2025",
    date: "June 2025",
    pdfUrl: "/newsletters/q2-2025.pdf",
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
  yearsActive: 10,
  projectsCompleted: 45,
  activeMembers: 35,
  district: "3141",
  parentClub: "Rotary Club of Bombay West",
  motto: "Rise Above Yourself",
};
