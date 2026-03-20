import { SiteShell } from "@/components/layouts/SiteShell";
import { siteMeta } from "@/lib/content";
import { Bebas_Neue, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "leaflet/dist/leaflet.css";
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

export const metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
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
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
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
        className={`${bebasNeue.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} bg-stone-950 font-body text-stone-50 antialiased`}
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
