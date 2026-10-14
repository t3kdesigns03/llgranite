import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import ProjectCard from "@/components/ProjectCard";
import QuoteCta from "@/components/QuoteCta";
import { ArrowLeftIcon } from "@/components/icons";
import { ArrowLink, CallButton, Container, Kicker, QuoteButton } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { materialLabel, materials, projects, roomLabel, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMeta({
    title: `${p.title}: ${materialLabel[p.material]} ${roomLabel[p.room]} Countertops`,
    description: `${p.summary} ${materialLabel[p.material]} ${roomLabel[p.room].toLowerCase()} countertops by ${site.name}, Statesville, NC.`,
    path: `/projects/${p.slug}`,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  const p = projects[index];
  const material = materials.find((m) => m.id === p.material)!;
  const related = projects.filter((x) => x.slug !== p.slug && (x.material === p.material || x.room === p.room)).slice(0, 3);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <PageHero
        image={p.images[0]}
        alt={`${p.title}: ${p.summary}`}
        kicker={`${materialLabel[p.material]} · ${roomLabel[p.room]}`}
        title={p.title}
        lede={p.summary}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <Link href="/projects" className="hit inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-ink">
            <ArrowLeftIcon />
            All projects
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <div data-reveal>
              <Kicker className="text-brass-deep">The project</Kicker>
              <p className="display mt-5 text-[1.9rem] leading-[1.15] text-ink sm:text-[2.4rem]">{p.story}</p>
            </div>
            <aside className="rounded-[1.25rem] border border-stone-200 bg-paper p-6 sm:p-8" data-reveal style={{ ["--d" as string]: 1 }}>
              <dl className="divide-y divide-stone-200">
                {[
                  ["Material", materialLabel[p.material]],
                  ["Space", roomLabel[p.room]],
                  ["Scope", p.scope],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[6rem_1fr] gap-4 py-4 first:pt-0 last:pb-0">
                    <dt className="kicker pt-1 text-[0.62rem] text-stone-500">{k}</dt>
                    <dd className="font-semibold text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 border-t border-stone-200 pt-6 text-[0.95rem] leading-relaxed text-stone-600">{material.line}</p>
              <ArrowLink href={`/materials#${material.id}`} className="mt-4 text-sm text-ink">
                {`About ${material.name.toLowerCase()}`}
              </ArrowLink>
            </aside>
          </div>

          {p.images.length > 1 && (
            <div className="mt-16 grid gap-4 sm:grid-cols-2 sm:gap-6">
              {p.images.slice(1).map((img, i) => (
                <div
                  key={img}
                  data-reveal
                  className={`overflow-hidden rounded-[1.25rem] ${p.images.length === 2 || (i === 0 && p.images.length % 2 === 0) ? "sm:col-span-2" : ""}`}
                >
                  <Photo name={img} alt={`${p.title}, view ${i + 2}`} sizes="(min-width: 640px) 90vw, 100vw" />
                </div>
              ))}
            </div>
          )}

          {site.placeholderPhotos && <p className="mt-8 text-xs text-stone-500">Representative photos shown while L&amp;L&apos;s project photography is added.</p>}

          <div className="mt-16 flex flex-col gap-3 rounded-[1.25rem] bg-onyx-900 p-6 text-linen sm:flex-row sm:items-center sm:justify-between sm:p-8" data-hide-sticky>
            <p className="display text-[1.7rem] sm:text-3xl">
              Want something <em className="text-brass-light">like this?</em>
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <QuoteButton />
              <CallButton short />
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="border-t border-stone-200 bg-paper py-16 sm:py-24">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <h2 className="display text-[2.2rem] text-ink sm:text-5xl">More like this</h2>
              <ArrowLink href={`/projects/${next.slug}`} className="shrink-0 text-sm text-ink max-sm:hidden">
                Next project
              </ArrowLink>
            </div>
            <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0">
              {related.map((r) => (
                <div key={r.slug} className="w-[80%] shrink-0 snap-start sm:w-auto">
                  <ProjectCard project={r} sizes="(min-width: 640px) 31vw, 80vw" titleClass="text-[1.5rem]" />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <QuoteCta />
    </>
  );
}
