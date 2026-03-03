import { ContactHero } from "@/components/contact/ContactHero";
import { ContactSection } from "@/components/contact/ContactSection";

export const metadata = {
  title: "Contact Us | Operation Stream 3.0",
  description:
    "Get in touch for media inquiries, interview requests, or securing bulk orders of Operation Stream 3.0.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSection />
    </>
  );
}
