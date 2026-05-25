import { BookOpenText, Stethoscope } from "lucide-react";

export function BlogHero({
  eyebrow = "Learn",
  title,
  body
}: {
  eyebrow?: string;
  title: string;
  body: string;
}) {
  return (
    <section className="border-b border-line/80 bg-white transition-colors duration-300 dark:border-white/10 dark:bg-[#0b1728]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-ice-blue px-3 py-1 text-sm font-semibold text-medical-blue-dark dark:bg-sky-400/10 dark:text-sky-200">
            <BookOpenText aria-hidden="true" size={16} />
            {eyebrow}
          </p>
          <h1 className="max-w-3xl text-3xl font-semibold leading-tight heading-text sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 body-text sm:text-lg sm:leading-8">
            {body}
          </p>
        </div>
        <div className="surface-muted p-6">
          <div className="icon-tile mb-5 size-12">
            <Stethoscope aria-hidden="true" size={23} />
          </div>
          <h2 className="text-lg font-semibold heading-text">Educational, report-focused content</h2>
          <p className="mt-3 text-sm leading-6 body-text">
            ScanWise articles explain CT and ultrasound wording so patients can prepare calmer,
            clearer questions for a licensed clinician.
          </p>
        </div>
      </div>
    </section>
  );
}
