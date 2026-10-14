import Link from "next/link";
import { materialLabel, roomLabel, type Project } from "@/lib/site";
import { ArrowIcon } from "./icons";
import Photo from "./Photo";

/** Big photo card with the title over a soft gradient. `aspect` controls the crop. */
export default function ProjectCard({
  project,
  sizes,
  aspect = "aspect-[4/5]",
  className = "",
  titleClass = "text-[1.75rem] sm:text-3xl",
}: {
  project: Project;
  sizes: string;
  aspect?: string;
  className?: string;
  titleClass?: string;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`zoom-on-hover group relative isolate block overflow-hidden rounded-[1.25rem] bg-onyx-900 text-linen ${aspect} ${className}`}
    >
      <Photo name={project.images[0]} alt={`${project.title}: ${project.summary}`} sizes={sizes} fill className="-z-20" />
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-onyx-950/90 via-onyx-950/15 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
        <span>
          <span className="kicker text-[0.62rem] text-brass-light">{`${materialLabel[project.material]} · ${roomLabel[project.room]}`}</span>
          <span className={`display mt-2 block ${titleClass}`}>{project.title}</span>
        </span>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-linen/30 transition-colors duration-300 group-hover:border-brass group-hover:bg-brass group-hover:text-onyx-950">
          <ArrowIcon />
        </span>
      </span>
    </Link>
  );
}
