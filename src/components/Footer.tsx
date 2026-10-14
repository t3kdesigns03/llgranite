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
      <Container className="pb-32 pt-16 sm:pt-20 lg:pb-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.8fr]">
          <div>
            <Link href="/" aria-label={`${site.name}, home`} className="text-linen">
              <Wordmark />
            </Link>
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-stone-400">
              Family-owned granite, marble and quartz fabrication and installation, for homes and businesses across Iredell County and the
              surrounding area.
            </p>
            <a
              href={site.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full border border-linen/15 pl-3 pr-4 text-sm font-semibold text-linen transition-colors hover:border-brass"
            >
              <FacebookIcon className="h-5 w-5 text-brass" />
              Follow on Facebook
            </a>
          </div>

          <div>
            <h2 className="kicker text-brass">Visit the showroom</h2>
            <address className="mt-5 not-italic leading-relaxed">
              <a href={site.links.directions} target="_blank" rel="noopener noreferrer" className="group inline-flex gap-3 hover:text-linen">
                <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brass" />
                <span>
                  {site.address.street}
                  <br />
                  {`${site.address.city}, ${site.address.region} ${site.address.zip}`}
                  <span className="mt-1 block text-sm font-semibold text-linen underline decoration-brass/60 underline-offset-4 group-hover:decoration-brass">
                    Get directions
                  </span>
                </span>
              </a>
              <a href={site.phone.href} className="mt-5 inline-flex items-center gap-3 font-semibold tabular-nums text-linen hover:text-brass-light">
                <PhoneIcon className="h-5 w-5 text-brass" />
                {site.phone.display}
              </a>
            </address>
          </div>

          <div>
            <h2 className="kicker text-brass">Hours</h2>
            <dl className="mt-5 space-y-2 text-[0.95rem]">
              {site.hours.rows.map((r) => (
                <div key={r.days}>
                  <dt className="text-stone-400">{r.days}</dt>
                  <dd className="font-semibold text-linen">{r.time}</dd>
                </div>
              ))}
            </dl>
            <OpenStatus className="mt-4 text-sm text-stone-400" />
          </div>

          <nav aria-label="Footer">
            <h2 className="kicker text-brass">Explore</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-1">
              {[{ href: "/", label: "Home" }, ...nav].map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="inline-flex min-h-10 items-center hover:text-linen">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-linen/10 pt-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>{`© ${year} ${site.legalName}. All rights reserved.`}</p>
          <p>{`Granite, marble & quartz countertops · ${site.address.city}, ${site.address.region}`}</p>
          {site.spec && <p>Proposed site by T3KDesigns</p>}
        </div>
      </Container>
    </footer>
  );
}
