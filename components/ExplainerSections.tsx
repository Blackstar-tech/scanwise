import { HelpCircle, ListChecks, NotebookTabs, Stethoscope } from "lucide-react";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import type { ReportAnalysis } from "@/types/report";

export function ExplainerSections({ analysis }: { analysis: ReportAnalysis }) {
  return (
    <div className="space-y-4">
      <section className="surface-card p-6">
        <div className="mb-3 flex items-center gap-2">
          <NotebookTabs className="eyebrow-text" aria-hidden="true" size={20} />
          <h2 className="text-lg font-semibold heading-text">Summary</h2>
        </div>
        <p className="leading-7 text-slate-700 dark:text-slate-300">{analysis.summary}</p>
      </section>

      <section className="surface-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <ListChecks className="eyebrow-text" aria-hidden="true" size={20} />
          <h2 className="text-lg font-semibold heading-text">Important Findings</h2>
        </div>
        {analysis.importantFindings.length > 0 ? (
          <div className="space-y-3">
            {analysis.importantFindings.map((finding) => (
              <article key={`${finding.title}-${finding.plainEnglish}`} className="surface-muted p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold heading-text">{finding.title}</h3>
                  <span className="rounded-full bg-ice-blue px-3 py-1 text-xs font-semibold text-medical-blue-dark dark:bg-sky-400/10 dark:text-sky-200">
                    {finding.severity.replace("_", " ")}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{finding.plainEnglish}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-sm body-text">No structured findings have been extracted yet.</p>
        )}
      </section>

      <section className="surface-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Stethoscope className="eyebrow-text" aria-hidden="true" size={20} />
          <h2 className="text-lg font-semibold heading-text">Medical Terms Explained</h2>
        </div>
        {analysis.medicalTerms.length > 0 ? (
          <dl className="space-y-4">
            {analysis.medicalTerms.map((term) => (
              <div key={term.term}>
                <dt className="font-semibold heading-text">{term.term}</dt>
                <dd className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">{term.definition}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="text-sm body-text">Definitions will appear here after analysis.</p>
        )}
      </section>

      <section className="surface-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <HelpCircle className="eyebrow-text" aria-hidden="true" size={20} />
          <h2 className="text-lg font-semibold heading-text">Questions To Ask Your Doctor</h2>
        </div>
        <div className="space-y-3">
          {analysis.questionsForDoctor.map((question) => (
            <article key={question.question} className="surface-muted p-4">
              <p className="font-medium heading-text">{question.question}</p>
              <p className="mt-1 text-sm leading-6 body-text">{question.reason}</p>
            </article>
          ))}
        </div>
      </section>

      <MedicalDisclaimer compact />
    </div>
  );
}
