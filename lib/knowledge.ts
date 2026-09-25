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

const DISTRICT_SOURCES = ["Rotaract District 3141 website (rotaractdistrict3141.org)"];

/** Facts scraped from https://www.rotaractdistrict3141.org/ — leadership is for the 2026–27 Rotaract year. */
const district = {
  name: "Rotaract District 3141",
  location: "Mumbai, Maharashtra, India",
  visionLine: "A District Built Around People",
  vision: "Creating Leaders. Building Communities. Inspiring Change.",
  programs: [
    "Community Service",
    "Professional Development",
    "Club Service",
    "International Service",
    "Public Relations",
  ],
  stats: {
    yearsActive: "11+",
    events: "250+",
    participants: "8,000+",
    livesTouched: "500+",
    communityReach: "200,000+",
    rotaractors: "50,000+",
  },
  drrYear: "2026–27",
};

const districtLeadership = {
  drr: "PHF. Rtr. Shreehari Nair",
  ipdrr: "Rtr. Yashwardhan Chauhan",
  secretary: "Rtr. Afzal Qureshi",
};

/** RCBW members who also serve on the District 3141 team this Rotaract year. */
const districtCrossover = { name: "Rtr. Jash Bhatia", role: "Zone Rotaract Representative (ZRR), Zone 1" };

function districtAnswer(q: string): KnowledgeAnswer | null {
  if (!/\bdistrict\b|\b3141\b|\bdrr\b|\bipdrr\b|\bzrr\b/.test(q)) return null;
  // Contact details live with the backend, not in this file.
  if (/\b(email|e-mail|phone|mobile|whatsapp|contact|reach)\b/.test(q)) return null;

  if (/\bipdrr\b|immediate past.*district|past.*drr/.test(q)) {
    return {
      answer: `The Immediate Past District Rotaract Representative (IPDRR) of District 3141 is ${districtLeadership.ipdrr}.`,
      sources: DISTRICT_SOURCES,
    };
  }

  if (/district (rotaract )?secretary/.test(q)) {
    return {
      answer: `The District Rotaract Secretary of District 3141 is ${districtLeadership.secretary}.`,
      sources: DISTRICT_SOURCES,
    };
  }

  if (/\bdrr\b|district rotaract representative/.test(q)) {
    return {
      answer: `The District Rotaract Representative (DRR) of District 3141 for ${district.drrYear} is ${districtLeadership.drr}.`,
      sources: DISTRICT_SOURCES,
    };
  }

  if (/\bzrr\b|\bzone\b/.test(q) || /rcbw.*(district team|district level)|district team.*rcbw/.test(q)) {
    return {
      answer: `${stripRtr(districtCrossover.name)} represents RCBW at the district level, serving as ${districtCrossover.role} for Rotaract District 3141.`,
      sources: DISTRICT_SOURCES,
    };
  }

  if (/\b(program|programs|focus area|focus areas)\b/.test(q)) {
    return {
      answer: `Rotaract District 3141 organizes its work into ${district.programs.length} programs: ${district.programs.join(", ")}.`,
      sources: DISTRICT_SOURCES,
    };
  }

  if (/\b(vision|mission|motto|tagline)\b/.test(q)) {
    return {
      answer: `Rotaract District 3141's vision is "${district.visionLine}" — "${district.vision}"`,
      sources: DISTRICT_SOURCES,
    };
  }

  if (/\b(impact|stats|statistics|how many events|events organi[sz]ed|participants|lives touched|reach|rotaractors)\b/.test(q)) {
    const s = district.stats;
    return {
      answer: `Per its own site, Rotaract District 3141 has run for ${s.yearsActive} years, organized ${s.events} events with ${s.participants} participants, touched ${s.livesTouched} lives directly, reached ${s.communityReach} people in the community, and counts ${s.rotaractors} Rotaractors district-wide.`,
      sources: DISTRICT_SOURCES,
    };
  }

  if (/\b(fundrais|crowdfund|donat)\w*\b/.test(q)) {
    return {
      answer:
        "Rotaract District 3141 runs a two-tier crowdfunding platform — smaller club-level drives and larger district-wide campaigns — with donations mapped to specific, trackable district projects.",
      sources: DISTRICT_SOURCES,
    };
  }

  if (/\b(what|about|tell|describe|explain|who)\b/.test(q)) {
    return {
      answer: `Rotaract District 3141 is the Rotaract district covering ${district.location}, under which RCBW operates. Its vision: "${district.vision}" The current DRR (${district.drrYear}) is ${districtLeadership.drr}.`,
      sources: DISTRICT_SOURCES,
    };
  }

  return null;
}

export function getKnowledgeAnswer(message: string): KnowledgeAnswer | null {
  const q = message.toLowerCase().trim();
  if (!q) return null;

  const avenue = avenueAnswer(q);
  if (avenue) return avenue;

  const districtAns = districtAnswer(q);
  if (districtAns) return districtAns;

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