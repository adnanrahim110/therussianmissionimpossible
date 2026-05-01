"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  primaryNav,
  purchaseCtas,
  siteMeta,
  tunnelPage,
  utilityNav,
} from "@/lib/archive-data";
import { cn } from "@/lib/utils";

import { Container } from "../ui/Container";

function linkIsActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function DesktopNavLink({ href, label, pathname }) {
  const active = linkIsActive(pathname, href);

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-px rounded-md px-2.5 py-2 text-xs capitalize tracking-[0.26em] transition-colors duration-200 ease-in-out font-ui group/nav",
        active
          ? " bg-white/10 text-green-500"
          : "text-stone-300 hover:bg-white/5 hover:text-green-500",
      )}
    >
      <span
        className={cn(
          "invisible transition-all duration-200 ease-in-out",
          active ? "visible" : "group-hover/nav:visible",
        )}
      >
        {"/"}
      </span>{" "}
      {label}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const utilityLinks = useMemo(() => utilityNav.slice(0, 3), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setHidden(false);
  }, [pathname]);

  useEffect(() => {
    let frame = 0;

    const sectionWantsHeaderHidden = () => {
      const triggerLine = Math.min(window.innerHeight * 0.5, 520);
      return Array.from(document.querySelectorAll("[data-hide-header]")).some(
        (section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= 4 && rect.bottom >= triggerLine;
        },
      );
    };

    const syncFromSections = () => {
      if (mobileOpen) {
        setHidden(false);
        return;
      }
      setHidden(sectionWantsHeaderHidden());
    };

    const queueSync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncFromSections);
    };

    const handler = (event) => {
      const visible = event?.detail?.visible;
      if (typeof visible === "boolean") {
        setHidden(mobileOpen ? false : visible || sectionWantsHeaderHidden());
      }
    };

    queueSync();
    window.addEventListener("scroll", queueSync, { passive: true });
    window.addEventListener("resize", queueSync);
    window.addEventListener("tunnel-section-visibility", handler);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queueSync);
      window.removeEventListener("resize", queueSync);
      window.removeEventListener("tunnel-section-visibility", handler);
    };
  }, [mobileOpen, pathname]);

  useEffect(() => {
    // If the user opens the mobile menu we shouldn't keep the header hidden.
    if (mobileOpen && hidden) setHidden(false);
  }, [mobileOpen, hidden]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 px-3 pt-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:px-4",
          hidden ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <Container className="relative">
          <div
            className={cn(
              "flex items-center justify-between gap-4 rounded-md border py-2 pl-2 pr-4 transition-colors duration-300 md:pr-5",
              isScrolled
                ? "border-white/10 bg-stone-950/95 backdrop-blur"
                : "border-white/5 bg-stone-950/80 backdrop-blur",
            )}
          >
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/imgs/logo.png"
                alt={siteMeta.shortTitle}
                width={220}
                height={220}
                className="h-12 w-auto md:h-14"
              />
              <div className="hidden min-[1180px]:block">
                <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-stone-400">
                  Operation
                </p>
                <p className="font-heading text-lg font-bold text-white">
                  Stream 3.0
                </p>
              </div>
            </Link>

            <nav className="hidden min-[1180px]:flex min-[1180px]:items-center min-[1180px]:gap-1">
              {primaryNav.map((item) => (
                <DesktopNavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  pathname={pathname}
                />
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              {utilityLinks.map((link) => (
                <DesktopNavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  pathname={pathname}
                />
              ))}
              <Button href={purchaseCtas.amazon.href} size="sm">
                Buy Book
              </Button>
            </div>

            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setMobileOpen((value) => !value)}
              className="rounded-md border border-white/10 bg-white/5 px-4 py-2 font-ui text-[11px] uppercase tracking-[0.28em] text-white transition-colors hover:bg-white/10 lg:hidden"
            >
              {mobileOpen ? "Close" : "Menu"}
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 px-4 py-5 lg:hidden"
          >
            <div className="mx-auto flex min-h-full max-w-3xl flex-col gap-5 rounded-md border border-white/10 bg-stone-950 p-5">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <Link href="/" className="flex items-center gap-3">
                  <Image
                    src="/imgs/logo.png"
                    alt={siteMeta.shortTitle}
                    width={180}
                    height={180}
                    className="h-12 w-auto"
                  />
                  <div>
                    <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-stone-400">
                      Archive Routes
                    </p>
                    <p className="font-heading text-lg font-bold text-white">
                      {siteMeta.shortTitle}
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md border border-white/10 bg-white/5 px-4 py-2 font-ui text-[11px] uppercase tracking-[0.28em] text-white"
                >
                  Close
                </button>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-3">
                  <p className="font-ui text-[11px] font-medium uppercase tracking-[0.3em] text-stone-400">
                    Core files
                  </p>
                  {primaryNav.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.04 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-md border px-4 py-4 font-heading text-lg font-bold tracking-wide transition-colors",
                          linkIsActive(pathname, item.href)
                            ? "border-rose-500/40 bg-white/10 text-white"
                            : "border-white/10 bg-white/5 text-stone-100 hover:border-white/20",
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-3">
                  <p className="font-ui text-[11px] font-medium uppercase tracking-[0.3em] text-stone-400">
                    Utility routes
                  </p>
                  {utilityNav.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.16 + index * 0.04 }}
                    >
                      <Link
                        href={item.href}
                        className="block rounded-md border border-white/10 bg-white/5 px-4 py-4 font-ui text-[11px] uppercase tracking-[0.28em] text-stone-100 transition-colors hover:border-white/20"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}

                  <div className="rounded-md border border-white/10 bg-stone-900 p-5 text-stone-100">
                    <p className="font-ui text-[10px] font-medium uppercase tracking-[0.28em] text-stone-400">
                      Recommended route
                    </p>
                    <p className="mt-3 font-heading text-2xl font-bold text-white">
                      Tunnel Descent
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-stone-200">
                      {tunnelPage.summary}
                    </p>
                    <div className="mt-4">
                      <Button href="/tunnel">Open Tunnel</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
