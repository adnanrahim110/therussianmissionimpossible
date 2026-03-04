"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import Link from "next/link";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "The Book", href: "/book" },
  { label: "Authors", href: "/authors" },
  { label: "Contact", href: "/contact" },
];

function NavLink({ href, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative text-sm font-semibold text-stone-300 hover:text-stone-50 transition-colors py-1"
    >
      {children}
      {/* Clip-path underline wipe from left */}
      <span className="absolute bottom-0 left-0 h-px w-full bg-crimson-600 [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0%_0_0)] transition-[clip-path] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
    </Link>
  );
}

export function Header() {
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.2 });

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
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-stone-950/80 backdrop-blur-xl border-b border-stone-800/50"
            : "bg-transparent",
        )}
      >
        <div className="container-default h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-1 group">
            <span className="crosshair-marker scale-75 opacity-50 group-hover:opacity-100 transition-opacity mr-2 hidden sm:inline-block" />
            <span className="font-heading font-bold text-lg tracking-tighter text-stone-50">
              Operation Stream
            </span>
            <span className="font-heading text-xs font-bold text-crimson-500 -translate-y-2">
              3.0
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-8 items-center">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA button — wipe-fill hover */}
          <div className="hidden md:block">
            <Link
              href="#preorder"
              className="group relative inline-flex items-center justify-center text-sm font-semibold text-crimson-400 border border-crimson-700 px-5 py-2.5 rounded-[2px] overflow-hidden transition-colors duration-300 hover:text-white"
            >
              <span className="absolute inset-0 bg-crimson-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10">Pre-order</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-stone-200"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
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
              {mobileOpen ? (
                <>
                  <line x1="18" x2="6" y1="6" y2="18" />
                  <line x1="6" x2="18" y1="6" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Scroll progress bar — 2px crimson line */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-crimson-600 origin-left"
          style={{ scaleX }}
        />
      </motion.header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-stone-950 grid-overlay-dark flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 24,
                    delay: 0.1 + i * 0.08,
                  }}
                >
                  <Link
                    href={item.href}
                    className="font-heading text-4xl font-bold text-stone-200 hover:text-crimson-400 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 24,
                  delay: 0.1 + NAV_ITEMS.length * 0.08,
                }}
                className="mt-4"
              >
                <Link
                  href="#preorder"
                  className="inline-flex items-center justify-center text-lg font-semibold text-white bg-crimson-600 px-8 py-3 rounded-[2px]"
                  onClick={() => setMobileOpen(false)}
                >
                  Pre-order
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
