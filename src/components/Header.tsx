"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { CloseIcon, MenuIcon, PhoneIcon } from "./icons";
import { QuoteButton } from "./ui";
import Wordmark from "./Wordmark";

/**
 * Every page opens on a dark photo hero, so the header starts transparent with light text and turns
 * into a solid onyx bar once you scroll. Phones get the wordmark, a call button and a full-screen menu.
 */
export default function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes (React's "adjust state during render" pattern).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 text-linen transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          solid || open ? "bg-onyx-950/88 shadow-[0_1px_0_rgb(184_149_90/0.18)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        {/* Soft scrim so white text always reads over bright photos before the bar turns solid */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-onyx-950/60 to-transparent transition-opacity duration-500 ${
            solid || open ? "opacity-0" : "opacity-100"
          }`}
        />
        <div className="mx-auto flex h-[4.25rem] max-w-[78rem] items-center justify-between gap-4 px-5 sm:px-8 lg:h-[5rem] lg:px-10">
          <Link href="/" aria-label={`${site.name}, home`} className="hit -my-2 py-2">
            <Wordmark small />
          </Link>

          <nav aria-label="Main" className="max-lg:hidden">
            <ul className="flex items-center gap-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className={`relative px-3 py-2 text-[0.92rem] font-semibold transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:bg-brass after:transition-transform after:duration-300 ${
                      isActive(n.href) ? "text-linen after:scale-x-100" : "text-stone-300 after:scale-x-0 hover:text-linen hover:after:scale-x-100"
                    }`}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 lg:gap-5">
            <a
              href={site.phone.href}
              className="hidden items-center gap-2 text-[0.95rem] font-semibold tabular-nums text-linen transition-colors hover:text-brass-light xl:inline-flex"
            >
              <PhoneIcon className="h-[1.05rem] w-[1.05rem] text-brass" />
              {site.phone.display}
            </a>
            <QuoteButton className="!min-h-11 !px-5 !text-[0.88rem] max-lg:hidden" label="Free Quote" />

            {/* Phones/tablets */}
            <a
              href={site.phone.href}
              aria-label={`Call ${site.name} at ${site.phone.display}`}
              className="grid h-11 w-11 place-items-center rounded-full border border-linen/30 transition-colors hover:border-linen lg:hidden"
            >
              <PhoneIcon className="h-[1.15rem] w-[1.15rem]" />
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className="grid h-11 w-11 place-items-center rounded-full bg-linen/10 transition-colors hover:bg-linen/20 lg:hidden"
            >
              {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {open && <MobileMenu onClose={close} isActive={isActive} />}
    </>
  );
}

function MobileMenu({ onClose, isActive }: { onClose: () => void; isActive: (href: string) => boolean }) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const opener = document.activeElement as HTMLElement | null;
    panel.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Keep Tab inside the menu (the header's close button counts as inside).
      if (e.key === "Tab" && panel.current) {
        const header = document.querySelector("header");
        const els = [
          ...(header ? Array.from(header.querySelectorAll<HTMLElement>("a, button")).filter((el) => el.offsetParent) : []),
          ...Array.from(panel.current.querySelectorAll<HTMLElement>("a, button")),
        ];
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      opener?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  return (
    <div
      id="mobile-menu"
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="menu-in grain fixed inset-0 z-40 flex flex-col overflow-y-auto bg-onyx-950 px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[5.5rem] text-linen sm:px-8 lg:hidden"
    >
      <nav aria-label="Main">
        <ul className="border-t border-linen/10">
          {[{ href: "/", label: "Home" }, ...nav].map((n, i) => (
            <li key={n.href} className="menu-item-in border-b border-linen/10" style={{ ["--d" as string]: i }}>
              <Link
                href={n.href}
                onClick={onClose}
                aria-current={(n.href === "/" ? false : isActive(n.href)) ? "page" : undefined}
                className="group flex items-baseline justify-between py-3.5"
              >
                <span className="font-serif text-[2.1rem] font-medium leading-tight group-aria-[current=page]:italic group-aria-[current=page]:text-brass-light">
                  {n.label}
                </span>
                <span className="kicker text-stone-500">{`0${i + 1}`}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="menu-item-in mt-auto pt-8" style={{ ["--d" as string]: 8 }}>
        <div className="grid gap-3">
          <QuoteButton className="w-full" />
          <a href={site.phone.href} className="btn btn-ghost-light w-full tabular-nums">
            <PhoneIcon className="h-[1.1rem] w-[1.1rem]" />
            {`Call ${site.phone.display}`}
          </a>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-stone-400">
          {site.address.oneLine}
          <br />
          {`${site.hours.rows[0].days}, ${site.hours.rows[0].time}`}
        </p>
      </div>
    </div>
  );
}
