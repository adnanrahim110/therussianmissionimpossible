import { SiteShell } from "@/components/layouts/SiteShell";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin", "cyrillic"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin", "cyrillic"],
});

export const metadata = {
  title: "Operation Stream 3.0",
  description: "A cinematic, content-rich promotional website for the non-fiction war book 'Operation Stream 3.0, or the Russian Mission Impossible'.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${playfair.variable} ${sourceSans.variable} antialiased font-body bg-stone-50 text-stone-950`}
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
