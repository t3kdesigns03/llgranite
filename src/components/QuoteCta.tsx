import type { ReactNode } from "react";
import { site } from "@/lib/site";
import Photo from "./Photo";
import { CallButton, Container, Kicker, QuoteButton, TextLink } from "./ui";

/** The closing call to action on every page. Hides the sticky mobile bar while on screen. */
export default function QuoteCta({
  kicker = "Free quotes · Statesville, NC",
  title = (
    <>
      Let&apos;s find <em>your</em> slab.
    </>
  ),
  text = "Send a few details and rough measurements for a free quote, or come walk the slabs with us. No pressure, just straight answers from people who cut stone every day.",
}: {
  kicker?: string;
  title?: ReactNode;
  text?: string;
}) {
  return (
    <section data-hide-sticky className="relative isolate overflow-hidden bg-onyx-950 text-linen">
      <Photo name="granite-texture" alt="" sizes="100vw" fill className="-z-20 opacity-45" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-onyx-950/95 via-onyx-950/80 to-onyx-950/55" />
      <Container className="py-14 sm:py-28 lg:py-32">
        <div className="max-w-2xl" data-reveal>
          <Kicker className="text-brass">{kicker}</Kicker>
          <h2 className="display mt-4 text-[2.4rem] sm:mt-5 sm:text-6xl lg:text-7xl">{title}</h2>
          <p className="lede mt-4 max-w-xl text-base leading-relaxed text-stone-300 sm:mt-6 sm:text-lg">{text}</p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
            <QuoteButton />
            <CallButton />
          </div>
          <div className="mt-6 flex flex-col gap-3 text-sm text-stone-400 sm:flex-row sm:items-center sm:gap-6">
            <TextLink dark />
            <span>{`${site.hours.rows[0].days} · ${site.hours.rows[0].time}`}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
