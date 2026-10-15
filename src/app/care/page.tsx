import PageHero from "@/components/PageHero";
import QuoteCta from "@/components/QuoteCta";
import CareGuide from "@/components/CareGuide";
import { PhoneIcon } from "@/components/icons";
import { Container } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { care, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Countertop Care & Maintenance: Granite, Marble & Quartz",
  description: "How to clean, seal and protect granite, marble and quartz countertops: daily cleaning, spills, stubborn spots, stain removal and what to avoid.",
  path: "/care",
});

export default function CarePage() {
  return (
    <>
      <PageHero
        image="proj-white-quartz"
        alt="Bright white quartz countertop with a brass faucet, fresh herbs and a bowl of fruit"
        kicker="Care & maintenance"
        title={
          <>
            Keep it <em className="text-brass-light">beautiful.</em>
          </>
        }
        lede="Natural and engineered stone are built to last for decades. A few simple habits keep yours looking like install day."
      >
        <nav aria-label="Jump to a material" className="flex flex-wrap gap-2">
          {care.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="inline-flex min-h-11 items-center rounded-full border border-linen/35 bg-onyx-950/20 px-5 text-sm font-semibold backdrop-blur-sm transition-colors hover:border-linen"
            >
              {c.name}
            </a>
          ))}
        </nav>
      </PageHero>

      {/* The universal basics */}
      <section className="border-b border-stone-200 bg-paper py-10 sm:py-16">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-3 sm:gap-8">
            {[
              ["Blot, don't wipe", "Wiping spreads a spill. Blot it up, then clean."],
              ["A little mild soap", "Too much soap leaves a film. Rinse and dry."],
              ["Coasters & trivets", "The simplest way to prevent rings, etching and heat damage."],
            ].map(([t, d], i) => (
              <li key={t} data-reveal style={{ ["--d" as string]: i }}>
                <p className="display text-[1.5rem] text-ink sm:text-[1.8rem]">{t}</p>
                <p className="mt-1 text-[0.97rem] text-stone-600 sm:mt-2 sm:text-base">{d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CareGuide />

      <section className="border-t border-stone-200 py-10 sm:py-14">
        <Container className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="display max-w-xl text-[1.6rem] text-ink sm:text-[2.1rem]">
            Stain won&apos;t budge? <em className="text-brass-deep">Give us a call.</em>
          </p>
          <a href={site.phone.href} className="btn btn-onyx tabular-nums">
            <PhoneIcon className="h-[1.1rem] w-[1.1rem]" />
            {site.phone.display}
          </a>
        </Container>
      </section>

      <QuoteCta />
    </>
  );
}
