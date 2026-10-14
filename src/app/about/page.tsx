import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import QuoteCta from "@/components/QuoteCta";
import { CheckIcon } from "@/components/icons";
import { ArrowLink, Container, Kicker, SectionHead } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { site, strengths } from "@/lib/site";

export const metadata = pageMeta({
  title: "About Our Family-Owned Countertop Shop",
  description: `${site.name} is a family-owned granite, marble and quartz fabricator in Statesville, NC: in-house fabrication and installation, a designer on staff and a large in-stock slab inventory.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="proj-open-plan-3"
        alt="Bright open-plan kitchen with a white quartz waterfall island and pendant lights"
        kicker="About L&L"
        title={
          <>
            A family shop with <em className="text-brass-light">a showroom finish.</em>
          </>
        }
        lede={`Family-owned and rooted in ${site.address.city}, we fabricate and install granite, marble and quartz for homes and businesses across the area.`}
      />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div data-reveal>
            <Kicker className="text-brass-deep">Our mission</Kicker>
            <blockquote className="mt-6">
              <p className="display text-[2.1rem] leading-[1.1] text-ink sm:text-5xl">
                <span aria-hidden="true" className="mr-1 text-brass">
                  “
                </span>
                {site.mission}
                <span aria-hidden="true" className="text-brass">
                  ”
                </span>
              </p>
            </blockquote>
          </div>
          <div className="space-y-5 text-[1.05rem] leading-relaxed text-stone-600 lg:pt-12" data-reveal style={{ ["--d" as string]: 1 }}>
            <p>
              Our strongest attributes are customer satisfaction and quality countertops. We aim to give every customer the best possible
              service, backed by industry knowledge, long-proven experience and a strong sense of responsibility.
            </p>
            <p>
              We consider our people, our craftsmanship and our customer service our most valuable assets. Every job, from a single vanity to a
              whole-house remodel or a commercial build-out, gets the same attention from consultation and planning through fabrication,
              installation and follow-up.
            </p>
            <p>
              We listen to what you need, then bring together the right stone, honest guidance and careful work to get a result you&apos;re proud
              of, at a fair price.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] sm:aspect-[4/3] lg:aspect-[4/5]" data-reveal>
            <Photo name="granite-texture" alt="Close-up of a dark granite slab with sweeping gold and gray movement" sizes="(min-width: 1024px) 45vw, 100vw" fill />
          </div>
          <div>
            <SectionHead
              kicker="What you get with L&L"
              title={
                <>
                  Everything under <em className="text-brass-deep">one roof.</em>
                </>
              }
            />
            <ul className="mt-8 space-y-5" data-reveal>
              {[
                ["A large in-stock slab inventory", "Walk the yard and choose the exact slab for your job."],
                ["A designer on staff", "Help pairing stone with cabinets, floors, tile and hardware."],
                ["In-house fabrication & installation", "The same team templates, cuts and installs, start to finish."],
                ["Tile, sinks & accessories", "The finishing pieces, chosen in the same visit."],
                ["Residential & commercial", "Kitchens and baths, builders, offices, restaurants and more."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-4">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-onyx-900 text-brass">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-bold text-ink">{t}</span>
                    <span className="mt-1 block leading-relaxed text-stone-600">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-9" data-reveal>
              <ArrowLink href="/materials#showroom" className="text-ink">
                Plan a showroom visit
              </ArrowLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="grain bg-onyx-900 py-20 text-linen sm:py-28">
        <Container>
          <SectionHead
            dark
            kicker="What we stand for"
            title={
              <>
                Six promises <em className="text-brass-light">on every job.</em>
              </>
            }
          />
          <ul className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {strengths.map((s, i) => (
              <li key={s.title} className="border-t border-linen/10 py-7" data-reveal style={{ ["--d" as string]: i % 3 }}>
                <p className="kicker text-[0.62rem] text-brass">{`0${i + 1}`}</p>
                <h3 className="mt-3 font-serif text-[1.65rem] font-semibold leading-tight">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-stone-300">{s.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <QuoteCta
        kicker="Come say hello"
        title={
          <>
            Visit the <em>showroom.</em>
          </>
        }
        text={`We're at ${site.address.oneLine}, ${site.hours.rows[0].days.replace(" – ", " to ")} ${site.hours.rows[0].time.replace(" – ", " to ")}. Call or text ahead and we'll have someone ready to walk the slabs with you.`}
      />
    </>
  );
}
