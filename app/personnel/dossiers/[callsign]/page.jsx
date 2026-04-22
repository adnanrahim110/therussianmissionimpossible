import { PersonnelDossierDetail } from "@/components/archive/PersonnelDossierDetail";
import { dossiers, siteMeta } from "@/lib/archive-data";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return dossiers.map((dossier) => ({
    callsign: dossier.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { callsign } = await params;
  const dossier = dossiers.find((item) => item.slug === callsign);

  if (!dossier) return {};

  return buildMetadata({
    title: `"${dossier.callsign}" | ${siteMeta.title}`,
    description: `Declassified dossier for ${dossier.callsign}. ${dossier.summary}`,
    path: `/personnel/dossiers/${dossier.slug}`,
    image: dossier.photo || "/imgs/logo-f.png",
    type: "article",
  });
}

export default async function PersonnelDossierPage({ params }) {
  const { callsign } = await params;
  const dossier = dossiers.find((item) => item.slug === callsign);

  if (!dossier) notFound();

  return <PersonnelDossierDetail dossier={dossier} />;
}
