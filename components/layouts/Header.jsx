"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  primaryNav,
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
        "inline-flex items-center gap-2 rounded-md border border-transparent px-3 py-2 font-ui text-[11px] uppercase tracking-[0.26em] transition-colors",
        active
          ? "border-rose-500/30 bg-white/10 text-white"
          : "text-stone-300 hover:bg-white/5 hover:text-white",
      )}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-4">
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
              <Button href="/tunnel" size="sm">
                Enter Tunnel
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
