import { archiveFiles, supportRoutes } from "./archive";

export const routeCatalog = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  ...archiveFiles.map((file) => ({
    path: file.href,
    priority: 0.9,
    changeFrequency: "weekly",
  })),
  {
    path: "/personnel/authors",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/personnel/dossiers",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  ...supportRoutes.map((route) => ({
    path: route.href,
    priority: 0.7,
    changeFrequency: "monthly",
  })),
  { path: "/authors", priority: 0.4, changeFrequency: "monthly" },
  { path: "/bio", priority: 0.4, changeFrequency: "monthly" },
];
