import { BookContact } from "@/components/book/BookContact";
import { BookDetails } from "@/components/book/BookDetails";
import { BookExcerpt } from "@/components/book/BookExcerpt";
import { BookHero } from "@/components/book/BookHero";
import { BookStats } from "@/components/book/BookStats";
import { BookTestimonials } from "@/components/book/BookTestimonials";
import { BookTimeline } from "@/components/book/BookTimeline";

export const metadata = {
  title: "The Book | Operation Stream 3.0",
  description:
    "A riveting narrative from the front lines, drawn entirely from the accounts of those who lived the unimaginable.",
};

export default function BookPage() {
  return (
    <>
      <BookHero />
      <BookDetails />
      <BookTimeline />
      <BookExcerpt />
      <BookStats />
      <BookTestimonials />
      <BookContact />
    </>
  );
}
