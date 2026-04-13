import { Container } from "@/components/ui/Container";
import { characterDossiers, siteMeta } from "@/lib/content";
import Link from "next/link";
import { notFound } from "next/navigation";

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function generateStaticParams() {
  return characterDossiers.map((d) => ({
    callsign: slugify(d.callsign),
  }));
}

export async function generateMetadata({ params }) {
  const { callsign } = await params;
  const dossier = characterDossiers.find(
    (d) => slugify(d.callsign) === callsign,
  );
  if (!dossier) return {};

  const title = `"${dossier.callsign}" — ${dossier.archetype} | ${siteMeta.title}`;
  const description = `Declassified dossier: ${dossier.callsign} (${dossier.archetype}). ${dossier.summary}`;

  return {
    title,
    description,
    alternates: { canonical: `/bio/${callsign}` },
    openGraph: {
      title,
      description,
      type: "article",
      images: dossier.photo
        ? [{ url: dossier.photo, alt: dossier.callsign }]
        : [{ url: "/imgs/logo-f.png", alt: dossier.callsign }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: dossier.photo ? [dossier.photo] : ["/imgs/logo-f.png"],
    },
  };
}

export default async function DossierDetailPage({ params }) {
  const { callsign } = await params;
  const dossier = characterDossiers.find(
    (d) => slugify(d.callsign) === callsign,
  );

  if (!dossier) notFound();

  const index = characterDossiers.indexOf(dossier);
  const fileNum = String(index + 1).padStart(3, "0");
  const prevDossier = index > 0 ? characterDossiers[index - 1] : null;
  const nextDossier =
    index < characterDossiers.length - 1 ? characterDossiers[index + 1] : null;

  return (
    <section className="section-tone-obsidian relative min-h-screen overflow-hidden border-b border-stone-800 pt-28 pb-14 md:pt-36 md:pb-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-dark opacity-30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grain-overlay pointer-events-none opacity-45"
      />

      <Container className="relative z-10">
        <nav className="mb-8 flex items-center gap-2">
          <Link
            href="/bio"
            className="font-ui text-[11px] uppercase tracking-[0.2em] text-stone-400 transition-colors hover:text-accent"
          >
            Personnel Dossiers
          </Link>
          <span className="text-stone-600">/</span>
          <span className="font-ui text-[11px] uppercase tracking-[0.2em] text-stone-500">
            {dossier.callsign}
          </span>
        </nav>

        <div className="dossier-card dossier-corner-mark rounded-lg">
          <div className="dossier-scanlines relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800/60 px-5 py-3 sm:px-8">
              <div className="flex items-center gap-4">
                <span className="font-ui text-[10px] uppercase tracking-[0.3em] text-stone-500">
                  Dossier File {fileNum}
                </span>
                <span className="dossier-stamp-alt">Operation Stream 3.0</span>
              </div>
              <span className="dossier-stamp">Declassified</span>
            </div>

            <div className="p-5 sm:p-8">
              <div className="flex flex-col gap-8 lg:flex-row">
                <div className="shrink-0 self-start">
                  {dossier.photo ? (
                    <div className="relative max-w-xs overflow-hidden rounded border border-stone-700/60 sm:max-w-sm lg:max-w-md">
                      <img
                        src={dossier.photo}
                        alt={dossier.callsign}
                        className="block h-auto w-full"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-stone-950/30 to-transparent" />
                      <div className="absolute top-2 left-2 h-4 w-4 border-t border-l border-accent/40" />
                      <div className="absolute top-2 right-2 h-4 w-4 border-t border-r border-accent/40" />
                      <div className="absolute bottom-2 left-2 h-4 w-4 border-b border-l border-accent/40" />
                      <div className="absolute bottom-2 right-2 h-4 w-4 border-b border-r border-accent/40" />
                    </div>
                  ) : (
                    <div className="flex h-72 w-56 items-center justify-center rounded border border-stone-700/40 bg-stone-900/50 sm:h-80 sm:w-64">
                      <div className="text-center">
                        <svg
                          className="mx-auto h-16 w-16 text-stone-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="0.8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0"
                          />
                        </svg>
                        <span className="mt-3 block font-ui text-[9px] uppercase tracking-[0.25em] text-stone-600">
                          Photo Classified
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h1 className="font-heading text-5xl leading-none text-stone-50 sm:text-6xl">
                    &ldquo;{dossier.callsign}&rdquo;
                  </h1>

                  <div className="mt-3 flex items-center gap-3">
                    <span className="h-px w-10 bg-accent/50" />
                    <span className="font-ui text-xs uppercase tracking-[0.25em] text-accent/90">
                      {dossier.archetype}
                    </span>
                  </div>

                  <div className="dossier-divider my-5" />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <span className="dossier-field-label">Designation</span>
                      <p className="mt-1 text-sm text-stone-200">
                        {dossier.role}
                      </p>
                    </div>
                    <div>
                      <span className="dossier-field-label">
                        Classification
                      </span>
                      <p className="mt-1 text-sm text-stone-200">
                        Active Personnel File
                      </p>
                    </div>
                    <div>
                      <span className="dossier-field-label">Operation</span>
                      <p className="mt-1 text-sm text-stone-200">Stream 3.0</p>
                    </div>
                    <div>
                      <span className="dossier-field-label">Sector</span>
                      <p className="mt-1 text-sm text-stone-200">
                        Sudzha / Kursk Oblast
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded border border-accent/15 bg-accent/3 px-5 py-4">
                    <span className="dossier-field-label">
                      Operational Mentality
                    </span>
                    <p className="mt-2 font-heading text-xl leading-tight text-stone-100 sm:text-2xl">
                      &ldquo;{dossier.mentality}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <div className="dossier-divider my-8" />

              <div>
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/50" />
                  <span className="dossier-field-label">Subject Profile</span>
                </div>
                <p className="mt-3 text-base leading-relaxed text-stone-300">
                  {dossier.summary}
                </p>
              </div>

              <div className="dossier-divider my-8" />

              <div>
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/50" />
                  <span className="dossier-field-label">
                    Identified Characteristics
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {dossier.traits.map((trait, i) => (
                    <div
                      key={trait}
                      className="flex items-center gap-3 rounded border border-stone-800/40 bg-stone-900/30 px-4 py-3"
                    >
                      <span className="font-ui text-[10px] text-accent/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-stone-300">{trait}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dossier-divider my-8" />

              <div>
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/50" />
                  <span className="dossier-field-label">
                    Behavioral Analysis
                  </span>
                </div>
                <p className="mt-3 text-base leading-relaxed text-stone-400 italic">
                  {dossier.analysis}
                </p>
              </div>

              <div className="dossier-divider my-8" />
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="dossier-field-label">Additional Notes</span>
                  <span className="dossier-stamp-alt text-[8px]">Redacted</span>
                </div>
                <div className="redacted-line w-3/4" />
                <div className="redacted-line w-1/2" />
                <div className="redacted-line w-5/8" />
              </div>

              <div className="dossier-divider mt-8 mb-4" />
              <div className="flex items-center justify-between">
                <span className="font-ui text-[9px] uppercase tracking-[0.25em] text-stone-500">
                  End of Dossier File {fileNum}
                </span>
                <Link
                  href="/bio"
                  className="font-ui text-[11px] uppercase tracking-[0.2em] text-stone-400 transition-colors hover:text-accent"
                >
                  &larr; All Dossiers
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          {prevDossier ? (
            <Link
              href={`/bio/${slugify(prevDossier.callsign)}`}
              className="group rounded-lg border border-stone-800/40 bg-stone-950/50 p-4 transition-all duration-300 hover:border-stone-700/60 hover:bg-stone-900/30"
            >
              <span className="font-ui text-[9px] uppercase tracking-[0.2em] text-stone-500">
                &larr; Previous File
              </span>
              <p className="mt-1 font-heading text-lg text-stone-300 transition-colors group-hover:text-stone-100">
                &ldquo;{prevDossier.callsign}&rdquo;
              </p>
              <span className="font-ui text-[10px] uppercase tracking-[0.15em] text-stone-500">
                {prevDossier.archetype}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextDossier ? (
            <Link
              href={`/bio/${slugify(nextDossier.callsign)}`}
              className="group rounded-lg border border-stone-800/40 bg-stone-950/50 p-4 text-right transition-all duration-300 hover:border-stone-700/60 hover:bg-stone-900/30"
            >
              <span className="font-ui text-[9px] uppercase tracking-[0.2em] text-stone-500">
                Next File &rarr;
              </span>
              <p className="mt-1 font-heading text-lg text-stone-300 transition-colors group-hover:text-stone-100">
                &ldquo;{nextDossier.callsign}&rdquo;
              </p>
              <span className="font-ui text-[10px] uppercase tracking-[0.15em] text-stone-500">
                {nextDossier.archetype}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </Container>
    </section>
  );
}
