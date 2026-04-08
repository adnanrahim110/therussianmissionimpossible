import { ArchiveHome } from "@/components/archive/ArchiveHome";
import { siteMeta } from "@/lib/content";

export const metadata = {
  title: "Operation Stream 3.0: The Russian Mission Impossible",
  description:
    "Explore the official documentary archive of Operation Stream 3.0, including mission phases, tactical context, witness accounts, and publication access.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Operation Stream 3.0: The Russian Mission Impossible",
    description:
      "Explore the official documentary archive of Operation Stream 3.0, including mission phases, tactical context, witness accounts, and publication access.",
    type: "website",
    images: [
      {
        url: "/imgs/logo-f.png",
        alt: siteMeta.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Operation Stream 3.0: The Russian Mission Impossible",
    description:
      "Explore the official documentary archive of Operation Stream 3.0, including mission phases, tactical context, witness accounts, and publication access.",
    images: ["/imgs/logo-f.png"],
  },
};

export default function Home() {
  return <ArchiveHome />;
}
