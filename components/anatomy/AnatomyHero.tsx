import { Boxes, HeartPulse } from "lucide-react";

export function AnatomyHero() {
  return (
    <section className="border-b border-line/80 bg-white transition-colors duration-300 dark:border-white/10 dark:bg-[#0b1728]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-ice-blue px-3 py-1 text-sm font-semibold text-medical-blue-dark dark:bg-sky-400/10 dark:text-sky-200">
            <Boxes aria-hidden="true" size={16} />
            Anatomy Explorer
          </p>
          <h1 className="max-w-3xl text-3xl font-semibold leading-tight heading-text sm:text-5xl">
            Explore organs mentioned in CT and ultrasound reports
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 body-text sm:text-lg sm:leading-8">
            Learn what each organ does, how it appears in imaging reports, and which questions can
            help you discuss findings with your clinician.
          </p>
        </div>
        <div className="surface-muted p-6">
          <div className="icon-tile mb-5 size-12">
            <HeartPulse aria-hidden="true" size={23} />
          </div>
          <h2 className="text-lg font-semibold heading-text">Body-context first</h2>
          <p className="mt-3 text-sm leading-6 body-text">
            Each organ page connects anatomy basics with CT wording, ultrasound wording, example
            report phrases, and patient-friendly next questions.
          </p>
        </div>
      </div>
    </section>
  );
}
