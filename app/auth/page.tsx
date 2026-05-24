import { AuthPanel } from "@/components/AuthPanel";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { SiteHeader } from "@/components/SiteHeader";

export default async function AuthPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <main className="page-shell">
      <SiteHeader />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
        <section>
          <p className="text-sm font-semibold uppercase tracking-normal eyebrow-text">
            Patient dashboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold heading-text sm:text-4xl">
            Secure access to your report history
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 body-text">
            Keep CT and ultrasound reports in one place, compare measurements, and export a plain
            English summary for appointments.
          </p>
          <div className="mt-6">
            <MedicalDisclaimer compact />
          </div>
        </section>
        <AuthPanel nextPath={next ?? "/dashboard"} />
      </div>
    </main>
  );
}
