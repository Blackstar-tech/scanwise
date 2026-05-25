import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TermDetail } from "@/components/dictionary/TermDetail";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  dictionaryTerms,
  getDictionaryTermBySlug
} from "@/lib/content/dictionary";

type DictionaryTermPageProps = {
  params: Promise<{ term: string }>;
};

export function generateStaticParams() {
  return dictionaryTerms.map((term) => ({ term: term.slug }));
}

export async function generateMetadata({
  params
}: DictionaryTermPageProps): Promise<Metadata> {
  const { term: termSlug } = await params;
  const term = getDictionaryTermBySlug(termSlug);

  if (!term) {
    return {
      title: "Dictionary Term Not Found | ScanWise"
    };
  }

  return {
    title: `${term.term} Meaning | ScanWise Dictionary`,
    description: term.simpleDefinition
  };
}

export default async function DictionaryTermPage({
  params
}: DictionaryTermPageProps) {
  const { term: termSlug } = await params;
  const term = getDictionaryTermBySlug(termSlug);

  if (!term) {
    notFound();
  }

  return (
    <main className="page-shell">
      <SiteHeader />
      <TermDetail term={term} />
      <SiteFooter />
    </main>
  );
}
