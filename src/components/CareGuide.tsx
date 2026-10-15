"use client";

import { useEffect, useRef, useState } from "react";
import { care, heatWarning, type MaterialId } from "@/lib/site";
import { CheckIcon, XSmallIcon } from "./icons";
import { Container, Kicker } from "./ui";

const ids = care.map((c) => c.id);
const isId = (h: string): h is MaterialId => (ids as string[]).includes(h);

/**
 * Tabbed care guide: one stone at a time instead of three long sections. `/care#marble` (and the hero
 * chips) open the matching tab. All three panels are in the HTML for search engines, and without
 * JavaScript the <noscript> rule shows them all.
 */
export default function CareGuide() {
  const [active, setActive] = useState<MaterialId>("granite");
  const top = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fromHash = (scroll: boolean) => {
      const h = window.location.hash.slice(1);
      if (!isId(h)) return;
      setActive(h);
      if (scroll) top.current?.scrollIntoView({ block: "start" });
    };
    fromHash(true);
    const onHash = () => fromHash(true);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function pick(id: MaterialId) {
    setActive(id);
    history.replaceState(null, "", `#${id}`);
    const t = top.current;
    if (t && t.getBoundingClientRect().top < 0) t.scrollIntoView({ block: "start" });
  }

  return (
    <section id="guide" ref={top}>
      <noscript>
        <style>{"[data-care-panel]{display:block!important}[data-care-tabs]{display:none!important}"}</style>
      </noscript>

      <div data-care-tabs className="sticky top-[4.25rem] z-30 border-b border-stone-200 bg-linen/92 backdrop-blur-md lg:top-[5rem]">
        <Container>
          <div role="tablist" aria-label="Choose a stone" className="flex gap-2 py-3">
            {care.map((c) => (
              <button
                key={c.id}
                id={`tab-${c.id}`}
                type="button"
                role="tab"
                aria-selected={active === c.id}
                aria-controls={`panel-${c.id}`}
                onClick={() => pick(c.id)}
                className={`inline-flex min-h-11 flex-1 items-center justify-center rounded-full border px-4 text-[0.95rem] font-semibold transition-colors sm:flex-none sm:px-6 ${
                  active === c.id ? "border-onyx-900 bg-onyx-900 text-linen" : "border-stone-300 text-stone-600 hover:border-ink hover:text-ink"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {care.map((c) => (
        <div
          key={c.id}
          id={`panel-${c.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${c.id}`}
          data-care-panel
          hidden={active !== c.id}
          className="py-10 sm:py-20"
        >
          <Container className="grid gap-7 sm:gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <Kicker className="text-brass-deep">{`Caring for ${c.name.toLowerCase()}`}</Kicker>
              <h2 className="display mt-3 text-[2.6rem] text-ink sm:mt-4 sm:text-6xl">{c.name}</h2>
              <p className="lede mt-3 text-base leading-relaxed text-stone-600 sm:mt-5 sm:text-lg">{c.summary}</p>
              {c.id === "quartz" && (
                <p className="mt-5 rounded-2xl border border-brass/40 bg-brass/10 p-4 text-[0.95rem] leading-relaxed text-ink sm:mt-6 sm:p-5">
                  <strong className="font-bold">Heat is quartz&apos;s weak spot. </strong>
                  {heatWarning}
                </p>
              )}
            </div>

            <div>
              <dl className="divide-y divide-stone-200 border-y border-stone-200">
                {[
                  ["Daily cleaning", c.daily],
                  ["Spills", c.spills],
                  ["Stubborn spots", c.stubborn],
                  ["Sealing", c.sealing],
                  ...(c.stains ? [["Stain removal", c.stains]] : []),
                ].map(([k, v]) => (
                  <div key={k} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6 sm:py-5">
                    <dt className="font-bold text-ink">{k}</dt>
                    <dd className="text-[0.97rem] leading-relaxed text-stone-600 sm:text-base">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
                <div className="rounded-2xl bg-onyx-900 p-5 text-linen sm:p-6">
                  <p className="kicker text-brass">Always</p>
                  <ul className="mt-3 space-y-2.5 text-[0.95rem] sm:mt-4 sm:space-y-3">
                    {["Blot spills right away", "Use coasters, trivets & placemats", "Rinse and dry after cleaning"].map((t) => (
                      <li key={t} className="flex gap-3">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-stone-300 p-5 sm:p-6">
                  <p className="kicker text-[#8f3b25]">Avoid</p>
                  <ul className="mt-3 space-y-2.5 text-[0.95rem] text-ink sm:mt-4 sm:space-y-3">
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
        </div>
      ))}
    </section>
  );
}
