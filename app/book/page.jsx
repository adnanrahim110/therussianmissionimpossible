import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { purchaseCtas } from "@/lib/constants";
import { missionFileDownload, siteMeta } from "@/lib/content";

const bookBlocks = [
  {
    title: "MYTH OR OPERATION?",
    body: "This is about the Russian Armed Forces' daring maneuvers to free the Kursk Oblast's Sudzha city from Ukrainian occupation in 2025. While critics might question whether such feats truly took place, the soldiers who participated know the reality of their experience, one that has crossed the line between myth and truth.",
  },
  {
    title: "TUNNEL ROUTE BREAKDOWN",
    body: "The operation involved navigating the Urengoy-Pomary-Uzhgorod gas pipeline, a tunnel with barely enough room for soldiers to crawl through. Despite its narrowness and the toxic fumes, several hundred soldiers managed to travel through it, pushing past physical and mental exhaustion, before emerging behind enemy lines to conduct an assault.",
  },
  {
    title: "HISTORICAL CONTEXT",
    body: "Operation Stream 3.0 used the natural landscape in an unconventional way. Using the gas pipeline, a strategic natural feature, as a route for infiltration was a crucial part of the Russian military's strategy to defend its borders and retake occupied areas.",
  },
  {
    title: "BOOK FRAGMENTS",
    body: "Elena Sukhareva, a key figure in the Kursk Regional Hospital, shares the harrowing experiences of treating soldiers and civilians caught in the crossfire of the invasion. Her story captures both the human toll and the resilience shown by those enduring the war, providing glimpses into the personal sacrifices and the unbreakable spirit of the soldiers involved in the operation.",
  },
];

export const metadata = {
  title: `Operation Stream 3.0: The Russian Mission Impossible | ${siteMeta.title}`,
  description:
    "Operation Stream 3.0: The Russian Mission Impossible is a documentary narrative that reconstructs one of the most unusual military operations of the modern era.",
};

export default function BookPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-stone-800 pt-28 md:pt-36 lg:pt-40">
        <div aria-hidden="true" className="absolute inset-0 archive-map" />
        <div
          aria-hidden="true"
          className="absolute inset-0 grid-overlay-dark opacity-40"
        />
        <Container className="relative z-10 pb-16 md:pb-24">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="crosshair-marker scale-75 opacity-70" />
              <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-400">
                Book: https://therussianmissionimpossible.vercel.app/book
              </span>
            </div>
            <h1 className="mt-6 font-heading text-[clamp(2.5rem,6vw,5rem)] leading-[0.88] text-stone-50">
              Operation Stream 3.0: The Russian Mission Impossible
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-stone-200 md:text-xl">
              Operation Stream 3.0: The Russian Mission Impossible is a
              documentary narrative that reconstructs one of the most unusual
              military operations of the modern era.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-stone-300 md:text-lg">
              The book explores the events surrounding a mission carried out
              during the conflict in the Kursk border region and the dramatic
              circumstances that led to its execution. Through interviews,
              personal testimonies, and historical research, the authors
              present a vivid account of courage and endurance in extreme
              situations. The narrative blends factual documentation with
              deeply human stories, allowing readers to understand both the
              strategic and emotional dimensions of the events.
            </p>
            <p className="mt-6 max-w-3xl text-sm uppercase tracking-[0.28em] text-stone-500">
              Operation Stream 3.0 The Russian Mission Impossible A
              documentary narrative exploring courage, sacrifice, and the human
              experience of modern warfare.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" href={purchaseCtas.instructions.href}>
                {purchaseCtas.instructions.label}
              </Button>
              <Button
                size="lg"
                variant="outline"
                href={purchaseCtas.press.href}
                className="border-stone-700 text-stone-100 hover:bg-stone-800 hover:text-stone-50"
              >
                {purchaseCtas.press.label}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding relative border-b border-stone-800">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid-overlay-dark opacity-30"
        />
        <Container className="relative z-10 grid gap-6 lg:grid-cols-12">
          <div className="archive-shell rounded-2xl p-6 md:p-8 lg:col-span-7">
            <div
              aria-hidden="true"
              className="absolute inset-0 grid-overlay-dark opacity-30"
            />
            <div className="relative">
              <div className="space-y-6">
                {bookBlocks.map((block) => (
                  <div key={block.title} className="rounded-xl border border-stone-800 bg-stone-950/60 p-6">
                    <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-accent">
                      {block.title}
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-stone-200 md:text-lg">
                      {block.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:col-span-5">
            <div className="archive-shell rounded-2xl p-6 md:p-8">
              <div
                aria-hidden="true"
                className="absolute inset-0 grid-overlay-dark opacity-30"
              />
              <div className="relative">
                <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
                  Access notes
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex gap-3 text-sm leading-relaxed text-stone-300">
                    <span className="crosshair-marker mt-1 scale-75 opacity-50" />
                    <span>External purchase link pending</span>
                  </li>
                  <li className="flex gap-3 text-sm leading-relaxed text-stone-300">
                    <span className="crosshair-marker mt-1 scale-75 opacity-50" />
                    <span>The final storefront URL has not been supplied yet.</span>
                  </li>
                  <li className="flex gap-3 text-sm leading-relaxed text-stone-300">
                    <span className="crosshair-marker mt-1 scale-75 opacity-50" />
                    <span>Purchase inquiries continue through the contact desk.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="archive-shell rounded-2xl p-6 md:p-8">
              <div
                aria-hidden="true"
                className="absolute inset-0 grid-overlay-dark opacity-30"
              />
              <div className="relative">
                <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-accent">
                  Purchase status
                </p>
                <h2 className="mt-4 font-heading text-2xl leading-none text-stone-50 md:text-3xl">
                  External purchase link pending
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-stone-300">
                  The final storefront URL has not been supplied yet. This route
                  keeps the campaign tone intact while routing purchase
                  inquiries through the contact desk.
                </p>
              </div>
            </div>

            <div className="archive-shell rounded-2xl p-6 md:p-8">
              <div
                aria-hidden="true"
                className="absolute inset-0 grid-overlay-dark opacity-30"
              />
              <div className="relative">
                <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
                  Downloadable mission file
                </p>
                <h2 className="mt-4 font-heading text-2xl leading-none text-stone-50 md:text-3xl">
                  {missionFileDownload.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-stone-300">
                  {missionFileDownload.summary}
                </p>
                <p className="mt-4 font-ui text-[11px] uppercase tracking-[0.32em] text-accent">
                  Status: {missionFileDownload.status}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
