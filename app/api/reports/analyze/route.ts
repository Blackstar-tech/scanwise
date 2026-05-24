import { NextResponse, type NextRequest } from "next/server";
import { analyzeReportSchema } from "@/lib/validation";
import { getCurrentUser } from "@/lib/supabase/server";
import { analyzeRadiologyReport } from "@/services/ai";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const body = await request.json();
  const parsed = analyzeReportSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request." }, { status: 400 });
  }

  const analysis = await analyzeRadiologyReport(parsed.data);

  return NextResponse.json({ analysis });
}
