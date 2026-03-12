"use client";

import { useTilt3D } from "@/hooks/useTilt3D";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export function AuthorCard({ name, role, bio, quote, className }) {
  const { ref, style, handlers } = useTilt3D({ maxTilt: 6, scale: 1.02 });

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
    : "";

  return (
    <div className="perspective-container h-full">
      <motion.div
        ref={ref}
        style={style}
        {...handlers}
        className={cn(
          "group relative flex flex-col h-full bg-white rounded-[2px] overflow-hidden border border-stone-200 will-change-transform transition-shadow duration-300 hover:shadow-xl",
          className,
        )}
      >
        {/* Image placeholder area */}
        <div className="relative aspect-4/5 w-full bg-stone-100 overflow-hidden shrink-0 flex items-center justify-center">
          <span className="font-heading text-8xl font-bold text-stone-300">
            {initials}
          </span>
        </div>

        {/* Text content — overlapping image with negative margin */}
        <div className="p-8 flex flex-col grow relative bg-white z-10 -mt-6 mx-3 rounded-[2px] border border-stone-100">
          {/* Role badge with left crimson border */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-stone-50 text-stone-700 text-xs font-semibold uppercase tracking-wider rounded-[2px] border-l-2 border-crimson-600">
              {role}
            </span>
          </div>

          <h3 className="font-heading text-2xl font-bold text-stone-900 mb-4 group-hover:text-crimson-700 transition-colors">
            {name}
          </h3>

          <p className="font-body text-stone-600 leading-relaxed grow mb-6">
            {bio}
          </p>

          {quote && (
            <blockquote className="mt-auto pt-6 border-t border-stone-100">
              <p className="font-heading text-sm text-stone-500 italic">
                &ldquo;{quote}&rdquo;
              </p>
            </blockquote>
          )}
        </div>
      </motion.div>
    </div>
  );
}
