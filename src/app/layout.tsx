import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import StickyBar from "@/components/StickyBar";
import { ogImage, siteUrl } from "@/lib/meta";
import { site } from "@/lib/site";
import "./globals.css";

// Self-hosted (SIL OFL) so builds never depend on reaching Google Fonts.
const display = localFont({
  src: [
    { path: "../fonts/cormorant-garamond-latin-wght-normal.woff2", weight: "300 700", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-wght-italic.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
});

const body = localFont({
  src: "../fonts/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  style: "normal",
  variable: "--font-body",
  display: "swap",
});

const description = `Custom granite, marble & quartz countertops, fabricated and installed by a family-owned shop in Statesville, NC. In-stock slabs to view, designer on staff, free quotes. Serving Iredell County & nearby. ${site.phone.display}.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Granite, Marble & Quartz Countertops in Statesville, NC`,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    title: `${site.name} | Granite, Marble & Quartz Countertops`,
    description,
    url: "/",
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", images: [{ url: ogImage.url, alt: ogImage.alt }] },
  formatDetection: { telephone: true },
  robots: site.spec ? { index: false, follow: false } : { index: true, follow: true },
  other: {
    "geo.region": "US-NC",
    "geo.placename": site.address.city,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0e0d",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
  "@id": `${siteUrl}/#business`,
  name: site.name,
  legalName: site.legalName,
  description,
  url: siteUrl,
  telephone: site.phone.e164,
  image: `${siteUrl}${ogImage.url}`,
  logo: `${siteUrl}/apple-icon.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  openingHours: site.hours.schema,
  areaServed: [
    ...site.areas.map((name) => ({ "@type": "Place", name: `${name}, NC` })),
    ...site.counties.map((name) => ({ "@type": "AdministrativeArea", name: `${name} County, NC` })),
  ],
  knowsAbout: ["Granite countertops", "Marble countertops", "Quartz countertops", "Countertop fabrication", "Countertop installation"],
  makesOffer: ["Granite countertops", "Marble countertops", "Quartz countertops", "Tile and tile supplies", "Sinks"].map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name },
  })),
  ...(site.established ? { foundingDate: String(site.established) } : {}),
  sameAs: [site.links.facebook],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-brass focus:px-5 focus:py-3 focus:font-semibold focus:text-onyx-950"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyBar />
        <Reveal />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
