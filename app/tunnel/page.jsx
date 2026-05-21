import { TunnelExperience } from "@/components/tunnel";
import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import { ArchivePanel } from "@/components/ui/archive/ArchivePanel";
import { siteMeta } from "@/constants/site";
import { tunnelPage, tunnelPageContent, tunnelStops } from "@/constants/tunnel";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${tunnelPage.metadataTitle} | ${siteMeta.title}`,
  description: tunnelPage.summary,
  path: "/tunnel",
});

export default function TunnelPage() {
  return (
    <ArchivePageShell
      breadcrumbs={tunnelPageContent.breadcrumbs}
      iconKey="tunnel"
      eyebrow={tunnelPage.eyebrow}
      title={tunnelPage.title}
      summary={tunnelPage.summary}
      detail={tunnelPage.detail}
      actions={tunnelPageContent.actions}
      aside={
        <ArchivePanel
          eyebrow={tunnelPageContent.aside.eyebrow}
          iconKey="tunnel"
          title={tunnelPage.detail}
          summary={tunnelPage.prompt}
        />
      }
      noSpacing
    >
      <TunnelExperience stops={tunnelStops} prompt={tunnelPage.prompt} />
    </ArchivePageShell>
  );
}
