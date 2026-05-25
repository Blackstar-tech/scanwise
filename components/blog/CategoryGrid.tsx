import Link from "next/link";
import { ArrowRight, ScanSearch } from "lucide-react";
import { articleCategories, getArticlesByCategory } from "@/lib/content/articles";

export function CategoryGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {articleCategories.map((category) => {
        const count = getArticlesByCategory(category.slug).length;

        return (
          <Link
            key={category.slug}
            href={`/learn/${category.slug}`}
            className="surface-card group p-6 hover:-translate-y-0.5 hover:border-medical-blue/40"
          >
            <div className="icon-tile mb-5 size-12">
              <ScanSearch aria-hidden="true" size={22} />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold heading-text">{category.title}</h3>
                <p className="mt-2 text-sm leading-6 body-text">{category.description}</p>
              </div>
              <ArrowRight
                aria-hidden="true"
                className="mt-1 shrink-0 text-medical-blue transition-transform group-hover:translate-x-0.5 dark:text-sky-300"
                size={18}
              />
            </div>
            <p className="mt-5 text-sm font-semibold eyebrow-text">{count} guides</p>
          </Link>
        );
      })}
    </div>
  );
}
