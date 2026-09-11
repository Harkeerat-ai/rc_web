import type { BoardMember } from "@/lib/board";
import { board } from "@/lib/board";
import type { Avenue } from "@/lib/avenues";
import { avenues, mainAvenues, supportAvenues } from "@/lib/avenues";
import { clubStats } from "@/lib/data";

export interface KnowledgeAnswer {
  answer: string;
  sources: string[];
}

const stripRtr = (name: string) => name.replace(/^Rtr\.\s*/i, "");

const presentBoard: Record<string, BoardMember | undefined> = {
  president: board.find((b) => /president/i.test(b.role) && !/vice/i.test(b.role)),
  "vice president": board.find((b) => /vice president/i.test(b.role)),
  secretary: board.find((b) => /secretary/i.test(b.role) && !/joint/i.test(b.role)),
  "joint secretary": board.find((b) => /joint secretary/i.test(b.role)),
  treasurer: board.find((b) => /treasurer/i.test(b.role)),
  ipp: board.find((b) => /ipp|past president/i.test(b.role)),
  saa: board.find((b) => /sergeant|saa/i.test(b.role)),
  prm: board.find((b) => /chairman prm|prm/i.test(b.role)),
};

/** Roles held jointly, e.g. "Sergeant at Arms (SAA) & Chairman PRM". */
function otherHalfOfRole(memberRole: string, askedRole: string): string | null {
  const parts = memberRole
    .split(/\s*(?:&|\+|\band\b)\s*/i)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length < 2) return null;
  const others = parts.filter((p) => !p.toLowerCase().includes(askedRole.toLowerCase()));
  return others.length > 0 && others.length < parts.length ? others.join(" and ") : null;
}

function roleAnswer(keywords: string[], role: string) {
  for (const key of keywords) {
    const member = presentBoard[key];
    if (!member) continue;
    // Naming the other half of a combined role keeps the description — which only
    // covers one half — from reading as a description of the role that was asked about.
    const other = otherHalfOfRole(member.role, role);
    const alsoServes = other ? `, who also serves as ${other}` : "";
    const head = `The current ${role} of RCBW is ${member.name}${alsoServes}`;
    return {
      answer: member.description ? `${head} — ${member.description}` : `${head}.`,
      sources: ["Site data — Members page"],
    };
  }
  return null;
}

const AVENUE_SOURCES = ["Site data — Avenues page"];

/** Aliases specific enough to name an avenue on their own. */
const STRONG_ALIASES: Record<string, string[]> = {
  "community-service": ["community service", "community services", "comm service", "comserve"],
  "club-service": ["events and fellowship", "events & fellowship", "club service", "club services"],
  "international-service": ["international service", "international services"],
  "professional-development": ["professional development", "prof dev", "profdev"],
  "partners-in-service": ["partners in service", "partners-in-service"],
  editorials: ["editorials", "editorial"],
  smdc: [
    "social media and digital communications",
    "social media & digital communications",
    "digital communications",
    "digital communication",
    "social media",
    "smdc",
  ],
  "pr-marketing": [
    "public relations and marketing",
    "public relations & marketing",
    "public relations",
    "pr and marketing",
    "pr & marketing",
  ],
  sports: ["sports"],
  "entrepreneurial-development": [
    "entrepreneurship development",
    "entrepreneurial development",
    "entrepreneurship",
    "entrepreneurial",
  ],
};

/** Short or overloaded aliases — only trusted when the question says "avenue". */
const WEAK_ALIASES: Record<string, string[]> = {
  "community-service": ["community"],
  "club-service": ["fellowship", "events"],
  "international-service": ["international"],
  "professional-development": ["professional"],
  "partners-in-service": ["partners", "pis"],
  smdc: ["digital"],
  "pr-marketing": ["pr", "prm", "marketing"],
  sports: ["sport"],
};

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function aliasHit(q: string, alias: string): boolean {
  return new RegExp(`(^|[^a-z0-9])${escapeRe(alias)}([^a-z0-9]|$)`, "i").test(q);
}

/** Longest matching alias wins, so "public relations" beats "pr". */
function findAvenue(q: string, allowWeak: boolean): Avenue | null {
  let best: { avenue: Avenue; len: number } | null = null;
  for (const avenue of avenues) {
    const aliases = [
      avenue.name.toLowerCase(),
      ...(STRONG_ALIASES[avenue.slug] ?? []),
      ...(allowWeak ? WEAK_ALIASES[avenue.slug] ?? [] : []),
    ];
    for (const alias of aliases) {
      if (!aliasHit(q, alias)) continue;
      if (!best || alias.length > best.len) best = { avenue, len: alias.length };
    }
  }
  return best?.avenue ?? null;
}

