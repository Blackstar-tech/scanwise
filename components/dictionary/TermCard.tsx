import Link from "next/link";
import { ArrowRight, BookMarked } from "lucide-react";
import type { DictionaryTerm } from "@/lib/content/dictionary";

export function TermCard({ term }: { term: DictionaryTerm }) {
  return (
    <article className="surface-card group p-5 hover:-translate-y-0.5 hover:border-medical-blue/40">
      <div className="icon-tile mb-5 size-11">
        <BookMarked aria-hidden="true" size={20} />
      </div>
      <h3 className="text-lg font-semibold heading-text">
        <Link href={`/dictionary/${term.slug}`} className="focus-ring rounded-xl">
          {term.term}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-6 body-text">{term.simpleDefinition}</p>
      <Link
        href={`/dictionary/${term.slug}`}
        className="focus-ring mt-5 inline-flex items-center gap-2 rounded-xl text-sm font-semibold text-medical-blue transition-colors hover:text-medical-blue-dark dark:text-sky-300 dark:hover:text-sky-200"
      >
        Open term
        <ArrowRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </article>
  );
}
