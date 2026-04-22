import { dossiers, routeCatalog } from "@/lib/archive-data";

export const dynamic = "force-static";

function resolveBaseUrl() {
  const fallback = "https://operationpipe.com";
  const value = process.env.NEXT_PUBLIC_SITE_URL;

  if (!value) return fallback;

  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    return url.toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

const BASE_URL = resolveBaseUrl();

export default function sitemap() {
  const lastModified = new Date();
  const dossierRoutes = dossiers.map((dossier) => ({
    path: `/personnel/dossiers/${dossier.slug}`,
    priority: 0.65,
    changeFrequency: "monthly",
  }));

  return [...routeCatalog, ...dossierRoutes].map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
