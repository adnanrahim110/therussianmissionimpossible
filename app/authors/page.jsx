import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { authors, authorsIntro, siteMeta } from "@/lib/content";

export const metadata = {
  title: `${authorsIntro.title} | ${siteMeta.title}`,
  description: authorsIntro.body,
};

export default function AuthorsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-stone-800 pt-28 md:pt-36 lg:pt-40">
        <div
          aria-hidden="true"
          className="absolute inset-0 archive-map opacity-80"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 grid-overlay-dark opacity-35"
        />
        <Container className="relative z-10 pb-16 md:pb-24">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="crosshair-marker scale-75 opacity-70" />
              <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-400">
                {authorsIntro.eyebrow}
              </span>
            </div>
            <h1 className="mt-6 font-heading text-[clamp(2.5rem,6vw,5rem)] leading-[0.88] text-stone-50">
              {authorsIntro.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-stone-200 md:text-xl">
              {authorsIntro.body}
            </p>
          </div>
        </Container>
      </section>

      <div className="section-padding relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid-overlay-dark opacity-30"
        />
        <Container className="relative z-10 space-y-6">
          {authors.map((author) => (
            <ScrollReveal
              key={author.name}
              className="archive-shell overflow-hidden rounded-2xl"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 grid-overlay-dark opacity-30"
              />
              <div className="relative p-6 md:p-8">
                <h2 className="font-heading text-3xl leading-[0.9] text-stone-50 sm:text-4xl md:text-5xl">
                  {author.name}
                </h2>
                <p className="mt-6 text-base leading-relaxed text-stone-200 md:text-lg">
                  {author.bio}
                </p>
                <p className="mt-6 border-l border-accent/60 pl-4 text-base leading-relaxed text-stone-100">
                  {author.quote}
                </p>
              </div>
            </ScrollReveal>
          ))}

          <div className="flex flex-wrap gap-4 pt-4">
            <Button href="/book">Access the Full Story</Button>
            <Button
              href="/press"
              variant="outline"
              className="border-stone-700 text-stone-100 hover:bg-stone-800 hover:text-stone-50"
            >
              Open Press Desk
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}
