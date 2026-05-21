import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import { ArchivePanel } from "@/components/ui/archive/ArchivePanel";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactPage, contactPageContent } from "@/constants/contact";
import { purchaseCtas } from "@/constants/navigation";
import { siteMeta } from "@/constants/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${contactPage.metadataTitle} | ${siteMeta.title}`,
  description: contactPage.summary,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <ArchivePageShell
      breadcrumbs={contactPageContent.breadcrumbs}
      iconKey="contact"
      eyebrow={contactPage.eyebrow}
      title={contactPage.title}
      summary={contactPage.summary}
      actions={[
        {
          label: contactPageContent.actions.email,
          href: `mailto:${siteMeta.contactEmail}`,
          iconKey: "contact",
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
          eyebrow={contactPageContent.directEmailPanel.eyebrow}
          iconKey="contact"
          title={siteMeta.contactEmail}
          summary={siteMeta.contactAddress.join(", ")}
        />
      }
    >
      <ContactForm />

      <ArchivePanel
        eyebrow={contactPageContent.addressPanel.eyebrow}
        iconKey="location"
        title={contactPageContent.addressPanel.title}
        summary={contactPage.summary}
      >
        <div className="space-y-2 text-sm leading-relaxed text-stone-200 md:text-base">
          {siteMeta.contactAddress.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </ArchivePanel>
    </ArchivePageShell>
  );
}
