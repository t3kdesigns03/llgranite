import Link from "next/link";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import QuoteCta from "@/components/QuoteCta";
import { CheckIcon, PinIcon } from "@/components/icons";
import { Container, Kicker, QuoteButton, SectionHead } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { compare, extras, materials, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Granite, Marble & Quartz Countertops",
  description: `Compare granite, marble and quartz countertops: heat, stains, sealing and upkeep. See in-stock slabs in person at ${site.name} in Statesville, NC.`,
  path: "/materials",
});

export default function MaterialsPage() {
  return (
    <>
      <PageHero
        image="proj-gold-vein"
        alt="Kitchen with white quartz veined in gold, brass stools and a matching backsplash"
        kicker="Materials"
        title={
          <>
            Granite, marble <em className="text-brass-light">&amp; quartz.</em>
          </>
        }
        lede="Three beautiful choices, each with its own strengths. Here's the honest rundown, and the best way to decide: come see the slabs."
      >
        <nav aria-label="Jump to a material" className="flex flex-wrap gap-2">
          {materials.map((m) => (
            <a
              key={m.id}
              href={`#${m.id}`}
              className="inline-flex min-h-11 items-center rounded-full border border-linen/35 bg-onyx-950/20 px-5 text-sm font-semibold backdrop-blur-sm transition-colors hover:border-linen"
            >
              {m.name}
            </a>
          ))}
        </nav>
      </PageHero>

      {materials.map((m, i) => (
        <section key={m.id} id={m.id} className={`py-14 sm:py-28 ${i % 2 ? "bg-paper" : ""}`}>
          <Container className="grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-20">
            <div className={`relative ${i % 2 ? "lg:order-2" : ""}`} data-reveal>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] sm:aspect-[5/4] sm:rounded-[1.5rem] lg:aspect-[4/5]">
                <Photo name={m.scene} alt={`${m.name} countertops in a finished room`} sizes="(min-width: 1024px) 45vw, 100vw" fill />
              </div>
              <div className={`absolute -bottom-6 right-4 w-[30%] overflow-hidden rounded-xl border-[3px] shadow-2xl sm:right-6 sm:w-[38%] sm:rounded-2xl sm:border-4 lg:-right-8 ${i % 2 ? "border-paper" : "border-linen"}`}>
                <div className="relative aspect-square">
                  <Photo name={m.image} alt={`${m.name} slab close-up`} sizes="(min-width: 1024px) 18vw, 38vw" fill />
                </div>
              </div>
            </div>

            <div data-reveal style={{ ["--d" as string]: 1 }}>
              <Kicker className="text-brass-deep">{`0${i + 1} · ${m.name}`}</Kicker>
              <h2 className="display mt-3 text-[2.1rem] text-ink sm:mt-4 sm:text-6xl">{m.line}</h2>
              <p className="lede mt-4 text-base leading-relaxed text-stone-600 sm:mt-6 sm:text-lg">{m.intro}</p>
              <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 sm:mt-8 sm:gap-x-8 sm:gap-y-5">
                {m.benefits.map((b) => (
                  <li key={b.title} className="flex gap-3">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass-deep sm:h-5 sm:w-5" />
                    <span>
                      <span className="block text-[0.95rem] font-bold leading-snug text-ink sm:text-base">{b.title}</span>
                      <span className="mt-1 block text-[0.95rem] leading-relaxed text-stone-600 max-sm:hidden">{b.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <dl className="mt-6 grid gap-4 border-t border-stone-200 pt-5 text-[0.95rem] sm:mt-8 sm:grid-cols-2 sm:pt-6">
                <div>
                  <dt className="kicker text-[0.62rem] text-stone-500">Best for</dt>
                  <dd className="mt-1.5 leading-relaxed text-ink">{m.bestFor}</dd>
                </div>
                <div>
                  <dt className="kicker text-[0.62rem] text-stone-500">Upkeep</dt>
                  <dd className="mt-1.5 leading-relaxed text-ink">
                    {`${m.care} `}
                    <Link href={`/care#${m.id}`} className="font-semibold underline decoration-brass underline-offset-4">
                      Care guide
                    </Link>
                  </dd>
                </div>
              </dl>
              <div className="mt-6 sm:mt-8">
                <QuoteButton variant="onyx" label={`See ${m.name.toLowerCase()} slabs in person`} />
              </div>
            </div>
          </Container>
        </section>
      ))}

      {/* Comparison */}
      <section className="grain bg-onyx-900 py-14 text-linen sm:py-28">
        <Container>
          <SectionHead
            dark
            kicker="Side by side"
            title={
              <>
                Which stone <em className="text-brass-light">fits your life?</em>
              </>
            }
            lede="There's no wrong answer, only the right fit for how you cook, clean and live."
          />
          <div className="mt-12 overflow-hidden rounded-[1.25rem] border border-linen/10" data-reveal>
            <table className="w-full table-fixed text-left text-[0.86rem] sm:text-base">
              <caption className="sr-only">Granite, marble and quartz compared</caption>
              <thead>
                <tr className="bg-linen/5">
                  <th scope="col" className="w-[25%] py-3 pl-3.5 pr-1 sm:w-[22%] sm:p-5">
                    <span className="sr-only">Quality</span>
                  </th>
                  {compare.cols.map((c) => (
                    <th key={c} scope="col" className="px-2 py-3 font-serif text-[1.25rem] font-semibold sm:p-5 sm:text-2xl">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compare.rows.map((r) => (
                  <tr key={r.label} className="border-t border-linen/10">
                    <th scope="row" className="kicker py-3 pl-3.5 pr-1 align-top text-[0.55rem] tracking-[0.12em] text-brass sm:p-5 sm:text-[0.68rem] sm:tracking-[0.22em]">
                      {r.label}
                    </th>
                    {r.values.map((v, i) => (
                      <td key={i} className="px-2 py-3 align-top leading-snug text-stone-200 sm:p-5">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* Showroom extras */}
      <section id="showroom" className="py-14 sm:py-28">
        <Container className="grid gap-6 sm:gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <SectionHead
              kicker="Also in the showroom"
              title={
                <>
                  Everything to <em className="text-brass-deep">finish the room.</em>
                </>
              }
              lede="Countertops are our focus, but you shouldn't have to make five stops to finish a kitchen. Pick out the pieces that go with your stone in one visit."
            />
            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[1.25rem] max-sm:hidden" data-reveal>
              <Photo name="sink-faucet" alt="Undermount stainless sink with a black faucet in a granite countertop" sizes="(min-width: 1024px) 38vw, 100vw" fill />
            </div>
          </div>
          <ul className="grid grid-cols-2 content-start gap-x-4 sm:gap-x-10">
            {extras.map((e, i) => (
              <li key={e.title} className="border-t border-stone-200 py-5 sm:py-7" data-reveal style={{ ["--d" as string]: i % 2 }}>
                <h3 className="font-serif text-[1.3rem] font-semibold leading-tight text-ink sm:text-[1.7rem]">{e.title}</h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-stone-600 sm:mt-3 sm:text-base">{e.text}</p>
              </li>
            ))}
            <li className="col-span-2 border-t border-stone-200 pt-5 sm:pt-7" data-reveal>
              <p className="text-[0.95rem] leading-relaxed text-stone-600">{site.hours.note}</p>
              <a
                href={site.links.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="hit mt-3 inline-flex items-center gap-2 font-semibold text-ink underline decoration-brass underline-offset-4"
              >
                <PinIcon className="h-4 w-4 text-brass-deep" />
                {`Directions to ${site.address.street}`}
              </a>
            </li>
          </ul>
        </Container>
      </section>

      <QuoteCta
        kicker="See them in person"
        title={
          <>
            The right slab is <em>waiting.</em>
          </>
        }
        text="Photos only go so far. Come walk our in-stock slabs, bring a cabinet door or paint chip, and we'll help you find the one."
      />
    </>
  );
}
