import { LibraryBig, SearchCheck } from "lucide-react";

export function DictionaryHero() {
  return (
    <section className="border-b border-line/80 bg-white transition-colors duration-300 dark:border-white/10 dark:bg-[#0b1728]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-ice-blue px-3 py-1 text-sm font-semibold text-medical-blue-dark dark:bg-sky-400/10 dark:text-sky-200">
            <LibraryBig aria-hidden="true" size={16} />
            Scan Dictionary
          </p>
          <h1 className="max-w-3xl text-3xl font-semibold leading-tight heading-text sm:text-5xl">
            Decode common CT and ultrasound words
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 body-text sm:text-lg sm:leading-8">
            Search short, patient-friendly definitions for frequent terms found in radiology reports.
          </p>
        </div>
        <div className="surface-muted p-6">
          <div className="icon-tile mb-5 size-12">
            <SearchCheck aria-hidden="true" size={23} />
          </div>
          <h2 className="text-lg font-semibold heading-text">Built for report wording</h2>
          <p className="mt-3 text-sm leading-6 body-text">
            Each term explains CT meaning, ultrasound meaning, example report language, related
            findings, and questions to ask your doctor.
          </p>
        </div>
      </div>
    </section>
  );
}
