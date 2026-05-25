import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { BlogHero } from "@/components/blog/BlogHero";
import { SearchBar } from "@/components/blog/SearchBar";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  articleCategories,
  getArticlesByCategory,
  getCategoryBySlug
} from "@/lib/content/articles";

type LearnCategoryPageProps = {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ q?: string }>;
};

export function generateStaticParams() {
  return articleCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params
}: LearnCategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: "Learning Category Not Found | ScanWise"
    };
  }

  return {
    title: `${category.title} | ScanWise`,
    description: category.description
  };
}

export default async function LearnCategoryPage({
  params,
  searchParams
}: LearnCategoryPageProps) {
  const { category: categorySlug } = await params;
  const query = (await searchParams)?.q?.trim() ?? "";
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const articles = getArticlesByCategory(category.slug).filter((article) =>
    query
      ? [article.title, article.summary, article.description, ...article.keyTakeaways]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      : true
  );

  return (
    <main className="page-shell">
      <SiteHeader />
      <BlogHero eyebrow={category.title} title={category.title} body={category.description} />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal eyebrow-text">
              {query ? "Filtered guides" : "Guides"}
            </p>
            <h2 className="mt-2 text-2xl font-semibold heading-text">
              {query ? `Results for "${query}"` : category.title}
            </h2>
          </div>
          <SearchBar
            action={`/learn/${category.slug}`}
            defaultValue={query}
            placeholder={`Search ${category.title.toLowerCase()}`}
          />
        </div>

        {articles.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <p className="surface-muted p-5 text-sm body-text">
            No guides matched that search in this category.
          </p>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
