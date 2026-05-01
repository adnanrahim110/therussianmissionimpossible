import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import { ArchivePanel } from "@/components/ui/archive/ArchivePanel";
import {
  BOOK,
  bookPage,
  missionFileDownload,
  purchaseCtas,
  siteMeta,
} from "@/lib/archive-data";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata = buildMetadata({
  title: `Publication File | ${siteMeta.title}`,
  description: bookPage.summary,
  path: "/book",
  image: "/imgs/bookcover.jpg",
  type: "article",
});

export default function BookPage() {
  return (
    <ArchivePageShell
      breadcrumbs={[{ label: "Archive", href: "/" }, { label: "Book" }]}
      iconKey="book"
      eyebrow={bookPage.eyebrow}
      title={bookPage.title}
      summary={bookPage.summary}
      detail={bookPage.detail}
      actions={[
        {
          label: purchaseCtas.amazon.label,
          href: purchaseCtas.amazon.href,
          iconKey: purchaseCtas.amazon.iconKey,
        },
        {
          label: purchaseCtas.press.label,
          href: purchaseCtas.press.href,
          variant: "outline",
        },
      ]}
      aside={
        <ArchivePanel
          tone="mist"
          eyebrow="Publication"
          iconKey="book"
          title={BOOK.genre}
          summary={BOOK.publisher}
        >
          <div className="overflow-hidden rounded-md border border-white/10 bg-black">
            <Image
              src="/imgs/bookcover.jpg"
              alt="Operation Stream 3.0 book cover"
              width={900}
              height={1350}
              className="h-auto w-full object-cover"
            />
          </div>
        </ArchivePanel>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.7fr)]">
        <ArchivePanel
          eyebrow="Book Overview"
          iconKey="book"
          title="Documentary narrative"
          summary={BOOK.synopsis}
        >
          <div className="flex flex-wrap gap-2">
            {BOOK.themes.map((theme) => (
              <span
                key={theme}
                className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-stone-100"
              >
                {theme}
              </span>
            ))}
          </div>
        </ArchivePanel>

        <ArchivePanel
          tone="mist"
          eyebrow="Purchase Routing"
          iconKey="contact"
          title={missionFileDownload.title}
          summary={missionFileDownload.summary}
        >
          <div className="space-y-3 text-sm leading-relaxed text-stone-200">
            <p>Status: {missionFileDownload.status}</p>
          </div>
        </ArchivePanel>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {bookPage.blocks.map((block, index) => (
          <ArchivePanel
            key={block.title}
            tone={index === 1 ? "steel" : "mist"}
            eyebrow="Book Fragment"
            iconKey="book"
            title={block.title}
            summary={block.body}
            compact
          />
        ))}
      </div>
    </ArchivePageShell>
  );
}
