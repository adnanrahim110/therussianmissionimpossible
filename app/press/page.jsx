import { Button } from "@/components/ui/Button";
import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import { ArchivePanel } from "@/components/ui/archive/ArchivePanel";
import { missionFileDownload, pressDeskPage, siteMeta } from "@/lib/archive-data";
import { buildMetadata } from "@/lib/seo";

const assetLinks = {
  "author-bios": "/personnel/authors",
  "book-summary": "/book",
  "contact-sheet": "/contact",
};

export const metadata = buildMetadata({
  title: `Press Desk | ${siteMeta.title}`,
  description: pressDeskPage.summary,
  path: "/press",
});

export default function PressPage() {
  return (
    <ArchivePageShell
      breadcrumbs={[
        { label: "Archive", href: "/" },
        { label: "Press" },
      ]}
      iconKey="press"
      eyebrow={pressDeskPage.eyebrow}
      title={pressDeskPage.title}
      summary={pressDeskPage.summary}
      detail={missionFileDownload.summary}
      actions={[
        { label: "Open Contact Desk", href: "/contact" },
        { label: "Open Publication File", href: "/book", variant: "outline" },
      ]}
      aside={
        <ArchivePanel eyebrow="Mission File" iconKey="press" title={missionFileDownload.title} summary={missionFileDownload.summary}>
          <p className="font-ui text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-accent)]">
            Status: {missionFileDownload.status}
          </p>
        </ArchivePanel>
      }
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {pressDeskPage.assets.map((asset, index) => (
          <ArchivePanel
            key={asset.id}
            tone={index % 2 === 0 ? "mist" : "steel"}
            eyebrow={asset.type}
            iconKey={assetLinks[asset.id] === "/personnel/authors" ? "authors" : assetLinks[asset.id] === "/book" ? "book" : assetLinks[asset.id] === "/contact" ? "contact" : "press"}
            title={asset.title}
            summary={asset.description}
            compact
          >
            {assetLinks[asset.id] ? (
              <Button
                href={assetLinks[asset.id]}
                variant="ghost"
                iconKey={assetLinks[asset.id] === "/personnel/authors" ? "authors" : assetLinks[asset.id] === "/book" ? "book" : "contact"}
              >
                Open linked route
              </Button>
            ) : (
              <p className="font-ui text-[11px] uppercase tracking-[0.28em] text-[color:var(--text-muted)]">
                Status: {asset.status}
              </p>
            )}
          </ArchivePanel>
        ))}
      </div>
    </ArchivePageShell>
  );
}
