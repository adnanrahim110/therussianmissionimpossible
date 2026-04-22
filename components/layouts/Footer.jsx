import {
  ArchiveInlineIcon,
  getRouteIconKey,
} from "@/components/ui/archive/ArchiveIcons";
import { archiveFiles, siteMeta, supportRoutes } from "@/lib/archive-data";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../ui/Container";

function FooterLink({ href, iconKey, children }) {
  return (
    <li className="list-none">
      <Link href={href} className="footer-link-premium group">
        <span className="inline-flex min-w-0 items-center gap-3">
          {iconKey ? (
            <ArchiveInlineIcon
              iconKey={iconKey}
              size={15}
              className="footer-link-premium-icon"
            />
          ) : null}
          <span className="truncate">{children}</span>
        </span>
        <ArchiveInlineIcon
          iconKey="next"
          size={15}
          className="footer-link-premium-arrow"
        />
      </Link>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-(--border-soft) bg-[linear-gradient(180deg,rgba(13,23,30,0.98),rgba(18,31,40,0.99))] py-12 text-(--text-primary) lg:py-16">
      <div className="pointer-events-none absolute inset-0 archive-grid-overlay opacity-25" />
      <div className="pointer-events-none absolute inset-x-[8%] top-0 h-40 bg-[radial-gradient(circle_at_center,rgba(242,13,13,0.09),transparent_72%)] blur-[100px]" />
      <Container className="relative z-10">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)_minmax(0,0.78fr)]">
          <div>
            <Link href="/" className="flex items-end gap-3 mt-3">
              <Image
                src="/imgs/logo.png"
                alt={siteMeta.shortTitle}
                width={220}
                height={220}
                className="h-20 w-auto md:h-38"
              />
              <div className="hidden min-[1180px]:block pb-3">
                <p className="font-ui text-sm uppercase tracking-[0.3em] text-(--text-muted)">
                  Operation
                </p>
                <p className="archive-title-nav font-heading text-white text-5xl!">
                  Stream 3.0
                </p>
              </div>
            </Link>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-(--text-soft)">
              {siteMeta.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-(--border-soft) bg-(--surface-chip) px-4 py-2 font-ui text-[10px] uppercase tracking-[0.24em] text-(--text-muted)">
                Declassified archive
              </span>
              <span className="rounded-full border border-accent/10 bg-(--surface-chip-accent) px-4 py-2 font-ui text-[10px] uppercase tracking-[0.24em] text-(--text-soft)">
                Mission access
              </span>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-ui text-[11px] uppercase tracking-[0.3em] text-(--text-muted)">
                Archive files
              </p>
              <ul className="mt-4 space-y-2">
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
              <p className="font-ui text-[11px] uppercase tracking-[0.3em] text-(--text-muted)">
                Support routes
              </p>
              <ul className="mt-4 space-y-2">
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
            <p className="font-ui text-[11px] uppercase tracking-[0.3em] text-(--text-muted)">
              Publisher
            </p>
            <p className="mt-4 inline-flex items-center gap-3 text-base leading-relaxed text-(--text-soft)">
              <ArchiveInlineIcon
                iconKey="publisher"
                size={18}
                className="text-(--text-muted)"
              />
              {siteMeta.publisher}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-(--text-soft) md:text-base">
              Rights, press, and archive correspondence are routed through the
              contact desk rather than listed as a public office address.
            </p>
            <div className="mt-6 space-y-2">
              <FooterLink
                href={`mailto:${siteMeta.contactEmail}`}
                iconKey="contact"
              >
                {siteMeta.contactEmail}
              </FooterLink>
              <FooterLink href="/contact" iconKey="contact">
                Open Contact Desk
              </FooterLink>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-(--border-soft) pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-ui text-[11px] uppercase tracking-[0.28em] text-(--text-muted)">
            &copy; {new Date().getFullYear()} {siteMeta.shortTitle}
          </p>
          <p className="font-ui text-[10px] uppercase tracking-[0.28em] text-(--text-faint)">
            Declassified archive edition
          </p>
        </div>
      </Container>
    </footer>
  );
}
