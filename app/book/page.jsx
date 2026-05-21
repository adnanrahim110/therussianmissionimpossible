import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import { ArchivePanel } from "@/components/ui/archive/ArchivePanel";
import { Button } from "@/components/ui/Button";
import { bookPage, bookPageContent } from "@/constants/book";
import { purchaseCtas } from "@/constants/navigation";
import { siteMeta } from "@/constants/site";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata = buildMetadata({
  title: `${bookPage.metadataTitle} | ${siteMeta.title}`,
  description: bookPage.summary,
  path: "/book",
  image: "/imgs/bookcover.jpg",
  type: "article",
});

export default function BookPage() {
  return (
    <ArchivePageShell
      breadcrumbs={bookPageContent.breadcrumbs}
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
        <div className="p-5">
          <Image
            src={bookPage.cover.src}
            alt={bookPage.cover.alt}
            width={900}
            height={1350}
            className="h-auto w-full object-cover"
          />
        </div>
      }
    >
      <div className="grid gap-6">
        <ArchivePanel
          eyebrow={bookPage.overview.eyebrow}
          iconKey="book"
          title={bookPage.overview.title}
          summary={bookPage.overview.summary}
        >
          <div className="flex flex-col gap-2 border-t border-t-stone-700 pt-4">
            {bookPage.overview.themes.map((theme) => (
              <span key={theme.label} className="text-sm text-stone-100">
                <span className="font-bold text-rose-300">
                  {theme.label} â€“{" "}
                </span>{" "}
                {theme.value}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href={purchaseCtas.amazon.href}
              iconKey={purchaseCtas.amazon.iconKey}
            >
              {purchaseCtas.amazon.label}
            </Button>
            <Button
              href={purchaseCtas.press.href}
              variant="outline"
              iconKey={purchaseCtas.press.iconKey}
            >
              {purchaseCtas.press.label}
            </Button>
          </div>
        </ArchivePanel>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {bookPage.blocks.map((block, index) => (
          <ArchivePanel
            key={block.title}
            tone={index === 1 ? "steel" : "mist"}
            eyebrow={bookPageContent.fragmentEyebrow}
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
