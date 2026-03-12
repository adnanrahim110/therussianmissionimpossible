"use client";

import { useTilt3D } from "@/hooks/useTilt3D";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export function TestimonialCard({ quote, author, role, className }) {
  const { ref, style, handlers } = useTilt3D({
    maxTilt: 6,
  });

  return (
    <div className="perspective-container">
      <motion.div
        ref={ref}
        style={style}
        {...handlers}
        className={cn(
          "group relative h-full bg-white rounded-[2px] p-8 border border-stone-200 flex flex-col will-change-transform",
          className,
        )}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-crimson-600" />

        <span
          className="absolute -top-6 left-6 font-heading font-black text-[80px] leading-none text-crimson-100 select-none pointer-events-none"
          aria-hidden="true"
        >
          &ldquo;
        </span>

        <blockquote className="font-heading text-xl md:text-2xl text-stone-800 leading-relaxed mb-8 grow relative z-10 pt-4">
          {quote}
        </blockquote>

        <div className="mt-auto relative z-10">
          <div className="h-px w-12 bg-crimson-600 mb-4" />
          <div className="font-bold text-stone-950 font-body uppercase tracking-widest text-sm">
            {author}
          </div>
          {role && (
            <div className="text-xs text-stone-500 mt-1 uppercase tracking-wider">
              {role}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
