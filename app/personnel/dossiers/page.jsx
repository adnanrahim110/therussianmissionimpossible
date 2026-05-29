import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import { DossiersGallery } from "@/components/ui/archive/DossiersGallery";
import {
  dossiers,
  personnelDossiersContent,
  personnelDossiersPage,
} from "@/constants/personnel";
import { siteMeta } from "@/constants/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${personnelDossiersPage.metadataTitle} | ${siteMeta.title}`,
  description: personnelDossiersPage.summary,
  path: "/personnel/dossiers",
});

export default function PersonnelDossiersPage() {
  return (
    <ArchivePageShell
      breadcrumbs={personnelDossiersContent.breadcrumbs}
      iconKey="dossiers"
      eyebrow={personnelDossiersPage.eyebrow}
      title={personnelDossiersPage.title}
      summary={personnelDossiersPage.summary}
    >
      <div className="flex items-center justify-between gap-4 border-y border-white/10 bg-white/2 px-4 py-3 font-ui text-[10px] uppercase tracking-[0.32em] text-stone-400">
        <div className="flex items-center gap-3">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
          <span className="text-stone-200">
            {personnelDossiersContent.cabinetLabel}
          </span>
        </div>
        <span className="hidden sm:inline">
          {dossiers.length.toString().padStart(2, "0")}{" "}
          {personnelDossiersContent.filesOnRecord}
        </span>
      </div>

      <DossiersGallery items={dossiers} content={personnelDossiersContent} />
    </ArchivePageShell>
  );
}
