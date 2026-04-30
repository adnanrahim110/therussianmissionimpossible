import Image from "next/image";
import Link from "next/link";

import {
  ArchiveInlineIcon,
  getRouteIconKey,
} from "@/components/ui/archive/ArchiveIcons";
import { archiveFiles, siteMeta, supportRoutes } from "@/lib/archive-data";

import { Container } from "../ui/Container";

function FooterLink({ href, iconKey, children }) {
  return (
    <li className="list-none">
      <Link
        href={href}
        className="group flex items-center justify-between gap-3 py-2 font-ui text-[12px] uppercase tracking-[0.18em] text-stone-300 transition-colors hover:text-white"
      >
        <span className="inline-flex min-w-0 items-center gap-3">
          {iconKey ? (
            <ArchiveInlineIcon
              iconKey={iconKey}
              size={14}
              className="text-stone-500 transition-colors group-hover:text-rose-300"
            />
          ) : null}
          <span className="truncate">{children}</span>
        </span>
        <ArchiveInlineIcon
          iconKey="next"
          size={14}
          className="text-stone-600 transition-[transform,color] group-hover:translate-x-1 group-hover:text-rose-300"
        />
      </Link>
    </li>
  );
}

function ColumnHeader({ code, label }) {
  return (
    <div className="flex items-center gap-3 font-ui text-[10px] uppercase tracking-[0.32em] text-stone-400">
      <span className="font-medium text-stone-300">{code}</span>
      <span aria-hidden="true" className="h-px w-8 bg-white/15" />
      <span>{label}</span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-stone-950 py-12 text-stone-100 lg:py-16">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 100%)",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rose-500/30 to-transparent"
      />

      <Container className="relative">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)_minmax(0,0.78fr)]">
          <div>
            <Link href="/" className="flex items-end gap-3">
              <Image
                src="/imgs/logo.png"
                alt={siteMeta.shortTitle}
                width={220}
                height={220}
                className="h-20 w-auto md:h-32"
              />
              <div className="hidden pb-2 min-[1180px]:block">
                <p className="font-ui text-[10px] uppercase tracking-[0.32em] text-stone-400">
                  Operation
                </p>
                <p className="font-heading text-4xl font-bold text-white">
                  Stream 3.0
                </p>
              </div>
            </Link>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-stone-300 md:text-base">
              {siteMeta.description}
            </p>
            <div className="mt-6 flex items-center gap-3 font-ui text-[10px] uppercase tracking-[0.28em] text-rose-200">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(242,13,13,0.7)] animate-pulse"
              />
              Declassified archive · Mission access open
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <ColumnHeader code="01" label="Archive Files" />
              <ul className="mt-4 divide-y divide-white/5">
                {archiveFiles.map((file) => (
                  <FooterLink
                    key={file.href}
                    href={file.href}
                    iconKey={file.iconKey ?? getRouteIconKey(file.href)}
                  >
                    {file.label}
                  </FooterLink>
                ))}
              </ul>
            </div>

            <div>
              <ColumnHeader code="02" label="Support Routes" />
              <ul className="mt-4 divide-y divide-white/5">
                {supportRoutes.map((route) => (
                  <FooterLink
                    key={route.href}
                    href={route.href}
                    iconKey={route.iconKey ?? getRouteIconKey(route.href)}
                  >
                    {route.label}
                  </FooterLink>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <ColumnHeader code="03" label="Publisher" />
            <p className="mt-4 inline-flex items-center gap-3 text-sm leading-relaxed text-stone-200 md:text-base">
              <ArchiveInlineIcon
                iconKey="publisher"
                size={16}
                className="text-stone-500"
              />
              {siteMeta.publisher}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-400">
              Rights, press, and archive correspondence are routed through the
              contact desk rather than listed as a public office address.
            </p>
            <ul className="mt-5 divide-y divide-white/5">
              <FooterLink
                href={`mailto:${siteMeta.contactEmail}`}
                iconKey="contact"
              >
                {siteMeta.contactEmail}
              </FooterLink>
              <FooterLink href="/contact" iconKey="contact">
                Open Contact Desk
              </FooterLink>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-ui text-[10px] uppercase tracking-[0.28em] text-stone-400">
            &copy; {new Date().getFullYear()} {siteMeta.shortTitle}
          </p>
          <p className="font-ui text-[10px] uppercase tracking-[0.28em] text-stone-500">
            Declassified archive edition
          </p>
        </div>
      </Container>
    </footer>
  );
}
