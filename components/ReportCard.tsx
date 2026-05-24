import Link from "next/link";
import { Calendar, Download, FileText } from "lucide-react";
import { supportedReportLabels } from "@/lib/constants";
import type { ReportRecord } from "@/types/report";

export function ReportCard({ report }: { report: ReportRecord }) {
  const created = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(report.createdAt));

  return (
    <article className="surface-card p-5">
      <div className="flex items-start gap-3">
        <div className="icon-tile size-11 shrink-0">
          <FileText aria-hidden="true" size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <Link href={`/reports/${report.id}`} className="focus-ring rounded-xl font-semibold heading-text transition-colors hover:text-medical-blue dark:hover:text-sky-300">
            {report.sourceFilename}
          </Link>
          <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-white/10">{supportedReportLabels[report.modality]}</span>
            <span className="rounded-full bg-mint px-3 py-1 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-200">{report.status.replaceAll("_", " ")}</span>
          </div>
          <p className="mt-3 flex items-center gap-2 text-sm body-text">
            <Calendar aria-hidden="true" size={15} />
            {created}
          </p>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Link
          href={`/reports/${report.id}`}
          className="focus-ring secondary-action flex-1 px-3 py-2 text-center text-sm"
        >
          View
        </Link>
        <a
          href={`/api/reports/${report.id}/export`}
          className="focus-ring primary-action px-3 py-2"
          aria-label="Export report summary PDF"
        >
          <Download aria-hidden="true" size={17} />
        </a>
      </div>
    </article>
  );
}
