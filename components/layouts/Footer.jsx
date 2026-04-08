"use client";

import { contactLinks, missionNav, supportLinks } from "@/lib/constants";
import { siteMeta } from "@/lib/content";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Container } from "../ui/Container";

function FooterLink({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center text-sm text-stone-400 transition-all duration-200 hover:translate-x-1 hover:text-stone-50"
      >
        <span className="mr-0 group-hover:mr-2 opacity-0 text-accent transition-all duration-300 ease-in-out group-hover:opacity-100 w-0 group-hover:w-auto">
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
    <footer className="relative overflow-hidden border-t border-white/6 bg-stone-950 py-12 text-stone-300 lg:pt-20 lg:pb-5">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-dark opacity-16"
      />

      <div
        ref={lineRef}
        className="absolute inset-x-0 top-0 flex justify-center"
      ></div>

      <Container className="relative z-2">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image
              src="/imgs/logo-f.png"
              alt="Logo"
              width={400}
              height={400}
              className="h-28 lg:h-32 w-auto mb-4"
            />
            <p className="lg:mb-5 max-w-md text-sm leading-relaxed text-stone-400">
              {siteMeta.description}
            </p>
          </div>

          <div className="grid gap-8 grid-cols-[40%_auto] md:grid-cols-3 lg:col-span-8">
            <div>
              <h4 className="mb-4 font-ui text-xs uppercase tracking-[0.28em] text-stone-200">
                Archive files
              </h4>
              <ul className="space-y-3">
                {archiveLinks.slice(1).map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
            </div>

            <div className="max-md:border-s border-s-white/10 max-md:pl-5">
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

            <div className="max-md:col-span-2 max-md:border-t border-t-white/10 max-md:pt-5">
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
          <div className="border-t border-t-white/10 pt-8 col-span-12 flex flex-col lg:flex-row gap-2 lg:gap-4 items-center">
            <p className="font-ui text-xs uppercase tracking-[0.24em] text-stone-600">
              &copy; {new Date().getFullYear()} All Rights Reserved
            </p>
            <span className="hidden lg:block w-10 h-px bg-white/10" />
            <p className="font-ui text-xs uppercase tracking-[0.24em] text-stone-600">
              {siteMeta.publisher}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
