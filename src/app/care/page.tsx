import PageHero from "@/components/PageHero";
import QuoteCta from "@/components/QuoteCta";
import { CheckIcon, PhoneIcon, XSmallIcon } from "@/components/icons";
import { Container, Kicker } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { care, heatWarning, site } from "@/lib/site";

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
      <section className="border-b border-stone-200 bg-paper py-14 sm:py-16">
        <Container>
          <ul className="grid gap-8 sm:grid-cols-3">
            {[
              ["Blot, don't wipe", "Wiping spreads a spill. Blot it up, then clean."],
              ["A little mild soap", "Too much soap leaves a film. Rinse and dry."],
              ["Coasters & trivets", "The simplest way to prevent rings, etching and heat damage."],
            ].map(([t, d], i) => (
              <li key={t} data-reveal style={{ ["--d" as string]: i }}>
                <p className="display text-[1.8rem] text-ink">{t}</p>
                <p className="mt-2 text-stone-600">{d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {care.map((c, i) => (
        <section key={c.id} id={c.id} className={`scroll-mt-16 py-20 sm:py-24 ${i % 2 ? "bg-paper" : ""}`}>
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div data-reveal>
              <Kicker className="text-brass-deep">{`Caring for ${c.name.toLowerCase()}`}</Kicker>
              <h2 className="display mt-4 text-[3rem] text-ink sm:text-6xl">{c.name}</h2>
              <p className="lede mt-5 text-[1.05rem] leading-relaxed text-stone-600 sm:text-lg">{c.summary}</p>
              {c.id === "quartz" && (
                <p className="mt-6 rounded-2xl border border-brass/40 bg-brass/10 p-5 text-[0.95rem] leading-relaxed text-ink">
                  <strong className="font-bold">Heat is quartz&apos;s weak spot. </strong>
                  {heatWarning}
                </p>
              )}
            </div>

            <div data-reveal style={{ ["--d" as string]: 1 }}>
              <dl className="divide-y divide-stone-200 border-y border-stone-200">
                {[
                  ["Daily cleaning", c.daily],
                  ["Spills", c.spills],
                  ["Stubborn spots", c.stubborn],
                  ["Sealing", c.sealing],
                  ...(c.stains ? [["Stain removal", c.stains]] : []),
                ].map(([k, v]) => (
                  <div key={k} className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <dt className="font-bold text-ink">{k}</dt>
                    <dd className="leading-relaxed text-stone-600">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-onyx-900 p-6 text-linen">
                  <p className="kicker text-brass">Always</p>
                  <ul className="mt-4 space-y-3 text-[0.95rem]">
                    {["Blot spills right away", "Use coasters, trivets & placemats", "Rinse and dry after cleaning"].map((t) => (
                      <li key={t} className="flex gap-3">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-stone-300 p-6">
                  <p className="kicker text-[#8f3b25]">Avoid</p>
                  <ul className="mt-4 space-y-3 text-[0.95rem] text-ink">
                    {c.avoid.map((t) => (
                      <li key={t} className="flex gap-3">
                        <XSmallIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#8f3b25]" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ))}

      <section className="border-t border-stone-200 py-14">
        <Container className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="display max-w-xl text-[1.8rem] text-ink sm:text-[2.1rem]">
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
