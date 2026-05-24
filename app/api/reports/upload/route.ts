import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseServerConfigured } from "@/lib/env";
import { modalitySchema, reportTextSchema, validateReportUpload } from "@/lib/validation";
import { getCurrentUser } from "@/lib/supabase/server";
import { analyzeRadiologyReport, buildFallbackAnalysis } from "@/services/ai";
import { extractTextFromReportFile } from "@/services/ocr";
import { saveReportAnalysis, storeReportUpload } from "@/services/reports";
import type { ReportModality, ReportStatus, UploadResult } from "@/types/report";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const modality = modalitySchema.safeParse(formData.get("modality"));

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Report file is required." }, { status: 400 });
    }

    if (!modality.success) {
      return NextResponse.json({ error: "Report type must be CT or ultrasound." }, { status: 400 });
    }

    const fileError = validateReportUpload(file);
    if (fileError) {
      return NextResponse.json({ error: fileError }, { status: 400 });
    }

    if (!isSupabaseServerConfigured()) {
      return NextResponse.json({
        reportId: "demo-report",
        status: "analyzed",
        analysis: {
          ...buildFallbackAnalysis(modality.data),
          summary:
            "Demo upload received. Supabase storage, OCR, and AI analysis are not configured yet, so this is a placeholder explanation instead of text extracted from the report file.",
          confidenceDisclaimer:
            "Demo mode did not read your report file. Configure Supabase, OCR, and AI provider keys for real report analysis."
        },
        message:
          "Demo mode: file validation worked, but real report storage and OCR need Supabase and OCR provider keys."
      } satisfies UploadResult);
    }

    const ocr = await extractTextFromReportFile(file);
    const reportText = ocr.text.trim();
    const hasAnalyzableText = reportTextSchema.safeParse(reportText).success;
    const status = getUploadStatus(ocr.status, hasAnalyzableText);

    const report = await storeReportUpload({
      userId: user.id,
      file,
      modality: modality.data as ReportModality,
      reportText: reportText || undefined,
      status
    });

    const response: UploadResult = {
      reportId: report.id,
      status,
      extractedText: reportText || undefined
    };

    if (!hasAnalyzableText) {
      response.message =
        ocr.status === "not_configured"
          ? "Upload saved. Add an OCR provider before ScanWise can extract text from report files."
          : "Upload saved, but text extraction did not return enough report text for analysis.";

      return NextResponse.json(response);
    }

    const analysis = await analyzeRadiologyReport({
      modality: modality.data,
      reportText
    });

    await saveReportAnalysis({
      userId: user.id,
      reportId: report.id,
      analysis
    });

    return NextResponse.json({
      ...response,
      status: "analyzed",
      analysis
    } satisfies UploadResult);
  } catch (error) {
    console.error("Report upload failed", error);
    return uploadErrorResponse(error);
  }
}

function getUploadStatus(
  ocrStatus: "completed" | "not_configured" | "failed",
  hasAnalyzableText: boolean
): ReportStatus {
  if (hasAnalyzableText) {
    return "processing";
  }

  if (ocrStatus === "not_configured") {
    return "needs_ocr_configuration";
  }

  return "failed";
}

function uploadErrorResponse(error: unknown) {
  const details = getErrorMessage(error);
  const normalizedDetails = details.toLowerCase();

  if (
    normalizedDetails.includes("could not find the table") ||
    normalizedDetails.includes("schema cache") ||
    (normalizedDetails.includes("relation") && normalizedDetails.includes("reports")) ||
    normalizedDetails.includes("bucket not found") ||
    normalizedDetails.includes("storage bucket")
  ) {
    return NextResponse.json(
      {
        error:
          "Upload failed because Supabase is not fully set up. Run supabase/schema.sql in the Supabase SQL Editor, then restart the app."
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      error:
        "Upload failed on the server. Check the terminal running npm run dev for the detailed error."
    },
    { status: 500 }
  );
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error && "message" in error) {
    const message = (error as { message?: unknown }).message;
    return typeof message === "string" ? message : "";
  }

  return String(error);
}
