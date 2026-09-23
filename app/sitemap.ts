import type { MetadataRoute } from "next";
import { avenues } from "@/lib/avenues";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rc-web-six.vercel.app";
  const lastModified = new Date();

  return [
    {
      url: base,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/avenues`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...avenues.map((avenue) => ({
      url: `${base}/avenues/${avenue.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${base}/projects`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/members`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/newsletter`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/rotary`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
