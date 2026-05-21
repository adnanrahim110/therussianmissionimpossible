import { ArchiveHub } from "@/components/archive/ArchiveHub";
import { archiveHub } from "@/constants/archive";
import { siteMeta } from "@/constants/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${archiveHub.metadataTitle} | ${siteMeta.title}`,
  description: archiveHub.summary,
  path: "/",
});

export default function Home() {
  return <ArchiveHub />;
}
