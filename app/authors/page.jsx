import { AuthorProfiles } from "@/components/authors/AuthorProfile";
import { AuthorsCTA } from "@/components/authors/AuthorsCTA";
import { AuthorsHero } from "@/components/authors/AuthorsHero";
import { AuthorsTestimonials } from "@/components/authors/AuthorsTestimonials";

export const metadata = {
  title: "Meet the Authors | Operation Stream 3.0",
  description:
    "Three distinct voices documenting the truth of the Russian Mission Impossible.",
};

export default function AuthorsPage() {
  return (
    <>
      <AuthorsHero />
      <AuthorProfiles />
      <AuthorsTestimonials />
      <AuthorsCTA />
    </>
  );
}
