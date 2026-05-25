import type { Metadata } from "next";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { BlogHero } from "@/components/blog/BlogHero";
import { CategoryGrid } from "@/components/blog/CategoryGrid";
import { FeaturedArticle } from "@/components/blog/FeaturedArticle";
import { SearchBar } from "@/components/blog/SearchBar";
import { SectionHeader } from "@/components/SectionHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getFeaturedArticles, searchArticles } from "@/lib/content/articles";

export const metadata: Metadata = {
  title: "Learn CT and Ultrasound Reports | ScanWise",
  description:
    "Patient-friendly CT, ultrasound, and radiology finding guides from ScanWise."
};

export default async function LearnPage({
  searchParams
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params?.q ?? "";
  const articles = searchArticles(query);
  const [featuredArticle] = getFeaturedArticles();

  return (
    <main className="page-shell">
      <SiteHeader />
      <BlogHero
        title="Learn CT and ultrasound reports in plain English"
        body="Browse ScanWise guides for imaging basics, preparation, report terms, and common findings. Every page is educational and designed to support better clinician conversations."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Browse topics"
            title="Choose a learning path"
            body="Start with CT, ultrasound, or common findings."
          />
          <SearchBar defaultValue={query} />
        </div>
        <CategoryGrid />
      </section>

      {featuredArticle && !query ? (
        <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
          <FeaturedArticle article={featuredArticle} />
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-normal eyebrow-text">
            {query ? "Search results" : "All guides"}
          </p>
          <h2 className="mt-2 text-2xl font-semibold heading-text">
            {query ? `Results for "${query}"` : "Latest learning guides"}
          </h2>
        </div>
        {articles.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <p className="surface-muted p-5 text-sm body-text">
            No guides matched that search. Try a term like CT, ultrasound, liver, cyst, or nodule.
          </p>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
