import Link from "next/link";
import type { DictionaryTerm } from "@/lib/content/dictionary";

export function RelatedTerms({ terms }: { terms: DictionaryTerm[] }) {
  if (terms.length === 0) {
    return null;
  }

  return (
    <section className="surface-card p-6">
      <h2 className="text-xl font-semibold heading-text">Related terms</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {terms.map((term) => (
          <Link
            key={term.slug}
            href={`/dictionary/${term.slug}`}
            className="focus-ring rounded-full bg-ice-blue px-3 py-1.5 text-sm font-semibold text-medical-blue-dark transition-colors hover:bg-blue-100 dark:bg-sky-400/10 dark:text-sky-200 dark:hover:bg-sky-400/20"
          >
            {term.term}
          </Link>
        ))}
      </div>
    </section>
  );
}
