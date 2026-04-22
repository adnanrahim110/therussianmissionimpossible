import { siteMeta } from "./archive-data";

export function buildMetadata({
  title,
  description,
  path,
  image = "/imgs/logo-f.png",
  type = "website",
}) {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      type,
      images: [
        {
          url: image,
          alt: title || siteMeta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

