import type { ReactNode } from "react";
import type { ImageName } from "@/lib/images.generated";
import Photo from "./Photo";
import { Container, Kicker } from "./ui";

/**
 * Full-bleed photo hero used at the top of every page. `size="home"` fills the screen; `page` is a
 * shorter banner for inner pages. Text sits bottom-left over a charcoal gradient so it always reads.
 */
export default function PageHero({
  image,
  alt,
  kicker,
  title,
  lede,
  children,
  size = "page",
}: {
  image: ImageName;
  alt: string;
  kicker?: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  size?: "home" | "page" | "compact";
}) {
  const home = size === "home";
  return (
    <section
      className={`relative isolate flex overflow-hidden bg-onyx-950 text-linen ${
        home
          ? "min-h-[max(40rem,100svh)] lg:min-h-[max(44rem,100svh)]"
          : size === "compact"
            ? "min-h-[24rem] sm:min-h-[28rem]"
            : "min-h-[30rem] sm:min-h-[34rem] lg:min-h-[38rem]"
      }`}
    >
      <Photo name={image} alt={alt} fill priority sizes="100vw" className="-z-20" imgClassName="ken-burns" />
      {/* Charcoal gradients: strong at the bottom-left where the type sits, light elsewhere */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-onyx-950 via-onyx-950/55 to-onyx-950/25" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-onyx-950/70 via-onyx-950/20 to-transparent max-sm:hidden" />

      <Container className={`relative flex flex-col justify-end ${home ? "pb-14 pt-32 sm:pb-20 lg:pb-24" : size === "compact" ? "pb-10 pt-28 sm:pb-14" : "pb-12 pt-32 sm:pb-16"}`}>
        <div className="hero-in max-w-3xl">
          {kicker && <Kicker className="text-brass-light">{kicker}</Kicker>}
          <h1
            className={`display mt-5 text-linen ${
              home ? "text-[2.9rem] leading-[0.98] sm:text-7xl lg:text-[5.6rem]" : "text-[2.75rem] sm:text-6xl lg:text-[4.5rem]"
            }`}
          >
            {title}
          </h1>
          {lede && <p className="lede mt-6 max-w-xl text-[1.08rem] leading-relaxed text-stone-200 sm:text-xl">{lede}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
