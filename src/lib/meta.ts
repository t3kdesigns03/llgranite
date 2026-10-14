import type { Metadata } from "next";
import { site } from "./site";

/**
 * Absolute base for canonical URLs, og:image and the sitemap. SITE_URL wins (set it for CLI deploys
 * built locally); on Netlify builds, deploy previews use their own URL and production uses the site's
 * main URL; otherwise the preview or live address from site.ts.
 */
export const siteUrl = (
  process.env.SITE_URL ??
  (process.env.CONTEXT === "production" ? process.env.URL : process.env.DEPLOY_PRIME_URL) ??
  (site.spec ? site.previewUrl : site.url)
).replace(/\/$/, "");

const ogAlt = `${site.name}: granite, marble & quartz countertops in ${site.address.city}, ${site.address.region}. ${site.phone.display}`;
export const ogImage = { url: "/og-image.jpg", width: 1200, height: 630, alt: ogAlt, type: "image/jpeg" };

/**
 * Per-page metadata with a canonical URL and matching Open Graph / Twitter tags. Next replaces (not
 * merges) a parent's openGraph object, so the shared fields are repeated here.
 */
export function pageMeta({ title, description, path, absoluteTitle }: { title: string; description: string; path: string; absoluteTitle?: boolean }): Metadata {
  const full = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      title: full,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: full, description, images: [{ url: ogImage.url, alt: ogImage.alt }] },
  };
}