function directorNames(avenue: Avenue): string {
  const names = avenue.directors.map((d) => stripRtr(d.name));
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

function avenueAnswer(q: string): KnowledgeAnswer | null {
  // Joining, contacting and scheduling stay with the backend even when an avenue
  // is named — answering those from site data would talk past the question.
  if (
    /\b(join|apply|application|membership|sign ?up|register|volunteer|donate|contact|email|phone|whatsapp|instagram|when|where|upcoming|next|fees|cost|deadline)\b/.test(
      q
    )
  ) {
    return null;
  }

  const mentionsAvenue = /\bavenues?\b/.test(q);
  const avenue = findAvenue(q, mentionsAvenue);

  if (avenue) {
    const kind = avenue.kind === "main" ? "main avenue" : "support avenue";
    const leads = directorNames(avenue);

    if (
      /\bwho\b/.test(q) &&
      /\b(head|heads|lead|leads|leader|director|directors|chair|chairs|charge|run|runs|manage|manages|member|members|team|part)\b/.test(
        q
      )
    ) {
      return {
        answer: leads
          ? `${avenue.name} is a ${kind} at RCBW. Its directors are ${leads}. See the ${avenue.name} page under Avenues for more.`
          : `${avenue.name} is a ${kind} at RCBW. See the Avenues page for its current directors.`,
        sources: AVENUE_SOURCES,
      };
    }

    if (/\b(what|tell|describe|explain|about|do|does|mission|purpose|work|works|focus|goal|goals)\b/.test(q)) {
      const mission = avenue.mission[0] ?? "";
      const ledBy = leads ? ` It is led by ${leads}.` : "";
      return {
        answer: `${avenue.name} (${kind}) — ${avenue.tagline} ${mission}${ledBy}`.trim(),
        sources: AVENUE_SOURCES,
      };
    }

    // An avenue is named, but the question is something this file cannot answer.
    return null;
  }

  const asksAboutAvenuesGenerally =
    mentionsAvenue ||
    /\b(departments|sectors|committees)\b/.test(q) ||
    /what do (you|they|we|rcbw|the club) do\b/.test(q);
  if (!asksAboutAvenuesGenerally) return null;

  const listIntent =
    /\b(what|which|list|name|names|all|how many|number|main|support|there|tell|show|types|kinds)\b/.test(q);
  if (!listIntent) return null;

  const main = mainAvenues.map((a) => a.name).join(", ");
  const support = supportAvenues.map((a) => a.name).join(", ");
  return {
    answer: `RCBW runs ${avenues.length} avenues — ${mainAvenues.length} main and ${supportAvenues.length} support. Main avenues: ${main}. Support avenues: ${support}.`,
    sources: AVENUE_SOURCES,
  };
}

export function getKnowledgeAnswer(message: string): KnowledgeAnswer | null {
  const q = message.toLowerCase().trim();
  if (!q) return null;

  const avenue = avenueAnswer(q);
  if (avenue) return avenue;

  // Contact details live with the backend, not in this file — a question asking for
  // one should not be answered with the name of whoever holds the role.
  if (/\b(email|e-mail|phone|mobile|whatsapp|instagram|contact|reach)\b/.test(q)) return null;

  if (
    /who is|tell me about|what is|about.*(rcbw|rotaract|club)|who are you|introduce|founder|host club/.test(q)
  ) {
    if (/vice president/.test(q)) return roleAnswer(["vice president"], "Vice President");
    if (/joint secretary/.test(q)) return roleAnswer(["joint secretary"], "Joint Secretary");
    if (/past president|ipp\b/.test(q)) return roleAnswer(["ipp"], "Immediate Past President");
    if (/president/.test(q) && !/vice/.test(q)) return roleAnswer(["president"], "President");
    if (/secretary/.test(q) && !/joint/.test(q)) return roleAnswer(["secretary"], "Secretary");
    if (/treasurer/.test(q)) return roleAnswer(["treasurer"], "Treasurer");
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

  if (/motto|tagline/.test(q)) {
    return {
      answer: `The club motto is "${clubStats.motto}".`,
      sources: ["Site data — RCBW about"],
    };
  }

  // "year" alone used to match here, so anything mentioning a year ("what did you
  // do this year") got the founding date. Require the year to be the thing asked about.
  if (
    /\bfound(ed|ing)\b|\bestablished\b|\brevived?\b|\binception\b|how old is|when (was|is|did) (the )?(club|rcbw|phoenix)|(what|which) year|year (was|did) (the )?(club|rcbw|it)/.test(
      q
    )
  ) {
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