export interface BoardMember {
  id: string;
  name: string;
  role: string;
  description?: string;
}

export const board: BoardMember[] = [
  {
    id: "president",
    name: "Member Name",
    role: "President",
    description: "Leading the club with vision, service, and fellowship.",
  },
  {
    id: "secretary",
    name: "Member Name",
    role: "Secretary",
    description: "Keeping the club organised, connected, and moving forward.",
  },
  {
    id: "vp-1",
    name: "Member Name",
    role: "Vice President",
    description: "Supporting the President and guiding our avenues forward.",
  },
  {
    id: "vp-2",
    name: "Member Name",
    role: "Vice President",
    description: "Supporting the President and steering club operations.",
  },
  {
    id: "sergeant-at-arms",
    name: "Member Name",
    role: "Sergeant at Arms",
    description: "Keeping our meetings and events running smoothly.",
  },
  {
    id: "treasurer",
    name: "Member Name",
    role: "Treasurer",
    description: "Managing the club's finances with transparency and care.",
  },
  {
    id: "hrd",
    name: "Member Name",
    role: "Human Resources Director",
    description: "Nurturing membership, growth, and the family beyond Rotaract.",
  },
  {
    id: "js-1",
    name: "Member Name",
    role: "Joint Secretary",
    description: "Assisting the Secretary in driving day-to-day operations.",
  },
  {
    id: "js-2",
    name: "Member Name",
    role: "Joint Secretary",
    description: "Assisting the Secretary in coordinating projects and avenues.",
  },
];
