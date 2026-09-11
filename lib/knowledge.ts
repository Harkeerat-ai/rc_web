import type { BoardMember } from "@/lib/board";
import { board } from "@/lib/board";
import { avenues, mainAvenues, supportAvenues } from "@/lib/avenues";
import { clubStats } from "@/lib/data";

export interface KnowledgeAnswer {
  answer: string;
  sources: string[];
}

const stripRtr = (name: string) => name.replace(/^Rtr\.\s*/i, "");

const presentBoard: Record<string, BoardMember | undefined> = {
  president: board.find((b) => /president/.test(b.role) && !/vice/.test(b.role)),
  "vice president": board.find((b) => /vice president/.test(b.role)),
  secretary: board.find((b) => /secretary/.test(b.role) && !/joint/.test(b.role)),
  "joint secretary": board.find((b) => /joint secretary/.test(b.role)),
  treasurer: board.find((b) => /treasurer/.test(b.role)),
  ipp: board.find((b) => /ipp|past president/.test(b.role)),
  saa: board.find((b) => /sergeant|saa/.test(b.role)),
  prm: board.find((b) => /chairman prm|prm/.test(b.role)),
};

function roleAnswer(keywords: string[], role: string) {
  for (const key of keywords) {
    const member = presentBoard[key];
    if (!member) continue;
    const extra = member.description ? ` ${stripRtr(member.name)} ${member.description}` : "";
    return {
      answer: `The current ${role} of RCBW is ${member.name}.${extra}`,
      sources: ["Site data — Members page"],
    };
  }
  return null;
}

export function getKnowledgeAnswer(message: string): KnowledgeAnswer | null {
  const q = message.toLowerCase().trim();
  if (!q) return null;

  if (
    /who is|tell me about|what is|about.*(rcbw|rotaract|club)|who are you|introduce|founder|host club/.test(q)
  ) {
    if (/president/.test(q)) return roleAnswer(["president"], "President");
    if (/treasurer/.test(q)) return roleAnswer(["treasurer"], "Treasurer");
    if (/secretary/.test(q)) return roleAnswer(["secretary"], "Secretary");
    if (/vice president/.test(q)) return roleAnswer(["vice president"], "Vice President");
    if (/joint secretary/.test(q)) return roleAnswer(["joint secretary"], "Joint Secretary");
    if (/past president|ipp\b/.test(q)) return roleAnswer(["ipp"], "Immediate Past President");
    if (/sergeant|saa\b/.test(q)) return roleAnswer(["saa"], "Sergeant at Arms");
    if (/prm|public relations|marketing chairman/.test(q)) return roleAnswer(["prm"], "Chairman PRM");
  }

  if (/who (is|are).*(board|members)|(board members|full board|executive team|list (of )?(the )?(board|members))/.test(q)) {
    const list = board.map((b) => `${stripRtr(b.name)} — ${b.role}`).join("; ");
    return {
      answer: `The RCBW board: ${list}. Visit the Members page to see everyone.`,
      sources: ["Site data — Members page"],
    };
  }

  if (/avenue|avenues|departments|sectors|what do you do|what (are|is) (.+)?(done|activities|committees)/.test(q)) {
    const main = mainAvenues.map((a) => `${a.name}`).join(", ");
    const support = supportAvenues.map((a) => `${a.name}`).join(", ");
    return {
      answer: `RCBW runs ${avenues.length} avenues. Main avenues: ${main}. Support avenues: ${support}.`,
      sources: ["Site data — Avenues page"],
    };
  }

  if (/motto|tagline/.test(q)) {
    return {
      answer: `The club motto is "${clubStats.motto}".`,
      sources: ["Site data — RCBW about"],
    };
  }

  if (/founded|established|when (was|is) (the )?(club|rcbw|phoenix)|year/.test(q)) {
    return {
      answer: `RCBW was founded in ${clubStats.yearFounded} and revived in ${clubStats.yearRevived}.`,
      sources: ["Site data — RCBW about"],
    };
  }

  if (/what is (rcbw|rotaract|the club)|tell me about (the club|rcbw|rotaract)|who are you|introduce (yourself|the club)/.test(q)) {
    return {
      answer: `I'm the Rotaract Club of Bombay West (RCBW) assistant. RCBW was founded in ${clubStats.yearFounded} and revived in ${clubStats.yearRevived}, operating in Rotary District ${clubStats.district} with ${clubStats.parentClub} as our parent club.`,
      sources: ["Site data — RCBW about"],
    };
  }

  return null;
}