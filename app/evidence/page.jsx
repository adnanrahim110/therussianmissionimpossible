import { Button } from "@/components/ui/Button";
import { ArchiveMapGallery } from "@/components/ui/archive/ArchiveMapGallery";
import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import { ArchivePanel } from "@/components/ui/archive/ArchivePanel";
import { ArchiveSectionHeader } from "@/components/ui/archive/ArchiveSectionHeader";
import {
  evidenceGallery,
  evidenceHighlights,
  evidencePage,
  evidencePageContent,
  evidenceSection,
} from "@/constants/evidence";
import { siteMeta } from "@/constants/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${evidencePage.metadataTitle} | ${siteMeta.title}`,
  description: evidencePage.summary,
  path: "/evidence",
});

export default function EvidencePage() {
  return (
    <ArchivePageShell
      breadcrumbs={evidencePageContent.breadcrumbs}
      iconKey="evidence"
      eyebrow={evidencePage.eyebrow}
      title={evidencePage.title}
      summary={evidencePage.summary}
      detail={evidencePage.detail}
      actions={evidencePageContent.actions}
      aside={
        <ArchivePanel
          eyebrow={evidenceSection.featuredLabel}
          iconKey="map"
          title={evidenceSection.featuredTitle}
          summary={evidenceSection.featuredNote}
        />
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {evidenceHighlights.map((item, index) => (
          <ArchivePanel
            key={item.id}
            tone={index === 0 ? "mist" : "steel"}
            eyebrow={item.type}
            iconKey={item.href.startsWith("/personnel") ? "personnel" : "evidence"}
            title={item.title}
            summary={item.body}
            compact
            id={item.id}
          >
            <Button
              href={item.href}
              variant="ghost"
              iconKey={item.href.startsWith("/personnel") ? "personnel" : "evidence"}
            >
              {evidencePageContent.buttonLabel}
            </Button>
          </ArchivePanel>
        ))}
      </div>

      <ArchiveSectionHeader
        eyebrow={evidencePageContent.gallerySection.eyebrow}
        iconKey="gallery"
        title={evidencePageContent.gallerySection.title}
        summary={evidencePageContent.gallerySection.summary}
      />

      <ArchiveMapGallery items={evidenceGallery} />
    </ArchivePageShell>
  );
}
