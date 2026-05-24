import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Download, Upload } from "lucide-react";
import { ExplainerSections } from "@/components/ExplainerSections";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { supportedReportLabels } from "@/lib/constants";
import { getCurrentUser } from "@/lib/supabase/server";
import { getReportForUser } from "@/services/reports";

export const dynamic = "force-dynamic";

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth");
  }

  const { id } = await params;
  const report = await getReportForUser({ userId: user.id, reportId: id });

  if (!report) {
    notFound();
  }

  return (
    <main className="page-shell">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <section className="surface-card mb-6 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold eyebrow-text">
                {supportedReportLabels[report.modality]}
              </p>
              <h1 className="mt-2 text-2xl font-semibold heading-text">{report.sourceFilename}</h1>
              <p className="mt-2 text-sm body-text">{report.status.replaceAll("_", " ")}</p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/upload"
                className="focus-ring secondary-action px-3 py-2 text-sm"
              >
                <Upload aria-hidden="true" size={17} />
                New
              </Link>
              <a
                href={`/api/reports/${report.id}/export`}
                className="focus-ring primary-action px-3 py-2 text-sm"
              >
                <Download aria-hidden="true" size={17} />
                Export PDF
              </a>
            </div>
          </div>
        </section>

        {report.analysis ? (
          <ExplainerSections analysis={report.analysis} />
        ) : (
          <section className="surface-card p-6">
            <h2 className="text-lg font-semibold heading-text">Analysis pending</h2>
            <p className="mt-2 text-sm leading-6 body-text">
              This report has been uploaded, but no structured explanation is available yet.
            </p>
          </section>
        )}

        <div className="mt-8">
          <MedicalDisclaimer compact />
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
