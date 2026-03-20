import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { purchaseCtas } from "@/lib/constants";
import { contactDesk, siteMeta } from "@/lib/content";

export const metadata = {
  title: `Support and Press Desk | ${siteMeta.title}`,
  description:
    "Direct contact route for press, rights, purchase-link requests, and archive support.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-stone-800 pt-28 md:pt-36 lg:pt-40">
        <div aria-hidden="true" className="absolute inset-0 archive-map opacity-80" />
        <div aria-hidden="true" className="absolute inset-0 grid-overlay-dark opacity-35" />
        <Container className="relative z-10 pb-16 md:pb-24">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="crosshair-marker scale-75 opacity-70" />
              <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-400">
                Direct contact route
              </span>
            </div>
            <h1 className="mt-6 font-heading text-[clamp(2.5rem,6vw,5rem)] leading-[0.88] text-stone-50">
              {contactDesk.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-stone-200 md:text-xl">
              {contactDesk.summary}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={`mailto:${siteMeta.contactEmail}`}>Email the Desk</Button>
              <Button
                href={purchaseCtas.press.href}
                variant="outline"
                className="border-stone-700 text-stone-100 hover:bg-stone-800 hover:text-stone-50"
              >
                {purchaseCtas.press.label}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding relative">
        <div aria-hidden="true" className="absolute inset-0 grid-overlay-dark opacity-30" />
        <Container className="relative z-10 grid gap-6 lg:grid-cols-12">
          <div className="archive-shell rounded-2xl p-6 md:p-8 lg:col-span-7">
            <div aria-hidden="true" className="absolute inset-0 grid-overlay-dark opacity-30" />
            <div className="relative">
              <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
                Request channels
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {contactDesk.channels.map((channel) => (
                  <div
                    key={channel.label}
                    className="rounded-xl border border-stone-800 bg-stone-950/60 p-4"
                  >
                    <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
                      {channel.label}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-stone-300">
                      {channel.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:col-span-5">
            <div className="archive-shell rounded-2xl p-6 md:p-8">
              <div aria-hidden="true" className="absolute inset-0 grid-overlay-dark opacity-30" />
              <div className="relative">
                <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
                  Email
                </p>
                <a
                  href={`mailto:${siteMeta.contactEmail}`}
                  className="mt-4 block font-heading text-2xl leading-none text-stone-50 transition-colors hover:text-crimson-300 md:text-3xl"
                >
                  {siteMeta.contactEmail}
                </a>
              </div>
            </div>

            <div className="archive-shell rounded-2xl p-6 md:p-8">
              <div aria-hidden="true" className="absolute inset-0 grid-overlay-dark opacity-30" />
              <div className="relative">
                <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
                  Address
                </p>
                <div className="mt-4 space-y-2 text-sm leading-relaxed text-stone-300">
                  {siteMeta.contactAddress.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="archive-shell rounded-2xl p-6 md:p-8">
              <div aria-hidden="true" className="absolute inset-0 grid-overlay-dark opacity-30" />
              <div className="relative">
                <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-crimson-300">
                  Submission policy
                </p>
                <p className="mt-4 text-sm leading-relaxed text-stone-300">
                  The old simulated contact form has been removed. This route now points directly to real contact methods until a real submission endpoint is configured.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
