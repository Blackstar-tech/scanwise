import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import type { Article } from "@/lib/content/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="surface-card group flex h-full flex-col p-5">
      <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-normal">
        <span className="eyebrow-text">{article.categoryLabel}</span>
        <span className="inline-flex items-center gap-1 subtle-text">
          <Clock3 aria-hidden="true" size={14} />
          {article.readingTime}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold leading-7 heading-text">
        <Link href={`/blog/${article.slug}`} className="focus-ring rounded-xl">
          {article.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 body-text">{article.summary}</p>
      <Link
        href={`/blog/${article.slug}`}
        className="focus-ring mt-5 inline-flex items-center gap-2 rounded-xl text-sm font-semibold text-medical-blue transition-colors hover:text-medical-blue-dark dark:text-sky-300 dark:hover:text-sky-200"
      >
        Read article
        <ArrowRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </article>
  );
}
