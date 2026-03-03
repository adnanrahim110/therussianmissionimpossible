import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CTA_LINKS } from "@/lib/constants";

export function ContactPreview() {
  return (
    <section className="py-20 bg-stone-50 border-t border-stone-200 text-center">
      <Container size="narrow">
        <ScrollReveal>
          <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-600">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
              <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
            </svg>
          </div>

          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-stone-900">
            Press & Inquiries
          </h2>

          <p className="text-stone-600 mb-8 max-w-md mx-auto">
            For media interviews, bulk orders, or direct communication with the
            publisher and authors.
          </p>

          <Button variant="secondary" href={CTA_LINKS.contact.href}>
            {CTA_LINKS.contact.label}
          </Button>

          <div className="mt-12 text-sm text-stone-400">
            <p className="uppercase tracking-widest font-semibold">
              CGG International W.L.L.
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
