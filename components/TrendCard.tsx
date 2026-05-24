import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { formatShortDate } from "@/lib/report-comparison";
import type { TrendCardData } from "@/types/report";

export function TrendCard({ trend }: { trend: TrendCardData }) {
  const Icon =
    trend.direction === "increased" ? TrendingUp : trend.direction === "decreased" ? TrendingDown : Minus;

  return (
    <article className="surface-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold eyebrow-text">{trend.bodyRegion ?? "Finding"}</p>
          <h3 className="mt-1 text-lg font-semibold heading-text">{trend.label}</h3>
        </div>
        <span className="icon-tile size-10">
          <Icon aria-hidden="true" size={20} />
        </span>
      </div>
      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-sm">
        <div className="surface-muted p-4">
          <p className="font-semibold heading-text">
            {trend.first.value} {trend.unit}
          </p>
          <p className="mt-1 subtle-text">{formatShortDate(trend.first.reportDate)}</p>
        </div>
        <span className="text-slate-400" aria-hidden="true">
          to
        </span>
        <div className="surface-muted p-4">
          <p className="font-semibold heading-text">
            {trend.latest.value} {trend.unit}
          </p>
          <p className="mt-1 subtle-text">{formatShortDate(trend.latest.reportDate)}</p>
        </div>
      </div>
      <p className="mt-3 text-sm body-text">
        Change: {trend.delta > 0 ? "+" : ""}
        {trend.delta.toFixed(1)} {trend.unit}
      </p>
    </article>
  );
}
