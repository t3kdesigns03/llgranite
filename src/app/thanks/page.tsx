import type { Metadata } from "next";
import { CallButton, Container, Kicker, ButtonLink } from "@/components/ui";
import { site } from "@/lib/site";

// Landing page for the quote form when JavaScript is off (the form posts here). Not for search.
export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <section className="grain flex min-h-[80svh] items-center bg-onyx-950 pb-20 pt-36 text-linen">
      <Container className="max-w-2xl text-center">
        <Kicker className="justify-center text-brass">Request received</Kicker>
        <h1 className="display mt-5 text-5xl sm:text-7xl">
          Thank <em className="text-brass-light">you.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-stone-300">
          {`We've got your details and will be in touch during business hours (${site.hours.short}). Need us sooner? Give us a call.`}
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <CallButton variant="brass" />
          <ButtonLink href="/projects" variant="ghost-light">
            Browse our work
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
