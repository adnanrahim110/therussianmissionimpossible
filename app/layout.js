import { SiteShell } from "@/components/layouts/SiteShell";
import { siteMeta } from "@/lib/archive-data";
import { Bebas_Neue, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

function resolveMetadataBase() {
  const fallback = "https://operationpipe.com";
  const value = process.env.NEXT_PUBLIC_SITE_URL;

  if (!value) return new URL(fallback);

  try {
    return new URL(value.startsWith("http") ? value : `https://${value}`);
  } catch {
    return new URL(fallback);
  }
}

export const metadata = {
  metadataBase: resolveMetadataBase(),
  title: {
    default: `${siteMeta.shortTitle} | ${siteMeta.title}`,
    template: "%s",
  },
  description: siteMeta.description,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Operation Stream 3.0",
    "The Russian Mission Impossible",
    "Kursk",
    "Sudzha",
    "gas pipeline",
    "documentary narrative",
    "modern warfare",
    "CGG International",
  ],
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/imgs/logo-f.png",
        alt: siteMeta.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
    images: ["/imgs/logo-f.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: siteMeta.title,
    description: siteMeta.description,
    publisher: {
      "@type": "Organization",
      name: siteMeta.publisher,
    },
    inLanguage: "en",
    genre: "Documentary narrative",
    bookFormat: "https://schema.org/Hardcover",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${bebasNeue.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} font-body antialiased`}
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
