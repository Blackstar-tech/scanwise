import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/supabase/server";
import { createReportSummaryPdf } from "@/services/export-pdf";
import { getReportForUser } from "@/services/reports";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const { id } = await params;
  const report = await getReportForUser({ userId: user.id, reportId: id });

  if (!report) {
    return NextResponse.json({ error: "Report not found." }, { status: 404 });
  }

  const pdf = await createReportSummaryPdf(report);
  const body = pdf.buffer.slice(pdf.byteOffset, pdf.byteOffset + pdf.byteLength) as ArrayBuffer;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="scanwise-${report.id}.pdf"`
    }
  });
}
