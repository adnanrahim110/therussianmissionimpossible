import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import { ArchivePanel } from "@/components/ui/archive/ArchivePanel";
import { Button } from "@/components/ui/Button";
import {
  BOOK,
  bookPage,
  missionFileDownload,
  purchaseCtas,
  siteMeta,
} from "@/lib/archive-data";
import { buildMetadata } from "@/lib/seo";
import { label } from "motion/react-client";
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
        <div className="p-5">
          <Image
            src="/imgs/bookcover.jpg"
            alt="Operation Stream 3.0 book cover"
            width={900}
            height={1350}
            className="h-auto w-full object-cover"
          />
        </div>
      }
    >
      <div className="grid gap-6">
        <ArchivePanel
          eyebrow="Book Overview"
          iconKey="book"
          title="Documentary narrative"
          summary={[
            "What you are about to read actually happened.",
            "This book does not guess. It documents. Operation Stream 3.0 took place beneath the Kursk border region after Ukrainian forces had occupied Russian land for seven months. The mission: do what they do not expect.",
            "The method: a gas pipeline. 142 centimeters wide. 16 kilometers long. Several Hundreds of Special Forces Soldiers descend underground, not knowing if they would reach the end of their journey. . Those who did surfaced with faces black as coal and lungs full of chemical burn and managed to ambush the enemy, combining forces with the other Tactical teams above ground. ",
            "The narrative follows real voices: a commander who led from inside the pipe, a nurse who washed soot off the living, a priest who carried an icon instead of a rifle, a civilian whose only weapon was a cardboard sign. No filter. No narrator between you and them.",
            "Resilience is not a slogan here. It is a body that kept crawling.",
          ]}
        >
          <div className="flex flex-col gap-2 border-t border-t-stone-700 pt-4">
            {[
              {
                label: "Courage",
                value:
                  "a soldier ordering 101 roses for his wife before entering certain darkness. (NO BUT LIKE HOW IS THIS COURAGE GUYS COME ON!!!!IUT OF ALL THE EXAMPLES YOU USE THIS ?!!!)",
              },
              {
                label: "Sacrifice",
                value: "comrades carrying a fallen friend through the pipe.",
              },
              {
                label: "Modern warfare",
                value:
                  "drones, ventilation shafts, and the engineering of the POTOK strategy.",
              },
              {
                label: "Human experience",
                value:
                  "a priest walking with his son, a nurse praying convoys through drone‑filled skies, a civilian holding up a cardboard sign that asks drones for “BREAD.”",
              },
            ].map((theme) => (
              <span key={theme.label} className="text-sm text-stone-100">
                <span className="font-bold text-rose-300">
                  {theme.label} –{" "}
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
