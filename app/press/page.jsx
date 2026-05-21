import { Button } from "@/components/ui/Button";
import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import { ArchivePanel } from "@/components/ui/archive/ArchivePanel";
import {
  missionFileDownload,
  pressAssetLinks,
  pressDeskPage,
  pressPageContent,
} from "@/constants/press";
import { siteMeta } from "@/constants/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${pressDeskPage.metadataTitle} | ${siteMeta.title}`,
  description: pressDeskPage.summary,
  path: "/press",
});

export default function PressPage() {
  return (
    <ArchivePageShell
      breadcrumbs={pressPageContent.breadcrumbs}
      iconKey="press"
      eyebrow={pressDeskPage.eyebrow}
      title={pressDeskPage.title}
      summary={pressDeskPage.summary}
      detail={missionFileDownload.summary}
      actions={pressPageContent.actions}
      aside={
        <ArchivePanel
          eyebrow={pressPageContent.aside.eyebrow}
          iconKey="press"
          title={missionFileDownload.title}
          summary={pressPageContent.aside.summary}
        >
          <p className="font-ui text-[11px] uppercase tracking-[0.28em] text-rose-300">
            {pressPageContent.aside.statusLabel} {missionFileDownload.status}
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
            iconKey={
              pressAssetLinks[asset.id] === "/personnel/authors"
                ? "authors"
                : pressAssetLinks[asset.id] === "/book"
                  ? "book"
                  : pressAssetLinks[asset.id] === "/contact"
                    ? "contact"
                    : "press"
            }
            title={asset.title}
            summary={asset.description}
            compact
          >
            {pressAssetLinks[asset.id] ? (
              <Button
                href={pressAssetLinks[asset.id]}
                variant="ghost"
                iconKey={
                  pressAssetLinks[asset.id] === "/personnel/authors"
                    ? "authors"
                    : pressAssetLinks[asset.id] === "/book"
                      ? "book"
                      : "contact"
                }
              >
                {pressPageContent.linkedRouteButton}
              </Button>
            ) : (
              <p className="font-ui text-[11px] uppercase tracking-[0.28em] text-stone-400">
                {pressPageContent.aside.statusLabel} {asset.status}
              </p>
            )}
          </ArchivePanel>
        ))}
      </div>
    </ArchivePageShell>
  );
}
