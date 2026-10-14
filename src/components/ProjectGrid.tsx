"use client";

import { useState } from "react";
import { materialLabel, roomLabel, type MaterialId, type Project, type Room } from "@/lib/site";
import ProjectCard from "./ProjectCard";

type Filter = "all" | Room | MaterialId;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All work" },
  ...(["kitchen", "bath", "commercial"] as Room[]).map((r) => ({ id: r as Filter, label: `${roomLabel[r]}${r === "commercial" ? "" : "s"}` })),
  ...(["granite", "marble", "quartz"] as MaterialId[]).map((m) => ({ id: m as Filter, label: materialLabel[m] })),
];

// Repeating rhythm of crops so the grid feels curated rather than uniform.
const aspects = ["aspect-[4/5]", "aspect-[4/3]", "aspect-[4/5]", "aspect-square", "aspect-[4/3]", "aspect-[4/5]"];

/**
 * Filterable project gallery. Filters are ordinary buttons (no page reload); the grid is CSS columns,
 * so it reads like a masonry wall on desktop and a single column of big photos on phones.
 */
export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = projects.filter((p) => filter === "all" || p.room === filter || p.material === filter);

  return (
    <>
      <div className="sticky top-[4.25rem] z-30 -mx-5 border-b border-stone-200 bg-linen/92 backdrop-blur-md sm:-mx-8 lg:top-[5rem] lg:-mx-10">
        <div role="group" aria-label="Filter projects" className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-3 sm:px-8 lg:px-10">
          {filters.map((f, i) => (
            <span key={f.id} className="contents">
              {i === 4 && <span aria-hidden="true" className="mx-1 w-px shrink-0 self-stretch bg-stone-300" />}
              <button
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-[0.9rem] font-semibold transition-colors ${
                  filter === f.id ? "border-onyx-900 bg-onyx-900 text-linen" : "border-stone-300 text-stone-600 hover:border-ink hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            </span>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">{`${shown.length} projects shown`}</p>

      <div className="mt-8 gap-5 sm:columns-2 lg:columns-3 lg:gap-6">
        {shown.map((p, i) => (
          <div key={p.slug} className="mb-5 break-inside-avoid lg:mb-6">
            <ProjectCard
              project={p}
              aspect={aspects[i % aspects.length]}
              sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
              titleClass="text-[1.6rem] sm:text-[1.7rem]"
            />
          </div>
        ))}
      </div>
      {shown.length === 0 && <p className="py-16 text-center text-stone-600">Nothing in that category yet. Try another filter.</p>}
    </>
  );
}
