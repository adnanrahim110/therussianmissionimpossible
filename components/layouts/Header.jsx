"use client";

import {
  contactLinks,
  missionNav,
  purchaseCtas,
  supportLinks,
} from "@/lib/constants";
import { siteMeta } from "@/lib/content";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function NavLink({ href, children, onClick, active = false }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative py-1 font-ui text-[11px] uppercase tracking-[0.28em] transition-colors whitespace-nowrap",
        active ? "text-stone-50" : "text-stone-300 hover:text-stone-50",
      )}
    >
      {children}
      <span
        className={cn(
          "absolute bottom-0 left-0 h-px w-full bg-crimson-600 transition-[clip-path] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          active
            ? "[clip-path:inset(0_0%_0_0)]"
            : "[clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0%_0_0)]",
        )}
      />
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = useMemo(
    () =>
      missionNav.map((item) => ({
        ...item,
        href:
          pathname === "/" && item.href.startsWith("/#")
            ? item.href.slice(1)
            : item.href,
      })),
    [pathname],
  );
  const mobileSupportLinks = useMemo(() => {
    const seen = new Set();
    return [...supportLinks, ...contactLinks].filter((link) => {
      if (seen.has(link.href)) return false;
      seen.add(link.href);
      return true;
    });
  }, []);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.2,
  });

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* Close mobile menu on Escape key */
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [mobileOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 40);
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
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          isScrolled
            ? "border-b border-stone-800/70 bg-stone-950/90 backdrop-blur-xl"
            : "bg-stone-950/40 backdrop-blur-md",
        )}
      >
        <div className="container-default flex h-20 items-center justify-between gap-6">
          <Link href="/" className="group flex min-w-0 items-center gap-3">
            <div className="min-w-0">
              <div className="truncate font-heading text-2xl leading-none text-stone-50">
                {siteMeta.shortTitle}
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                active={item.href === "/book" && pathname === "/book"}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              href={purchaseCtas.archive.href}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-[2px] border border-crimson-700 px-6 py-2.5 font-ui text-xs uppercase tracking-[0.28em] text-crimson-300 transition-colors duration-300 hover:text-white focus-visible:ring-2 focus-visible:ring-crimson-500"
            >
              <span className="absolute inset-0 -translate-x-full bg-crimson-600 transition-transform duration-300 ease-out group-hover:translate-x-0" />
              <span className="relative z-10">
                {purchaseCtas.archive.label}
              </span>
            </Link>
          </div>

          <button
            className="p-2 text-stone-200 lg:hidden focus-visible:ring-2 focus-visible:ring-crimson-500 rounded-[2px]"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
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

        <motion.div
          className="absolute bottom-0 left-0 h-0.5 origin-left bg-crimson-600"
          style={{ scaleX }}
        />
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-950 grid-overlay-dark"
          >
            <div className="absolute inset-0 scanline-overlay opacity-25" />
            <nav className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
              {navItems.map((item, i) => (
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
                    className="font-heading text-4xl text-stone-200 transition-colors hover:text-crimson-400"
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
                  delay: 0.1 + navItems.length * 0.08,
                }}
                className="mt-4"
              >
                <Link
                  href={purchaseCtas.archive.href}
                  className="inline-flex items-center justify-center rounded-[2px] border border-crimson-700 bg-crimson-600 px-8 py-3 font-ui text-xs uppercase tracking-[0.28em] text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {purchaseCtas.archive.label}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 24,
                  delay: 0.1 + (navItems.length + 1) * 0.08,
                }}
                className="mt-8 flex flex-wrap items-center justify-center gap-3"
              >
                {mobileSupportLinks.map((link) => (
                  <Link
                    key={`${link.href}-${link.label}`}
                    href={link.href}
                    className="rounded-[2px] border border-stone-800 px-4 py-2 font-ui text-[11px] uppercase tracking-[0.28em] text-stone-300 hover:border-stone-600 hover:text-stone-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
