import Link from "next/link";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import ProjectCard from "@/components/ProjectCard";
import QuoteCta from "@/components/QuoteCta";
import Strengths from "@/components/Strengths";
import { ArrowIcon, CheckIcon, PinIcon } from "@/components/icons";
import { ArrowLink, ButtonLink, CallButton, Container, Kicker, QuoteButton, SectionHead } from "@/components/ui";
import { materials, projects, site, steps, strengths, trust } from "@/lib/site";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <PageHero
        size="home"
        image="hero-kitchen"
        alt="Modern kitchen with a long stone island, pendant lights and white bar stools"
        kicker={`${site.address.city}, NC · Family owned`}
        title={
          <>
            Granite, marble &amp; quartz, <em className="text-brass-light">crafted in Statesville.</em>
          </>
        }
        lede="Custom countertops fabricated and installed by a family-owned shop, with a yard full of slabs to walk and a designer on staff to help you choose."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <QuoteButton />
          <CallButton />
        </div>
        <p className="mt-6 flex items-center gap-2 text-sm text-stone-300">
          <span className="h-px w-6 bg-brass" aria-hidden="true" />
          {`${site.hours.short} · Slab viewing by appointment`}
        </p>
      </PageHero>

      {/* Trust strip */}
      <section aria-label="Why homeowners choose L&L" className="border-b border-stone-200 bg-paper">
        <Container>
          <ul className="grid grid-cols-2 lg:grid-cols-4">
            {trust.map((t, i) => (
              <li
                key={t.big}
                data-reveal
                style={{ ["--d" as string]: i }}
                className={`py-7 sm:py-9 ${i % 2 ? "pl-5 sm:pl-8" : "pr-5 sm:pr-8"} ${i > 1 ? "border-t border-stone-200 lg:border-t-0" : ""} ${
                  i % 2 ? "border-l border-stone-200" : ""
                } lg:px-8 lg:first:pl-0 ${i === 2 ? "lg:border-l" : ""}`}
              >
                <p className="display text-[1.9rem] text-ink sm:text-4xl">{t.big}</p>
                <p className="mt-1.5 text-[0.9rem] leading-snug text-stone-600">{t.small}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Intro */}
      <section className="py-14 sm:py-28 lg:py-32">
        <Container className="grid gap-6 sm:gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <div data-reveal>
            <Kicker className="text-brass-deep">One shop, start to finish</Kicker>
            <p className="display mt-4 text-[1.85rem] leading-[1.1] text-ink sm:mt-6 sm:text-5xl lg:text-[3.4rem]">
              We create warm, inviting rooms with <em className="text-brass-deep">elegance, character</em> and sophistication, one slab at a time.
            </p>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-stone-600 sm:space-y-5 sm:text-[1.05rem] lg:pt-14" data-reveal style={{ ["--d" as string]: 1 }}>
            <p>
              L&amp;L Granite is a one-stop shop for countertops, tile and the accessories that finish a room, for homeowners, builders and
              businesses alike.
            </p>
            <p className="max-sm:hidden">
              We listen first, then guide you from consultation and slab selection through templating, fabrication, installation and
              follow-up. The result is stone you&apos;ll love for decades, at a fair price.
            </p>
            <ArrowLink href="/about" className="text-ink">
              About our family shop
            </ArrowLink>
          </div>
        </Container>
      </section>

      {/* Materials */}
      <section className="grain overflow-hidden bg-onyx-900 py-14 text-linen sm:py-28 lg:py-32">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead
              dark
              kicker="What we work with"
              title={
                <>
                  Three stones. <em className="text-brass-light">Endless character.</em>
                </>
              }
              lede="Every material has its own personality. We'll help you match the stone to the way you live."
            />
            <ArrowLink href="/materials" className="shrink-0 text-linen max-lg:hidden">
              Compare materials
            </ArrowLink>
          </div>

          <ul className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 sm:-mx-8 sm:mt-12 sm:gap-4 sm:scroll-px-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
            {materials.map((m, i) => (
              <li key={m.id} className="w-[78%] shrink-0 snap-start md:w-auto" data-reveal style={{ ["--d" as string]: i }}>
                <Link href={`/materials#${m.id}`} className="zoom-on-hover group block">
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-[1.25rem] md:aspect-[4/5]">
                    <Photo name={m.image} alt={`Close-up of ${m.name.toLowerCase()} showing its natural pattern`} sizes="(min-width: 768px) 32vw, 82vw" fill />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-onyx-950/85 via-transparent to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <span className="display block text-[2.2rem] text-linen md:text-[2.6rem]">{m.name}</span>
                      <span className="mt-1 block text-[0.9rem] leading-snug text-stone-300 md:text-[0.95rem]">{m.line}</span>
                    </span>
                  </span>
                  <ul className="mt-4 space-y-2 text-[0.92rem] text-stone-300 md:mt-5 md:space-y-2.5 md:text-[0.95rem]">
                    {m.benefits.slice(0, 3).map((b) => (
                      <li key={b.title} className="flex gap-3">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                        {b.title}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brass-light md:mt-5">
                    {`Explore ${m.name.toLowerCase()}`}
                    <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-7 text-[0.95rem] text-stone-400 sm:mt-10 md:text-center">
            {"Plus tile, tile supplies, sinks and accessories in the showroom. "}
            <Link href="/materials#showroom" className="font-semibold text-linen underline decoration-brass underline-offset-4">
              See what else we carry
            </Link>
          </p>
        </Container>
      </section>

      {/* Featured projects */}
      <section className="py-14 sm:py-28 lg:py-32">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead
              kicker="Recent work"
              title={
                <>
                  Kitchens, baths <em className="text-brass-deep">&amp; beyond.</em>
                </>
              }
              lede="Islands that stop people in the doorway. Vanities that feel like a hotel. Counters that work as hard as you do."
            />
            <ArrowLink href="/projects" className="shrink-0 text-ink max-lg:hidden">
              View all projects
            </ArrowLink>
          </div>

          <div className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-12 lg:gap-6">
            {featured.slice(0, 5).map((p, i) => {
              const layout = [
                { cls: "lg:col-span-7 lg:row-span-2", aspect: "aspect-[4/5] lg:aspect-auto lg:h-full", sizes: "(min-width: 1024px) 58vw, (min-width: 640px) 50vw, 80vw" },
                { cls: "lg:col-span-5", aspect: "aspect-[4/5] lg:aspect-[5/4]", sizes: "(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 80vw" },
                { cls: "lg:col-span-5", aspect: "aspect-[4/5] lg:aspect-[5/4]", sizes: "(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 80vw" },
                { cls: "lg:col-span-6", aspect: "aspect-[4/5] lg:aspect-[4/3]", sizes: "(min-width: 1024px) 48vw, (min-width: 640px) 50vw, 80vw" },
                { cls: "lg:col-span-6", aspect: "aspect-[4/5] lg:aspect-[4/3]", sizes: "(min-width: 1024px) 48vw, (min-width: 640px) 50vw, 80vw" },
              ][i];
              return (
                <div key={p.slug} className={`w-[80%] shrink-0 snap-start sm:w-auto ${layout.cls}`} data-reveal style={{ ["--d" as string]: i % 2 }}>
                  <ProjectCard project={p} sizes={layout.sizes} aspect={layout.aspect} className="h-full" />
                </div>
              );
            })}
          </div>
          <div className="mt-6 sm:mt-10 lg:hidden">
            <ButtonLink href="/projects" variant="ghost" className="w-full sm:w-auto">
              View all projects
              <ArrowIcon />
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Showroom invitation */}
      <section className="relative isolate overflow-hidden bg-onyx-950 text-linen">
        <Photo name="granite-black" alt="Close-up of polished black granite with flecks of silver" sizes="100vw" fill className="-z-20" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-onyx-950/95 via-onyx-950/70 to-onyx-950/20" />
        <Container className="py-16 sm:py-32 lg:py-40">
          <div className="max-w-xl" data-reveal>
            <Kicker className="text-brass">The slab yard</Kicker>
            <h2 className="display mt-4 text-[2.3rem] sm:mt-5 sm:text-6xl">
              Walk the slabs. <em className="text-brass-light">Touch the stone.</em>
            </h2>
            <p className="lede mt-4 text-base leading-relaxed text-stone-300 sm:mt-6 sm:text-lg">
              A photo can&apos;t show you how a slab moves in the light. Our large in-stock inventory means you can see the exact piece
              that will become your countertop, and our designer can help you pair it with cabinets, floors and tile.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
              <QuoteButton label="Book a slab viewing" />
              <ButtonLink href={site.links.directions} variant="ghost-light" target="_blank" rel="noopener noreferrer">
                <PinIcon className="h-[1.1rem] w-[1.1rem]" />
                Get directions
              </ButtonLink>
            </div>
            <p className="mt-5 text-sm text-stone-400 sm:mt-6">
              {`${site.address.oneLine} · `}
              <span className="whitespace-nowrap">{site.hours.short}</span>
            </p>
          </div>
        </Container>
      </section>

      {/* Process overview */}
      <section className="bg-paper py-14 sm:py-28 lg:py-32">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead
              kicker="How it works"
              title={
                <>
                  Six steps. <em className="text-brass-deep">No surprises.</em>
                </>
              }
              lede="We set clear expectations up front, so the day your new tops go in is the easy part."
            />
            <ArrowLink href="/process" className="shrink-0 text-ink max-lg:hidden">
              The full process
            </ArrowLink>
          </div>
          <ol className="mt-6 grid grid-cols-2 gap-x-4 sm:mt-14 sm:gap-x-8 lg:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.n} className="relative border-t border-stone-200 py-4 sm:py-8" data-reveal style={{ ["--d" as string]: i % 3 }}>
                <span aria-hidden="true" className="absolute -top-px left-0 h-px w-12 bg-brass" />
                <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-5">
                  <span className="display shrink-0 text-[1.5rem] leading-none text-brass-deep tabular-nums sm:text-[2rem]">{s.n}</span>
                  <div>
                    <h3 className="text-[0.98rem] font-bold leading-snug text-ink sm:text-[1.1rem]">{s.title}</h3>
                    <p className="mt-2 text-[0.97rem] leading-relaxed text-stone-600 max-sm:hidden">{s.short}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-5 sm:mt-8 lg:hidden">
            <ArrowLink href="/process" className="text-ink">
              The full process
            </ArrowLink>
          </div>
        </Container>
      </section>

      {/* Why L&L */}
      <section className="py-14 sm:py-28 lg:py-32">
        <Container className="grid gap-8 sm:gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHead
              kicker="Why L&L"
              title={
                <>
                  The care of a family shop. <em className="text-brass-deep">The finish of a showroom.</em>
                </>
              }
            />
            <div className="relative mt-10 aspect-[4/5] overflow-hidden rounded-[1.25rem] max-lg:hidden" data-reveal>
              <Photo name="sink-faucet" alt="Undermount sink and matte black faucet set into a speckled granite countertop" sizes="40vw" fill />
            </div>
          </div>
          <div>
            <Strengths items={strengths} />
            <p className="mt-6 border-t border-stone-200 pt-6 text-[0.95rem] leading-relaxed text-stone-600 sm:mt-0 sm:pt-8" data-reveal>
              {`Proudly serving ${site.areas.slice(0, -1).join(", ")} and the ${site.areas.at(-1)} area, plus ${site.counties.join(", ")} counties.`}
            </p>
          </div>
        </Container>
      </section>

      <QuoteCta />
    </>
  );
}
