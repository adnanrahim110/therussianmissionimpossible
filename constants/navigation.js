import { bookLinks } from "./links";

export const primaryNav = [
  { label: "Archive", href: "/", iconKey: "archive" },
  { label: "Mission", href: "/mission", iconKey: "mission" },
  { label: "Operation", href: "/operation", iconKey: "operation" },
  { label: "Evidence", href: "/evidence", iconKey: "evidence" },
  { label: "Tunnel", href: "/tunnel", iconKey: "tunnel" },
  { label: "The Stream Team", href: "/personnel", iconKey: "personnel" },
];

export const utilityNav = [
  { label: "Book", href: "/book", iconKey: "book" },
  { label: "Contact", href: "/contact", iconKey: "contact" },
];

export const purchaseCtas = {
  archive: { label: "Open Book File", href: "/book", iconKey: "book" },
  amazon: {
    label: "Purchase Book on Amazon",
    href: bookLinks.amazon,
    iconKey: "amazon",
  },
  operation: {
    label: "Review Operational Sequence",
    href: "/operation",
    iconKey: "operation",
  },
  instructions: {
    label: "Contact and Rights Desk",
    href: "/contact",
    iconKey: "contact",
  },
  press: { label: "Open Press Desk", href: "/press", iconKey: "press" },
  tunnel: { label: "Enter Tunnel Descent", href: "/tunnel", iconKey: "tunnel" },
};

export const headerContent = {
  operationLabel: "Operation",
  title: "Stream 3.0",
  buyButton: "Buy Book",
  menuOpen: "Menu",
  menuClose: "Close",
  menuOpenAria: "Open navigation",
  menuCloseAria: "Close navigation",
  mobileTitle: "Archive Routes",
  coreFilesLabel: "Core files",
  utilityRoutesLabel: "Utility routes",
  recommendedRouteLabel: "Recommended route",
  recommendedRouteTitle: "Tunnel Descent",
  recommendedRouteSummary:
    "This hidden, narrow gas pipeline became a symbol of resilience during Operation Stream 3.0, serving as a tactical route for Russian forces. The soldiers\u2019 journey through this confined, toxic space was a test of physical endurance and mental strength, enabling a surprise attack behind enemy lines.",
  recommendedRouteButton: "Open Tunnel",
};

export const footerContent = {
  operationLabel: "Operation",
  title: "Stream 3.0",
  status: "Declassified archive · Mission access open",
  archiveColumn: { code: "01", label: "Archive Files" },
  supportColumn: { code: "02", label: "Support Routes" },
  publisherColumn: { code: "03", label: "Publisher" },
  publisherNote:
    "Rights, press, and archive correspondence are routed through the contact desk rather than listed as a public office address.",
  edition: "Declassified archive edition",
};

export const footerArchiveLinks = primaryNav.filter((item) => item.href !== "/");

export const footerSupportLinks = [
  { label: "Book", href: "/book", iconKey: "book" },
  { label: "Press", href: "/press", iconKey: "press" },
  { label: "Contact", href: "/contact", iconKey: "contact" },
];
