import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { site } from "@/lib/site";
import { ArrowIcon, ChatIcon, PhoneIcon } from "./icons";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[78rem] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

export function Kicker({ className = "", children }: { className?: string; children: ReactNode }) {
  return <p className={`kicker kicker-rule ${className}`}>{children}</p>;
}

/** Section heading block: kicker, serif title, optional lede. `dark` flips colors for onyx backgrounds. */
export function SectionHead({
  kicker,
  title,
  lede,
  dark,
  center,
  className = "",
  as: Tag = "h2",
}: {
  kicker?: string;
  title: ReactNode;
  lede?: ReactNode;
  dark?: boolean;
  center?: boolean;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`} data-reveal>
      {kicker && <Kicker className={`${dark ? "text-brass" : "text-brass-deep"} ${center ? "justify-center" : ""}`}>{kicker}</Kicker>}
      <Tag className={`display mt-3 text-[2.15rem] sm:mt-4 sm:text-5xl lg:text-[3.6rem] ${dark ? "text-linen" : "text-ink"}`}>{title}</Tag>
      {lede && (
        <p className={`lede mt-3 text-base leading-relaxed sm:mt-5 sm:text-lg ${dark ? "text-stone-300" : "text-stone-600"}`}>{lede}</p>
      )}
    </div>
  );
}

type BtnVariant = "brass" | "onyx" | "ghost-light" | "ghost";

export function ButtonLink({
  href,
  variant = "brass",
  className = "",
  children,
  ...rest
}: { href: string; variant?: BtnVariant; className?: string; children: ReactNode } & Omit<ComponentProps<"a">, "href">) {
  const cls = `btn btn-${variant} ${className}`;
  // Phone/SMS/external links are plain anchors; internal routes use next/link for instant navigation.
  if (/^(tel:|sms:|https?:|mailto:)/.test(href)) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function QuoteButton({ variant = "brass", className = "", label = "Get a Free Quote" }: { variant?: BtnVariant; className?: string; label?: string }) {
  return (
    <ButtonLink href="/contact#quote" variant={variant} className={className}>
      {label}
      <ArrowIcon />
    </ButtonLink>
  );
}

export function CallButton({ variant = "ghost-light", className = "", short }: { variant?: BtnVariant; className?: string; short?: boolean }) {
  return (
    <ButtonLink href={site.phone.href} variant={variant} className={`tabular-nums ${className}`}>
      <PhoneIcon className="h-[1.1rem] w-[1.1rem]" />
      {short ? "Call" : `Call ${site.phone.display}`}
    </ButtonLink>
  );
}

export function TextLink({ dark, className = "" }: { dark?: boolean; className?: string }) {
  if (!site.phone.sms) return null;
  return (
    <a
      href={site.phone.sms}
      className={`hit inline-flex items-center gap-2 text-sm font-semibold underline decoration-1 underline-offset-4 ${
        dark ? "text-stone-300 decoration-stone-500 hover:text-linen" : "text-stone-600 decoration-stone-300 hover:text-ink"
      } ${className}`}
    >
      <ChatIcon className="h-4 w-4" />
      Prefer to text? Send us a message
    </a>
  );
}

export function ArrowLink({ href, className = "", children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <Link href={href} className={`link-arrow hit ${className}`}>
      {children}
      <ArrowIcon />
    </Link>
  );
}
