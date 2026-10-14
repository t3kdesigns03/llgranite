import type { Metadata } from "next";
import { ButtonLink, CallButton, Container, Kicker } from "@/components/ui";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="grain flex min-h-[80svh] items-center bg-onyx-950 pb-20 pt-36 text-linen">
      <Container className="max-w-2xl text-center">
        <Kicker className="justify-center text-brass">Page not found</Kicker>
        <h1 className="display mt-5 text-5xl sm:text-7xl">
          This slab&apos;s <em className="text-brass-light">already sold.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-stone-300">
          The page you&apos;re looking for has moved or doesn&apos;t exist. Let&apos;s get you somewhere useful.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" variant="brass">
            Back to home
          </ButtonLink>
          <CallButton />
        </div>
      </Container>
    </section>
  );
}
