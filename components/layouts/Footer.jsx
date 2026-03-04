"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "The Book", href: "/book" },
  { label: "Authors", href: "/authors" },
  { label: "Contact", href: "/contact" },
];

const CONNECT_LINKS = [
  { label: "Contact Us", href: "/contact" },
  { label: "Publisher Info", href: "#" },
];

function FooterLink({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center text-sm text-stone-400 hover:text-stone-50 transition-all duration-200 hover:translate-x-1"
      >
        <span className="opacity-0 group-hover:opacity-100 transition-opacity mr-2 text-crimson-500">
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

  return (
    <footer className="relative bg-stone-950 text-stone-400 py-16 lg:py-24 overflow-hidden">
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-heading font-black text-mega text-stone-900/40 whitespace-nowrap">
          OPERATION STREAM
        </span>
      </div>

      <div
        ref={lineRef}
        className="absolute top-0 inset-x-0 flex justify-center"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isLineInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-1 w-full bg-crimson-600 origin-center"
        />
      </div>

      <div className="container-default relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <h3 className="font-heading text-xl text-stone-50 mb-4 tracking-tight">
              Operation Stream{" "}
              <span className="text-crimson-500 text-sm align-super">3.0</span>
            </h3>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              A documentary war prose account of the Russian Mission Impossible.
              The definitive record of 215 days beneath the earth.
            </p>
            <p className="text-xs text-stone-600">
              &copy; {new Date().getFullYear()} CGG International W.L.L. All
              rights reserved.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-stone-50 font-semibold mb-4 tracking-wide text-xs uppercase">
                Navigation
              </h4>
              <ul className="space-y-3 -ml-5">
                {FOOTER_LINKS.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-stone-50 font-semibold mb-4 tracking-wide text-xs uppercase">
                Connect
              </h4>
              <ul className="space-y-3 -ml-5">
                {CONNECT_LINKS.map((link) => (
                  <FooterLink key={link.label} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-stone-50 font-semibold mb-4 tracking-wide text-xs uppercase">
                Publisher
              </h4>
              <p className="text-sm text-stone-500 leading-relaxed">
                CGG International W.L.L.
                <br />
                Manama, Kingdom of Bahrain
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
