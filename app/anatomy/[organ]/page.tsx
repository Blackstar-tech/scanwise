import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrganDetail } from "@/components/anatomy/OrganDetail";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getOrganBySlug, organs } from "@/lib/content/organs";

type OrganPageProps = {
  params: Promise<{ organ: string }>;
};

export function generateStaticParams() {
  return organs.map((organ) => ({ organ: organ.slug }));
}

export async function generateMetadata({ params }: OrganPageProps): Promise<Metadata> {
  const { organ: organSlug } = await params;
  const organ = getOrganBySlug(organSlug);

  if (!organ) {
    return {
      title: "Organ Not Found | ScanWise"
    };
  }

  return {
    title: `${organ.name} Anatomy Explorer | ScanWise`,
    description: organ.shortDescription
  };
}

export default async function OrganPage({ params }: OrganPageProps) {
  const { organ: organSlug } = await params;
  const organ = getOrganBySlug(organSlug);

  if (!organ) {
    notFound();
  }

  return (
    <main className="page-shell">
      <SiteHeader />
      <OrganDetail organ={organ} />
      <SiteFooter />
    </main>
  );
}
