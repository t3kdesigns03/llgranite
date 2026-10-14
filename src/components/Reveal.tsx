"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Gentle scroll reveals. Anything marked `data-reveal` that starts below the fold gets `data-pending`
 * (hidden by CSS) and rises in as it enters the screen. Only this script sets or clears `data-pending`,
 * so re-renders can't re-hide anything. With reduced motion or without JS, nothing is ever hidden.
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.removeAttribute("data-pending");
          io.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.setAttribute("data-pending", "");
      io.observe(el);
    });
    return () => {
      io.disconnect();
      document.querySelectorAll("[data-pending]").forEach((el) => el.removeAttribute("data-pending"));
    };
  }, [pathname]);

  return null;
}
