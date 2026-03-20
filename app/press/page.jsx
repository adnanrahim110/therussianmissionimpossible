import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { missionFileDownload, pressAssets, siteMeta } from "@/lib/content";

const assetLinks = {
  "author-bios": "/authors",
  "book-summary": "/book",
  "contact-sheet": "/contact",
};

export const metadata = {
  title: `Press Desk | ${siteMeta.title}`,
  description:
    "Media-facing archive route for press assets, author bios, summary material, and contact information.",
};

export default function PressPage() {
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
                Media operations
              </span>
            </div>
            <h1 className="mt-6 font-heading text-[clamp(2.5rem,6vw,5rem)] leading-[0.88] text-stone-50">
              Press Desk
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-stone-200 md:text-xl">
              This route is designed for journalists, interview requests,
              downloadable materials, and the shareable mission-file asset the
              client plans to provide.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding relative border-b border-stone-800">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid-overlay-dark opacity-30"
        />
        <Container className="relative z-10 grid gap-6 lg:grid-cols-12">
          <div className="archive-shell rounded-2xl p-6 md:p-8 lg:col-span-5">
            <div
              aria-hidden="true"
              className="absolute inset-0 grid-overlay-dark opacity-30"
            />
            <div className="relative">
              <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
                Downloadable mission file
              </p>
              <h2 className="mt-4 font-heading text-3xl leading-[0.9] text-stone-50 sm:text-4xl md:text-5xl">
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

          <div className="grid gap-4 lg:col-span-7 md:grid-cols-2">
            {pressAssets.map((asset) => {
              const href = assetLinks[asset.id];
              return (
                <div key={asset.id} className="archive-shell rounded-2xl p-6">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 grid-overlay-dark opacity-30"
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
                        {asset.type}
                      </span>
                      <span
                        className={`rounded-full border px-2 py-1 font-ui text-[10px] uppercase tracking-[0.24em] ${
                          asset.status === "ready"
                            ? "border-olive-700 text-olive-200"
                            : "border-stone-700 text-stone-400"
                        }`}
                      >
                        {asset.status}
                      </span>
                    </div>
                    <h2 className="mt-5 font-heading text-2xl leading-none text-stone-50 md:text-3xl">
                      {asset.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-stone-300">
                      {asset.description}
                    </p>
                    <div className="mt-6">
                      {href ? (
                        <Button href={href}>Open Asset Route</Button>
                      ) : (
                        <span className="inline-flex rounded-lg border border-stone-700 px-4 py-2 font-ui text-[11px] uppercase tracking-[0.28em] text-stone-400">
                          Awaiting client file
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
