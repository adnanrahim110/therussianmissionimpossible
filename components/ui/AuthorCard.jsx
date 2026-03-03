"use client";

import { useSpotlight } from "@/hooks/useSpotlight";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate } from "motion/react";

export function AuthorCard({ name, role, bio, quote, className }) {
  const { handleMouseMove, springX, springY } = useSpotlight();

  // Extract initials if no structured image data handling
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
    : "";

  return (
    <motion.div
      className={cn(
        "group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200",
        className,
      )}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Effect overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-soft-light z-10"
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

      <div className="relative aspect-4/5 w-full bg-stone-100 overflow-hidden shrink-0 flex items-center justify-center">
        <span className="font-heading text-8xl font-bold text-stone-300">
          {initials}
        </span>
      </div>

      <div className="p-8 flex flex-col grow relative bg-white z-0">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-stone-100 text-stone-700 text-xs font-semibold uppercase tracking-wider rounded-full border border-stone-200">
            {role}
          </span>
        </div>

        <h3 className="font-heading text-2xl font-bold text-stone-900 mb-4 group-hover:text-crimson-700 transition-colors">
          {name}
        </h3>

        <p className="font-body text-stone-600 leading-relaxed grow mb-6">
          {bio}
        </p>

        <blockquote className="mt-auto pt-6 border-t border-stone-100">
          <p className="font-heading text-sm text-stone-500 italic"></p>
        </blockquote>
      </div>
    </motion.div>
  );
}
