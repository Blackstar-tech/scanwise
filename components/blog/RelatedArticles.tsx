import type { Article } from "@/lib/content/articles";
import { ArticleCard } from "@/components/blog/ArticleCard";

export function RelatedArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-normal eyebrow-text">Keep learning</p>
        <h2 className="mt-2 text-2xl font-semibold heading-text">Related articles</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
