import OpenStatus from "@/components/OpenStatus";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import { ClockIcon, FacebookIcon, PinIcon } from "@/components/icons";
import { ButtonLink, CallButton, Container, Kicker, TextLink } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Free Countertop Quote & Showroom Visit",
  description: `Get a free granite, marble or quartz countertop quote from ${site.name}. Call ${site.phone.display} or visit our showroom at ${site.address.oneLine}. ${site.hours.short}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        size="compact"
        image="proj-marble-backsplash"
        alt="Kitchen with a full-height marble slab backsplash behind the sink"
        kicker="Contact"
        title={
          <>
            Get your <em className="text-brass-light">free quote.</em>
          </>
        }
        lede="Send a few details below, or call. Either way, you'll talk to the people who'll actually cut your stone."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <CallButton className="sm:!min-h-12" />
          <TextLink dark />
        </div>
      </PageHero>

      <section className="py-10 sm:py-20 lg:py-24">
        <Container className="grid gap-6 sm:gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <div id="quote" data-hide-sticky className="border-y border-stone-200 bg-paper px-5 py-7 max-sm:-mx-5 sm:rounded-[1.5rem] sm:border sm:p-9 sm:shadow-[0_30px_60px_-40px_rgb(29_26_23/0.35)] lg:p-11">
            <Kicker className="text-brass-deep">Free, no obligation</Kicker>
            <h2 className="display mb-6 mt-3 text-[2rem] text-ink sm:mb-8 sm:mt-4 sm:text-[2.8rem]">Tell us about your project</h2>
            <QuoteForm />
          </div>

          <aside className="space-y-4 sm:space-y-5">
            <div className="rounded-[1.25rem] bg-onyx-900 p-5 text-linen sm:rounded-[1.5rem] sm:p-8">
              <div className="flex items-center gap-3">
                <ClockIcon className="h-5 w-5 text-brass" />
                <h2 className="kicker text-brass">Hours</h2>
              </div>
              <dl className="mt-5 divide-y divide-linen/10">
                {site.hours.rows.map((r) => (
                  <div key={r.days} className="flex justify-between gap-4 py-3 first:pt-0">
                    <dt className="text-stone-300">{r.days}</dt>
                    <dd className="font-semibold">{r.time}</dd>
                  </div>
                ))}
              </dl>
              <OpenStatus className="mt-3 text-sm text-stone-300" />
              <p className="mt-4 border-t border-linen/10 pt-4 text-[0.95rem] leading-relaxed text-stone-300 sm:mt-5 sm:pt-5">{site.hours.note}</p>
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-paper">
              <div className="p-5 sm:p-8">
                <div className="flex items-center gap-3">
                  <PinIcon className="h-5 w-5 text-brass-deep" />
                  <h2 className="kicker text-brass-deep">Showroom &amp; slab yard</h2>
                </div>
                <address className="mt-4 font-serif text-[1.6rem] font-semibold not-italic leading-snug text-ink">
                  {site.address.street}
                  <br />
                  {`${site.address.city}, ${site.address.region} ${site.address.zip}`}
                </address>
                <ButtonLink href={site.links.directions} variant="onyx" target="_blank" rel="noopener noreferrer" className="mt-5 w-full sm:w-auto">
                  <PinIcon className="h-[1.1rem] w-[1.1rem]" />
                  Get directions
                </ButtonLink>
              </div>
              <iframe
                title={`Map showing ${site.name} at ${site.address.oneLine}`}
                src={site.links.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-52 w-full border-0 border-t border-stone-200 grayscale-[0.55] sm:h-72"
              />
            </div>

            <a
              href={site.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-16 items-center justify-between gap-4 rounded-[1.5rem] border border-stone-200 bg-paper px-6 py-4 transition-colors hover:border-ink"
            >
              <span className="flex items-center gap-3 font-semibold text-ink">
                <FacebookIcon className="h-6 w-6 text-[#1f4b99]" />
                See recent jobs on Facebook
              </span>
              <span aria-hidden="true" className="text-stone-500">
                ↗
              </span>
            </a>
          </aside>
        </Container>
      </section>
    </>
  );
}
