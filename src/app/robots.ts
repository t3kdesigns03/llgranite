import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/meta";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Preview builds (site.spec) stay out of search engines entirely.
  if (site.spec) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/thanks" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
