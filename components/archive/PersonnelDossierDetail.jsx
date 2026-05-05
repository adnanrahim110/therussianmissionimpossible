import { Button } from "@/components/ui/Button";
import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import { ArchivePanel } from "@/components/ui/archive/ArchivePanel";
import { siteMeta } from "@/lib/archive-data";

const gridTexture = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)",
  backgroundSize: "32px 32px",
};

const scanlineTexture = {
  backgroundImage:
    "repeating-linear-gradient(0deg, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 4px)",
};

export function PersonnelDossierDetail({ dossier }) {
  const traits = dossier.traits ?? [];

  return (
    <ArchivePageShell
      breadcrumbs={[
        { label: "Archive", href: "/" },
        { label: "Personnel", href: "/personnel" },
        { label: "Dossiers", href: "/personnel/dossiers" },
        { label: dossier.callsign },
      ]}
      iconKey="dossiers"
      eyebrow={dossier.fileCode}
      title={`"${dossier.callsign}"`}
      summary={dossier.summary}
      detail={`${dossier.archetype} / ${dossier.role}`}
      actions={[
        {
          label: "Back to Dossiers",
          href: "/personnel/dossiers",
          variant: "outline",
        },
        { label: "Contact Desk", href: "/contact", variant: "ghost" },
      ]}
      aside={
        <ArchivePanel
          eyebrow="File Status"
          iconKey="dossiers"
          title="Declassified"
          summary={dossier.role}
        >
          <div className="space-y-2 font-ui text-[11px] uppercase tracking-[0.28em]">
            <div className="flex items-center justify-between gap-3 text-stone-400">
              <span>Cabinet</span>
              <span className="text-stone-200">03 / Personnel</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-stone-400">
              <span>Reference</span>
              <span className="text-rose-300">{dossier.fileCode}</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-stone-400">
              <span>Source</span>
              <span className="text-stone-200">{siteMeta.shortTitle}</span>
            </div>
          </div>
        </ArchivePanel>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <article className="group/file relative overflow-hidden border border-white/10 bg-black/70 transition-[border-color] duration-500 hover:border-white/25">
          {dossier.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={dossier.photo}
              alt={dossier.callsign}
              draggable={false}
              className="block h-auto w-full select-none object-cover saturate-[0.92] transition-[filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/file:saturate-100"
            />
          ) : (
            <div className="flex h-[28rem] w-full items-center justify-center bg-[#0a0a0c] font-ui text-[11px] uppercase tracking-[0.32em] text-stone-500">
              Photo classified
            </div>
          )}

          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-1 opacity-[0.05] mix-blend-overlay"
            style={gridTexture}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-1 opacity-60 mix-blend-overlay"
            style={scanlineTexture}
          />

          <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] flex items-start justify-between gap-3 bg-linear-to-b from-black/95 via-black/55 to-transparent px-5 pb-14 pt-4 font-ui text-[10px] uppercase tracking-[0.32em]">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-400 shadow-[0_0_10px_rgba(242,13,13,0.7)]" />
              <span className="text-rose-200">{dossier.fileCode}</span>
            </span>
            <span className="rounded-[3px] border border-rose-400/45 px-2 py-1 font-ui text-[9px] tracking-[0.4em] text-rose-200">
              Declassified
            </span>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] bg-linear-to-t from-black via-black/85 to-transparent px-5 pb-5 pt-16 text-stone-100">
            <p className="font-ui text-[10px] uppercase tracking-[0.32em] text-rose-300/85">
              {dossier.archetype}
            </p>
            <h2 className="mt-1 font-heading text-3xl font-bold tracking-wide text-white md:text-4xl">
              {dossier.callsign}
            </h2>
            <p className="mt-2 font-ui text-[10px] uppercase tracking-[0.32em] text-stone-400">
              Role · <span className="text-stone-200">{dossier.role}</span>
            </p>
          </div>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-2 top-2 z-[3] h-3 w-3 border-l border-t border-white/40"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-2 top-2 z-[3] h-3 w-3 border-r border-t border-white/40"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 left-2 z-[3] h-3 w-3 border-b border-l border-white/40"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 right-2 z-[3] h-3 w-3 border-b border-r border-white/40"
          />
        </article>

        <div className="flex flex-col gap-5">
          <ArchivePanel
            eyebrow="Archetype"
            iconKey="personnel"
            title={dossier.archetype}
            summary={dossier.analysis}
          />
          <ArchivePanel eyebrow="Mentality" iconKey="witness">
            <blockquote className="relative pl-4 font-heading text-lg leading-relaxed text-stone-100 md:text-xl">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1 h-[calc(100%-0.25rem)] w-px bg-rose-400/55"
              />
              &ldquo;{dossier.mentality}&rdquo;
            </blockquote>
          </ArchivePanel>
          {traits.length > 0 ? (
            <ArchivePanel eyebrow="Behavior Profile" iconKey="authors">
              <ul className="flex flex-wrap gap-2">
                {traits.map((trait, index) => (
                  <li
                    key={trait}
                    className="inline-flex items-center gap-2 rounded-[3px] border border-white/10 bg-white/[0.03] px-3 py-2 font-ui text-[11px] uppercase tracking-[0.22em] text-stone-200 transition-colors duration-300 hover:border-rose-400/40 hover:text-rose-100"
                  >
                    <span className="font-ui text-[9px] text-stone-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {trait}
                  </li>
                ))}
              </ul>
            </ArchivePanel>
          ) : null}
        </div>
      </div>

      <ArchivePanel
        eyebrow="Archive Routing"
        iconKey="route"
        title="Continue Browsing"
        summary={dossier.analysis}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/tunnel" iconKey="tunnel">
            Enter Tunnel Descent
          </Button>
          <Button href="/evidence" variant="outline" iconKey="evidence">
            Review Evidence
          </Button>
          <Button
            href="/personnel/dossiers"
            variant="ghost"
            iconKey="dossiers"
          >
            All Dossiers
          </Button>
        </div>
      </ArchivePanel>
    </ArchivePageShell>
  );
}
