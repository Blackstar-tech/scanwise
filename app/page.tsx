import Link from "next/link";
import { ArrowRight, FileSearch, LockKeyhole, ScanLine, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { SectionHeader } from "@/components/SectionHeader";
import { SiteHeader } from "@/components/SiteHeader";

export default function LandingPage() {
  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="hero-image flex min-h-[calc(78vh-4rem)] items-center">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="max-w-2xl text-white">
            <p className="mb-4 inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm font-semibold backdrop-blur">
              CT and ultrasound reports only
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Understand Your CT & Ultrasound Reports
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-blue-50">
              ScanWise turns radiology language into plain English, highlights key findings, defines
              medical terms, and helps you prepare better questions for your doctor.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/upload"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-medical-blue-dark shadow-[0_18px_40px_rgba(255,255,255,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50"
              >
                Upload Report
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link
                href="/auth"
                className="focus-ring inline-flex items-center justify-center rounded-2xl border border-white/40 px-5 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line/80 bg-white transition-colors duration-300 dark:border-white/10 dark:bg-[#0b1728]">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-6 sm:grid-cols-3 sm:px-6">
          <TrustItem icon={<LockKeyhole aria-hidden="true" size={18} />} text="Private report storage" />
          <TrustItem icon={<ScanLine aria-hidden="true" size={18} />} text="CT and ultrasound validation" />
          <TrustItem icon={<FileSearch aria-hidden="true" size={18} />} text="No diagnosis or care plan" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionHeader
          eyebrow="How it helps"
          title="Plain language for complex reports"
          body="Patients often receive CT and ultrasound reports before they can speak with a clinician. ScanWise gives them a calmer way to read the document, understand the wording, and track repeated measurements."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <FeatureCard
            icon={<FileSearch aria-hidden="true" size={22} />}
            title="Report explainer"
            body="Summaries, important findings, definitions, and doctor questions from structured AI output."
          />
          <FeatureCard
            icon={<TrendingUp aria-hidden="true" size={22} />}
            title="Timeline tracking"
            body="Repeated measurements are normalized into trend cards so changes are easier to discuss."
          />
          <FeatureCard
            icon={<LockKeyhole aria-hidden="true" size={22} />}
            title="Compliance-ready"
            body="Designed for private buckets, row-level security, encrypted storage, and no training on user data."
          />
        </div>
      </section>

      <section className="bg-white transition-colors duration-300 dark:bg-[#0b1728]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            eyebrow="Output"
            title="Built around the conversation with your doctor"
            body="ScanWise keeps the explanation narrow: what the report says, what terms mean, what measurements changed, and what to ask next."
          />
          <div className="grid gap-3">
            {["Summary", "Important Findings", "Medical Terms Explained", "Questions To Ask Your Doctor"].map(
              (item) => (
                <div key={item} className="surface-muted p-5 font-semibold text-ink dark:text-white">
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <MedicalDisclaimer />
      </section>
    </main>
  );
}

function TrustItem({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-ice-blue px-5 py-4 text-sm font-semibold text-medical-blue-dark transition-colors duration-300 dark:bg-sky-400/10 dark:text-sky-200">
      {icon}
      <span>{text}</span>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  body
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <article className="surface-card p-6">
      <div className="icon-tile mb-5 size-12">
        {icon}
      </div>
      <h3 className="text-lg font-semibold heading-text">{title}</h3>
      <p className="mt-3 text-sm leading-6 body-text">{body}</p>
    </article>
  );
}
