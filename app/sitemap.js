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

const ROUTES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/book", priority: 0.9, changeFrequency: "weekly" },
  { path: "/authors", priority: 0.8, changeFrequency: "monthly" },
  { path: "/bio", priority: 0.8, changeFrequency: "monthly" },
  { path: "/press", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap() {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
