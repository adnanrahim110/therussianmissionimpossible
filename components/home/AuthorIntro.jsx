import { AuthorCard } from "@/components/ui/AuthorCard";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AUTHORS } from "@/lib/content";

export function AuthorIntro() {
  return (
    <section className="section-padding bg-stone-50" id="authors">
      <Container>
        <SectionHeading
          title="The Voices Behind the History"
          subtitle="Three distinct perspectives united by a single purpose: documenting the truth of the occupation."
          align="center"
          ornament
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {AUTHORS.map((author, i) => (
            <ScrollReveal key={i} delay={i * 0.15} className="h-full">
              <AuthorCard
                name={author.name}
                role={author.role}
                bio={author.bio}
              />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
