"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/lib/site";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const fmt = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${((h + 11) % 12) + 1}${m ? `:${String(m).padStart(2, "0")}` : ""}${h < 12 ? "am" : "pm"}`;
};

/** "Open now · until 4pm" / "Closed · opens Mon 9am", in Statesville time. Computed in the browser only. */
function status() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.hours.tz,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = DAYS.indexOf(get("weekday"));
  const now = Number(get("hour")) * 60 + Number(get("minute"));
  const { open, close, workdays } = site.hours;
  const isWorkday = (workdays as readonly number[]).includes(day);

  if (isWorkday && now >= open && now < close) return { open: true, text: `Open now · until ${fmt(close)}` };
  for (let i = 0; i < 7; i++) {
    const d = (day + i) % 7;
    if (!(workdays as readonly number[]).includes(d)) continue;
    if (i === 0 && now >= open) continue;
    return { open: false, text: `Closed · opens ${i === 0 ? "today" : i === 1 ? "tomorrow" : DAYS[d]} ${fmt(open)}` };
  }
  return { open: false, text: "Closed" };
}

const subscribe = () => () => {};

export default function OpenStatus({ className = "" }: { className?: string }) {
  // Server render (and the first client render) shows nothing; the browser fills in the live status.
  const s = useSyncExternalStore(subscribe, () => JSON.stringify(status()), () => "");
  if (!s) return <span className={`invisible ${className}`}>{"Checking hours"}</span>;
  const { open, text } = JSON.parse(s) as { open: boolean; text: string };
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${open ? "pulse-dot bg-[#6ea878]" : "bg-stone-400"}`} />
      {text}
    </span>
  );
}
