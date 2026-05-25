import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { articles, getArticleBySlug, getRelatedArticles } from "@/lib/content/articles";
import { getDictionaryTermBySlug, type DictionaryTerm } from "@/lib/content/dictionary";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | ScanWise"
    };
  }

  return {
    title: `${article.title} | ScanWise`,
    description: article.summary
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article);
  const relatedTerms = article.terms
    .map((termSlug) => getDictionaryTermBySlug(termSlug))
    .filter((term): term is DictionaryTerm => Boolean(term));

  return (
    <main className="page-shell">
      <SiteHeader />

      <article>
        <header className="border-b border-line/80 bg-white transition-colors duration-300 dark:border-white/10 dark:bg-[#0b1728]">
          <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
            <Link
              href={`/learn/${article.category}`}
              className="focus-ring inline-flex items-center gap-2 rounded-xl text-sm font-semibold text-medical-blue transition-colors hover:text-medical-blue-dark dark:text-sky-300 dark:hover:text-sky-200"
            >
              <ArrowLeft aria-hidden="true" size={16} />
              {article.categoryLabel} guides
            </Link>
            <p className="mt-6 text-sm font-semibold uppercase tracking-normal eyebrow-text">
              {article.categoryLabel}
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight heading-text sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 text-lg leading-8 body-text">{article.description}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm subtle-text">
              <span className="inline-flex items-center gap-2">
                <Clock3 aria-hidden="true" size={16} />
                {article.readingTime}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays aria-hidden="true" size={16} />
                Reviewed {article.lastReviewed}
              </span>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-8">
            <section className="surface-card p-6">
              <h2 className="text-xl font-semibold heading-text">Key takeaways</h2>
              <ul className="mt-4 grid gap-3">
                {article.keyTakeaways.map((takeaway) => (
                  <li key={takeaway} className="flex gap-3 text-sm leading-6 body-text">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-medical-blue dark:bg-sky-300" />
                    {takeaway}
                  </li>
                ))}
              </ul>
            </section>

            {article.sections.map((section) => (
              <section key={section.heading} className="surface-card p-6">
                <h2 className="text-xl font-semibold heading-text">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-6 body-text">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="mt-5 grid gap-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="surface-muted px-4 py-3 text-sm leading-6 body-text">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <MedicalDisclaimer />
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <section className="surface-card p-5">
              <h2 className="font-semibold heading-text">Related terms</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {relatedTerms.length > 0 ? (
                  relatedTerms.map((term) => (
                    <Link
                      key={term.slug}
                      href={`/dictionary/${term.slug}`}
                      className="focus-ring rounded-full bg-ice-blue px-3 py-1.5 text-sm font-semibold text-medical-blue-dark transition-colors hover:bg-blue-100 dark:bg-sky-400/10 dark:text-sky-200 dark:hover:bg-sky-400/20"
                    >
                      {term.term}
                    </Link>
                  ))
                ) : (
                  <p className="text-sm body-text">No related terms listed.</p>
                )}
              </div>
            </section>
          </aside>
        </div>
      </article>

      <RelatedArticles articles={relatedArticles} />
      <SiteFooter />
    </main>
  );
}
