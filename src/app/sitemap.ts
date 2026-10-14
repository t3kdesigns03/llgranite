import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/meta";
import { projects } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: [string, number][] = [
    ["", 1],
    ["/projects", 0.9],
    ["/materials", 0.9],
    ["/contact", 0.9],
    ["/process", 0.7],
    ["/care", 0.6],
    ["/about", 0.6],
  ];
  return [
    ...pages.map(([path, priority]) => ({ url: `${siteUrl}${path}`, lastModified: now, changeFrequency: "monthly" as const, priority })),
    ...projects.map((p) => ({ url: `${siteUrl}/projects/${p.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
