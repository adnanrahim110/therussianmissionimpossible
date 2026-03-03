"use client";

import { useSpotlight } from "@/hooks/useSpotlight";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate } from "motion/react";

export function TestimonialCard({ quote, author, role, className }) {
  const { handleMouseMove, springX, springY } = useSpotlight();

  return (
    <div
      className={cn(
        "group relative h-full bg-white rounded-2xl p-8 border border-stone-200 shadow-sm flex flex-col",
        className,
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Effect overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-soft-light"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${springX}px ${springY}px,
              rgba(220, 38, 38, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Quote Icon */}
      <div className="text-crimson-600/20 mb-6">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      <blockquote className="font-heading text-xl md:text-2xl text-stone-800 leading-relaxed mb-8 grow">
        "{quote}"
      </blockquote>

      <div className="mt-auto">
        <div className="h-px w-12 bg-crimson-600 mb-4" />
        <div className="font-bold text-stone-950 font-sans">{author}</div>
        {role && <div className="text-sm text-stone-500 mt-1">{role}</div>}
      </div>
    </div>
  );
}
