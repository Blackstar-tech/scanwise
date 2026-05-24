import { randomUUID } from "crypto";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type {
  ReportAnalysis,
  ReportModality,
  ReportRecord,
  ReportStatus,
  TimelineFinding
} from "@/types/report";

type ReportRow = {
  id: string;
  user_id: string;
  modality: ReportModality;
  source_filename: string;
  storage_path: string;
  report_date: string | null;
  status: ReportStatus;
  created_at: string;
};

export async function storeReportUpload(params: {
  userId: string;
  file: File;
  modality: ReportModality;
  reportText?: string;
  status: ReportStatus;
}) {
  const supabase = createSupabaseAdminClient();
  const bucket = process.env.SUPABASE_REPORT_BUCKET ?? "reports";
  const reportId = randomUUID();
  const safeFilename = params.file.name.replace(/[^\w.\-]+/g, "_");
  const storagePath = `${params.userId}/${reportId}/${safeFilename}`;
  const bytes = await params.file.arrayBuffer();

  const upload = await supabase.storage.from(bucket).upload(storagePath, bytes, {
    contentType: params.file.type,
    upsert: false
  });

  if (upload.error) {
    throw upload.error;
  }

  const inserted = await supabase
    .from("reports")
    .insert({
      id: reportId,
      user_id: params.userId,
      modality: params.modality,
      source_filename: params.file.name,
      storage_path: storagePath,
      raw_text: params.reportText ?? null,
      status: params.status
    })
    .select()
    .single();

  if (inserted.error) {
    throw inserted.error;
  }

  return inserted.data;
}

export async function saveReportAnalysis(params: {
  userId: string;
  reportId: string;
  analysis: ReportAnalysis;
}) {
  const supabase = createSupabaseAdminClient();

  const analysisInsert = await supabase.from("report_analysis").insert({
    user_id: params.userId,
    report_id: params.reportId,
    analysis_json: params.analysis
  });

  if (analysisInsert.error) {
    throw analysisInsert.error;
  }

  const findings = params.analysis.importantFindings.flatMap((finding) =>
    (finding.measurements ?? []).map((measurement) => ({
      user_id: params.userId,
      report_id: params.reportId,
      label: measurement.label,
      comparison_key: measurement.comparisonKey,
      body_region: finding.bodyRegion ?? null,
      measurement_value: measurement.value,
      measurement_unit: measurement.unit,
      finding_date: new Date().toISOString().slice(0, 10)
    }))
  );

  if (findings.length > 0) {
    const findingsInsert = await supabase.from("report_findings").insert(findings);

    if (findingsInsert.error) {
      throw findingsInsert.error;
    }
  }

  const reportUpdate = await supabase
    .from("reports")
    .update({ status: "analyzed" })
    .eq("id", params.reportId)
    .eq("user_id", params.userId);

  if (reportUpdate.error) {
    throw reportUpdate.error;
  }
}

export async function listReportsForUser(userId: string): Promise<ReportRecord[]> {
  const supabase = createSupabaseAdminClient();
  const { data: reports, error } = await supabase
    .from("reports")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    throw error;
  }

  const reportIds = (reports ?? []).map((report) => report.id);
  let analyses: Array<{ report_id: string; analysis_json: unknown }> = [];

  if (reportIds.length > 0) {
    const analysesResult = await supabase
      .from("report_analysis")
      .select("report_id, analysis_json")
      .eq("user_id", userId)
      .in("report_id", reportIds);

    if (analysesResult.error) {
      throw analysesResult.error;
    }

    analyses = analysesResult.data ?? [];
  }

  const analysisByReportId = new Map(
    (analyses ?? []).map((analysis) => [analysis.report_id, analysis.analysis_json as ReportAnalysis])
  );

  return (reports ?? []).map((report) => toReportRecord(report, analysisByReportId.get(report.id) ?? null));
}

export async function getReportForUser(params: {
  userId: string;
  reportId: string;
}): Promise<ReportRecord | null> {
  const supabase = createSupabaseAdminClient();
  const { data: report, error } = await supabase
    .from("reports")
    .select("*")
    .eq("id", params.reportId)
    .eq("user_id", params.userId)
    .single();

  if (error) {
    return null;
  }

  const { data: analysis } = await supabase
    .from("report_analysis")
    .select("analysis_json")
    .eq("report_id", params.reportId)
    .eq("user_id", params.userId)
    .maybeSingle();

  return toReportRecord(report, analysis?.analysis_json as ReportAnalysis | null);
}

function toReportRecord(report: ReportRow, analysis: ReportAnalysis | null): ReportRecord {
  return {
    id: report.id,
    userId: report.user_id,
    modality: report.modality,
    sourceFilename: report.source_filename,
    storagePath: report.storage_path,
    reportDate: report.report_date,
    status: report.status,
    createdAt: report.created_at,
    analysis
  };
}

export async function listTimelineFindings(userId: string): Promise<TimelineFinding[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("report_findings")
    .select("*")
    .eq("user_id", userId)
    .order("finding_date", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? [])
    .filter((finding) => finding.measurement_value !== null && finding.measurement_unit !== null)
    .map((finding) => ({
      reportId: finding.report_id,
      reportDate: finding.finding_date,
      label: finding.label,
      comparisonKey: finding.comparison_key,
      value: finding.measurement_value ?? 0,
      unit: finding.measurement_unit ?? "other",
      bodyRegion: finding.body_region
    }));
}
