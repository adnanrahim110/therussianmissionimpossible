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
        <span className="mr-2 opacity-0 text-accent transition-opacity group-hover:opacity-100">
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
    <footer className="relative overflow-hidden border-t border-white/6 bg-stone-950 py-12 text-stone-300 lg:py-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-dark opacity-16"
      />

      <div
        ref={lineRef}
        className="absolute inset-x-0 top-0 flex justify-center"
      ></div>

      <div className="container-default relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="mb-3 font-ui text-[11px] uppercase tracking-[0.34em] text-stone-500">
              {siteMeta.tagline}
            </p>
            <h3 className="mb-3 font-body text-xl font-semibold tracking-[-0.04em] text-stone-50 sm:text-2xl md:text-3xl">
              {siteMeta.title}
            </h3>
            <p className="mb-5 max-w-md text-sm leading-relaxed text-stone-400">
              {siteMeta.description}
            </p>
            <p className="font-ui text-xs uppercase tracking-[0.24em] text-stone-600">
              &copy; {new Date().getFullYear()} {siteMeta.publisher}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-8">
            <div>
              <h4 className="mb-4 font-ui text-xs uppercase tracking-[0.28em] text-stone-200">
                Archive files
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
              <h4 className="mb-4 font-ui text-xs uppercase tracking-[0.28em] text-stone-200">
                Support routes
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
              <h4 className="mb-4 font-ui text-xs uppercase tracking-[0.28em] text-stone-200">
                Contact
              </h4>
              <ul className="space-y-3">
                {contactLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-stone-500">
                {siteMeta.contactAddress.join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
