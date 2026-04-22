import { Button } from "@/components/ui/Button";
import { ArchivePageShell } from "@/components/ui/archive/ArchivePageShell";
import { ArchivePanel } from "@/components/ui/archive/ArchivePanel";
import { contactPage, purchaseCtas, siteMeta } from "@/lib/archive-data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `Support Desk | ${siteMeta.title}`,
  description: contactPage.summary,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <ArchivePageShell
      breadcrumbs={[
        { label: "Archive", href: "/" },
        { label: "Contact" },
      ]}
      iconKey="contact"
      eyebrow={contactPage.eyebrow}
      title={contactPage.title}
      summary={contactPage.summary}
      actions={[
        { label: "Email the Desk", href: `mailto:${siteMeta.contactEmail}`, iconKey: "contact" },
        { label: purchaseCtas.press.label, href: purchaseCtas.press.href, variant: "outline" },
      ]}
      aside={
        <ArchivePanel tone="mist" eyebrow="Direct Email" iconKey="contact" title={siteMeta.contactEmail} summary={siteMeta.contactAddress.join(", ")} />
      }
    >
      <div className="grid gap-5 md:grid-cols-3">
        {contactPage.channels.map((channel, index) => (
          <ArchivePanel
            key={channel.label}
            tone={index === 1 ? "steel" : "mist"}
            eyebrow="Request Channel"
            iconKey="contact"
            title={channel.label}
            summary={channel.value}
            compact
          />
        ))}
      </div>

      <ArchivePanel eyebrow="Mailing Address" iconKey="location" title="Archive support office" summary={contactPage.summary}>
        <div className="space-y-2 text-sm leading-relaxed text-[color:var(--text-soft)] md:text-base">
          {siteMeta.contactAddress.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </ArchivePanel>
    </ArchivePageShell>
  );
}
