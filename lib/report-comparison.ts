import type { TimelineFinding, TrendCardData } from "@/types/report";

export function buildTrendCards(findings: TimelineFinding[]): TrendCardData[] {
  const grouped = findings.reduce<Record<string, TimelineFinding[]>>((acc, finding) => {
    acc[finding.comparisonKey] = acc[finding.comparisonKey] ?? [];
    acc[finding.comparisonKey].push(finding);
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([comparisonKey, history]) => {
      const sorted = [...history].sort(
        (a, b) => new Date(a.reportDate).getTime() - new Date(b.reportDate).getTime()
      );
      const first = sorted[0];
      const latest = sorted[sorted.length - 1];
      const delta = latest.value - first.value;

      return {
        comparisonKey,
        label: latest.label,
        bodyRegion: latest.bodyRegion,
        unit: latest.unit,
        first,
        latest,
        delta,
        direction: getDirection(delta),
        history: sorted
      } satisfies TrendCardData;
    })
    .filter((trend) => trend.history.length > 1)
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
}

function getDirection(delta: number): TrendCardData["direction"] {
  if (Math.abs(delta) < 0.5) {
    return "stable";
  }

  return delta > 0 ? "increased" : "decreased";
}

export function formatShortDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric"
  }).format(new Date(date));
}
