"use client";

import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AUTHORS } from "@/lib/content";
import { cn } from "@/lib/utils";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

export function AuthorProfiles() {
  return (
    <div className="bg-stone-50">
      {AUTHORS.map((author, index) => (
        <div key={index}>
          <AuthorSection author={author} index={index} />
          {index < AUTHORS.length - 1 && (
            <Container>
              <Divider variant="ornament" className="opacity-50" />
            </Container>
          )}
        </div>
      ))}
    </div>
  );
}

function AuthorSection({ author, index }) {
  const isEven = index % 2 === 0;
  const imageRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // Fake initials-based placeholder like AuthorCard since we don't have images
  const initials = author.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <section className="section-padding overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className={cn("order-2", isEven ? "lg:order-1" : "lg:order-2")}>
            <ScrollReveal>
              <div className="inline-block px-3 py-1 bg-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider rounded-full mb-6">
                {author.role}
              </div>

              <h2 className="font-heading text-3xl md:text-5xl font-bold text-stone-900 mb-6">
                {author.name}
              </h2>

              <p className="font-body text-lg text-stone-700 leading-relaxed mb-8">
                {author.bio}
              </p>

              <blockquote className="border-l-4 border-crimson-600 pl-6 my-8">
                <p className="font-heading text-xl md:text-2xl text-stone-800 italic leading-snug">
                  "{author.quote}"
                </p>
              </blockquote>
            </ScrollReveal>
          </div>

          {/* Image Placeholder */}
          <div
            className={cn(
              "order-1 relative",
              isEven ? "lg:order-2" : "lg:order-1",
            )}
          >
            <ScrollReveal delay={0.2}>
              <div
                ref={imageRef}
                className="aspect-4/5 w-full max-w-md mx-auto relative rounded-2xl overflow-hidden bg-stone-200 shadow-xl border border-stone-300"
              >
                {!prefersReducedMotion && (
                  <motion.div
                    className="absolute inset-0 bg-stone-300 flex items-center justify-center"
                    style={{ y: imageY, scale: 1.1 }} // Scale slightly so parallax doesn't show edges
                  >
                    {/* Inner styling of placeholder */}
                    <div className="absolute inset-0 bg-linear-to-tr from-stone-400/20 to-transparent" />
                    <span className="font-heading text-[120px] font-bold text-stone-400/50 mix-blend-overlay">
                      {initials}
                    </span>
                  </motion.div>
                )}

                {prefersReducedMotion && (
                  <div className="absolute inset-0 bg-stone-300 flex items-center justify-center">
                    <span className="font-heading text-[120px] font-bold text-stone-400/50 mix-blend-overlay">
                      {initials}
                    </span>
                  </div>
                )}

                {/* Frame inset shadow overlay */}
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] pointer-events-none rounded-2xl" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
