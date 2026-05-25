import Link from "next/link";
import { BookOpenText, HelpCircle, Quote } from "lucide-react";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { CommonFindings } from "@/components/anatomy/CommonFindings";
import { getArticleBySlug, type Article } from "@/lib/content/articles";
import { getDictionaryTermBySlug, type DictionaryTerm } from "@/lib/content/dictionary";
import type { Organ } from "@/lib/content/organs";

export function OrganDetail({ organ }: { organ: Organ }) {
  const relatedArticles = organ.relatedArticleSlugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Article => Boolean(article));
  const relatedTerms = organ.relatedDictionarySlugs
    .map((slug) => getDictionaryTermBySlug(slug))
    .filter((term): term is DictionaryTerm => Boolean(term));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="space-y-4">
          <section className="surface-card p-6">
            <p className="text-sm font-semibold uppercase tracking-normal eyebrow-text">Organ overview</p>
            <h1 className="mt-2 text-3xl font-semibold heading-text">{organ.name}</h1>
            <p className="mt-4 text-sm leading-6 body-text">{organ.overview}</p>
          </section>

          <section className="surface-card p-6">
            <h2 className="text-xl font-semibold heading-text">What it does</h2>
            <ul className="mt-4 grid gap-3">
              {organ.whatItDoes.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 body-text">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-medical-blue dark:bg-sky-300" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <MedicalDisclaimer compact />
        </aside>

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <CommonFindings title="Common CT findings" findings={organ.commonCtFindings} />
            <CommonFindings title="Common ultrasound findings" findings={organ.commonUltrasoundFindings} />
          </div>

          <section className="surface-card p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="icon-tile size-10">
                <Quote aria-hidden="true" size={19} />
              </div>
              <h2 className="text-xl font-semibold heading-text">Example report wording</h2>
            </div>
            <div className="grid gap-3">
              {organ.exampleReportWording.map((example) => (
                <p key={example} className="rounded-2xl bg-ice-blue p-4 text-sm leading-6 text-medical-blue-dark dark:bg-sky-400/10 dark:text-sky-100">
                  {example}
                </p>
              ))}
            </div>
          </section>

          <section className="surface-card p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="icon-tile size-10">
                <HelpCircle aria-hidden="true" size={19} />
              </div>
              <h2 className="text-xl font-semibold heading-text">Questions to ask your doctor</h2>
            </div>
            <ul className="grid gap-3">
              {organ.questions.map((question) => (
                <li key={question} className="surface-muted px-4 py-3 text-sm leading-6 body-text">
                  {question}
                </li>
              ))}
            </ul>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <div className="surface-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <BookOpenText aria-hidden="true" className="text-medical-blue dark:text-sky-300" size={19} />
                <h2 className="font-semibold heading-text">Related articles</h2>
              </div>
              <div className="grid gap-2">
                {relatedArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="focus-ring rounded-xl px-3 py-2 text-sm font-semibold text-medical-blue transition-colors hover:bg-ice-blue dark:text-sky-300 dark:hover:bg-white/10"
                  >
                    {article.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="surface-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <BookOpenText aria-hidden="true" className="text-medical-blue dark:text-sky-300" size={19} />
                <h2 className="font-semibold heading-text">Related terms</h2>
              </div>
              <div className="grid gap-2">
                {relatedTerms.map((term) => (
                  <Link
                    key={term.slug}
                    href={`/dictionary/${term.slug}`}
                    className="focus-ring rounded-xl px-3 py-2 text-sm font-semibold text-medical-blue transition-colors hover:bg-ice-blue dark:text-sky-300 dark:hover:bg-white/10"
                  >
                    {term.term}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
