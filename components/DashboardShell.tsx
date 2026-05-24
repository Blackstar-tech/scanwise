import Link from "next/link";
import { Clock3, FilePlus2, GitCompare, Upload } from "lucide-react";
import type { ReactNode } from "react";
import { ReportCard } from "@/components/ReportCard";
import { TrendCard } from "@/components/TrendCard";
import type { ReportRecord, TrendCardData } from "@/types/report";

export function DashboardShell({
  reports,
  trends
}: {
  reports: ReportRecord[];
  trends: TrendCardData[];
}) {
  return (
    <div className="space-y-8">
      <section className="surface-card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold heading-text">Dashboard</h1>
            <p className="mt-2 text-sm leading-6 body-text">
              Track CT and ultrasound reports, explanations, and measurement changes over time.
            </p>
          </div>
          <Link
            href="/upload"
            className="focus-ring primary-action px-4 py-3"
          >
            <Upload aria-hidden="true" size={18} />
            Upload Report
          </Link>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <MetricTile icon={<Clock3 aria-hidden="true" size={19} />} label="Recent uploads" value={reports.length} />
        <MetricTile icon={<GitCompare aria-hidden="true" size={19} />} label="Tracked trends" value={trends.length} />
        <MetricTile
          icon={<FilePlus2 aria-hidden="true" size={19} />}
          label="Supported reports"
          value="CT + US"
        />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold heading-text">Recent uploads</h2>
        </div>
        {reports.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        ) : (
          <EmptyPanel
            title="No reports yet"
            body="Upload your first CT or ultrasound report file to generate a plain English explanation."
            href="/upload"
            action="Upload Report"
          />
        )}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold heading-text">Comparison history</h2>
        </div>
        {trends.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {trends.map((trend) => (
              <TrendCard key={trend.comparisonKey} trend={trend} />
            ))}
          </div>
        ) : (
          <EmptyPanel
            title="No comparisons yet"
            body="When repeated findings include measurements, ScanWise will show changes here."
            href="/upload"
            action="Add follow-up report"
          />
        )}
      </section>
    </div>
  );
}

function MetricTile({
  icon,
  label,
  value
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="surface-card p-5">
      <div className="icon-tile mb-4 size-10">
        {icon}
      </div>
      <p className="text-sm body-text">{label}</p>
      <p className="mt-1 text-2xl font-semibold heading-text">{value}</p>
    </div>
  );
}

function EmptyPanel({
  title,
  body,
  href,
  action
}: {
  title: string;
  body: string;
  href: string;
  action: string;
}) {
  return (
    <div className="rounded-[20px] border border-dashed border-line bg-white p-8 text-center transition-colors duration-300 dark:border-white/10 dark:bg-white/5">
      <h3 className="text-lg font-semibold heading-text">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 body-text">{body}</p>
      <Link
        href={href}
        className="focus-ring primary-action mt-5 px-4 py-3"
      >
        {action}
      </Link>
    </div>
  );
}
