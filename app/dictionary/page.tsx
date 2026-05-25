import type { Metadata } from "next";
import { DictionaryHero } from "@/components/dictionary/DictionaryHero";
import { TermCard } from "@/components/dictionary/TermCard";
import { TermSearch } from "@/components/dictionary/TermSearch";
import { SectionHeader } from "@/components/SectionHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { searchDictionaryTerms } from "@/lib/content/dictionary";

export const metadata: Metadata = {
  title: "Scan Dictionary | ScanWise",
  description:
    "Plain English definitions for common CT and ultrasound report terms."
};

export default async function DictionaryPage({
  searchParams
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const query = (await searchParams)?.q ?? "";
  const terms = searchDictionaryTerms(query);

  return (
    <main className="page-shell">
      <SiteHeader />
      <DictionaryHero />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Dictionary"
            title={query ? `Results for "${query}"` : "Common scan terms"}
            body="Search report words and open a term page for CT meaning, ultrasound meaning, examples, and doctor questions."
          />
          <TermSearch defaultValue={query} />
        </div>

        {terms.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {terms.map((term) => (
              <TermCard key={term.slug} term={term} />
            ))}
          </div>
        ) : (
          <p className="surface-muted p-5 text-sm body-text">
            No terms matched that search. Try cyst, nodule, lesion, contrast, or calcification.
          </p>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
