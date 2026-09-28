import { mainAvenues, supportAvenues } from "@/lib/avenues";
import { board } from "@/lib/board";
import { clubStats, contactInfo, newsletters, projects, socialLinks } from "@/lib/data";

export const dynamic = "force-static";

const base = "https://rc-web-six.vercel.app";

// Plain-Markdown summary for AI agents (https://llmstxt.org), built from the same data as the pages.
export function GET() {
  const avenueLine = (a: (typeof mainAvenues)[number]) =>
    `- [${a.name}](${base}/avenues/${a.slug}): ${a.tagline} Directors: ${a.directors.map((d) => d.name).join(", ")}.`;

  const body = `# Rotaract Club of Bombay West (RCBW)

> Rotaract club in Mumbai, India, under Rotaract District ${clubStats.district}. Founded ${clubStats.yearFounded}, revived ${clubStats.yearRevived}. Parent club: ${clubStats.parentClub}. Motto: "${clubStats.motto}". Tagline: "Rise Above Yourself".

RCBW is a youth-led service and leadership club. It is ranked #${clubStats.rank} of ${clubStats.totalClubs} clubs in the district (#${clubStats.communityRank} in community service) and has had ${clubStats.installations} installations since its revival.

## Pages

- [Home](${base}/): Club overview
- [Avenues](${base}/avenues): The club's areas of work
- [Projects](${base}/projects): Flagship projects and events
- [Members](${base}/members): Current board
- [Newsletter](${base}/newsletter): Club newsletters
- [Rotary](${base}/rotary): Parent Rotary club
- [Contact](${base}/contact): How to reach or join the club

## Main avenues

${mainAvenues.map(avenueLine).join("\n")}

## Support avenues

${supportAvenues.map(avenueLine).join("\n")}

## Projects

${projects.map((p) => `- ${p.title} (${p.tags.join(", ")}): ${p.description} Impact: ${p.impact}.`).join("\n")}

## Board

${board.map((m) => `- ${m.name}: ${m.role}`).join("\n")}

## Contact

- Email: ${contactInfo.email}
- Phone: ${contactInfo.phone1}, ${contactInfo.phone2}
- Join: ${contactInfo.joinFormUrl}
${socialLinks.map((s) => `- ${s.name}: ${s.url}`).join("\n")}

## Optional

${newsletters.map((n) => `- [${n.title} (${n.date})](${n.pdfUrl})`).join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
