import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Article } from "@/lib/content/articles";

export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <article className="grid gap-6 rounded-[20px] border border-medical-blue/20 bg-medical-blue p-6 text-white shadow-[0_24px_70px_rgba(21,94,239,0.26)] md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-sm font-semibold text-blue-50">
          <Sparkles aria-hidden="true" size={16} />
          Featured guide
        </p>
        <h2 className="max-w-2xl text-2xl font-semibold leading-tight sm:text-3xl">
          {article.title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-blue-50 sm:text-base sm:leading-7">
          {article.description}
        </p>
      </div>
      <Link
        href={`/blog/${article.slug}`}
        className="focus-ring inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-medical-blue-dark transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50"
      >
        Read now
        <ArrowRight aria-hidden="true" size={16} />
      </Link>
    </article>
  );
}
