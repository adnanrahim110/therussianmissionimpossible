"use client";

import { cn } from "@/lib/utils";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

export function AnimatedText({
  text,
  as: Tag = "h1",
  splitBy = "word",
  className,
  delay = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();

  // If splitBy is "line", we expect `text` to be an array of lines or we split by \n.
  const lines = typeof text === "string" ? text.split("\n") : text;

  if (prefersReducedMotion) {
    return (
      <Tag className={cn("text-balance", className)}>
        {typeof text === "string" ? text : lines.join(" ")}
      </Tag>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: splitBy === "word" ? 0.05 : 0.15,
        delayChildren: delay * i,
      },
    }),
  };

  const childVariant = {
    hidden: {
      opacity: 0,
      y: "100%",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 24,
        stiffness: 100,
      },
    },
  };

  if (splitBy === "word") {
    const words =
      typeof text === "string" ? text.split(" ") : lines.join(" ").split(" ");

    return (
      <Tag className={cn("text-balance flex flex-wrap", className)} ref={ref}>
        <motion.span
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="inline-flex flex-wrap"
        >
          {words.map((word, index) => (
            <span
              key={index}
              className="overflow-hidden inline-flex mr-[0.25em]"
            >
              <motion.span variants={childVariant} className="inline-block">
                {word}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </Tag>
    );
  }

  // splitBy === "line"
  return (
    <Tag className={cn("text-balance", className)} ref={ref}>
      <motion.span
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col"
      >
        {lines.map((line, index) => (
          <span key={index} className="overflow-hidden inline-flex">
            <motion.span variants={childVariant} className="inline-block pb-1">
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
