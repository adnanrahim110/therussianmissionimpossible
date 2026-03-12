"use client";

import { contactLinks, missionNav, supportLinks } from "@/lib/constants";
import { siteMeta } from "@/lib/content";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

function FooterLink({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center text-sm text-stone-400 transition-all duration-200 hover:translate-x-1 hover:text-stone-50"
      >
        <span className="mr-2 opacity-0 text-crimson-500 transition-opacity group-hover:opacity-100">
          &rarr;
        </span>
        {children}
      </Link>
    </li>
  );
}

export function Footer() {
  const lineRef = useRef(null);
  const isLineInView = useInView(lineRef, { once: true, margin: "-20% 0px" });
  const archiveLinks = missionNav.map((item) => ({
    ...item,
    href: item.href,
  }));

  return (
    <footer className="relative overflow-hidden border-t border-stone-800 bg-stone-950 py-16 text-stone-400 lg:py-24">
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="font-heading text-mega font-black whitespace-nowrap text-stone-900/45">
          ARCHIVE
        </span>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-dark opacity-35"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grain-overlay pointer-events-none opacity-70"
      />

      <div
        ref={lineRef}
        className="absolute inset-x-0 top-0 flex justify-center"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isLineInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-1 w-full origin-center bg-crimson-600"
        />
      </div>

      <div className="container-default relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="mb-4 font-ui text-[11px] uppercase tracking-[0.34em] text-stone-500">
              {siteMeta.tagline}
            </p>
            <h3 className="mb-4 font-heading text-4xl tracking-[0.08em] text-stone-50">
              {siteMeta.title}
            </h3>
            <p className="mb-6 max-w-md text-sm leading-relaxed text-stone-300">
              An immersive mission-file campaign built around evidence, route,
              and controversy rather than a conventional promotional layout.
            </p>
            <p className="font-ui text-xs uppercase tracking-[0.24em] text-stone-600">
              &copy; {new Date().getFullYear()} {siteMeta.publisher}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h4 className="mb-4 font-ui text-xs uppercase tracking-[0.28em] text-stone-50">
                Archive Files
              </h4>
              <ul className="space-y-3">
                {archiveLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-ui text-xs uppercase tracking-[0.28em] text-stone-50">
                Support Routes
              </h4>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <FooterLink key={link.label} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-ui text-xs uppercase tracking-[0.28em] text-stone-50">
                Contact
              </h4>
              <ul className="space-y-3">
                {contactLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-stone-500">
                {siteMeta.contactAddress.join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
