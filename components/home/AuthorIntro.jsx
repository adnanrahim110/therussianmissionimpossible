"use client";

import { AuthorCard } from "@/components/ui/AuthorCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cascadeChild, cascadeParent, safeVariants } from "@/lib/animations";
import { AUTHORS } from "@/lib/content";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

export function AuthorIntro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();

  const parent = safeVariants(cascadeParent, prefersReducedMotion);
  const child = safeVariants(cascadeChild, prefersReducedMotion);

  return (
    <section className="section-padding bg-stone-50" id="authors">
      <Container>
        <SectionHeading
          title="The Voices Behind the History"
          subtitle="Three distinct perspectives united by a single purpose: documenting the truth of the occupation."
          align="center"
          ornament
          index="02"
        />

        {/* Magazine-style: first card featured large, other two stack */}
        <motion.div
          ref={ref}
          variants={parent}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {AUTHORS.map((author, i) => (
            <motion.div
              key={i}
              variants={child}
              className={i === 0 ? "md:col-span-2 lg:col-span-1 lg:row-span-1" : "h-full"}
            >
              <AuthorCard
                name={author.name}
                role={author.role}
                bio={author.bio}
                quote={author.quote}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
