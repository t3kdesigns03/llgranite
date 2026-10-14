import PageHero from "@/components/PageHero";
import QuoteCta from "@/components/QuoteCta";
import { CheckIcon, PlusIcon } from "@/components/icons";
import { CallButton, Container, Kicker, QuoteButton, SectionHead } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { goodToKnow, site, steps, templateChecklist } from "@/lib/site";

export const metadata = pageMeta({
  title: "Our Countertop Process: Quote, Template, Fabrication & Install",
  description: `How ${site.name} takes your countertops from free quote and slab selection to template, fabrication, installation and care. Clear expectations, no surprises.`,
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <PageHero
        image="proj-classic-granite-1"
        alt="Traditional kitchen with oak cabinets, black granite countertops and an island cooktop"
        kicker="The process"
        title={
          <>
            From first call to <em className="text-brass-light">final walk-through.</em>
          </>
        }
        lede="Countertops are a big decision. Here's exactly how it works, what we'll handle, and the few things we'll need from you, so install day is the easy part."
      />

      {/* Steps */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              kicker="Six steps"
              title={
                <>
                  One team, <em className="text-brass-deep">start to finish.</em>
                </>
              }
              lede="The same shop that helps you choose your slab templates it, cuts it and installs it. No hand-offs, no finger-pointing."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row" data-reveal>
              <QuoteButton />
              <CallButton variant="ghost" />
            </div>
          </div>

          <ol className="relative">
            <span aria-hidden="true" className="absolute bottom-6 left-[1.45rem] top-6 w-px bg-gradient-to-b from-brass via-stone-300 to-transparent sm:left-[1.7rem]" />
            {steps.map((s, i) => (
              <li key={s.n} className="relative flex gap-5 pb-12 last:pb-0 sm:gap-8" data-reveal style={{ ["--d" as string]: i % 2 }}>
                <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-brass/50 bg-linen font-serif text-xl font-semibold text-brass-deep sm:h-14 sm:w-14 sm:text-2xl">
                  {s.n}
                </span>
                <div className="pt-1.5 sm:pt-2.5">
                  <h3 className="display text-[1.85rem] text-ink sm:text-[2.2rem]">{s.title}</h3>
                  <p className="mt-2 font-semibold text-ink">{s.short}</p>
                  <p className="mt-3 leading-relaxed text-stone-600">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Template checklist */}
      <section id="template-checklist" className="grain scroll-mt-16 bg-onyx-900 py-20 text-linen sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead
              dark
              kicker="Before template day"
              title={
                <>
                  Ready for <em className="text-brass-light">template?</em>
                </>
              }
              lede="Our templater measures your finished cabinets precisely, so everything that affects the stone needs to be in place. Run through this list the day before."
            />
            <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-stone-400" data-reveal>
              Items we cut openings for are taken at template when needed and brought back at installation. If we have to come back because the
              site isn&apos;t ready, an additional trip fee may apply.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-linen/10 bg-linen/[0.03] p-6 sm:p-8" data-reveal>
            <p className="kicker text-brass">Template checklist</p>
            <ul className="mt-6 space-y-1">
              {templateChecklist.map((item) => (
                <li key={item}>
                  <label className="flex min-h-12 cursor-pointer items-start gap-4 rounded-xl px-2 py-3 transition-colors hover:bg-linen/5">
                    <input type="checkbox" className="peer sr-only" />
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border border-stone-400 text-transparent transition-colors peer-checked:border-brass peer-checked:bg-brass peer-checked:text-onyx-950 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brass">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <span className="leading-relaxed text-stone-200 peer-checked:text-stone-400 peer-checked:line-through">{item}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Good to know */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHead
              kicker="Good to know"
              title={
                <>
                  Straight answers, <em className="text-brass-deep">up front.</em>
                </>
              }
              lede="The questions homeowners ask most, answered plainly. Anything else, just ask. We'd rather talk it through before you sign than surprise you after."
            />
          </div>
          <div className="border-t border-stone-200" data-reveal>
            {goodToKnow.map((f) => (
              <details key={f.q} className="group border-b border-stone-200">
                <summary className="flex min-h-16 items-center justify-between gap-6 py-5 text-left">
                  <span className="font-serif text-[1.45rem] font-semibold leading-snug text-ink sm:text-[1.6rem]">{f.q}</span>
                  <span className="chev grid h-10 w-10 shrink-0 place-items-center rounded-full border border-stone-300 text-ink group-open:border-brass group-open:bg-brass">
                    <PlusIcon className="h-4 w-4" />
                  </span>
                </summary>
                <p className="pb-7 pr-4 leading-relaxed text-stone-600 sm:pr-16">{f.a}</p>
              </details>
            ))}
            <div className="pt-8">
              <Kicker className="text-brass-deep">Payment</Kicker>
              <p className="mt-3 leading-relaxed text-stone-600">
                A signed contract and deposit reserve your slabs, and we hold them for you until fabrication. We&apos;ll walk through the full
                terms with your quote.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <QuoteCta
        kicker="Step one"
        title={
          <>
            Start with a <em>free quote.</em>
          </>
        }
        text="Send rough measurements and a few details about your project. We'll get back to you with pricing and next steps."
      />
    </>
  );
}
