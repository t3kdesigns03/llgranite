import PageHero from "@/components/PageHero";
import ProjectGrid from "@/components/ProjectGrid";
import QuoteCta from "@/components/QuoteCta";
import { Container } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { projects, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Projects: Granite, Marble & Quartz Countertop Gallery",
  description: `Kitchens, baths and commercial countertops fabricated and installed by ${site.name} in Statesville, NC. Browse granite, marble and quartz projects.`,
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        image="waterfall-island"
        alt="Kitchen island with a dramatic veined stone waterfall end and a matching slab wall"
        kicker="Our work"
        title={
          <>
            Stone that <em className="text-brass-light">makes the room.</em>
          </>
        }
        lede="A look at kitchens, baths and commercial spaces finished in granite, marble and quartz. Tap any project for the details."
      />
      <section className="pb-20 sm:pb-28">
        <Container>
          <ProjectGrid projects={projects} />
          {site.placeholderPhotos && (
            <p className="mt-10 text-center text-xs text-stone-500">Representative photos shown while L&amp;L&apos;s project photography is added.</p>
          )}
        </Container>
      </section>
      <QuoteCta
        kicker="Start your project"
        title={
          <>
            Seen something <em>you love?</em>
          </>
        }
        text="Tell us which project caught your eye and we'll help you find a slab with the same feel, in your budget."
      />
    </>
  );
}
