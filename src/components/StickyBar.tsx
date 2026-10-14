"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { ArrowIcon, PhoneIcon } from "./icons";

/**
 * Phones/tablets: a slim Call + Free Quote bar pinned to the bottom. It waits until you've scrolled
 * past the hero (which already has both buttons) and gets out of the way whenever a big call to action
 * or the quote form itself is on screen (anything marked data-hide-sticky).
 */
export default function StickyBar() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setBlocked(visible.size > 0);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll("[data-hide-sticky]").forEach((el) => io.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [pathname]);

  const show = pastHero && !blocked;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] lg:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[120%] opacity-0"
      }`}
      aria-hidden={!show || undefined}
    >
      <div className="mx-auto flex max-w-md gap-2 rounded-full border border-linen/10 bg-onyx-950/92 p-1.5 shadow-[0_18px_40px_-12px_rgb(0_0_0/0.55)] backdrop-blur-md">
        <a
          href={site.phone.href}
          tabIndex={show ? undefined : -1}
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full font-semibold text-linen"
        >
          <PhoneIcon className="h-[1.1rem] w-[1.1rem] text-brass" />
          Call
        </a>
        <Link
          href="/contact#quote"
          tabIndex={show ? undefined : -1}
          className="btn btn-brass !min-h-12 flex-[1.6] !px-4"
        >
          Free Quote
          <ArrowIcon />
        </Link>
      </div>
    </div>
  );
}
