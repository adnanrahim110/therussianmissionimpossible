"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TIMELINE } from "@/lib/content";
import { cn } from "@/lib/utils";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

export function BookTimeline() {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="section-padding bg-stone-100" id="chronology">
      <Container>
        <SectionHeading
          title="Chronology of the Mission"
          subtitle="Key events spanning the 215 days of occupation."
          align="center"
          className="mb-16 md:mb-24"
        />

        <div className="relative max-w-4xl mx-auto" ref={containerRef}>
          {/* Center Line Track */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-stone-200 -translate-x-1/2 z-0" />

          {/* Active Laser Center Line */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute left-4 md:left-1/2 top-0 w-0.75 bg-crimson-600 -translate-x-1/2 origin-top z-10 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]"
              style={{ scaleY: lineHeight, bottom: 0 }}
            />
          )}

          <div className="space-y-12 md:space-y-24">
            {TIMELINE.map((item, index) => {
              const isEven = index % 2 === 0;
              const isLiberation = item.type === "liberation";
              const isOperations = item.type === "operations";

              const dotColor = isLiberation
                ? "bg-olive-500 border-olive-200"
                : isOperations
                  ? "bg-stone-600 border-stone-200"
                  : "bg-crimson-600 border-crimson-200";

              return (
                <div
                  key={index}
                  className="relative flex items-center md:justify-between w-full group"
                >
                  {/* Timeline Glowing Node */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ margin: "-50% 0px -50% 0px" }}
                    className={cn(
                      "absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-2 border-white -translate-x-1/2 z-20 shadow-[0_0_0_4px_rgba(255,255,255,1),0_0_15px_rgba(220,38,38,0.5)] transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_0_4px_rgba(255,255,255,1),0_0_20px_rgba(220,38,38,0.8)]",
                      dotColor,
                    )}
                  />

                  {/* Left Column (Content for even on desktop, hidden on mobile) */}
                  <div
                    className={cn(
                      "w-full md:w-5/12 ml-12 md:ml-0 hidden md:block",
                      !isEven && "opacity-0 invisible", // Takes up space but hidden when text is on right
                    )}
                  >
                    {isEven && <TimelineCard item={item} align="right" />}
                  </div>

                  {/* Right Column (Content for odd on desktop, ALL content on mobile) */}
                  <div
                    className={cn(
                      "w-full md:w-5/12 ml-12 md:ml-0",
                      isEven && "md:opacity-0 md:invisible", // On desktop hidden if even, on mobile always visible
                    )}
                  >
                    {(!isEven || true) && (
                      <div
                        className={cn(
                          "block md:hidden",
                          !isEven && "hidden md:block",
                        )}
                      >
                        <TimelineCard item={item} align="left" />
                      </div>
                    )}
                    {/* Render even items specifically for mobile where they live on the right */}
                    {isEven && (
                      <div className="block md:hidden">
                        <TimelineCard item={item} align="left" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function TimelineCard({ item, align }) {
  const isLiberation = item.type === "liberation";
  const isOperations = item.type === "operations";

  const badgeColor = isLiberation
    ? "bg-olive-50 text-olive-800 border-olive-200/50"
    : isOperations
      ? "bg-stone-50 text-stone-800 border-stone-200/50"
      : "bg-crimson-50 text-crimson-800 border-crimson-200/50";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: align === "right" ? 20 : -20 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 relative",
        align === "right" ? "md:text-right" : "text-left",
      )}
    >
      {/* Arrow pointing to line (desktop only) */}
      <div
        className={cn(
          "hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-y border-stone-200 rotate-45",
          align === "right" ? "-right-2 border-r" : "-left-2 border-l",
        )}
      />

      <time className="font-heading font-bold text-lg text-stone-900 block mb-2">
        {item.date}
      </time>
      <p className="text-stone-600 mb-4 font-body">{item.event}</p>

      <span
        className={cn(
          "inline-block px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md border",
          badgeColor,
        )}
      >
        {item.type}
      </span>
    </motion.div>
  );
}
