import { cn } from "@/lib/utils";
import {
  IconAddressBook,
  IconArrowLeft,
  IconArrowRight,
  IconBook2,
  IconBrandAmazon,
  IconBuilding,
  IconBuildingTunnel,
  IconChevronRight,
  IconCompass,
  IconDeviceGamepad2,
  IconDirectionArrows,
  IconDoorEnter,
  IconFileDescription,
  IconFileSearch,
  IconFingerprintScan,
  IconFolderOpen,
  IconFolders,
  IconLayoutGrid,
  IconLockAccess,
  IconMail,
  IconMap2,
  IconMapPin,
  IconMenu2,
  IconPhoto,
  IconTimeline,
  IconUserHexagon,
  IconUserScan,
  IconUsers,
  IconVolume,
  IconVolumeOff,
  IconX,
  IconZoomIn,
} from "@tabler/icons-react";

function withArchiveStroke(Icon) {
  function ArchiveIcon(props) {
    return <Icon stroke={1.7} {...props} />;
  }

  ArchiveIcon.displayName = `Archive${Icon.displayName ?? Icon.name ?? "Icon"}`;
  return ArchiveIcon;
}

const iconRegistry = {
  access: withArchiveStroke(IconLockAccess),
  archive: withArchiveStroke(IconLayoutGrid),
  authors: withArchiveStroke(IconUsers),
  book: withArchiveStroke(IconBook2),
  breadcrumb: withArchiveStroke(IconChevronRight),
  close: withArchiveStroke(IconX),
  contact: withArchiveStroke(IconMail),
  dossiers: withArchiveStroke(IconUserHexagon),
  enter: withArchiveStroke(IconDoorEnter),
  evidence: withArchiveStroke(IconFileSearch),
  gallery: withArchiveStroke(IconPhoto),
  location: withArchiveStroke(IconMapPin),
  map: withArchiveStroke(IconMap2),
  menu: withArchiveStroke(IconMenu2),
  mission: withArchiveStroke(IconCompass),
  next: withArchiveStroke(IconArrowRight),
  open: withArchiveStroke(IconFolderOpen),
  operation: withArchiveStroke(IconTimeline),
  personnel: withArchiveStroke(IconUserScan),
  press: withArchiveStroke(IconFolders),
  previous: withArchiveStroke(IconArrowLeft),
  publisher: withArchiveStroke(IconBuilding),
  route: withArchiveStroke(IconDirectionArrows),
  soundOff: withArchiveStroke(IconVolumeOff),
  soundOn: withArchiveStroke(IconVolume),
  system: withArchiveStroke(IconFingerprintScan),
  tunnel: withArchiveStroke(IconBuildingTunnel),
  tunnelControl: withArchiveStroke(IconDeviceGamepad2),
  view: withArchiveStroke(IconZoomIn),
  witness: withArchiveStroke(IconFileDescription),
  personnelBranch: withArchiveStroke(IconAddressBook),
  amazon: withArchiveStroke(IconBrandAmazon),
};

export function getArchiveIcon(key) {
  if (!key) return null;
  return iconRegistry[key] ?? null;
}

export function getRouteIconKey(href = "") {
  if (!href || href === "/" || href.startsWith("/#")) return "archive";
  if (href.startsWith("/mission")) return "mission";
  if (href.startsWith("/operation")) return "operation";
  if (href.startsWith("/evidence")) return "evidence";
  if (href.startsWith("/tunnel")) return "tunnel";
  if (href.startsWith("/personnel/authors") || href === "/authors")
    return "authors";
  if (href.startsWith("/personnel/dossiers") || href.startsWith("/bio"))
    return "dossiers";
  if (href.startsWith("/personnel")) return "personnel";
  if (href.startsWith("/book")) return "book";
  if (href.startsWith("/press")) return "press";
  if (href.startsWith("/contact") || href.startsWith("mailto:"))
    return "contact";
  return "open";
}

export function ArchiveInlineIcon({
  iconKey,
  className,
  size = 18,
  stroke = 1.7,
}) {
  const Icon = getArchiveIcon(iconKey);

  if (!Icon) return null;

  return (
    <Icon
      aria-hidden="true"
      size={size}
      stroke={stroke}
      className={cn("shrink-0", className)}
    />
  );
}

const badgeToneClasses = {
  accent:
    "border-[color:rgba(242,13,13,0.26)] bg-[linear-gradient(180deg,rgba(242,13,13,0.14),rgba(17,28,36,0.92))] text-[color:var(--text-strong)] shadow-[0_18px_44px_rgba(242,13,13,0.12)]",
  muted:
    "border-[color:var(--border-soft)] bg-[linear-gradient(180deg,var(--surface-chip-strong),var(--surface-chip))] text-[color:var(--text-soft)]",
  panel:
    "border-[color:var(--border-soft)] bg-[linear-gradient(180deg,var(--surface-panel-alt),var(--surface-panel-alt-strong))] text-[color:var(--text-strong)] shadow-[0_20px_46px_rgba(6,12,18,0.16)]",
};

export function ArchiveIconBadge({
  iconKey,
  className,
  size = 18,
  tone = "panel",
}) {
  const Icon = getArchiveIcon(iconKey);

  if (!Icon) return null;

  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/50 backdrop-blur-sm",
        badgeToneClasses[tone] ?? badgeToneClasses.panel,
        className,
      )}
    >
      <Icon size={size} />
    </span>
  );
}
