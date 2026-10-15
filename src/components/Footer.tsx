import Link from "next/link";
import { nav, site } from "@/lib/site";
import { FacebookIcon, PhoneIcon, PinIcon } from "./icons";
import OpenStatus from "./OpenStatus";
import { Container } from "./ui";
import Wordmark from "./Wordmark";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="grain bg-onyx-950 text-stone-300">
      <div className="hairline" />
      {/* Bottom padding on phones clears the sticky Call / Free Quote bar */}
      <Container className="pb-28 pt-12 sm:pt-20 lg:pb-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.3fr_1fr_1fr_0.8fr] lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between gap-4 lg:block">
              <Link href="/" aria-label={`${site.name}, home`} className="text-linen">
                <Wordmark />
              </Link>
              <a
                href={site.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.name} on Facebook`}
                className="grid h-11 w-11 place-items-center rounded-full border border-linen/15 text-brass transition-colors hover:border-brass lg:hidden"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-stone-400 max-sm:hidden sm:max-lg:max-w-md">
              Family-owned granite, marble and quartz fabrication and installation for homes and businesses across Iredell County and
              the surrounding area.
            </p>
            <a
              href={site.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full border border-linen/15 pl-3 pr-4 text-sm font-semibold text-linen transition-colors hover:border-brass max-lg:hidden"
            >
              <FacebookIcon className="h-5 w-5 text-brass" />
              Follow on Facebook
            </a>
          </div>

          <div>
            <h2 className="kicker text-brass">Showroom</h2>
            <address className="mt-4 not-italic leading-relaxed lg:mt-5">
              <a href={site.links.directions} target="_blank" rel="noopener noreferrer" className="group inline-flex gap-2.5 hover:text-linen lg:gap-3">
                <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brass max-sm:hidden" />
                <span className="text-[0.95rem]">
                  {/* Non-breaking space keeps "Rd" with the street name when the column wraps */}
                  {site.address.street.replace(/ (\S+)$/, "\u00a0$1")}
                  <br />
                  {`${site.address.city}, ${site.address.region} ${site.address.zip}`}
                  <span className="hit mt-1 block text-sm font-semibold text-linen underline decoration-brass/60 underline-offset-4 group-hover:decoration-brass">
                    Get directions
                  </span>
                </span>
              </a>
              <a href={site.phone.href} className="mt-4 inline-flex min-h-11 items-center gap-2.5 font-semibold tabular-nums text-linen hover:text-brass-light lg:gap-3">
                <PhoneIcon className="h-5 w-5 text-brass" />
                {site.phone.display}
              </a>
            </address>
          </div>

          <div>
            <h2 className="kicker text-brass">Hours</h2>
            <dl className="mt-4 space-y-2 text-[0.95rem] lg:mt-5">
              {site.hours.rows.map((r) => (
                <div key={r.days}>
                  <dt className="text-stone-400">{r.days}</dt>
                  <dd className="font-semibold text-linen">{r.time}</dd>
                </div>
              ))}
            </dl>
            <OpenStatus className="mt-3 text-sm text-stone-400" />
          </div>

          <nav aria-label="Footer" className="col-span-2 lg:col-span-1">
            <h2 className="kicker text-brass max-lg:sr-only">Explore</h2>
            <ul className="flex flex-wrap gap-x-5 gap-y-1 border-t border-linen/10 pt-4 lg:mt-5 lg:block lg:border-0 lg:pt-0">
              {[{ href: "/", label: "Home" }, ...nav].map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="inline-flex min-h-11 items-center hover:text-linen lg:min-h-10">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-1.5 border-t border-linen/10 pt-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between lg:mt-14">
          <p>{`© ${year} ${site.legalName}. All rights reserved.`}</p>
          <p className="max-sm:hidden">{`Granite, marble & quartz countertops · ${site.address.city}, ${site.address.region}`}</p>
          {site.spec && <p>Proposed site by T3KDesigns</p>}
        </div>
      </Container>
    </footer>
  );
}
