import type { Metadata } from "next";
import { AnatomyHero } from "@/components/anatomy/AnatomyHero";
import { OrganGrid } from "@/components/anatomy/OrganGrid";
import { SectionHeader } from "@/components/SectionHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { organs } from "@/lib/content/organs";

export const metadata: Metadata = {
  title: "Anatomy Explorer | ScanWise",
  description:
    "Explore organs commonly mentioned in CT and ultrasound reports, including liver, kidney, thyroid, gallbladder, lungs, and abdomen."
};

export default function AnatomyPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <AnatomyHero />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8">
          <SectionHeader
            eyebrow="Explore"
            title="Organs in radiology reports"
            body="Choose an organ to see common CT findings, ultrasound findings, report wording, and doctor questions."
          />
        </div>
        <OrganGrid organs={organs} />
      </section>
      <SiteFooter />
    </main>
  );
}
