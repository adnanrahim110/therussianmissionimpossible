import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { purchaseCtas } from "@/lib/constants";
import { missionFileDownload, purchasePage, siteMeta } from "@/lib/content";

export const metadata = {
  title: `${purchasePage.title} | ${siteMeta.title}`,
  description:
    "Unlock the full story through the archive's final access route, with synopsis, excerpt, and guided next steps.",
};

export default function BookPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-stone-800 pt-32 md:pt-40">
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
                {purchasePage.label}
              </span>
            </div>
            <h1 className="mt-6 font-heading text-[clamp(4.5rem,11vw,8rem)] leading-[0.82] text-stone-50">
              {purchasePage.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-stone-200 md:text-xl">
              {purchasePage.summary}
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
          <div className="archive-shell p-6 md:p-8 lg:col-span-7">
            <div
              aria-hidden="true"
              className="absolute inset-0 grid-overlay-dark opacity-30"
            />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="crosshair-marker scale-75 opacity-70" />
                <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
                  Story synopsis
                </span>
              </div>
              <p className="mt-6 text-base leading-relaxed text-stone-200 md:text-lg">
                {purchasePage.synopsis}
              </p>
              <div className="mt-8 rounded-[2px] border border-stone-800 bg-stone-950/60 p-6">
                <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
                  Select excerpt
                </p>
                <p className="mt-4 text-lg leading-relaxed text-stone-100">
                  {purchasePage.excerpt}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:col-span-5">
            <div className="archive-shell p-6 md:p-8">
              <div
                aria-hidden="true"
                className="absolute inset-0 grid-overlay-dark opacity-30"
              />
              <div className="relative">
                <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
                  Access notes
                </p>
                <ul className="mt-6 space-y-3">
                  {purchasePage.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm leading-relaxed text-stone-300"
                    >
                      <span className="crosshair-marker mt-1 scale-75 opacity-50" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="archive-shell p-6 md:p-8">
              <div
                aria-hidden="true"
                className="absolute inset-0 grid-overlay-dark opacity-30"
              />
              <div className="relative">
                <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
                  Purchase status
                </p>
                <h2 className="mt-4 font-heading text-4xl leading-none text-stone-50">
                  External purchase link pending
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-stone-300">
                  The final storefront URL has not been supplied yet. This route
                  keeps the campaign tone intact while routing purchase
                  inquiries through the contact desk.
                </p>
              </div>
            </div>

            <div className="archive-shell p-6 md:p-8">
              <div
                aria-hidden="true"
                className="absolute inset-0 grid-overlay-dark opacity-30"
              />
              <div className="relative">
                <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
                  Downloadable mission file
                </p>
                <h2 className="mt-4 font-heading text-4xl leading-none text-stone-50">
                  {missionFileDownload.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-stone-300">
                  {missionFileDownload.summary}
                </p>
                <p className="mt-4 font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
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
