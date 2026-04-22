"use client";

import { Button } from "@/components/ui/Button";
import {
  primaryNav,
  siteMeta,
  tunnelPage,
  utilityNav,
} from "@/lib/archive-data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
        "inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-2 font-ui text-[11px] uppercase tracking-[0.26em] transition-colors",
        active
          ? "border-[rgba(242,13,13,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.05))] text-white"
          : "text-(--text-muted) hover:bg-(--surface-chip) hover:text-white",
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
              "flex items-center justify-between gap-4 rounded-[28px] border py-2 pl-2 pr-4 transition-all duration-300 md:pr-5",
              isScrolled
                ? "border-(--border-soft) bg-[linear-gradient(180deg,rgba(16,26,33,0.94),rgba(11,20,27,0.96))] shadow-[0_22px_70px_rgba(6,12,18,0.32)] backdrop-blur-xl"
                : "border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(18,29,37,0.82),rgba(12,22,28,0.88))] backdrop-blur-lg",
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
                <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-(--text-muted)">
                  Operation
                </p>
                <p className="archive-title-nav font-heading text-white">
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
              className="rounded-full border border-(--border-soft) bg-(--surface-chip) px-4 py-2 font-ui text-[11px] uppercase tracking-[0.28em] text-white transition-colors hover:bg-(--surface-chip-strong) lg:hidden"
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
            className="fixed inset-0 z-50 bg-[rgba(6,12,18,0.86)] px-4 py-5 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto flex min-h-full max-w-3xl flex-col gap-5 rounded-[30px] border border-(--border-soft) bg-[linear-gradient(180deg,rgba(16,27,35,0.98),rgba(10,19,25,0.99))] p-5 shadow-[0_30px_120px_rgba(6,12,18,0.42)]">
              <div className="flex items-center justify-between gap-4 border-b border-(--border-soft) pb-4">
                <Link href="/" className="flex items-center gap-3">
                  <Image
                    src="/imgs/logo.png"
                    alt={siteMeta.shortTitle}
                    width={180}
                    height={180}
                    className="h-12 w-auto"
                  />
                  <div>
                    <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-(--text-muted)">
                      Archive Routes
                    </p>
                    <p className="archive-title-nav font-heading text-white">
                      {siteMeta.shortTitle}
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full border border-(--border-soft) bg-(--surface-chip) px-4 py-2 font-ui text-[11px] uppercase tracking-[0.28em] text-white"
                >
                  Close
                </button>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-3">
                  <p className="font-ui text-[11px] uppercase tracking-[0.3em] text-(--text-muted)">
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
                          "archive-title-nav block rounded-[22px] border px-4 py-4 font-heading transition-colors",
                          linkIsActive(pathname, item.href)
                            ? "border-[rgba(242,13,13,0.34)] bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.05))] text-white"
                            : "border-(--border-soft) bg-[linear-gradient(180deg,var(--surface-chip-strong),var(--surface-chip))] text-(--text-primary)",
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-3">
                  <p className="font-ui text-[11px] uppercase tracking-[0.3em] text-(--text-muted)">
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
                        className="block rounded-[22px] border border-(--border-soft) bg-[linear-gradient(180deg,var(--surface-chip-strong),var(--surface-chip))] px-4 py-4 font-ui text-[11px] uppercase tracking-[0.28em] text-(--text-primary)"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}

                  <div className="rounded-[26px] border border-(--border-soft) bg-[linear-gradient(180deg,var(--surface-panel-alt),var(--surface-panel-alt-strong))] p-5 text-(--text-primary)">
                    <p className="font-ui text-[10px] uppercase tracking-[0.28em] text-(--text-muted)">
                      Recommended route
                    </p>
                    <p className="archive-title-nav mt-3 font-heading text-(--text-strong)">
                      Tunnel Descent
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-(--text-soft)">
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
