"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;

    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-stone-50/90 backdrop-blur-md border-b border-stone-200/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-default mx-auto px-4 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="font-heading font-bold text-xl tracking-tight text-stone-950 hover:text-crimson-600 transition-colors"
        >
          Operation Stream 3.0
        </Link>

        <nav className="hidden md:flex gap-8 items-center">
          <Link
            href="/book"
            className="text-sm font-semibold text-stone-700 hover:text-crimson-600 transition-colors"
          >
            The Book
          </Link>
          <Link
            href="/authors"
            className="text-sm font-semibold text-stone-700 hover:text-crimson-600 transition-colors"
          >
            Authors
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold text-stone-700 hover:text-crimson-600 transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:block">
          <Link
            href="#preorder"
            className="text-sm font-semibold bg-crimson-600 text-white px-5 py-2.5 rounded-lg hover:bg-crimson-700 transition duration-200"
          >
            Pre-order
          </Link>
        </div>

        {/* Mobile menu stub */}
        <button
          className="md:hidden p-2 text-stone-900"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </div>
    </motion.header>
  );
}
