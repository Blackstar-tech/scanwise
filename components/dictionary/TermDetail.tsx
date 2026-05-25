import { HelpCircle, Quote, ScanLine } from "lucide-react";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { RelatedTerms } from "@/components/dictionary/RelatedTerms";
import { getRelatedTerms, type DictionaryTerm } from "@/lib/content/dictionary";

export function TermDetail({ term }: { term: DictionaryTerm }) {
  const relatedTerms = getRelatedTerms(term);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="space-y-4">
          <section className="surface-card p-6">
            <p className="text-sm font-semibold uppercase tracking-normal eyebrow-text">Dictionary term</p>
            <h1 className="mt-2 text-3xl font-semibold heading-text">{term.term}</h1>
            <p className="mt-4 text-base leading-7 body-text">{term.simpleDefinition}</p>
          </section>
          <MedicalDisclaimer compact />
          <RelatedTerms terms={relatedTerms} />
        </aside>

        <div className="space-y-4">
          <section className="grid gap-4 md:grid-cols-2">
            <MeaningCard title="Meaning in CT reports" body={term.ctMeaning} />
            <MeaningCard title="Meaning in ultrasound reports" body={term.ultrasoundMeaning} />
          </section>

          <section className="surface-card p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="icon-tile size-10">
                <Quote aria-hidden="true" size={19} />
              </div>
              <h2 className="text-xl font-semibold heading-text">Example report sentence</h2>
            </div>
            <p className="rounded-2xl bg-ice-blue p-4 text-sm leading-6 text-medical-blue-dark dark:bg-sky-400/10 dark:text-sky-100">
              {term.exampleSentence}
            </p>
          </section>

          <section className="surface-card p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="icon-tile size-10">
                <ScanLine aria-hidden="true" size={19} />
              </div>
              <h2 className="text-xl font-semibold heading-text">Related findings</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {term.relatedFindings.map((finding) => (
                <span
                  key={finding}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-200"
                >
                  {finding}
                </span>
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
              {term.questions.map((question) => (
                <li key={question} className="surface-muted px-4 py-3 text-sm leading-6 body-text">
                  {question}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

function MeaningCard({ title, body }: { title: string; body: string }) {
  return (
    <section className="surface-card p-6">
      <h2 className="text-xl font-semibold heading-text">{title}</h2>
      <p className="mt-4 text-sm leading-6 body-text">{body}</p>
    </section>
  );
}
