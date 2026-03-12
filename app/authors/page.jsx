import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { authors, siteMeta } from "@/lib/content";

export const metadata = {
  title: `Author Dossiers | ${siteMeta.title}`,
  description:
    "Extended author dossier views for the writers behind The Russian Mission Impossible archive campaign.",
};

export default function AuthorsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-stone-800 pt-32 md:pt-40">
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
                Extended archive profiles
              </span>
            </div>
            <h1 className="mt-6 font-heading text-[clamp(4.5rem,11vw,8rem)] leading-[0.82] text-stone-50">
              The Authors
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-stone-200 md:text-xl">
              The homepage keeps authors brief. This route expands each profile
              into a dossier entry that can absorb the client&apos;s final text
              and photos later without changing the information architecture.
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
          {authors.map((author, index) => {
            const initials = author.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <section
                key={author.name}
                className="archive-shell overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 grid-overlay-dark opacity-30"
                />
                <div className="relative grid gap-6 p-6 md:p-8 lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    <div className="flex h-full min-h-80 items-end rounded-[2px] border border-stone-800 bg-stone-950/70 p-6">
                      <div>
                        <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
                          Portrait placeholder
                        </p>
                        <p className="mt-4 font-heading text-[clamp(5rem,10vw,8rem)] leading-none text-stone-300/80">
                          {initials}
                        </p>
                        <p className="mt-4 font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
                          Status: {author.status}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-8">
                    <div className="flex items-center justify-between gap-6">
                      <div>
                        <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
                          {author.role}
                        </p>
                        <h2 className="mt-4 font-heading text-5xl leading-[0.9] text-stone-50 md:text-6xl">
                          {author.name}
                        </h2>
                      </div>
                      <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
                        A-{String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-6 text-base leading-relaxed text-stone-200 md:text-lg">
                      {author.bio}
                    </p>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <div className="rounded-[2px] border border-stone-800 bg-stone-950/60 p-6">
                        <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
                          Contribution
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-stone-300">
                          {author.contribution}
                        </p>
                      </div>

                      <div className="rounded-[2px] border border-stone-800 bg-stone-950/60 p-6">
                        <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
                          Quote
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-stone-200">
                          {author.quote}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}

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
