"use client";

import { Button } from "@/components/ui/Button";
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
import { Container } from "../ui/Container";

function NavLink({ href, children, onClick, active = false }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative rounded-full px-3 py-2 font-ui text-[11px] uppercase tracking-[0.28em] transition-colors whitespace-nowrap",
        active
          ? "bg-white/10 text-stone-50"
          : "text-stone-300 hover:bg-white/6 hover:text-stone-50",
      )}
    >
      {children}
      <span
        className={cn(
          "absolute inset-x-4 bottom-1 h-px bg-accent transition-[clip-path] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
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
    if (latest > previous && latest > 170) {
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
          hidden: { y: "-120%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-4"
      >
        <Container className="relative">
          <div
            className={cn(
              "rounded-full border transition-all duration-300",
              isScrolled
                ? "border-white/10 bg-stone-950/88 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl"
                : "border-white/8 bg-stone-950/58 backdrop-blur-lg",
            )}
          >
            <div className="w-full px-8 flex h-17 items-center justify-between gap-4">
              <Link href="/" className="group flex min-w-0 items-center gap-3">
                <div className="min-w-0">
                  <div className="truncate font-heading text-2xl leading-none text-stone-50">
                    OS
                  </div>
                </div>
              </Link>

              <nav className="hidden lg:flex items-center gap-px">
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
                <Button
                  size="sm"
                  variant="signal"
                  href={purchaseCtas.archive.href}
                >
                  {purchaseCtas.archive.label}
                </Button>
              </div>

              <button
                className="rounded-full border border-white/10 bg-white/6 p-2 text-stone-200 lg:hidden focus-visible:ring-2 focus-visible:ring-accent"
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
          </div>
        </Container>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-50 bg-stone-950/96 backdrop-blur-xl"
          >
            <div className="absolute inset-0 grid-overlay-dark opacity-16" />
            <div className="container-default relative z-10 flex min-h-screen-safe flex-col justify-center py-24">
              <nav className="flex flex-col gap-3">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 24,
                      delay: 0.08 + i * 0.06,
                    }}
                  >
                    <Link
                      href={item.href}
                      className="block rounded-3xl border border-white/8 bg-white/3 px-6 py-5 font-heading text-4xl text-stone-100 transition-colors hover:border-white/16 hover:text-accent-hover"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 24,
                  delay: 0.16 + navItems.length * 0.06,
                }}
                className="mt-8"
              >
                <Button
                  size="lg"
                  variant="signal"
                  href={purchaseCtas.archive.href}
                  onClick={() => setMobileOpen(false)}
                >
                  {purchaseCtas.archive.label}
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 24,
                  delay: 0.22 + navItems.length * 0.06,
                }}
                className="mt-8 flex flex-wrap gap-3"
              >
                {mobileSupportLinks.map((link) => (
                  <Link
                    key={`${link.href}-${link.label}`}
                    href={link.href}
                    className="rounded-full border border-white/10 px-4 py-2 font-ui text-[11px] uppercase tracking-[0.28em] text-stone-300 hover:border-white/20 hover:text-stone-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
